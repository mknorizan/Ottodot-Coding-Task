'use client'

import { useState } from 'react'
import { MathProblemEndpointResponse, SubmitProblemEndpointResponse, MathProblemHistoryEndpointResponse } from './dtos/endpointDto/responseDto'
import { GenerateMathProblemRequestDto, ProblemSubmissionRequestDto } from './dtos/endpointDto/requestDto'
import { toast } from 'react-toastify'
import ProblemHistoryTable from './components/problemHistoryTable'
import DifficultyLevelAndProblemTypeRadioButton from './components/difficultyLevelAndProblemTypeRadioButtons'

interface MathProblem {
  problem_text: string
  final_answer: number
}

interface MathProblemHistory {
  problem_text: string
  correct_answer: number
  created_at: string
}

export default function Home() {
  const [problem, setProblem] = useState<MathProblem | null>(null)
  const [problemHistory, setProblemHistory] = useState<MathProblemHistory[]>([])
  const [problemHistoryButtonText, setProblemHistoryButtonText] = useState<string>('View Problem History')
  const [isShowingProblemHistory, setIsShowingProblemHistory] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isLoadingGenerateProblem, setIsLoadingGenerateProblem] = useState(false)
  const [isLoadingSubmitAnswer, setIsLoadingSubmitAnswer] = useState(false)
  const [isGeneratingProblemHistory, setIsGeneratingProblemHistory] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [hint, setHint] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [difficultyLevel, setDifficultyLevel] = useState<string>('easy');
  const [problemType, setProblemType] = useState<string>('addition')

  const generateProblem = async () => {
    // TODO: Implement problem generation logic
    // This should call your API route to generate a new problem
    // and save it to the database

    console.log("Inside generate problem");

    try {

      setIsShowingProblemHistory(false);
      setProblemHistory([]);
      setProblemHistoryButtonText('View Problem History');

      setHint(null);
      setShowHint(false);

      setIsLoadingGenerateProblem(true);
      
      const response = await fetch('/api/math-problem', { 
        method: 'POST',
        body: JSON.stringify({
          difficultyLevel: difficultyLevel,
          problemType: problemType
        } as GenerateMathProblemRequestDto)
      });
      const data: MathProblemEndpointResponse = await response.json();
      console.log("Response from math-problem API:", data);

      setProblem({
        problem_text: data.problemText,
        final_answer: data.correctAnswer
      } as MathProblem);

      setHint(data.answerHint);

      setSessionId(data.sessionId);

    } catch (err) {
      toast.error(`${err}`);

    } finally {
      setIsLoadingGenerateProblem(false);
    }

  }

  const submitAnswer = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement answer submission logic
    // This should call your API route to check the answer,
    // save the submission, and generate feedback
    
    try {
      setIsLoadingSubmitAnswer(true);
      const response = await fetch('/api/math-problem/submit', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          mathProblemSessionId: sessionId,
          userAnswer: Number(userAnswer),
        } as ProblemSubmissionRequestDto),
      });
      
      const data: SubmitProblemEndpointResponse = await response.json();
      console.log("Response from submit API:", data);

      setIsCorrect(data.isAnswerCorrect);
      setFeedback(data.feedbackText);

    } catch (err) {
      toast.error(`${err}`);

    } finally {
      setIsLoadingSubmitAnswer(false);
      setUserAnswer('');
    }

  }

  const generateProblemHistory = async () => {

    if (isShowingProblemHistory) {

      setIsShowingProblemHistory(false);
      setProblemHistory([]);
      setProblemHistoryButtonText('View Problem History');

    } else {

      let hasError = false;

      setProblem(null);
      setHint(null);
      setShowHint(false);

      try {

        setIsGeneratingProblemHistory(true);
        setProblemHistoryButtonText("Generating...");

        const response = await fetch('/api/math-problem/history', { method: 'GET' });
        const data: MathProblemHistoryEndpointResponse[] = await response.json();

        const mathProblemHistory = data.map(d => {
          return {
            problem_text: d.problemText,
            correct_answer: d.correctAnswer,
            created_at: d.createdAt
          } as MathProblemHistory
        });

        setProblemHistory(mathProblemHistory);

      } catch (err) {

        toast.error(`${err}`);
        hasError = true;
      }

      setIsGeneratingProblemHistory(false);
      setIsShowingProblemHistory(true);
      hasError ? setProblemHistoryButtonText('View Problem History') 
               : setProblemHistoryButtonText('Close Problem History');

    }

  }

  const handleDifficultyLevelOptionChange = (difficultyLevel: string) => {
    setDifficultyLevel(difficultyLevel);
  }

  const handleProblemTypeOptionChange = (problemType: string) => {
    setProblemType(problemType)
  }

  const handleOnClickShowHint = () => {
    setShowHint(!showHint);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Math Problem Generator
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <DifficultyLevelAndProblemTypeRadioButton
            selectedDifficultyLevel={difficultyLevel}
            selectedProblemType={problemType}
            handleDifficultyLevelOptionChange={handleDifficultyLevelOptionChange}
            handleProblemTypeOptionChange={handleProblemTypeOptionChange}
          />
          <div className="flex flex-col space-y-4">
            <button
              onClick={generateProblem}
              disabled={isLoadingGenerateProblem}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
            >
              {isLoadingGenerateProblem ? 'Generating...' : 'Generate New Problem'}
            </button>
            <button
              onClick={generateProblemHistory}
              disabled={isGeneratingProblemHistory}
              className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-200 text-black border-2 border-blue-600 font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
            >
              {problemHistoryButtonText}
            </button>
          </div>
        </div>

        {isShowingProblemHistory && <ProblemHistoryTable problemHistory={problemHistory} />}

        {problem && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Problem:</h2>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              {problem.problem_text}
            </p>
            
            <form onSubmit={submitAnswer} className="space-y-4">
              <div>
                <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Answer:
                </label>
                <input
                  type="number"
                  id="answer"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="Enter your answer"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={!userAnswer || isLoadingGenerateProblem || isLoadingSubmitAnswer}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
              >
                Submit Answer
              </button>
              <button
                onClick={handleOnClickShowHint}
                className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-200 text-black border-2 border-green-600 font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
              >
                { !showHint ? 'Show Hint' : 'Close Hint' }
              </button>
            </form>

            { showHint && hint && (
              <>
                <br/>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Hint 🌟</h2>
                <p className="text-lg text-gray-800 leading-relaxed mb-6">
                  {hint}
                </p>
              </>
            )}
          </div>
        )}

        {feedback && (
          <div className={`rounded-lg shadow-lg p-6 ${isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-yellow-50 border-2 border-yellow-200'}`}>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {isCorrect ? '✅ Correct!' : '❌ Not quite right'}
            </h2>
            <p className="text-gray-800 leading-relaxed">{feedback}</p>
          </div>
        )}
      </main>
    </div>
  )
}