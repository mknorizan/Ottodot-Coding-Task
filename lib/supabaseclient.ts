import { createClient } from '@supabase/supabase-js'
import { Database } from '../database.types'
import { MathProblemRequestDto, MathProblemSubmissionRequestDto } from '../app/dtos/databaseDto/requestDto'
import { MathProblemSessionResponseDto, MathProblemSubmissionResponseDto } from '../app/dtos/databaseDto/responseDto'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function insertIntoMathProblemSession(mathProblem: MathProblemRequestDto): Promise<MathProblemSessionResponseDto> {
  
  const { data, error } = await supabase
                              .from('math_problem_sessions')
                              .insert({
                                  problem_text: mathProblem.problemText,
                                  correct_answer: mathProblem.answer
                              })
                              .select();

  if (error) {
    throw new Error(`Math Problem Session Insert Error: ${error}`);
  }

  return {
      id: data[0].id,
      created_at: data[0].created_at,
      problem_text: data[0].problem_text,
      correct_answer: data[0].correct_answer
  } as MathProblemSessionResponseDto;

};

export async function getGeneratedMathProblems(): Promise<MathProblemSessionResponseDto[]> {

  const { data, error } = await supabase.from('math_problem_sessions').select();
  
  if (error) {
    throw new Error(`Math Problem Session Get By Session Id Error: ${error}`);
  }

  const mathProblemSesions: MathProblemSessionResponseDto[] = data.map(d => {
    return {
      id: d.id,
      created_at: d.created_at,
      problem_text: d.problem_text,
      correct_answer: d.correct_answer
    } as MathProblemSessionResponseDto
  });

  return mathProblemSesions;
}

export async function getMathProblemSessionById(mathProblemSessionId: string): Promise<MathProblemSessionResponseDto> {

  const { data, error } = await supabase
                              .from('math_problem_sessions')
                              .select()
                              .eq('id', mathProblemSessionId);

  if (error) {
    throw new Error(`Math Problem Session Get By Session Id Error: ${error}`);
  }

  return {
      id: data[0].id,
      created_at: data[0].created_at,
      problem_text: data[0].problem_text,
      correct_answer: data[0].correct_answer
  } as MathProblemSessionResponseDto;

};

export async function insertIntoMathProblemSubmission(mathProblemSubmissionDto: MathProblemSubmissionRequestDto): Promise<MathProblemSubmissionResponseDto> {

  const { data, error } = await supabase
                              .from('math_problem_submissions')
                              .insert({
                                session_id: mathProblemSubmissionDto.mathProblemSessionId,
                                user_answer: mathProblemSubmissionDto.actualAnswer,
                                is_correct: mathProblemSubmissionDto.isAnswerCorrect,
                                feedback_text: mathProblemSubmissionDto.feedbackText
                              })
                              .select();
  
  if (error) {
    throw new Error(`Math Problem Submission Insertion Error: ${error}`);
  }

  return {
    id: data[0].id,
    session_id: data[0].session_id,
    user_answer: data[0].user_answer,
    is_correct: data[0].is_correct,
    feedback_text: data[0].feedback_text
  } as MathProblemSubmissionResponseDto;
};