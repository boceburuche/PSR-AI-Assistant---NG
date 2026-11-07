/** PSR 2021 Chapter 10 / Discipline / Library master 157-page edition, PDF pages 78–94.
 * PROVISIONAL OCR: word-for-word verification is pending; source page scans are authoritative.
 * Do not call these OCR transcripts verified verbatim until all 17 pages have been proofread.
 */
import page78 from '../../docs/psr2021-chapter10-ocr-review/page-78.md?raw';
import page79 from '../../docs/psr2021-chapter10-ocr-review/page-79.md?raw';
import page80 from '../../docs/psr2021-chapter10-ocr-review/page-80.md?raw';
import page81 from '../../docs/psr2021-chapter10-ocr-review/page-81.md?raw';
import page82 from '../../docs/psr2021-chapter10-ocr-review/page-82.md?raw';
import page83 from '../../docs/psr2021-chapter10-ocr-review/page-83.md?raw';
import page84 from '../../docs/psr2021-chapter10-ocr-review/page-84.md?raw';
import page85 from '../../docs/psr2021-chapter10-ocr-review/page-85.md?raw';
import page86 from '../../docs/psr2021-chapter10-ocr-review/page-86.md?raw';
import page87 from '../../docs/psr2021-chapter10-ocr-review/page-87.md?raw';
import page88 from '../../docs/psr2021-chapter10-ocr-review/page-88.md?raw';
import page89 from '../../docs/psr2021-chapter10-ocr-review/page-89.md?raw';
import page90 from '../../docs/psr2021-chapter10-ocr-review/page-90.md?raw';
import page91 from '../../docs/psr2021-chapter10-ocr-review/page-91.md?raw';
import page92 from '../../docs/psr2021-chapter10-ocr-review/page-92.md?raw';
import page93 from '../../docs/psr2021-chapter10-ocr-review/page-93.md?raw';
import page94 from '../../docs/psr2021-chapter10-ocr-review/page-94.md?raw';
import verified100402 from '../../knowledge/psr-2021/chapter-10/rule-100402-library-verified.txt?raw';

const imported = [page78,page79,page80,page81,page82,page83,page84,page85,page86,page87,page88,page89,page90,page91,page92,page93,page94];
export const PSR2021_CHAPTER10_PAGES = imported.map((markdown,index) => ({
  pdfPage: index + 78,
  text: markdown.split(/Transcription status:[^\n]*\n\n/)[1]?.trim() ?? '',
  sourceImage: `${import.meta.env.BASE_URL}psr2021/chapter10/page-${index+78}.png`,
  transcriptionVerified: false as const,
}));

