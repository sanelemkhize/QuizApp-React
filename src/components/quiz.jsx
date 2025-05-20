import { useState } from "react";
import Results from "./results";

function Quiz(){

    const questionBank = 
    [
        {
            question: "What is the capital city of South Africa?",
            options: ["Durban", "Cape Town", "Pretoria", "Johannesburg"],
            answer: "Pretoria",
        },
        {
            question: "Which language is used for progamming applications?",
            options: ["English", "Java", "French", "Spanish"],
            answer: "Java",
        },
        {
            question: "WHich car brand is from Sweden?",
            options: ["BMW", "Toyota", "Kia", "Volvo"],
            answer: "Volvo",
        },
    ];


    const initialAnswers = [null, null, null];

    const [userAnswer, setUserAnswers] = useState(initialAnswers); 
    const [currentQuestion, setCurrentQuestion] = useState(0);
    
    const [isQuizFinished, setIsQuizFinished] = useState(false);

    const selectedAnswer = userAnswer[currentQuestion]; // 

    function handleSelectOption(option){
       const newUserAnswers = [...userAnswer];
       newUserAnswers[currentQuestion] = option;

       setUserAnswers(newUserAnswers);
    }

    function goToNext(){
        if(currentQuestion == questionBank.length - 1){
            setIsQuizFinished(true);
        }
        else {
        setCurrentQuestion(currentQuestion + 1);
        }
    }

    function goToPrev(){
        if(currentQuestion > 0){
            setCurrentQuestion(currentQuestion - 1);
        }
    }


    function restartQuiz(){
        setUserAnswers(initialAnswers);
        setCurrentQuestion(0);
        setIsQuizFinished(false);
    }

    if(isQuizFinished){
        return (
        <Results 
            userAnswer={userAnswer}
            questionBank={questionBank}
            restartQuiz={restartQuiz}
        />
        );
    }

    return (
        <div>
            <h2>Question {currentQuestion + 1}</h2>
            <p className="question">{questionBank[currentQuestion].question}</p>

            {/* traverse through the question options */}
            {questionBank[currentQuestion].options.map((option) => (
                <button className={"option" + (selectedAnswer == option ? " selected" : " ")} 
                onClick={() => handleSelectOption(option)}>{option}</button>
            ))}

            <div className="nav-buttons">
                <button onClick={goToPrev} disabled={currentQuestion == 0}>Previous</button>
                
                <button onClick={goToNext} disabled={!selectedAnswer}>
                    {currentQuestion === questionBank.length - 1 ? "Finish Quiz" : "Next"}
                </button>
            </div>
        </div>
    );
}

// This is how you can import this fucntion to other function
export default Quiz;