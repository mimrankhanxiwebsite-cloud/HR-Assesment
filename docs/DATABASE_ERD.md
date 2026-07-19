# Database Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USERS ||--o{ CANDIDATES : "is a"
    USERS ||--o{ ORG_MEMBERS : "belongs to"
    ORGANIZATIONS ||--o{ ORG_MEMBERS : "has"
    ORGANIZATIONS ||--o| SUBSCRIPTIONS : "has"
    
    CANDIDATES ||--o{ CANDIDATE_SKILLS : "possesses"
    SKILLS ||--o{ CANDIDATE_SKILLS : "assigned to"
    
    CANDIDATES ||--o{ ASSESSMENT_ATTEMPTS : "takes"
    ASSESSMENTS ||--o{ ASSESSMENT_ATTEMPTS : "generates"
    ASSESSMENTS ||--o{ ASSESSMENT_CONFIGS : "configured by"
    
    QUESTIONS ||--o{ QUESTION_OPTIONS : "has"
    SKILLS ||--o{ QUESTIONS : "categorizes"
    
    ASSESSMENT_ATTEMPTS ||--o{ CODE_SUBMISSIONS : "contains"
    QUESTIONS ||--o{ CODE_SUBMISSIONS : "answers"
    
    CODE_SUBMISSIONS ||--o| CODE_REVIEWS : "analyzed by"
    
    CANDIDATES ||--o{ CERTIFICATIONS : "earns"
    ASSESSMENTS ||--o{ CERTIFICATIONS : "awards"
    
    SUBSCRIPTION_PLANS ||--o{ SUBSCRIPTIONS : "defines"
```

## Key Entities
* `users`: Base table synced with Supabase Auth.
* `organizations`: Company profiles.
* `candidates`: Extended user profile for job seekers.
* `skills` & `candidate_skills`: Many-to-many relationship for talent tracking.
* `assessments`: Exam templates.
* `assessment_attempts`: Instances of a candidate taking an exam.
* `code_submissions`: Individual coding answers within an attempt.
* `code_reviews`: AI-generated feedback attached to code submissions.
