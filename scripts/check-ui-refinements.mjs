import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const output=path.resolve('.artifacts/ui-refinements');
await mkdir(output,{recursive:true});
const browser=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--disable-gpu','--no-first-run','--remote-debugging-port=9241',`--user-data-dir=${path.join(output,'profile')}`,'about:blank'],{windowsHide:true,stdio:'ignore'});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
let ws; let seq=0; const pending=new Map(); const errors=[];
try {
 let tabs; for(let i=0;i<40;i++){try{tabs=await fetch('http://127.0.0.1:9241/json').then(r=>r.json());break;}catch{await delay(250);}}
 if(!tabs)throw new Error('Browser unavailable');
 ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
 ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pending.has(m.id)){const p=pending.get(m.id);clearTimeout(p.timer);pending.delete(m.id);m.error?p.reject(new Error(JSON.stringify(m.error))):p.resolve(m.result);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text);};
 const cdp=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;const timer=setTimeout(()=>reject(new Error('Timeout '+method)),25000);pending.set(id,{resolve,reject,timer});ws.send(JSON.stringify({id,method,params}));});
 const evaluate=async expression=>{const r=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
 await cdp('Page.enable');await cdp('Runtime.enable');
 const routes=process.argv.slice(2);
 for(const width of [1440,390])for(const route of (routes.length ? routes : ['/','/programs','/colleges','/corporates','/resources','/about','/events','/contact'])){
  await cdp('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
  await cdp('Page.navigate',{url:'http://localhost:3001'+route});
  let ready=false;for(let i=0;i<100;i++){await delay(300);if(await evaluate("document.readyState==='complete'&&!!document.querySelector('h1')&&!!document.querySelector('footer')")){ready=true;break;}}
  if(!ready)throw new Error('Page did not load '+route);
  await evaluate("localStorage.setItem('accent-cookie-consent','rejected')");
  await delay(900);
  const check=await evaluate("({overflow:document.documentElement.scrollWidth>innerWidth+2,heading:getComputedStyle(document.querySelector('.footer-callback h2')).color,cards:document.querySelectorAll('.offering-card').length})");
  if(check.overflow||check.heading!=='rgb(255, 255, 255)')throw new Error(route+' '+width+' '+JSON.stringify(check));
  console.log('PASS',route,width,JSON.stringify(check));
  if(width>640 && ['/programs','/colleges','/corporates'].includes(route)) {
   const balanced=await evaluate("[...document.querySelectorAll('.offering-grid')].every(grid => grid.children.length % 2 === 0 || Math.abs(grid.lastElementChild.getBoundingClientRect().width-grid.getBoundingClientRect().width)<2)");
   if(!balanced)throw new Error('Odd-card row does not fill grid '+route);
   await evaluate("document.querySelector('.offering-grid').scrollIntoView({behavior:'instant',block:'start'})");await delay(900);
   const shot=await cdp('Page.captureScreenshot',{format:'png'});await writeFile(path.join(output,route.slice(1)+'-cards.png'),Buffer.from(shot.data,'base64'));
   await evaluate("window.scrollTo({top:0,behavior:'instant'})");await delay(200);
  }
  if(['/programs','/resources'].includes(route)){const shot=await cdp('Page.captureScreenshot',{format:'png'});await writeFile(path.join(output,route.slice(1)+'-'+width+'.png'),Buffer.from(shot.data,'base64'));}
  await evaluate("document.querySelector('.nav-cta').click()");await delay(100);
  if(!await evaluate("document.querySelector('dialog').open"))throw new Error('Callback failed '+route);
  await evaluate("document.querySelector('.dialog-close').click()");
 }
 if(errors.length)throw new Error(errors.join('\n'));
 console.log('All layout and callback checks passed. No form submissions made.');
}finally{if(ws)ws.close();browser.kill();}
