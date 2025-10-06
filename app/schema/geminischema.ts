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
        },
        answer_hint: {
            type: Type.STRING,
            description: "The complete text of the hint to solve the problem."
        }
    },
    required: ["problem_text", "final_answer", "answer_hint"]
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
        },
        step_by_step_solution: {
            type: Type.ARRAY,
            description: "A list of step by step solution. First index will be the first step, ..., n index is the n-th step",
            items: {
                type: Type.STRING 
            }
        }
    },
    required: ["is_correct", "feedback_text", "step_by_step_solution"]
}