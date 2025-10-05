import { Database } from "../../schema/databaseSchema";

export type MathProblemSubmissionResponseDto = Database['public']['Tables']['math_problem_submissions']['Insert'];

export type MathProblemSessionResponseDto = Database['public']['Tables']['math_problem_sessions']['Insert'];