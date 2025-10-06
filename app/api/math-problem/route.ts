import { generateMathProblem } from "../../../lib/geminiclient"; 
import { MathProblemResponseDto } from "../../dtos/geminiDto/responseDto";
import { MathProblemRequestDto } from "../../dtos/databaseDto/requestDto";
import { MathProblemSessionResponseDto } from "../../dtos/databaseDto/responseDto";
import { MathProblemEndpointResponse } from "../../dtos/endpointDto/responseDto";
import { GenerateMathProblemRequestDto } from "../../dtos/endpointDto/requestDto";
import { insertIntoMathProblemSession } from "../../../lib/supabaseclient";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {

    try {

        const requestBody: GenerateMathProblemRequestDto = await request.json();

        const mathProblem: MathProblemResponseDto = await generateMathProblem(requestBody.difficultyLevel, requestBody.problemType);

        const response: MathProblemSessionResponseDto = await insertIntoMathProblemSession({
            problemText: mathProblem.problemText,
            answer: mathProblem.answer
        } as MathProblemRequestDto);

        return NextResponse.json({
            sessionId: response.id,
            createdAt: response.created_at,
            problemText: response.problem_text,
            correctAnswer: response.correct_answer
        } as MathProblemEndpointResponse);

    } catch (err) {

        throw new Error(err);
    }

}