import { authClient } from '../services/auth';
import React from 'react';
import { OfficerProfile } from '../types/psr';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWAInstall';
import { 
  ShieldCheck, 
  Download, 
  ExternalLink, 
  UserCheck, 
  Wifi, 
  WifiOff, 
  Building2, 
  Award,
  Smartphone,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  currentProfile: OfficerProfile;
  onOpenProfileSwitcher: () => void;
  activeTab: string;
  onNavigate: (page: any) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentProfile,
  onOpenProfileSwitcher,
  activeTab,
  onNavigate,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const isOnline = useOnlineStatus();
  const [showIOSModal, setShowIOSModal] = React.useState(false);

  const [signedIn, setSignedIn] = React.useState(false);
  React.useEffect(() => {
    if (!authClient) return;
    authClient.auth.getUser().then(({ data }) => setSignedIn(Boolean(data.user)));
    const { data: { subscription } } = authClient.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session?.user)));
    return () => subscription.unsubscribe();
  }, []);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = (page: string) => { onNavigate(page); setMenuOpen(false); };

  // Security badge colors
  const clearanceColors: Record<string, string> = {
    Restricted: 'bg-blue-100 text-blue-800 border-blue-200',
    Confidential: 'bg-amber-100 text-amber-800 border-amber-200',
    Secret: 'bg-rose-100 text-rose-800 border-rose-200',
    'Top Secret': 'bg-purple-100 text-purple-900 border-purple-300',
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
      {/* Top Sovereign Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1 px-4 flex items-center justify-between font-medium">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-wide">FEDERAL REPUBLIC OF NIGERIA</span>
          <span className="hidden sm:inline text-emerald-400">|</span>
          <span className="hidden sm:inline text-emerald-200">Office of the Head of the Civil Service of the Federation (OHCSF)</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://oagf.gov.ng/wp-content/uploads/2023/08/The-Reviced-Public-Service-Ruled-PSR-2021.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-emerald-300 hover:text-white transition underline"
            title="Download Official Source Document (OAGF)"
          >
            <span>Revised PSR 2021 PDF</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <div className="flex items-center gap-1.5 pl-2 border-l border-emerald-800">
            {isOnline ? (
              <span className="flex items-center gap-1 text-emerald-300" title="Internet connection available">
                <Wifi className="w-3 h-3" />
                <span className="hidden md:inline">Online</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-300" title="Offline PWA Mode Active">
                <WifiOff className="w-3 h-3" />
                <span>Offline Mode</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-linear-to-br from-emerald-700 to-emerald-900 text-white shadow-sm border border-emerald-600/30 overflow-hidden shrink-0">
            <svg viewBox="0 0 100 100" className="w-8 h-8 drop-shadow-sm" fill="none">
              <path d="M50 15 L80 28 C80 58 50 82 50 85 C50 82 20 58 20 28 Z" fill="#ffffff" />
              <path d="M50 22 L72 32 C72 54 50 72 50 75 C50 72 28 54 28 32 Z" fill="#008751" />
              <path d="M42 46 L50 42 L58 46 L58 60 L50 56 L42 60 Z" fill="#fcd34d" />
              <circle cx="50" cy="35" r="4" fill="#fcd34d" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight tracking-tight">
                Nigeria PSR AI Assistant
              </h1>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                PSR 2021
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Central RAG Policy Guidance & Regulatory Interpretations
            </p>
          </div>
        </div>

        {/* Right Actions: Officer Profile & PWA Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* PWA Install Button */}
          {isInstallable && (
            <button
              onClick={install}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition shadow-2xs"
              title="Install PSR Assistant App on this device"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Install App</span>
            </button>
          )}

          {isIOS && !isInstalled && (
            <button
              onClick={() => setShowIOSModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition"
            >
              <Smartphone className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Install on iOS</span>
            </button>
          )}

          <button onClick={() => navigate('login')} className="rounded-lg border border-emerald-700 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50">{signedIn ? 'My Account' : 'Login'}</button>
          {!signedIn && <button onClick={() => navigate('signup')} className="rounded-lg bg-emerald-800 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-900 whitespace-nowrap">Sign Up</button>}

        </div>
      </div>

      <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-4 sm:px-6 pb-3">
        <button aria-expanded={menuOpen} aria-controls="main-menu" onClick={() => setMenuOpen(!menuOpen)} className="md:hidden rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold">{menuOpen ? 'Close menu' : 'Menu ☰'}</button>
        <div id="main-menu" className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-1 mt-2 md:mt-0`}>
          {[['home', 'Home'], ['rulebook', 'PSR Rulebook'], ['chat', 'AI Assistant'], ['tools', 'Tools'], ['about', 'About']].map(([key, label]) => (
            <button key={key} aria-current={activeTab === key ? 'page' : undefined} onClick={() => navigate(key)} className={`rounded-lg px-4 py-2.5 text-sm font-semibold text-left ${activeTab === key ? 'bg-emerald-50 text-emerald-900' : 'text-slate-600 hover:bg-slate-50'}`}>{label}</button>
          ))}
        </div>
      </nav>

      {/* iOS Safari Guide Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Install PSR on iPhone/iPad</h3>
                <p className="text-xs text-slate-500">Access PSR rules offline anytime</p>
              </div>
            </div>
            <ol className="text-xs text-slate-600 space-y-2.5 my-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-800">1.</span>
                <span>Tap the <strong>Share</strong> icon in the Safari navigation bar at the bottom.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-800">2.</span>
                <span>Scroll down and select <strong>Add to Home Screen</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-800">3.</span>
                <span>Tap <strong>Add</strong> in the top-right corner.</span>
              </li>
            </ol>
            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
