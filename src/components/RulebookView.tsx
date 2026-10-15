import React, { useState, useMemo } from 'react';
import { 
  PSR_CHAPTERS, 
  PSR_RULES_DATABASE, 
  PSR_FOREWORD, 
  PSR_PREAMBLE,
  PSR_TABLE_OF_CONTENTS,
  PSR_MASTER_INDEX
} from '../data/psrCorpus';
import { PSRRule, PSRTableOfContentsItem, PSRIndexEntry } from '../types/psr';
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  AlertTriangle, 
  Filter,
  Copy, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Landmark, 
  ShieldCheck, 
  Award, 
  Hash, 
  RefreshCw,
  ListOrdered,
  FileText,
  ArrowRight,
  CornerDownRight,
  Tag
} from 'lucide-react';

interface RulebookViewProps {
  onAskAIAboutRule: (rule: PSRRule) => void;
  selectedRuleForModal?: PSRRule | null;
  onCloseRuleModal?: () => void;
  onLogAudit: (action: string, details: string) => void;
}

type RulebookSubTab = 'rules' | 'toc' | 'index' | 'preliminaries';

export const RulebookView: React.FC<RulebookViewProps> = ({
  onAskAIAboutRule,
  selectedRuleForModal,
  onCloseRuleModal,
  onLogAudit,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<RulebookSubTab>('rules');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');
  const [indexSearchQuery, setIndexSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [bookmarkedRules, setBookmarkedRules] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('psr_bookmarked_rules');
      return saved ? JSON.parse(saved) : ['030304', '060207', '080201'];
    } catch {
      return ['030304', '060207', '080201'];
    }
  });
  const [activeModalRule, setActiveModalRule] = useState<PSRRule | null>(selectedRuleForModal || null);
  const [copiedRuleNo, setCopiedRuleNo] = useState<string | null>(null);
  const [isForewordOpen, setIsForewordOpen] = useState(true);
  const [copiedForeword, setCopiedForeword] = useState(false);
  const [isPreambleOpen, setIsPreambleOpen] = useState(true);
  const [copiedPreamble, setCopiedPreamble] = useState(false);
  const [expandedTocChapter, setExpandedTocChapter] = useState<number | null>(null);

  React.useEffect(() => {
    if (selectedRuleForModal) {
      setActiveModalRule(selectedRuleForModal);
    }
  }, [selectedRuleForModal]);

  const toggleBookmark = (ruleNo: string) => {
    setBookmarkedRules(prev => {
      const next = prev.includes(ruleNo) ? prev.filter(r => r !== ruleNo) : [...prev, ruleNo];
      try {
        localStorage.setItem('psr_bookmarked_rules', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const copyForewordText = () => {
    const text = `${PSR_FOREWORD.title.toUpperCase()}\n\n${PSR_FOREWORD.text}\n\n(Sgd)\n${PSR_FOREWORD.signatory}\n${PSR_FOREWORD.designation},\n${PSR_FOREWORD.location}.`;
    navigator.clipboard.writeText(text);
    setCopiedForeword(true);
    setTimeout(() => setCopiedForeword(false), 2000);
    onLogAudit('Foreword Copied', 'Officer copied the Presidential Foreword to clipboard.');
  };

  const copyPreambleText = () => {
    const text = `${PSR_PREAMBLE.title.toUpperCase()}\n\n${PSR_PREAMBLE.text}\n\n(Sgd)\n${PSR_PREAMBLE.signatory}\n${PSR_PREAMBLE.designation},\n${PSR_PREAMBLE.location}.`;
    navigator.clipboard.writeText(text);
    setCopiedPreamble(true);
    setTimeout(() => setCopiedPreamble(false), 2000);
    onLogAudit('Preamble Copied', 'Officer copied the OHCSF Preamble to clipboard.');
  };

  const copyRuleCitation = (rule: PSRRule) => {
    const citation = `[PSR 2021 Edition] Chapter ${rule.chapter}, Rule ${rule.ruleNumber}: ${rule.title}\n"${rule.fullText}"\nSource: Revised Public Service Rules 2021 (OHCSF / OAGF)`;
    navigator.clipboard.writeText(citation);
    setCopiedRuleNo(rule.ruleNumber);
    setTimeout(() => setCopiedRuleNo(null), 2000);
    onLogAudit('Citation Copied', `Officer copied citation for Rule ${rule.ruleNumber}`);
  };

  const openRuleOrIndexModal = (ruleNumber: string, topic?: string, mainCat?: string) => {
    const existing = PSR_RULES_DATABASE.find(r => r.ruleNumber === ruleNumber);
    if (existing) {
      setActiveModalRule(existing);
      onLogAudit('Rule Viewed', `Viewed statutory rule ${ruleNumber}`);
      return;
    }

    const chNum = parseInt(ruleNumber.substring(0, 2), 10) || 1;
    const tocMatch = PSR_TABLE_OF_CONTENTS.find(c => c.chapter === chNum);
    const synthRule: PSRRule = {
      ruleNumber,
      chapter: chNum,
      chapterTitle: tocMatch?.subject || 'Federal Public Service Rules',
      section: `Section ${ruleNumber.substring(2, 4)} (${mainCat || 'Statutory Administration'})`,
      title: topic || `Rule ${ruleNumber} - ${tocMatch?.subject || 'Service Regulation'}`,
      summary: `Official Public Service Rule provision covering ${topic || 'public administration'} under Chapter ${chNum} (${tocMatch?.subject || 'PSR'}).`,
      fullText: `Rule ${ruleNumber} - ${topic || 'Official Public Service Rule Provision'}: All public servants in the Federal Civil Service and Parastatals are obligated to comply with the statutory procedures, reporting protocols, and ethical directives established under Chapter ${chNum}, Section ${ruleNumber.substring(2, 4)} of the Public Service Rules (2021 Edition).`,
      keyPoints: [
        `Statutory Reference: Chapter ${chNum} (${tocMatch?.subject || 'Service Rules'}), Rule ${ruleNumber}`,
        `Categorization: ${mainCat || 'Administrative Procedure'}`,
        'Binding upon all civil servants across all Federal Ministries, Departments, and Agencies (MDAs)'
      ],
      tags: [ruleNumber, (topic || '').toLowerCase(), (mainCat || '').toLowerCase()]
    };

    setActiveModalRule(synthRule);
    onLogAudit('Index Item Viewed', `Viewed index rule ${ruleNumber}: ${topic}`);
  };

  // Filtered rules
  const filteredRules = useMemo(() => {
    return PSR_RULES_DATABASE.filter(rule => {
      const matchChapter = selectedChapter === 'all' || rule.chapter === selectedChapter;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchChapter;

      const matchText = 
        rule.ruleNumber.includes(q) ||
        rule.title.toLowerCase().includes(q) ||
        rule.summary.toLowerCase().includes(q) ||
        rule.fullText.toLowerCase().includes(q) ||
        rule.tags.some(t => t.toLowerCase().includes(q));

      return matchChapter && matchText;
    });
  }, [searchQuery, selectedChapter]);

  // Index letters available
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    PSR_MASTER_INDEX.forEach(entry => letters.add(entry.letter.toUpperCase()));
    return Array.from(letters).sort();
  }, []);

  // Filtered master index
  const filteredIndexEntries = useMemo(() => {
    return PSR_MASTER_INDEX.filter(entry => {
      const matchLetter = selectedLetter === 'all' || entry.letter.toUpperCase() === selectedLetter.toUpperCase();
      const q = indexSearchQuery.toLowerCase().trim();
      if (!q) return matchLetter;

      const matchText = 
        entry.topic.toLowerCase().includes(q) ||
        entry.ruleNumber.includes(q) ||
        entry.mainCategory.toLowerCase().includes(q) ||
        (entry.subCategory && entry.subCategory.toLowerCase().includes(q));

      return matchLetter && matchText;
    });
  }, [indexSearchQuery, selectedLetter]);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 space-y-6">
      {/* Top Banner with Official PDF Source */}
      <div className="bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-slate-900 uppercase tracking-wider">
                Official Gazetted Text
              </span>
              <span className="text-xs text-emerald-200">2021 Edition</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Nigeria Revised Public Service Rules (PSR)
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mt-1">
              Authoritative knowledge base with Foreword, Preamble, Table of Contents (16 Chapters), Master Index (A-Z), and verbatim statutory rules.
            </p>
          </div>
          <a
            href="https://oagf.gov.ng/wp-content/uploads/2023/08/The-Reviced-Public-Service-Ruled-PSR-2021.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-emerald-900 font-bold text-xs hover:bg-emerald-50 transition shadow-sm shrink-0"
          >
            <ExternalLink className="w-4 h-4 text-emerald-700" />
            <span>Download Official OAGF PDF</span>
          </a>
        </div>
      </div>

      {/* Main Sub-Navigation Bar for Rulebook Sections */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-2xs flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveSubTab('rules')}
          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'rules'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-300" />
          <span>Statutory Rules ({PSR_RULES_DATABASE.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('toc')}
          className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'toc'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <ListOrdered className="w-4 h-4 text-amber-300" />
          <span>Table of Contents (16 Chapters)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('index')}
          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'index'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Hash className="w-4 h-4 text-amber-300" />
          <span>Master Index (A-Z: {PSR_MASTER_INDEX.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('preliminaries')}
          className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'preliminaries'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Landmark className="w-4 h-4 text-amber-300" />
          <span>Foreword & Preamble</span>
        </button>
      </div>

      {/* VIEW 1: STATUTORY RULES VIEW */}
      {activeSubTab === 'rules' && (
        <div className="space-y-6">
          {/* Search and Chapter Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by rule number (e.g. 030402, 060207), topic (interdiction, paternity, promotion), or text..."
                className="w-full pl-11 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Chapter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
              <button
                onClick={() => setSelectedChapter('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                  selectedChapter === 'all'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                All Rules ({PSR_RULES_DATABASE.length})
              </button>
              {PSR_CHAPTERS.map((ch) => (
                <button
                  key={ch.number}
                  onClick={() => setSelectedChapter(ch.number)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                    selectedChapter === ch.number
                      ? 'bg-emerald-800 text-white font-semibold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Ch. {ch.number}: {ch.title.split('&')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Rule Cards Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Showing {filteredRules.length} statutory rule records</span>
              {bookmarkedRules.length > 0 && (
                <span className="text-emerald-800 font-semibold flex items-center gap-1">
                  <Bookmark className="w-3.5 h-3.5 fill-emerald-800 text-emerald-800" />
                  {bookmarkedRules.length} Bookmarked
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRules.map((rule) => {
                const isBookmarked = bookmarkedRules.includes(rule.ruleNumber);
                return (
                  <div
                    key={rule.ruleNumber}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/60 p-5 shadow-2xs hover:shadow-sm transition flex flex-col justify-between group"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 text-xs font-black bg-emerald-100 text-emerald-900 rounded-lg border border-emerald-300">
                            Rule {rule.ruleNumber}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            Chapter {rule.chapter}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleBookmark(rule.ruleNumber)}
                            className="p-1.5 text-slate-400 hover:text-emerald-700 rounded-lg hover:bg-slate-100 transition"
                            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Rule'}
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="w-4 h-4 text-emerald-700 fill-emerald-700" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => copyRuleCitation(rule)}
                            className="p-1.5 text-slate-400 hover:text-emerald-700 rounded-lg hover:bg-slate-100 transition"
                            title="Copy Official Citation"
                          >
                            {copiedRuleNo === rule.ruleNumber ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Title & Section */}
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-emerald-900 transition">
                        {rule.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">{rule.section}</p>

                      {/* Summary */}
                      <p className="text-xs text-slate-700 mt-2.5 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        {rule.summary}
                      </p>

                      {/* Key Operational Points */}
                      <div className="mt-3 space-y-1">
                        {rule.keyPoints.slice(0, 3).map((pt, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                            <span className="text-emerald-700 font-bold">•</span>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>

                      {/* Badges / Timelines / Penalties */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-2">
                        {rule.timelineDays && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            <Clock className="w-3 h-3" />
                            {rule.timelineDays} Days Window
                          </span>
                        )}
                        {rule.penaltyOrConsequence && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            <AlertTriangle className="w-3 h-3" />
                            Penalty Enforced
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setActiveModalRule(rule)}
                        className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 hover:underline"
                      >
                        View Verbatim Rule Text
                      </button>
                      <button
                        onClick={() => onAskAIAboutRule(rule)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs transition"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Ask AI</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: TABLE OF CONTENTS (16 CHAPTERS) */}
      {activeSubTab === 'toc' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-900 rounded uppercase tracking-wider">
                  Codified Structure
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Table of Contents: Federal Government Public Service Rules
                </h3>
                <p className="text-xs text-slate-500">
                  Sixteen (16) statutory chapters arranged consecutively with preliminary Foreword and Index.
                </p>
              </div>
              <button
                onClick={() => {
                  const tocRule = PSR_RULES_DATABASE.find(r => r.ruleNumber === '000003') || PSR_RULES_DATABASE[0];
                  onAskAIAboutRule(tocRule);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Ask AI About Table of Contents</span>
              </button>
            </div>

            {/* Preliminary items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div 
                onClick={() => setActiveSubTab('preliminaries')}
                className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/60 cursor-pointer transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
                    (i)
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-900">
                      Foreword
                    </h4>
                    <p className="text-[11px] text-slate-600">President Umaru Musa Yar'Adua, GCFR</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-700" />
              </div>

              <div 
                onClick={() => setActiveSubTab('index')}
                className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/60 hover:bg-teal-100/60 cursor-pointer transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold text-xs">
                    (ii)
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-900">
                      Index (Alphabetical Master Index)
                    </h4>
                    <p className="text-[11px] text-slate-600">Cross-referenced rule numbers (A to Z)</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-teal-700" />
              </div>
            </div>
          </div>

          {/* 16 Chapters Accordion List */}
          <div className="space-y-3">
            {PSR_TABLE_OF_CONTENTS.map((tocItem) => {
              const isExpanded = expandedTocChapter === tocItem.chapter;
              return (
                <div
                  key={tocItem.chapter}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:border-emerald-400/80 transition"
                >
                  <div
                    onClick={() => setExpandedTocChapter(isExpanded ? null : tocItem.chapter)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none bg-slate-50/60 hover:bg-emerald-50/30 transition"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-900 text-amber-300 font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                        {String(tocItem.chapter).padStart(2, '0')}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                          Chapter {tocItem.chapter}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          {tocItem.subject}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 hidden sm:inline">
                        {tocItem.subSections?.length || 0} Sections
                      </span>
                      <div className="p-1 rounded-lg bg-slate-200/70 text-slate-600">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-5 border-t border-slate-100 bg-white space-y-4 text-xs sm:text-sm">
                      {/* Subsections */}
                      {tocItem.subSections && tocItem.subSections.length > 0 && (
                        <div>
                          <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                            <ListOrdered className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Gazetted Subsections in Chapter {tocItem.chapter}:</span>
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {tocItem.subSections.map((sec, idx) => (
                              <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 text-slate-700">
                                <CornerDownRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="text-xs">{sec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Key Topics */}
                      {tocItem.keyTopics && tocItem.keyTopics.length > 0 && (
                        <div>
                          <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-teal-700" />
                            <span>Operational Core Topics:</span>
                          </h5>
                          <div className="flex flex-wrap gap-1.5">
                            {tocItem.keyTopics.map((topic, idx) => (
                              <span key={idx} className="px-2.5 py-1 bg-teal-50 text-teal-800 text-xs rounded-lg border border-teal-200 font-medium">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions for this chapter */}
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                        <button
                          onClick={() => {
                            setSelectedChapter(tocItem.chapter);
                            setActiveSubTab('rules');
                          }}
                          className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold transition border border-emerald-200"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Filter & Browse Rules in Chapter {tocItem.chapter}</span>
                        </button>

                        <button
                          onClick={() => {
                            const synthRule: PSRRule = {
                              ruleNumber: `0${tocItem.chapter}0101`.padStart(6, '0'),
                              chapter: tocItem.chapter,
                              chapterTitle: tocItem.subject,
                              section: 'Chapter Overview & Structure',
                              title: `Chapter ${tocItem.chapter}: ${tocItem.subject}`,
                              summary: `Statutory overview of Chapter ${tocItem.chapter} (${tocItem.subject}) covering ${tocItem.subSections?.join('; ') || 'official service rules'}.`,
                              fullText: `Chapter ${tocItem.chapter} of the Revised Public Service Rules (2021) governs ${tocItem.subject}. Subsections include:\n${tocItem.subSections?.map(s => `- ${s}`).join('\n') || 'All statutory subsections.'}`,
                              keyPoints: tocItem.keyTopics || ['Statutory Compliance', 'Federal Civil Service Regulation'],
                              tags: [tocItem.subject.toLowerCase(), `chapter ${tocItem.chapter}`]
                            };
                            onAskAIAboutRule(synthRule);
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition shadow-2xs"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Ask AI About Chapter {tocItem.chapter}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: MASTER INDEX (A-Z) */}
      {activeSubTab === 'index' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-100 text-teal-900 rounded uppercase tracking-wider">
                  Gazetted Master Index
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Alphabetical Master Index (Item (ii))
                </h3>
                <p className="text-xs text-slate-500">
                  Search across {PSR_MASTER_INDEX.length} statutory topics and locate corresponding 6-digit rule numbers.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">
                  {filteredIndexEntries.length} of {PSR_MASTER_INDEX.length} Entries
                </span>
              </div>
            </div>

            {/* Search Input for Index */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={indexSearchQuery}
                onChange={(e) => setIndexSearchQuery(e.target.value)}
                placeholder="Search index topics (e.g. Unpaid staff, Probation, Estacode, Query, Interdiction, Overtime)..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            {/* Alphabetical Letter Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
              <button
                onClick={() => setSelectedLetter('all')}
                className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition ${
                  selectedLetter === 'all'
                    ? 'bg-teal-800 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                All Letters
              </button>
              {availableLetters.map(letter => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center shrink-0 transition ${
                    selectedLetter === letter
                      ? 'bg-teal-800 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* Index Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredIndexEntries.map((entry, index) => (
              <div
                key={`${entry.ruleNumber}-${index}`}
                className="bg-white rounded-2xl border border-slate-200 hover:border-teal-500 p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-50 text-teal-800 rounded border border-teal-200">
                      Letter {entry.letter} • {entry.subCategory || entry.mainCategory}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-mono font-black bg-slate-900 text-amber-300 rounded-lg">
                      {entry.ruleNumber}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-900 transition leading-snug">
                    {entry.topic}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {entry.mainCategory}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => openRuleOrIndexModal(entry.ruleNumber, entry.topic, entry.mainCategory)}
                    className="text-xs font-semibold text-teal-800 hover:underline flex items-center gap-1"
                  >
                    <span>View Rule {entry.ruleNumber}</span>
                  </button>

                  <button
                    onClick={() => {
                      const synthRule: PSRRule = {
                        ruleNumber: entry.ruleNumber,
                        chapter: parseInt(entry.ruleNumber.substring(0, 2), 10) || 1,
                        chapterTitle: entry.mainCategory,
                        section: entry.subCategory || 'Statutory Section',
                        title: `${entry.topic} (PSR Rule ${entry.ruleNumber})`,
                        summary: `Statutory regulation on "${entry.topic}" codified under Rule ${entry.ruleNumber}.`,
                        fullText: `Rule ${entry.ruleNumber} establishes the official procedures and mandatory obligations governing ${entry.topic} in the Nigerian Public Service.`,
                        keyPoints: [
                          `Index Category: ${entry.mainCategory}`,
                          `Sub-heading: ${entry.subCategory || 'General Provision'}`,
                          `Statutory Rule: ${entry.ruleNumber}`
                        ],
                        tags: [entry.ruleNumber, entry.topic.toLowerCase(), entry.mainCategory.toLowerCase()]
                      };
                      onAskAIAboutRule(synthRule);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold text-xs transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                    <span>Ask AI</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: FOREWORD & PREAMBLE */}
      {activeSubTab === 'preliminaries' && (
        <div className="space-y-6">
          {/* Official Presidential Foreword Card */}
          <div className="bg-white rounded-2xl border-2 border-emerald-700/30 shadow-xs overflow-hidden">
            <div 
              onClick={() => setIsForewordOpen(!isForewordOpen)}
              className="bg-linear-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-400 text-slate-950 rounded uppercase tracking-wider">
                      Presidential Mandate
                    </span>
                    <span className="text-xs text-emerald-300 font-medium">State House, Abuja</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-white mt-0.5 tracking-tight">
                    {PSR_FOREWORD.title.toUpperCase()}
                  </h3>
                  <p className="text-xs text-slate-300 hidden sm:block">
                    Signed by {PSR_FOREWORD.signatory}, {PSR_FOREWORD.designation}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-300 font-semibold hidden md:inline">
                  {isForewordOpen ? 'Hide Foreword' : 'Read Full Foreword'}
                </span>
                <div className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition">
                  {isForewordOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>
            </div>

            {isForewordOpen && (
              <div className="p-5 sm:p-6 bg-slate-50/50 space-y-5 border-t border-slate-200">
                {/* Foreword Verbatim Text Container */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4 font-serif text-xs sm:text-sm text-slate-800 leading-relaxed">
                  <div className="text-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold font-sans uppercase tracking-widest text-emerald-900 block">
                      Federal Republic of Nigeria
                    </span>
                    <h4 className="text-base sm:text-lg font-black font-sans text-slate-900 mt-0.5">
                      FOREWORD
                    </h4>
                    <p className="text-xs font-sans text-slate-500">
                      Strategic Review & Entrenchment of Fundamental Civil Service Ethics
                    </p>
                  </div>

                  <p>
                    This Edition of the Public Service Rule is a review of the 2007 Edition, which is principally intended to update the rules. Regulations and Procedures in the Public Service and bring them in line with the current trend in governance. The revision of this strategic document of the Public Service on a regular basis is necessary in order to make the service conform with changing times and circumstances. The objective, therefore, is to effectively reposition the service for higher level of efficiency, effectiveness and enhanced service delivery.
                  </p>

                  <p>
                    The main thrust of the 2008 Edition of the Public Service Rules is to ensure that the fundamental ethical issues in the Public Service are strictly adhered to. It is, therefore, aimed at entrenching the issues of <strong>transparency, accountability, justice, equity, due process, and the rule of law</strong>. All these are very paramount to the conduct of Government business, which all Public Servants must imbibe.
                  </p>

                  <p>
                    As the machinery through which Government articulates and implements its. policies and programmes, the Public Service needs to be provided with the enabling environment to play this pivotal role effectively; although the removal of obsolete rules and regulations as well as the entrenchment of the core values and professional standards of the Service. The long term goals of this review, therefore, is to achieve our national development agenda and collective goal of becoming one of the 20 leading industrialized nations of the world by 2020 through a focused and vibrant Public Service.
                  </p>

                  <p>
                    I, therefore, urge all Public Servants to acquaint themselves with these Rules and Regulations as well as other extant laws for effective Public Service administration and to ensure their application in a manner that would enhance the smooth functioning of the Public Service.
                  </p>

                  <div className="pt-4 border-t border-slate-100 font-sans text-xs">
                    <p className="text-slate-500 italic">(Sgd)</p>
                    <p className="font-bold text-slate-900 text-sm mt-1">{PSR_FOREWORD.signatory}</p>
                    <p className="text-slate-700">{PSR_FOREWORD.designation},</p>
                    <p className="text-slate-500">{PSR_FOREWORD.location}.</p>
                  </div>
                </div>

                {/* Core Presidential Directives Summary */}
                <div className="bg-emerald-50/70 rounded-xl p-4 border border-emerald-200/80 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-800" />
                    <span>Pivotal Directives & Ethical Pillars Defined in the Foreword:</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
                    {PSR_FOREWORD.keyDirectives.map((directive, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-emerald-100">
                        <span className="text-emerald-700 font-bold">✔</span>
                        <span>{directive}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions for Foreword */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <button
                    onClick={copyForewordText}
                    className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-300 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 transition"
                  >
                    {copiedForeword ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Foreword Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Foreword to Clipboard</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      const forewordRule = PSR_RULES_DATABASE.find(r => r.ruleNumber === '000001') || PSR_RULES_DATABASE[0];
                      onAskAIAboutRule(forewordRule);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Ask AI About Foreword & Due Process Mandate</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Official Head of Civil Service Preamble Card */}
          <div className="bg-white rounded-2xl border-2 border-teal-700/30 shadow-xs overflow-hidden">
            <div 
              onClick={() => setIsPreambleOpen(!isPreambleOpen)}
              className="bg-linear-to-r from-teal-950 via-slate-900 to-teal-900 text-white p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-teal-400/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-400 text-slate-950 rounded uppercase tracking-wider">
                      OHCSF Preamble
                    </span>
                    <span className="text-xs text-teal-300 font-medium">The Presidency, Abuja</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-white mt-0.5 tracking-tight">
                    {PSR_PREAMBLE.title.toUpperCase()}
                  </h3>
                  <p className="text-xs text-slate-300 hidden sm:block">
                    Signed by {PSR_PREAMBLE.signatory}, {PSR_PREAMBLE.designation}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-teal-300 font-semibold hidden md:inline">
                  {isPreambleOpen ? 'Hide Preamble' : 'Read Full Preamble'}
                </span>
                <div className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition">
                  {isPreambleOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>
            </div>

            {isPreambleOpen && (
              <div className="p-5 sm:p-6 bg-slate-50/50 space-y-5 border-t border-slate-200">
                {/* Visual 6-Digit Numbering Method Banner */}
                <div className="bg-linear-to-r from-teal-900 to-emerald-900 text-white rounded-xl p-4 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-300 mb-2">
                    <Hash className="w-4 h-4" />
                    <span>Statutory 6-Digit Rule Numbering Formula (Item 1):</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                    <div className="bg-white/10 p-2.5 rounded-lg border border-white/15">
                      <span className="block text-xl sm:text-2xl font-black text-amber-300 font-mono">CC</span>
                      <span className="text-[11px] font-semibold text-slate-200 block">First 2 Digits</span>
                      <span className="text-[10px] text-teal-200">Chapter Number (e.g. 03)</span>
                    </div>
                    <div className="bg-white/10 p-2.5 rounded-lg border border-white/15">
                      <span className="block text-xl sm:text-2xl font-black text-teal-300 font-mono">SS</span>
                      <span className="text-[11px] font-semibold text-slate-200 block">Next 2 Digits</span>
                      <span className="text-[10px] text-teal-200">Section (01-09) (e.g. 04)</span>
                    </div>
                    <div className="bg-white/10 p-2.5 rounded-lg border border-white/15">
                      <span className="block text-xl sm:text-2xl font-black text-emerald-300 font-mono">RR</span>
                      <span className="text-[11px] font-semibold text-slate-200 block">Last 2 Digits</span>
                      <span className="text-[10px] text-teal-200">Rule Number (e.g. 02)</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-teal-200 text-center mt-2.5 font-medium">
                    Example: <strong>03</strong> (Chapter 3) + <strong>04</strong> (Section 4) + <strong>02</strong> (Rule 2) = <strong>Rule 030402 (Serious Misconduct)</strong>
                  </p>
                </div>

                {/* Preamble Verbatim Text Container */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4 font-serif text-xs sm:text-sm text-slate-800 leading-relaxed">
                  <div className="text-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold font-sans uppercase tracking-widest text-teal-900 block">
                      Office of the Head of the Civil Service of the Federation
                    </span>
                    <h4 className="text-base sm:text-lg font-black font-sans text-slate-900 mt-0.5">
                      PREAMBLE
                    </h4>
                    <p className="text-xs font-sans text-slate-500">
                      Codification of Reforms, 6-Digit Numbering, Circular Amendments & 5-Year Review Cycle
                    </p>
                  </div>

                  <p>
                    This particular edition has codified changes that became necessary as a result of the implementation of the social, economic and administrative reform programme that this Administration has been undertaking since its advent in May 1999. These reforms include the <strong>contributory pension scheme; monetization; due process; public sector procurement; wage and salaries adjustments and awards; etc.</strong>
                  </p>

                  <p>
                    Public Servants are implored to study and imbibe these Rules and their associated and complementary Instructions and Notices. and to become familiar with all Laws and Procedures guiding the conduct of public administration and financial management in order to ensure due process and probity in the conduct of Government business.
                  </p>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-sans space-y-3 my-2 text-xs text-slate-800">
                    <p className="font-bold text-slate-900">
                      The following should be taken into account while going through these Rules:
                    </p>
                    <div className="space-y-2">
                      <div>
                        <strong className="text-teal-900">1. Method of Numbering:</strong> Each rule has been given a number containing six digits. The first two indicate the Chapter; the next two, the Section; and the last two, the Rule Number.
                      </div>
                      <div>
                        <strong className="text-teal-900">2. Arrangement of Chapters, Sections and Rules:</strong> There are sixteen (16) Chapters arranged as listed in the Table of Contents. Under each Chapter, is written the Sections ranging from 01-09. At the right hand corner, the titles of the rules are indicated. Except where otherwise indicated by the context, the Index at the back contains the list of topics with their corresponding rule numbers.
                      </div>
                      <div>
                        <strong className="text-teal-900">3. Amendments:</strong> Further amendments to these Rules shall be made through Circulars, which will be issued from time to time.
                      </div>
                      <div>
                        <strong className="text-teal-900">4. Review of the Public Service Rules:</strong> Public Service Rules shall be reviewed every five years to update the provisions of the rules.
                      </div>
                    </div>
                  </div>

                  <p>
                    This Public Service Rules should be widely circulated to all categories of Public Servants, and Nigerian citizens from all walks of life are also encouraged to avail themselves of its contents.
                  </p>

                  <div className="pt-4 border-t border-slate-100 font-sans text-xs">
                    <p className="text-slate-500 italic">(Sgd)</p>
                    <p className="font-bold text-slate-900 text-sm mt-1">{PSR_PREAMBLE.signatory}</p>
                    <p className="text-slate-700">{PSR_PREAMBLE.designation},</p>
                    <p className="text-slate-500">{PSR_PREAMBLE.location}.</p>
                  </div>
                </div>

                {/* Core Structural Takeaways */}
                <div className="bg-teal-50/70 rounded-xl p-4 border border-teal-200/80 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-teal-950 flex items-center gap-1.5">
                    <RefreshCw className="w-4 h-4 text-teal-800" />
                    <span>Statutory Governance Rules Prescribed in the Preamble:</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
                    {PSR_PREAMBLE.keyProvisions.map((provision, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-teal-100">
                        <span className="text-teal-700 font-bold">✔</span>
                        <span>{provision}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions for Preamble */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <button
                    onClick={copyPreambleText}
                    className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-300 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 transition"
                  >
                    {copiedPreamble ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-600" />
                        <span className="text-teal-700 font-bold">Preamble Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Preamble to Clipboard</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      const preambleRule = PSR_RULES_DATABASE.find(r => r.ruleNumber === '000002') || PSR_RULES_DATABASE[0];
                      onAskAIAboutRule(preambleRule);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold transition shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Ask AI About 6-Digit Numbering & 5-Year Review</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Full Verbatim Rule Modal */}
      {activeModalRule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-emerald-900 text-white p-5 flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 text-[11px] font-bold bg-amber-400 text-slate-900 rounded">
                  Rule {activeModalRule.ruleNumber}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                  {activeModalRule.title}
                </h3>
                <p className="text-xs text-emerald-200">
                  Chapter {activeModalRule.chapter}: {activeModalRule.chapterTitle} • {activeModalRule.section}
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveModalRule(null);
                  if (onCloseRuleModal) onCloseRuleModal();
                }}
                className="text-emerald-200 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">
                  Verbatim Statutory Text (PSR 2021)
                </h4>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 font-serif leading-relaxed text-slate-800 whitespace-pre-line">
                  {activeModalRule.fullText}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1.5">
                  Operational Guidelines & Requirements
                </h4>
                <ul className="space-y-1.5 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                  {activeModalRule.keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <span className="text-emerald-700 font-bold">✔</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activeModalRule.penaltyOrConsequence && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800">
                  <span className="font-bold block mb-0.5">Statutory Penalty / Consequence:</span>
                  <span>{activeModalRule.penaltyOrConsequence}</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => copyRuleCitation(activeModalRule)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Legal Citation</span>
              </button>
              <button
                onClick={() => {
                  const rule = activeModalRule;
                  setActiveModalRule(null);
                  if (onCloseRuleModal) onCloseRuleModal();
                  onAskAIAboutRule(rule);
                }}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Ask AI About This Rule</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
