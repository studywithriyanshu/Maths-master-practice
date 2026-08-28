/*
=========================================================
🧮 MATH MASTER — JAVASCRIPT VERSION 8
=========================================================
FEATURES
❤️ Lives
🔥 Streak
💡 Hint
⏭️ Skip
🏆 Best Score
📜 History
🔊 Sound
🌙 Dark Mode
🔥 Daily Challenge
⭐ XP + Level
🏅 Achievements
⚡ Combo Bonus
🎉 Perfect Score
💾 Local Storage
=========================================================
*/

"use strict";

/* =====================================================
   SETTINGS
===================================================== */

const TOTAL_QUESTIONS = 10;

const MAX_LIVES = 3;
const START_HINTS = 2;

let score = 0;
let correct = 0;
let wrong = 0;
let skipped = 0;

let qNumber = 0;

let streak = 0;
let combo = 0;

let bestStreak =
    Number(localStorage.getItem("bestStreak") || 0);

let lives = MAX_LIVES;
let hintsLeft = START_HINTS;

let timeLeft = 60;
let timer = null;

let answered = false;
let soundOn = true;
let dailyMode = false;

let currentQuestion = null;
let quizQuestions = [];


/* =====================================================
   PLAYER DATA
===================================================== */

let playerXP =
    Number(localStorage.getItem("playerXP") || 0);

let playerLevel =
    Number(localStorage.getItem("playerLevel") || 1);

let dailyStreak =
    Number(localStorage.getItem("dailyStreak") || 0);

let lastDailyDate =
    localStorage.getItem("lastDailyDate") || "";


/* =====================================================
   CHAPTERS
===================================================== */

const chapters = {

    1:[
        "Numbers",
        "Addition",
        "Subtraction",
        "Shapes"
    ],

    2:[
        "Numbers",
        "Addition",
        "Subtraction",
        "Multiplication"
    ],

    3:[
        "Numbers",
        "Multiplication",
        "Division",
        "Fractions"
    ],

    4:[
        "Numbers",
        "Fractions",
        "Decimals",
        "Geometry"
    ],

    5:[
        "Numbers",
        "Fractions",
        "Decimals",
        "Geometry"
    ],

    6:[
        "Knowing Our Numbers",
        "Integers",
        "Fractions",
        "Decimals"
    ],

    7:[
        "Integers",
        "Fractions and Decimals",
        "Simple Equations",
        "Lines and Angles"
    ],

    8:[
        "Rational Numbers",
        "Linear Equations",
        "Squares and Square Roots",
        "Mensuration"
    ],

    9:[
        "Number Systems",
        "Polynomials",
        "Coordinate Geometry",
        "Statistics"
    ],

    10:[
        "Real Numbers",
        "Polynomials",
        "Quadratic Equations",
        "Coordinate Geometry",
        "Trigonometry"
    ],

    11:[
        "Sets",
        "Trigonometry",
        "Sequences and Series",
        "Probability"
    ],

    12:[
        "Relations and Functions",
        "Matrices",
        "Calculus",
        "Probability"
    ]

};


/*
=========================================================
QUESTIONS
=========================================================

⚠️ अपने existing questions array को यहाँ रखें।

Example:

const questions = [
    {
        class:1,
        chapter:"Numbers",
        type:"mcq",
        difficulty:"easy",
        question:"What number comes after 49?",
        options:["48","50","51","59"],
        answer:"50",
        explanation:"49 के बाद 50 आता है।",
        hint:"एक number आगे गिनो।"
    }
];

=========================================================
*/

