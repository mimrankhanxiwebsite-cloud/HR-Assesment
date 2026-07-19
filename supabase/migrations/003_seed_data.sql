-- Comprehensive Seed Data for HR Assessment Platform

-- ============================================================
-- SUBSCRIPTION PLANS
-- ============================================================
INSERT INTO subscription_plans (id, name, slug, price_monthly, price_annual, max_assessments_per_month, max_team_members, features, is_active) VALUES
  (gen_random_uuid(), 'Starter', 'starter', 49.00, 470.00, 50, 5, '{"ai_review": false, "advanced_analytics": false, "custom_branding": false, "sso": false}', true),
  (gen_random_uuid(), 'Professional', 'professional', 149.00, 1430.00, 500, 25, '{"ai_review": true, "advanced_analytics": true, "custom_branding": false, "sso": false}', true),
  (gen_random_uuid(), 'Enterprise', 'enterprise', 499.00, 4790.00, null, null, '{"ai_review": true, "advanced_analytics": true, "custom_branding": true, "sso": true, "audit_logs": true, "dedicated_support": true}', true)
ON CONFLICT DO NOTHING;

-- ============================================================
-- SKILLS LIBRARY
-- ============================================================
INSERT INTO skills (id, name, category, description) VALUES
  (gen_random_uuid(), 'React', 'Frontend', 'React.js library for building user interfaces'),
  (gen_random_uuid(), 'TypeScript', 'Languages', 'Typed superset of JavaScript'),
  (gen_random_uuid(), 'JavaScript', 'Languages', 'Core web programming language'),
  (gen_random_uuid(), 'Node.js', 'Backend', 'JavaScript runtime for server-side development'),
  (gen_random_uuid(), 'Python', 'Languages', 'General-purpose programming language'),
  (gen_random_uuid(), 'PostgreSQL', 'Database', 'Advanced open-source relational database'),
  (gen_random_uuid(), 'System Design', 'Architecture', 'Designing scalable distributed systems'),
  (gen_random_uuid(), 'Docker', 'DevOps', 'Containerization platform'),
  (gen_random_uuid(), 'AWS', 'Cloud', 'Amazon Web Services cloud platform'),
  (gen_random_uuid(), 'Algorithms', 'Computer Science', 'Data structures and algorithm design'),
  (gen_random_uuid(), 'SQL', 'Database', 'Structured Query Language for databases'),
  (gen_random_uuid(), 'REST APIs', 'Backend', 'RESTful API design and implementation'),
  (gen_random_uuid(), 'GraphQL', 'Backend', 'Query language for APIs'),
  (gen_random_uuid(), 'CSS', 'Frontend', 'Cascading Style Sheets for web styling'),
  (gen_random_uuid(), 'Git', 'DevOps', 'Version control system'),
  (gen_random_uuid(), 'Java', 'Languages', 'Object-oriented programming language'),
  (gen_random_uuid(), 'C#', 'Languages', 'Microsoft .NET programming language'),
  (gen_random_uuid(), 'Kubernetes', 'DevOps', 'Container orchestration platform'),
  (gen_random_uuid(), 'Redis', 'Database', 'In-memory data structure store'),
  (gen_random_uuid(), 'Machine Learning', 'AI', 'ML algorithms and model training')
ON CONFLICT DO NOTHING;

-- ============================================================
-- ASSESSMENTS
-- ============================================================
INSERT INTO assessments (id, title, description, category, difficulty, duration_minutes, total_score, passing_score, is_active, is_randomized, questions_per_exam) VALUES
  ('asm-react-senior', 'React & TypeScript — Senior Level', 'Advanced assessment covering React hooks, patterns, TypeScript generics, performance optimization, and testing.', 'Frontend Development', 'senior', 90, 500, 350, true, true, 25),
  ('asm-node-mid', 'Node.js & REST API Design — Mid Level', 'Tests REST API design principles, Express.js, middleware, authentication, and error handling.', 'Backend Engineering', 'mid', 60, 350, 245, true, true, 20),
  ('asm-sql-senior', 'PostgreSQL & Query Optimization — Senior', 'Advanced SQL including window functions, CTEs, indexing strategies, and query performance tuning.', 'Data Engineering', 'senior', 75, 450, 315, true, true, 22),
  ('asm-algo-mid', 'Data Structures & Algorithms — Mid Level', 'Arrays, linked lists, trees, graphs, sorting algorithms, dynamic programming.', 'Computer Science', 'mid', 90, 400, 280, true, true, 20),
  ('asm-system-advanced', 'System Design — Advanced', 'Design large-scale distributed systems covering CAP theorem, consistency patterns, caching, load balancing.', 'System Design', 'advanced', 120, 600, 420, true, true, 15),
  ('asm-python-junior', 'Python Fundamentals — Junior', 'Core Python concepts including data types, OOP, file I/O, exceptions, and standard library.', 'Backend Engineering', 'junior', 45, 250, 175, true, true, 15),
  ('asm-devops-senior', 'Docker & Kubernetes — Senior', 'Container orchestration, Dockerfile best practices, K8s deployments, services, and ingress.', 'Cloud & DevOps', 'senior', 90, 500, 350, true, true, 25),
  ('asm-js-junior', 'JavaScript Fundamentals — Junior', 'Core JS concepts: closures, prototypes, async/await, DOM, ES6+ features.', 'Frontend Development', 'junior', 45, 200, 140, true, true, 15)
