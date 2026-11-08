/** Revised PSR 2021 Chapter 7 — three page text extraction.
 * Master source: PSR_2021_EDITION.pdf (157-page edition), pages 68–70.
 * Corrected OCR is not certified verbatim. Each rule links to its source scan.
 */
import p68 from '../../docs/psr2021-chapter7/page-68.md?raw';
import p69 from '../../docs/psr2021-chapter7/page-69.md?raw';
import p70 from '../../docs/psr2021-chapter7/page-70.md?raw';

const original=[p68,p69,p70];
export const PSR2021_CH7_PAGES=original.map((md,i)=>{
  const body=md.replace(/^#[^\n]*\n\nSOURCE:[^\n]*\nSTATUS:[^\n]*\n\n/,'').split('[MARGINAL HEADINGS]')[0].trim();
  return {pdfPage:68+i,text:body,image:`${import.meta.env.BASE_URL}psr2021/chapter7/page-${68+i}.png`};
});
const all=PSR2021_CH7_PAGES.map(p=>p.text).join('\n\n');
const starts=[...all.matchAll(/^\s*(070[1-3]\d{2})\.\s*[—-]/gm)];
export const PSR2021_CH7_RULES=starts.map((m,i)=>{
  const start=m.index??0;
  const end=starts[i+1]?.index??all.length;
  const fullText=all.slice(start,end).trim();
  const pages=PSR2021_CH7_PAGES.filter(p=>{
    const lo=all.indexOf(p.text);return lo<end&&lo+p.text.length>start;
  }).map(p=>p.pdfPage);
  return {ruleNumber:m[1],fullText,pdfPages:pages};
});
const expected=[...Array.from({length:5},(_,i)=>'07010'+(i+1)),...Array.from({length:10},(_,i)=>'0702'+String(i+1).padStart(2,'0')),...Array.from({length:4},(_,i)=>'07030'+(i+1))];
if(PSR2021_CH7_PAGES.length!==3 || PSR2021_CH7_RULES.length!==19 ||
   expected.some((n,i)=>PSR2021_CH7_RULES[i]?.ruleNumber!==n) ||
   PSR2021_CH7_RULES.find(r=>r.ruleNumber==='070105')?.pdfPages.join(',')!=='68,69'){
  throw Error('Chapter 7 source integrity failed: 19 rules, 3 pages and cross-page Rule 070105 required');
}
export const PSR2021_CH7_SECTIONS=[
  'General',
  'Courses of Instruction Outside Nigeria',
  'Externally Assisted Courses'
] as const;
const pageLinks=(pages:number[])=>pages.map(n=>`[original PDF page ${n}](${import.meta.env.BASE_URL}psr2021/chapter7/page-${n}.png)`).join(', ');
const caveat='Source: 2021 Library-master edition, cleaned OCR transcription; original page scans are authoritative. Final word-for-word proofreading remains pending.';
const stop=new Set(['what','about','under','from','the','and','does','chapter','this','that','rule','psr','2021','which','explain','please','tell','show','give','officer','officers','training']);
export function retrievePSR2021Chapter7(query:string):string|null{
  const q=query.toLowerCase();
  const requested=[...q.matchAll(/\b07\d{4}\b/g)].map(m=>m[0]);
  if(requested.length){
    const found=PSR2021_CH7_RULES.filter(r=>requested.includes(r.ruleNumber));
    return found.length?found.map(r=>`**PSR 2021 Rule ${r.ruleNumber}** — ${pageLinks(r.pdfPages)}\n\n${r.fullText}\n\n${caveat}`).join('\n\n---\n\n'):'The requested Chapter 7 rule is not present in the 2021 edition (070101–070304).';
  }
  const chapter=/\bchapter\s*(?:0?7|seven)\b/i.test(query);
  const pageNumber=q.match(/\b(?:pdf\s*)?page\s*(68|69|70)\b/);
  if(chapter && pageNumber){
    const p=PSR2021_CH7_PAGES.find(p=>p.pdfPage===Number(pageNumber[1]));
    return p ? `**Chapter 7 — source PDF page ${p.pdfPage}** ([original page scan](${p.image}))\n\n${p.text}\n\n${caveat}`:null;
  }
  if(chapter&&/\b(full|entire|all|copy|verbatim|page by page|transcript|complete)\b/i.test(query))
    return PSR2021_CH7_PAGES.map(p=>`### PDF page ${p.pdfPage} ([source scan](${p.image}))\n\n${p.text}`).join('\n\n---\n\n')+'\n\n'+caveat;
  if(chapter&&(/\b(what|overview|summary|outline|content|contain|about|sections|cover)\b/i.test(query)||q.trim()==='chapter 7')){
    return 'Chapter 7 — Training and Staff Development Within and Outside Nigeria, Revised PSR 2021. It has 3 sections: (1) General, (2) Courses of Instruction Outside Nigeria and (3) Externally Assisted Courses. Its 19 rules cover 070101–070304, on PDF pages 68–70. Ask for an individual rule or page to view the source transcription.';
  }
  if(!chapter&&!/course of instruction|overseas training|staff development|externally assisted courses|sponsorship|donor training/i.test(query))return null;
  const words=(q.match(/[a-z]{4,}/g)||[]).filter(w=>!stop.has(w));
  const ranks=PSR2021_CH7_RULES.map(rule=>({rule,score:words.reduce((n,w)=>n+(rule.fullText.toLowerCase().includes(w)?1:0),0)}))
    .filter(x=>x.score>=Math.min(2,words.length)).sort((a,b)=>b.score-a.score);
  if(!ranks.length)return chapter?'Chapter 7 of the 2021 PSR contains 3 sections and 19 rules. Ask for a specific six-digit rule number.':null;
  return ranks.slice(0,3).map(({rule:r})=>`**PSR 2021 Rule ${r.ruleNumber}** — ${pageLinks(r.pdfPages)}\n\n${r.fullText}\n\n${caveat}`).join('\n\n---\n\n');
}
