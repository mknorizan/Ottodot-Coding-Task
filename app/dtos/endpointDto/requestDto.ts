export type MathProblemDto = {
    problemText: string,
    answer: number
};

export type ProblemSubmissionRequestDto = {
    mathProblemSessionId: string,
    userAnswer: number
}