import { PSRChapter, PSRRule, OfficerProfile, QueryRecord, PSRForeword, PSRPreamble } from '../types/psr';
export { PSR_TABLE_OF_CONTENTS, PSR_MASTER_INDEX } from './psrMasterIndex';

export const PSR_FOREWORD: PSRForeword = {
  title: 'Foreword: Federal Government Public Service Rules',
  signatory: "UMARU MUSA YAR'ADUA, GCFR",
  designation: 'President of the Federal Republic of Nigeria',
  location: 'State House, Abuja',
  text: `This Edition of the Public Service Rule is a review of the 2007 Edition, which is principally intended to update the rules. Regulations and Procedures in the Public Service and bring them in line with the current trend in governance. The revision of this strategic document of the Public Service on a regular basis is necessary in order to make the service conform with changing times and circumstances. The objective, therefore, is to effectively reposition the service for higher level of efficiency, effectiveness and enhanced service delivery.

The main thrust of the 2008 Edition of the Public Service Rules is to ensure that the fundamental ethical issues in the Public Service are strictly adhered to. It is, therefore, aimed at entrenching the issues of transparency, accountability, justice, equity, due process, and the rule of law. All these are very paramount to the conduct of Government business, which all Public Servants must imbibe.

As the machinery through which Government articulates and implements its. policies and programmes, the Public Service needs to be provided with the enabling environment to play this pivotal role effectively; although the removal of obsolete rules and regulations as well as the entrenchment of the core values and professional standards of the Service. The long term goals of this review, therefore, is to achieve our national development agenda and collective goal of becoming one of the 20 leading industrialized nations of the world by 2020 through a focused and vibrant Public Service.

I, therefore, urge all Public Servants to acquaint themselves with these Rules and Regulations as well as other extant laws for effective Public Service administration and to ensure their application in a manner that would enhance the smooth functioning of the Public Service.`,
  keyDirectives: [
    'Periodic Strategic Review: Revision of the strategic document on a regular basis to conform with changing times, circumstances, and governance trends.',
    'Fundamental Ethical Foundations: Strict adherence to transparency, accountability, justice, equity, due process, and the rule of law in all conduct of Government business.',
    'Pivotal Implementation Vehicle: Public Service serves as the primary machinery through which Government articulates and implements policies and programmes.',
    'Removal of Obsolete Rules: Elimination of outdated regulations alongside entrenchment of professional standards and core civil service values.',
    'Universal Acquaintance Mandate: Direct Presidential charge urging all Public Servants to acquaint themselves with the Rules, Regulations, and extant laws for effective administration.'
  ]
};

export const PSR_PREAMBLE: PSRPreamble = {
  title: 'Preamble: Federal Government Public Service Rules',
  signatory: 'A. I. PEPPLE, CFR',
  designation: 'Head of the Civil Service of the Federation',
  location: 'The Presidency, Abuja',
  text: `This particular edition has codified changes that became necessary as a result of the implementation of the social, economic and administrative reform programme that this Administration has been undertaking since its advent in May 1999. These reforms include the contributory pension scheme; monetization; due process; public sector procurement; wage and salaries adjustments and awards; etc.

Public Servants are implored to study and imbibe these Rules and their associated and complementary Instructions and Notices. and to become familiar with all Laws and Procedures guiding the conduct of public administration and financial management in order to ensure due process and probity in the conduct of Government business.

The following should be taken into account while going through these Rules:

1. Method of Numbering
Each rule has been given a number containing six digits. The first two indicate the Chapter; the next two, the Section; and the last two, the Rule Number.

2. Arrangement of Chapters, Sections and Rules
There are sixteen (16) Chapters arranged as listed in the Table of Contents. Under each Chapter, is written the Sections ranging from 01-09. At the right hand corner, the titles of the rules are indicated. Except where otherwise indicated by the context, the Index at the back contains the list of topics with their corresponding rule numbers.

3. Amendments
Further amendments to these Rules shall be made through Circulars, which will be issued from time to time.

4. Review of the Public Service Rules
Public Service Rules shall be reviewed every five years to update the provisions of the rules.

This Public Service Rules should be widely circulated to all categories of Public Servants, and Nigerian citizens from all walks of life are also encouraged to avail themselves of its contents.`,
  numberingConvention: {
    format: 'CCSSRR (6 Digits)',
    description: 'First two digits (CC) indicate Chapter; next two digits (SS) indicate Section (01-09); last two digits (RR) indicate Rule Number.'
  },
  keyProvisions: [
    'Codification of 1999+ Governance Reforms: Contributory pension scheme (PENCOM), monetization of fringe benefits, due process, public procurement regulations, wage and salary adjustments and awards.',
    'Six-Digit Numbering Method (CCSSRR): Every rule has a unique 6-digit number. Digits 1-2 indicate Chapter; digits 3-4 indicate Section (01-09); digits 5-6 indicate Rule Number.',
    'Structure of Chapters and Sections: Arranged with sections ranging from 01-09 under each chapter with titles indicated at right-hand corners and index references.',
    'Amendments via Service Circulars: Further amendments to these Rules are made through official Circulars issued by the OHCSF from time to time.',
    'Mandatory 5-Year Review Cycle: Public Service Rules must be comprehensively reviewed every five (5) years to update provisions and conform with changing times.',
    'Wide Public Circulation Mandate: Mandated for wide distribution to all categories of Public Servants and Nigerian citizens from all walks of life.'
  ]
};

export const PSR_CHAPTERS: PSRChapter[] = [
  {
    number: 1,
    title: 'Introduction, Application & Definitions',
    description: 'Duty of officers to acquaint themselves with PSR, application to public servants & constitutional office holders, special & general definitions, amendment powers, application to female servants, and office inventory requirements.',
    sectionsCount: 1,
    rulesCount: 7,
    keyTopics: [
      'Duty to Acquaint with Rules (010101)',
      'Application to Constitutional Organs & Commissions (010101)',
      'Special Definitions (010102)',
      'General Definitions (Emolument, Child, Cadres, Interdiction, Suspension) (010103)',
      'Federal Government Amendment & Revocation Powers (010104)',
      'Application to Female Public Servants (010105)',
      'Mandatory Office Inventory Item (010106)',
      'OHCSF & FCSC Interpretation Powers (010304)'
    ]
  },
  {
    number: 2,
    title: 'Appointments, Promotions, Secondment & Transfers',
    description: 'Recruitment criteria, 2-year probation, confirmation exams, promotion tenure (GL 01-06: 2 yrs, GL 07-14: 3 yrs, GL 15-17: 4 yrs), PMS scores, and 8-year Director tenure policy.',
    sectionsCount: 9,
    rulesCount: 16,
    keyTopics: ['2-Year Probation', 'Confirmation Exams (CCE)', 'Promotion Matrices', 'Tenure of Directors (8 yrs)', 'Perm Secs Tenure (4+4 yrs)', 'Secondment & Transfer']
  },
  {
    number: 3,
    title: 'Discipline, Queries & Grievance Procedures',
    description: 'General inefficiency, misconduct, serious misconduct, formal queries (Form Gen 16), 48/72-hour reply rule, Senior Staff Committee, interdiction (50% pay), suspension, and dismissal.',
    sectionsCount: 4,
    rulesCount: 22,
    keyTopics: ['Misconduct vs Serious Misconduct', '48-Hour Query Reply', 'Interdiction at 50% Pay', 'Suspension', 'SSC / JSC Committees', 'Private Business Prohibition', 'Dismissal Penalties']
  },
  {
    number: 4,
    title: 'Salaries, Increments & Allowances',
    description: 'Consolidated salary scales (CONPSS), incremental dates (Jan 1), Duty Tour Allowance (DTA) revised circular rates, Estacode allowances, and resettlement.',
    sectionsCount: 3,
    rulesCount: 12,
    keyTopics: ['CONPSS Salary Scale', 'Annual Increments', 'Duty Tour Allowance (DTA)', 'Estacode Rates (USD/GBP/EUR)', 'Overtime & Hazard Allowance']
  },
  {
    number: 5,
    title: 'Medical Care, Health & Medical Boards',
    description: 'Entry medical fitness, National Health Insurance Authority (NHIA), sick leave thresholds, Federal Medical Board invalidation, and medical treatment abroad guidelines.',
    sectionsCount: 3,
    rulesCount: 8,
    keyTopics: ['NHIA Coverage', 'Sick Leave Limits', 'Federal Medical Board', 'Medical Invalidation', 'Overseas Treatment Clearance']
  },
  {
    number: 6,
    title: 'Leave & Absences from Duty',
    description: 'Annual leave (GL 01-06: 14 days; GL 07-17: 30 days), casual leave (7 days), maternity leave (16 weeks full pay), paternity leave (14 days), study leave bonds, pre-retirement leave.',
    sectionsCount: 4,
    rulesCount: 15,
    keyTopics: ['Annual Leave Days', 'Paternity Leave (14 Working Days)', 'Maternity Leave (16 Weeks)', 'Casual Leave (7 Days)', 'Study Leave with/without Pay', 'Pre-Retirement Leave (3 Months)']
  },
  {
    number: 7,
    title: 'Training, Staff Development & Examination',
    description: 'Mandatory annual continuous professional development (CPD), ASCON courses, compulsory confirmation examinations, and government training bonds.',
    sectionsCount: 3,
    rulesCount: 7,
    keyTopics: ['Mandatory CPD', 'ASCON Programs', 'Compulsory Confirmation Exam', 'Training Bonds & Service Commitments']
  },
  {
    number: 8,
    title: 'Separation from Service, Resignation & Retirement',
    description: 'Compulsory retirement at 60 years of age or 35 years in pensionable service (whichever earlier), withdrawal of service, resignation notice, and Contributory Pension Scheme (CPS).',
    sectionsCount: 4,
    rulesCount: 10,
    keyTopics: ['60 Yrs / 35 Yrs Service Rule', 'Pre-Retirement 3 Months Notice', 'PENCOM CPS Pension Scheme', 'Resignation & Clearance']
  },
  {
    number: 9,
    title: 'Petitions, Appeals & Redress Channels',
    description: 'Aggrieved officers rights to petition, strict observance of proper channels (HOD -> Perm Sec -> FCSC), prohibition of anonymous petitions, and 6-month appeal time bar.',
    sectionsCount: 2,
    rulesCount: 6,
    keyTopics: ['Proper Channels of Petition', 'Ban on Anonymous Petitions', 'FCSC Appellate Jurisdiction', '6-Month Appeal Window']
  },
  {
    number: 10,
    title: 'Official Secrets, Media & Public Communications',
    description: 'Official Secrets Act compliance, Oath of Secrecy, ban on unauthorized media interviews, press statements, and strict social media leakage / classification guidelines.',
    sectionsCount: 2,
    rulesCount: 7,
    keyTopics: ['Official Secrets Act', 'Social Media & Classified Leaks', 'Press Interview Clearances', 'Document Classification']
  },
  {
    number: 11,
    title: 'Conduct, Ethics & Conflict of Interest',
    description: 'Code of Conduct Bureau asset declarations every 4 years, strict ban on private commercial trading (farming exempted), bribery, gifts, and political neutrality.',
    sectionsCount: 3,
    rulesCount: 8,
    keyTopics: ['Code of Conduct Bureau (CCB)', 'Farming Exception Only', 'Political Neutrality', 'Gifts & Kickbacks Prohibition']
  },
  {
    number: 12,
    title: 'Inventions, Awards & Intellectual Property',
    description: 'Ownership of patents, innovations, and intellectual property developed in the course of public duty, government ex-gratia compensation and honours.',
    sectionsCount: 2,
    rulesCount: 5,
    keyTopics: ['Government IP Rights', 'Inventions on Duty', 'National Productivity & Merit Awards']
  },
  {
    number: 13,
    title: 'Parastatals, Agencies, Boards & Commissions',
    description: 'Application of PSR to Federal Parastatals, Boards of Directors relationships, Chief Executive Officers / DG tenure limits, and disciplinary reporting.',
    sectionsCount: 2,
    rulesCount: 8,
    keyTopics: ['Parastatal PSR Applicability', 'Board vs Management Bounds', 'CEO / DG Tenure Rules']
  },
  {
    number: 14,
    title: 'Virtual / Digital Governance & Teleworking',
    description: 'Electronic Document Management Systems (EDMS), teleworking protocols, official government email (.gov.ng) mandate, and cyber hygiene in public operations.',
    sectionsCount: 2,
    rulesCount: 6,
    keyTopics: ['Electronic Document System (EDMS)', 'Teleworking & Remote Hours', 'Official .gov.ng Email Mandate', 'Cybersecurity Protocols']
  }
];

