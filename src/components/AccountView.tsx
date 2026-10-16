import React, { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { authClient, authRedirect } from '../services/auth';

type Mode = 'login' | 'signup' | 'reset' | 'update';
export function AccountView({ initialMode }: { initialMode: 'login' | 'signup' }) {
  const [mode, setMode] = useState<Mode>(new URLSearchParams(window.location.search).get('account') === 'recovery' ? 'update' : initialMode);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (!authClient) return;
    let mounted = true;
    authClient.auth.getUser().then(({ data }) => { if (mounted) setUser(data.user); });
    const { data: { subscription } } = authClient.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'PASSWORD_RECOVERY') setMode('update');
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);
  const switchMode = (next: Mode) => { setMode(next); setPassword(''); setConfirmation(''); setMessage(''); setError(''); };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!authClient || busy) return;
    setError(''); setMessage('');
    if ((mode === 'signup' || mode === 'update') && password !== confirmation) { setError('The passwords do not match.'); return; }
    setBusy(true);
    try {
      if (mode === 'signup') {
        const { data, error } = await authClient.auth.signUp({ email, password, options: { emailRedirectTo: authRedirect, data: { full_name: name.trim() } } });
        if (error) throw error;
        setMessage(data.session ? 'Your account is ready. You are signed in.' : 'Check your email for a confirmation link. Confirm your address before logging in.');
      } else if (mode === 'login') {
        const { error } = await authClient.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage('You are signed in.');
      } else if (mode === 'reset') {
        const { error } = await authClient.auth.resetPasswordForEmail(email, { redirectTo: authRedirect + '?account=recovery' });
        if (error) throw error;
        setMessage('If an account exists for this email, a password reset link will be sent.');
      } else {
        const { error } = await authClient.auth.updateUser({ password });
        if (error) throw error;
        setMessage('Your password has been updated.'); setMode('login'); window.history.replaceState({}, '', authRedirect);
      }
      setPassword(''); setConfirmation('');
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to complete the request. Please try again.'); }
    finally { setBusy(false); }
  };
  return <section className="max-w-lg mx-auto my-8 rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-sm">
    <h2 className="text-3xl font-bold">{user && mode !== 'update' ? 'My account' : { login: 'Welcome back', signup: 'Create your account', reset: 'Reset your password', update: 'Choose a new password' }[mode]}</h2>
    {!authClient && <p role="status" className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">Account service setup is in progress. Registration and login will become available once the secure service is connected.</p>}
    {message && <p role="status" className="mt-4 text-sm text-emerald-800">{message}</p>}
    {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
    {user && mode !== 'update' ? <div className="mt-6"><p className="text-slate-600 break-words">Signed in as {user.email}</p><p className="mt-3 text-sm text-slate-500">Your account does not confer an officer grade or administrative privileges. Existing officer workspaces remain demonstrations.</p><button disabled={busy} onClick={async () => { if (!authClient) return; setBusy(true); const { error } = await authClient.auth.signOut(); if (error) setError(error.message); else setMessage('You have signed out.'); setBusy(false); }} className="mt-6 w-full bg-emerald-800 text-white rounded-xl py-3 font-semibold disabled:opacity-50">Logout</button></div> : <form onSubmit={submit} className="mt-6 space-y-4">
      <fieldset disabled={!authClient || busy} className="space-y-4 disabled:opacity-50">
        {mode === 'signup' && <label className="block text-sm font-semibold">Full name<input required maxLength={100} value={name} onChange={e => setName(e.target.value)} autoComplete="name" className="mt-2 block w-full border border-slate-300 rounded-xl p-3" /></label>}
        {mode !== 'update' && <label className="block text-sm font-semibold">Email address<input type="email" required maxLength={254} value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" className="mt-2 block w-full border border-slate-300 rounded-xl p-3" /></label>}
        {mode !== 'reset' && <label className="block text-sm font-semibold">Password<input type="password" required minLength={mode === 'login' ? 1 : 12} maxLength={128} value={password} onChange={e => setPassword(e.target.value)} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} className="mt-2 block w-full border border-slate-300 rounded-xl p-3" />{mode !== 'login' && <span className="block mt-1 text-xs font-normal text-slate-500">Use at least 12 characters.</span>}</label>}
        {(mode === 'signup' || mode === 'update') && <label className="block text-sm font-semibold">Confirm password<input type="password" required value={confirmation} onChange={e => setConfirmation(e.target.value)} autoComplete="new-password" className="mt-2 block w-full border border-slate-300 rounded-xl p-3" /></label>}
        <button className="w-full bg-emerald-800 text-white rounded-xl py-3 font-semibold" type="submit">{busy ? 'Please wait…' : {login:'Login', signup:'Create account', reset:'Send reset link', update:'Save password'}[mode]}</button>
      </fieldset>
      <div className="flex flex-wrap justify-between gap-3 text-sm text-emerald-800"><button type="button" onClick={() => switchMode(mode === 'signup' ? 'login' : 'signup')} className="underline">{mode === 'signup' ? 'Login instead' : 'Create an account'}</button>{mode === 'login' ? <button type="button" onClick={() => switchMode('reset')} className="underline">Forgot password?</button> : <button type="button" onClick={() => switchMode('login')} className="underline">Back to login</button>}</div>
    </form>}
  </section>;
}
