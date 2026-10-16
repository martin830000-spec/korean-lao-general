'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto'),vm=require('node:vm'),{test}=require('node:test');
const html=fs.readFileSync('index.html','utf8'),version=JSON.parse(fs.readFileSync('version.json','utf8')),prompt=JSON.parse(fs.readFileSync('prompt-config.json','utf8'));
const decode=s=>s.replace(/&(?:#x([0-9a-f]+)|#([0-9]+)|lt|gt|amp|quot|apos);/gi,(ent,h,d)=>h?String.fromCodePoint(parseInt(h,16)):d?String.fromCodePoint(Number(d)):({'&lt;':'<','&gt;':'>','&amp;':'&','&quot;':'"','&apos;':"'"})[ent.toLowerCase()]||ent);
const m=html.match(/<textarea id="payload-general"[^>]*data-sha256="([a-f0-9]{64})"[^>]*>/);assert.ok(m);const p=m.index+m[0].length,src=decode(html.slice(p,html.indexOf('</textarea>',p)));
test('Service 207 identity, prompt G158A, back/prompt settings and embedded hash',()=>{
 assert.equal(version.version,'V3.61.207');assert.match(version.build,/SERVICE-VOICE-ROUTE-SINGLEPASS-R1/);
 assert.equal(crypto.createHash('sha256').update(src).digest('hex'),m[1]);
 assert.match(src,/const APP_DEPLOYMENT_CHANNEL='SERVICE'/);assert.match(src,/const APP_VERSION='V3\.61\.207'/);
 assert.match(html,/korean_lao_general_prompt_config_service_lkg_v1/);
 assert.doesNotMatch(html,/korean_lao_general_prompt_config_test_lkg_v1/);
 assert.match(src,/siblingPath\('wife'\)/); assert.doesNotMatch(src,/siblingPath\('laos-translator'\)/);
 assert.match(JSON.stringify(prompt),/G158A/);
 assert.match(src,/const BUILD_ID='20261016-V3\.61\.207-SERVICE-VOICE-ROUTE-SINGLEPASS-R1'/);
 assert.match(html,/const GENERAL_BUILD="20261016-V3\.61\.207-SERVICE-VOICE-ROUTE-SINGLEPASS-R1"/);
});
test('Bilingual release notes and no previously rejected Android IME R3',()=>{
 assert.match(src,/service-v361207-voice-route-singlepass-r1/);
 assert.match(src,/음성 경로 안정화 R2/);
 assert.match(src,/ປັບປຸງເສັ້ນທາງສຽງ R2/);
 assert.doesNotMatch(src,/android-ime-return-r3/);
});
test('General shell and inner scripts compile',()=>{
 for(const source of [html,src])for(const sc of source.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi))if(!/type=['"]application\/json/.test(sc[1]))new vm.Script(sc[2]);
});
test('Production text remains one direct Gemini call per explicit action',()=>{
 const m=src.match(/async function geminiRequest\([^\n]+/);assert.ok(m);assert.match(m[0],/return directGemini\(/);assert.doesNotMatch(m[0],/relayGemini\(/);
});
