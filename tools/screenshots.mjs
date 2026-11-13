// Full-size screenshots with headless Chrome (works even when the browser pane is hidden).
// Usage: URL=http://localhost:5177/ node tools/screenshots.mjs <outDir> <width> <height> <name>=<scrollY js expr> ...
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const [outDir, W, H, ...shots] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const port = 9333;
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', `--remote-debugging-port=${port}`, `--window-size=${W},${H}`,
  `--user-data-dir=${join(tmpdir(), 'cdp-shots-profile')}`, '--hide-scrollbars', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    target = list.find((t) => t.type === 'page');
  } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
};
const send = (method, params = {}) => new Promise((r) => { pending.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
const evalJs = async (expr) => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }))?.result?.value;

const mobile = +W < 768;
await send('Emulation.setDeviceMetricsOverride', { width: +W, height: +H, deviceScaleFactor: 1, mobile });
await send('Page.enable');
await send('Page.bringToFront');
await send('Page.navigate', { url: process.env.URL || 'http://localhost:5177/' });
await sleep(6000);
console.log('raf/preloader', await evalJs("(async()=>{let n=0;const t=performance.now();await new Promise(r=>{const f=()=>{n++;performance.now()-t<1000?requestAnimationFrame(f):r()};requestAnimationFrame(f);setTimeout(r,1500)});return n+' '+!!document.getElementById('preloader')})()"));
// CLICK='#clapper' taps an element first and saves the moment right after it (00tap-a, 00tap-b).
if (process.env.CLICK) {
  await evalJs(`document.querySelector(${JSON.stringify(process.env.CLICK)})?.click()`);
  for (const [n, ms] of [['00tap-a', 450], ['00tap-b', 1600]]) {
    await sleep(ms);
    const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 70 });
    writeFileSync(join(outDir, `${n}.jpg`), Buffer.from(shot.data, 'base64'));
    console.log('saved', n);
  }
}
for (const s of shots) {
  const [name, expr] = s.split(/=(.*)/s);
  await evalJs(`(async()=>{ window.scrollTo(0, ${expr}); await new Promise(r=>setTimeout(r,2200)); })()`);
  const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 70 });
  writeFileSync(join(outDir, `${name}.jpg`), Buffer.from(shot.data, 'base64'));
  console.log('saved', name);
}
ws.close();
chrome.kill();
