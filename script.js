/*
=========================================================
🧮 MATH MASTER — VERSION 5
500 QUESTION SYSTEM + SPECIAL FEATURES
=========================================================
*/

"use strict";

const TOTAL_QUESTIONS = 10;

/* =========================================================
   VARIABLES
========================================================= */

let score = 0;
let correct = 0;
let wrong = 0;
let qNumber = 0;

let timeLeft = 60;
let timer = null;

let answered = false;
let soundOn = true;

let currentQuestion = null;
let quizQuestions = [];

let streak = 0;
let bestStreak =
    Number(localStorage.getItem("bestStreak") || 0);

let lives = 3;
let hintsLeft = 2;
let skipped = 0;

let dailyMode = false;


/* =========================================================
   CHAPTERS
========================================================= */

const chapters = {

    1: [
        "Numbers",
        "Addition",
        "Subtraction",
        "Shapes"
    ],

    2: [
        "Numbers",
        "Addition",
        "Subtraction",
        "Multiplication"
    ],

    3: [
        "Numbers",
        "Multiplication",
        "Division",
        "Fractions"
    ],

    4: [
        "Numbers",
        "Fractions",
        "Decimals",
        "Geometry"
    ],

    5: [
        "Numbers",
        "Fractions",
        "Decimals",
        "Geometry"
    ],

    6: [
        "Knowing Our Numbers",
        "Integers",
        "Fractions",
        "Decimals"
    ],

    7: [
        "Integers",
        "Fractions and Decimals",
        "Simple Equations",
        "Lines and Angles"
    ],

    8: [
        "Rational Numbers",
        "Linear Equations",
        "Squares and Square Roots",
        "Mensuration"
    ],

    9: [
        "Number Systems",
        "Polynomials",
        "Coordinate Geometry",
        "Statistics"
    ],

    10: [
        "Real Numbers",
        "Polynomials",
        "Quadratic Equations",
        "Coordinate Geometry",
        "Trigonometry"
    ],

    11: [
        "Sets",
        "Trigonometry",
        "Sequences and Series",
        "Probability"
    ],

    12: [
        "Relations and Functions",
        "Matrices",
        "Calculus",
        "Probability"
    ]

};


/* =========================================================
   500 QUESTIONS
   यहाँ अपने 500 questions रखें
========================================================= */

