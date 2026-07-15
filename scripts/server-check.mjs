#!/usr/bin/env node
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createHolosynServer } from '../server.mjs';

const server = createHolosynServer({ meshyApiKey: '' });
server.listen(0, '127.0.0.1');
await once(server, 'listening');

try {
    const address = server.address();
    const baseUrl = `http://127.0.0.1:${address.port}`;

    const healthResponse = await fetch(`${baseUrl}/api/health`);
    const health = await healthResponse.json();
    assert.equal(healthResponse.status, 200);
    assert.equal(health.ok, true);
    assert.equal(health.service, 'holosyn-local-gateway');
    assert.equal(health.meshyConfigured, false);

    const indexResponse = await fetch(`${baseUrl}/index.html`);
    const html = await indexResponse.text();
    assert.equal(indexResponse.status, 200);
    assert.match(html, /id="btn-boot-system"/);
    assert.equal(indexResponse.headers.get('x-content-type-options'), 'nosniff');

    const privateResponse = await fetch(`${baseUrl}/.env.local`);
    const privateError = await privateResponse.json();
    assert.equal(privateResponse.status, 403);
    assert.equal(privateError.code, 'PRIVATE_PATH');

    const meshyResponse = await fetch(`${baseUrl}/api/meshy/image-to-3d`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: 'data:image/png;base64,AA==' }),
    });
    const meshyError = await meshyResponse.json();
    assert.equal(meshyResponse.status, 503);
    assert.equal(meshyError.code, 'MESHY_NOT_CONFIGURED');

    console.log('HOLOSYN server check passed.');
} finally {
    server.close();
    await once(server, 'close');
}
