export type MathProblemResponseDto = {
    problemText: string,
    answer: number
};

export type MathProblemFeedbackResponseDto = {
    isCorrect: boolean,
    feedback: string
};
