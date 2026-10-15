import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { RAGEngine } from './src/services/ragEngine.ts';
import { PSR_RULES_DATABASE, PSR_CHAPTERS, PSR_FOREWORD, PSR_PREAMBLE } from './src/data/psrCorpus.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared server-side Gemini client with User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// GET /api/psr/rules - Return rules metadata, Foreword, and Preamble
app.get('/api/psr/rules', (req, res) => {
  res.json({
    foreword: PSR_FOREWORD,
    preamble: PSR_PREAMBLE,
    chapters: PSR_CHAPTERS,
    totalRules: PSR_RULES_DATABASE.length,
    rules: PSR_RULES_DATABASE.map(r => ({
      ruleNumber: r.ruleNumber,
      chapter: r.chapter,
      chapterTitle: r.chapterTitle,
      title: r.title,
      summary: r.summary,
      tags: r.tags,
      applicableGrades: r.applicableGrades
    }))
  });
});

// POST /api/psr/rag-chat - RAG-augmented civil service advisory
app.post('/api/psr/rag-chat', async (req, res) => {
  try {
    const { message, officerProfile, conversationHistory } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // 1. Retrieve most relevant PSR 2021 statutory rules using hybrid RAG engine
    const retrieved = RAGEngine.retrieveRules(message, 5);
    const ragContext = RAGEngine.buildRAGContext(retrieved);

    const officerContext = officerProfile ? `
OFFICER SUBMITTING QUERY:
Name: ${officerProfile.name || 'Public Service Officer'}
Cadre: ${officerProfile.cadre || 'General Duty'}
Grade Level: ${officerProfile.gradeLevel || 'GL 10'}
MDA: ${officerProfile.mda || 'Federal Public Service'}
Security Clearance: ${officerProfile.securityClearance || 'Confidential'}
Role: ${officerProfile.role || 'Senior Officer'}
` : 'Officer: Federal Civil Servant (General Duty)';

    const systemInstruction = `You are the Central Public Service Rules (PSR) AI Assistant for the Federal Republic of Nigeria Public Service.
Your source document is the Revised Public Service Rules (PSR 2021 Edition), approved by the Federal Government and published by the Office of the Head of the Civil Service of the Federation (OHCSF) and Office of the Accountant-General of the Federation (OAGF).

Strict Guidelines:
1. Always ground your interpretations in the exact retrieved PSR 2021 statutory provisions provided below.
2. Quote exact Rule Numbers (e.g. "[PSR Rule 030402]", "[PSR Rule 060207]", "[PSR Rule 080201]").
3. Maintain authoritative, objective, professional civil service decorum.
4. Clearly distinguish between "General Inefficiency", "Misconduct", and "Serious Misconduct".
5. Highlight statutory deadlines (e.g., 48 hours for query replies under Rule 030304, 30 days for petitions under Rule 090102).
6. Note any access control or Grade Level constraints applicable to the requesting officer.
7. If the user asks for a memo, query response, or formal letter, draft it in pristine Nigerian civil service format (e.g. "RE: QUERY ON ALLEGED...", "THROUGH PROPER CHANNELS", "Sir/Madam", "I have the honour to be, Sir, Your obedient servant / Respectfully submitted").

${officerContext}

AUTHORITATIVE PSR 2021 STATUTORY RULES RETRIEVED VIA RAG:
${ragContext}
`;

    // Attempt Gemini call with gemini-3.8-flash
    let aiResponseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemInstruction}\n\nUser Question:\n${message}` }],
          },
        ],
      });
      aiResponseText = response.text || '';
    } catch (genError) {
      console.warn('Gemini generateContent error, falling back to local RAG synthesis:', genError);
      aiResponseText = RAGEngine.generateOfflineResponse(message, retrieved, officerProfile?.cadre);
    }

    // Extract citations
    const citedRules = retrieved.map(r => r.rule);

    res.json({
      text: aiResponseText,
      sources: citedRules,
      confidence: 'Statutory Authority',
      retrievalMatches: retrieved.map(r => ({
        ruleNumber: r.rule.ruleNumber,
        title: r.rule.title,
        score: r.score,
        reason: r.relevanceReason
      })),
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error in /api/psr/rag-chat:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// POST /api/psr/draft-query-reply - Draft official exculpatory letter
app.post('/api/psr/draft-query-reply', async (req, res) => {
  try {
    const { queryRef, allegationTitle, officerExplanation, officerProfile, ruleViolated } = req.body;

    const retrieved = RAGEngine.retrieveRules(`query reply defense ${ruleViolated || '030302'} ${allegationTitle || ''}`, 3);
    const ragContext = RAGEngine.buildRAGContext(retrieved);

    const prompt = `Draft a formal Nigerian Civil Service Query Reply (Exculpatory Representation) strictly conforming to PSR 2021 Rules 030302 and 030304.
The letter must be respectful, precise, legally sound, and follow official civil service memo conventions.

Details:
Query Reference: ${queryRef || 'FGN/MDA/DISC/2026/01'}
Allegation: ${allegationTitle || 'Alleged Infraction'}
Rule Cited in Query: ${ruleViolated || 'Rule 030301'}
Officer Name: ${officerProfile?.name || 'Officer Name'}
Staff Number: ${officerProfile?.staffNumber || 'FGN/STAFF/001'}
Grade Level: ${officerProfile?.gradeLevel || 'GL 10'}
MDA: ${officerProfile?.mda || 'Federal Ministry'}
Officer's Account / Mitigating Facts:
${officerExplanation || 'I was on official assignment with verbal approval of my supervisor.'}

Relevant PSR Rules:
${ragContext}

Generate the full formal exculpatory letter ready for submission.`;

    let replyDraft = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });
      replyDraft = response.text || '';
    } catch (err) {
      replyDraft = `Through: The Head of Department (Administration)
To: The Permanent Secretary, ${officerProfile?.mda || 'Federal Ministry'}

Sir,

RE: EXPLANATION IN RESPECT OF QUERY REF: ${queryRef || 'FGN/MDA/DISC/2026/01'}
DATED ${new Date().toLocaleDateString('en-GB')}

I respectfully refer to the query dated ${new Date().toLocaleDateString('en-GB')} regarding the alleged infraction under ${ruleViolated || 'PSR Rule 030301'}.

In accordance with the constitutional right to fair hearing and the provisions of Public Service Rule 030304, I have the honour to humbly submit my exculpation as follows:

1. That I have always maintained the highest commitment to public service decorum and administrative discipline.
2. Concerning the incident in question: ${officerExplanation || 'The circumstances arose from urgent operational necessities communicated to my superior officer.'}
3. I submit that there was no willful disobedience, negligence, or intention to violate civil service regulations.

In view of the foregoing mitigating circumstances and supporting documentary proof attached hereto, I humbly pray that this explanation be found satisfactory and that I be fully exculpated of the allegation.

I have the honour to be,
Sir,
Your obedient servant,

_______________________
${officerProfile?.name || 'Officer Name'}
Staff No: ${officerProfile?.staffNumber || 'FGN/STAFF/001'}
Grade Level: ${officerProfile?.gradeLevel || 'GL 10'}
${officerProfile?.mda || 'Federal Public Service'}`;
    }

    res.json({
      draft: replyDraft,
      retrievedRules: retrieved.map(r => r.rule.ruleNumber)
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/psr/calculate-entitlements - Statutory benefits & retirement calculator
app.post('/api/psr/calculate-entitlements', (req, res) => {
  try {
    const { birthDate, entryDate, gradeLevel, daysOfDuty } = req.body;

    // Compulsory Retirement calculation (Rule 080201)
    let retirementByAge = '';
    let retirementByService = '';
    let compulsoryRetirementDate = '';
    let bindingCriteria = '';

    if (birthDate) {
      const bDate = new Date(birthDate);
      const sixtyYears = new Date(bDate.getFullYear() + 60, bDate.getMonth(), bDate.getDate());
      retirementByAge = sixtyYears.toISOString().split('T')[0];
    }

    if (entryDate) {
      const eDate = new Date(entryDate);
      const thirtyFiveYears = new Date(eDate.getFullYear() + 35, eDate.getMonth(), eDate.getDate());
      retirementByService = thirtyFiveYears.toISOString().split('T')[0];
    }

    if (retirementByAge && retirementByService) {
      if (new Date(retirementByAge) <= new Date(retirementByService)) {
        compulsoryRetirementDate = retirementByAge;
        bindingCriteria = 'Attainment of 60 Years of Age (Rule 080201)';
      } else {
        compulsoryRetirementDate = retirementByService;
        bindingCriteria = 'Completion of 35 Years in Pensionable Service (Rule 080201)';
      }
    } else {
      compulsoryRetirementDate = retirementByAge || retirementByService || 'Requires dates';
    }

    // Leave entitlement (Rule 060201)
    let annualLeaveDays = 30;
    if (gradeLevel && ['GL 01', 'GL 02', 'GL 03', 'GL 04', 'GL 05', 'GL 06'].includes(gradeLevel)) {
      annualLeaveDays = 14;
    }

    // DTA calculation (Rule 040201)
    let dailyRate = 20000;
    if (['GL 01', 'GL 02', 'GL 03', 'GL 04'].includes(gradeLevel)) dailyRate = 10000;
    else if (['GL 05', 'GL 06'].includes(gradeLevel)) dailyRate = 15000;
    else if (['GL 07', 'GL 08', 'GL 09', 'GL 10'].includes(gradeLevel)) dailyRate = 17500;
    else if (['GL 12', 'GL 13', 'GL 14'].includes(gradeLevel)) dailyRate = 20000;
    else if (['GL 15', 'GL 16', 'GL 17'].includes(gradeLevel)) dailyRate = 25000;
    else if (['Perm Sec', 'FCSC Admin'].includes(gradeLevel)) dailyRate = 35000;

    const totalDTA = (Number(daysOfDuty) || 1) * dailyRate;

    res.json({
      retirement: {
        retirementByAge,
        retirementByService,
        compulsoryRetirementDate,
        bindingCriteria,
        preRetirementLeaveDate: compulsoryRetirementDate !== 'Requires dates' 
          ? new Date(new Date(compulsoryRetirementDate).setMonth(new Date(compulsoryRetirementDate).getMonth() - 3)).toISOString().split('T')[0]
          : null,
        statutoryCitation: 'PSR Rule 080201 & Rule 060301'
      },
      leave: {
        annualLeaveDays,
        casualLeaveCapDays: 7,
        maternityLeaveWeeks: 16,
        paternityLeaveWorkingDays: 14,
        statutoryCitation: 'PSR Rules 060201, 060204, 060206, 060207'
      },
      allowances: {
        gradeLevel,
        days: Number(daysOfDuty) || 1,
        dailyRateNGN: dailyRate,
        totalDtaNGN: totalDTA,
        statutoryCitation: 'PSR Rule 040201 (Revised Federal Circular Rates)'
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Vite middleware or static serving
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Nigeria PSR AI Assistant Server running at http://0.0.0.0:${PORT}`);
});
