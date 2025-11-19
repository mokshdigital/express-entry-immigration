# Effective AI Prompts for Cursor

This document contains proven prompts to use with Cursor/Claude throughout the project.

## General Context-Setting Prompt

Use this at the START of every AntiGravity session:

I'm working on the Express Entry Immigration website project. Here's my current context:
[Copy entire CONTEXT.md file here]
I'm currently working on [specific task]. Can you help me with [specific question]?

## Phase-Specific Prompts

### Phase 4: Next.js Initialization
I need to initialize a Next.js 14 project with TypeScript, Tailwind CSS, and App Router.
Requirements:

TypeScript enabled
App Router (not Pages Router)
Tailwind CSS configured
src/ directory structure
Configure for WordPress API integration

Please provide the exact commands and initial configuration.

### Phase 5: API Integration
I need to create a WordPress REST API integration for my Next.js app.
Context:

WordPress URL: https://cms.expressentryimmigration.ca
Using REST API (not GraphQL)
Need to fetch: posts, pages, custom post types, ACF fields
SSG with ISR (revalidate every 60 seconds)

Please create:

API utility functions in /lib/wordpress.js
TypeScript types for WordPress responses
Example fetching function with error handling


### Phase 6: Component Creation
I need to create a [component name] component using:

React functional component with TypeScript
Tailwind CSS for styling
shadcn/ui components where applicable
Responsive design (mobile-first)
Accessibility best practices (ARIA labels, semantic HTML)

Requirements:
[List specific requirements]
Please provide the complete component code.

### Phase 7: Page Development
I need to create the [page name] page.
Context:

This is a Next.js App Router page
Data comes from WordPress API (endpoint: [endpoint])
Need SSG with ISR (revalidate: 60)
Responsive design required
SEO optimized with next-seo

Layout:
[Describe layout sections]
Please create the complete page with:

Server component for data fetching
Client components for interactive elements
Proper TypeScript types
SEO metadata


### Phase 8: Animation Implementation
I need to add [animation type] using Framer Motion.
Animation requirements:
[Describe animation behavior]
Component context:
[Describe where animation applies]
Please provide the Framer Motion implementation with:

Smooth, performant animations
Accessibility considerations (respects prefers-reduced-motion)
TypeScript types


### Debugging Prompts
I'm encountering this error:
[Paste error message]
Context:
[Describe what you were trying to do]
[Relevant code snippet]
My environment:

Next.js 14
Node 18.x
[Other relevant info]

What's causing this and how do I fix it?

## Tips for Effective Prompting

### ✅ DO:
- Always provide context (copy CONTEXT.md)
- Be specific about requirements
- Mention the tech stack explicitly
- Include error messages verbatim
- Describe the desired outcome clearly
- Reference existing code/patterns

### ❌ DON'T:
- Give vague instructions like "make it better"
- Forget to mention framework/library versions
- Assume the AI remembers previous conversations
- Ask for multiple unrelated changes at once
- Skip providing error messages or logs

## Context Preservation Template

When starting a new session after a break:

I'm resuming work on the Express Entry Immigration project.
Current Status:

Completed Phases: [list]
Current Phase: [phase number and name]
Last thing I completed: [description]

Tech Stack:

Frontend: Next.js 14 + Tailwind + shadcn/ui
Backend: WordPress Headless
Current issue: [if any]

Project structure:
express-entry-immigration/
├── frontend/                    # Next.js application
│   ├── src/
│   │   ├── app/                # App router pages
│   │   ├── components/         # React components
│   │   ├── lib/               # Utilities, API calls
│   │   ├── styles/            # Global styles
│   │   └── types/             # TypeScript types
│   ├── public/                # Static assets
│   ├── .env.local             # Environment variables (not committed)
│   ├── .env.example           # Example env file (committed)
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── package.json
├── docs/                       # Project documentation
│   ├── CONTEXT.md             # Current project state
│   ├── TECH-STACK.md          # Tech decisions
│   ├── API-REFERENCE.md       # WordPress API docs
│   ├── PHASE-LOG.md           # Phase completion tracker
│   ├── PROMPTS.md             # Effective AI prompts
│   └── HANDOFF.md             # Client documentation
├── wordpress-setup/            # WordPress configuration guides
│   ├── plugins-list.md
│   ├── acf-fields-export.json
│   └── setup-checklist.md
├── .gitignore
└── README.md

I'm working on the Express Entry Immigration website project. Here's my current context:

[Copy entire CONTEXT.md file here]

I'm currently working on [specific task]. Can you help me with [specific question]?



## Component Request Template
Create a [component name] component with these specifications:
Functionality:

[List functional requirements]

Styling:

Tailwind CSS
[Specific style requirements]
Responsive: [breakpoint behaviors]

Data:

Props: [list with types]
Data source: [if applicable]

Interactions:

[List user interactions]
[Animation requirements]

Accessibility:

[Specific a11y requirements]

Please provide:

Complete component code with TypeScript
Any necessary helper functions
Usage example


## API Function Request Template
Create an API utility function to fetch [data type] from WordPress.
Endpoint: [WordPress REST API endpoint]
Parameters: [query parameters needed]
Return Type: [TypeScript type]
Error Handling: [how to handle errors]
Caching: ISR with 60-second revalidation
Please include:

Function with TypeScript types
Error handling
Example usage
Comments explaining the code


---

**Remember:** The more context and specificity you provide, the better the AI can help you. Always paste CONTEXT.md at the start of sessions!