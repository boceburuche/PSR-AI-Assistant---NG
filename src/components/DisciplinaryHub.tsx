import React, { useState } from 'react';
import { OfficerProfile, QueryRecord, GradeLevel } from '../types/psr';
import { INITIAL_QUERIES } from '../data/psrCorpus';
import { 
  ShieldAlert, 
  Clock, 
  FileText, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Copy, 
  Check, 
  Sparkles,
  ChevronDown,
  Building,
  UserX
} from 'lucide-react';

interface DisciplinaryHubProps {
  currentProfile: OfficerProfile;
  initialQueryContext?: string;
  onLogAudit: (action: string, details: string) => void;
}

export const DisciplinaryHub: React.FC<DisciplinaryHubProps> = ({
  currentProfile,
  initialQueryContext,
  onLogAudit,
}) => {
  const [activeTab, setActiveTab] = useState<'defense' | 'tracker' | 'issue' | 'interdiction'>('defense');
  const [queries, setQueries] = useState<QueryRecord[]>(INITIAL_QUERIES);

  // Defense Generator State
  const [queryRef, setQueryRef] = useState('FMF/HRM/DISC/2026/089');
  const [allegationTitle, setAllegationTitle] = useState('Alleged Absence from Duty on 2nd October 2026');
  const [ruleViolated, setRuleViolated] = useState('Rule 030301(d) - Unauthorized Absence');
  const [officerExplanation, setOfficerExplanation] = useState(
    'I was on approved official duty delivering confidential documents to the Accountant-General Treasury House under emergency instructions from my Division Head.'
  );
  const [isGeneratingDefense, setIsGeneratingDefense] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState('');
  const [copiedDraft, setCopiedDraft] = useState(false);

  // Issue Query State (GL 15+ / Directorate)
  const isAuthorizedToIssue = ['directorate', 'fcsc_admin'].includes(currentProfile.role) || 
    ['GL 15', 'GL 16', 'GL 17', 'Perm Sec', 'FCSC Admin'].includes(currentProfile.gradeLevel);

  const [newTargetName, setNewTargetName] = useState('');
  const [newTargetStaffNo, setNewTargetStaffNo] = useState('');
  const [newTargetGrade, setNewTargetGrade] = useState<GradeLevel>('GL 08');
  const [newAllegation, setNewAllegation] = useState('');
  const [newRule, setNewRule] = useState('Rule 030301(a) - Habitual lateness to work');
  const [newDetails, setNewDetails] = useState('');
  const [issuedSuccess, setIssuedSuccess] = useState(false);

  const handleGenerateDefense = async () => {
    setIsGeneratingDefense(true);
    onLogAudit('Query Defense Generation', `Drafting exculpation for query ref: ${queryRef}`);

    try {
      const res = await fetch('/api/psr/draft-query-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          queryRef,
          allegationTitle,
          ruleViolated,
          officerExplanation,
          officerProfile: currentProfile,
        })
      });

      if (!res.ok) throw new Error('Failed to generate draft');
      const data = await res.json();
      setGeneratedDraft(data.draft);
    } catch (err) {
      console.error(err);
      setGeneratedDraft(`Through: The Head of Department (Administration)
To: The Permanent Secretary, ${currentProfile.mda}

Sir,

RE: EXPLANATION IN RESPECT OF QUERY REF: ${queryRef}
DATED: ${new Date().toLocaleDateString('en-GB')}

In accordance with the constitutional principles of fair hearing and Public Service Rule 030304, I have the honour to respectfully submit my written exculpation regarding the allegation under ${ruleViolated}.

1. I state categorically that I have always performed my statutory duties with loyalty, diligence, and obedience to lawful instructions.
2. In respect of the specific allegation: ${officerExplanation}
3. The circumstances were communicated verbally to my supervisor and there was neither intent to act in dereliction of duty nor willful misconduct.

In view of the above explanation and documentary attachments, I humbly pray that this representation be found acceptable and that the query be graciously discharged.

I have the honour to be,
Sir,
Your obedient servant,

_______________________
${currentProfile.name}
Staff No: ${currentProfile.staffNumber}
${currentProfile.gradeLevel} • ${currentProfile.cadre}`);
    } finally {
      setIsGeneratingDefense(false);
    }
  };

  const handleIssueQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthorizedToIssue) return;

    const newQ: QueryRecord = {
      id: 'qry-' + Date.now(),
      refNumber: `${currentProfile.mda.slice(0, 3).toUpperCase()}/HRM/QUERY/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
      targetOfficerName: newTargetName,
      targetStaffNo: newTargetStaffNo,
      targetGrade: newTargetGrade,
      allegationTitle: newAllegation,
      violatedRule: newRule,
      issuedDate: new Date().toISOString(),
      deadlineHours: 48,
      status: 'Pending Reply',
      issuedByOfficer: `${currentProfile.name} (${currentProfile.gradeLevel})`,
      issuedByMDA: currentProfile.mda,
      queryBody: newDetails,
    };

    setQueries(prev => [newQ, ...prev]);
    setIssuedSuccess(true);
    onLogAudit('Formal Query Issued', `Query ref: ${newQ.refNumber} issued to ${newTargetName} (${newTargetGrade}) by ${currentProfile.name}`);
    setTimeout(() => {
      setIssuedSuccess(false);
      setActiveTab('tracker');
    }, 1500);
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-[11px] font-bold bg-rose-100 text-rose-800 rounded-full border border-rose-200 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                Chapter 3: Discipline & Queries
              </span>
              <span className="text-xs font-semibold text-slate-500">PSR Rules 030101 - 030440</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Civil Service Disciplinary & Query Process Hub
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Statutory 48-hour query replies, formal query issuance, interdiction safeguards, and appeals.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('defense')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'defense' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Draft Query Reply
            </button>
            <button
              onClick={() => setActiveTab('tracker')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'tracker' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Query Tracker ({queries.length})
            </button>
            <button
              onClick={() => setActiveTab('issue')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                activeTab === 'issue' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {!isAuthorizedToIssue && <Lock className="w-3 h-3 text-slate-400" />}
              <span>Issue Query</span>
            </button>
            <button
              onClick={() => setActiveTab('interdiction')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'interdiction' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Interdiction Rules
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: DEFENSE GENERATOR */}
      {activeTab === 'defense' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>Statutory Exculpatory Letter Generator</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Draft a legally grounded query response compliant with <strong>Rule 030304</strong> to prevent admission of guilt.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Query Reference Number</label>
                <input
                  type="text"
                  value={queryRef}
                  onChange={(e) => setQueryRef(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="e.g. FMF/HRM/DISC/2026/089"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Allegation Stated in Query</label>
                <input
                  type="text"
                  value={allegationTitle}
                  onChange={(e) => setAllegationTitle(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Rule Cited in Query</label>
                <select
                  value={ruleViolated}
                  onChange={(e) => setRuleViolated(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Rule 030301(d) - Unauthorized Absence">Rule 030301(d) - Unauthorized Absence from duty</option>
                  <option value="Rule 030301(a) - Habitual Lateness">Rule 030301(a) - Habitual lateness to work</option>
                  <option value="Rule 030301(g) - Insubordination">Rule 030301(g) - Insubordination to superior</option>
                  <option value="Rule 030301(b) - Delay in Official Files">Rule 030301(b) - Deliberate delay in treating files</option>
                  <option value="Rule 030402(e) - Disclosure of Secrets">Rule 030402(e) - Unauthorized disclosure of official memos</option>
                  <option value="Rule 030402(h) - Private Business">Rule 030402(h) - Engaging in private business/trade</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Your Mitigating Facts & Evidence
                </label>
                <textarea
                  rows={4}
                  value={officerExplanation}
                  onChange={(e) => setOfficerExplanation(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
                  placeholder="Explain why the infraction occurred, any approvals given, or medical/operational emergencies..."
                />
              </div>

              {/* 48-Hour Warning Banner */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Rule 030304 Reminder:</span> Response must reach the issuing authority within <strong>48 hours</strong> of receipt to avoid automatic admission of allegations.
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerateDefense}
                disabled={isGeneratingDefense}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-xs"
              >
                {isGeneratingDefense ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Synthesizing Legal Defense...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate Exculpatory Letter</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Letter Output */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Formal Civil Service Exculpatory Representation
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Drafted under Federal Civil Service Commission format conventions
                  </p>
                </div>
                {generatedDraft && (
                  <button
                    onClick={() => copyText(generatedDraft)}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg transition"
                  >
                    {copiedDraft ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Letter</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {generatedDraft ? (
                <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 font-serif text-xs leading-relaxed text-slate-800 whitespace-pre-wrap max-h-[460px] overflow-y-auto">
                  {generatedDraft}
                </div>
              ) : (
                <div className="py-16 text-center text-slate-400 space-y-2">
                  <FileText className="w-10 h-10 mx-auto text-slate-300" />
                  <p className="text-xs font-medium">Click "Generate Exculpatory Letter" to draft response</p>
                  <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                    The assistant will apply PSR 2021 standards, respectful tone, mitigating facts, and constitutional protections.
                  </p>
                </div>
              )}
            </div>

            {generatedDraft && (
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Verified Officer: {currentProfile.name} ({currentProfile.staffNumber})</span>
                <span className="text-emerald-800 font-semibold">Form Gen 16 Compliant</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: QUERY TRACKER */}
      {activeTab === 'tracker' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {queries.map((q) => (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-slate-600">
                      {q.refNumber}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                      {q.allegationTitle}
                    </h4>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    q.status === 'Pending Reply' ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {q.status}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
                  <span className="font-semibold block text-slate-900 mb-1">Query Particulars:</span>
                  {q.queryBody}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
                  <div>
                    <span className="text-slate-400 block">Target Officer:</span>
                    <span className="font-semibold text-slate-800">{q.targetOfficerName} ({q.targetGrade})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Issuing Authority:</span>
                    <span className="font-semibold text-slate-800">{q.issuedByOfficer}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Violated Rule:</span>
                    <span className="font-semibold text-rose-700">{q.violatedRule}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Deadline Window:</span>
                    <span className="font-semibold text-amber-700">{q.deadlineHours} Hours (Rule 030304)</span>
                  </div>
                </div>

                {q.replyBody && (
                  <div className="mt-2 p-2.5 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs text-emerald-950">
                    <span className="font-bold block text-emerald-900 mb-0.5">Submitted Reply:</span>
                    <p className="line-clamp-2">{q.replyBody}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ISSUE QUERY (RBAC GUARDED) */}
      {activeTab === 'issue' && (
        <div>
          {!isAuthorizedToIssue ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-lg mx-auto shadow-2xs space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Access Control: Disciplinary Authority Restricted
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Under <strong>PSR Rule 030101</strong> and <strong>Rule 030302</strong>, formal queries (Form Gen 16) must be issued by authorized supervisory authorities — specifically <strong>Permanent Secretaries, Directors (GL 17), Heads of Extra-Ministerial Departments, or Human Resource Directors (GL 15+)</strong>.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                Your current active role is: <strong>{currentProfile.name} ({currentProfile.gradeLevel})</strong>.
                To test the Query Issuing workflow, switch your profile to <strong>Dr. Folashade Mustapha-Aliyu (GL 17 Director)</strong> in the top header.
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs max-w-2xl mx-auto space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <ShieldAlert className="w-5 h-5 text-emerald-800" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Issue Formal Disciplinary Query (Form Gen 16)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Authorized Issuing Officer: {currentProfile.name} ({currentProfile.gradeLevel}, {currentProfile.cadre})
                  </p>
                </div>
              </div>

              {issuedSuccess && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Query generated and registered successfully in the service tracker!</span>
                </div>
              )}

              <form onSubmit={handleIssueQuery} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Target Officer Full Name</label>
                    <input
                      type="text"
                      required
                      value={newTargetName}
                      onChange={(e) => setNewTargetName(e.target.value)}
                      placeholder="e.g. Samuel Obinna Eze"
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Target Officer Staff Number</label>
                    <input
                      type="text"
                      required
                      value={newTargetStaffNo}
                      onChange={(e) => setNewTargetStaffNo(e.target.value)}
                      placeholder="e.g. FGN/ADM/55021"
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Target Officer Grade Level</label>
                    <select
                      value={newTargetGrade}
                      onChange={(e) => setNewTargetGrade(e.target.value as GradeLevel)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="GL 04">GL 04 (Junior)</option>
                      <option value="GL 06">GL 06 (Executive Officer)</option>
                      <option value="GL 08">GL 08 (Administrative Officer II)</option>
                      <option value="GL 10">GL 10 (Senior Officer)</option>
                      <option value="GL 12">GL 12 (Principal Officer)</option>
                      <option value="GL 14">GL 14 (Assistant Director)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Specific Rule Alleged Violated</label>
                    <select
                      value={newRule}
                      onChange={(e) => setNewRule(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="Rule 030301(a) - Habitual lateness to work">Rule 030301(a) - Habitual lateness to work</option>
                      <option value="Rule 030301(b) - Deliberate delay in treating files">Rule 030301(b) - Deliberate delay in treating official files</option>
                      <option value="Rule 030301(d) - Unauthorized absence from duty">Rule 030301(d) - Unauthorized absence from duty</option>
                      <option value="Rule 030301(g) - Insubordination">Rule 030301(g) - Insubordination to superior officers</option>
                      <option value="Rule 030402(e) - Leaking classified documents">Rule 030402(e) - Leaking classified memos on social media</option>
                      <option value="Rule 030402(h) - Private commercial business">Rule 030402(h) - Private commercial trading while serving</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Allegation Heading</label>
                  <input
                    type="text"
                    required
                    value={newAllegation}
                    onChange={(e) => setNewAllegation(e.target.value)}
                    placeholder="e.g. Abandonment of Duty Post on 8th October 2026"
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Detailed Particulars of Infraction</label>
                  <textarea
                    rows={4}
                    required
                    value={newDetails}
                    onChange={(e) => setNewDetails(e.target.value)}
                    placeholder="State the date, time, location, affected files, and instructions disobeyed..."
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-xl transition shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Issue Formal Query (48h Notice)</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: INTERDICTION & SUSPENSION SAFEGUARDS */}
      {activeTab === 'interdiction' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Interdiction & Suspension Statutory Framework (Rules 030403 - 030406)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Legal differences, salary rights, surrender of assets, and exoneration procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Interdiction Card */}
            <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 text-sm">Interdiction (Rule 030404)</span>
                <span className="px-2 py-0.5 bg-amber-200 text-amber-900 font-bold rounded">50% Salary Paid</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Applied when serious allegations of misconduct or criminal proceedings are instituted against an officer, to safeguard public records and prevent interference with witnesses.
              </p>
              <ul className="space-y-1.5 text-slate-700">
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-700 font-bold">✔</span>
                  <span>Officer receives exactly <strong>50% of monthly consolidated salary</strong> and allowances.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-700 font-bold">✔</span>
                  <span>Must immediately surrender official ID card, files, keys, and government vehicles.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-700 font-bold">✔</span>
                  <span>Cannot leave the duty station or travel abroad without written approval of the Permanent Secretary.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-700 font-bold">✔</span>
                  <span><strong>Full Refund:</strong> If completely exonerated, the officer is restored to duty and all withheld 50% salaries are refunded.</span>
                </li>
              </ul>
            </div>

            {/* Suspension Card */}
            <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-900 text-sm">Suspension (Rule 030406)</span>
                <span className="px-2 py-0.5 bg-rose-200 text-rose-900 font-bold rounded">Zero (0%) Salary</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Applied where a prima facie case of serious misconduct or a grave financial crime has been established, or the officer is remanded in prison custody.
              </p>
              <ul className="space-y-1.5 text-slate-700">
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-700 font-bold">✖</span>
                  <span>Complete cessation of all salaries and allowances during the period.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-700 font-bold">✖</span>
                  <span>Total withdrawal from official premises and functions.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-700 font-bold">✖</span>
                  <span>Must be determined within 3 to 6 months by the Senior Staff Committee (SSC) or FCSC.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
