import assert from 'node:assert/strict';
import { PSR2021_CHAPTER6, retrievePSR2021Chapter6 } from '../src/data/psr2021Chapter6';
import { RAGEngine } from '../src/services/ragEngine';

assert.equal(PSR2021_CHAPTER6.length, 11);
assert.deepEqual(PSR2021_CHAPTER6.map(r=>r.ruleNumber), Array.from({length:11},(_,i)=>'0601'+String(i+1).padStart(2,'0')));
assert.equal(new Set(PSR2021_CHAPTER6.map(r=>r.ruleNumber)).size,11);
const text = (n: string) => PSR2021_CHAPTER6.find(r=>r.ruleNumber===n)!.fullText;
for (const award of ['Presidential Distinguished Public Service Career Award','Presidential Public Service Merit Award','Head of the Service of the Federation Commendation Award','The Public Service Excellence Award','Sports Achievement Award','Recognition of Retired Permanent Secretaries']) assert.ok(text('060105').includes(award),award);
for(const term of ['15, 25 or 35','certificates','letter of commendation','engraved plaques','medals','cash gifts','Masterclass','Hall of Fame','foreign short course']) assert.ok(PSR2021_CHAPTER6.some(r=>r.fullText.includes(term)),term);
assert.ok(text('060111').includes('annually') && text('060111').includes('monthly Service Welfare Newsletter'));
const cases: [string,string][] = [
  ['What is the difference between reward and recognition?','060101'],
  ['What are the six categories of public service awards?','060105'],
  ['What forms of reward include cash gifts and plaques?','060109'],
  ['Who constitutes selection committees and sets weightings?','060110'],
  ['When is the annual awards ceremony and newsletter publication?','060111'],
  ['Which circular communicates award criteria?','060108'],
  ['Explain Rule 060104','060104']
];
for (const [query, expected] of cases) {
  const found=RAGEngine.retrieveRules(query,5);
  assert.equal(found[0]?.rule.ruleNumber,expected,'Retrieval failed: '+query);
  assert.equal(found[0]?.rule.fullText,text(expected));
  assert.ok(retrievePSR2021Chapter6(query,5).length>0);
}
assert.equal(retrievePSR2021Chapter6('What is the appointment procedure under Chapter 2?',5).length,0);
assert.equal(retrievePSR2021Chapter6('Explain confirmation examinations in Chapter 3',5).length,0);
console.log('Chapter 6: 11 complete rules, source coverage, 7 retrieval cases and cross-chapter isolation passed.');