const questions = [

/* ================= CLASS 1 ================= */

{
class:1,
chapter:"Numbers",
type:"mcq",
difficulty:"easy",
question:"What number comes after 49?",
options:["48","50","51","59"],
answer:"50",
explanation:"Counting after 49 gives 50.",
hint:"Count one number forward."
},

{
class:1,
chapter:"Addition",
type:"veryshort",
difficulty:"easy",
question:"What is 7 + 6?",
answer:"13",
explanation:"7 + 6 = 13.",
hint:"Add 7 and 6."
},

{
class:1,
chapter:"Subtraction",
type:"short",
difficulty:"easy",
question:"What is 15 - 6?",
answer:"9",
explanation:"15 - 6 = 9.",
hint:"Take 6 away from 15."
},

{
class:1,
chapter:"Shapes",
type:"mcq",
difficulty:"easy",
question:"Which shape has 4 equal sides?",
options:[
"Triangle",
"Circle",
"Square",
"Oval"
],
answer:"Square",
explanation:"A square has four equal sides.",
hint:"Think of a box-like shape."
},

{
class:1,
chapter:"Numbers",
type:"mcq",
difficulty:"easy",
question:"Which number is greatest?",
options:[
"18",
"81",
"28",
"38"
],
answer:"81",
explanation:"81 is the greatest number.",
hint:"Compare the tens digits."
},

/* ================= CLASS 2 ================= */

{
class:2,
chapter:"Addition",
type:"short",
difficulty:"medium",
question:"Find 36 + 27.",
answer:"63",
explanation:"36 + 27 = 63.",
hint:"Add ones first."
},

{
class:2,
chapter:"Subtraction",
type:"veryshort",
difficulty:"easy",
question:"Find 70 - 25.",
answer:"45",
explanation:"70 - 25 = 45.",
hint:"Subtract 20, then 5."
},

{
class:2,
chapter:"Multiplication",
type:"mcq",
difficulty:"medium",
question:"What is 6 × 7?",
options:[
"36",
"42",
"48",
"49"
],
answer:"42",
explanation:"6 × 7 = 42.",
hint:"Recall the 7 times table."
},

{
class:2,
chapter:"Numbers",
type:"veryshort",
difficulty:"easy",
question:"What is the place value of 5 in 52?",
answer:"50",
explanation:"5 is in the tens place.",
hint:"5 is in the tens position."
},

{
class:2,
chapter:"Multiplication",
type:"short",
difficulty:"medium",
question:"There are 4 boxes with 9 pencils in each. How many pencils?",
answer:"36",
explanation:"4 × 9 = 36.",
hint:"Multiply number of boxes by pencils."
},

/* ================= CLASS 3 ================= */

{
class:3,
chapter:"Numbers",
type:"mcq",
difficulty:"medium",
question:"What is the place value of 7 in 472?",
options:[
"7",
"70",
"700",
"72"
],
answer:"70",
explanation:"7 is in the tens place.",
hint:"Look at the position of 7."
},

{
class:3,
chapter:"Multiplication",
type:"short",
difficulty:"hard",
question:"There are 24 boxes with 6 pencils in each. Find total pencils.",
answer:"144",
explanation:"24 × 6 = 144.",
hint:"Multiply 24 by 6."
},

{
class:3,
chapter:"Division",
type:"mcq",
difficulty:"medium",
question:"48 sweets are divided among 6 children. Each gets:",
options:[
"6",
"7",
"8",
"9"
],
answer:"8",
explanation:"48 ÷ 6 = 8.",
hint:"6 × ? = 48."
},

{
class:3,
chapter:"Fractions",
type:"veryshort",
difficulty:"easy",
question:"What is half of 20?",
answer:"10",
explanation:"20 ÷ 2 = 10.",
hint:"Divide 20 by 2."
},

{
class:3,
chapter:"Division",
type:"veryshort",
difficulty:"medium",
question:"What is 81 ÷ 9?",
answer:"9",
explanation:"81 ÷ 9 = 9.",
hint:"9 × 9 = ?"
},

/* ================= CLASS 4 ================= */

{
class:4,
chapter:"Fractions",
type:"mcq",
difficulty:"hard",
question:"Which fraction is greatest?",
options:[
"1/4",
"1/2",
"1/8",
"1/10"
],
answer:"1/2",
explanation:"1/2 is greatest.",
hint:"Compare the size of the fractions."
},

{
class:4,
chapter:"Decimals",
type:"veryshort",
difficulty:"medium",
question:"Find 2.5 + 1.5.",
answer:"4",
explanation:"2.5 + 1.5 = 4.",
hint:"Add the decimal numbers."
},

{
class:4,
chapter:"Geometry",
type:"short",
difficulty:"medium",
question:"A rectangle is 8 cm long and 5 cm wide. Find its perimeter.",
answer:"26",
explanation:"2 × (8 + 5) = 26 cm.",
hint:"Perimeter = 2(length + breadth)."
},

{
class:4,
chapter:"Geometry",
type:"mcq",
difficulty:"easy",
question:"How many right angles does a rectangle have?",
options:[
"2",
"3",
"4",
"5"
],
answer:"4",
explanation:"A rectangle has four right angles.",
hint:"Look at all four corners."
},

/* ================= CLASS 5 ================= */

{
class:5,
chapter:"Fractions",
type:"mcq",
difficulty:"hard",
question:"Which decimal is equal to 3/4?",
options:[
"0.25",
"0.50",
"0.75",
"1.25"
],
answer:"0.75",
explanation:"3 ÷ 4 = 0.75.",
hint:"Divide 3 by 4."
},

{
class:5,
chapter:"Decimals",
type:"short",
difficulty:"hard",
question:"Find 4.75 + 2.25.",
answer:"7",
explanation:"4.75 + 2.25 = 7.",
hint:"Add the decimal parts."
},

{
class:5,
chapter:"Geometry",
type:"hots",
difficulty:"hard",
question:"A square has side 9 cm. Find its perimeter.",
answer:"36",
explanation:"4 × 9 = 36 cm.",
hint:"A square has four equal sides."
},

{
class:5,
chapter:"Numbers",
type:"mcq",
difficulty:"medium",
question:"What is the smallest 5-digit number?",
options:[
"9999",
"10000",
"10001",
"99999"
],
answer:"10000",
explanation:"10000 is the smallest 5-digit number.",
hint:"The first 5-digit number."
},

/* ================= CLASS 6 ================= */

{
class:6,
chapter:"Integers",
type:"mcq",
difficulty:"hard",
question:"What is (-12) + 7 - (-5)?",
options:[
"0",
"-10",
"10",
"5"
],
answer:"0",
explanation:"-12 + 7 + 5 = 0.",
hint:"Subtracting a negative becomes addition."
},

{
class:6,
chapter:"Fractions",
type:"short",
difficulty:"hard",
question:"Find 3/4 + 5/8.",
answer:"11/8",
explanation:"3/4 = 6/8, so 6/8 + 5/8 = 11/8.",
hint:"Convert both fractions to denominator 8."
},

{
class:6,
chapter:"Decimals",
type:"mcq",
difficulty:"medium",
question:"Which is greatest?",
options:[
"0.45",
"0.5",
"0.405",
"0.04"
],
answer:"0.5",
explanation:"0.5 is greatest.",
hint:"Write 0.5 as 0.50."
},

{
class:6,
chapter:"Integers",
type:"short",
difficulty:"medium",
question:"Find (-8) + 15.",
answer:"7",
explanation:"15 - 8 = 7.",
hint:"Move 8 places left from 15."
},

/* ================= CLASS 7 ================= */

{
class:7,
chapter:"Simple Equations",
type:"mcq",
difficulty:"hard",
question:"If 3x + 5 = 20, find x.",
options:[
"3",
"5",
"7",
"8"
],
answer:"5",
explanation:"3x = 15, therefore x = 5.",
hint:"Subtract 5 first."
},

{
class:7,
chapter:"Integers",
type:"hots",
difficulty:"hard",
question:"Find (-8) × (-6).",
answer:"48",
explanation:"Negative × negative = positive.",
hint:"Two negative signs make a positive."
},

{
class:7,
chapter:"Lines and Angles",
type:"mcq",
difficulty:"medium",
question:"Angles on a straight line add up to:",
options:[
"90°",
"180°",
"270°",
"360°"
],
answer:"180°",
explanation:"A straight angle measures 180°.",
hint:"Think of a straight line."
},

{
class:7,
chapter:"Simple Equations",
type:"short",
difficulty:"hard",
question:"Solve 2x + 7 = 19.",
answer:"6",
explanation:"2x = 12, so x = 6.",
hint:"Subtract 7, then divide by 2."
},

/* ================= CLASS 8 ================= */

{
class:8,
chapter:"Linear Equations",
type:"mcq",
difficulty:"hard",
question:"If 5x - 7 = 3x + 9, find x.",
options:[
"6",
"7",
"8",
"9"
],
answer:"8",
explanation:"2x = 16, so x = 8.",
hint:"Bring x terms to one side."
},

{
class:8,
chapter:"Squares and Square Roots",
type:"mcq",
difficulty:"hard",
question:"Which number has square root 12?",
options:[
"121",
"132",
"144",
"156"
],
answer:"144",
explanation:"12 × 12 = 144.",
hint:"Find 12 squared."
},

{
class:8,
chapter:"Mensuration",
type:"mcq",
difficulty:"medium",
question:"Area of a rectangle with length 10 cm and breadth 6 cm is:",
options:[
"16",
"32",
"60",
"100"
],
answer:"60",
explanation:"10 × 6 = 60 cm².",
hint:"Area = length × breadth."
},

/* ================= CLASS 9 ================= */

{
class:9,
chapter:"Coordinate Geometry",
type:"mcq",
difficulty:"hard",
question:"Distance between (0,0) and (3,4) is:",
options:[
"3",
"4",
"5",
"7"
],
answer:"5",
explanation:"√(3² + 4²) = √25 = 5.",
hint:"Use the distance formula."
},

{
class:9,
chapter:"Statistics",
type:"veryshort",
difficulty:"medium",
question:"Find the mean of 2, 4 and 6.",
answer:"4",
explanation:"(2 + 4 + 6) ÷ 3 = 4.",
hint:"Add all values and divide by 3."
},

{
class:9,
chapter:"Number Systems",
type:"mcq",
difficulty:"medium",
question:"Which is irrational?",
options:[
"1/2",
"0.25",
"√2",
"3"
],
answer:"√2",
explanation:"√2 cannot be expressed as p/q.",
hint:"Think about non-terminating non-repeating numbers."
},

{
class:9,
chapter:"Polynomials",
type:"mcq",
difficulty:"hard",
question:"If p(x)=x+5, find p(3).",
options:[
"5",
"7",
"8",
"9"
],
answer:"8",
explanation:"3 + 5 = 8.",
hint:"Put x = 3."
},

/* ================= CLASS 10 ================= */

{
class:10,
chapter:"Quadratic Equations",
type:"mcq",
difficulty:"hard",
question:"If x + 1/x = 5, find x² + 1/x².",
options:[
"21",
"23",
"25",
"27"
],
answer:"23",
explanation:"25 = x² + 1/x² + 2, so answer = 23.",
hint:"Square both sides."
},

{
class:10,
chapter:"Trigonometry",
type:"mcq",
difficulty:"hard",
question:"If tan θ = 1 and θ is acute, then θ is:",
options:[
"30°",
"45°",
"60°",
"90°"
],
answer:"45°",
explanation:"tan 45° = 1.",
hint:"Recall standard trigonometric values."
},

{
class:10,
chapter:"Real Numbers",
type:"veryshort",
difficulty:"medium",
question:"Find HCF of 12 and 18.",
answer:"6",
explanation:"HCF is 6.",
hint:"Find the greatest common factor."
},

{
class:10,
chapter:"Polynomials",
type:"mcq",
difficulty:"medium",
question:"If zeroes of x² - 5x + 6 are:",
options:[
"1,6",
"2,3",
"-2,-3",
"3,4"
],
answer:"2,3",
explanation:"x² - 5x + 6 = (x-2)(x-3).",
hint:"Find two numbers whose product is 6 and sum is 5."
},

{
class:10,
chapter:"Quadratic Equations",
type:"short",
difficulty:"hard",
question:"Solve x² - 5x + 6 = 0.",
answer:"2,3",
explanation:"(x-2)(x-3)=0, so x=2 or 3.",
hint:"Factorise the quadratic."
},

{
class:10,
chapter:"Trigonometry",
type:"veryshort",
difficulty:"medium",
question:"Find sin 30°.",
answer:"1/2",
explanation:"sin 30° = 1/2.",
hint:"Recall the standard value."
},

/* ================= CLASS 11 ================= */

{
class:11,
chapter:"Sequences and Series",
type:"mcq",
difficulty:"hard",
question:"The 10th term of AP 3,7,11,... is:",
options:[
"35",
"39",
"43",
"47"
],
answer:"39",
explanation:"a=3,d=4. a10=3+9×4=39.",
hint:"Use aₙ = a + (n-1)d."
},

{
class:11,
chapter:"Probability",
type:"veryshort",
difficulty:"medium",
question:"Probability of getting a head on a fair coin is:",
answer:"1/2",
explanation:"One favourable outcome out of two.",
hint:"There are two equally likely outcomes."
},

{
class:11,
chapter:"Sets",
type:"mcq",
difficulty:"medium",
question:"If A={1,2,3}, how many elements does A have?",
options:[
"1",
"2",
"3",
"4"
],
answer:"3",
explanation:"A contains 3 elements.",
hint:"Count the elements."
},

/* ================= CLASS 12 ================= */

{
class:12,
chapter:"Matrices",
type:"mcq",
difficulty:"hard",
question:"A 2×3 matrix contains how many elements?",
options:[
"5",
"6",
"8",
"9"
],
answer:"6",
explanation:"2 × 3 = 6.",
hint:"Rows × columns."
},

{
class:12,
chapter:"Calculus",
type:"veryshort",
difficulty:"medium",
question:"Find derivative of x².",
answer:"2x",
explanation:"d(x²)/dx = 2x.",
hint:"Use the power rule."
},

{
class:12,
chapter:"Relations and Functions",
type:"mcq",
difficulty:"hard",
question:"If f(x)=2x+3, find f(4).",
options:[
"8",
"9",
"11",
"12"
],
answer:"11",
explanation:"2(4)+3=11.",
hint:"Put x = 4."
}

];