export const PSR_RULES_DATABASE: PSRRule[] = [
  // PRESIDENTIAL FOREWORD & PREAMBLE
  {
    ruleNumber: '000001',
    chapter: 1,
    chapterTitle: 'Introduction, Application & Definitions',
    section: 'Foreword by the President of the Federal Republic of Nigeria',
    title: 'Foreword: Federal Government Public Service Rules',
    summary: 'Official Foreword by the President of the Federal Republic of Nigeria, State House, Abuja. Mandates regular strategic revision, entrenchment of transparency, accountability, justice, equity, due process, and the rule of law across the Federal Public Service.',
    fullText: `FOREWORD: FEDERAL GOVERNMENT PUBLIC SERVICE RULES

This Edition of the Public Service Rule is a review of the 2007 Edition, which is principally intended to update the rules. Regulations and Procedures in the Public Service and bring them in line with the current trend in governance. The revision of this strategic document of the Public Service on a regular basis is necessary in order to make the service conform with changing times and circumstances. The objective, therefore, is to effectively reposition the service for higher level of efficiency, effectiveness and enhanced service delivery.

The main thrust of the 2008 Edition of the Public Service Rules is to ensure that the fundamental ethical issues in the Public Service are strictly adhered to. It is, therefore, aimed at entrenching the issues of transparency, accountability, justice, equity, due process, and the rule of law. All these are very paramount to the conduct of Government business, which all Public Servants must imbibe.

As the machinery through which Government articulates and implements its. policies and programmes, the Public Service needs to be provided with the enabling environment to play this pivotal role effectively; although the removal of obsolete rules and regulations as well as the entrenchment of the core values and professional standards of the Service. The long term goals of this review, therefore, is to achieve our national development agenda and collective goal of becoming one of the 20 leading industrialized nations of the world by 2020 through a focused and vibrant Public Service.

I, therefore, urge all Public Servants to acquaint themselves with these Rules and Regulations as well as other extant laws for effective Public Service administration and to ensure their application in a manner that would enhance the smooth functioning of the Public Service.

(Sgd)
UMARU MUSA YAR'ADUA, GCFR
President of the Federal Republic of Nigeria,
State House,
Abuja.`,
    keyPoints: [
      'Strategic Periodic Revision: Ongoing review of rules to conform with changing times, technology, and modern governance trends.',
      'Fundamental Ethical Pillars: Strict entrenchment of transparency, accountability, justice, equity, due process, and the rule of law.',
      'Public Service as Government Machinery: Crucial vehicle through which the Federal Government articulates and executes national policies and programmes.',
      'Removal of Obsolete Provisions: Eliminates outdated regulations while reinforcing professional excellence and core values.',
      'Universal Public Servant Mandate: Direct Presidential urge for all public servants to acquaint themselves with these Rules, Regulations, and extant laws.'
    ],
    applicableGrades: ['GL 01-17', 'Perm Sec', 'FCSC Admin'],
    tags: ['foreword', 'forward', 'presidential directive', 'yaradua', 'state house', 'abuja', 'due process', 'transparency', 'accountability', 'rule of law', 'ethics', 'vision 2020']
  },
  // OFFICIAL PREAMBLE BY HEAD OF THE CIVIL SERVICE OF THE FEDERATION
  {
    ruleNumber: '000002',
    chapter: 1,
    chapterTitle: 'Introduction, Application & Definitions',
    section: 'Preamble by the Head of the Civil Service of the Federation',
    title: 'Preamble: Federal Government Public Service Rules (Codification of Administrative Reforms)',
    summary: 'Official Preamble by Ms. A. I. Pepple, CFR, Head of the Civil Service of the Federation. Establishes the 6-digit numbering method (CCSSRR), the statutory 5-year review cycle, amendments via circulars, and codification of post-1999 reforms (pension, monetization, due process, procurement).',
    fullText: `PREAMBLE: FEDERAL GOVERNMENT PUBLIC SERVICE RULES

This particular edition has codified changes that became necessary as a result of the implementation of the social, economic and administrative reform programme that this Administration has been undertaking since its advent in May 1999. These reforms include the contributory pension scheme; monetization; due process; public sector procurement; wage and salaries adjustments and awards; etc.

Public Servants are implored to study and imbibe these Rules and their associated and complementary Instructions and Notices. and to become familiar with all Laws and Procedures guiding the conduct of public administration and financial management in order to ensure due process and probity in the conduct of Government business.

The following should be taken into account while going through these Rules:

1. Method of Numbering
Each rule has been given a number containing six digits. The first two indicate the Chapter; the next two, the Section; and the last two, the Rule Number.

2. Arrangement of Chapters, Sections and Rules
There are sixteen (16) Chapters arranged as listed in the Table of Contents. Under each Chapter, is written the Sections ranging from 01-09. At the right hand corner, the titles of the rules are indicated. Except where otherwise indicated by the context, the Index at the back contains the list of topics with their corresponding rule numbers.

3. Amendments
Further amendments to these Rules shall be made through Circulars, which will be issued from time to time.

4. Review of the Public Service Rules
Public Service Rules shall be reviewed every five years to update the provisions of the rules.

This Public Service Rules should be widely circulated to all categories of Public Servants, and Nigerian citizens from all walks of life are also encouraged to avail themselves of its contents.

(Sgd)
A. I. PEPPLE, CFR
Head of the Civil Service of the Federation
The Presidency
Abuja`,
    keyPoints: [
      'Codification of 1999+ Administrative Reforms: Integrates the Contributory Pension Scheme, Monetization policy, Due Process & Public Procurement, and Wage/Salary adjustments.',
      '6-Digit Numbering Method (CCSSRR): Digits 1-2 = Chapter; Digits 3-4 = Section (01-09); Digits 5-6 = Rule Number.',
      'Amendments through Circulars: Official OHCSF Service Circulars constitute the statutory instrument for ongoing rule modifications.',
      'Mandatory 5-Year Review Cycle: Explicit requirement that the Public Service Rules must be comprehensively reviewed every five (5) years.',
      'Probity & Financial Due Process: Implores all officers to master public administration laws and financial procedures.'
    ],
    applicableGrades: ['GL 01-17', 'Perm Sec', 'FCSC Admin'],
    tags: ['preamble', 'head of service', 'pepple', 'the presidency', 'abuja', 'method of numbering', 'six digits', '6 digits', 'amendments', 'circulars', 'five years', 'review cycle', 'due process', 'pension scheme', 'monetization', 'procurement']
  },
  // OFFICIAL TABLE OF CONTENTS & MASTER INDEX
  {
    ruleNumber: '000003',
    chapter: 1,
    chapterTitle: 'Introduction, Application & Definitions',
    section: 'Statutory Structure: Table of Contents & Master Index',
    title: 'Table of Contents & Master Index: Federal Government Public Service Rules (16 Chapters & Alphabetical Index)',
    summary: 'Codified Table of Contents comprising all sixteen (16) statutory chapters (Foreword, Index, Chapters 1 to 16) and master cross-referenced index covering appointments, discipline, emoluments, APER, examinations, medical procedures, compensations, petitions, leave, transport, training, allowances, inventions, rewards, and parastatals.',
    fullText: `TABLE OF CONTENTS: FEDERAL GOVERNMENT PUBLIC SERVICE RULES

(i) Foreword
(ii) Index

Chapter Subject
1. Introduction
2. Appointments and Leaving the Service
3. Discipline
4. Emoluments and Increments
5. Annual Performance Evaluation Reports (APER) and Certificate of Service
6. Examinations in Law and Official Publications
7. Medical and Dental Procedures
8. Compensation, Insurance and Personal Effects
9. Petitions and Appeals
10. Leave
11. Free Transport Facilities within Nigeria
12. Courses of Instruction Within and Outside Nigeria
13. Allowances
14. Petitions and Award Committee
15. Reward or Outstanding Service
16. Application of Public Service Rules to Federal Government Parastatals.

INDEX TOPICS AND RULE CROSS-REFERENCES:
• APPOINTMENTS AND LEAVING THE SERVICE (020101-020810): Authority for Appointment (020101), Appointment by FCSC (020102), Senior Posts (020106), Seniority (020107), Unpaid Staff Prohibited (020108), Personal Records (020201), Recruitment (020202), Types of Appointment (020203), Trainee/Pupils (020204), Probation (020205), Eligibility (020206), Prior Approval (020207), Procedure (020208), Oath of Secrecy (020210), Secret Society Prohibition (020211), Probation Period & CCE (020301-020304), Contract Appointments (020401-020412), Transfers & Secondments (020501-020506), Acting Appointments (020601-020607), Promotions (020701-020708), Leaving the Service / Resignation / Retirement (020801-020810).
• ALLOWANCES (130101-130139): General (130101), Resettlement/Disturbance (130102), Kilometer (130103), Disengagement (130104), Hotel Accommodation (130105), Duty Tour Allowance (130106), Local Running (130107), Estacode Allowance (130108), Entertainment Overseas (130109), Estacode Supplementation (130110), Travelling Days (130111), Warm Clothing (130112), Local Course (130113), Books (130114), Responsibility (130115), Overtime Allowance & Rules (130116-130126), Uniform (130127), Meal (130128), Utility (130129), Rent/Accommodation (130130), Acting Allowance (130131-130134), Personal & Executive Allowances (130135-130139).
• DISCIPLINE (030101-030501): Delegated Powers (030102), General Inefficiency (030201-030208), Misconduct & Queries (030301-030314), Serious Misconduct (030401-030402), Interdiction at 50% pay (030404), Suspension (030406), Dismissal (030407), Absence Without Leave (030412), Unauthorized Disclosure (030415), Political Activities (030421), Prohibition of Private Practice (030424), Bribery & Corruption (030444).
• EMOLUMENTS & INCREMENTS (040101-040207): Salaries (040101), Incremental Date 1st Jan (040203), Withheld/Deferred Increments (040204-040207).
• APER & CERTIFICATES OF SERVICE (050101-050402): Reporting Officers (050101), Candid Reports (050102), Unconfirmed Staff (050401).
• EXAMINATIONS (060101-060501): Compulsory Confirmation Exam (060101), Examination Board (060202), Reference Books (060206).
• MEDICAL PROCEDURES (070101-070402): Entry Tests (070104), Overseas Care (070206), Sick Leave 3+3 mos (070318), Active Service Death (070402).
• COMPENSATION & INSURANCE (080101-080205): Property Loss (080101), Death in Active Service (080201), Vehicle Insurance (080202).
• PETITIONS & APPEALS (090101-090209): Proper Channels (090204), Anonymous Petitions Banned (090206).
• LEAVE (100101-100243): Annual Leave (100203), Casual Leave 7 Days (100215), Maternity 16 Weeks (100218), Nursing Mother Breaks (100219), Sabbatical (100222), Study Leave (100223-100228), Compassionate (100230), Pre-Retirement Leave 3 Mos (100238), Overstaying Dismissal (100241).
• FREE TRANSPORT (110101-110301): Duty Journeys (110202), Station Transfers (110203), Vehicle Transport (110206).
• COURSES OF INSTRUCTION (120101-120311): Local and Overseas Training (120301-120306), Technical Assistance (120309), Bonds.
• INVENTIONS & AWARDS (140102-140110): Patents (140105), Commercial Proceeds (140108).
• REWARD FOR OUTSTANDING SERVICE (150101-150107): Merits & Presidential Honours.
• PARASTATALS (160101-160601): Harmonization & Disciplinary Standards.`,
    keyPoints: [
      'Sixteen (16) Statutory Chapters: Fully organized table of contents outlining all administrative subjects in the Federal Service.',
      'Comprehensive Master Index: Detailed cross-referencing of every major service subject to its exact 6-digit rule number.',
      'Preliminary Foundational Parts: Incorporates Foreword, Preamble, and Index before Chapter 1.',
      'Instant Searchability: Enables exact lookup of rights, duties, entitlements, and disciplinary procedures across all Federal MDAs.'
    ],
    applicableGrades: ['GL 01-17', 'Perm Sec', 'FCSC Admin'],
    tags: ['table of contents', 'contents', 'index', 'master index', '16 chapters', 'subjects', 'structure', 'rulebook index', 'foreword', 'preamble', '000003']
  },
  // CHAPTER 1 - INTRODUCTION
  {
    ruleNumber: '010101',
    chapter: 1,
    chapterTitle: 'Introduction, Application & Definitions',
    section: 'Section 1 - Application of Public Service Rules',
    title: 'Application of the Public Service Rules & Duty of Officers to Acquaint Themselves',
    summary: 'It is the mandatory duty of every officer to acquaint himself/herself with the Public Service Rules, regulations and extant circulars. Applies to all officers except where conflicting with terms approved by the Federal Government. For constitutional office holders and statutory commission members, applies only to the extent consistent with the 1999 Constitution.',
    fullText: `010101 - It shall be the duty of every officer to acquaint himself/herself with the Public Service Rules, other regulations and extant circulars. These Public Service Rules apply to all officers except where they conflict with specific terms approved by the Federal Government and written into the contract of employment or letters of appointment.

In so far as the holders of the offices of:
- The President;
- The Vice President;
- Chief Justice of Nigeria;
- Justices of the Supreme Court;
- President and Justices of the Court of Appeal;
- Chief Judge and Judges of the High Court of the Federal Capital Territory;
- Grand Khadi and Khadis of the Sharia Court of Appeal of the Federal Capital Territory;
- President and Judges of the Customary Court of Appeal of the Federal Capital Territory;
- The Chairmen and Members of the following statutory bodies, namely:
  • The Code of Conduct Bureau;
  • The Federal Civil Service Commission;
  • The Independent National Electoral Commission;
  • The Federal Character Commission;
  • The Code of Conduct Tribunal;
  • The Revenue Mobilisation, Allocation and Fiscal Commission;
  • The National Population Commission;
  • The Police Service Commission;
  • The Auditor-General for the Federation;
  • And any other similar organs that derive their appointments from the Constitution of the Federal Republic of Nigeria

are concerned, these Rules apply only to the extent that they are not inconsistent with the provisions of the Constitution of the Federal Republic of Nigeria in so far as their conditions of service and any other law applicable to these officers are concerned.`,
    keyPoints: [
      'Mandatory Duty to Acquaint: Every public service officer must proactively study and know the PSR, regulations, and extant circulars.',
      'Universal Application: Binds all public officers across the Federal Public Service unless specific approved contract terms provide otherwise.',
      'Constitutional Supremacy & Statutory Bodies: Applies to the President, Vice President, Judiciary, and Statutory Commission heads/members (CCB, FCSC, INEC, FCC, CCT, RMAFC, NPC, PSC, Auditor-General) only to the extent consistent with the Constitution of the Federal Republic of Nigeria.'
    ],
    applicableGrades: ['GL 01-17', 'Perm Sec', 'FCSC Admin'],
    tags: ['010101', 'application', 'duty to acquaint', 'extant circulars', 'constitution', 'statutory bodies', 'president', 'judiciary', 'fcsc', 'inec', 'ccb', 'auditor-general', 'rmafc']
  },
  {
    ruleNumber: '010102',
    chapter: 1,
    chapterTitle: 'Introduction, Application & Definitions',
    section: 'Section 1 - Special Definitions',
    title: 'Special Definitions in Particular Chapters and Sections',
    summary: 'The special meanings with which various words and terms are used for the purpose of particular Chapters and Sections in the Public Service Rules are quoted at the beginning of such Chapters or Sections.',
    fullText: `010102 - The special meanings with which various words and terms are used for the purpose of particular Chapters and Sections in these Public Service Rules are quoted at the beginning of such Chapters or Sections.`,
    keyPoints: [
      'Contextual Interpretation: Specialized definitions governing specific chapters or sections precede those respective parts.',
      'Precedence: Special chapter definitions take precedence within their particular subject domain over general interpretations.'
    ],
    applicableGrades: ['GL 01-17', 'Perm Sec', 'FCSC Admin'],
    tags: ['010102', 'special definitions', 'interpretation', 'terminology', 'chapters', 'sections']
  },
  {
    ruleNumber: '010103',
    chapter: 1,
    chapterTitle: 'Introduction, Application & Definitions',
    section: 'Section 1 - General Definitions',
    title: 'General Definitions: Statutory Meanings of Civil Service Terms',
    summary: 'Codified statutory definitions of core administrative terms: Emolument, Child, Civil Service, Classified Correspondence, Established Post, General Executive Cadre (CEO to AEO), Head of Department, Junior & Senior Posts, Expatriate Officer, Secretarial Pool, Interdiction, and Suspension.',
    fullText: `010103 - Except where otherwise indicated by the context or in special definitions for particular Chapters the following words and terms are used with the following meanings wherever they occur in these Public Service Rules:

• "Accredited Representative of the Federal Republic of Nigeria": The Diplomatic or Consular Representative of the Federal Republic of Nigeria within the area.
• "Emolument": The total remuneration package as conveyed in the letter of appointment.
• "Child (of a Public Servant)": A child who:
  (a) is under the age of 18 years; and
  (b) (i) is the officer's biological off-spring; or
      (ii) the officer's step-child being the biological offspring of a spouse of the officer; or
      (iii) a child adopted by the officer in accordance with any statutory provision; and
  (c) is entirely dependent on the officer.
• "Civil Service": A body or organ which enjoys continuity of existence. Essentially, it covers Ministries and Extra-Ministerial Offices.
• "Classified Correspondence": Correspondence which has been graded Restricted, Confidential, Secret or Top Secret.
• "Established Post": A post provided for under the Personal Emoluments sub-head of the estimates.
• "Gazette": The Federal Republic of Nigeria Official Gazette.
• "General Executive Cadre": Comprises Officers holding post of:
  - Chief Executive Officer, GL.14
  - Assistant Chief Executive Officer, GL.13
  - Principal Executive Officer I, GL.12
  - Principal Executive Officer II, GL.10
  - Senior Executive Officer, GL.09
  - Higher Executive Officer, GL.08
  - Executive Officer, GL.07
  - Assistant Executive Officer, GL.06
  It also includes officers holding corresponding "Executive" posts, e.g. Executive Officer (Accounts).
• "Head of Department": A Permanent Secretary/Head of Extra-Ministerial Office.
• "Junior Officer": A pensionable officer on GL. 06, and below.
• "Junior Posts": Posts in Ministries / Extra Ministerial Offices attracting emoluments on Grade Level 06 and below.
• "Ministry": Includes Extra-Ministerial Offices.
• "Monthly-Rated": Employment on monthly rates of pay.
• "Nigerian Home Place": The place in Nigeria accepted in writing by Government as the place to which a staff would naturally wish to return when spending his leave in Nigeria.
• "Nigerian Officer": An officer other than an expatriate.
• "Officer": When used without qualification means staff in an established post, either on pensionable or contract terms.
• "Expatriate Officer": A staff who ranks as such for the purpose of pension in accordance with the Pension Reform Act 2004.
• "Secretarial Pool": A pool of stenographic officers for posting to any ministry or extra-ministerial office as required. It is controlled by the Permanent Secretary, Public Service Office, Office of the Head of Civil Service of the Federation.
• "Senior Posts": Posts attracting emoluments on Grade Level GL.07 and above and other posts attracting fixed emoluments of equivalent Grade Levels in Ministries/Extra-Ministerial Offices.
• "Staff": A person employed by the Federal Government.
• "Temporary Officer": A staff employed temporarily in an established post on non-pensionable terms.
• "Trainee": A person appointed to a training post in any grade; it includes "pupil".
• "Wife / Husband (of an officer)": A spouse married under the Marriage Act, Customary Law or Islamic Law.
• "Interdiction": When a serious case that may lead to dismissal has been instituted against an officer, the Permanent Secretary may interdict and place him on half pay pending the determination of the case.
• "Suspension": When disciplinary proceeding for a criminal case has been instituted or is about to be instituted against an officer, he shall be suspended from office without salary pending the determination of the case.`,
    keyPoints: [
      'Head of Department: Defined explicitly as Permanent Secretary or Head of Extra-Ministerial Office.',
      'General Executive Cadre Hierarchy: GL 06 (AEO) up to GL 14 (CEO), including cadre streams like Executive Officer (Accounts).',
      'Senior vs Junior Posts: Junior Posts = GL 06 and below; Senior Posts = GL 07 and above.',
      'Child Definition: Under 18 years, biological/step/adopted child, and entirely dependent on the officer.',
      'Interdiction vs Suspension: Interdiction = serious case that may lead to dismissal, placed on half pay (50%); Suspension = criminal case instituted/about to be instituted, suspended without salary (0% pay).',
      'Spousal Recognition: Recognized under Marriage Act, Customary Law, or Islamic Law.'
    ],
    applicableGrades: ['GL 01-17', 'Perm Sec', 'FCSC Admin'],
    tags: ['010103', 'general definitions', 'head of department', 'interdiction', 'suspension', 'child', 'general executive cadre', 'senior posts', 'junior posts', 'civil service', 'secretarial pool', 'spouse', 'half pay', 'established post']
  },
  {
    ruleNumber: '010104',
    chapter: 1,
    chapterTitle: 'Introduction, Application & Definitions',
    section: 'Section 1 - Powers of Amendment and Revocation',
    title: 'Powers of the Federal Government to Amend or Revoke the Rules',
    summary: 'Nothing in the Public Service Rules shall be construed as limiting the sovereign powers of the Federal Government to amend or revoke any of its provisions at any time.',
    fullText: `010104 - Nothing in these Public Service Rules shall be construed as limiting the powers of the Federal Government to amend or revoke any of its provisions at any time.`,
    keyPoints: [
      'Sovereign Authority: The Federal Government retains unfettered power to modify, amend, update, or revoke provisions of the PSR.',
      'Instrument of Amendment: Executed through official circulars issued by the Office of the Head of the Civil Service of the Federation (OHCSF).'
    ],
    applicableGrades: ['GL 01-17', 'Perm Sec', 'FCSC Admin'],
    tags: ['010104', 'amendment', 'revocation', 'powers of federal government', 'sovereignty', 'circulars']
  },
  {
    ruleNumber: '010105',
    chapter: 1,
    chapterTitle: 'Introduction, Application & Definitions',
    section: 'Section 1 - Application to Female Servants & Gender Neutrality',
    title: 'Application of Public Service Rules to Female Servants (Gender Equality)',
    summary: 'Notwithstanding that throughout the Public Service Rules the terms "Officer" and "Staff" are referred to in the masculine gender, the provisions of the Rules apply equally to Female Public Servants.',
    fullText: `010105 - Notwithstanding that throughout the Public Service Rules the terms 'Officer' and 'Staff' are referred to in the masculine gender, the provisions of the Rules apply equally to Female Public Servants.`,
    keyPoints: [
      'Full Gender Equality: All rights, duties, privileges, disciplinary obligations, and protections apply equally to female public servants.',
      'Universal Application: Masculine terms employed in statutory drafting encompass all civil servants regardless of gender.'
    ],
    applicableGrades: ['GL 01-17', 'Perm Sec', 'FCSC Admin'],
    tags: ['010105', 'female servants', 'gender equality', 'officer', 'staff', 'equal application', 'women in service']
  },
  {
    ruleNumber: '010106',
    chapter: 1,
    chapterTitle: 'Introduction, Application & Definitions',
    section: 'Section 1 - PSR as Mandatory Office Inventory Item',
    title: 'Public Service Rules to Form Part of Inventory in all Public Service Offices',
    summary: 'A physical or official copy of the Public Service Rules shall form an essential part of the inventory of items in all offices across the Public Service.',
    fullText: `010106 - A copy of the Public Service Rules shall form part of the inventory of items in all offices of the Public Service.`,
    keyPoints: [
      'Mandatory Office Inventory: Every government office across all Federal MDAs must keep and account for an official copy of the PSR.',
      'Universal Accessibility: Guarantees that public servants have immediate access to consultation copies within their workstations.'
    ],
    applicableGrades: ['GL 01-17', 'Perm Sec', 'FCSC Admin'],
    tags: ['010106', 'inventory', 'office equipment', 'mandatory copy', 'accountability', 'access to rules']
  },
  {
    ruleNumber: '010304',
    chapter: 1,
    chapterTitle: 'Introduction, Application & Definitions',
    section: 'Section 3 - Interpretation Powers',
    title: 'Power of Interpretation of the Rules (OHCSF & FCSC Authority)',
    summary: 'The exclusive authority for the statutory interpretation of the Public Service Rules rests with the Office of the Head of the Civil Service of the Federation (OHCSF) in consultation with the Federal Civil Service Commission (FCSC).',
    fullText: '010304 - The final authority for the interpretation of these Rules rests with the Office of the Head of the Civil Service of the Federation in consultation with the Federal Civil Service Commission where disciplinary and appointment matters are involved.',
    keyPoints: [
      'Final Interpretation Authority: Resides exclusively with OHCSF and FCSC.',
      'Prohibition of Arbitrary Interpretation: MDAs cannot unilaterally reinterpret or modify rule meanings without OHCSF clearance.',
      'Judicial Jurisdiction: Administrative decisions are justiciable under the National Industrial Court of Nigeria (NICN).'
    ],
    applicableGrades: ['GL 01-17', 'Perm Sec', 'FCSC Admin'],
    tags: ['010304', 'interpretation', 'OHCSF', 'FCSC', 'authority', 'legal interpretation']
  },

  // CHAPTER 2 - APPOINTMENTS & PROMOTIONS
  {
    ruleNumber: '020205',
    chapter: 2,
    chapterTitle: 'Appointments, Promotions, Secondment & Transfers',
    section: 'Section 2 - Recruitment & Probation',
    title: 'Probationary Period and Conditions for Confirmation',
    summary: 'Officers appointed on direct entry must serve a mandatory two (2) years probationary period before confirmation.',
    fullText: 'Except where otherwise provided in an offer of appointment, every direct appointment to the pensionable establishment shall be on probation for a period of two (2) years. Within this period, the officer must pass the prescribed Compulsory Confirmation Examination (CCE) and be certified medically fit.',
    keyPoints: [
      'Mandatory two (2) years probation for new pensionable recruits.',
      'Must pass Compulsory Confirmation Examination (CCE) before confirmation.',
      'Requires satisfactory APER/PMS appraisal and medical fitness certificate.',
      'Failure to qualify for confirmation within 2 years may lead to termination under Rule 020208.'
    ],
    timelineDays: 730,
    penaltyOrConsequence: 'Extension of probation or termination of appointment without pension rights.',
    applicableGrades: ['GL 01-17'],
    tags: ['probation', 'confirmation', 'CCE exam', 'recruitment', 'appointments']
  },
  {
    ruleNumber: '020701',
    chapter: 2,
    chapterTitle: 'Appointments, Promotions, Secondment & Transfers',
    section: 'Section 7 - Promotions & Criteria',
    title: 'Eligibility Criteria and Minimum Maturity Period for Promotions',
    summary: 'Minimum years an officer must spend on a grade level before qualifying for promotion: GL 01-06: 2 years; GL 07-14: 3 years; GL 15-17: 4 years.',
    fullText: 'Promotion shall be made strictly on merit, vacancy, and performance. The minimum period of service required before an officer can be considered eligible for promotion to the next grade level shall be: (i) Grade Levels 01 to 06: Two (2) years; (ii) Grade Levels 07 to 14: Three (3) years; (iii) Grade Levels 15 to 17: Four (4) years.',
    keyPoints: [
      'GL 01 - 06 (Junior Staff): Minimum 2 years on grade level.',
      'GL 07 - 14 (Senior Officers / Cadre): Minimum 3 years on grade level.',
      'GL 15 - 17 (Directorate): Minimum 4 years on grade level.',
      'Promotion depends on vacancy in the establishment, passing promotion exams, and PMS/APER score of not less than 60%.'
    ],
    applicableGrades: ['GL 01-17'],
    tags: ['promotion', 'maturity period', 'grade level', 'eligibility', 'establishment']
  },
  {
    ruleNumber: '020704',
    chapter: 2,
    chapterTitle: 'Appointments, Promotions, Secondment & Transfers',
    section: 'Section 7 - Performance Management System (PMS)',
    title: 'Performance Appraisal Weighting and Evaluation in Promotions',
    summary: 'Promotions require satisfactory scores in the new Performance Management System (PMS) and written promotion evaluations conducted by the FCSC.',
    fullText: 'Promotions shall be based on a competitive examination, Annual Performance Evaluation Report (APER) or Performance Management System (PMS) score, seniority, and interview where applicable. The weighting shall ensure transparency and meritocracy.',
    keyPoints: [
      'PMS score accounts for 30-40% of promotion weighting.',
      'FCSC / ASCON promotion examination accounts for 40-50%.',
      'Seniority and interview account for the remainder.',
      'An adverse appraisal report must be formally communicated to the officer in writing.'
    ],
    tags: ['PMS', 'APER', 'promotion exams', 'appraisal']
  },
  {
    ruleNumber: '020801',
    chapter: 2,
    chapterTitle: 'Appointments, Promotions, Secondment & Transfers',
    section: 'Section 8 - Secondment & Transfer of Service',
    title: 'Terms of Secondment and Transfer of Service',
    summary: 'Secondment is permitted to international organizations, other arms of government, or statutory bodies for an initial period of up to 3 years, renewable once.',
    fullText: 'Secondment of an officer to another government, international organization, or statutory corporation may be approved by the FCSC for a maximum period of three (3) years in the first instance, renewable for not more than two (2) years, after which the officer must elect to transfer or revert.',
    keyPoints: [
      'Initial term: Up to 3 years.',
      'Renewal: Maximum of 2 additional years.',
      'Must return to parent MDA or formally transfer service at end of term.',
      'Pension contributions must be preserved.'
    ],
    tags: ['secondment', 'transfer of service', 'international posting', 'cadre']
  },
  {
    ruleNumber: '020908',
    chapter: 2,
    chapterTitle: 'Appointments, Promotions, Secondment & Transfers',
    section: 'Section 9 - Tenure Policy',
    title: 'Tenure Policy for Permanent Secretaries and Directors (Reintroduced 2021)',
    summary: 'Permanent Secretaries hold office for a 4-year term renewable once (total 8 years). Directors (GL 17) shall hold office for a maximum cumulative tenure of eight (8) years.',
    fullText: 'A Permanent Secretary shall hold office for a term of four (4) years and may be re-appointed for another term of four (4) years only, subject to satisfactory performance. A Director (Grade Level 17) or equivalent shall hold office for a maximum period of eight (8) years, without prejudice to the statutory retirement age of 60 years or 35 years of service, whichever is earlier.',
    keyPoints: [
      'Permanent Secretaries: 4 years tenure, renewable once (max 8 years).',
      'Directors (GL 17): Maximum 8 years cumulative tenure.',
      'Officers who reach the 8-year tenure cap must proceed on compulsory retirement, even if they have not reached 60 years of age or 35 years of service.',
      'Designed to prevent stagnation in the civil service and create upward mobility for deputy directors.'
    ],
    applicableGrades: ['GL 17', 'Perm Sec'],
    tags: ['tenure policy', 'directors', 'permanent secretary', 'retirement', 'stagnation']
  },

  // CHAPTER 3 - DISCIPLINE, QUERIES & GRIEVANCES
  {
    ruleNumber: '030102',
    chapter: 3,
    chapterTitle: 'Discipline, Queries & Grievance Procedures',
    section: 'Section 1 - Classification of Infractions',
    title: 'Classification of Disciplinary Infractions: Inefficiency, Misconduct, and Serious Misconduct',
    summary: 'Infractions in the Federal Civil Service are categorized into three distinct tiers: General Inefficiency, Misconduct, and Serious Misconduct.',
    fullText: 'Disciplinary infractions shall be categorized into: (a) General Inefficiency - consistent failure to perform duties up to required standards; (b) Misconduct - a specific act of wrongdoing or improper behavior; (c) Serious Misconduct - a specific act of very serious wrongdoing and gross dereliction of duty which can lead to dismissal.',
    keyPoints: [
      'Tier 1: General Inefficiency (addressed by written warnings, withheld increment, or withholding confirmation).',
      'Tier 2: Misconduct (addressed by query, reprimand, reduction in step, deferment of increment).',
      'Tier 3: Serious Misconduct (subject to interdiction, suspension, demotion, termination, or dismissal).'
    ],
    tags: ['inefficiency', 'misconduct', 'serious misconduct', 'disciplinary tiers']
  },
  {
    ruleNumber: '030301',
    chapter: 3,
    chapterTitle: 'Discipline, Queries & Grievance Procedures',
    section: 'Section 3 - Misconduct',
    title: 'Definition and Acts of Misconduct',
    summary: 'Misconduct includes habitual lateness, unauthorized absence from duty, refusal to obey lawful orders, insubordination, negligence, and improper attire.',
    fullText: 'Misconduct is defined as a specific act of wrongdoing or an improper behavior which is inimical to the image of the service and which can be investigated and proved. It includes: (a) Habitual lateness to work; (b) Deliberate delay in treating official files; (c) Failure to keep records; (d) Unauthorized absence from duty; (e) Sleeping on duty; (f) Improper dressing to the office; (g) Insubordination; (h) Discourteous behavior to the public.',
    keyPoints: [
      'Habitual lateness or unauthorized absence from station.',
      'Insubordination to superior officers.',
      'Negligence of duty resulting in operational delays.',
      'Improper dressing contrary to civil service decorum.'
    ],
    penaltyOrConsequence: 'Query, loss of pay for days absent, deferment or withholding of increment, or reduction in rank.',
    applicableGrades: ['GL 01-17'],
    tags: ['misconduct', 'lateness', 'absenteeism', 'insubordination', 'dress code']
  },
  {
    ruleNumber: '030302',
    chapter: 3,
    chapterTitle: 'Discipline, Queries & Grievance Procedures',
    section: 'Section 3 - Disciplinary Procedure & Queries',
    title: 'Issuance of Formal Query and Due Process Requirement',
    summary: 'Before any disciplinary action can be taken against an officer, a formal written query (Form Gen 16) stating the specific rule violated and allegations must be served.',
    fullText: 'No disciplinary measure shall be taken against an officer unless he/she has been informed in writing of the grounds on which it is proposed to discipline him/her, and he/she has been given a full opportunity of exculpating himself/herself. The query must specify the particular Rule alleged to have been breached and state the date, time, and particulars of the incident.',
    keyPoints: [
      'Mandatory written query before any disciplinary sanction.',
      'Query must state the exact rule violated and detailed particulars of the act.',
      'Must give the officer fair hearing in compliance with Section 36 of the 1999 Constitution.',
      'Disciplinary actions taken without a valid query are ultra vires and voidable at the National Industrial Court.'
    ],
    tags: ['formal query', 'due process', 'fair hearing', 'query procedure', 'defense']
  },
  {
    ruleNumber: '030304',
    chapter: 3,
    chapterTitle: 'Discipline, Queries & Grievance Procedures',
    section: 'Section 3 - Query Timelines',
    title: 'Statutory 48-Hour Deadline for Query Response and Default Consequences',
    summary: 'An officer served with a query must submit a written reply within forty-eight (48) hours. Failure to respond within the stipulated time is taken as an admission of guilt.',
    fullText: 'An officer to whom a query has been issued shall be required to submit his/her written exculpation within forty-eight (48) hours of receipt, or within seventy-two (72) hours where weekends or public holidays intervene. Failure to reply within the specified period shall be construed as an admission of the allegations, and disciplinary proceedings shall proceed ex-parte.',
    keyPoints: [
      'Statutory deadline: 48 hours from actual receipt of query.',
      'Grace period: 72 hours where public holidays or weekends intervene.',
      'Officer must formally sign and acknowledge receipt of query.',
      'Failure to respond within 48 hours is deemed an admission of the offense.',
      'Exculpation should be addressed through proper official channels to the issuing officer.'
    ],
    timelineDays: 2,
    penaltyOrConsequence: 'Admission of guilt and immediate disciplinary sanction or referral to Senior Staff Committee (SSC).',
    applicableGrades: ['GL 01-17'],
    tags: ['48 hours', 'query deadline', 'exculpation', 'admission of guilt', 'procedure']
  },
  {
    ruleNumber: '030401',
    chapter: 3,
    chapterTitle: 'Discipline, Queries & Grievance Procedures',
    section: 'Section 4 - Serious Misconduct',
    title: 'Definition of Serious Misconduct',
    summary: 'Serious Misconduct is a specific act of very serious wrongdoing and gross dereliction of duty which can lead to dismissal.',
    fullText: 'Serious Misconduct is defined as a specific act of very serious wrongdoing and gross dereliction of duty which is inimical to the image and integrity of the service and which can lead to dismissal. It must be investigated by the Senior Staff Committee or Junior Staff Committee.',
    keyPoints: [
      'Highest tier of civil service infraction.',
      'Leads to interdiction, suspension, demotion, termination, or dismissal.',
      'Requires full investigation by the Senior Staff Committee (SSC) or Junior Staff Committee (JSC).'
    ],
    applicableGrades: ['GL 01-17'],
    tags: ['serious misconduct', 'gross dereliction', 'dismissal']
  },
  {
    ruleNumber: '030402',
    chapter: 3,
    chapterTitle: 'Discipline, Queries & Grievance Procedures',
    section: 'Section 4 - Serious Misconduct Offences',
    title: 'Acts Constituting Serious Misconduct',
    summary: 'List of specific offenses that constitute serious misconduct under PSR 2021, including bribery, embezzlement, unauthorized leakage of secrets, private business, and sexual harassment.',
    fullText: 'Acts of Serious Misconduct include: (a) Falsification of records or certificate forgery; (b) Suppression of official records; (c) Bribery, corruption, and financial impropriety; (d) Embezzlement and misappropriation of public funds; (e) Unauthorized disclosure of official secrets and leaking classified memos on social media; (f) Financial embarrassment (unmanageable debt); (g) Conviction on a criminal charge; (h) Engaging in private business or trade other than farming; (i) Sexual harassment; (j) Willful damage to government property; (k) Refusal of transfer or posting; (l) Membership of secret cults or unauthorized societies; (m) Participation in partisan political activities.',
    keyPoints: [
      'Falsification of age, certificates, or official records.',
      'Bribery, corruption, and misuse of public funds.',
      'Unauthorized disclosure or social media leakage of official documents.',
      'Operating private commercial businesses while in service (except farming).',
      'Sexual harassment in the workplace (newly reinforced in PSR 2021).',
      'Partisan political campaigning or contestation without resignation.'
    ],
    penaltyOrConsequence: 'Dismissal with forfeiture of pension and gratuity, or compulsory retirement.',
    applicableGrades: ['GL 01-17'],
    tags: ['bribery', 'embezzlement', 'forgery', 'social media leak', 'farming exception', 'sexual harassment', 'serious misconduct']
  },
  {
    ruleNumber: '030403',
    chapter: 3,
    chapterTitle: 'Discipline, Queries & Grievance Procedures',
    section: 'Section 4 - Interdiction & Suspension',
    title: 'Interdiction Procedure and Justification',
    summary: 'When an officer is reported for serious misconduct or criminal prosecution, he/she may be placed on interdiction pending determination of the case.',
    fullText: 'When a serious allegation of misconduct which may lead to dismissal is made against an officer, or when criminal proceedings are instituted against him/her, the Permanent Secretary or Head of Extra-Ministerial Department may place the officer on interdiction, having regard to the public interest and the need to protect government records.',
    keyPoints: [
      'Applied when allegations could warrant dismissal or when criminal charges are pending.',
      'Prevents interference with witnesses, files, or departmental operations.',
      'Must be approved by the Permanent Secretary or FCSC.'
    ],
    tags: ['interdiction', 'suspension', 'criminal charges', 'protective custody']
  },
  {
    ruleNumber: '030404',
    chapter: 3,
    chapterTitle: 'Discipline, Queries & Grievance Procedures',
    section: 'Section 4 - Interdiction Pay & Conditions',
    title: 'Interdiction Pay: 50% Salary and Conditions of Service',
    summary: 'An officer on interdiction receives fifty percent (50%) of his/her consolidated salary, surrenders official property, and cannot travel without written permission.',
    fullText: 'An officer who is under interdiction shall receive fifty percent (50%) of his/her consolidated salary and allowances during the period of interdiction. The officer shall immediately surrender all government property, keys, official identity cards, and equipment in his/her possession. The officer shall not leave his/her station without the prior written permission of the Permanent Secretary. If the officer is completely exonerated, he/she shall be restored to office and receive all withheld half-salaries.',
    keyPoints: [
      'Officer receives exactly 50% of basic salary during interdiction.',
      'Immediate surrender of official ID card, files, keys, and government vehicle.',
      'Prohibited from entering official premises without express permission.',
      'Cannot travel outside station without written clearance.',
      'If fully exonerated by the Senior Staff Committee / FCSC, the 50% arrears withheld are fully refunded.'
    ],
    applicableGrades: ['GL 01-17'],
    tags: ['interdiction salary', 'half pay', '50% pay', 'refund of arrears', 'exoneration']
  },
  {
    ruleNumber: '030406',
    chapter: 3,
    chapterTitle: 'Discipline, Queries & Grievance Procedures',
    section: 'Section 4 - Suspension',
    title: 'Suspension from Duty and Zero Pay Conditions',
    summary: 'Suspension is applied where a prima facie case of serious misconduct has been established or officer arrested, resulting in complete cessation of pay.',
    fullText: 'Suspension is the complete withdrawal of an officer from official duties. It is applied where a prima facie case of serious misconduct or a grave financial crime is established against an officer. During suspension, the officer shall not receive any salary whatsoever pending the determination of the charges against him/her.',
    keyPoints: [
      'More severe than interdiction; salary is zero during suspension.',
      'Used when officer is remanded in prison custody or prima facie fraud established.',
      'Must be promptly determined within 3 to 6 months.'
    ],
    penaltyOrConsequence: 'Total forfeiture of salary for the period of suspension unless exonerated.',
    applicableGrades: ['GL 01-17'],
    tags: ['suspension', 'zero pay', 'remand', 'prima facie']
  },
  {
    ruleNumber: '030409',
    chapter: 3,
    chapterTitle: 'Discipline, Queries & Grievance Procedures',
    section: 'Section 4 - Dismissal & Penalties',
    title: 'Dismissal and Forfeiture of Terminal Benefits',
    summary: 'Dismissal is the ultimate disciplinary penalty. It forfeits all rights to pension, gratuity, and terminal benefits, and disqualifies the person from future public office.',
    fullText: 'An officer who is dismissed shall forfeit all claims to a pension, gratuity, or terminal grant, and shall not be eligible for re-engagement or appointment in any other branch of the public service of the Federation or States.',
    keyPoints: [
      'Ultimate disciplinary penalty for serious misconduct.',
      'Complete loss of pension, gratuity, and terminal claims under civil service rules.',
      'Disqualified from future appointment in Federal, State, or Local Government service.',
      'Can only be authorized by the Federal Civil Service Commission (FCSC).'
    ],
    penaltyOrConsequence: 'Total forfeiture of pension, terminal benefits, and permanent bar from public office.',
    applicableGrades: ['GL 01-17'],
    tags: ['dismissal', 'forfeiture of pension', 'FCSC', 'ultimate penalty']
  },
  {
    ruleNumber: '030424',
    chapter: 3,
    chapterTitle: 'Discipline, Queries & Grievance Procedures',
    section: 'Section 4 - Private Business Restrictions',
    title: 'Prohibition of Engaging in Private Business (Farming Exemption Only)',
    summary: 'Officers are strictly prohibited from operating or running private commercial enterprises. The only constitutionally allowed commercial activity is agricultural farming.',
    fullText: 'In accordance with the Code of Conduct for Public Officers, an officer is strictly prohibited from engaging in the management or running of any private business, company, commercial firm, or private trade while in the service of the Federal Government. The only exception recognized is engagement in agriculture / farming, provided it does not conflict with official working hours.',
    keyPoints: [
      'Strict ban on private business, contracts, or company directorship.',
      'Sole permitted exception: Farming / Agricultural enterprises.',
      'Officers cannot use official hours or government assets for farming.',
      'Violations constitute serious misconduct under Rule 030402.'
    ],
    penaltyOrConsequence: 'Query, interdiction, and possible dismissal for conflict of interest.',
    applicableGrades: ['GL 01-17'],
    tags: ['private business', 'farming', 'agriculture', 'code of conduct', 'conflict of interest']
  },

  // CHAPTER 4 - SALARIES, INCREMENTS & ALLOWANCES
  {
    ruleNumber: '040103',
    chapter: 4,
    chapterTitle: 'Salaries, Increments & Allowances',
    section: 'Section 1 - Salaries & Increments',
    title: 'Annual Incremental Date (1st January) and Conditions',
    summary: 'Annual incremental date for all pensionable officers is 1st January of each calendar year, provided performance is certified satisfactory.',
    fullText: 'The incremental date of all officers shall be the 1st of January of each year. An increment shall not be granted as a matter of right but shall be earned through diligent, efficient, and satisfactory performance certified by the Head of Department.',
    keyPoints: [
      'Standardized incremental date: 1st January.',
      'Can be deferred or withheld for general inefficiency or misconduct.',
      'Requires satisfactory annual appraisal.'
    ],
    tags: ['increment', '1st January', 'salary steps', 'CONPSS']
  },
  {
    ruleNumber: '040201',
    chapter: 4,
    chapterTitle: 'Salaries, Increments & Allowances',
    section: 'Section 2 - Duty Tour Allowance (DTA)',
    title: 'Duty Tour Allowance (DTA) Rates and Conditions of Payment',
    summary: 'DTA is paid to an officer travelling on official duty outside his/her permanent duty station to cover lodging and feeding expenses.',
    fullText: 'Duty Tour Allowance (DTA) shall be paid to an officer proceeding on official duty outside his/her station for an approved journey. The revised approved rates per diem are: (a) GL 01-04: ₦10,000 per night; (b) GL 05-06: ₦15,000 per night; (c) GL 07-10: ₦17,500 per night; (d) GL 12-14: ₦20,000 per night; (e) GL 15-17: ₦25,000 per night; (f) Permanent Secretaries / CEOs: ₦35,000 per night.',
    keyPoints: [
      'GL 01 - 04: ₦10,000 per diem.',
      'GL 05 - 06: ₦15,000 per diem.',
      'GL 07 - 10: ₦17,500 per diem.',
      'GL 12 - 14: ₦20,000 per diem.',
      'GL 15 - 17: ₦25,000 per diem.',
      'Permanent Secretary / Chief Executive: ₦35,000 per diem.',
      'Requires prior approval of journey and submission of travel report within 7 days of return.'
    ],
    applicableGrades: ['GL 01-17', 'Perm Sec'],
    tags: ['DTA', 'duty tour allowance', 'per diem', 'travel expenses', 'allowances']
  },
  {
    ruleNumber: '040206',
    chapter: 4,
    chapterTitle: 'Salaries, Increments & Allowances',
    section: 'Section 2 - Overseas Travel & Estacode',
    title: 'Estacode Allowance Rates for Official Foreign Travel',
    summary: 'Estacode is paid in foreign currency (USD) to officers travelling outside Nigeria on approved government delegations, conferences, and training.',
    fullText: 'Estacode allowance shall be paid to officers travelling abroad on official duty or approved training to cover hotel accommodation and meals. Rates are established by circular from the National Salaries, Incomes and Wages Commission (NSIWC). Officers on GL 15-17 receive senior estacode rates; Ministers and Perm Secs receive leadership estacode rates.',
    keyPoints: [
      'Calculated in US Dollars (USD) or equivalent local currency.',
      'Requires prior approval from the Office of the Secretary to the Government of the Federation (OSGF).',
      'Air tickets must be booked in economy class for GL 01-14; business class is reserved for GL 15+ and Perm Secs.'
    ],
    tags: ['estacode', 'foreign travel', 'NSIWC', 'USD rates', 'overseas trip']
  },

  // CHAPTER 5 - MEDICAL CARE & HEALTH
  {
    ruleNumber: '050201',
    chapter: 5,
    chapterTitle: 'Medical Care, Health & Medical Boards',
    section: 'Section 2 - Federal Medical Board',
    title: 'Referral to Federal Medical Board and Health Invalidation',
    summary: 'An officer whose illness exceeds statutory limits or who suffers mental/physical impairment shall be referred to a Federal Medical Board for evaluation.',
    fullText: 'When an officer is absent from duty on account of illness for continuous periods exceeding the limits stipulated in Rule 050301, or where there are reasonable grounds to believe he/she is incapable of discharging his/her duties, the Permanent Secretary shall refer the officer to a Federal Medical Board for assessment and recommendation regarding continuation in service or medical invalidation.',
    keyPoints: [
      'Triggered after prolonged sick leave or incapacitation.',
      'Medical Board consists of registered medical specialists appointed by the Federal Ministry of Health.',
      'Recommendations can include sick leave extension, lighter duties, or medical retirement.'
    ],
    tags: ['medical board', 'health invalidation', 'medical fitness', 'FMOH']
  },
  {
    ruleNumber: '050301',
    chapter: 5,
    chapterTitle: 'Medical Care, Health & Medical Boards',
    section: 'Section 3 - Sick Leave',
    title: 'Sick Leave Entitlements and Ceilings',
    summary: 'Sick leave on full pay is granted for up to 3 months, extendable by another 3 months on half pay upon recommendation of a Medical Board.',
    fullText: 'An officer may be granted sick leave on full pay for up to three (3) months in any period of twelve (12) months. Upon the recommendation of a recognized government medical officer or Federal Medical Board, a further period of three (3) months on half pay may be granted. If the officer is not fit to resume duty after six (6) months, steps shall be taken to examine him/her for medical invalidation.',
    keyPoints: [
      'First 3 months: Full pay.',
      'Next 3 months: Half pay (requires Medical Board recommendation).',
      'Beyond 6 months: Invalidation proceedings for retirement on health grounds.',
      'Medical certificates must be submitted within 48 hours of illness.'
    ],
    timelineDays: 90,
    tags: ['sick leave', 'medical certificate', 'half pay', 'invalidation']
  },

  // CHAPTER 6 - LEAVE & ABSENCES
  {
    ruleNumber: '060201',
    chapter: 6,
    chapterTitle: 'Leave & Absences from Duty',
    section: 'Section 2 - Annual Leave Entitlements',
    title: 'Annual Leave Duration by Grade Level',
    summary: 'Annual leave entitlements under PSR 2021: GL 01-06: 14 calendar days; GL 07-14: 30 calendar days; GL 15-17: 30 calendar days.',
    fullText: 'Every officer is entitled to annual leave within each calendar year as follows: (a) Grade Levels 01 to 06: Fourteen (14) calendar days; (b) Grade Levels 07 to 14: Thirty (30) calendar days; (c) Grade Levels 15 and above (including Permanent Secretaries): Thirty (30) calendar days. Annual leave is granted subject to the exigencies of the service and may not be accumulated except with written approval of the Permanent Secretary.',
    keyPoints: [
      'GL 01 - 06: 14 calendar days.',
      'GL 07 - 14: 30 calendar days.',
      'GL 15 - 17: 30 calendar days.',
      'Leave cannot be accumulated across years without prior written permission of the Permanent Secretary.',
      'Annual leave grant allowance is paid in accordance with current salary scale.'
    ],
    applicableGrades: ['GL 01-17'],
    tags: ['annual leave', 'leave days', 'vacation', 'GL entitlements']
  },
  {
    ruleNumber: '060204',
    chapter: 6,
    chapterTitle: 'Leave & Absences from Duty',
    section: 'Section 2 - Casual Leave',
    title: 'Casual Leave Limit and Conditions',
    summary: 'Casual leave of up to seven (7) working days in a calendar year may be granted for urgent personal emergencies.',
    fullText: 'Casual leave of not more than seven (7) working days in any one calendar year may be granted to an officer by his/her Head of Department to attend to urgent, unforeseen personal affairs. Casual leave is deductible from the officer’s annual leave for that year.',
    keyPoints: [
      'Maximum 7 working days per calendar year.',
      'Intended for sudden emergency personal matters.',
      'Deductible from annual leave entitlement.',
      'Approved directly by the Head of Department.'
    ],
    timelineDays: 7,
    tags: ['casual leave', 'emergency leave', '7 days', 'personal affairs']
  },
  {
    ruleNumber: '060206',
    chapter: 6,
    chapterTitle: 'Leave & Absences from Duty',
    section: 'Section 2 - Maternity Leave',
    title: 'Maternity Leave Duration (16 Weeks Full Pay) and Nursing Break',
    summary: 'Female public servants are entitled to sixteen (16) weeks maternity leave on full pay, and 2 hours daily off-duty nursing break for six (6) months.',
    fullText: 'A female officer is entitled to sixteen (16) weeks (four months) maternity leave with full pay. The leave shall commence six (6) weeks before the expected date of delivery, and the balance of ten (10) weeks after delivery. In addition, upon resumption of duty, a nursing mother shall be granted two (2) hours off-duty daily for the care of her infant child for a duration of six (6) months from the date of resumption.',
    keyPoints: [
      '16 weeks (4 full calendar months) on full pay.',
      'Structure: 6 weeks pre-delivery and 10 weeks post-delivery.',
      'Nursing mothers get 2 hours off duty every working day for 6 months after resumption.',
      'Annual leave for the year of delivery is not forfeited.'
    ],
    timelineDays: 112,
    applicableGrades: ['GL 01-17'],
    tags: ['maternity leave', '16 weeks', 'nursing break', 'female officers', 'full pay']
  },
  {
    ruleNumber: '060207',
    chapter: 6,
    chapterTitle: 'Leave & Absences from Duty',
    section: 'Section 2 - Paternity Leave (PSR 2021 Landmark Rule)',
    title: 'Paternity Leave: 14 Working Days with Full Pay for Male Officers',
    summary: 'PSR 2021 introduced 14 working days paternity leave with full pay for male civil servants whose registered spouses deliver.',
    fullText: 'A male officer shall be entitled to paternity leave of fourteen (14) working days with full pay. The paternity leave is to enable the male officer to bond with the newborn baby and assist his nursing spouse. The leave must be utilized within six (6) weeks of the delivery of the baby and shall require the submission of a valid certificate of marriage and a hospital notification or certificate of birth.',
    keyPoints: [
      'Landmark provision introduced in PSR 2021.',
      'Duration: 14 working days with full pay (does not count weekends).',
      'Window: Must be taken within the first 6 weeks of baby’s birth.',
      'Documentation: Requires submission of legal Marriage Certificate and Birth Certificate / Hospital Birth Notification.',
      'Does not diminish annual leave entitlement.'
    ],
    timelineDays: 14,
    applicableGrades: ['GL 01-17'],
    tags: ['paternity leave', '14 days', 'male officers', 'PSR 2021 new rule', 'family support']
  },
  {
    ruleNumber: '060209',
    chapter: 6,
    chapterTitle: 'Leave & Absences from Duty',
    section: 'Section 2 - Study Leave & Training Bonds',
    title: 'Study Leave with Pay: Conditions and Service Bond Obligations',
    summary: 'Study leave with pay requires minimum 5 years of pensionable service, relevance of course, and execution of a legal bond to serve for 2-3 years after graduation.',
    fullText: 'Study leave with pay may be granted to an officer who has completed not less than five (5) years of continuous, confirmed service, where the course of study is certified by the MDA and OHCSF to be in the interest of the public service. An officer granted study leave with pay must execute a legal bond with two acceptable sureties to serve the Federal Government for a minimum of two (2) years for a one-year course, or three (3) years for courses exceeding one year.',
    keyPoints: [
      'Minimum service threshold: 5 years continuous confirmed service.',
      'Course must be approved by OHCSF and aligned with establishment needs.',
      'Officer receives full salary while studying.',
      'Mandatory legal bond with 2 sureties.',
      'Defaulting on bond requires refund of all salaries and allowances paid during study.'
    ],
    applicableGrades: ['GL 07-17'],
    tags: ['study leave', 'training bond', 'sureties', 'further studies', 'bond default']
  },
  {
    ruleNumber: '060301',
    chapter: 6,
    chapterTitle: 'Leave & Absences from Duty',
    section: 'Section 3 - Pre-Retirement Leave',
    title: 'Mandatory Pre-Retirement Leave (Three Months)',
    summary: 'Officers due for statutory retirement must proceed on three (3) months pre-retirement leave immediately preceding the effective retirement date.',
    fullText: 'Officers who are due for compulsory retirement shall proceed on mandatory three (3) months pre-retirement leave prior to the effective date of retirement. This period shall be dedicated to processing pension documents with the Pension Fund Administrator (PFA), the National Pension Commission (PENCOM), and hand-over notes.',
    keyPoints: [
      'Duration: 3 calendar months preceding retirement.',
      'Used for pension documentation with PENCOM and PFA.',
      'Mandatory preparation of comprehensive handing-over notes.',
      'Cannot be commuted to cash.'
    ],
    timelineDays: 90,
    applicableGrades: ['GL 01-17'],
    tags: ['pre-retirement leave', '3 months', 'handing over', 'PENCOM', 'retirement']
  },

  // CHAPTER 8 - SEPARATION & RETIREMENT
  {
    ruleNumber: '080201',
    chapter: 8,
    chapterTitle: 'Separation from Service, Resignation & Retirement',
    section: 'Section 2 - Compulsory Retirement Age',
    title: 'Compulsory Retirement Age: 60 Years of Age or 35 Years of Service',
    summary: 'The statutory retirement age in the Federal Civil Service is sixty (60) years of age or thirty-five (35) years of pensionable service, whichever is earlier.',
    fullText: 'The compulsory retirement age for all grades in the Service shall be sixty (60) years of age or thirty-five (35) years of pensionable service, whichever is earlier. No officer shall be allowed to remain in service after attaining either sixty years of age or thirty-five years of service, except where expressly provided for in the Constitution of the Federal Republic of Nigeria (such as judicial officers or tertiary institution academic staff).',
    keyPoints: [
      'The landmark 60/35 Rule of the Nigerian Civil Service.',
      'Threshold: 60 years of age OR 35 years of service (whichever comes first).',
      'Falsification of date of birth or date of first appointment is a serious misconduct (Rule 030402).',
      'MDA Personnel Departments must give 6 months advance notice to officers approaching either threshold.'
    ],
    applicableGrades: ['GL 01-17', 'Perm Sec'],
    tags: ['retirement age', '60 years', '35 years service', 'statutory retirement', 'pension']
  },
  {
    ruleNumber: '080202',
    chapter: 8,
    chapterTitle: 'Separation from Service, Resignation & Retirement',
    section: 'Section 2 - Resignation & Notice Periods',
    title: 'Resignation and Withdrawal of Service Notice Periods',
    summary: 'Officers resigning from service must provide one (1) month written notice or pay one (1) month salary in lieu of notice.',
    fullText: 'An officer may resign his/her appointment by giving one (1) month notice in writing to the Permanent Secretary, or by paying one (1) month salary in lieu of notice. The resignation shall not take effect until formally accepted by the appointing authority, and after financial and audit clearance has been secured.',
    keyPoints: [
      'Standard notice: 1 month written notice or 1 month salary in lieu.',
      'Requires audit and property clearance.',
      'Resignation cannot be accepted if disciplinary proceedings are active.'
    ],
    timelineDays: 30,
    tags: ['resignation', 'notice period', 'salary in lieu', 'separation']
  },
  {
    ruleNumber: '080301',
    chapter: 8,
    chapterTitle: 'Separation from Service, Resignation & Retirement',
    section: 'Section 3 - Pension & Contributory Pension Scheme',
    title: 'Pension Administration under Pension Reform Act 2014 and PENCOM',
    summary: 'Retirement benefits are administered under the Contributory Pension Scheme (CPS) with mandatory monthly employer and employee deductions.',
    fullText: 'Retirement benefits shall be processed in accordance with the Pension Reform Act 2014. Every officer shall maintain a Retirement Savings Account (RSA) with an approved Pension Fund Administrator (PFA). Terminal benefits are disbursed as programmed withdrawal or retiree life annuity upon attaining the statutory retirement threshold.',
    keyPoints: [
      'Governed by PENCOM Contributory Pension Scheme.',
      'Employee contributes 8%, Federal Government contributes 10% of monthly consolidated salary.',
      'Requires prompt update of records with National Pension Commission (PENCOM).'
    ],
    tags: ['pension', 'PENCOM', 'RSA', 'PFA', 'CPS', 'gratuity']
  },

  // CHAPTER 9 - PETITIONS & APPEALS
  {
    ruleNumber: '090102',
    chapter: 9,
    chapterTitle: 'Petitions, Appeals & Redress Channels',
    section: 'Section 1 - Channels of Redress',
    title: 'Mandatory Submission of Petitions through Proper Channels',
    summary: 'Every civil servant has the right to petition, but petitions must be forwarded through the officer’s immediate superior to the Permanent Secretary.',
    fullText: 'An officer who feels aggrieved by any administrative decision or disciplinary sanction has the constitutional right to petition the higher authority. However, every petition must be submitted through the proper official channels: starting with the immediate Head of Department, through the Permanent Secretary, to the Federal Civil Service Commission. Routing petitions directly to outside entities without exhausting internal channels is an act of misconduct.',
    keyPoints: [
      'Channel: Immediate Supervisor -> Head of Department -> Permanent Secretary -> FCSC.',
      'Bypassing proper channels to write external bodies is prohibited.',
      'Superiors must forward petitions within thirty (30) days with their comments.'
    ],
    timelineDays: 30,
    tags: ['petition', 'proper channels', 'grievance', 'appeal', 'FCSC']
  },
  {
    ruleNumber: '090104',
    chapter: 9,
    chapterTitle: 'Petitions, Appeals & Redress Channels',
    section: 'Section 1 - Anonymous Petitions',
    title: 'Prohibition of Anonymous Petitions in the Civil Service',
    summary: 'Anonymous petitions are strictly prohibited and shall be discarded without action or consideration.',
    fullText: 'Anonymous petitions are strictly forbidden in the Federal Public Service. Any petition or complaint that does not bear the authentic name, staff number, designation, and verifiable signature of the petitioner shall not be entertained and shall be consigned to the waste paper basket.',
    keyPoints: [
      'Anonymous petitions are void and rejected automatically.',
      'Petitioner must sign with full name, staff ID, and MDA.',
      'Protects officers against malicious and baseless smears.'
    ],
    penaltyOrConsequence: 'Automatic rejection and destruction of petition.',
    tags: ['anonymous petitions', 'petitions', 'verifiable signature', 'redress']
  },

  // CHAPTER 10 - OFFICIAL SECRETS & MEDIA
  {
    ruleNumber: '100101',
    chapter: 10,
    chapterTitle: 'Official Secrets, Media & Public Communications',
    section: 'Section 1 - Oath of Secrecy',
    title: 'Oath of Secrecy and Official Secrets Act Obligations',
    summary: 'Every public officer must take the Oath of Secrecy upon appointment and is bound to protect classified and confidential government information.',
    fullText: 'Every officer upon appointment shall take and subscribe to the Oath of Secrecy in accordance with the Official Secrets Act. Officers are under an ongoing legal obligation not to disclose or communicate any classified government document, confidential memo, or internal intelligence without express authorization.',
    keyPoints: [
      'Statutory Oath of Secrecy administered on entry into service.',
      'Continues even after resignation or retirement.',
      'Breach is punishable under both the PSR (Rule 030402) and criminal law.'
    ],
    tags: ['oath of secrecy', 'official secrets', 'classified', 'confidentiality']
  },
  {
    ruleNumber: '100203',
    chapter: 10,
    chapterTitle: 'Official Secrets, Media & Public Communications',
    section: 'Section 2 - Social Media & Digital Communications',
    title: 'Social Media Regulations: Ban on Leaking Official Memos and Digital Misconduct',
    summary: 'PSR 2021 explicitly prohibits photographing, scanning, or posting internal government memos, deliberations, or official files on WhatsApp, X (Twitter), Facebook, or any digital platform.',
    fullText: 'An officer shall not publish, post, broadcast, or transmit any internal government communication, memo, minute, circular, or classified record on any social media platform, website, or digital channel. Leaking official correspondence online constitutes Serious Misconduct under Rule 030402 and will result in immediate interdiction and dismissal.',
    keyPoints: [
      'Explicit modern addition in PSR 2021.',
      'Total ban on posting official circulars, memos, minutes on social networks.',
      'Officers are responsible for maintaining digital security and confidentiality.',
      'Violations trigger immediate interdiction and referral for dismissal.'
    ],
    penaltyOrConsequence: 'Immediate interdiction, Senior Staff Committee trial, and dismissal.',
    applicableGrades: ['GL 01-17'],
    tags: ['social media', 'classified leak', 'digital memo', 'whatsapp leaks', 'dismissal']
  },

  // CHAPTER 11 - ETHICS & CONFLICT OF INTEREST
  {
    ruleNumber: '110101',
    chapter: 11,
    chapterTitle: 'Conduct, Ethics & Conflict of Interest',
    section: 'Section 1 - Code of Conduct Bureau (CCB)',
    title: 'Asset Declaration Requirements under the 1999 Constitution',
    summary: 'All public officers must declare their assets to the Code of Conduct Bureau (CCB) upon appointment, every 4 years in service, and on exit.',
    fullText: 'Every public officer shall submit a written declaration of all properties, assets, and liabilities owned by him/her and his/her unmarried children under the age of 18 to the Code of Conduct Bureau (CCB): (a) Within thirty (30) days of appointment; (b) At the end of every four (4) years; (c) At the end of his/her tenure of service.',
    keyPoints: [
      'Constitutional requirement under 5th Schedule, Part I.',
      'Cycle: On appointment, every 4 years, and on separation.',
      'Failure to declare or false declaration leads to prosecution at the Code of Conduct Tribunal (CCT).'
    ],
    timelineDays: 30,
    tags: ['CCB', 'asset declaration', 'code of conduct', 'ethics', 'CCT']
  },
  {
    ruleNumber: '110201',
    chapter: 11,
    chapterTitle: 'Conduct, Ethics & Conflict of Interest',
    section: 'Section 2 - Political Neutrality',
    title: 'Political Impartiality and Mandatory Resignation to Contest Elective Office',
    summary: 'Public officers must remain strictly politically neutral. Any officer wishing to participate in partisan politics or contest elective office must resign.',
    fullText: 'An officer shall maintain absolute political neutrality and shall not participate in partisan politics, wear party uniforms, display political party badges, or make public speeches favoring any political organization. An officer who desires to contest for any elective political office shall first resign his/her appointment in accordance with the law.',
    keyPoints: [
      'Absolute political neutrality of the Federal Civil Service.',
      'Must not hold political party offices or campaign publicly.',
      'Must tender formal resignation before obtaining nomination forms or contesting.'
    ],
    penaltyOrConsequence: 'Disciplinary dismissal from service for participating in partisan campaigns without prior resignation.',
    applicableGrades: ['GL 01-17'],
    tags: ['political neutrality', 'elections', 'partisan politics', 'resignation']
  },

  // CHAPTER 14 - VIRTUAL & DIGITAL GOVERNANCE (PSR 2021)
  {
    ruleNumber: '140101',
    chapter: 14,
    chapterTitle: 'Virtual / Digital Governance & Teleworking',
    section: 'Section 1 - Digital Workplace & EDMS',
    title: 'Adoption of Electronic Document Management System (EDMS)',
    summary: 'PSR 2021 mandates the migration of government records to Electronic Document Management Systems (EDMS) for paperless public administration.',
    fullText: 'All Federal Ministries, Departments, and Agencies shall implement an Electronic Document Management System (EDMS) for the creation, processing, storage, and retrieval of government files, memoranda, and correspondences, in line with the Federal Civil Service Strategy and Implementation Plan (FCSSIP).',
    keyPoints: [
      'Mandatory transition to paperless governance and e-filing.',
      'Digital signatures and digital audit trails carry full legal validity.',
      'Officers must be trained in digital literacy and cyber hygiene.'
    ],
    tags: ['EDMS', 'digital governance', 'paperless', 'FCSSIP', 'virtual office']
  },
  {
    ruleNumber: '140104',
    chapter: 14,
    chapterTitle: 'Virtual / Digital Governance & Teleworking',
    section: 'Section 1 - Official Government Email',
    title: 'Mandatory Use of Official Government Email (.gov.ng)',
    summary: 'Officers are strictly forbidden from using private commercial emails (Gmail, Yahoo) for official government correspondence.',
    fullText: 'All official government correspondences, memoranda, and directives must be conducted exclusively through assigned official government email addresses ending in .gov.ng. The use of private email addresses (e.g. Yahoo, Gmail, Hotmail) for official government business is strictly prohibited.',
    keyPoints: [
      'Mandatory .gov.ng domain for all official communications.',
      'Ban on Yahoo/Gmail for transmission of government documents.',
      'Protects state cybersecurity and data sovereignty.'
    ],
    tags: ['gov.ng email', 'official email', 'cybersecurity', 'data protection']
  }
];