const questions = [

    {
        class:1,
        chapter:"Numbers",
        type:"mcq",
        difficulty:"easy",
        question:"What number comes after 49?",
        options:[
            "48",
            "50",
            "51",
            "59"
        ],
        answer:"50",
        explanation:"49 के बाद 50 आता है।",
        hint:"एक number आगे गिनो।"
    },

    {
        class:1,
        chapter:"Addition",
        type:"veryshort",
        difficulty:"easy",
        question:"What is 7 + 6?",
        answer:"13",
        explanation:"7 + 6 = 13.",
        hint:"7 में 6 जोड़ो।"
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
        hint:"7 का table याद करो।"
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
        explanation:"Rectangle में चार right angles होते हैं।",
        hint:"चारों corners देखो।"
    },

    {
        class:5,
        chapter:"Decimals",
        type:"short",
        difficulty:"hard",
        question:"Find 4.75 + 2.25.",
        answer:"7",
        explanation:"4.75 + 2.25 = 7.",
        hint:"Decimal parts को जोड़ो।"
    },

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
        hint:"Negative number को subtract करने पर addition होता है।"
    },

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
        explanation:"3x = 15, इसलिए x = 5.",
        hint:"पहले 5 subtract करो।"
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
        hint:"12 का square निकालो।"
    },

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
        hint:"Distance formula use करो।"
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
        hint:"Standard trigonometric values याद करो।"
    },

    {
        class:11,
        chapter:"Probability",
        type:"veryshort",
        difficulty:"medium",
        question:"Probability of getting a head on a fair coin is:",
        answer:"1/2",
        explanation:"दो equally likely outcomes हैं।",
        hint:"एक favourable outcome और दो total outcomes।"
    },

    {
        class:12,
        chapter:"Calculus",
        type:"veryshort",
        difficulty:"medium",
        question:"Find derivative of x².",
        answer:"2x",
        explanation:"d(x²)/dx = 2x.",
        hint:"Power rule याद करो।"
    }

];


/* =====================================================
   UTILITY
===================================================== */

function getElement(id){

    return document.getElementById(id);

}


/* =====================================================
   SHUFFLE
===================================================== */

function shuffleArray(array){

    for(
        let i = array.length - 1;
        i > 0;
        i--
    ){

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];

    }

    return array;

}


/* =====================================================
   CHAPTER LOADER
===================================================== */

function loadChapters(){

    const classSelect =
        getElement("classSelect");

    const chapterSelect =
        getElement("chapter");

    if(
        !classSelect ||
        !chapterSelect
    )
        return;


    const cls =
        Number(classSelect.value);


    chapterSelect.innerHTML = "";


    (chapters[cls] || [])
        .forEach(name => {

            const option =
                document.createElement("option");

            option.value = name;
            option.textContent = name;

            chapterSelect.appendChild(option);

        });

}


/* =====================================================
   GET QUESTIONS
===================================================== */

function getQuestions(){

    const cls =
        Number(
            getElement("classSelect").value
        );

    const chapter =
        getElement("chapter").value;

    const type =
        getElement("type").value;

    const difficulty =
        getElement("difficulty").value;


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


    return shuffleArray([
        ...list
    ]);

}


/* =====================================================
   START QUIZ
===================================================== */

function startQuiz(){

    clearInterval(timer);

    dailyMode = false;

    resetQuizData();


    quizQuestions =
        getQuestions();


    quizQuestions =
        quizQuestions.slice(
            0,
            TOTAL_QUESTIONS
        );


    if(
        quizQuestions.length === 0
    ){

        alert(
            "इस selection के लिए questions नहीं मिले।"
        );

        return;

    }


    showQuiz();


    nextQuestion();


    startTimer();

}


/* =====================================================
   RESET QUIZ DATA
===================================================== */

function resetQuizData(){

    score = 0;
    correct = 0;
    wrong = 0;
    skipped = 0;

    qNumber = 0;

    streak = 0;
    combo = 0;

    lives = MAX_LIVES;
    hintsLeft = START_HINTS;

    answered = false;


    timeLeft =
        Number(
            getElement("time")?.value || 60
        );

}


/* =====================================================
   SHOW QUIZ
===================================================== */

function showQuiz(){

    const quiz =
        getElement("quiz");

    const resultCard =
        getElement("resultCard");


    if(quiz)
        quiz.style.display = "block";


    if(resultCard)
        resultCard.style.display = "none";


    const timerElement =
        getElement("timer");

    if(timerElement)
        timerElement.innerText =
            timeLeft;


    updateFeatureDisplay();

    updateAccuracy();

}


/* =====================================================
   TIMER
===================================================== */

