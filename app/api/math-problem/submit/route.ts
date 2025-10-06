import { generatePersonalizedFeedback } from "../../../../lib/geminiclient";
import { MathProblemSubmissionResponseDto, MathProblemSessionResponseDto } from "../../../dtos/databaseDto/responseDto"
import { MathProblemSubmissionRequestDto as MathProblemSubmissionDbRequestDto } from "../../../dtos/databaseDto/requestDto";
import { ProblemSubmissionRequestDto } from "../../../dtos/endpointDto/requestDto";
import { SubmitProblemEndpointResponse } from "../../../dtos/endpointDto/responseDto";
import { MathProblemSubmissionRequestDto } from "../../../dtos/geminiDto/requestDto";
import { MathProblemFeedbackResponseDto } from "../../../dtos/geminiDto/responseDto";
import { getMathProblemSessionById, insertIntoMathProblemSubmission } from "../../../../lib/supabaseclient";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {

    try {

        const requestBody: ProblemSubmissionRequestDto = await request.json();

        const response: MathProblemSessionResponseDto = await getMathProblemSessionById(requestBody.mathProblemSessionId);

        const personalizedFeedback: MathProblemFeedbackResponseDto = await generatePersonalizedFeedback({
            mathProblemSessionId: requestBody.mathProblemSessionId,
            originalProblem: response.problem_text,
            expectedAnswer: response.correct_answer,
            actualAnswer: requestBody.userAnswer
        } as MathProblemSubmissionRequestDto);

        if (personalizedFeedback) {

            const problemSubmissionDto: MathProblemSubmissionResponseDto = await insertIntoMathProblemSubmission({
                mathProblemSessionId: requestBody.mathProblemSessionId,
                actualAnswer: requestBody.userAnswer,
                isAnswerCorrect: personalizedFeedback.isCorrect,
                feedbackText: personalizedFeedback.feedback
            } as MathProblemSubmissionDbRequestDto);

            return NextResponse.json({
                mathProblemSessionId: problemSubmissionDto.session_id,
                userAnswer: problemSubmissionDto.user_answer,
                isAnswerCorrect: problemSubmissionDto.is_correct,
                feedbackText: problemSubmissionDto.feedback_text
            } as SubmitProblemEndpointResponse);
        }

    } catch (err) {
        throw new Error(`${err}`);
    }
}