import { MathProblemSessionResponseDto } from "../../../dtos/databaseDto/responseDto"
import { MathProblemHistoryEndpointResponse } from "../../../dtos/endpointDto/responseDto";
import { getGeneratedMathProblems } from "../../../../lib/supabaseclient";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<Response> {

    try {

        const response: MathProblemSessionResponseDto[] = await getGeneratedMathProblems();

        const endpointResponse: MathProblemHistoryEndpointResponse[] = response.map(r => {
            return {
                sessionId: r.id,
                createdAt: r.created_at,
                problemText: r.problem_text,
                correctAnswer: r.correct_answer
            } as MathProblemHistoryEndpointResponse
        });

        return NextResponse.json(endpointResponse);

    } catch (err) {
        throw new Error(`${err}`);
    }
}