/*
=========================================================
⚠️ IMPORTANT
ऊपर example questions हैं।
आपके 500-question version में इसी format में
बाकी questions भी add किए जा सकते हैं।
=========================================================
*/


/* =========================================================
   CHAPTER DROPDOWN
========================================================= */

function loadChapters(){

    const classSelect =
        document.getElementById("classSelect");

    const chapterSelect =
        document.getElementById("chapter");

    if(!classSelect || !chapterSelect)
        return;

    const cls =
        Number(classSelect.value);

    chapterSelect.innerHTML = "";

    (chapters[cls] || []).forEach(chapterName => {

        const option =
            document.createElement("option");

        option.value =
            chapterName;

        option.textContent =
            chapterName;

        chapterSelect.appendChild(option);

    });

}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffleArray(array){

    for(let i = array.length - 1; i > 0; i--){

        const j =
            Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] =
        [array[j], array[i]];

    }

    return array;

}


/* =========================================================
   GET QUESTIONS
========================================================= */

function getQuestions(){

    const cls =
        Number(
            document.getElementById("classSelect").value
        );

    const chapter =
        document.getElementById("chapter").value;

    const type =
        document.getElementById("type").value;

    const difficulty =
        document.getElementById("difficulty").value;


    let list =
        questions.filter(q =>

            q.class === cls &&
            q.chapter === chapter &&
            q.type === type &&
            q.difficulty === difficulty

        );


    if(list.length < TOTAL_QUESTIONS){

        list =
            questions.filter(q =>

                q.class === cls &&
                q.chapter === chapter &&
                q.type === type

            );

    }


    if(list.length < TOTAL_QUESTIONS){

        list =
            questions.filter(q =>

                q.class === cls &&
                q.chapter === chapter

            );

    }


    if(list.length < TOTAL_QUESTIONS){

        list =
            questions.filter(q =>
                q.class === cls
            );

    }


    return shuffleArray([...list]);

}


