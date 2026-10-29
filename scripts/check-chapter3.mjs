import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {stripTypeScriptTypes} from 'node:module';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');

const temp=fs.mkdtempSync(path.join(os.tmpdir(),'psr-ch3-'));
// Compile test copies with Node's native TypeScript stripper. Production TS remains unchanged.
for (const dir of ['data','services','types']) {
 fs.mkdirSync(path.join(temp,dir),{recursive:true});
 for (const name of fs.readdirSync(path.join(root,'src',dir))) {
  let s=read('src/'+dir+'/'+name).replace(/^import \{ (PSRChapter|PSRRule, RAGRetrievalResult|PSRTableOfContentsItem)[^\n]*from ['"]\.\.\/types\/psr['"];?\n/gm,'');
  s=stripTypeScriptTypes(s).replace(/(from\s+['"])(\.[^'"]+)(['"])/g,'$1$2.js$3');
  fs.writeFileSync(path.join(temp,dir,name.replace(/\.ts$/,'.js')),s);
 }
}

import assert from 'node:assert/strict';
const {RAGEngine}=await import('file://'+path.join(temp,'services/ragEngine.js'));
const {PSR2021_CHAPTER3}=await import('file://'+path.join(temp,'data/psr2021Chapter3.js'));
const tests=[
 ['When must I take the confirmation examination?','030105',/two years.*three years/s],
 ['I failed COMPRO three consecutive attempts','030104',/resign or withdraw/],
 ['Are lawyers exempt from all confirmation exams?','030109',/does not exempt.*all/s],
 ['Can I sit the confirmation examination after six months?','030501',/six months/],
 ['How often is the confirmation exam held?','030106',/once a year/],
 ['Who chairs the confirmation examination board?','030103',/CMO.*Chairman/s],
 ['What is CSGM accelerated advancement?','030302',/one year.*GL|GL.06.*one year/s],
 ['Which junior COMPRO II subjects include Mathematics?','030301',/GL.03/],
 ['What are the invigilator fees?','030601',/no fixed/],
 ['What replaces an unavailable confirmation Gazette?','030502',/COMPRO/],
 ['Can I use books in confirmation General Paper?','030107',/not allowed/],
 ['What does Group A two papers mean in COMPRO?','030202',/under Group A/],
 ['Which police officers take confirmation exams?','030401',/unconfirmed senior Police/],
 ['Is Chapter 3 Discipline?','030101',/induction/]
];
for(const [q,id,re] of tests){const r=RAGEngine.retrieveRules(q); assert.equal(r[0]?.rule.ruleNumber,id,q); assert.match(RAGEngine.generateOfflineResponse(q,r),re,q);}
for(const rule of PSR2021_CHAPTER3){const r=RAGEngine.retrieveRules('Explain rule '+rule.ruleNumber);assert.equal(r[0].rule.ruleNumber,rule.ruleNumber);assert.equal(r[0].rule.chapterTitle,'Prescribed Examination for Confirmation');}
assert.equal(PSR2021_CHAPTER3.length,17);
assert.equal(new Set(PSR2021_CHAPTER3.map(r=>r.ruleNumber)).size,17);
assert.deepEqual(RAGEngine.retrieveRules('Explain rule 030406'),[]);
assert.match(RAGEngine.generateOfflineResponse('Explain rule 030406',[]),/not found/);
assert.equal(RAGEngine.retrieveRules('Explain rule 010101')[0].rule.ruleNumber,'010101');
console.log('PASS: 14 scenario checks; 17 exact-rule lookups; completeness/uniqueness; unknown legacy-rule rejection; Chapter 1 regression.');

fs.rmSync(temp,{recursive:true,force:true});
