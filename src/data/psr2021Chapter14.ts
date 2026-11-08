/** Revised PSR 2021, Chapter 14 — Allowances. PDF pages 116–123.
 * This is an OCR index and is not certified as word-for-word verbatim.
 * The original source scans remain authoritative.
 */
import p116 from '../../docs/psr2021-chapter14/page-116.md?raw';
import p117 from '../../docs/psr2021-chapter14/page-117.md?raw';
import p118 from '../../docs/psr2021-chapter14/page-118.md?raw';
import p119 from '../../docs/psr2021-chapter14/page-119.md?raw';
import p120 from '../../docs/psr2021-chapter14/page-120.md?raw';
import p121 from '../../docs/psr2021-chapter14/page-121.md?raw';
import p122 from '../../docs/psr2021-chapter14/page-122.md?raw';
import p123 from '../../docs/psr2021-chapter14/page-123.md?raw';

function segment(text:string,start:string,end?:string):string {
  const a=text.indexOf(start);
  if(a<0)throw Error('PSR Chapter 14 source anchor missing: '+start);
  const b=end ? text.indexOf(end,a+start.length) : -1;
  if(end&&b<0)throw Error('PSR Chapter 14 end marker missing: '+end);
  return text.slice(a,b<0?undefined:b).trim();
}
// Remove side-margin OCR noise; retain sequential paragraphs and continuations.
// Raw OCR and source scans are separately archived without alteration.
const source=[
  segment(p116,'CHAPTER 14\nALLOWANCES','\nDefinition.\n'),
  segment(p117,'(iii) GL. 07'),
  segment(p118,'undertake course of instruction','\nOfficial\nVisit while'),
  segment(p119,'concerned shall be entitled'),
  segment(p120,'to 30 per cent','\nLocal\nTraining\nAllowance.'),
  segment(p121,'140124.—'),
  segment(p122,'140133.—','\nContract\nOfficer and'),
  segment(p123,'140144.—')
];
// On page 117, marginal text precedes the body, but the body itself has no
// marginal text after its first paragraph. Fix a few unambiguous OCR tokens.
source[1]=source[1].replace(/Daty Tour/g,'Duty Tour');
source[7]=source[7]
  .replace('N50,000.00\nNepean per annum','N50,000.00\nper annum')
  .replace('Pita Rat involvement','involvement');
