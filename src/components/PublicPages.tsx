import { AccountView } from './AccountView';
import React from 'react';
import { ArrowRight, BookOpen, Briefcase, CalendarDays, ShieldCheck, Calculator, Scale } from 'lucide-react';

type Page = 'home' | 'tools' | 'about' | 'login' | 'signup' | 'chat' | 'rulebook' | 'disciplinary' | 'calculators' | 'access';
export function PublicPages({ page, onNavigate }: { page: string; onNavigate: (page: Page) => void }) {
  if (page === 'login' || page === 'signup') return <AccountView key={page} initialMode={page} />;
  if (page === 'about') return <section className="max-w-3xl mx-auto px-5 py-10"><p className="text-emerald-700 font-semibold">ABOUT THIS APPLICATION</p><h2 className="mt-3 text-3xl font-bold">A clearer route to public service guidance.</h2><p className="mt-5 leading-relaxed text-slate-600">Nigeria PSR AI Assistant helps visitors explore the Public Service Rules 2021, find topics, and access practical reference tools. The Rulebook is open to visitors without registration.</p><div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6"><h3 className="font-bold">Sources and interpretation</h3><p className="mt-3 text-slate-600">Check the linked source document and applicable circulars before taking administrative action. AI explanations are guidance and should be checked against the original rule.</p><a className="inline-block mt-4 text-emerald-800 underline" href="https://oagf.gov.ng/wp-content/uploads/2023/08/The-Reviced-Public-Service-Ruled-PSR-2021.pdf" target="_blank" rel="noopener noreferrer">View the PSR source PDF</a></div></section>;
  if (page === 'tools') return <section className="max-w-5xl mx-auto px-5 py-10"><h2 className="text-3xl font-bold">Public service tools</h2><p className="mt-3 text-slate-600">Choose a workspace. Existing tools use sample officer profiles for demonstration.</p><div className="grid sm:grid-cols-2 gap-5 mt-8">{[['disciplinary','Query & Discipline Hub','Explore query procedures and drafting assistance.'],['calculators','Retirement & Allowances','Explore the existing benefits and retirement calculators.']].map(([key,title,description])=><button key={key} onClick={()=>onNavigate(key as Page)} className="text-left bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-500"><h3 className="font-bold text-lg">{title}</h3><p className="mt-3 text-sm text-slate-600">{description}</p><ArrowRight className="mt-5 text-emerald-700 w-5" /></button>)}</div><details className="mt-8"><summary className="cursor-pointer text-sm text-slate-500">Administration demonstration</summary><button onClick={()=>onNavigate('access')} className="mt-3 text-sm underline text-emerald-800">Open sample access controls and audit</button></details></section>;
  return <section className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-10">
    <div className="rounded-3xl bg-emerald-950 text-white px-6 py-10 sm:p-14 relative overflow-hidden">
      <p className="text-emerald-300 text-xs font-bold tracking-widest uppercase">Nigeria Public Service Rules · 2021 Edition</p>
      <h2 className="mt-5 max-w-3xl text-4xl sm:text-5xl font-bold leading-tight tracking-tight">Understand the rules.<br />Navigate your public service career.</h2>
      <p className="mt-5 max-w-xl text-emerald-100 leading-relaxed">Find public service rules, explore procedures, and access practical guidance in one place.</p>
      <div className="flex flex-wrap gap-3 mt-8"><button onClick={()=>onNavigate('chat')} className="bg-white text-emerald-950 rounded-xl px-5 py-3 font-bold flex items-center gap-3">Ask the PSR Assistant <ArrowRight className="w-4" /></button><button onClick={()=>onNavigate('rulebook')} className="border border-emerald-500 rounded-xl px-5 py-3 font-semibold hover:bg-emerald-900">Browse the Rulebook</button></div>
      <p className="mt-5 text-xs text-emerald-200">No account needed to browse the Rulebook.</p>
    </div>
    <div className="flex flex-wrap gap-x-8 gap-y-2 py-6 text-sm text-slate-500"><span>PSR 2021 reference</span><span>Searchable rules and topics</span><span>Source document available</span></div>
    <h3 className="mt-4 text-2xl font-bold">What would you like to explore?</h3><p className="mt-2 text-slate-500">Start with the Rulebook or choose a practical tool.</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">{[
      ['Appointments & Promotion','Explore appointment and career progression rules.',Briefcase,'rulebook'],
      ['Leave','Find leave provisions and entitlements.',CalendarDays,'rulebook'],
      ['Discipline & Queries','Explore procedures and drafting assistance.',ShieldCheck,'disciplinary'],
      ['Retirement','Open the retirement reference tools.',Calculator,'calculators'],
      ['Allowances','Explore the allowances calculator.',Scale,'calculators'],
      ['Conduct & Ethics','Browse rules on professional conduct.',BookOpen,'rulebook'],
    ].map(([title,description,Icon,target])=>{const TopicIcon=Icon as typeof BookOpen;return <button key={String(title)} onClick={()=>onNavigate(target as Page)} className="bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-sm transition rounded-2xl p-6 text-left"><TopicIcon className="text-emerald-700 w-6 h-6 mb-4"/><h4 className="font-bold">{String(title)}</h4><p className="mt-2 text-sm text-slate-500">{String(description)}</p></button>;})}</div>
    <div className="mt-10 rounded-2xl bg-emerald-50 border border-emerald-100 p-6 flex flex-wrap gap-5 items-center justify-between"><div><h3 className="font-bold text-emerald-950">Start with the source.</h3><p className="mt-1 text-sm text-slate-600">Review original rules and applicable circulars when making decisions.</p></div><button onClick={()=>onNavigate('about')} className="text-emerald-800 font-semibold text-sm underline">About this application</button></div>
  </section>;
}
