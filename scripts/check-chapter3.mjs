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
const {PSR2021_CHAPTER3,PSR2021_CHAPTER3_PAGES,formatPSR2021Chapter3Pages}=await import('file://'+path.join(temp,'data/psr2021Chapter3.js'));
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
assert.deepEqual(PSR2021_CHAPTER3_PAGES.map(p=>p.pdfPage),[32,33,34,35,36,37]);
const full=RAGEngine.generateOfflineResponse('Copy Chapter 3 in full, page by page',RAGEngine.retrieveRules('Chapter 3'));
for(const page of PSR2021_CHAPTER3_PAGES){
 assert.ok(full.includes(page.text),'Full page body preserved: '+page.pdfPage);
 for(const note of Object.values(page.marginNotes))assert.ok(full.includes(note),'Margin note preserved');
 const single=RAGEngine.generateOfflineResponse('Show Chapter 3 PDF page '+page.pdfPage,[]);
 assert.ok(single.includes(page.text));
 assert.equal((single.match(/=== PDF PAGE/g)||[]).length,1);
}
const board=PSR2021_CHAPTER3.find(r=>r.ruleNumber==='030103').fullText;
for(const label of ['(a)','(b)','(c)','(d)','(e)','(f)','(g)','(h)','(i)'])assert.ok(board.includes(label));
assert.ok(board.includes('[PDF PAGE 33]'));
const syllabus=PSR2021_CHAPTER3.find(r=>r.ruleNumber==='030202').fullText;
for(const roman of ['i.','ii.','iii.','iv.','v.','vi.','vii.','viii.','ix.','x.','xi.','xii.','xiii.','xiv.','xv.','xvi.','xvii.','xviii.','xix.'])assert.ok(syllabus.includes(roman));
for(const token of ['447','513','192','331','333','335','503','GROUP A','GROUP B','GROUP C','[PDF PAGE 35]','[PDF PAGE 36]'])assert.ok(syllabus.includes(token));
for(const rule of PSR2021_CHAPTER3){
 assert.ok(rule.fullText.includes(rule.ruleNumber));
 assert.ok(!rule.fullText.includes('Source-checked paraphrase'));
 const response=RAGEngine.generateOfflineResponse('Copy rule '+rule.ruleNumber,RAGEngine.retrieveRules(rule.ruleNumber));
 assert.ok(response.includes(rule.fullText),'Rule fullText rendered without truncation: '+rule.ruleNumber);
}
assert.ok(formatPSR2021Chapter3Pages().includes('030601'));
console.log('PASS: six full-page bodies and all margin notes; six individual-page responses; nine board members; 19 Group B subjects; legislation table; cross-page continuity; all 17 rule texts rendered without truncation.');

fs.rmSync(temp,{recursive:true,force:true});