const wholeChapter = PSR2021_CHAPTER10_PAGES.map(p=>p.text).join('\n\n');
const ruleStarts = [...wholeChapter.matchAll(/^\s*(100[1-8]\d{2})\s*[,.:—-]{1,4}/gm)];
const official100402 = verified100402.match(/100402\.\—[\s\S]*?(?=\n\nVERIFICATION:)/)?.[0]?.trim();
export const PSR2021_CHAPTER10_RULES = ruleStarts.map((match,i)=>{
  const start = match.index ?? 0;
  const end = ruleStarts[i+1]?.index ?? wholeChapter.length;
  const rawText = wholeChapter.slice(start,end).trim();
  const number = match[1];
  const pdfPages=PSR2021_CHAPTER10_PAGES.filter(p=>{
    const beginning=wholeChapter.indexOf(p.text);
    return beginning < end && beginning+p.text.length > start;
  }).map(p=>p.pdfPage);
  return {ruleNumber:number, fullText:number==='100402' && official100402 ? official100402 : rawText, pdfPages, verified:number==='100402' && !!official100402};
});
const expected = [4,8,14,36,1,1,1,1].reduce((a,n)=>a+n,0);
if (PSR2021_CHAPTER10_PAGES.length !== 17 || PSR2021_CHAPTER10_RULES.length !== expected ||
    new Set(PSR2021_CHAPTER10_RULES.map(r=>r.ruleNumber)).size !== expected ||
    !PSR2021_CHAPTER10_RULES.some(r=>r.ruleNumber==='100801') ||
    !PSR2021_CHAPTER10_RULES.some(r=>r.ruleNumber==='100402' && r.fullText.includes('(ae)'))) {
  throw new Error('PSR Chapter 10 source integrity failed: do not serve incomplete Chapter 10 data');
}
const STOP=new Set(['what','does','about','under','the','and','for','are','with','that','this','from','which','explain','rule','psr','2021','chapter','please','tell','show','give','officer','officers','public','service','section']);
const sourceLinks=(pages:number[])=>pages.map(n=>`[source page ${n}](${import.meta.env.BASE_URL}psr2021/chapter10/page-${n}.png)`).join(', ');
const disclaimer='**Transcription review:** Chapter 10 pages are searchable OCR from the 2021 edition. Except where noted as manually checked, spelling and punctuation may differ from the original scan; the linked source page is authoritative.';
export function retrievePSR2021Chapter10(query:string):string|null{
  const q=query.toLowerCase();
  const explicit=[...q.matchAll(/\b100[1-8]\d{2}\b/g)].map(x=>x[0]);
  if(explicit.length){
    const selected=PSR2021_CHAPTER10_RULES.filter(r=>explicit.includes(r.ruleNumber));
    if(!selected.length)return 'The requested Chapter 10 rule was not found in the 2021 edition. Check the six-digit PSR number.';
    return selected.map(r=>`**PSR 2021 Rule ${r.ruleNumber}** — PDF page(s) ${r.pdfPages.join(', ')} (${sourceLinks(r.pdfPages)})\n\n${r.fullText}\n\n${r.verified?'Verified against the 2021 source scan.':disclaimer}`).join('\n\n---\n\n');
  }
  const hasChapter=/\bchapter\s*(?:10|ten)\b|\bdisciplin(?:e|ary)\b/.test(q);
  const pageNumber=q.match(/\b(?:pdf\s*)?page\s*(7[8-9]|8\d|9[0-4])\b/);
  if(hasChapter && pageNumber){
    const p=PSR2021_CHAPTER10_PAGES.find(x=>x.pdfPage===Number(pageNumber[1]));
    return p ? `**PSR 2021 Chapter 10 — PDF page ${p.pdfPage}** ([original page scan](${p.sourceImage}))\n\n${disclaimer}\n\n${p.text}` : null;
  }
  if(hasChapter && /\b(full|all|entire|complete|verbatim|page by page|transcription|copy)\b/.test(q)){
    return disclaimer+'\n\n'+PSR2021_CHAPTER10_PAGES.map(p=>`### PDF page ${p.pdfPage} ([source scan](${p.sourceImage}))\n\n${p.text}`).join('\n\n---\n\n');
  }
  if(!hasChapter && !/interdiction|suspension|serious misconduct|disciplinary|dismissal|financial embarrassment|misconduct|termination for inefficiency/.test(q)) return null;
  const words=q.match(/[a-z]{4,}/g)?.filter(w=>!STOP.has(w)) ?? [];
  const scored=PSR2021_CHAPTER10_RULES.map(rule=>({
    rule, score:words.reduce((total,w)=>total+(rule.fullText.toLowerCase().includes(w)?1:0),0)
  })).filter(x=>x.score>=Math.min(2,words.length)).sort((a,b)=>b.score-a.score);
  if(!scored.length) return hasChapter ? 'Chapter 10 of the revised PSR 2021 is Discipline. It has eight sections and 66 rules across PDF pages 78–94. Ask for a specific rule number or the full chapter.' : null;
  return scored.slice(0,3).map(({rule:r})=>`**PSR 2021 Rule ${r.ruleNumber}** (PDF pages ${r.pdfPages.join(', ')}; ${sourceLinks(r.pdfPages)})\n\n${r.fullText}\n\n${r.verified?'Verified source text.':disclaimer}`).join('\n\n---\n\n');
}