function startTimer(){

    clearInterval(timer);


    timer =
        setInterval(() => {

            timeLeft--;


            const timerElement =
                getElement("timer");


            if(timerElement){

                timerElement.innerText =
                    timeLeft;

            }


            if(timeLeft <= 10){

                if(timerElement)
                    timerElement.style.fontWeight =
                        "900";

            }


            if(timeLeft <= 0){

                clearInterval(timer);

                finishQuiz();

            }

        },1000);

}


/* =====================================================
   NEXT QUESTION
===================================================== */

function nextQuestion(){

    if(lives <= 0){

        finishQuiz();

        return;

    }


    if(
        qNumber >=
        quizQuestions.length
    ){

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


    const qNo =
        getElement("qNo");

    if(qNo){

        qNo.innerText =
            `Question ${qNumber}/${quizQuestions.length}`;

    }


    const question =
        getElement("question");

    if(question){

        question.innerText =
            currentQuestion.question;

    }


    const result =
        getElement("result");

    if(result)
        result.innerText = "";


    const explanation =
        getElement("explanation");

    if(explanation)
        explanation.innerText = "";


    const options =
        getElement("options");

    if(options)
        options.innerHTML = "";


    const answer =
        getElement("answer");

    const longAnswer =
        getElement("longAnswer");


    if(answer){

        answer.value = "";
        answer.style.display = "none";

    }


    if(longAnswer){

        longAnswer.value = "";
        longAnswer.style.display = "none";

    }


    const check =
        getElement("check");

    const next =
        getElement("next");


    if(check)
        check.disabled = false;


    if(next)
        next.disabled = true;


    if(
        currentQuestion.type === "mcq"
    ){

        showMCQ();

    }
    else if(
        currentQuestion.type === "veryshort"
    ){

        if(answer)
            answer.style.display = "block";

    }
    else{

        if(longAnswer)
            longAnswer.style.display =
                "block";

    }


    const progress =
        getElement("progress");


    if(progress){

        progress.style.width =
            (
                qNumber /
                quizQuestions.length *
                100
            ) + "%";

    }


    updateFeatureDisplay();

}


/* =====================================================
   SHOW MCQ
===================================================== */

function showMCQ(){

    const options =
        currentQuestion.options || [];


    const container =
        getElement("options");


    if(!container)
        return;


    options.forEach(optionText => {

        const button =
            document.createElement("button");


        button.type = "button";

        button.className = "option";

        button.innerText =
            optionText;


        button.addEventListener(
            "click",
            () => {

                if(answered)
                    return;


                document
                    .querySelectorAll(".option")
                    .forEach(btn => {

                        btn.classList.remove(
                            "selected"
                        );

                    });


                button.classList.add(
                    "selected"
                );


                const answer =
                    getElement("answer");


                if(answer){

                    answer.value =
                        optionText;

                }

            }
        );


        container.appendChild(
            button
        );

    });

}


/* =====================================================
   CHECK ANSWER
===================================================== */

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
            getElement("answer")
                ?.value
                ?.trim() || "";

    }
    else{

        userAnswer =
            getElement("longAnswer")
                ?.value
                ?.trim() || "";

    }


    if(userAnswer === ""){

        const result =
            getElement("result");


        if(result){

            result.innerText =
                "⚠️ पहले answer दें।";

        }

        return;

    }


    answered = true;


    const correctAnswer =
        normalizeAnswer(
            currentQuestion.answer
        );


    const givenAnswer =
        normalizeAnswer(
            userAnswer
        );


    const isCorrect =
        givenAnswer ===
        correctAnswer;


    if(isCorrect){

        handleCorrect();

    }
    else{

        handleWrong();

    }


    showExplanation();


    const check =
        getElement("check");

    const next =
        getElement("next");


    if(check)
        check.disabled = true;


    if(next)
        next.disabled = false;


    updateAccuracy();

    updateFeatureDisplay();


    if(lives <= 0){

        setTimeout(
            finishQuiz,
            800
        );

    }

}


/* =====================================================
   NORMALIZE ANSWER
===================================================== */

function normalizeAnswer(answer){

    return String(answer)
        .trim()
        .toLowerCase()
        .replace(/\s+/g,"");

}


/* =====================================================
   CORRECT ANSWER
===================================================== */