export const DEMO_OFFICER_PROFILES: OfficerProfile[] = [
  {
    id: 'off-001',
    name: 'Bello Danjuma Adebayo',
    staffNumber: 'FGN/FED/ADM/88219',
    cadre: 'Administrative Officer Cadre',
    gradeLevel: 'GL 10',
    role: 'senior_officer',
    mda: 'Federal Ministry of Finance, Budget & National Planning',
    station: 'Central Business District, Abuja FCT',
    yearsInService: 9,
    yearsOnGrade: 3,
    securityClearance: 'Secret',
    email: 'bello.adebayo@finance.gov.ng'
  },
  {
    id: 'off-002',
    name: 'Chinyere N. Okafor',
    staffNumber: 'OAGF/TREAS/44120',
    cadre: 'Executive Officer (Accounts) Cadre',
    gradeLevel: 'GL 06',
    role: 'junior_officer',
    mda: 'Office of the Accountant-General of the Federation (OAGF)',
    station: 'Treasury House, Garki II, Abuja',
    yearsInService: 4,
    yearsOnGrade: 2,
    securityClearance: 'Restricted',
    email: 'chinyere.okafor@oagf.gov.ng'
  },
  {
    id: 'off-003',
    name: 'Dr. Folashade Mustapha-Aliyu',
    staffNumber: 'OHCSF/DIR/01290',
    cadre: 'Directorate (Human Resource Management)',
    gradeLevel: 'GL 17',
    role: 'directorate',
    mda: 'Office of the Head of the Civil Service of the Federation (OHCSF)',
    station: 'Federal Secretariat Complex, Phase II, Abuja',
    yearsInService: 24,
    yearsOnGrade: 5,
    securityClearance: 'Top Secret',
    email: 'folashade.aliyu@ohcsf.gov.ng'
  },
  {
    id: 'off-004',
    name: 'Barr. Emmanuel Kalu',
    staffNumber: 'FCSC/LEGAL/00341',
    cadre: 'Legal & Disciplinary Appeals Commissioner',
    gradeLevel: 'FCSC Admin',
    role: 'fcsc_admin',
    mda: 'Federal Civil Service Commission (FCSC)',
    station: 'FCSC Headquarters, Wuse Zone 3, Abuja',
    yearsInService: 19,
    yearsOnGrade: 4,
    securityClearance: 'Top Secret',
    email: 'emmanuel.kalu@fcsc.gov.ng'
  }
];

