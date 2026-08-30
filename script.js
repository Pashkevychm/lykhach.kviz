// Cкопіюй код з минулого уроку
let questions = [
    {
    text: "Яка тварина може змінювати колір шкіри?",
    answers: ["Хамелеон", "Слон", "Жираф", "Панда"],
    correct: 0
    },

    {
    text: "Скільки сердець має восьминіг?",
    answers: ["1", "2", "3", "8"],
    correct: 2
    },

    {
    text: "Яка тварина є найшвидшою на Землі?",
    answers: ["Гепард", "Орел", "Лев", "Кінь"],
    correct: 0
    },
    {
    text: "Який океан є найбільшим?",
    answers: ["Атлантичний", "Індійський", "Тихий", "Північний Льодовитий"],
    correct: 2
    },
    {
    text: "Скільки кісток приблизно має доросла людина?",
    answers: ["106", "206", "306", "406"],
    correct: 1
    },
    {
    text: "Яка тварина може спати стоячи?",
    answers: ["Кінь", "Собака", "Кіт", "Кролик"],
    correct: 0
    },
    {
    text: "Який метал є рідким за кімнатної температури?",
    answers: ["Залізо", "Мідь", "Ртуть", "Алюміній"],
    correct: 2
    },
    {
    text: "Яка найбільша тварина на планеті?",
    answers: ["Слон", "Синій кит", "Жираф", "Акула"],
    correct: 1
    },
    {
    text: "Скільки кольорів традиційно має веселка?",
    answers: ["5", "6", "7", "8"],
    correct: 2
    }
];

const startScreen = document.querySelector("#start-screen")
const gameScreen = document.querySelector("#game-screen")
const resultScreen = document.querySelector("#result-screen")

const playBtn = startScreen.querySelector(".start-btn")
const replayBtn = resultScreen.querySelector(".start-btn")

const questionElement = document.querySelector("#question-text");
const answersContainer = document.querySelector("#answers-container")

const timerElement = document.querySelector("#timer");
const scoreElement = document.querySelector("#score-display");
const resultElement = document.querySelector("#result");

let score = 0;
let questionIndex = 0;
let interval;

function nextQuestion() {
    questionIndex += 1;
    if(questionIndex < questions.length) {
        showQuestion(questions[questionIndex])
    } else {
        resultElement.textContent = `Набрано балів: ${score} з ${questions.length}`
        resultScreen.classList.remove("hide");
        gameScreen.classList.add("hide");
    }
}

function checkAnswer(selectedBtn,selectedIndex) {
    clearInterval(interval)
    if (selectedIndex == questions[questionIndex].correct) {
        selectedBtn.classList.add("correct")
        score += 1
        scoreElement.textContent = `Бали: ${score}`
        console.log("Правильна відповідь")
        confetti({
            particleCount: 400,
            spread:400,
            origin: {y:0.5}
        })
    } else {
        selectedBtn.classList.add("wrong")
        console.log("Неправильна відповідь")
    }
    setTimeout(nextQuestion, 1000)
    const buttons = answersContainer.querySelectorAll(".answer-btn")
    buttons.forEach((btn) => btn.disabled = true) 
}

function showQuestion(question) {
    let timer = 5;
    timerElement.textContent = `Час: ${timer}`
    interval = setInterval(function() {
        timer -= 1;
        timerElement.textContent = `Час: ${timer}`
        if (timer <= 0) {
            clearInterval(interval)
            nextQuestion()
        }
    }, 1000)
    questionElement.textContent = question.text;
    answersContainer.innerHTML = ""
    question.answers.forEach(function(optionText, i) {
        const btn = document.createElement("button")
        btn.textContent = optionText;
        btn.classList.add("answer-btn");
        btn.addEventListener("click",function() {
            checkAnswer(btn, i )

        })
        answersContainer.append(btn);

    })
}

function startGame() {
    startScreen.classList.add("hide")
    resultScreen.classList.add("hide")
    gameScreen.classList.remove("hide")
    score = 0;
    scoreElement.textContent = `Балии ${score}`
    questionIndex = 0;
    showQuestion(questions[questionIndex]);
}



playBtn.addEventListener("click", startGame)
replayBtn.addEventListener("click",startGame)
    
