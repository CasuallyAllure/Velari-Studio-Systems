# Velari Systems

Swedish-minimalist website template with built-in AI intake and automation. Production-ready, client-reusable SaaS starter.

## Features

- **🎨 Theme System**: Three industry themes (Swedish Minimal, Industrial Services, Modern Tech) with runtime switching
- **🤖 AI-Powered Intake**: Theme-aware chat assistant that adapts tone based on selected industry
- **📝 Multi-Step Forms**: Validated intake forms with Zod schemas and real-time feedback
- **🔌 Connector Architecture**: Clean abstractions for email (Resend), database (Supabase), AI (OpenAI), and analytics (Plausible)
- **🎭 Mock-First Development**: All connectors work with mocks by default, activate real services via environment variables
- **♻️ Client-Reusable**: Clone for new clients, change 4 config files, deploy in 10 minutes
- **📱 Mobile-First**: Fully responsive design with Tailwind CSS
- **⚡ Fast**: Vite + React + TypeScript for instant HMR and type safety
- **🌉 Scroll World Hero**: A continuous, scroll-scrubbed flight from downtown San Francisco to the Golden Gate Bridge, with dedicated desktop and mobile renders

## Tech Stack

- **Frontend**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + class-variance-authority
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend
- **AI**: OpenAI (gpt-4o-mini)
- **Analytics**: Plausible
- **Validation**: Zod
- **Icons**: Lucide React

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/CasuallyAllure/Velari-Studio-Systems.git
cd Velari-Studio-Systems
pnpm install
```

### 2. Run Development Server

```bash
pnpm dev
```

The site will run at `http://localhost:5173` with **all mocks enabled** (no API keys needed).

### 3. (Optional) Connect Real Services

Copy `.env.example` to `.env.local` and add your API keys:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
VITE_PLAUSIBLE_DOMAIN=velariss.co
RESEND_API_KEY=re_...
FROM_EMAIL=estimates@velariss.co
NOTIFICATION_EMAIL=info@velariss.co
OPENAI_API_KEY=sk-proj-...
```

**Note**: Secrets without the `VITE_` prefix are server-only. The browser demo stays on mocks until the protected estimate endpoint is connected.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Button, Card, Input primitives
│   ├── layout/         # Header, Footer, Section
│   └── homepage/       # Landing page sections
├── features/           # Domain-specific features
│   ├── intake/         # Multi-step intake form
│   ├── ai-demo/        # AI chat interface
│   └── theme/          # Theme system
├── lib/
│   ├── clients/        # Service abstractions (email, ai, db, analytics)
│   ├── mocks/          # Mock implementations
│   ├── types/          # TypeScript types
│   └── utils/          # Helper functions
├── config/             # 🔄 CHANGE FOR EACH CLIENT
│   ├── brand.ts        # Company name, colors, contact info
│   └── packages.ts     # Pricing packages
└── db/
    └── schema.sql      # Supabase database schema
```

## Multi-Client Reuse

This template is designed to be cloned for each client. Here's how:

### 1. Clone for New Client

```bash
git clone https://github.com/CasuallyAllure/Velari-Studio-Systems.git joes-plumbing-site
cd joes-plumbing-site
```

### 2. Update Brand Config

Edit `src/config/brand.ts`:

```typescript
export const brand = {
  company_name: "Joe's Plumbing & Heating",
  tagline: "24/7 emergency service with instant booking",
  email: "service@joesplumbing.com",
  phone: "+1 (555) 987-6543",
  default_theme: "industrial_services",
};
```

### 3. Update Packages

Edit `src/config/packages.ts`:

```typescript
packages[0].name = "Basic Website"
packages[1].name = "Dispatch System"
packages[1].features = [
  "Online booking calendar",
  "SMS notifications",
  "Customer portal",
  // ...
]
```

### 4. Set Environment Variables

Create `.env.local` with client-specific values. Keep email and AI credentials on the server:

```env
VITE_SUPABASE_URL=https://joes-plumbing.supabase.co
FROM_EMAIL=service@joesplumbing.com
NOTIFICATION_EMAIL=joe@joesplumbing.com
```

### 5. Deploy

```bash
vercel --prod
```

**Total time: ~10 minutes from clone to live site.**

## Connector Integration

### Supabase (Database)

1. Create project at [supabase.com](https://supabase.com)
2. Run `src/db/schema.sql` in SQL Editor
3. Copy URL and anon key to `.env.local`

**Mock behavior**: Uses `localStorage` for persistence

### Resend (Email)

1. Create account at [resend.com](https://resend.com)
2. Verify your domain (add DNS records)
3. Generate API key and add to `.env.local`

**Mock behavior**: Logs emails to console

### OpenAI (AI)

1. Create account at [platform.openai.com](https://platform.openai.com)
2. Generate API key
3. Add to `.env.local`

**Mock behavior**: Uses theme-aware template responses

### Plausible (Analytics)

1. Create account at [plausible.io](https://plausible.io)
2. Add your domain
3. Add domain to `.env.local`

**Mock behavior**: Logs events to console

## Development

### San Francisco Scroll World

The homepage hero uses pre-rendered Blender camera animation for consistent visual quality and smooth browser playback. The editable scene, render scripts, web encodes, and implementation live here:

- `assets-3d/sf-scroll-world/exports/velari-sf-scrollworld-final-master.blend` — editable Blender master
- `assets-3d/sf-scroll-world/working/build_sf_scrollworld_final.py` — deterministic world builder
- `assets-3d/sf-scroll-world/working/render_sf_scrollworld_assets.py` — desktop and mobile renderer
- `assets-3d/sf-scroll-world/working/encode_sf_scrollworld_assets.sh` — web-video encoder
- `public/assets/scrollworld/` — production MP4 and poster assets
- `src/components/homepage/HeroSection.tsx` — responsive scroll-scrub implementation
- `docs/sf-scroll-world-hero-master-plan.md` — story, camera, mobile, and performance specification

Building geometry is derived from © OpenStreetMap contributors. Elevation and LiDAR reference data comes from the USGS 3D Elevation Program.

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Type Check

```bash
pnpm tsc
```

### Lint

```bash
pnpm lint
```

## Architecture Decisions

### Why Supabase?

- Full BaaS with auth, storage, and edge functions
- Better for client-reusable template (one service vs. multiple)
- Generous free tier
- Built-in Row Level Security (RLS)

### Why Mock-First?

- Zero setup required for development
- Easy to demo without API keys
- Gradual activation (add keys when ready)
- Same codebase for dev and prod

### Why Client Abstraction?

- Swappable services (Resend → SendGrid is one file change)
- UI components never touch external APIs
- Easy to test (mock entire service)
- Clear integration points

## Deployment

### Vercel (Recommended)

```bash
vercel --prod
```

Add environment variables in Vercel dashboard.

### Other Platforms

Build static files:

```bash
pnpm build
```

Deploy `dist/` folder to any static host (Netlify, Cloudflare Pages, etc.).

## License

MIT

## Support

For questions or issues, contact: info@velariss.co
