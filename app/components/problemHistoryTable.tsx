interface MathProblemHistory {
    problem_text: string
    correct_answer: number
    created_at: string
}

interface ProblemHistoryTableProps {
    problemHistory: MathProblemHistory[]
}

export default function ProblemHistoryTable({ problemHistory }: ProblemHistoryTableProps) {

    const formattedString = (isoString: string): string => {
        const datePart = isoString.split('T')[0];
        const [year, month, day] = datePart.split('-');

        return `${day}-${month}-${year}`;
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Problem History</h2>
            <table className="min-w-full bg-white border border-gray-200 text-black">
                { problemHistory.length == 0 ? <></> : (
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 text-center">Problem</th>
                            <th className="whitespace-nowrap w-32 px-4 py-2 text-center">Correct Answer</th>
                            <th className="whitespace-nowrap w-32 px-4 py-2 text-center">Created At</th>
                        </tr>
                    </thead>
                )}
                <tbody>
                { problemHistory.length === 0 ? (
                    <tr className="text-center">
                        <td colSpan={3} className="py-4 text-gray-500">
                            No problem history found.
                        </td>
                    </tr>
                ) : (
                    problemHistory.map((ph, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b border-gray-200 text-sm text-justify">
                                {ph.problem_text}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                                {ph.correct_answer}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 text-sm text-center">
                                {formattedString(ph.created_at)}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}