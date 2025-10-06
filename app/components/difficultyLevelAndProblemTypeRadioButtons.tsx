interface DifficultyLevelAndProblemTypeRadioButtonProps {
    selectedDifficultyLevel: string,
    selectedProblemType: string,
    handleDifficultyLevelOptionChange: (difficultyLevel: string) => void,
    handleProblemTypeOptionChange: (problemType: string) => void
}

export default function DifficultyLevelAndProblemTypeRadioButton({ selectedDifficultyLevel, selectedProblemType, handleDifficultyLevelOptionChange, handleProblemTypeOptionChange }: DifficultyLevelAndProblemTypeRadioButtonProps) {

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-x-6 text-black">
                <h1 className="md:whitespace-nowrap"><b>Difficulty Level:</b></h1>
                <div className="flex space-x-4">
                    <div className="flex items-center space-x-1">
                        <input 
                            type="radio" 
                            id="easy" 
                            name="myRadioGroup" 
                            value="easy" 
                            checked={selectedDifficultyLevel === 'easy'} 
                            onChange={(e) => handleDifficultyLevelOptionChange(e.target.value)} 
                        />
                        <label htmlFor="easy">Easy</label>
                    </div>
                    <div className="flex items-center space-x-1">
                        <input 
                            type="radio" 
                            id="medium" 
                            name="myRadioGroup" 
                            value="medium" 
                            checked={selectedDifficultyLevel === 'medium'} 
                            onChange={(e) => handleDifficultyLevelOptionChange(e.target.value)} 
                        />
                        <label htmlFor="medium">Medium</label>
                    </div>
                    <div className="flex items-center space-x-1">
                        <input 
                            type="radio" 
                            id="hard" 
                            name="myRadioGroup" 
                            value="hard" 
                            checked={selectedDifficultyLevel === 'hard'} 
                            onChange={(e) => handleDifficultyLevelOptionChange(e.target.value)} 
                        />
                        <label htmlFor="hard">Hard</label>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-x-6 text-black">
                <h1 className="md:whitespace-nowrap"><b>Problem Type:</b></h1>
                <div className="flex flex-wrap gap-x-4">
                    <div className="flex items-center space-x-1">
                        <input 
                            type="radio" 
                            id="addition" 
                            name="myRadioGroup1" 
                            value="addition" 
                            checked={selectedProblemType === 'addition'} 
                            onChange={(e) => handleProblemTypeOptionChange(e.target.value)} 
                        />
                        <label htmlFor="addition">Addition</label>
                    </div>
                    <div className="flex items-center space-x-1">
                        <input 
                            type="radio" 
                            id="substraction" 
                            name="myRadioGroup1" 
                            value="substraction" 
                            checked={selectedProblemType === 'substraction'} 
                            onChange={(e) => handleProblemTypeOptionChange(e.target.value)} 
                        />
                        <label htmlFor="substraction">Subtraction</label>
                    </div>
                    <div className="flex items-center space-x-1">
                        <input 
                            type="radio" 
                            id="multiplication" 
                            name="myRadioGroup1" 
                            value="multiplication" 
                            checked={selectedProblemType === 'multiplication'} 
                            onChange={(e) => handleProblemTypeOptionChange(e.target.value)} 
                        />
                        <label htmlFor="multiplication">Multiplication</label>
                    </div>
                    <div className="flex items-center space-x-1">
                        <input 
                            type="radio" 
                            id="division" 
                            name="myRadioGroup1" 
                            value="division" 
                            checked={selectedProblemType === 'division'} 
                            onChange={(e) => handleProblemTypeOptionChange(e.target.value)} 
                        />
                        <label htmlFor="division">Division</label>
                    </div>
                </div>
            </div>
        </>
    );
}