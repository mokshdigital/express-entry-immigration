# Express Entry Immigration Services - Frontend

Next.js 14 frontend application for Express Entry Immigration Services website.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS 3.x
- shadcn/ui
- Framer Motion

## Getting Started

### Install Dependencies
```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in values:
```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_WORDPRESS_API_URL` - WordPress REST API URL
- `NEXT_PUBLIC_ACF_API_URL` - ACF REST API URL
- `RESEND_API_KEY` - Resend API key for contact forms

### Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## Project Structure
```
src/
├── app/                 # App router pages
├── components/          # React components
│   ├── layout/         # Layout components (Header, Footer)
│   ├── sections/       # Page sections (Hero, Services, etc.)
│   └── ui/             # shadcn/ui components
├── lib/                # Utilities
│   ├── api/           # WordPress API functions
│   └── utils/         # Helper functions
├── types/              # TypeScript types
└── styles/             # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## WordPress API Integration

All data is fetched from WordPress headless CMS via REST API with ISR (Incremental Static Regeneration) for optimal performance.