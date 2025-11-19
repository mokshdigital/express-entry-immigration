# Technology Stack & Decisions

## Frontend Stack

### Core
- **Framework:** Next.js 14.0+
- **React Version:** 18.2+
- **TypeScript:** Yes
- **Node Version:** 24.11.0

### Styling
- **CSS Framework:** Tailwind CSS 3.4.1 (downgraded from v4 for shadcn/ui compatibility)
- **Component Library:** shadcn
- **Animation:** Framer Motion
- **Fonts:** Google Fonts (Montserrat, Open Sans via next/font)

### Data & State
- **API Communication:** fetch API with custom hooks
- **Data Fetching:** Server-side in Next.js pages/components
- **State Management:** React hooks (useState, useContext)

### SEO & Performance
- **SEO Package:** next-seo
- **Image Optimization:** Next.js Image component
- **Analytics:** Google Analytics 4, GTM, Facebook Pixel (manual injection)

### Forms
- **Email Service:** Resend
- **Validation:** React Hook Form + Zod (to be added in Phase 8)

## Backend Stack (WordPress)

### Core
- **CMS:** WordPress 6.8.3+
- **Hosting:** Hostinger Agency Plan (Shared)
- **URL:** cms.expressentryimmigration.ca
- **API:** WordPress REST API (built-in)

### Plugins (Essential)
1. **Advanced Custom Fields (Free)** - Custom content fields
2. **Rank Math SEO** - SEO management
3. **Classic Editor** - Simplified editing experience
4. **LiteSpeed Cache** - Performance caching

### Content Structure
- **Custom Post Types:** Services, Testimonials, FAQs, Blogs
- **Custom Fields:** Via ACF (hero settings, stats, contact info, etc.)

## Hosting & Deployment

### Frontend
- **Platform:** Vercel
- **Plan:** Hobby (Free)
- **Domain:** expressentryimmigration.ca
- **Deployment:** Auto-deploy from GitHub main branch
- **SSL:** Automatic (Vercel)

### Backend
- **Platform:** Hostinger
- **Plan:** Agency (Shared Business)
- **Domain:** cms.expressentryimmigration.ca
- **SSL:** Hostinger-provided

## Development Tools
- **IDE:** Cursor
- **AI Assistant:** Claude (Projects)
- **Version Control:** Git + GitHub
- **Package Manager:** npm

## Rendering Strategy
- **Method:** Static Site Generation (SSG) with Incremental Static Regeneration (ISR)
- **Revalidation:** 60 seconds
- **Rationale:** Best performance + fresh content for immigration consulting site

## Key Architectural Decisions

### Why WordPress Headless?
- Client needs familiar CMS interface
- Robust content management
- Existing hosting supports PHP/WordPress
- REST API well-documented

### Why Next.js over vanilla React?
- Built-in SSG/ISR for performance
- Excellent SEO capabilities
- Image optimization out of the box
- API routes if needed
- Vercel deployment synergy

### Why Tailwind CSS?
- Rapid development
- AI tools excel at generating Tailwind code
- Utility-first approach
- Highly customizable
- Small production bundle

### Why shadcn/ui?
- Copy-paste components (you own the code)
- Built on Radix UI (accessible)
- Perfect integration with Tailwind
- No vendor lock-in
- AI-friendly

### Why Framer Motion?
- All required animations (parallax, count-up, flip cards, etc.)
- React-native
- Excellent documentation
- AI tools know it well
- Performance optimized

### Why Rank Math (not Yoast)?
- More features in free version
- Better schema markup
- Modern interface
- AI-friendly content analysis