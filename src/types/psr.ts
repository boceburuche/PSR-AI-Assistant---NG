export type GradeLevel = 
  | 'GL 01' | 'GL 02' | 'GL 03' | 'GL 04' | 'GL 05' | 'GL 06'
  | 'GL 07' | 'GL 08' | 'GL 09' | 'GL 10' | 'GL 12' | 'GL 13' | 'GL 14'
  | 'GL 15' | 'GL 16' | 'GL 17' | 'Perm Sec' | 'FCSC Admin';

export type UserRole = 'junior_officer' | 'senior_officer' | 'directorate' | 'fcsc_admin';

export type SecurityClearance = 'Restricted' | 'Confidential' | 'Secret' | 'Top Secret';

export interface OfficerProfile {
  id: string;
  name: string;
  staffNumber: string;
  cadre: string;
  gradeLevel: GradeLevel;
  role: UserRole;
  mda: string;
  station: string;
  yearsInService: number;
  yearsOnGrade: number;
  securityClearance: SecurityClearance;
  email: string;
}

export interface PSRRule {
  ruleNumber: string; // e.g. "030402"
  chapter: number;
  chapterTitle: string;
  section: string;
  title: string;
  summary: string;
  fullText: string;
  keyPoints: string[];
  timelineDays?: number;
  penaltyOrConsequence?: string;
  applicableGrades?: string[]; // e.g. ["GL 01-17", "GL 07-14", "GL 15-17"]
  tags: string[];
  referenceLink?: string;
}

export interface PSRChapter {
  number: number;
  title: string;
  description: string;
  sectionsCount: number;
  rulesCount: number;
  keyTopics: string[];
}

export interface PSRForeword {
  title: string;
  signatory: string;
  designation: string;
  location: string;
  text: string;
  keyDirectives: string[];
}

export interface PSRPreamble {
  title: string;
  signatory: string;
  designation: string;
  location: string;
  text: string;
  numberingConvention: {
    format: string;
    description: string;
  };
  keyProvisions: string[];
}

export interface PSRTableOfContentsItem {
  chapter: number;
  subject: string;
  subSections?: string[];
  keyTopics?: string[];
}

export interface PSRIndexEntry {
  letter: string; // e.g. 'A', 'D', 'L'
  mainCategory: string; // e.g. 'APPOINTMENTS AND LEAVING THE SERVICE'
  subCategory?: string; // e.g. 'RULES FOR APPOINTMENT ON PROBATION'
  topic: string; // e.g. 'Period of Probation'
  ruleNumber: string; // e.g. '020301'
}

export interface RAGRetrievalResult {
  rule: PSRRule;
  score: number;
  matchedTerms: string[];
  relevanceReason: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  sources?: PSRRule[];
  confidence?: 'High' | 'Medium' | 'Statutory Authority';
  recommendedActions?: string[];
  warnings?: string[];
  generatedDraft?: {
    type: 'query_reply' | 'formal_query' | 'leave_memo' | 'appeal_petition';
    title: string;
    content: string;
  };
}

export interface QueryRecord {
  id: string;
  refNumber: string;
  targetOfficerName: string;
  targetStaffNo: string;
  targetGrade: GradeLevel;
  allegationTitle: string;
  violatedRule: string;
  issuedDate: string;
  deadlineHours: number;
  status: 'Pending Reply' | 'Reply Submitted' | 'Under Review' | 'Discharged' | 'Referred to SSC';
  issuedByOfficer: string;
  issuedByMDA: string;
  queryBody: string;
  replyBody?: string;
  replySubmittedAt?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  officerName: string;
  staffNo: string;
  role: string;
  action: string;
  details: string;
  status: 'Allowed' | 'Restricted' | 'Flagged';
}
