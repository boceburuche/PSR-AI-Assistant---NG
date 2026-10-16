import React, { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { Github } from 'lucide-react';
import { authClient, authRedirect } from '../services/auth';

export function AccountView({ initialMode }: { initialMode: 'login' | 'signup' }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!authClient) { setLoading(false); return; }
    let mounted = true;
    const loadUser = async () => {
      try {
        const { data, error } = await authClient!.auth.getUser();
        if (mounted) { setUser(data.user); if (error && error.name !== 'AuthSessionMissingError') setError('Unable to verify your session. Please sign in again.'); }
      } catch { if (mounted) setError('Unable to reach the account service. Please try again.'); }
      finally { if (mounted) setLoading(false); }
    };
    void loadUser();
    const { data: { subscription } } = authClient.auth.onAuthStateChange((_event, session) => {
      if (mounted) { setUser(session?.user ?? null); setLoading(false); }
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);
  const signIn = async (provider: 'github' | 'google') => {
    if (!authClient || busy) return;
    setBusy(true); setError('');
    try {
      const { error } = await authClient.auth.signInWithOAuth({ provider, options: { redirectTo: authRedirect + '?account=' + provider, ...(provider === 'github' ? { scopes: 'user:email' } : { scopes: 'openid email profile', queryParams: { prompt: 'select_account' } }) } });
      if (error) throw error;
    } catch { setError('Sign-in could not start. Please try again.'); setBusy(false); }
  };
  const logout = async () => {
    if (!authClient || busy) return;
    setBusy(true); setError('');
    try { const { error } = await authClient.auth.signOut(); if (error) throw error; }
    catch { setError('Unable to sign out. Please try again.'); }
    finally { setBusy(false); }
  };
  return <section className="max-w-lg mx-auto my-8 rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-sm">
    <Github className="h-10 w-10 mb-5 text-slate-900" aria-hidden="true" />
    <h2 className="text-3xl font-bold">{user ? 'My account' : initialMode === 'signup' ? 'Create your account' : 'Welcome back'}</h2>
    {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
    {loading ? <p role="status" className="mt-6 text-slate-500">Checking your session…</p> : user ? <div className="mt-6">
      <p className="text-slate-600 break-words">Signed in as {user.email ?? 'GitHub user'}</p>
      <p className="mt-3 text-sm text-slate-500">Your account does not confer an officer grade or administrative privileges. Officer workspaces remain demonstrations.</p>
      <button disabled={busy} onClick={logout} className="mt-6 w-full bg-emerald-800 text-white rounded-xl py-3 font-semibold disabled:opacity-50">{busy ? 'Signing out…' : 'Logout'}</button>
    </div> : <div className="mt-6">
      <p className="text-slate-600 leading-relaxed">Choose Google or GitHub to sign in securely. On your first visit, an account is created automatically.</p>
      <button disabled={!authClient || busy} onClick={() => signIn('google')} className="mt-6 flex items-center justify-center gap-3 w-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 rounded-xl py-3 font-semibold disabled:opacity-50"><span aria-hidden="true" className="font-bold text-blue-600 text-lg">G</span>{busy ? 'Opening sign-in…' : 'Continue with Google'}</button>
      <button disabled={!authClient || busy} onClick={() => signIn('github')} className="mt-6 flex items-center justify-center gap-3 w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3 font-semibold disabled:opacity-50"><Github className="w-5 h-5" aria-hidden="true" />{busy ? 'Opening GitHub…' : 'Continue with GitHub'}</button>
      <p className="mt-4 text-xs text-slate-500">You’ll continue with your chosen provider to approve sign-in, then return here. No separate password is needed.</p>
    </div>}
  </section>;
}
