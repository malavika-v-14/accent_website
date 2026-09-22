import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('.artifacts/ui-review');
await mkdir(output, { recursive: true });
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=9228', `--user-data-dir=${path.join(output, 'chrome-profile')}`, 'about:blank',
], { windowsHide: true, stdio: 'ignore' });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let ws;
let seq = 0;
const pending = new Map();
const errors = [];
const checks = [];
function check(name, success) {
  checks.push({ name, passed: Boolean(success) });
  if (!success) throw new Error(`Failed: ${name}`);
  console.log(`PASS ${name}`);
}
try {
  let tabs;
  for (let i = 0; i < 40; i++) {
    try { tabs = await fetch('http://127.0.0.1:9228/json').then(r => r.json()); break; } catch { await delay(250); }
  }
  if (!tabs) throw new Error('Could not connect to headless Chrome');
  ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  ws.onmessage = e => {
    const message = JSON.parse(e.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject, timer } = pending.get(message.id);
      clearTimeout(timer);
      pending.delete(message.id);
      message.error ? reject(new Error(JSON.stringify(message.error))) : resolve(message.result);
    }
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
  };
  const cdp = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++seq;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 20000);
    pending.set(id, { resolve, reject, timer });
    ws.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async expression => {
    const r = await cdp('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
    return r.result.value;
  };
  const viewport = (width, height = 1000) => cdp('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
  const navigate = async route => {
    await cdp('Page.navigate', { url: `http://localhost:3100${route}` });
    for (let i = 0; i < 60; i++) {
      await delay(250);
      if (await evaluate(`document.readyState === 'complete' && Boolean(document.querySelector('h1'))`)) break;
    }
    await evaluate('document.fonts.ready');
    await delay(700);
  };
  const screenshot = async name => {
    const r = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    await writeFile(path.join(output, `${name}.png`), Buffer.from(r.data, 'base64'));
  };
  await cdp('Page.enable');
  await cdp('Runtime.enable');
  await viewport(1440);
  await navigate('/');
  check('Homepage renders', await evaluate(`document.querySelector('h1').innerText.includes('curiosity')`));
  check('Hero photo loads', await evaluate(`document.querySelector('.hero-photo img').naturalWidth > 0`));
  await screenshot('home-desktop');
  await evaluate(`document.querySelectorAll('.audience-tabs button')[1].click()`);
  await delay(350);
  check('Corporate services switch', await evaluate(`document.querySelector('.service-grid').innerText.includes('Employee Engagement')`));
  await evaluate(`document.querySelector('.service-more').click()`);
  check('Service detail expands', await evaluate(`document.querySelector('.service-more').getAttribute('aria-expanded') === 'true' && !document.querySelector('.service-details').hidden`));
  await evaluate(`document.querySelector('#ecosystem-tab-2').click()`);
  await delay(350);
  check('Ecosystem tab switches content', await evaluate(`document.querySelector('#ecosystem-panel').innerText.includes('Make space for your next big idea')`));
  await evaluate(`document.querySelector('#ecosystem-tab-2').dispatchEvent(new KeyboardEvent('keydown', {key:'ArrowRight', bubbles:true}))`);
  await delay(100);
  check('Ecosystem keyboard navigation', await evaluate(`document.querySelector('#ecosystem-tab-3').getAttribute('aria-selected') === 'true'`));
  await evaluate(`document.querySelector('#services').scrollIntoView({behavior:'instant'})`);
  await delay(900);
  await screenshot('services-desktop');
  await navigate('/programs#companies');
  check('Corporate deep link and consultation form', await evaluate(`document.querySelectorAll('.audience-tabs button')[1].getAttribute('aria-pressed') === 'true' && document.querySelector('.enquiry-form h3').innerText.includes('enterprise')`));
  await evaluate(`document.querySelector('.audience-tabs button').click()`);
  check('College toggle and MoU form', await evaluate(`document.querySelector('.enquiry-form h3').innerText.includes('MoU')`));
  await evaluate(`document.querySelector('.faq-section summary').click()`);
  check('FAQ expands', await evaluate(`document.querySelector('.faq-section details').open`));
  await navigate('/events');
  await evaluate(`Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'Workshop').click()`);
  check('Event category filter', await evaluate(`document.querySelectorAll('.card-glow').length === 1 && document.querySelector('.card-glow').innerText.includes('React')`));
  await navigate('/contact');
  check('Contact labels and native validation', await evaluate(`document.querySelectorAll('form label').length === 4 && !document.querySelector('form').checkValidity()`));
  await screenshot('contact-desktop');
  for (const width of [390, 768, 1024, 1440]) {
    await viewport(width, width < 600 ? 844 : 1000);
    for (const route of ['/', '/about', '/programs', '/events', '/contact']) {
      await navigate(route);
      check(`${route} has no horizontal overflow at ${width}px`, await evaluate(`document.documentElement.scrollWidth <= window.innerWidth`));
      check(`${route} images load at ${width}px`, await evaluate(`Array.from(document.images).filter(i => i.getBoundingClientRect().top < innerHeight).every(i => i.complete && i.naturalWidth > 0)`));
      if (width === 390 || width === 1440) await screenshot(`${route.slice(1) || 'home'}-${width}`);
    }
  }
  await viewport(390, 844);
  await navigate('/');
  await evaluate(`document.querySelector('.mobile-nav button').click()`);
  check('Mobile menu opens', await evaluate(`!!document.querySelector('#mobile-links')`));
  await evaluate(`document.querySelector('.mobile-nav button').focus()`);
  await cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await cdp('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await delay(100);
  check('Escape closes mobile menu', await evaluate(`!document.querySelector('#mobile-links')`));
  await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  check('Reduced-motion preference respected', await evaluate(`getComputedStyle(document.querySelector('.ribbon-track')).animationName === 'none'`));
  check('No JavaScript runtime errors', errors.length === 0);
  await viewport(1440);
  await navigate('/');
  const height = await evaluate('document.documentElement.scrollHeight');
  for (let top = 0; top < height; top += 700) {
    await evaluate(`window.scrollTo({top:${top}, behavior:'instant'})`);
    await delay(120);
  }
  await evaluate(`window.scrollTo({top:0, behavior:'instant'})`);
  const full = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: {x:0,y:0,width:1440,height,scale:1} });
  await writeFile(path.join(output, 'home-full.png'), Buffer.from(full.data, 'base64'));
  await writeFile(path.join(output, 'results.json'), JSON.stringify({ checks, errors }, null, 2));
  console.log(`Screenshots and ${checks.length} checks saved to ${output}`);
  await cdp('Browser.close').catch(() => {});
} finally {
  ws?.close();
  chrome.kill();
}
