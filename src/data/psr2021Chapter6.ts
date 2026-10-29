import type { PSRRule, RAGRetrievalResult } from '../types/psr';

/** Complete user-supplied PSR 2021 Chapter 6 transcription.
 * Original PDF cross-check remains pending; do not present as independently verified.
 * All eleven provisions are preserved; summaries are retrieval aids only.
 */
const SOURCE_RULES: {ruleNumber: string; title: string; fullText: string}[] = [
  {
    "ruleNumber": "060101",
    "title": "Definition of Reward and Recognition",
    "fullText": "Reward in this chapter refers to MDAs or Presidential award of gifts, certificates and/or letter of commendation to deserving Officers. Recognition on the other hand refers to certificate of merit and/or gifts given to Officers who have served meritoriously for a period of 15, 25 or 35 years."
  },
  {
    "ruleNumber": "060102",
    "title": "Reward and Recognition System",
    "fullText": "The Reward and Recognition System (R and RS) is a motivational tool that is deployed to improve work ethic and performance in the Service. The R and RS describes the whole process leading to giving of awards and recognitions to deserving Officers with outstanding performance in the discharge of their duties or as a result of exemplary act or conduct."
  },
  {
    "ruleNumber": "060103",
    "title": "Purpose and Implementation",
    "fullText": "The implementation of the Reward and Recognition System would serve to encourage excellence, merit, and to ensure high levels of staff motivation in a sustainable way in all Ministries, Extra-Ministerial Departments and Agencies (MDAs). This would be achieved through the link of rewards and recognition to measurable performance as enabler for all other strands of effective people management in an integrated fashion."
  },
  {
    "ruleNumber": "060104",
    "title": "Eligibility for Awards",
    "fullText": "The recipient of any of the awards must have been considered as the best on the basis of outstanding performance of duties and exemplary conduct as outlined in approved Rewards and Recognition Scheme (R and RS)."
  },
  {
    "ruleNumber": "060105",
    "title": "Categories of Awards",
    "fullText": "Each MDA shall make recommendation to OHCSF for award to deserving Officers in the following categories:\n(i) Presidential Distinguished Public Service Career Award;\n(ii) Presidential Public Service Merit Award;\n(iii) Head of the Service of the Federation Commendation Award;\n(iv) The Public Service Excellence Award;\n(v) Sports Achievement Award; and\n(vi) Recognition of Retired Permanent Secretaries."
  },
  {
    "ruleNumber": "060106",
    "title": "Other Awards and Recognition",
    "fullText": "Each MDA shall make such award to deserving Officers in the other and recognition schemes as outlined in the rewards and recognition system."
  },
  {
    "ruleNumber": "060107",
    "title": "Frequency of Awards",
    "fullText": "Each MDA shall make such Awards and Recognitions within the time frames prescribed in the R and RS."
  },
  {
    "ruleNumber": "060108",
    "title": "Award Criteria and Circulars",
    "fullText": "Specific criteria that would qualify an Officer for any of the categories of the Awards and Recognition shall be communicated through Circulars from time to time from the Office of the Head of the Civil Service of the Federation."
  },
  {
    "ruleNumber": "060109",
    "title": "Forms of Reward",
    "fullText": "Rewards for each of the awards shall be in the form of certificates, letter of commendation, engraved plaques or trophies, medals, cash gifts, sponsorship for attendance of Masterclass and local training programmes. Other rewards shall include admittance of awardee into the MDAs Hall of Fame, tour of International Administrative headquarters of one of the funding Agencies, and sponsorship to attend a relevant foreign short course."
  },
  {
    "ruleNumber": "060110",
    "title": "Selection Guidelines and Committees",
    "fullText": "In order to ensure transparency and fairness in the process of selecting the award winners, selection guidelines handbook, outlining the criteria for specific awards and corresponding weightings are as provided by OHCSF. Selection Committees for each category of Awards are to be constituted in line with the Guidelines for Recognition and Reward System."
  },
  {
    "ruleNumber": "060111",
    "title": "Annual Ceremony and Publication",
    "fullText": "The Public Service Awards Ceremony shall be held annually to recognize and celebrate the various Service-Wide Awardees in the Scheme. Information regarding the R and RS, including names of the various Awardees of the Scheme shall be published in the monthly Service Welfare Newsletter."
  }
];

export const PSR2021_CHAPTER6: PSRRule[] = SOURCE_RULES.map(({ruleNumber,title,fullText}) => ({
  ruleNumber, chapter: 6,
  chapterTitle: 'Reward and Recognition for Outstanding Work and Meritorious Service',
  section: 'Chapter 6 — user-supplied page 1 transcription (PDF comparison pending)',
  title, summary: title + '. See full transcription for the complete provision.',
  fullText, keyPoints: ['Read the complete source transcription; verify against the original PSR 2021 PDF before official reliance.'],
  tags: ['psr 2021', 'reward', 'recognition', 'meritorious service', title.toLowerCase()]
}));

const TOPIC_RULES: [RegExp, string[]][] = [
  [/15|25|35|years|difference|definition|distinguish|meaning/, ['060101']],
  [/six|categories|types|presidential|sports achievement|retired permanent/, ['060105']],
  [/form|cash|gift|plaque|troph|medal|masterclass|hall of fame|foreign short course|sponsorship/, ['060109']],
  [/selection|committee|weighting|transparen|fairness|guideline/, ['060110']],
  [/annual|ceremony|newsletter|publish|publication|awardees/, ['060111']],
  [/criteria|circular|qualify/, ['060108']],
  [/time.frame|frequency|when.*award/, ['060107']],
  [/recommendation|recommend.*ohcsf/, ['060105']],
  [/motivat|work ethic|performance/, ['060102','060103']],
  [/eligib|exemplary conduct|best officer/, ['060104']]
];

export function retrievePSR2021Chapter6(query: string, limit = 5): RAGRetrievalResult[] {
  const q = query.toLowerCase();
  const explicit = [...q.matchAll(/\b0601\d{2}\b/g)].map(m => m[0]);
  const chapter = /\bchapter\s*(?:6|six|06)\b|reward(?:s)?\s+and\s+recognition|meritorious service|public service awards?/i.test(q);
  const matchedTopics = TOPIC_RULES.filter(([pattern]) => pattern.test(q)).flatMap(([,numbers]) => numbers);
  if (!chapter && explicit.length === 0 && !(matchedTopics.length && /reward|recognition|award|meritorious|ohcsf/i.test(q))) return [];
  const scored = PSR2021_CHAPTER6.map(rule => {
    let score = explicit.includes(rule.ruleNumber) ? 1000 : 0;
    if (matchedTopics.includes(rule.ruleNumber)) score += 200;
    if (chapter) score += 10;
    if (q.includes(rule.title.toLowerCase())) score += 50;
    return {rule, score, matchedTerms: [rule.ruleNumber], relevanceReason: 'User-supplied full PSR 2021 Chapter 6 transcription; PDF comparison pending'};
  }).filter(r=>r.score>0).sort((a,b)=>b.score-a.score || a.rule.ruleNumber.localeCompare(b.rule.ruleNumber));
  return scored.slice(0,Math.max(0,limit));
}
