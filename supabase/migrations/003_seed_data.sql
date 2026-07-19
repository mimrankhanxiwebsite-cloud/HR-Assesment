-- Seed Subscription Plans
INSERT INTO public.subscription_plans (name, price_monthly, features) VALUES
('Basic', 99, '{"searches": 100, "reports": "standard"}'),
('Professional', 299, '{"searches": "unlimited", "reports": "advanced"}'),
('Enterprise', 999, '{"api_access": true, "white_label": true, "support": "dedicated"}');

-- Seed Skills
INSERT INTO public.skills (name, category) VALUES
('React', 'Frontend'),
('TypeScript', 'Frontend'),
('Node.js', 'Backend'),
('PostgreSQL', 'Database'),
('Python', 'Backend'),
('Docker', 'DevOps'),
('AWS', 'Cloud'),
('System Design', 'Architecture'),
('Algorithms', 'Computer Science');

-- Seed Assessments
INSERT INTO public.assessments (title, description, category, difficulty, duration_minutes, total_score, is_published) VALUES
('Full Stack Developer Assessment', 'Comprehensive test covering React, Node.js, and DB design.', 'Full Stack Development', 'mid', 90, 100, true),
('Frontend Engineer Assessment', 'Test focusing on React, CSS, and web performance.', 'Front-End Development', 'senior', 60, 100, true),
('Backend System Design', 'Architecture and database design challenges.', 'Back-End Development', 'advanced', 120, 100, true);

-- Seed Assessment Configs
INSERT INTO public.assessment_configs (assessment_id, category, difficulty, question_count)
SELECT id, 'Frontend', 'medium', 10 FROM public.assessments WHERE title = 'Full Stack Developer Assessment';

INSERT INTO public.assessment_configs (assessment_id, category, difficulty, question_count)
SELECT id, 'Backend', 'medium', 10 FROM public.assessments WHERE title = 'Full Stack Developer Assessment';
