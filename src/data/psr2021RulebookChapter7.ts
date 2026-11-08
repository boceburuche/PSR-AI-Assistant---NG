import type { PSRRule } from '../types/psr';
import { PSR2021_CH7_RULES, PSR2021_CH7_SECTIONS } from './psr2021Chapter7';

/** 2021 PSR chapter 7 source-linked, rule-level Rulebook records.
 * Text has been cross-checked against scanned pages; original images remain controlling.
 */
const headings:Record<string,string>={
  '070101':'Definition of Staff Development',
  '070102':'Objectives',
  '070103':'Strategies for Capacity Development',
  '070104':'Course of Instruction Within Nigeria',
  '070105':'Categories of Training',
  '070201':'Course of Instruction on Station',
  '070202':'Overseas Course of Instruction',
  '070203':'Joining Instructions',
  '070204':'Course of Instruction During Leave',
  '070205':'Conditions for Course Sponsorship',
  '070206':'Passage',
  '070207':'Special Allowance Rates',
  '070208':'Courses Sponsored by Donor Agencies/Countries',
  '070209':'Overseas Employment During Training',
  '070210':'Interruption of Training Courses',
  '070301':'Processing Externally Assisted Courses',
  '070302':'Courses under Technical Assistance',
  '070303':'Courses on Leave Without Pay',
  '070304':'Postgraduate Courses'
};
export const PSR2021_RULEBOOK_CH7:PSRRule[]=PSR2021_CH7_RULES.map(r=>{
  const sec=Number(r.ruleNumber.slice(2,4));
  const secTitle=PSR2021_CH7_SECTIONS[sec-1]??'Training';
  const title=headings[r.ruleNumber]??`Rule ${r.ruleNumber}`;
  const pages=r.pdfPages;
  return {
    ruleNumber:r.ruleNumber,chapter:7,
    chapterTitle:'Training and Staff Development Within and Outside Nigeria',
    section:`Section ${sec} — ${secTitle}`,
    title,
    summary:`2021 PSR, Rule ${r.ruleNumber}, ${secTitle}; original PDF page(s) ${pages.join(', ')}.`,
    fullText:r.fullText,
    keyPoints:['Source-reviewed transcription; original PSR 2021 scanned page remains authoritative.'],
    tags:[r.ruleNumber,'psr 2021','training',secTitle.toLowerCase(),title.toLowerCase()],
    referenceLink:pages.length ? `${import.meta.env.BASE_URL}psr2021/chapter7/page-${pages[0]}.png`:undefined
  };
});
