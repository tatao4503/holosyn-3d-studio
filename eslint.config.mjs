// no-undef across the browser scripts, and nothing else.
//
// The app is classic scripts sharing one global scope, so every top-level
// declaration in any of them is a global to all of them. A function that names
// something declared nowhere — a local from some other function, typically —
// throws ReferenceError the first time it runs; the exploded-shockwave
// animation died on frame one that way and no check noticed. This one does.
//
// Run: npx --yes eslint@9 .   (CI does the same)
import { readFileSync, readdirSync } from 'node:fs';

const files = ['app.js', ...readdirSync('scripts').filter(f => /^holosyn-.*\.js$/.test(f)).map(f => `scripts/${f}`)];

const globals = {};
for (const file of files) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(/^(?:async\s+)?function\s+([A-Za-z_$][\w$]*)|^(?:const|let|var)\s+([A-Za-z_$][\w$]*)/gm)) {
    globals[m[1] || m[2]] = 'writable';
  }
}
// vendored libraries and the one optional WebXR entry (guarded with typeof)
for (const g of ['THREE', 'Peer', 'lucide', 'qrcode', 'ARButton']) globals[g] = 'readonly';

export default [
  {
    files,
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'script',
      globals: {
        ...Object.fromEntries(['window','document','navigator','localStorage','sessionStorage','indexedDB','requestAnimationFrame','cancelAnimationFrame','setTimeout','clearTimeout','setInterval','clearInterval','console','performance','URL','URLSearchParams','Blob','File','FileReader','Image','TextEncoder','TextDecoder','DOMException','Event','KeyboardEvent','MouseEvent','CustomEvent','MediaRecorder','BarcodeDetector','speechSynthesis','SpeechSynthesisUtterance','AudioContext','webkitAudioContext','webkitSpeechRecognition','SpeechRecognition','crypto','fetch','location','history','alert','confirm','prompt','atob','btoa','getComputedStyle','matchMedia','screen','devicePixelRatio','innerWidth','innerHeight','structuredClone','ResizeObserver','IntersectionObserver','MutationObserver','DeviceOrientationEvent','HTMLElement','HTMLCanvasElement','Element','Node','NodeList','FormData','Headers','Response','Request','AbortController','WebSocket','Worker','OffscreenCanvas','ImageData','Path2D','requestIdleCallback','queueMicrotask','Notification','Intl','Storage','globalThis','self','parent','top','open','close','scrollTo','addEventListener','removeEventListener','dispatchEvent','Audio'].map(g => [g, 'readonly'])),
        ...globals,
      },
    },
    rules: { 'no-undef': 'error' },
  },
];
