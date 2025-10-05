export type MathProblemRequestDto = {
    problemText: string,
    answer: number
};

export type MathProblemSubmissionRequestDto = {
    mathProblemSessionId: string,
    actualAnswer: number,
    isAnswerCorrect: boolean,
    feedbackText: string
};