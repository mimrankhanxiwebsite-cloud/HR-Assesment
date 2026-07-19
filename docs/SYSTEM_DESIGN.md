# System Design & Architecture

## Architecture Overview
The system follows a modern **Serverless Cloud-Native Architecture** utilizing Vercel for the frontend and Supabase (PostgreSQL + Edge Functions + Auth + Storage) for the backend.

### 1. Frontend Layer (Vercel)
* **Framework**: React 18, TypeScript, Vite.
* **Routing**: React Router v6.
* **State Management**: Zustand (Global Auth/UI State) + React Query (Server State Caching).
* **Styling**: Tailwind CSS + ShadCN UI components for consistent, accessible design.

### 2. Backend Layer (Supabase)
* **Database**: Managed PostgreSQL with pgvector for AI semantic search.
* **Authentication**: Supabase Auth (JWT, OAuth, MFA).
* **Storage**: Supabase Storage for Resumes (PDFs) and generated Certificates.
* **Realtime**: Supabase Realtime for live exam timer sync and proctoring events.

### 3. AI & Compute Layer (Supabase Edge Functions)
* **AI Code Review**: Edge Function calling OpenAI GPT-4o.
* **Resume Parsing**: Edge Function calling OpenAI GPT-4o Vision/Text.
* **Code Execution**: Edge Function interfacing with Piston API to run untrusted code in secure, isolated Docker containers.

### 4. Third-Party Integrations
* **Stripe**: Subscription billing and usage metering.
* **Piston API**: Multi-language code execution.
* **OpenAI API**: AI features.

---

## High-Level Data Flow (Assessment Submission)
1. Candidate submits code via Monaco Editor on Frontend.
2. Frontend sends request to `code-executor` Edge Function.
3. Edge Function forwards payload to Piston API.
4. Piston API executes code and returns stdout/stderr/exit code.
5. Edge Function evaluates test cases, computes score, and triggers `ai-code-review` Function.
6. GPT-4o returns code health analysis.
7. Edge Function writes final results directly to PostgreSQL `code_submissions` and `code_reviews` tables.
8. Frontend detects change via React Query / Realtime and updates UI.
