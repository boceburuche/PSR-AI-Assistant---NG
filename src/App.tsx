import React, { useState } from 'react';
import { Header } from './components/Header';
import { PublicPages } from './components/PublicPages';
import { ChatView } from './components/ChatView';
import { RulebookView } from './components/RulebookView';
import { DisciplinaryHub } from './components/DisciplinaryHub';
import { CalculatorsView } from './components/CalculatorsView';
import { AccessControlView } from './components/AccessControlView';
import { RoleSwitcherModal } from './components/RoleSwitcherModal';
import { OfficerProfile, AuditLogEntry, PSRRule } from './types/psr';
import { DEMO_OFFICER_PROFILES } from './data/psrCorpus';
import { useOnlineStatus } from './hooks/usePWAInstall';
import { 
  MessageSquare, 
  BookOpen, 
  ShieldAlert, 
  Calculator, 
  Lock, 
  WifiOff, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [currentProfile, setCurrentProfile] = useState<OfficerProfile>(DEMO_OFFICER_PROFILES[0]);
  const [activeTab, setActiveTab] = useState<'chat' | 'rulebook' | 'disciplinary' | 'calculators' | 'access' | 'home' | 'tools' | 'about' | 'login' | 'signup'>(['recovery', 'github'].includes(new URLSearchParams(window.location.search).get('account') ?? '') ? 'login' : 'home');
  const [navigationRevision, setNavigationRevision] = useState(0);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedRuleForModal, setSelectedRuleForModal] = useState<PSRRule | null>(null);
  const [queryDefenseContext, setQueryDefenseContext] = useState<string>('');
  
  const isOnline = useOnlineStatus();

  // Audit Trail Logs
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: 'log-1',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      officerName: 'Bello Danjuma Adebayo',
      staffNo: 'FGN/FED/ADM/88219',
      role: 'Senior Officer (GL 10)',
      action: 'Session Authentication',
      details: 'Officer verified via IPPIS Federal Database with Secret clearance.',
      status: 'Allowed'
    },
    {
      id: 'log-2',
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      officerName: 'Bello Danjuma Adebayo',
      staffNo: 'FGN/FED/ADM/88219',
      role: 'Senior Officer (GL 10)',
      action: 'RAG Grounding Loaded',
      details: 'Initialized Revised Public Service Rules (PSR 2021) OAGF vector corpus.',
      status: 'Allowed'
    }
  ]);

  const addAuditLog = (action: string, details: string, status: 'Allowed' | 'Restricted' | 'Flagged' = 'Allowed') => {
    const newEntry: AuditLogEntry = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      officerName: currentProfile.name,
      staffNo: currentProfile.staffNumber,
      role: `${currentProfile.cadre} (${currentProfile.gradeLevel})`,
      action,
      details,
      status
    };
    setAuditLogs(prev => [newEntry, ...prev.slice(0, 49)]);
  };

  const handleProfileChange = (newProfile: OfficerProfile) => {
    setCurrentProfile(newProfile);
    addAuditLog('Role / Cadre Switched', `Officer switched profile to ${newProfile.name} (${newProfile.gradeLevel}, ${newProfile.role})`);
  };

  const handleAskAIAboutRule = (rule: PSRRule) => {
    setActiveTab('chat');
    // Scroll or trigger in chat
    addAuditLog('Rule Deep-Dive', `Officer requested RAG legal analysis on Rule ${rule.ruleNumber}: ${rule.title}`);
  };

  const handleDraftQueryReply = (contextText: string) => {
    setQueryDefenseContext(contextText);
    setActiveTab('disciplinary');
    addAuditLog('Exculpation Transition', 'Navigated to Disciplinary Hub to draft official query defense.');
  };

  const handleOpenRuleDetail = (rule: PSRRule) => {
    setSelectedRuleForModal(rule);
    setActiveTab('rulebook');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 ">
      {/* Header with Profile & PWA */}
      <Header
        currentProfile={currentProfile}
        onOpenProfileSwitcher={() => setIsProfileModalOpen(true)}
        activeTab={activeTab}
        onNavigate={(page) => { setActiveTab(page); setNavigationRevision(value => value + 1); }}
      />

      {/* Offline Toast Notification */}
      {!isOnline && (
        <div className="bg-amber-600 text-white px-4 py-1.5 text-xs font-semibold flex items-center justify-center gap-2 shadow-inner">
          <WifiOff className="w-4 h-4 animate-pulse" />
          <span>Offline PWA Mode Active: Using cached PSR 2021 statutory database and local heuristic engine.</span>
        </div>
      )}

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 py-3 sm:py-5">
        {["home", "tools", "about", "login", "signup"].includes(activeTab) && (
          <PublicPages key={navigationRevision} page={activeTab} onNavigate={setActiveTab} />
        )}
        {["chat", "disciplinary", "calculators", "access"].includes(activeTab) && (
          <p className="max-w-7xl mx-auto px-4 pb-3 text-xs text-slate-500">Demonstration workspace · Sample officer profile. <button className="underline" onClick={() => setIsProfileModalOpen(true)}>Change sample profile</button></p>
        )}
        {activeTab === 'chat' && (
          <ChatView
            currentProfile={currentProfile}
            onOpenRuleDetail={handleOpenRuleDetail}
            onDraftQueryReply={handleDraftQueryReply}
            onLogAudit={addAuditLog}
          />
        )}

        {activeTab === 'rulebook' && (
          <RulebookView
            onAskAIAboutRule={handleAskAIAboutRule}
            selectedRuleForModal={selectedRuleForModal}
            onCloseRuleModal={() => setSelectedRuleForModal(null)}
            onLogAudit={addAuditLog}
          />
        )}

        {activeTab === 'disciplinary' && (
          <DisciplinaryHub
            currentProfile={currentProfile}
            initialQueryContext={queryDefenseContext}
            onLogAudit={addAuditLog}
          />
        )}

        {activeTab === 'calculators' && (
          <CalculatorsView
            currentProfile={currentProfile}
            onLogAudit={addAuditLog}
          />
        )}

        {activeTab === 'access' && (
          <AccessControlView
            currentProfile={currentProfile}
            auditLogs={auditLogs}
            onClearLogs={() => setAuditLogs([])}
            onOpenProfileSwitcher={() => setIsProfileModalOpen(true)}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-6 text-center text-xs text-slate-500">
        PSR 2021 reference companion · Verify guidance against source rules and applicable circulars.
      </footer>

      {/* Role Switcher & Profile Modal */}
      <RoleSwitcherModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentProfile={currentProfile}
        onSelectProfile={handleProfileChange}
      />
    </div>
  );
}