export const PSR2021_CH14_PAGES=source.map((raw,i)=>({
  pdfPage:116+i,
  text:raw.replace(/^1401(\d{2}),—/gm,'1401$1.—')
          .replace(/\bvacation leaye\b/g,'vacation leave')
          .replace(/\bhote! accommodation\b/g,'hotel accommodation'),
  sourceImage:import.meta.env.BASE_URL+'psr2021/chapter14/page-'+(116+i)+'.png'
}));
// Fix the source-image properties after transforming the draft records.
export const PSR2021_CH14_SOURCE_IMAGES=PSR2021_CH14_PAGES.map(p=>
  import.meta.env.BASE_URL+'psr2021/chapter14/page-'+p.pdfPage+'.png'
);
const full=PSR2021_CH14_PAGES.map(p=>p.text).join('\n\n');
const markers=[...full.matchAll(/^1401(\d{2})\.—/gm)];
export const PSR2021_CH14_RULES=markers.map((marker,i)=>{
  const start=marker.index??0;
  const end=markers[i+1]?.index??full.length;
  const pages=PSR2021_CH14_PAGES.filter(p=>{
    const first=full.indexOf(p.text);
    return first<end && first+p.text.length>start;
  }).map(p=>p.pdfPage);
  return {ruleNumber:marker[0].slice(0,6),fullText:full.slice(start,end).trim(),pdfPages:pages,verified:false};
});
const expected=Array.from({length:44},(_,i)=>'1401'+String(i+1).padStart(2,'0'));
if(PSR2021_CH14_PAGES.length!==8||PSR2021_CH14_RULES.length!==44||
   expected.some((num,i)=>PSR2021_CH14_RULES[i]?.ruleNumber!==num)||
   PSR2021_CH14_RULES[0]?.pdfPages[0]!==116||
   PSR2021_CH14_RULES.at(-1)?.pdfPages.at(-1)!==123) {
  throw Error('PSR 2021 Chapter 14 integrity failure: expected 8 pages and 44 sequential rules');
}
const caveat='**OCR review required:** This is a provisional transcription, not certified verbatim. Verify amounts, item markers, conditions and wording against the original 2021 source scan.';
const links=(nums:number[])=>nums.map(n=>'[original PDF page '+n+']('+import.meta.env.BASE_URL+'psr2021/chapter14/page-'+n+'.png)').join(', ');
const stop=new Set(['what','does','rule','about','chapter','the','under','2021','psr','which','are','officer','officers','allowance','allowances','explain']);
export function retrievePSR2021Chapter14(question:string):string|null {
  const q=question.toLowerCase();
  const exact=[...q.matchAll(/\b14\d{4}\b/g)].map(m=>m[0]);
  if(exact.length){
    const found=PSR2021_CH14_RULES.filter(r=>exact.includes(r.ruleNumber));
    return found.length ? found.map(r=>'**PSR 2021 Rule '+r.ruleNumber+'** — '+links(r.pdfPages)+'\n\n'+r.fullText+'\n\n'+caveat).join('\n\n---\n\n') :
      'Rule '+exact.join(', ')+' was not found in Chapter 14 of PSR 2021 (140101–140144).';
  }
  const chapter=/\bchapter\s*(?:14|fourteen)\b/.test(q);
  const pageNo=q.match(/\b(?:pdf\s*)?page\s*(11[6-9]|12[0-3])\b/);
  if(chapter && pageNo){
    const page=PSR2021_CH14_PAGES.find(p=>p.pdfPage===Number(pageNo[1]));
    return page?'Chapter 14 — PDF page '+page.pdfPage+' — '+links([page.pdfPage])+'\n\n'+page.text+'\n\n'+caveat:null;
  }
  if(chapter&&/\b(full|complete|all|entire|verbatim|page by page|copy|transcript)\b/.test(q))
    return PSR2021_CH14_PAGES.map(p=>'### PDF page '+p.pdfPage+' — '+links([p.pdfPage])+'\n\n'+p.text).join('\n\n---\n\n')+'\n\n'+caveat;
  if(chapter&&(/\b(overview|summary|outline|contents|contain|what|cover|about)\b/.test(q)||q.trim()==='chapter 14'))
    return 'Chapter 14 of the Revised PSR 2021 is Allowances. It consists of 44 rules (140101–140144) on original PDF pages 116–123, addressing acting, duty tour, estacode, overtime, resettlement, teaching and other allowances. The original chapter has no separately numbered internal sections.';
  if(!chapter&&!/estacode|kilometer|resettlement|acting allowance|duty tour|overtime|wardrobe allowance|non.accident bonus|hardship allowance|warm clothing allowance|books allowance|project allowance|spectacle allowance|teaching allowance|allowances payable/i.test(q)) return null;
  const words=(q.match(/[a-z]{4,}/g)??[]).filter(w=>!stop.has(w));
  const scored=PSR2021_CH14_RULES.map(r=>({r,score:words.reduce((total,w)=>total+(r.fullText.toLowerCase().includes(w)?1:0),0)}))
    .filter(x=>x.score>=Math.min(2,words.length)).sort((a,b)=>b.score-a.score);
  if(!scored.length)return chapter?'Chapter 14 covers 44 rules numbered 140101–140144. Ask for a specific rule.':null;
  return scored.slice(0,3).map(({r})=>'**Rule '+r.ruleNumber+'** — '+links(r.pdfPages)+'\n\n'+r.fullText+'\n\n'+caveat).join('\n\n---\n\n');
}
