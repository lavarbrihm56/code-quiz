// --------------- Global Variables --------------- // 
var mainMenu = document.getElementById('main-menu');
var answerListUl = document.querySelector("#answer-list")
var questionh1 = document.querySelector("#question")
var questionSection = document.getElementById('question-section')
var initialsSection = document.getElementById('initials-section')
var questionBank = [
    {
        question: "What is JavaScript",
        choices: [
            { answer: "a computer", isItRight: false },
            { answer: "a programming language", isItRight: true },
            { answer: "A web browser", isItRight: false }
        ]
    },
    {
        question: "What is a function",
        choices: [
            { answer: "a block of code that executes when called", isItRight: true },
            { answer: "a block of code that executes over and over until told to stop", isItRight: false },
            { answer: "a block of code that executes after a set amount of time", isItRight: false }
        ]
    },
]
// --------------- show screen to enter and save initals with the timer to local storage --------------- // 
function enterIntials(){
    questionSection.style.display = 'none'
    document.getElementById('submit-score').addEventListener('click')
}


// --------------- begins the timer count down --------------- // 
var timer = 60
var interval;
function countDown() {
    interval = setInterval(function () {
        timer = timer - 1;
        document.querySelector('#timer').textContent = timer;
        if (timer <= 0) {
            clearInterval(interval)
            timer = 0;
            document.querySelector('#timer').textContent = timer;
            enterIntials()
        }
    }, 1000)
}

// --------------- starts game --------------- // 
function startGame() {
    mainMenu.style.display = 'none';
    questionSection.style.display = 'block'
    countDown();
    displayQuestion();
}
document.getElementById('start-btn').addEventListener('click', startGame)

// --------------- displays the next question until there are no more questions --------------- // 
var count = 0;
function displayQuestion() {
    if (count < questionBank.length) {
        while (answerListUl.firstChild) {
            answerListUl.firstChild.remove()
        }

        questionh1.innerText = questionBank[count].question
        for (i = 0; i < questionBank[count].choices.length; i++) {
            var btn = document.createElement('button');
            btn.innerText = questionBank[count].choices[i].answer
            btn.setAttribute('data-right', questionBank[count].choices[i].isItRight)
            answerListUl.appendChild(btn)
        }
        count++
    } else{
        enterInitials()
    }
}
displayQuestion()

// --------------- checks whether the right answer was choosen or not --------------- // 
answerListUl.addEventListener('click', function (e) {
    if (e.target.tagName == "BUTTON") {
        if (e.target.getAttribute("data-right") == "true") {
            console.log("You answered correctly!")
            //display message saying they got it correct in html
            displayQuestion()
        } else {
            console.log("You answered incorrectely!")
            //display they got it incorrect in html and subtract 10 from timer "setInterval"
            timer = timer - 10
            displayQuestion()
        }
    }
})