/* =========================================================
   START QUIZ
========================================================= */

function startQuiz(){

    clearInterval(timer);

    score = 0;
    correct = 0;
    wrong = 0;
    qNumber = 0;

    answered = false;

    streak = 0;
    lives = 3;
    hintsLeft = 2;
    skipped = 0;

    timeLeft =
        Number(
            document.getElementById("time").value
        );


    quizQuestions =
        getQuestions();


    quizQuestions =
        quizQuestions.slice(
            0,
            TOTAL_QUESTIONS
        );


    if(quizQuestions.length === 0){

        alert(
            "इस selection के लिए question नहीं मिला।"
        );

        return;

    }


    document.getElementById("quiz")
        .style.display = "block";


    document.getElementById("resultCard")
        .style.display = "none";


    document.getElementById("timer")
        .innerText = timeLeft;


    updateFeatureDisplay();

    updateAccuracy();

    nextQuestion();


    timer =
        setInterval(() => {

            timeLeft--;

            document.getElementById("timer")
                .innerText = timeLeft;


            if(timeLeft <= 0){

                finishQuiz();

            }

        },1000);

}


/* =========================================================
   NEXT QUESTION
========================================================= */

function nextQuestion(){

    if(qNumber >= TOTAL_QUESTIONS){

        finishQuiz();

        return;

    }


    currentQuestion =
        quizQuestions[qNumber];


    if(!currentQuestion){

        finishQuiz();

        return;

    }


    answered = false;

    qNumber++;


    document.getElementById("qNo")
        .innerText =
        "Question " +
        qNumber +
        "/" +
        TOTAL_QUESTIONS;


    document.getElementById("question")
        .innerText =
        currentQuestion.question;


    document.getElementById("result")
        .innerText = "";


    document.getElementById("explanation")
        .innerText = "";


    document.getElementById("options")
        .innerHTML = "";


    document.getElementById("answer")
        .style.display = "none";


    document.getElementById("longAnswer")
        .style.display = "none";


    document.getElementById("answer")
        .value = "";


    document.getElementById("longAnswer")
        .value = "";


    document.getElementById("check")
        .disabled = false;


    document.getElementById("next")
        .disabled = true;


    if(currentQuestion.type === "mcq"){

        showMCQ();

    }

    else if(
        currentQuestion.type === "veryshort"
    ){

        document.getElementById("answer")
            .style.display = "block";

    }

    else{

        document.getElementById("longAnswer")
            .style.display = "block";

    }


    document.getElementById("progress")
        .style.width =
        (
            qNumber /
            TOTAL_QUESTIONS *
            100
        ) + "%";


    updateFeatureDisplay();

}


