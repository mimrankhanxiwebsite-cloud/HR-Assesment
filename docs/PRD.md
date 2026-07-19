# Product Requirements Document (PRD)
## Technical Resource Screening & Assessment Platform

### 1. Executive Summary
The platform is a cloud-native SaaS application designed to streamline the technical hiring process. It provides automated coding evaluations, AI-powered code reviews, and centralized candidate talent repositories to help organizations benchmark candidate skills and drastically reduce hiring time.

### 2. User Roles & Capabilities
* **Candidate**: Register, manage profile, upload resume, take assessments, view rankings, download certs.
* **Recruiter**: Search candidates, create shortlists, export reports.
* **Hiring Manager**: Review reports, compare candidates, access code reviews.
* **Org Admin**: Manage subscriptions, analytics, and internal teams.
* **Platform Admin**: Manage question banks, monitor activity, oversee billing.

### 3. Core Modules
#### 3.1 Authentication & RBAC
* OAuth (Google, LinkedIn) + Email/Password.
* Multi-Factor Authentication (TOTP).
* Granular Role-Based Access Control.

#### 3.2 Candidate Profile
* Resumes processed via AI parser to auto-fill skills.
* Verified skills and certification gallery.

#### 3.3 Assessment Engine
* Support for MCQ, True/False, Scenario, and Coding Challenges.
* Timers (per question and overall).
* Randomized exams mapped to difficulty curves.
* Anti-cheat overlay (Fullscreen enforcement, tab switching detection).

#### 3.4 Online Coding Environment
* Integrated Monaco Editor.
* Multi-language support (Java, C#, Python, TS, etc.).
* Automated test case execution.

#### 3.5 AI Code Review & Scoring
* Code is analyzed by GPT-4o for complexity, readability, and security.
* Generates composite score: Tech Knowledge (40%) + Coding (40%) + AI Review (20%).

#### 3.6 Talent Analytics
* Heatmaps and demand trends across the organization.
* Skill benchmarking against market averages.

### 4. Non-Functional Requirements
* **Performance**: Load time < 2s, search < 3s, supports 100k+ concurrent users.
* **Security**: GDPR, SOC 2 controls, Encryption at rest/transit.
* **Availability**: 99.9% Uptime, automated backups.
