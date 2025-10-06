export type MathProblemDto = {
    problemText: string,
    answer: number
};

export type GenerateMathProblemRequestDto = {
    difficultyLevel: string,
    problemType: string,
}

export type ProblemSubmissionRequestDto = {
    mathProblemSessionId: string,
    userAnswer: number
};