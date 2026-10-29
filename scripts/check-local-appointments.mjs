import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import {stripTypeScriptTypes} from 'node:module';
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'psr-appointment-'));
for(const dir of ['data','services','types']){
 fs.mkdirSync(path.join(temp,dir),{recursive:true});
 const dirs=[path.join(root,'src',dir)].filter(d=>fs.existsSync(d));
 for(const d of dirs)for(const name of fs.readdirSync(d)){
  let s=fs.readFileSync(path.join(d,name),'utf8').replace(/^import \{ (PSRChapter|PSRRule, RAGRetrievalResult|PSRTableOfContentsItem)[^\n]*from ['"]\.\.\/types\/psr['"];?\n/gm,'');
  s=stripTypeScriptTypes(s).replace(/(from\s+['"])(\.[^'"]+)(['"])/g,'$1$2.js$3');
  fs.writeFileSync(path.join(temp,dir,name.replace(/\.ts$/,'.js')),s);
 }
}
const c=fs.readFileSync(path.join(root,'src/components/ChatView.tsx'),'utf8');
const imports=c.split('\n').filter(l=>/^import /.test(l)&&/from '\.\.\/(data|services)\//.test(l)).join('\n');
const block=c.slice(c.indexOf('const locallyReviewedRules ='),c.indexOf('const PRESET_PROMPTS'));
const module=stripTypeScriptTypes(imports+'\n'+block+'\nexport {getLocalPSRAnswer};').replace(/(from\s+['"])(\.[^'"]+)(['"])/g,'$1$2.js$3');
fs.mkdirSync(path.join(temp,'components'));
fs.writeFileSync(path.join(temp,'components/localAnswer.js'),module);
const {getLocalPSRAnswer}=await import('file://'+path.join(temp,'components/localAnswer.js'));
const queries=[
 'what are the rules for appointment of officers in the Nigeria Public service',
 'What are the appointment rules for public officers?',
 'Explain appointments in the Nigerian public service',
 'How are officers appointed to the Federal Civil Service?',
 'Tell me about recruitment of officers'
];
for(const q of queries){
 const a=getLocalPSRAnswer(q);
 assert.ok(a,q);
 for(const n of ['020101','020102','020103','020206','020208'])assert.ok(a.includes(n),q+' missing '+n);
 assert.ok(!a.includes('could not retrieve'));
}
assert.ok(getLocalPSRAnswer('What is a contract appointment?').includes('020402'));
assert.ok(getLocalPSRAnswer('Copy Chapter 3 PDF page 35').includes('GROUP B'));
assert.equal(getLocalPSRAnswer('What is the weather?'),null);
console.log('PASS: exact user question, four appointment/recruitment variants, contract route, Chapter 3 full text, and unrelated-question rejection.');
fs.rmSync(temp,{recursive:true,force:true});
