import { GoogleGenAI } from "@google/genai";
import { mathProblemSchema, feedbackSchema } from "../app/schema/geminischema";
import { MathProblemResponseDto, MathProblemFeedbackResponseDto } from "../app/dtos/geminiDto/responseDto";
import { MathProblemSubmissionRequestDto } from "../app/dtos/geminiDto/requestDto";

const GEMINI_API_KEY = process.env.GOOGLE_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

export async function generateMathProblem(difficultyLevel: string, problemType: string): Promise<MathProblemResponseDto> {

    try {
    
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            config: {
                responseMimeType: "application/json",
                responseSchema: mathProblemSchema
            },
            contents: `Generate a simple math word problem suitable for a 5th grader. 
                       The problem should require basic arithmetic to solve.
                       Problem difficulty level should be ${difficultyLevel} and focus on ${problemType} arithmetic.`
        });

        const responseString = response.text.trim();
        const result = JSON.parse(responseString);

        return {
            problemText: result.problem_text,
            answer: result.final_answer,
            answerHint: result.answer_hint
        } as MathProblemResponseDto;
    
      } catch (error) {

        throw new Error(`Error generating math problem: ${error}`);

      }
};

export async function generatePersonalizedFeedback(mathProblemSubmission: MathProblemSubmissionRequestDto): Promise<MathProblemFeedbackResponseDto> {

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            config: {
                responseMimeType: "application/json",
                responseSchema: feedbackSchema
            },
            contents: `
                Generate personalized feedback for a user's attempt at a problem. 
                
                Here is the information:
                - **Original Problem:** ${mathProblemSubmission.originalProblem}
                - **Expected Answer:** ${mathProblemSubmission.expectedAnswer}
                - **Actual Answer:** ${mathProblemSubmission.actualAnswer}

                If the actual answer matches expected answer, provide praise and a brief confirmation. 
                If the actual answer does not equal expected answer, gently explain where they likely made a mistake and provide the correct step-by-step reasoning without being overly formal. Keep the response concise and encouraging.
            `
        });

        const responseString = response.text.trim();
        const result = JSON.parse(responseString);

        return {
            isCorrect: result.is_correct,
            feedback: result.feedback_text
        } as MathProblemFeedbackResponseDto;

    } catch (error) {

        throw new Error(`Error generating feedback: ${error}`);
        
    }
}