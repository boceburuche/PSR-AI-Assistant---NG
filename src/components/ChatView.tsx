import React, { useState, useRef, useEffect } from 'react';
import { PSR2021_VERIFIED_PAGES } from '../data/psr2021VerifiedPages';
import { PSR2021_CH1_PAGES_3_4 } from '../data/psr2021Chapter1Pages3to4';
import { PSR2021_CHAPTER_2_PAGES } from '../data/psr2021Chapter2Pages';
import { PSR2021_CH2_PAGE10 } from '../data/psr2021Chapter2Page10';
import { PSR2021_CH2_PAGE11 } from '../data/psr2021Chapter2Page11';
import { OfficerProfile, AIChatMessage, PSRRule } from '../types/psr';
import { 
  Send, 
  Sparkles, 
  BookOpen, 
  ShieldAlert, 
  FileText, 
  Copy, 
  Check, 
  Volume2, 
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Info,
  Scale,
  Printer
} from 'lucide-react';

interface ChatViewProps {
  currentProfile: OfficerProfile;
  onOpenRuleDetail: (rule: PSRRule) => void;
  onDraftQueryReply: (contextText: string) => void;
  onLogAudit: (action: string, details: string) => void;
}

// Static GitHub Pages cannot execute the Express /api/psr/rag-chat endpoint.
// Answer from submitted PSR 2021 passages locally before attempting that API.
const locallyReviewedRules = [
  ...PSR2021_VERIFIED_PAGES.flatMap(page => page.rules.map(rule => ({
    ...rule,
    text: rule.ruleNumber === '010105' ? rule.text + '\\n\\n' + PSR2021_CH1_PAGES_3_4[0].excerpt : rule.text
  }))),
  ...PSR2021_CH2_PAGE10,
  ...PSR2021_CH2_PAGE11,
  ...PSR2021_CHAPTER_2_PAGES.flatMap(page => page.rules).filter(rule => rule.ruleNumber !== '020410')
    .filter(rule => !(rule.ruleNumber === '020204' && rule.text.startsWith('(a) [Continued')))
    .map(rule => rule.ruleNumber === '020204' ? ({
      ...rule,
      topic: 'Trainee/Pupil',
      complete: true,
      text: rule.text + '\n\n' + (PSR2021_CHAPTER_2_PAGES.flatMap(page => page.rules).find(r => r.ruleNumber === '020204' && r.text.startsWith('(a) [Continued'))?.text ?? '')
    }) : rule),
  ...PSR2021_CH1_PAGES_3_4.slice(1).map(rule => ({
    ruleNumber: rule.ruleNumber, topic: rule.topic, text: rule.excerpt
  }))
];
function getLocalPSRAnswer(query: string): string | null {
  const q = query.toLowerCase();
  const explicit = q.match(/\b0[1-9]\d{4}\b/g) || [];
  let selected = locallyReviewedRules.filter(r => explicit.includes(r.ruleNumber));
  if (selected.length === 0 && /chapter\s*(1|one)\b|introduction/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber.startsWith('01'));
  if (selected.length === 0 && /chapter\s*(2|two)\b|appointments and leaving/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber.startsWith('02'));
  if (selected.length === 0 && /transfer.*senior|transfer.*post|minimum.*transfer/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020307');
  if (selected.length === 0 && /short.term appointment|sabbatical|talent sourcing|career exchange|volunteerism/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020401');
  if (selected.length === 0 && /contract appointment.*mean|what is.*contract appointment|contract appointment.*pension/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020402');
  if (selected.length === 0 && /conditions.*contract|contract.*allowance|contract.*citizenship|spouse.*nigerian/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020404');
  if (selected.length === 0 && /process.*contract|procedure.*contract|duration.*contract|renew.*contract|contract.*four years|contract.*sgl/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020405');
  if (selected.length === 0 && /conduct.*contract|contract.*mentor|contract.*performance appraisal/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020406');
  if (selected.length === 0 && /types of contract|eligible.*contract|contract.*pensioner|contract.*expatriate/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020403');
  if (selected.length === 0 && /probation.*period|period of probation|two years.*confirm|extension.*probation/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020301');
  if (selected.length === 0 && /compulsory exam|confirmation exam|probation.*exam|promotion\/confirmation examination/.test(q)) selected = locallyReviewedRules.filter(r => ['020302','020306'].includes(r.ruleNumber));
  if (selected.length === 0 && /confirmation.*appointment|confirm.*probation|termination.*probation/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020303');
  if (selected.length === 0 && /progress report.*confirm|confirmation.*senior post/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020304');
  if (selected.length === 0 && /junior staff committee|senior staff committee|membership.*jsc|membership.*ssc/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020305');
  if (selected.length === 0 && /trainee.*pupil|training grade|trainee period/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020204');
  if (selected.length === 0 && /probation|first appointment.*pension/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020205');
  if (selected.length === 0 && /eligib.*appoint|age.*appoint|minimum age|maximum age|medical.*fit|recruitment waiver/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020206');
  if (selected.length === 0 && /prior approval|criminal offence.*appoint/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020207');
  if (selected.length === 0 && /fc\.2|gen\. 69c|procedure for appointment/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020208');
  if (selected.length === 0 && /personal particulars|staff records form/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020209');
  if (selected.length === 0 && /oath of secrecy|freedom of information act/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020210');
  if (selected.length === 0 && /secret societ|secret society/.test(q)) selected = locallyReviewedRules.filter(r => ['020211','020212'].includes(r.ruleNumber));
  if (selected.length === 0 && /re.engage|reengage|non.re.engagement|continuity of contract/.test(q)) selected = locallyReviewedRules.filter(r => ['020408','020409','020410','020411'].includes(r.ruleNumber));
  if (selected.length === 0 && /retired officer.*contract|remuneration.*contract/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020412');
  if (selected.length === 0 && /sabbatical/.test(q)) selected = locallyReviewedRules.filter(r => ['020413','020414'].includes(r.ruleNumber));
  if (selected.length === 0 && /internship|volunteerism|interns and volunteers/.test(q)) selected = locallyReviewedRules.filter(r => ['020415','020416','020417'].includes(r.ruleNumber));
  if (selected.length === 0 && /tenure.*intern|duration.*intern|how long.*volunteer|duration.*volunteer/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020418');
  if (selected.length === 0 && /stipend.*volunteer|remuneration.*volunteer|pay.*volunteer/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020419');
  if (selected.length === 0 && /qualif.*intern|qualif.*volunteer|who can.*volunteer/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020420');
  if (selected.length === 0 && /legal framework.*short.term|contract.*negotiation|short.term.*engagement/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020421');
  if (selected.length === 0 && /unpaid staff|unpaid employment/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020106');
  if (selected.length === 0 && /personnel record|personal record|gen 60|date of birth.*chang/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020107');
  if (selected.length === 0 && /recruitment.*mean|definition of recruitment/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020201');
  if (selected.length === 0 && /types of appointment|categories of appointment|disabilit|presidential merit award/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020202');
  if (selected.length === 0 && /difficult to fill|advertis.*post/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '020203');
  if (selected.length === 0 && /circular|amend.*psr/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '010106');
  if (selected.length === 0 && /gender|female|male.*officer/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '010107');
  if (selected.length === 0 && /inventory|copy of.*psr/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '010108');
  if (selected.length === 0 && /special definition/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '010104');
  if (selected.length === 0 && /general definition|interdiction|junior officer|cut.off mark|classified correspondence|expatriate officer|established post|gazette|accredited representative|civil service of the federation|suspension|trainee|junior posts|senior posts|pass mark|permanent secretary|spouse|nigerian officer|monthly.rated|home place|schemes of service/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '010105');
  if (selected.length === 0 && /responsibilit|duty of (an? )?officer|acquaint|familiaris|familiariz/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '010103');
  if (selected.length === 0 && /constitution|constitutional|conformity/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '010102');
  if (selected.length === 0 && /appl(y|ication|ies)|who.*psr|scope of.*rules/.test(q)) selected = locallyReviewedRules.filter(r => r.ruleNumber === '010101');
  if (selected.length === 0) return null;
  return selected.map(r => `PSR 2021 — Rule ${r.ruleNumber}: ${r.topic}\n\n${r.text}\n\nSource: Revised Public Service Rules 2021, Chapter ${r.ruleNumber.startsWith('02') ? '2' : '1'}, user-submitted transcription (awaiting independent PDF verification).${'complete' in r && !r.complete ? ' This rule is incomplete; the next page is required.' : ''}`).join('\n\n──────────\n\n');
}

const PRESET_PROMPTS = [
  'What does Rule 010101 state about the duty of officers to acquaint themselves with the PSR?',
  'What are the official definitions of Interdiction and Suspension under Rule 010103?',
  'How does Rule 010105 guarantee gender equality for female public servants?',
  'Show the Table of Contents for all 16 Chapters of the Public Service Rules.',
  'What are the core ethical pillars in the Presidential Foreword to the Public Service Rules?',
  'Explain the 6-digit rule numbering formula (CCSSRR) and 5-year review cycle in the Preamble.',
  'What is the statutory deadline to reply a formal query, and what happens if I fail to respond?',
  'Explain the 14 working days Paternity Leave provision introduced in PSR 2021.',
  'Look up Master Index topics and rule numbers for Appointments and Allowances.',
  'Can a serving civil servant register a private limited liability company or trade?',
  'What is the 8-year tenure policy for Directors and 4-year term for Permanent Secretaries?',
  'What does PSR 2021 say about posting government memos on WhatsApp or social media?'
];

export const ChatView: React.FC<ChatViewProps> = ({
  currentProfile,
  onOpenRuleDetail,
  onDraftQueryReply,
  onLogAudit,
}) => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Good day, **${currentProfile.name}** (${currentProfile.gradeLevel}, ${currentProfile.cadre}). 

I am your **Central Public Service Rules (PSR) AI Assistant**, equipped with a Retrieval-Augmented Generation (RAG) engine grounded exclusively in the **Revised Public Service Rules (PSR 2021 Edition)**.

You may ask any questions regarding:
- **Disciplinary Queries, Interdiction & Grievance Procedures** (Chapter 3)
- **Leave Entitlements: Annual, Maternity & Paternity (14 Days)** (Chapter 6)
- **Promotion Maturity & PMS Scoring Matrices** (Chapter 2)
- **Duty Tour Allowance (DTA) & Salary Circulars** (Chapter 4)
- **Tenure Caps for Directors (8 Yrs) & Perm Secs** (Chapter 2)
- **Code of Conduct, Private Business Restrictions & Social Media Protocols** (Chapters 10 & 11)

How may I assist your administrative duties today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      confidence: 'Statutory Authority'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputPrompt.trim();
    if (!query || isLoading) return;

    const userMessage: AIChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputPrompt('');
    setIsLoading(true);

    onLogAudit('RAG Statutory Query', `Officer requested PSR guidance on: "${query.slice(0, 70)}..."`);

    try {
      const localAnswer = getLocalPSRAnswer(query);
      if (localAnswer) {
        setMessages(prev => [...prev, {
          id: 'asst-' + Date.now(),
          sender: 'assistant',
          text: localAnswer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          confidence: 'User-supplied PSR 2021 transcription'
        }]);
        return;
      }
      const response = await fetch('/api/psr/rag-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          officerProfile: currentProfile,
          conversationHistory: messages.slice(-4)
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: AIChatMessage = {
        id: 'asst-' + Date.now(),
        sender: 'assistant',
        text: data.text || 'Regulatory guidance retrieved.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources || [],
        confidence: data.confidence || 'Statutory Authority'
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Error fetching RAG advisory:', err);
      // Fallback
      setMessages(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'assistant',
          text: 'I could not retrieve a verified PSR 2021 provision for this question. The online AI service may be unavailable, and this topic is not yet covered by the locally indexed pages. Please ask about Rules 010101–010103 or continue adding verified pages.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Clean markdown tags for speaking
      const clean = text.replace(/[*#_`]/g, '');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-125px)] sm:h-[calc(100vh-115px)] max-w-5xl mx-auto px-2 sm:px-4">
      {/* Officer Context Ribbon */}
      <div className="bg-slate-100 border border-slate-200/80 rounded-xl p-2.5 mb-2.5 flex items-center justify-between text-xs text-slate-700 shrink-0">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-800 shrink-0" />
          <span className="font-semibold text-slate-900">Active RAG Grounding:</span>
          <span className="text-slate-600 truncate max-w-[220px] sm:max-w-md">
            Revised PSR 2021 (OAGF / OHCSF) • Cadre: {currentProfile.cadre} ({currentProfile.gradeLevel})
          </span>
        </div>
        <button
          onClick={handlePrint}
          className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-emerald-800 transition"
          title="Print official legal guidance sheet"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Advisory</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 sm:pr-2">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-4 sm:p-5 shadow-xs relative transition ${
                  isUser
                    ? 'bg-emerald-800 text-white rounded-br-xs'
                    : 'bg-white border border-slate-200/90 text-slate-900 rounded-bl-xs'
                }`}
              >
                {/* Assistant Title Badge */}
                {!isUser && (
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                        PSR
                      </div>
                      <span className="font-bold text-xs text-slate-900 tracking-tight">
                        Federal Civil Service Regulatory Interpretation
                      </span>
                    </div>
                    {msg.confidence && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {msg.confidence}
                      </span>
                    )}
                  </div>
                )}

                {/* Message Body Content */}
                <div className="text-xs sm:text-sm leading-relaxed space-y-2 whitespace-pre-wrap font-sans">
                  {msg.text}
                </div>

                {/* Statutory Citations Panel */}
                {!isUser && msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-2">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Retrieved PSR 2021 Statutory Citations ({msg.sources.length}):</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.sources.map((rule) => (
                        <div
                          key={rule.ruleNumber}
                          onClick={() => onOpenRuleDetail(rule)}
                          className="flex items-start justify-between p-2 rounded-lg bg-emerald-50/60 hover:bg-emerald-100/70 border border-emerald-200/80 cursor-pointer transition group"
                        >
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-bold text-emerald-900 group-hover:underline">
                                Rule {rule.ruleNumber}
                              </span>
                              <span className="text-[10px] text-emerald-700">
                                (Ch. {rule.chapter})
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-700 font-medium line-clamp-1">
                              {rule.title}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-emerald-700 shrink-0 group-hover:translate-x-0.5 transition" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Bar */}
                <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-slate-100/60">
                  <span className={`text-[10px] ${isUser ? 'text-emerald-200' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </span>

                  {!isUser && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSpeak(msg.text)}
                        className="p-1 text-slate-400 hover:text-emerald-800 transition"
                        title="Listen to regulatory advice"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => copyToClipboard(msg.text, msg.id)}
                        className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-emerald-800 transition px-1.5 py-0.5 rounded"
                        title="Copy official advice"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      {msg.text.toLowerCase().includes('query') && (
                        <button
                          onClick={() => onDraftQueryReply(msg.text)}
                          className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-2 py-0.5 rounded-md transition"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Draft Query Defense</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl max-w-sm shadow-xs animate-pulse">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sparkles className="w-4 h-4 animate-spin text-emerald-700" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Retrieving PSR 2021 Grounding...</p>
              <p className="text-[11px] text-slate-500">Searching statutory rules & circulars</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Preset Scenario Quick-Chips */}
      <div className="py-2 shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-[11px] font-bold text-slate-500 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Scenarios:
          </span>
          {PRESET_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 bg-white hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-lg text-slate-700 whitespace-nowrap text-[11px] transition shadow-2xs shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Bar */}
      <div className="bg-white border border-slate-300 rounded-2xl p-2 shadow-sm shrink-0 mb-1">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask anything on Nigeria Public Service Rules (e.g. Rule 030402, Paternity leave, DTA rates)..."
            className="flex-1 px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className="p-2.5 sm:px-4 sm:py-2 bg-emerald-800 hover:bg-emerald-900 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl transition flex items-center gap-1.5 font-semibold text-xs shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Ask PSR RAG</span>
          </button>
        </form>
      </div>
    </div>
  );
};
