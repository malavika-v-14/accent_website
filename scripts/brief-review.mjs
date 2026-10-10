import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('.artifacts/brief-review');
await mkdir(output, { recursive: true });
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=9238', `--user-data-dir=${path.join(output, 'chrome-profile')}`, 'about:blank',
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
    try { tabs = await fetch('http://127.0.0.1:9238/json').then(r => r.json()); break; } catch { await delay(250); }
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
    await cdp('Page.navigate', { url: `http://localhost:3102${route}` });
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

  const routes=['/','/programs','/colleges','/corporates','/events','/resources','/about','/contact','/privacy'];
  for(const width of [390,1440]){
    await viewport(width);
    for(const route of routes){
      const response=await fetch('http://localhost:3102'+route);
      check(width+' '+route+' HTTP 200',response.status===200);
      await navigate(route);
      check(width+' '+route+' single H1',await evaluate("document.querySelectorAll('h1').length===1"));
      check(width+' '+route+' no horizontal overflow',await evaluate('document.documentElement.scrollWidth<=innerWidth+2'));
      check(width+' '+route+' footer callback',await evaluate("!!document.querySelector('.footer-callback form')"));
      await evaluate("document.querySelector('.nav-cta').click()");
      await delay(150);
      check(width+' '+route+' header callback opens',await evaluate("document.querySelector('dialog').open"));
      await evaluate("document.querySelector('.dialog-close').click()");
      if(route==='/')check('Three hero audiences',await evaluate("document.querySelectorAll('.hero-audiences a').length===3"));
      if(['/programs','/colleges','/corporates'].includes(route)){
        check(route+' card count',await evaluate("document.querySelectorAll('.offering-card').length") === (route==='/programs'?11:5));
        await evaluate("document.querySelector('.offering-card button').click()");
        await delay(150);
        check(route+' offering form opens',await evaluate("document.querySelector('dialog').open && document.querySelector('dialog').innerText.includes(document.querySelector('.offering-card h3').innerText)"));
        await evaluate("document.querySelector('.dialog-close').click()");
      }
      if(route==='/resources'){
        check('14 resources',await evaluate("document.querySelectorAll('.resource-card').length===14"));
        check('Download labels',await evaluate("[...document.querySelectorAll('.resource-card button')].every(b=>b.textContent.trim()==='Download ↓')"));
        await evaluate("document.querySelector('.resource-card button').click()");
        await delay(100);
        await evaluate(`document.querySelector('dialog input[name=name]').value='Test visitor';document.querySelector('dialog input[name=email]').value='test@example.com';document.querySelector('dialog input[name=phone]').value='1234567890';document.querySelector('dialog input[type=checkbox]').checked=true;document.querySelector('dialog form').requestSubmit()`);
        await delay(100);
        check('Gated download released',await evaluate("!!document.querySelector('dialog a[download]')"));
        await evaluate("document.querySelector('.dialog-close').click()");
      }
      if(route==='/'||route==='/programs'||route==='/resources')await screenshot(route.replace('/','')||'home'+width);
    }
  }
  await navigate('/programs');
  for(const label of ['Free master class','Book free session','Get updates']){
    await evaluate(`Array.from(document.querySelectorAll('.brief-entry button')).find(b=>b.textContent.includes(${JSON.stringify(label)})).click()`);
    await delay(150);
    check(label+' form opens',await evaluate("document.querySelector('dialog').open"));
    check(label+' at most six fields',await evaluate("document.querySelectorAll('dialog input,dialog select,dialog textarea').length<=6"));
    await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
    await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
    await delay(100);
    check('Escape closes form',await evaluate("!document.querySelector('dialog').open"));
  }
  await navigate('/corporates');
  await evaluate("document.querySelector('.resource-card button').click()");
  await delay(150);
  await evaluate("document.querySelector('dialog input[name=name]').value='Test';document.querySelector('dialog input[name=email]').value='test@gmail.com';document.querySelector('dialog input[name=phone]').value='1234567890';document.querySelector('dialog input[type=checkbox]').checked=true;document.querySelector('dialog form').requestSubmit()");
  await delay(150);
  check('Corporate resource requires work email',await evaluate("!!document.querySelector('dialog [role=alert]') && !document.querySelector('dialog a[download]')"));
  check('Sample file reachable',(await fetch('http://localhost:3102/downloads/resource-sample.txt')).ok);
  check('No runtime errors',errors.length===0);
  await writeFile(path.join(output,'report.json'),JSON.stringify({checks,errors},null,2));
} finally {if(ws)ws.close();chrome.kill();}
