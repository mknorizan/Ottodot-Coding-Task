# Ottodot-Coding-Task
Ottodot Coding Math Problem Generator - Developer Assessment Starter Kit

# Assessment Submission

SUPABASE_URL: https://kpfwmtklmmowdhdvdsls.supabase.co

SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZndtdGtsbW1vd2RoZHZkc2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1NDAxMDgsImV4cCI6MjA3NTExNjEwOH0.cxY2rjQWWtWdBUDFtAEwtcdXp8dGUApH2zjS71XXR5s

# Assessment Submission

## Implementation

1. Full-Stack Separation
- Implementation: The use of the Next.js App Router for the backend API ensures a clear separation between the client-side UI and the server-side logic.
- Design Decision: This approach provides a secure environment for handling sensitive operations. The Gemini API key is kept server-side, preventing exposure to the browser.

2. Clear Database Schema
- Implementation: The `database.sql` file shows the explicit schema for storing problems `math_problem_sessions` and user attempts `math_problem_submissions`.
- Design Decision: Separating the schema into two tables is a robust design. This allows for 1:M (one-to-many) relationship, where one generated problem session can have multiple user submissions (e.g., if a user attempts a problem more than once or fails the first try), providing a clean audit trail.

## Challenges Faced
1. LLM Output Reliability and Parsing
- CHallenge: The most significant challenge in any LLM-based structured data task is ensuring the model consistently returns valid, predictable JSON. Models sometimes hallucinate or return natural language alongside the JSON block.

## Proud Features

1. Robust Server-Side LLM Wrapper
- The logic that calls the Gemini API is a source of pride. Successfully engineering the prompt to reliably generate a complex math problem and return a structured response demonstrates mastery over prompt engineering for structured data extraction.

2. End-to-End Type Safety
- The use of TypeScript end-to-end ensures that the entire data flow is type-checked. This drastically reduces the likelihood of introducing integration bugs, a key marker of professional development.

3. Clean Separation of Concerns
- The clean organization into `app/api`, `lib`, and database-specific files ensures that the codebase is highly maintainable and scalable. New features can be introduced without disrupting existing core logic.
