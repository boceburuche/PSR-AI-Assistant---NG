import type { PSRRule } from '../types/psr';
import { PSR2021_CHAPTER5_RULES } from './psr2021Chapter5';
import { PSR2021_CHAPTER10_RULES } from './psr2021Chapter10';
import { psr2021PageImageUrl } from './psr2021CanonicalSourcePages';

/** The eight official section headings are copied from the authoritative
 * Revised PSR 2021 Chapter 10 heading page (master PDF p.78).
 */
export const PSR2021_CH10_SECTION_TITLES = [
  'Introduction',
  'General Inefficiency',
  'Misconduct',
  'Serious Misconduct',
  'Conduct Prejudicial to Security of the State',
  'Retirement in Public Interest',
  'Disciplinary Procedure for a Permanent Secretary',
  'Disciplinary Measures'
] as const;

/** Revised PSR 2021 Chapter 5 heading page (master PDF p.59).
 * Section 6's expanded heading is shown in the body on PDF p.64.
 */
export const PSR2021_CH5_SECTION_TITLES = [
  'Progress Reports on Officers on Probation',
  'Performance Management System for Serving Officers',
  'Annual Performance Management Timeline',
  'Performance Management Cycle',
  'Appraisals for Employees on Approved Absence',
  'Performance Appraisal by Junior Staff Committee (JSC) and Senior Staff Committee (SSC)',
  'Monitoring and Evaluation'
] as const;

const topics:Record<string,string> = {
  '050101':'Progress Reports on Officers on Probation',
  '050201':'Performance Management System (PMS)',
  '050301':'Annual Performance Management Timeline',
  '050401':'Performance Management Cycle',
  '050501':'Appraisals for Employees on Approved Absence',
  '050601':'Performance Appraisal Committees',
  '050701':'Monitoring and Evaluation',
  '100101':'Duty to Know the Disciplinary Rules',
  '100201':'General Inefficiency',
  '100301':'Acts of Misconduct',
  '100302':'Issuing a Disciplinary Query',
  '100307':'Disciplinary Procedure Leading to Dismissal',
  '100401':'Definition of Serious Misconduct',
  '100402':'Acts of Serious Misconduct',
  '100403':'Procedure for Serious Misconduct',
  '100404':'Interdiction',
  '100406':'Suspension',
  '100407':'Dismissal and Its Effects',
  '100501':'Conduct Prejudicial to State Security',
  '100601':'Retirement in Public Interest',
  '100701':'Disciplinary Procedure for a Permanent Secretary',
  '100801':'Disciplinary Measures'
};
function fullRecord(chapter:5|10, source:{ruleNumber:string;fullText:string;pdfPages:number[];verified?:boolean}):PSRRule{
  const sectionNumber=Number(source.ruleNumber.slice(2,4));
  const titles=chapter===5 ? PSR2021_CH5_SECTION_TITLES : PSR2021_CH10_SECTION_TITLES;
  const sectionTitle=titles[sectionNumber-1] ?? 'Section not specified';
  const title=topics[source.ruleNumber] ?? `Rule ${source.ruleNumber} — ${sectionTitle}`;
  const pages=source.pdfPages;
  const notes=chapter===10 && !source.verified
    ? ['Provisional OCR transcription; verify exact wording against the original page scan.']
    : ['Source passage retained; consult original scan for precise typography and official use.'];
  return {
    ruleNumber: source.ruleNumber,
    chapter,
    chapterTitle:chapter===5?'Performance Management System':'Discipline',
    section:`Section ${sectionNumber} — ${sectionTitle}`,
    title,
    summary:`2021 PSR Rule ${source.ruleNumber} under Section ${sectionNumber}: ${sectionTitle}. Original PDF page(s): ${pages.join(', ')}.`,
    fullText:source.fullText,
    keyPoints:notes,
    tags:[source.ruleNumber,'psr 2021',sectionTitle.toLowerCase(),...title.toLowerCase().split(/\s+/).filter(x=>x.length>4)],
    referenceLink: pages.length ? `${import.meta.env.BASE_URL}psr2021/chapter${chapter}/page-${pages[0]}.png` : undefined
  };
}
/** Explicit replacement of the obsolete rulebook chapter 5 / 10 records.
 * All other chapters' rules remain unchanged in psrCorpus.ts.
 */
export const PSR2021_RULEBOOK_CH5:PSRRule[]=PSR2021_CHAPTER5_RULES.map(rule=>fullRecord(5,rule));
export const PSR2021_RULEBOOK_CH10:PSRRule[]=PSR2021_CHAPTER10_RULES.map(rule=>fullRecord(10,rule));
