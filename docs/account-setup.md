# Account service activation

The app uses Supabase Auth for persistent email/password accounts. Passwords are submitted directly to Supabase; the application does not maintain a password database.

Before activation:

1. Select or create the Supabase project dedicated to PSR AI Assistant.
2. Enable email/password signup and email confirmation. Set the minimum password length to 12.
3. Set the site URL to `https://boceburuche.github.io/PSR-AI-Assistant---NG/`.
4. Allow that exact redirect URL and `https://boceburuche.github.io/PSR-AI-Assistant---NG/?account=recovery`.
5. Configure production email delivery (SMTP) for confirmation and recovery messages. Supabase's default email service may restrict recipients.
6. Set GitHub repository Actions variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` to the project's URL and public publishable key. Never use a secret or service-role key in Vite configuration.
7. Build and deploy the app. Verify signup, email confirmation, login, persistence after refresh, logout, invalid-password errors, and the complete reset-email round trip with a dedicated test account.

Account creation grants no officer grade, security clearance, or administrative role. The existing officer tools and audit page remain demonstration workspaces; authenticated backend authorization is required before using them for protected records.

When account variables are absent, forms stay disabled and explain the unavailable service. Do not claim accounts are enabled until provider configuration and live verification pass.