/* =========================================================
   MCQ
========================================================= */

function showMCQ(){

    const options =
        currentQuestion.options || [];


    options.forEach(option => {

        const button =
            document.createElement("button");


        button.className =
            "option";


        button.type =
            "button";


        button.innerText =
            option;


        button.onclick =
            function(){

                if(answered)
                    return;


                document
                    .querySelectorAll(".option")
                    .forEach(btn =>
                        btn.classList.remove(
                            "selected"
                        )
                    );


                button.classList.add(
                    "selected"
                );


                document.getElementById("answer")
                    .value = option;

            };


        document
            .getElementById("options")
            .appendChild(button);

    });

}


/* =========================================================
   CHECK ANSWER
========================================================= */

function checkAnswer(){

    if(
        answered ||
        !currentQuestion
    )
        return;


    let userAnswer = "";


    if(
        currentQuestion.type === "mcq" ||
        currentQuestion.type === "veryshort"
    ){

        userAnswer =
            document.getElementById("answer")
                .value
                .trim();

    }

    else{

        userAnswer =
            document.getElementById("longAnswer")
                .value
                .trim();

    }


    if(userAnswer === ""){

        document.getElementById("result")
            .innerText =
            "⚠️ पहले answer लिखें.";

        return;

    }


    answered = true;


    const correctAnswer =
        String(currentQuestion.answer)
            .trim()
            .toLowerCase();


    const givenAnswer =
        userAnswer
            .trim()
            .toLowerCase();


    const isCorrect =
        givenAnswer === correctAnswer;


    if(isCorrect){

        score++;

        correct++;

        streak++;


        if(streak > bestStreak){

            bestStreak =
                streak;

            localStorage.setItem(
                "bestStreak",
                bestStreak
            );

        }


        document.getElementById("result")
            .innerText =
            "✅ Correct! Excellent!";


        playSound("correct");

    }

    else{

        wrong++;

        streak = 0;

        lives--;


        document.getElementById("result")
            .innerText =
            "❌ Wrong! Correct Answer: " +
            currentQuestion.answer;


        playSound("wrong");

    }


    document.getElementById("explanation")
        .innerText =
        "💡 Explanation: " +
        currentQuestion.explanation;


    document.getElementById("check")
        .disabled = true;


    document.getElementById("next")
        .disabled = false;


    updateAccuracy();

    updateFeatureDisplay();


    if(lives <= 0){

        setTimeout(
            finishQuiz,
            700
        );

    }

}


