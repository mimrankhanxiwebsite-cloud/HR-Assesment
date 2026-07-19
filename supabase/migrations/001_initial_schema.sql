-- Users table (extends auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('candidate', 'recruiter', 'hiring_manager', 'org_admin', 'platform_admin')),
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organizations
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  website TEXT,
  logo_url TEXT,
  subscription_status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organization Members (Recruiters, Hiring Managers, Admins)
CREATE TABLE public.org_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('recruiter', 'hiring_manager', 'org_admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_id, user_id)
);

-- Candidate Profiles
CREATE TABLE public.candidates (
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE PRIMARY KEY,
  headline TEXT,
  bio TEXT,
  location TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  resume_url TEXT,
  experience_level TEXT CHECK (experience_level IN ('junior', 'mid', 'senior', 'advanced')),
  years_of_experience INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills Master List
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL
);

-- Candidate Skills
CREATE TABLE public.candidate_skills (
  candidate_id UUID REFERENCES public.candidates(user_id) ON DELETE CASCADE,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  proficiency_score INTEGER, -- 0-100
  is_verified BOOLEAN DEFAULT false,
  PRIMARY KEY (candidate_id, skill_id)
);

-- Question Bank
CREATE TABLE public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('mcq', 'true_false', 'fill_blank', 'scenario', 'coding')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  category TEXT NOT NULL, -- e.g., Frontend, Backend, Database
  skill_id UUID REFERENCES public.skills(id),
  time_limit_seconds INTEGER DEFAULT 120,
  weightage INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Question Options (for MCQ)
CREATE TABLE public.question_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false
);

-- Assessments (Templates)
CREATE TABLE public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('junior', 'mid', 'senior', 'advanced')),
  duration_minutes INTEGER NOT NULL,
  total_score INTEGER NOT NULL,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assessment Configurations (Rule-based random generation)
CREATE TABLE public.assessment_configs (
  assessment_id UUID REFERENCES public.assessments(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  question_count INTEGER NOT NULL,
  PRIMARY KEY (assessment_id, category, difficulty)
);

-- Assessment Attempts
CREATE TABLE public.assessment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID REFERENCES public.assessments(id) ON DELETE CASCADE,
  candidate_id UUID REFERENCES public.candidates(user_id) ON DELETE CASCADE,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'timeout', 'terminated')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  score_technical NUMERIC,
  score_coding NUMERIC,
  score_composite NUMERIC,
  ai_review_score NUMERIC,
  skill_level TEXT, -- e.g., 'Expert', 'Advanced'
  security_flags JSONB -- e.g., tab switches, copy-paste
);

-- Code Submissions
CREATE TABLE public.code_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID REFERENCES public.assessment_attempts(id) ON DELETE CASCADE,
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  language TEXT NOT NULL,
  code TEXT NOT NULL,
  execution_time_ms INTEGER,
  memory_used_kb INTEGER,
  passed_test_cases INTEGER,
  total_test_cases INTEGER,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Code Reviews
CREATE TABLE public.code_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES public.code_submissions(id) ON DELETE CASCADE,
  quality_score INTEGER,
  security_score INTEGER,
  maintainability_score INTEGER,
  performance_score INTEGER,
  feedback_markdown TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certifications
CREATE TABLE public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID REFERENCES public.candidates(user_id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES public.assessments(id),
  title TEXT NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  certificate_url TEXT,
  verification_hash TEXT UNIQUE
);

-- Subscriptions & Billing
CREATE TABLE public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- Basic, Professional, Enterprise
  stripe_price_id TEXT,
  price_monthly NUMERIC,
  features JSONB
);

CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES public.subscription_plans(id),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
