/**
 * Revised PSR 2021 Chapter 5 — original page-by-page transcript.
 * Source PDF pages 42–50. Do not edit source wording to improve policy.
 * Printed numbering irregularities (050301: i, ii, iv; 050601: iv repeated) are preserved.
 */
import p42 from '../../docs/psr2021-chapter5/page-42.md?raw';
import p43 from '../../docs/psr2021-chapter5/page-43.md?raw';
import p44 from '../../docs/psr2021-chapter5/page-44.md?raw';
import p45 from '../../docs/psr2021-chapter5/page-45.md?raw';
import p46 from '../../docs/psr2021-chapter5/page-46.md?raw';
import p47 from '../../docs/psr2021-chapter5/page-47.md?raw';
import p48 from '../../docs/psr2021-chapter5/page-48.md?raw';
import p49 from '../../docs/psr2021-chapter5/page-49.md?raw';
import p50 from '../../docs/psr2021-chapter5/page-50.md?raw';

const originalPages = [p42,p43,p44,p45,p46,p47,p48,p49,p50];
export const PSR2021_CHAPTER5_PAGES = originalPages.map((markdown,index) => ({
  pdfPage: index + 42,
  text: markdown.replace(/^# [^\n]*\n\nSource:[^\n]*\n\n/, '').trim()
}));

const sourceText = PSR2021_CHAPTER5_PAGES.map(p => p.text).join('\n\n');
const ruleMatches = Array.from(sourceText.matchAll(/^\s*(050\d{3})\s*[-.:]/gm));
export const PSR2021_CHAPTER5_RULES = ruleMatches.map((match,index) => {
  const start = match.index ?? 0;
  const end = ruleMatches[index+1]?.index ?? sourceText.length;
  const fullText = sourceText.slice(start,end).trim()
    .replace(/\n\s*SECTION\s+[1-7][^\n]*(?:\n[A-Z][A-Z\s()/–-]+)?\s*$/g,'').trim();
  const pdfPages = PSR2021_CHAPTER5_PAGES.filter(p => {
    const markerStart = sourceText.indexOf(p.text);
    const markerEnd = markerStart + p.text.length;
    return markerStart < end && markerEnd > start;
  }).map(p => p.pdfPage);
  return {ruleNumber:match[1], fullText, pdfPages};
});

const STOP = new Set(['what','does','about','under','the','and','for','are','with','that','this','from','which','explain','rule','psr','2021','chapter','please','tell','show','give','officer','officers']);
export function retrievePSR2021Chapter5(query:string):string|null {
  const q=query.toLowerCase();
  const explicit=Array.from(q.matchAll(/\b050\d{3}\b/g),m=>m[0]);
  if (explicit.length) {
    const found=PSR2021_CHAPTER5_RULES.filter(r=>explicit.includes(r.ruleNumber));
    return found.length ? found.map(r=>`**PSR 2021 Rule ${r.ruleNumber}** (source PDF pages ${r.pdfPages.join(', ')})\n\n${r.fullText}`).join('\n\n---\n\n') :
      'The requested Chapter 5 rule was not located in the supplied PSR 2021 pages 42–50. Please confirm the rule number.';
  }
  const hasChapter=/\bchapter\s*(?:0?5|five)\b/i.test(query);
  const pageMatch=q.match(/\b(?:pdf\s*)?page\s*(4[2-9]|50)\b/);
  if (hasChapter && pageMatch) {
    const page=PSR2021_CHAPTER5_PAGES.find(p=>p.pdfPage===Number(pageMatch[1]));
    return page ? `### Revised PSR 2021 — Chapter 5 — PDF page ${page.pdfPage}\n\n${page.text}` : null;
  }
  if (hasChapter && /\b(full|entire|all|copy|complete|verbatim|page by page|transcri)/.test(q)) {
    return PSR2021_CHAPTER5_PAGES.map(p=>`### PDF page ${p.pdfPage}\n\n${p.text}`).join('\n\n---\n\n');
  }
  const words=q.match(/[a-z]{4,}/g)?.filter(w=>!STOP.has(w)) ?? [];
  if (!words.length) return hasChapter ? `Chapter 5 of the Revised PSR 2021 is Performance Management System. It contains 23 rules (050101–050703) across PDF pages 42–50. Ask for a rule number or the full chapter.` : null;
  const scored=PSR2021_CHAPTER5_RULES.map(rule=>{
    const body=rule.fullText.toLowerCase();
    const score=words.reduce((n,w)=>n+(body.includes(w)?1:0),0);
    return {rule,score};
  }).filter(x=>x.score >= Math.min(2,words.length)).sort((a,b)=>b.score-a.score);
  if (!hasChapter && !/performance|appraisal|probation report|pms|underperformance|kpi|improvement plan|reporting officer/i.test(query)) return null;
  if (!scored.length) return null;
  return scored.slice(0,3).map(({rule})=>`**PSR 2021 Rule ${rule.ruleNumber}** (source PDF pages ${rule.pdfPages.join(', ')})\n\n${rule.fullText}`).join('\n\n---\n\n');
}