/* =========================================================
   HINT
========================================================= */

function useHint(){

    if(answered)
        return;


    if(hintsLeft <= 0){

        alert(
            "आपके सभी hints खत्म हो गए हैं।"
        );

        return;

    }


    hintsLeft--;


    alert(
        "💡 Hint: " +
        currentQuestion.hint
    );


    updateFeatureDisplay();

}


/* =========================================================
   SKIP
========================================================= */

function skipQuestion(){

    if(answered)
        return;


    skipped++;

    wrong++;

    streak = 0;

    answered = true;


    document.getElementById("result")
        .innerText =
        "⏭️ Question skipped.";


    document.getElementById("explanation")
        .innerText =
        "Correct Answer: " +
        currentQuestion.answer;


    document.getElementById("check")
        .disabled = true;


    document.getElementById("next")
        .disabled = false;


    updateAccuracy();

    updateFeatureDisplay();

}


/* =========================================================
   ACCURACY
========================================================= */

function updateAccuracy(){

    const attempted =
        correct + wrong;


    const accuracy =
        attempted === 0
            ? 0
            : Math.round(
                (correct / attempted) * 100
            );


    const element =
        document.getElementById(
            "accuracy"
        );


    if(element){

        element.innerText =
            accuracy + "%";

    }

}


/* =========================================================
   FEATURE DISPLAY
========================================================= */

