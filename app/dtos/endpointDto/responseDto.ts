export type MathProblemEndpointResponse = {
    sessionId: string,
    createdAt: string,
    problemText: string,
    correctAnswer: number
};

export type SubmitProblemEndpointResponse = {
    mathProblemSessionId: string,
    userAnswer: number,
    isAnswerCorrect: boolean,
    feedbackText: string
};

export type MathProblemHistoryEndpointResponse = {
    sessionId: string,
    createdAt: string,
    problemText: string,
    correctAnswer: number
};