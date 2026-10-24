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
        complete: false,
        text: `(i) The Federal Civil Service Commission shall make appointments to posts graded GL.07–17. Such appointments shall be made as the need arises into the available vacancies after advertisement. Advertisement shall be in three national newspapers and the Commission's website. The deadline for submission of applications from interested candidates shall be six weeks from the date of placement of the advertisement.
(ii) Subject to modalities to be prescribed by the Federal Civil Service Commission from time to time, each Ministry/Extra-Ministerial Office shall select from the pool of successful`
      }
    ]
  }
] as const;