function updateFeatureDisplay(){

    let panel =
        document.getElementById(
            "featurePanel"
        );


    if(!panel){

        panel =
            document.createElement("div");

        panel.id =
            "featurePanel";

        panel.style.padding =
            "10px";

        panel.style.margin =
            "10px 0";

        panel.style.borderRadius =
            "12px";

        panel.style.background =
            "#f1f5f9";


        const quiz =
            document.getElementById(
                "quiz"
            );


        if(quiz)
            quiz.prepend(panel);

    }


    panel.innerHTML = `

        ❤️ Lives: <b>${lives}</b>

        &nbsp;&nbsp;

        🔥 Streak: <b>${streak}</b>

        &nbsp;&nbsp;

        🏆 Best Streak:
        <b>${bestStreak}</b>

        &nbsp;&nbsp;

        💡 Hints:
        <b>${hintsLeft}</b>

        &nbsp;&nbsp;

        ⏭️ Skipped:
        <b>${skipped}</b>

        <br><br>

        <button
            type="button"
            onclick="useHint()">
            💡 Hint
        </button>

        <button
            type="button"
            onclick="skipQuestion()">
            ⏭️ Skip
        </button>

        <button
            type="button"
            onclick="startDailyChallenge()">
            🔥 Daily Challenge
        </button>

    `;

}


/* =========================================================
   DAILY CHALLENGE
========================================================= */

function startDailyChallenge(){

    clearInterval(timer);

    dailyMode = true;

    score = 0;
    correct = 0;
    wrong = 0;
    qNumber = 0;

    streak = 0;
    lives = 3;
    hintsLeft = 2;
    skipped = 0;


    const today =
        new Date()
            .toISOString()
            .slice(0,10);


    let seed = 0;


    for(
        let i = 0;
        i < today.length;
        i++
    ){

        seed =
            (
                seed * 31 +
                today.charCodeAt(i)
            ) >>> 0;

    }


    function random(){

        seed =
            (
                seed * 1664525 +
                1013904223
            ) >>> 0;

        return seed /
            4294967296;

    }


    quizQuestions =
        [...questions];


    for(
        let i =
            quizQuestions.length - 1;
        i > 0;
        i--
    ){

        const j =
            Math.floor(
                random() * (i + 1)
            );


        [
            quizQuestions[i],
            quizQuestions[j]
        ] =
        [
            quizQuestions[j],
            quizQuestions[i]
        ];

    }


    quizQuestions =
        quizQuestions.slice(
            0,
            TOTAL_QUESTIONS
        );


    timeLeft = 60;


    document.getElementById("quiz")
        .style.display = "block";


    document.getElementById("resultCard")
        .style.display = "none";


    document.getElementById("timer")
        .innerText = timeLeft;


    updateFeatureDisplay();

    updateAccuracy();

    nextQuestion();


    timer =
        setInterval(() => {

            timeLeft--;


            document.getElementById("timer")
                .innerText =
                timeLeft;


            if(timeLeft <= 0){

                finishQuiz();

            }

        },1000);

}