function handleCorrect(){

    correct++;

    streak++;

    combo++;


    /*
       Base score
    */

    let points = 10;


    /*
       Combo bonus
    */

    if(combo >= 3)
        points += 5;


    if(combo >= 5)
        points += 10;


    /*
       Streak bonus
    */

    if(streak >= 3)
        points += 5;


    score += points;


    /*
       XP
    */

    addXP(points);


    /*
       Best streak
    */

    if(streak > bestStreak){

        bestStreak =
            streak;


        localStorage.setItem(
            "bestStreak",
            bestStreak
        );

    }


    const result =
        getElement("result");


    if(result){

        result.innerText =
            `✅ Correct! +${points} XP 🔥`;

    }


    playSound("correct");

}


/* =====================================================
   WRONG ANSWER
===================================================== */

function handleWrong(){

    wrong++;

    lives--;

    streak = 0;

    combo = 0;


    const result =
        getElement("result");


    if(result){

        result.innerText =
            "❌ Wrong! Correct Answer: " +
            currentQuestion.answer;

    }


    playSound("wrong");

}


/* =====================================================
   EXPLANATION
===================================================== */

function showExplanation(){

    const explanation =
        getElement("explanation");


    if(explanation){

        explanation.innerText =
            "💡 Explanation: " +
            (
                currentQuestion.explanation ||
                "No explanation available."
            );

    }

}


/* =====================================================
   HINT
===================================================== */

function useHint(){

    if(
        answered ||
        !currentQuestion
    )
        return;


    if(hintsLeft <= 0){

        alert(
            "💡 आपके सभी hints खत्म हो गए हैं।"
        );

        return;

    }


    hintsLeft--;


    const result =
        getElement("result");


    if(result){

        result.innerText =
            "💡 Hint: " +
            currentQuestion.hint;

    }


    addXP(2);


    updateFeatureDisplay();

}


/* =====================================================
   SKIP
===================================================== */

function skipQuestion(){

    if(
        answered ||
        !currentQuestion
    )
        return;


    answered = true;


    skipped++;

    wrong++;

    streak = 0;

    combo = 0;


    const result =
        getElement("result");


    if(result){

        result.innerText =
            "⏭️ Question skipped";

    }


    const explanation =
        getElement("explanation");


    if(explanation){

        explanation.innerText =
            "Correct Answer: " +
            currentQuestion.answer;

    }


    const check =
        getElement("check");

    const next =
        getElement("next");


    if(check)
        check.disabled = true;


    if(next)
        next.disabled = false;


    updateAccuracy();

    updateFeatureDisplay();

}


/* =====================================================
   ACCURACY
===================================================== */

function updateAccuracy(){

    const attempted =
        correct + wrong;


    const accuracy =
        attempted === 0
            ? 0
            : Math.round(
                correct /
                attempted *
                100
            );


    const element =
        getElement("accuracy");


    if(element)
        element.innerText =
            accuracy + "%";

}


/* =====================================================
   FEATURE PANEL
===================================================== */

function updateFeatureDisplay(){

    let panel =
        getElement("featurePanel");


    if(!panel){

        panel =
            document.createElement("div");

        panel.id =
            "featurePanel";


        const quiz =
            getElement("quiz");


        if(quiz)
            quiz.prepend(panel);

    }


    if(!panel)
        return;


    panel.innerHTML = `

        <div class="v8-features">

            <span>❤️ ${lives}</span>

            <span>🔥 ${streak}</span>

            <span>⚡ ${combo}</span>

            <span>💡 ${hintsLeft}</span>

            <span>⏭️ ${skipped}</span>

        </div>

        <div class="v8-actions">

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
                🔥 Daily
            </button>

        </div>

    `;

}


/* =====================================================
   XP SYSTEM
===================================================== */

function addXP(amount){

    playerXP += amount;


    /*
       हर 100 XP पर level up
    */

    const newLevel =
        Math.floor(
            playerXP / 100
        ) + 1;


    if(
        newLevel >
        playerLevel
    ){

        playerLevel =
            newLevel;


        showLevelUp();

    }


    localStorage.setItem(
        "playerXP",
        playerXP
    );


    localStorage.setItem(
        "playerLevel",
        playerLevel
    );


    updatePlayerLevel();

}


