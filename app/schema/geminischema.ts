import { Type } from "@google/genai";

export const mathProblemSchema = {
    type: Type.OBJECT,
    properties: {
        problem_text: {
            type: Type.STRING,
            description: "The complete text of the math word problem."
        },
        final_answer: {
            type: Type.NUMBER,
            description: "The numerical solution to the math problem."
        }
    },
    required: ["problem_text", "final_answer"]
};

export const feedbackSchema = {
    type: Type.OBJECT,
    properties: {
        is_correct: {
            type: Type.BOOLEAN,
            description: "True if actual answer matches expected answer, otherwise False"
        },
        feedback_text: {
            type: Type.STRING,
            description: "Feedback text based on the answer provided"
        }
    },
    required: ["is_correct", "feedback_text"]
}