# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start development server with hot reload (currently runs on port 5001)
- `npm run build` - Build production bundle (client + server)
- `npm start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes using Drizzle

## Architecture

This is a full-stack React application with Express backend:

**Frontend (client/)**
- React 18 with TypeScript
- Wouter for routing (lightweight alternative to React Router)
- TanStack Query for data fetching and caching
- Radix UI components with Tailwind CSS styling
- Framer Motion for animations
- React Hook Form with Zod validation

**Backend (server/)**
- Express.js server with TypeScript
- Serves both API routes and static client files
- Development uses Vite dev server, production serves built files
- Request logging middleware for API calls
- Error handling middleware

**Database (db/)**
- Drizzle ORM with PostgreSQL
- Schema defined in `db/schema.ts`
- Currently has basic user table with username/password

**Key Architecture Patterns:**
- Single port deployment (5000) serves both frontend and API
- API routes prefixed with `/api`
- Development and production builds handled differently in server setup
- Shadcn/ui component library for consistent UI components

**Blog System:**
- `blogs/` - Markdown blog files (automatically parsed)
- `server/blog.ts` - Blog parsing and API logic
- `client/src/pages/blog.tsx` - Blog listing page
- `client/src/pages/blog-post.tsx` - Individual blog post page
- API endpoints: `/api/blog` (list) and `/api/blog/:slug` (individual post)

**File Structure:**
- `client/src/components/` - React components organized by feature
- `client/src/components/ui/` - Reusable UI components (Shadcn/ui)
- `client/src/pages/` - Route components
- `server/routes.ts` - API route definitions
- `server/blog.ts` - Blog content management