/* =========================================================
   FINISH QUIZ
========================================================= */

function finishQuiz(){

    clearInterval(timer);


    document.getElementById("quiz")
        .style.display =
        "none";


    document.getElementById("resultCard")
        .style.display =
        "block";


    const attempted =
        correct + wrong;


    const accuracy =
        attempted === 0
            ? 0
            : Math.round(
                (correct / attempted) * 100
            );


    document.getElementById("finalScore")
        .innerText =
        score;


    document.getElementById("correct")
        .innerText =
        correct;


    document.getElementById("wrong")
        .innerText =
        wrong;


    document.getElementById("finalAccuracy")
        .innerText =
        accuracy + "%";


    saveStats();

    saveQuizHistory();

    playSound("success");

}


/* =========================================================
   SAVE STATS
========================================================= */

function saveStats(){

    const oldBest =
        Number(
            localStorage.getItem(
                "bestScore"
            ) || 0
        );


    if(score > oldBest){

        localStorage.setItem(
            "bestScore",
            score
        );

    }


    const bestScore =
        document.getElementById(
            "bestScore"
        );


    if(bestScore){

        bestScore.innerText =
            localStorage.getItem(
                "bestScore"
            ) || 0;

    }

}


/* =========================================================
   QUIZ HISTORY
========================================================= */

function saveQuizHistory(){

    const history =
        JSON.parse(
            localStorage.getItem(
                "quizHistory"
            ) || "[]"
        );


    history.unshift({

        score: score,

        correct: correct,

        wrong: wrong,

        accuracy:
            correct + wrong === 0
                ? 0
                : Math.round(
                    correct /
                    (correct + wrong) *
                    100
                ),

        date:
            new Date().toLocaleString()

    });


    localStorage.setItem(
        "quizHistory",
        JSON.stringify(
            history.slice(0,20)
        )
    );

}


/* =========================================================
   DARK MODE
========================================================= */

function toggleDark(){

    document.body
        .classList
        .toggle("dark");

}


/* =========================================================
   SOUND
========================================================= */

function playSound(type){

    if(!soundOn)
        return;


    try{

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        const audio =
            new AudioContext();


        const oscillator =
            audio.createOscillator();


        const gain =
            audio.createGain();


        oscillator.connect(gain);

        gain.connect(
            audio.destination
        );


        if(type === "correct"){

            oscillator.frequency.value =
                700;

        }

        else if(type === "wrong"){

            oscillator.frequency.value =
                200;

        }

        else{

            oscillator.frequency.value =
                900;

        }


        gain.gain.value =
            0.08;


        oscillator.start();


        oscillator.stop(
            audio.currentTime + 0.2
        );

    }

    catch(error){

        console.log(
            "Sound unavailable"
        );

    }

}


/* =========================================================
   SOUND BUTTON
========================================================= */

function toggleSound(){

    soundOn =
        !soundOn;


    const button =
        document.getElementById(
            "soundBtn"
        );


    if(button){

        button.innerText =
            soundOn
                ? "🔊"
                : "🔇";

    }

}


/* =========================================================
   INITIAL LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        loadChapters();

        updateFeatureDisplay();


        const bestScore =
            document.getElementById(
                "bestScore"
            );


        if(bestScore){

            bestScore.innerText =
                localStorage.getItem(
                    "bestScore"
                ) || 0;

        }


        const classSelect =
            document.getElementById(
                "classSelect"
            );


        if(classSelect){

            classSelect.addEventListener(
                "change",
                loadChapters
            );

        }

    }
);