/* =====================================================
   LEVEL UP
===================================================== */

function showLevelUp(){

    playSound("success");


    const result =
        getElement("result");


    if(result){

        result.innerText =
            `🎉 LEVEL UP! You are now Level ${playerLevel}!`;

    }

}


/* =====================================================
   PLAYER LEVEL DISPLAY
===================================================== */

function updatePlayerLevel(){

    const elements =
        document.querySelectorAll(
            ".playerLevel"
        );


    elements.forEach(element => {

        element.innerText =
            "Level " +
            playerLevel;

    });


    const xpElements =
        document.querySelectorAll(
            ".playerXP"
        );


    xpElements.forEach(element => {

        element.innerText =
            playerXP +
            " XP";

    });

}


/* =====================================================
   ACHIEVEMENTS
===================================================== */

function checkAchievements(){

    const achievements =
        JSON.parse(
            localStorage.getItem(
                "achievements"
            ) || "[]"
        );


    function unlock(name){

        if(
            !achievements.includes(name)
        ){

            achievements.push(name);

            localStorage.setItem(
                "achievements",
                JSON.stringify(
                    achievements
                )
            );

        }

    }


    if(correct >= 10)
        unlock("🎯 10 Correct");

    if(streak >= 5)
        unlock("🔥 5 Streak");

    if(score >= 100)
        unlock("🏆 100 Score");

    if(
        correct ===
        quizQuestions.length &&
        quizQuestions.length > 0
    ){

        unlock("💯 Perfect Quiz");

    }


    if(dailyMode)
        unlock("🔥 Daily Challenger");


}


/* =====================================================
   DAILY CHALLENGE
===================================================== */

function startDailyChallenge(){

    clearInterval(timer);

    dailyMode = true;

    resetQuizData();


    const today =
        new Date()
            .toISOString()
            .slice(0,10);


    updateDailyStreak(today);


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


    showQuiz();

    nextQuestion();

    startTimer();

}


/* =====================================================
   DAILY STREAK
===================================================== */

function updateDailyStreak(today){

    if(
        lastDailyDate === today
    )
        return;


    const previous =
        new Date();


    previous.setDate(
        previous.getDate() - 1
    );


    const yesterday =
        previous
            .toISOString()
            .slice(0,10);


    if(
        lastDailyDate === yesterday
    ){

        dailyStreak++;

    }
    else{

        dailyStreak = 1;

    }


    lastDailyDate =
        today;


    localStorage.setItem(
        "dailyStreak",
        dailyStreak
    );


    localStorage.setItem(
        "lastDailyDate",
        today
    );

}


/* =====================================================
   FINISH QUIZ
===================================================== */

function finishQuiz(){

    clearInterval(timer);


    if(
        !quizQuestions.length
    )
        return;


    checkAchievements();


    const quiz =
        getElement("quiz");


    const resultCard =
        getElement("resultCard");


    if(quiz)
        quiz.style.display =
            "none";


    if(resultCard)
        resultCard.style.display =
            "block";


    const attempted =
        correct + wrong;


    const accuracy =
        attempted === 0
            ? 0
            : Math.round(
                correct /
                attempted *
                100
            );


    setText(
        "finalScore",
        score
    );


    setText(
        "correct",
        correct
    );


    setText(
        "wrong",
        wrong
    );


    setText(
        "finalAccuracy",
        accuracy + "%"
    );


    /*
       Perfect score
    */

    if(
        correct ===
        quizQuestions.length &&
        quizQuestions.length > 0
    ){

        score += 50;

        addXP(50);


        const result =
            getElement("result");


        if(result){

            result.innerText =
                "🎉 PERFECT SCORE! +50 Bonus!";

        }

    }


    saveStats();

    saveQuizHistory();

    updatePlayerLevel();

    playSound("success");

}


/* =====================================================
   SET TEXT
===================================================== */

function setText(id,value){

    const element =
        getElement(id);


    if(element)
        element.innerText =
            value;

}


/* =====================================================
   SAVE STATS
===================================================== */

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


    setText(
        "bestScore",
        localStorage.getItem(
            "bestScore"
        ) || 0
    );

}


/* =====================================================
   HISTORY
===================================================== */

