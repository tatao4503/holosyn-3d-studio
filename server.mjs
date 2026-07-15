#!/usr/bin/env node
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const MAX_JSON_BYTES = 25 * 1024 * 1024;
const MESHY_API_BASE = 'https://api.meshy.ai/openapi/v1/image-to-3d';
const MIME_TYPES = {
    '.css': 'text/css; charset=utf-8',
    '.gif': 'image/gif',
    '.html': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.pdf': 'application/pdf',
    '.png': 'image/png',
    '.svg': 'image/svg+xml; charset=utf-8',
    '.webm': 'video/webm',
};

function loadLocalEnvironment() {
    const envPath = resolve(ROOT, '.env.local');
    if (!existsSync(envPath)) return;
    for (const rawLine of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith('#')) continue;
        const separator = line.indexOf('=');
        if (separator < 1) continue;
        const key = line.slice(0, separator).trim();
        let value = line.slice(separator + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        if (/^[A-Z_][A-Z0-9_]*$/.test(key) && process.env[key] === undefined) {
            process.env[key] = value;
        }
    }
}

function sendJson(response, status, payload) {
    const body = JSON.stringify(payload);
    response.writeHead(status, {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(body),
        'Cache-Control': 'no-store',
    });
    response.end(body);
}

function setSecurityHeaders(response) {
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.setHeader('Permissions-Policy', 'camera=(self), geolocation=(), payment=()');
}

async function readJsonBody(request) {
    const chunks = [];
    let size = 0;
    for await (const chunk of request) {
        size += chunk.length;
        if (size > MAX_JSON_BYTES) {
            const error = new Error('Request body is too large.');
            error.statusCode = 413;
            throw error;
        }
        chunks.push(chunk);
    }
    try {
        return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
    } catch {
        const error = new Error('Request body must be valid JSON.');
        error.statusCode = 400;
        throw error;
    }
}

async function proxyMeshy(request, response, url, meshyApiKey) {
    if (!meshyApiKey) {
        sendJson(response, 503, {
            ok: false,
            code: 'MESHY_NOT_CONFIGURED',
            message: 'Set MESHY_API_KEY in .env.local and restart HOLOSYN.',
        });
        return;
    }

    let targetUrl = MESHY_API_BASE;
    let method = request.method;
    let body;
    if (method === 'POST' && url.pathname === '/api/meshy/image-to-3d') {
        body = JSON.stringify(await readJsonBody(request));
    } else if (method === 'GET' && url.pathname.startsWith('/api/meshy/image-to-3d/')) {
        const taskId = decodeURIComponent(url.pathname.slice('/api/meshy/image-to-3d/'.length));
        if (!/^[A-Za-z0-9_-]{1,128}$/.test(taskId)) {
            sendJson(response, 400, { ok: false, code: 'INVALID_TASK_ID', message: 'Invalid Meshy task id.' });
            return;
        }
        targetUrl = `${MESHY_API_BASE}/${encodeURIComponent(taskId)}`;
    } else {
        sendJson(response, 404, { ok: false, code: 'API_NOT_FOUND', message: 'Unknown API route.' });
        return;
    }

    try {
        const upstream = await fetch(targetUrl, {
            method,
            headers: {
                Authorization: `Bearer ${meshyApiKey}`,
                ...(body ? { 'Content-Type': 'application/json' } : {}),
            },
            body,
            signal: AbortSignal.timeout(90_000),
        });
        const contentType = upstream.headers.get('content-type') || 'application/json; charset=utf-8';
        const payload = Buffer.from(await upstream.arrayBuffer());
        response.writeHead(upstream.status, {
            'Content-Type': contentType,
            'Content-Length': payload.length,
            'Cache-Control': 'no-store',
        });
        response.end(payload);
    } catch (error) {
        sendJson(response, 502, {
            ok: false,
            code: 'MESHY_UPSTREAM_ERROR',
            message: error.name === 'TimeoutError' ? 'Meshy request timed out.' : 'Meshy request failed.',
        });
    }
}

function serveStatic(request, response, url, rootDir) {
    const requestedPath = url.pathname === '/' ? '/index.html' : url.pathname;
    let decodedPath;
    try {
        decodedPath = decodeURIComponent(requestedPath);
    } catch {
        sendJson(response, 400, { ok: false, code: 'INVALID_PATH', message: 'Invalid URL path.' });
        return;
    }
    const pathSegments = decodedPath.split('/').filter(Boolean);
    if (pathSegments.some(segment => segment.startsWith('.'))) {
        sendJson(response, 403, { ok: false, code: 'PRIVATE_PATH', message: 'Private files are not served.' });
        return;
    }
    const filePath = resolve(rootDir, `.${decodedPath}`);
    if (filePath !== rootDir && !filePath.startsWith(`${rootDir}${sep}`)) {
        sendJson(response, 403, { ok: false, code: 'PATH_BLOCKED', message: 'Path is outside the app root.' });
        return;
    }
    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
        sendJson(response, 404, { ok: false, code: 'NOT_FOUND', message: 'File not found.' });
        return;
    }

    const stat = statSync(filePath);
    response.writeHead(200, {
        'Content-Type': MIME_TYPES[extname(filePath).toLowerCase()] || 'application/octet-stream',
        'Content-Length': stat.size,
        'Cache-Control': /\.(?:html|css|js|mjs)$/i.test(filePath) ? 'no-cache' : 'public, max-age=3600',
    });
    if (request.method === 'HEAD') {
        response.end();
        return;
    }
    createReadStream(filePath).pipe(response);
}

export function createHolosynServer(options = {}) {
    loadLocalEnvironment();
    const rootDir = resolve(options.rootDir || ROOT);
    const meshyApiKey = options.meshyApiKey ?? process.env.MESHY_API_KEY ?? '';
    return createServer(async (request, response) => {
        setSecurityHeaders(response);
        const url = new URL(request.url || '/', `http://${request.headers.host || '127.0.0.1'}`);
        try {
            if (request.method === 'GET' && url.pathname === '/api/health') {
                sendJson(response, 200, {
                    ok: true,
                    service: 'holosyn-local-gateway',
                    meshyConfigured: Boolean(meshyApiKey),
                });
                return;
            }
            if (url.pathname.startsWith('/api/meshy/')) {
                await proxyMeshy(request, response, url, meshyApiKey);
                return;
            }
            if (request.method !== 'GET' && request.method !== 'HEAD') {
                sendJson(response, 405, { ok: false, code: 'METHOD_NOT_ALLOWED', message: 'Method not allowed.' });
                return;
            }
            serveStatic(request, response, url, rootDir);
        } catch (error) {
            sendJson(response, error.statusCode || 500, {
                ok: false,
                code: error.statusCode === 413 ? 'PAYLOAD_TOO_LARGE' : 'SERVER_ERROR',
                message: error.message || 'Unexpected server error.',
            });
        }
    });
}

function readArg(name, fallback) {
    const index = process.argv.indexOf(name);
    return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

async function main() {
    const host = readArg('--host', process.env.HOLOSYN_HOST || '127.0.0.1');
    const port = Number(readArg('--port', process.env.HOLOSYN_PORT || 4173));
    const server = createHolosynServer();
    server.listen(port, host, () => {
        const address = server.address();
        const actualPort = typeof address === 'object' && address ? address.port : port;
        console.log(`HOLOSYN ready at http://${host}:${actualPort}/index.html`);
        console.log(process.env.MESHY_API_KEY ? 'Meshy gateway: secure server key enabled' : 'Meshy gateway: no server key (session fallback available)');
    });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
    main().catch(error => {
        console.error(error);
        process.exitCode = 1;
    });
}
