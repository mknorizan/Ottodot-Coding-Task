export type MathProblemResponseDto = {
    problemText: string,
    answer: number,
    answerHint: string
};

export type MathProblemFeedbackResponseDto = {
    isCorrect: boolean,
    feedback: string,
    stepByStepSolution: string[]
};
