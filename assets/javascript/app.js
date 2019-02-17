//-------------------------------------------------------------
//GLOBAL VARIABLES
var myTimer = 0
var arrayOfAnswers = []
var wins = 0
var losses = 0
var unanswered = 0
var questions = [
    {
        question: "To find highest number in an array, method to be used is:",
        choices:["Math.highest", "Math.max()", "Math.largest", "Math.cal(high)"],
        correctAnswer:"Math.max()"
    },
    {
        question: "An array can be sorted in a reverse manner through method:",
        choices:["sort()", "reverse()", "rev.length()", "sort.length()"],
        correctAnswer:"reverse()"
    },
    {
        question: "Which built-in method removes the last element from an array and returns that element?",
        choices:[ "last()", "get()", "pop()","None of the above"],
        correctAnswer:"pop()"
    },
    {
        question: "Which built-in method returns the calling string value converted to lower case?",
        choices:[" toLowerCase()", "toLower()", "changeCase(case)", "None of the above"],
        correctAnswer:" toLowerCase()"
    },
    {
        question: "Which of the following function of String object returns the character at the specified index?",
        choices:["charAt()", "charCodeAt()", "concat()", "indexOf()"],
        correctAnswer:"charAt()"
    },
    {
        question: "Which of the following function of Array object adds and/or removes elements from an array?",
        choices:["toSource()", "sort()", "splice()", "unshift()"],
        correctAnswer:"splice()"
    },
    {
        question: "Which of the following function of Array object creates a new array with the results of calling a provided function on every element in this array?",
        choices:[" push()", "join()", "pop()", "map()"],
        correctAnswer:"map()"
    },
    {
        question: "Which of the following function of String object returns the characters in a string beginning at the specified location through the specified number of characters?",
        choices:["slice()", "split()", "substr()", "search()"],
        correctAnswer:"substr()"
    },
    {
        question: "Which of the following is correct about features of JavaScript?",
        choices:["JavaScript is is complementary to and integrated with HTML.", "JavaScript is open and cross-platform.", " Both of the above.", "All of the above."],
        correctAnswer:" Both of the above."
    },
    {
        question: "Which of the following function of String object causes a string to be displayed in fixed-pitch font as if it were in a <tt> tag?",
        choices:["fixed()", " big()", " blink()", "bold()"],
        correctAnswer:"fixed()"
    }
]
var myCounter = questions.length * 5


//-------------------------------------------------------------
//FUNCTIONS DEFINITIONS
$( document ).ready(function() {
    $("#timer").html(myCounter);  
});

function gameTimer() {
    myTimer = setInterval(function () {
        $("#timer").html(myCounter);
        myStopFunction()
        myCounter--
    }, 1000);
}

function myStopFunction() {
    if (myCounter === 0) {
        clearInterval(myTimer);
        endTheGame()
    }
}

function startTheGame(){
    $("#clock").append(`<div id="clockContainer">REMAINING TIME</br><span id="timer"></span> Seconds</div>`)
    $( "#startButton" ).remove();
    gameTimer()
    displayQuestions()
}

function displayQuestions(){
    for (let i =0; i<questions.length; i++ ){
        $("#questionsListContainer").append(`<h5>${questions[i].question}</h5>`)
        for (let j=0; j<questions[i].choices.length; j++){
            $("#questionsListContainer").append(`<input class="myRadioButtons" type='radio' onclick='getUserAnswers()' name='choice-${i}' value='${questions[i].choices[j]}'>${questions[i].choices[j]} </br>`)
        }
    }
    $("#questionsListContainer").append(`<br/><button type="button" id="mysubmitButton" class="btn btn-primary" onclick="submitAnswers()">SUBMIT</button>`)
}

function getUserAnswers(){
    var userAnswerSnapshot =  []
    for (let i=0; i< questions.length; i++){
        userAnswerSnapshot.push($(`input[name=choice-${i}]:checked`).val())
    }
   arrayOfAnswers = userAnswerSnapshot
}

function gradeUser(){
    for (let i=0; i<questions.length; i++){
        if (questions[i].correctAnswer === arrayOfAnswers[i] ) {
            wins++
        } else if (typeof arrayOfAnswers[i] === "undefined") {
            unanswered++
        } else {
            losses++
        }
    }

}

function endTheGame(){
    gradeUser()
    $( "#questionsListContainer" ).remove();
    $( "#clockContainer").remove()
    $( "#innerContainerOne" ).append(`
        <div id="gradeContainer" class="container">
            <div class="row">
            <div class="col"></div>
            <div class="col-8">
                <div id="results">
                    <h1>YOU ARE DONE !</h1>
                    <h2>HERE IS YOUR SCORE SUMMERY</h2>
                    <div id="scoresContainer">
                        <div class="scores">
                            WINS: ${wins} 
                        </div>
                        <div class="scores">
                            LOSSES: ${losses} 
                        </div>
                        <div class="scores">
                            UNANSWERED: ${unanswered}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col"></div>
            </div>
        </div>
    `)
    //alert(`WINS: ${wins} \n LOSSES: ${losses} \n UNANSWERED: ${unanswered}`)
}

function submitAnswers(){
    myStopFunction();
    endTheGame();
}