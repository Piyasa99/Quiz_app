const questions = [
    {
        question: "Who doesn't share food?",
        answers: [
            { text: "Joey", correct: true},
            { text: "Phoebe", correct: false},
            { text: "Ross", correct: false},
            { text: "Chandler", correct: false},
        ]
    },
    {
        question: "Whose middle name is Muriel?",
        answers: [
            { text: "Phoebe", correct: false},
            { text: "Joey", correct: false},
            { text: "Monica", correct: false},
            { text: "Chandler", correct: true},
        ]
    },
    {
        question: "How many times did Ross get married on the show?",
        answers: [
            { text: "He never got married!", correct: false},
            { text: "1", correct: false},
            { text: "2", correct: false},
            { text: "3", correct: true},
        ]
    },
    {
        question: "Which friend did Gunther have a crush on?",
        answers: [
            { text: "Rachel", correct: true},
            { text: "Amy", correct: false},
            { text: "Monica", correct: false},
            { text: "Phoebe", correct: false},
        ]
    },
    {
        question: "What was the name of Chandler & Joey's pets?",
        answers: [
            { text: "Chuck and Duck", correct: false},
            { text: "Chick and Duck", correct: true},
            { text: "Bird and Duck", correct: false},
            { text: "Chick and Bird", correct: false},
        ]
    },
    {
        question: "Who has a twin sister named Ursula?",
        answers: [
            { text: "Joey", correct: false},
            { text: "Monica", correct: false},
            { text: "Phoebe", correct: true},
            { text: "Rachel", correct: false},
        ]
    },
    {
        question: "Which of these Friends never got married during the course of the show?",
        answers: [
            { text: "Joey", correct: true},
            { text: "Monica", correct: false},
            { text: "Phoebe", correct: false},
            { text: "Rachel", correct: false},
        ]
    },
    {
        question: "What is the name of Ross's second wife?",
        answers: [
            { text: "Rachel", correct: false},
            { text: "Emily", correct: true},
            { text: "Mona", correct: false},
            { text: "Carol", correct: false},
        ]
    },
    {
        question: "Who was Monica's roomate before Rachel?",
        answers: [
            { text: "Chandler", correct: false},
            { text: "She didn't have any roomate!", correct: false},
            { text: "Phoebe", correct: true},
            { text: "Ross", correct: false},
        ]
    },
    {
        question: "During the wedding ceremony of Ross and Emily, Ross says who's name at the altar?",
        answers: [
            { text: "Julie", correct: false},
            { text: "Bonnie", correct: false},
            { text: "Carol", correct: false},
            { text: "Rachel", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button= document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML ="Play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();