export const INITIAL_QUERIES: QueryRecord[] = [
  {
    id: 'qry-101',
    refNumber: 'FMF/HRM/DISC/2026/089',
    targetOfficerName: 'Bello Danjuma Adebayo',
    targetStaffNo: 'FGN/FED/ADM/88219',
    targetGrade: 'GL 10',
    allegationTitle: 'Alleged Absence from Duty Without Permission on 2nd October 2026',
    violatedRule: 'Rule 030301(d) & Rule 030302',
    issuedDate: '2026-10-12T09:00:00Z',
    deadlineHours: 48,
    status: 'Pending Reply',
    issuedByOfficer: 'Mrs. H. K. Sanni (Deputy Director, Admin)',
    issuedByMDA: 'Federal Ministry of Finance',
    queryBody: 'It has been brought to the notice of the Permanent Secretary that you were absent from your desk on Wednesday, 2nd October 2026, without obtaining prior written approval from your Head of Division. This action is inimical to the smooth functioning of the Ministry and contravenes Rule 030301(d) of the Public Service Rules (2021). You are hereby requested to explain in writing within 48 hours of receipt of this query why disciplinary action should not be taken against you.'
  },
  {
    id: 'qry-102',
    refNumber: 'OAGF/AUD/2026/042',
    targetOfficerName: 'Ibrahim Musa Garba',
    targetStaffNo: 'OAGF/ACCTS/77189',
    targetGrade: 'GL 08',
    allegationTitle: 'Delay in Processing Departmental Capital Vouchers',
    violatedRule: 'Rule 030301(b) - Deliberate delay in treating official files',
    issuedDate: '2026-10-10T11:30:00Z',
    deadlineHours: 48,
    status: 'Reply Submitted',
    issuedByOfficer: 'Mr. A. T. Zubairu (Director of Accounts)',
    issuedByMDA: 'Office of the Accountant-General of the Federation',
    queryBody: 'You are queried for withholding payment vouchers for the 2026 Q3 Capital expenditure without justification, causing delays in statutory vendor disbursements contrary to Rule 030301(b). Submit your explanation within 48 hours.',
    replyBody: 'Sir, I respectfully submit that the delay was occasioned by discrepancies identified between the e-invoice tax identification numbers (TIN) and the Remita RRR settlement codes. As required by Financial Regulations, the voucher was referred back to Internal Audit for reconciliation to safeguard public funds.',
    replySubmittedAt: '2026-10-11T14:15:00Z'
  }
];
