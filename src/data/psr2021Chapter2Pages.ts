/**
 * PSR 2021 Chapter 2 — user-supplied image transcription.
 * Status: IMAGE_TRANSCRIPTION_REVIEW_PENDING.
 * The last sentence of Rule 020102 is cut off in the supplied image.
 */
export const PSR2021_CHAPTER_2_PAGES = [
  {
    chapter: 2,
    chapterTitle: 'Appointments and Leaving the Service',
    submittedPage: 1,
    source: 'User-supplied screenshot of Chapter 2 opening page',
    verification: 'IMAGE_TRANSCRIPTION_REVIEW_PENDING',
    sections: [
      'SECTION 1 – GENERAL',
      'SECTION 2 – RECRUITMENT',
      'SECTION 3 – RULES FOR APPOINTMENT ON PROBATION',
      'SECTION 4 – RULES FOR APPOINTMENT ON SHORT TERM ENGAGEMENTS',
      'SECTION 5 – TRANSFER AND SECONDMENT',
      'SECTION 6 – POSTING OF OFFICERS',
      'SECTION 7 – ACTING APPOINTMENT',
      'SECTION 8 – PROMOTION',
      'SECTION 9 – LEAVING THE SERVICE',
      'SECTION 10 – MANDATORY CONTRIBUTION TO PENSION SCHEME',
      'SECTION 11 – CERTIFICATE OF SERVICE',
      'SECTION 12 – SCHEDULE FOR NON PENSIONABLE APPOINTMENT'
    ],
    rules: [
      {
        ruleNumber: '020101',
        topic: 'Authority for Appointment',
        complete: true,
        text: `Appointments to offices in the Federal Civil Service are made on the authority of the Federal Civil Service Commission. These appointments are made either:
(a) by letter written under the direction of the Federal Civil Service Commission; or
(b) by formal agreement between the Officer and the Federal Government or its appointed agents. Subject to Rules 020205, 020206 and 020207, Permanent Secretaries/Heads of Extra-Ministerial Offices are authorized to appoint eligible candidates to posts in respect of which the powers of appointment have been delegated to them.`
      },
      {
        ruleNumber: '020102',
        topic: 'Appointment by the FCSC',
        complete: true,
        text: `(i) The Federal Civil Service Commission shall make appointments to posts graded GL.07–17. Such appointments shall be made as the need arises into the available vacancies after advertisement. Advertisement shall be in three national newspapers and the Commission's website. The deadline for submission of applications from interested candidates shall be six weeks from the date of placement of the advertisement.
(ii) Subject to modalities to be prescribed by the Federal Civil Service Commission from time to time, each Ministry/Extra-Ministerial Office shall select from the pool of successful candidates at the Civil Service Examination prescribed in Rule 020102(iv).
(iii) This shall be handled by the appropriate Committees of each Ministry with the representatives of the Federal Civil Service Commission and Head of the Civil Service of the Federation at the meeting of the Committees;
(iv) There shall be an annual competitive Civil Service Entry Examination for posts graded GL. 07–10 for new entrants and serving Officers wishing to transfer from other scheduled services. This examination shall be conducted by the Federal Civil Service Commission in conjunction with the Office of the Head of the Civil Service of the Federation, Administrative Staff College of Nigeria (ASCON) and Public Service Institute of Nigeria (PSIN);
(v) To qualify for this examination, candidates must possess the qualification(s) in relevant disciplines as provided for in the approved Schemes of Service. Final recommendation shall be made by the Ministries/Extra-Ministerial Offices in line with their requirements.`
      }
      ,
      {
        ruleNumber: '020103',
        topic: 'Appointments into Posts GL.06 and below',
        complete: true,
        text: `(a) Each Ministry/Extra-Ministerial Office shall appoint Junior Staff on GL. 06 and below. This shall be handled by the Junior Staff Committee of each Ministry/Office;
(b) Appointment in the Federal Ministries/Extra-Ministerial Offices located in the States/Zones shall be from the residents of those States/Zones who possess the qualification(s) prescribed in the approved Schemes of Service;
(c) Each Ministry/Extra-Ministerial Office shall work out the actual establishment for each State Office as contained in the approved establishment of MDAs obtained from the Office of the Head of the Civil Service of the Federation (OHCSF). The Junior Staff Committee (Local) shall conduct the interview to appoint the Officers, subject to approval of the Permanent Secretary/Head of Extra-Ministerial Offices.`
      },
      {
        ruleNumber: '020104',
        topic: 'Incremental Date',
        complete: true,
        text: 'The incremental date of an Officer appointed, or promoted to a post in the Federal Public Service shall be 1st January of every year provided such Officer has spent at least six (6) months on the Grade with good performance before enjoying the increment.'
      },
      {
        ruleNumber: '020105',
        topic: 'Seniority',
        complete: true,
        text: 'Seniority in any Department shall be determined by the entry date/the date of assumption of duty certified by an authorized Officer and or date of present appointment as reflected in the appropriate register and career progression of the Officers.'
      }
    ]
  }
] as const;