function saveQuizHistory(){

    const history =
        JSON.parse(
            localStorage.getItem(
                "quizHistory"
            ) || "[]"
        );


    const attempted =
        correct + wrong;


    const accuracy =
        attempted === 0
            ? 0
            : Math.round(
                correct /
                attempted *
                100
            );


    history.unshift({

        score,

        correct,

        wrong,

        skipped,

        accuracy,

        level:
            playerLevel,

        xp:
            playerXP,

        daily:
            dailyMode,

        date:
            new Date()
                .toLocaleString()

    });


    localStorage.setItem(
        "quizHistory",
        JSON.stringify(
            history.slice(0,20)
        )
    );

}


/* =====================================================
   DARK MODE
===================================================== */

function toggleDark(){

    document.body
        .classList
        .toggle("dark");


    localStorage.setItem(
        "darkMode",
        document.body
            .classList
            .contains("dark")
    );

}


/* =====================================================
   LOAD DARK MODE
===================================================== */

function loadDarkMode(){

    const enabled =
        localStorage.getItem(
            "darkMode"
        ) === "true";


    if(enabled){

        document.body
            .classList
            .add("dark");

    }

}


/* =====================================================
   SOUND
===================================================== */

function playSound(type){

    if(!soundOn)
        return;


    try{

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if(!AudioContext)
            return;


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
            0.06;


        oscillator.start();


        oscillator.stop(
            audio.currentTime + .18
        );

    }
    catch(error){

        console.log(
            "Sound unavailable"
        );

    }

}


/* =====================================================
   SOUND TOGGLE
===================================================== */

function toggleSound(){

    soundOn =
        !soundOn;


    const button =
        getElement("soundBtn");


    if(button){

        button.innerText =
            soundOn
                ? "🔊"
                : "🔇";

    }

}


/* =====================================================
   RESET / PLAY AGAIN
===================================================== */

function playAgain(){

    startQuiz();

}


/* =====================================================
   INITIALIZATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadChapters();

        loadDarkMode();

        updatePlayerLevel();

        updateFeatureDisplay();


        setText(
            "bestScore",
            localStorage.getItem(
                "bestScore"
            ) || 0
        );


        const classSelect =
            getElement(
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


/* =====================================================
   GLOBAL FUNCTIONS
===================================================== */

window.startQuiz =
    startQuiz;

window.nextQuestion =
    nextQuestion;

window.checkAnswer =
    checkAnswer;

window.useHint =
    useHint;

window.skipQuestion =
    skipQuestion;

window.startDailyChallenge =
    startDailyChallenge;

window.toggleDark =
    toggleDark;

window.toggleSound =
    toggleSound;

window.playAgain =
    playAgain;
⚠️ एक जरूरी बात
ऊपर वाले code में मैंने कुछ sample questions रखे हैं। तुम्हारे पुराने V5 के बाकी questions इस code में वापस डालने होंगे। तुम्हारे पुराने questions array को इस code के const questions = [...] वाले हिस्से से replace कर सकते हो।
और V8 के नए XP/Level + Feature Panel को तुम्हारी पिछली CSS से ज्यादा attractive दिखाने के लिए ये छोटा CSS भी अपनी style.css के सबसे नीचे जोड़ देना:
/* ===============================
   V8 FEATURE PANEL
================================ */

#featurePanel{
    margin:15px 0;
    padding:15px;

    border-radius:18px;

    background:rgba(99,102,241,.08);

    border:1px solid rgba(99,102,241,.15);
}

.v8-features{
    display:flex;
    flex-wrap:wrap;
    gap:8px;
    justify-content:center;
}

.v8-features span{
    padding:8px 12px;
    border-radius:12px;

    background:var(--card);

    font-size:14px;
    font-weight:700;
}

.v8-actions{
    display:flex;
    gap:8px;
    margin-top:12px;
}

.v8-actions button{
    flex:1;
    padding:10px;

    border:0;
    border-radius:11px;

    background:var(--primary);
    color:white;

    font-weight:700;
    cursor:pointer;
}

.v8-actions button:hover{
    transform:translateY(-2px);
}

.playerLevel{
    font-weight:800;
}

.playerXP{
    font-weight:700;
}