ON CONFLICT DO NOTHING;

-- ============================================================
-- QUESTIONS — React/TypeScript Assessment
-- ============================================================
INSERT INTO questions (id, title, description, type, difficulty, category, correct_answer, points, time_limit_seconds, is_active) VALUES
  (gen_random_uuid(), 'What is a closure in JavaScript?', 'Which of the following best describes a closure in JavaScript?', 'mcq', 'mid', 'Frontend Development', 'opt-closure-correct', 10, 60, true),
  (gen_random_uuid(), 'React useCallback hook purpose', 'What is the primary purpose of the useCallback hook in React?', 'mcq', 'mid', 'Frontend Development', 'opt-usecb-correct', 10, 60, true),
  (gen_random_uuid(), 'TypeScript generics', 'TypeScript generics allow you to write functions that work with multiple types while maintaining type safety.', 'true_false', 'mid', 'Frontend Development', 'true', 5, 30, true),
  (gen_random_uuid(), 'React key prop requirement', 'When rendering lists in React, every element MUST have a unique key prop to avoid runtime errors.', 'true_false', 'junior', 'Frontend Development', 'false', 5, 30, true),
  (gen_random_uuid(), 'Implement debounce function', 'Write a debounce function that delays the execution of a callback until after a specified wait time has elapsed since the last call.

Example:
Input: fn = () => console.log("called"), wait = 300
Output: A function that only calls fn after 300ms of inactivity', 'coding', 'senior', 'Frontend Development', null, 50, 1800, true),
  (gen_random_uuid(), 'Flatten nested array', 'Write a function that deeply flattens a nested array of any depth.

Input: [1, [2, [3, [4]], 5]]
Expected Output: [1, 2, 3, 4, 5]', 'coding', 'mid', 'Computer Science', null, 30, 900, true),
  (gen_random_uuid(), 'React virtual DOM', 'The React Virtual DOM is a lightweight JavaScript representation of the actual DOM that React uses to optimize UI updates.', 'true_false', 'junior', 'Frontend Development', 'true', 5, 30, true),
  (gen_random_uuid(), 'useState initial render', 'When does React call the useState initializer function?', 'mcq', 'mid', 'Frontend Development', 'opt-usestate-correct', 10, 60, true),
  (gen_random_uuid(), 'TypeScript interface vs type', 'What is the key difference between TypeScript interface and type alias?', 'mcq', 'senior', 'Frontend Development', 'opt-ts-correct', 15, 90, true),
  (gen_random_uuid(), 'CSS Box Model', 'In the CSS box model, what does the padding property affect?', 'mcq', 'junior', 'Frontend Development', 'opt-css-correct', 5, 45, true),
  (gen_random_uuid(), 'Implement FizzBuzz', 'Write a function fizzBuzz(n) that prints numbers from 1 to n. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", for multiples of both print "FizzBuzz".

Input: 15
Expected Output: 1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz', 'coding', 'junior', 'Computer Science', null, 20, 600, true),
  (gen_random_uuid(), 'Reverse a linked list', 'Write a function to reverse a singly linked list.

Given: 1 -> 2 -> 3 -> 4 -> 5 -> null
Return: 5 -> 4 -> 3 -> 2 -> 1 -> null', 'coding', 'mid', 'Algorithms', null, 40, 1200, true),
  (gen_random_uuid(), 'What is memoization?', 'Memoization is an optimization technique where the results of expensive function calls are cached and returned when the same inputs occur again.', 'true_false', 'mid', 'Computer Science', 'true', 5, 30, true),
  (gen_random_uuid(), 'SQL vs NoSQL', 'Which of the following scenarios is BEST suited for a NoSQL database?', 'mcq', 'mid', 'Database', 'opt-nosql-correct', 10, 60, true),
  (gen_random_uuid(), 'REST HTTP Methods', 'Which HTTP method is IDEMPOTENT and used to fully replace a resource?', 'mcq', 'junior', 'Backend', 'opt-rest-correct', 10, 45, true)
ON CONFLICT DO NOTHING;

-- ============================================================
-- QUESTION OPTIONS — MCQ Choices
-- ============================================================
-- Closure question options
INSERT INTO question_options (id, question_id, content, is_correct, order_index) 
SELECT gen_random_uuid(), q.id, 'A function that has access to its outer scope even after the outer function has returned', true, 1
FROM questions q WHERE q.title = 'What is a closure in JavaScript?' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO question_options (id, question_id, content, is_correct, order_index) 
SELECT gen_random_uuid(), q.id, 'A function that closes the browser window when called', false, 2
FROM questions q WHERE q.title = 'What is a closure in JavaScript?' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO question_options (id, question_id, content, is_correct, order_index) 
SELECT gen_random_uuid(), q.id, 'A method to close database connections', false, 3
FROM questions q WHERE q.title = 'What is a closure in JavaScript?' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO question_options (id, question_id, content, is_correct, order_index) 
SELECT gen_random_uuid(), q.id, 'A way to encapsulate CSS styles in a component', false, 4
FROM questions q WHERE q.title = 'What is a closure in JavaScript?' LIMIT 1
ON CONFLICT DO NOTHING;

-- useCallback question options
INSERT INTO question_options (id, question_id, content, is_correct, order_index) 
SELECT gen_random_uuid(), q.id, 'To memoize a function so it only changes if its dependencies change, preventing unnecessary re-renders', true, 1
FROM questions q WHERE q.title = 'React useCallback hook purpose' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO question_options (id, question_id, content, is_correct, order_index) 
SELECT gen_random_uuid(), q.id, 'To create a new callback function on every render for better performance', false, 2
FROM questions q WHERE q.title = 'React useCallback hook purpose' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO question_options (id, question_id, content, is_correct, order_index) 
SELECT gen_random_uuid(), q.id, 'To call an API endpoint when a component mounts', false, 3
FROM questions q WHERE q.title = 'React useCallback hook purpose' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO question_options (id, question_id, content, is_correct, order_index) 
SELECT gen_random_uuid(), q.id, 'To handle user callbacks in forms', false, 4
FROM questions q WHERE q.title = 'React useCallback hook purpose' LIMIT 1
ON CONFLICT DO NOTHING;

-- SQL vs NoSQL options
INSERT INTO question_options (id, question_id, content, is_correct, order_index) 
SELECT gen_random_uuid(), q.id, 'Storing user activity logs with rapidly changing schema and high write throughput', true, 1
FROM questions q WHERE q.title = 'SQL vs NoSQL' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO question_options (id, question_id, content, is_correct, order_index) 
SELECT gen_random_uuid(), q.id, 'Managing financial transactions requiring ACID compliance', false, 2
FROM questions q WHERE q.title = 'SQL vs NoSQL' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO question_options (id, question_id, content, is_correct, order_index) 
SELECT gen_random_uuid(), q.id, 'Storing relational data with complex multi-table joins', false, 3
FROM questions q WHERE q.title = 'SQL vs NoSQL' LIMIT 1
ON CONFLICT DO NOTHING;

-- REST HTTP methods options
INSERT INTO question_options (id, question_id, content, is_correct, order_index) 
SELECT gen_random_uuid(), q.id, 'PUT', true, 1
FROM questions q WHERE q.title = 'REST HTTP Methods' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO question_options (id, question_id, content, is_correct, order_index) 
SELECT gen_random_uuid(), q.id, 'POST', false, 2
FROM questions q WHERE q.title = 'REST HTTP Methods' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO question_options (id, question_id, content, is_correct, order_index) 
SELECT gen_random_uuid(), q.id, 'PATCH', false, 3
FROM questions q WHERE q.title = 'REST HTTP Methods' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO question_options (id, question_id, content, is_correct, order_index) 
SELECT gen_random_uuid(), q.id, 'DELETE', false, 4
FROM questions q WHERE q.title = 'REST HTTP Methods' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================================
-- ASSESSMENT CONFIGS — Link questions to assessments (randomized pools)
-- ============================================================
INSERT INTO assessment_configs (id, assessment_id, question_id, weight, is_required)
SELECT gen_random_uuid(), 'asm-react-senior', q.id, 1.0, false
FROM questions q
WHERE q.category IN ('Frontend Development', 'Computer Science')
AND q.is_active = true
ON CONFLICT DO NOTHING;

INSERT INTO assessment_configs (id, assessment_id, question_id, weight, is_required)
SELECT gen_random_uuid(), 'asm-algo-mid', q.id, 1.0, false
FROM questions q
WHERE q.category IN ('Algorithms', 'Computer Science')
AND q.is_active = true
ON CONFLICT DO NOTHING;
