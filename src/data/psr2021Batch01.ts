/**
 * Revised PSR 2021: first OCR batch (PDF pages 1–10).
 * This is a provisional retrieval layer, not a verified statutory transcript.
 * Never describe these OCR excerpts as exact quotations without source verification.
 * Legacy psrCorpus.ts contains 2008-edition material and must not be attributed to 2021.
 */
export type PSR2021Excerpt = {
  ruleNumber: string;
  pdfPage: number;
  topic: string;
  excerpt: string;
  verification: 'OCR_UNVERIFIED';
};
export const PSR2021_BATCH_01: PSR2021Excerpt[] = [
  { ruleNumber:'010101',pdfPage:1,topic:'Application of the Public Service Rules',excerpt:'The provisions of the Public Service Rules (PSR) shall be strictly enforced by all Ministries, Extra-Ministerial Offices and Agencies.',verification:'OCR_UNVERIFIED' },
  { ruleNumber:'010102',pdfPage:1,topic:'Conformity with the Constitution',excerpt:'These Rules apply only to the extent that they are not inconsistent with the provisions of the Constitution of the Federal Republic of Nigeria.',verification:'OCR_UNVERIFIED' },
  { ruleNumber:'010103',pdfPage:1,topic:'Responsibility of officers',excerpt:'It shall be the duty of every officer to acquaint himself with the Public Service Rules and other extant regulations and circulars.',verification:'OCR_UNVERIFIED' },
  { ruleNumber:'010106',pdfPage:4,topic:'Amendment by circular',excerpt:'The Federal Government may amend any of the provisions contained herein by issuing an appropriate Circular during the lifespan of a PSR.',verification:'OCR_UNVERIFIED' },
  { ruleNumber:'020103',pdfPage:6,topic:'Junior staff appointments',excerpt:'Each Ministry/Extra-Ministerial Office shall appoint Junior Staff on GL. 06 and below.',verification:'OCR_UNVERIFIED' },
  { ruleNumber:'020104',pdfPage:6,topic:'Incremental date',excerpt:'The incremental date of an Officer appointed, or promoted to a post in the Federal Public Service shall be 1st January of every year provided such Officer has spent at least six (6) months on the Grade with good performance before enjoying the increment.',verification:'OCR_UNVERIFIED' },
  { ruleNumber:'020106',pdfPage:7,topic:'Unpaid staff',excerpt:'The employment of unpaid Staff is prohibited.',verification:'OCR_UNVERIFIED' },
  { ruleNumber:'020205',pdfPage:8,topic:'Probation',excerpt:'Except where the Federal Civil Service Commission decides otherwise, all first appointments to pensionable establishment in posts other than trainee posts will be on probation.',verification:'OCR_UNVERIFIED' },
  { ruleNumber:'020301',pdfPage:10,topic:'Probationary period',excerpt:'Officers on probation will be required to serve for two years before being confirmed in the Service.',verification:'OCR_UNVERIFIED' },
  { ruleNumber:'020306',pdfPage:10,topic:'Confirmation examination eligibility',excerpt:'Newly recruited Officer who has spent six months and above shall be allowed to sit for compulsory examinations for confirmation in the Service.',verification:'OCR_UNVERIFIED' }
];
export function retrievePSR2021Batch01(query:string,limit=4):PSR2021Excerpt[]{
 const q=query.toLowerCase();
 const tokens=[...new Set(q.match(/[a-z0-9]{3,}/g)||[])];
 return PSR2021_BATCH_01.map(item=>({item,score:(q.includes(item.ruleNumber)?100:0)+tokens.reduce((s,t)=>s+(item.topic.toLowerCase().includes(t)?8:0)+(item.excerpt.toLowerCase().includes(t)?2:0),0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,limit).map(x=>x.item);
}
