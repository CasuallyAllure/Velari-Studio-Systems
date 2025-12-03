# Deployment Guide

## Quick Deploy to Vercel

### 1. Install Vercel CLI (if not already installed)

```bash
npm i -g vercel
```

### 2. Deploy

```bash
cd Velari-Studio-Systems
vercel --prod
```

### 3. Add Environment Variables in Vercel Dashboard

Go to your project settings → Environment Variables and add:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
VITE_RESEND_API_KEY=re_...
VITE_OPENAI_API_KEY=sk-proj-...
VITE_PLAUSIBLE_DOMAIN=yourdomain.com
VITE_FROM_EMAIL=intake@yourdomain.com
VITE_NOTIFICATION_EMAIL=you@yourdomain.com
```

**Note**: All variables are optional. The site works perfectly with mocks if no variables are set.

### 4. Redeploy After Adding Variables

```bash
vercel --prod
```

---

## Alternative: Deploy to Netlify

### 1. Build the site

```bash
pnpm build
```

### 2. Deploy `dist/` folder

```bash
netlify deploy --prod --dir=dist
```

### 3. Add Environment Variables in Netlify Dashboard

Same variables as above.

---

## Alternative: Deploy to Cloudflare Pages

### 1. Connect GitHub repository

Go to Cloudflare Pages → Create Project → Connect GitHub

### 2. Configure Build Settings

- **Build command**: `pnpm build`
- **Build output directory**: `dist`
- **Root directory**: `/`

### 3. Add Environment Variables

Same variables as above.

---

## Custom Domain Setup

### For Vercel

1. Go to Project Settings → Domains
2. Add your domain (e.g., `velaristudiosystems.com`)
3. Follow DNS configuration instructions

### For Resend Email

1. Go to Resend Dashboard → Domains
2. Add your domain
3. Add DNS records (SPF, DKIM, DMARC)
4. Verify domain

---

## Monitoring & Analytics

### Plausible Analytics

1. Create account at [plausible.io](https://plausible.io)
2. Add your domain
3. Add `VITE_PLAUSIBLE_DOMAIN` to environment variables
4. Redeploy

### Sentry (Optional)

For error monitoring:

1. Create project at [sentry.io](https://sentry.io)
2. Add `VITE_SENTRY_DSN` to environment variables
3. Uncomment Sentry client in `src/lib/clients/errors.ts`
4. Redeploy

---

## Database Setup (Supabase)

### 1. Create Project

Go to [supabase.com](https://supabase.com) → New Project

### 2. Run Schema

Copy contents of `src/db/schema.sql` → Supabase SQL Editor → Run

### 3. Get Credentials

Project Settings → API → Copy:
- **URL**: `https://xxxx.supabase.co`
- **Anon Key**: `eyJhbGci...`

### 4. Add to Environment Variables

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

### 5. Redeploy

```bash
vercel --prod
```

---

## Email Setup (Resend)

### 1. Create Account

Go to [resend.com](https://resend.com) → Sign Up

### 2. Verify Domain

Domains → Add Domain → Follow DNS instructions

### 3. Generate API Key

API Keys → Create API Key → Copy

### 4. Add to Environment Variables

```
VITE_RESEND_API_KEY=re_...
VITE_FROM_EMAIL=intake@yourdomain.com
VITE_NOTIFICATION_EMAIL=you@yourdomain.com
```

### 5. Redeploy

```bash
vercel --prod
```

---

## AI Setup (OpenAI)

### 1. Create Account

Go to [platform.openai.com](https://platform.openai.com) → Sign Up

### 2. Generate API Key

API Keys → Create New Secret Key → Copy

### 3. Add to Environment Variables

```
VITE_OPENAI_API_KEY=sk-proj-...
VITE_OPENAI_MODEL=gpt-4o-mini
```

**Note**: `gpt-4o-mini` is recommended for cost (~$0.0002 per conversation). Use `gpt-4o` for better quality.

### 4. Redeploy

```bash
vercel --prod
```

---

## Testing Deployment

### 1. Check Mock Mode (No API Keys)

Visit your site → Try AI demo → Check browser console → Should see `[MOCK]` logs

### 2. Check Real Mode (With API Keys)

Visit your site → Try AI demo → Check browser console → Should see `[REAL]` logs

### 3. Test Intake Form

1. Fill out intake form
2. Submit
3. Check:
   - Supabase dashboard (should see new row in `intake_submissions`)
   - Email inbox (should receive confirmation)
   - Your notification email (should receive internal notification)
   - Plausible dashboard (should see `intake_submitted` event)

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist
pnpm install
pnpm build
```

### Environment Variables Not Working

1. Check variable names (must start with `VITE_`)
2. Redeploy after adding variables
3. Check browser console for errors

### Email Not Sending

1. Verify domain in Resend dashboard
2. Check DNS records (SPF, DKIM, DMARC)
3. Check API key is correct
4. Check `VITE_FROM_EMAIL` matches verified domain

### AI Not Working

1. Check API key is valid
2. Check OpenAI account has credits
3. Check browser console for errors
4. Try switching to mock mode to isolate issue

---

## Multi-Client Deployment

### For Each New Client

1. Clone repository
2. Update `src/config/brand.ts`
3. Update `src/config/packages.ts`
4. Create new Vercel project
5. Add client-specific environment variables
6. Deploy

**Time: ~10 minutes per client**

---

## Support

For deployment issues, contact: hello@velaristudiosystems.com
