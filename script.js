/*
=========================================================
🧮 MATH MASTER — VERSION 9
=========================================================
✅ Chapter Dropdown Fixed
❤️ Lives
🔥 Streak
⚡ Combo
💡 Hint
⏭️ Skip
🏆 Best Score
📜 History
🔊 Sound
🌙 Dark Mode
🔥 Daily Challenge
⭐ XP + Level
🏅 Achievements
🎯 Accuracy
🎉 Perfect Score
💾 LocalStorage
=========================================================
*/

"use strict";

/* =====================================================
   SETTINGS
===================================================== */

const TOTAL_QUESTIONS = 10;
const MAX_LIVES = 3;
const START_HINTS = 2;


/* =====================================================
   QUIZ VARIABLES
===================================================== */

let score = 0;
let correct = 0;
let wrong = 0;
let skipped = 0;

let qNumber = 0;

let streak = 0;
let combo = 0;

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

let bestStreak =
    Number(localStorage.getItem("bestStreak") || 0);

let playerXP =
    Number(localStorage.getItem("playerXP") || 0);

let playerLevel =
    Number(localStorage.getItem("playerLevel") || 1);

let dailyStreak =
    Number(localStorage.getItem("dailyStreak") || 0);

let lastDailyDate =
    localStorage.getItem("lastDailyDate") || "";


/* =====================================================
   CHAPTER DATA
===================================================== */

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


/* =====================================================
   QUESTIONS
   ===================================================== */

const questions = [

    /* CLASS 1 */

    {
        class: 1,
        chapter: "Numbers",
        type: "mcq",
        difficulty: "easy",
        question: "What number comes after 49?",
        options: ["48", "50", "51", "59"],
        answer: "50",
        explanation: "49 के बाद 50 आता है।",
        hint: "एक number आगे गिनो।"
    },

    {
        class: 1,
        chapter: "Addition",
        type: "veryshort",
        difficulty: "easy",
        question: "What is 7 + 6?",
        answer: "13",
        explanation: "7 + 6 = 13.",
        hint: "7 में 6 जोड़ो।"
    },

    {
        class: 1,
        chapter: "Subtraction",
        type: "veryshort",
        difficulty: "easy",
        question: "What is 15 - 6?",
        answer: "9",
        explanation: "15 - 6 = 9.",
        hint: "15 में से 6 घटाओ।"
    },

    {
        class: 1,
        chapter: "Shapes",
        type: "mcq",
        difficulty: "easy",
        question: "Which shape has 4 equal sides?",
        options: [
            "Triangle",
            "Circle",
            "Square",
            "Oval"
        ],
        answer: "Square",
        explanation: "Square की चारों sides बराबर होती हैं।",
        hint: "Box जैसी shape सोचो।"
    },


    /* CLASS 2 */

    {
        class: 2,
        chapter: "Addition",
        type: "short",
        difficulty: "medium",
        question: "Find 36 + 27.",
        answer: "63",
        explanation: "36 + 27 = 63.",
        hint: "पहले ones जोड़ो।"
    },

    {
        class: 2,
        chapter: "Subtraction",
        type: "veryshort",
        difficulty: "easy",
        question: "Find 70 - 25.",
        answer: "45",
        explanation: "70 - 25 = 45.",
        hint: "पहले 20 फिर 5 घटाओ।"
    },

    {
        class: 2,
        chapter: "Multiplication",
        type: "mcq",
        difficulty: "medium",
        question: "What is 6 × 7?",
        options: [
            "36",
            "42",
            "48",
            "49"
        ],
        answer: "42",
        explanation: "6 × 7 = 42.",
        hint: "7 का table याद करो।"
    },


    /* CLASS 3 */

    {
        class: 3,
        chapter: "Division",
        type: "mcq",
        difficulty: "medium",
        question: "48 sweets are divided among 6 children. Each gets:",
        options: [
            "6",
            "7",
            "8",
            "9"
        ],
        answer: "8",
        explanation: "48 ÷ 6 = 8.",
        hint: "6 × ? = 48."
    },

    {
        class: 3,
        chapter: "Fractions",
        type: "veryshort",
        difficulty: "easy",
        question: "What is half of 20?",
        answer: "10",
        explanation: "20 ÷ 2 = 10.",
        hint: "20 को 2 से divide करो।"
    },


    /* CLASS 4 */

    {
        class: 4,
        chapter: "Geometry",
        type: "mcq",
        difficulty: "easy",
        question: "How many right angles does a rectangle have?",
        options: [
            "2",
            "3",
            "4",
            "5"
        ],
        answer: "4",
        explanation: "Rectangle में चार right angles होते हैं।",
        hint: "चारों corners देखो।"
    },

    {
        class: 4,
        chapter: "Decimals",
        type: "veryshort",
        difficulty: "medium",
        question: "Find 2.5 + 1.5.",
        answer: "4",
        explanation: "2.5 + 1.5 = 4.",
        hint: "Decimal numbers को जोड़ो।"
    },


    /* CLASS 5 */

    {
        class: 5,
        chapter: "Fractions",
        type: "mcq",
        difficulty: "hard",
        question: "Which decimal is equal to 3/4?",
        options: [
            "0.25",
            "0.50",
            "0.75",
            "1.25"
        ],
        answer: "0.75",
        explanation: "3 ÷ 4 = 0.75.",
        hint: "3 को 4 से divide करो।"
    },

    {
        class: 5,
        chapter: "Decimals",
        type: "short",
        difficulty: "hard",
        question: "Find 4.75 + 2.25.",
        answer: "7",
        explanation: "4.75 + 2.25 = 7.",
        hint: "Decimal parts जोड़ो।"
    },


    /* CLASS 6 */

    {
        class: 6,
        chapter: "Integers",
        type: "mcq",
        difficulty: "hard",
        question: "What is (-12) + 7 - (-5)?",
        options: [
            "0",
            "-10",
            "10",
            "5"
        ],
        answer: "0",
        explanation: "-12 + 7 + 5 = 0.",
        hint: "Negative को subtract करने पर addition होता है।"
    },

    {
        class: 6,
        chapter: "Fractions",
        type: "short",
        difficulty: "hard",
        question: "Find 3/4 + 5/8.",
        answer: "11/8",
        explanation: "3/4 = 6/8, इसलिए 6/8 + 5/8 = 11/8.",
        hint: "Denominator 8 बनाओ।"
    },


    /* CLASS 7 */

    {
        class: 7,
        chapter: "Simple Equations",
        type: "mcq",
        difficulty: "hard",
        question: "If 3x + 5 = 20, find x.",
        options: [
            "3",
            "5",
            "7",
            "8"
        ],
        answer: "5",
        explanation: "3x = 15, इसलिए x = 5.",
        hint: "पहले 5 subtract करो।"
    },

    {
        class: 7,
        chapter: "Lines and Angles",
        type: "mcq",
        difficulty: "medium",
        question: "Angles on a straight line add up to:",
        options: [
            "90°",
            "180°",
            "270°",
            "360°"
        ],
        answer: "180°",
        explanation: "Straight angle = 180°.",
        hint: "Straight line के angle को याद करो।"
    },


    /* CLASS 8 */

    {
        class: 8,
        chapter: "Squares and Square Roots",
        type: "mcq",
        difficulty: "hard",
        question: "Which number has square root 12?",
        options: [
            "121",
            "132",
            "144",
            "156"
        ],
        answer: "144",
        explanation: "12 × 12 = 144.",
        hint: "12 का square निकालो।"
    },

    {
        class: 8,
        chapter: "Mensuration",
        type: "mcq",
        difficulty: "medium",
        question: "Area of a rectangle with length 10 cm and breadth 6 cm is:",
        options: [
            "16",
            "32",
            "60",
            "100"
        ],
        answer: "60",
        explanation: "Area = length × breadth = 10 × 6 = 60 cm².",
        hint: "Length × breadth करो।"
    },


    /* CLASS 9 */

    {
        class: 9,
        chapter: "Coordinate Geometry",
        type: "mcq",
        difficulty: "hard",
        question: "Distance between (0,0) and (3,4) is:",
        options: [
            "3",
            "4",
            "5",
            "7"
        ],
        answer: "5",
        explanation: "√(3² + 4²) = √25 = 5.",
        hint: "Distance formula लगाओ।"
    },

    {
        class: 9,
        chapter: "Statistics",
        type: "veryshort",
        difficulty: "medium",
        question: "Find the mean of 2, 4 and 6.",
        answer: "4",
        explanation: "(2 + 4 + 6) ÷ 3 = 4.",
        hint: "सभी values जोड़कर 3 से divide करो।"
    },


    /* CLASS 10 */

    {
        class: 10,
        chapter: "Real Numbers",
        type: "veryshort",
        difficulty: "medium",
        question: "Find HCF of 12 and 18.",
        answer: "6",
        explanation: "12 और 18 का HCF 6 है।",
        hint: "Common factors देखो।"
    },

    {
        class: 10,
        chapter: "Polynomials",
        type: "mcq",
        difficulty: "medium",
        question: "If zeroes of x² - 5x + 6 are:",
        options: [
            "1,6",
            "2,3",
            "-2,-3",
            "3,4"
        ],
        answer: "2,3",
        explanation: "x² - 5x + 6 = (x-2)(x-3).",
        hint: "Product 6 और sum 5 चाहिए।"
    },

    {
        class: 10,
        chapter: "Quadratic Equations",
        type: "short",
        difficulty: "hard",
        question: "Solve x² - 5x + 6 = 0.",
        answer: "2,3",
        explanation: "(x-2)(x-3)=0, इसलिए x=2 या 3.",
        hint: "Quadratic को factorise करो।"
    },

    {
        class: 10,
        chapter: "Trigonometry",
        type: "mcq",
        difficulty: "hard",
        question: "If tan θ = 1 and θ is acute, then θ is:",
        options: [
            "30°",
            "45°",
            "60°",
            "90°"
        ],
        answer: "45°",
        explanation: "tan 45° = 1.",
        hint: "Standard values याद करो।"
    },


    /* CLASS 11 */

    {
        class: 11,
        chapter: "Sequences and Series",
        type: "mcq",
        difficulty: "hard",
        question: "The 10th term of AP 3,7,11,... is:",
        options: [
            "35",
            "39",
            "43",
            "47"
        ],
        answer: "39",
        explanation: "a = 3, d = 4. a10 = 3 + 9×4 = 39.",
        hint: "aₙ = a + (n-1)d"
    },

    {
        class: 11,
        chapter: "Probability",
        type: "veryshort",
        difficulty: "medium",
        question: "Probability of getting a head on a fair coin is:",
        answer: "1/2",
        explanation: "एक favourable outcome और दो total outcomes हैं।",
        hint: "Head और Tail दो outcomes हैं।"
    },


    /* CLASS 12 */

    {
        class: 12,
        chapter: "Matrices",
        type: "mcq",
        difficulty: "hard",
        question: "A 2×3 matrix contains how many elements?",
        options: [
            "5",
            "6",
            "8",
            "9"
        ],
        answer: "6",
        explanation: "Rows × Columns = 2 × 3 = 6.",
        hint: "Rows को columns से multiply करो।"
    },

    {
        class: 12,
        chapter: "Calculus",
        type: "veryshort",
        difficulty: "medium",
        question: "Find derivative of x².",
        answer: "2x",
        explanation: "d(x²)/dx = 2x.",
        hint: "Power rule use करो।"
    },

    {
        class: 12,
        chapter: "Relations and Functions",
        type: "mcq",
        difficulty: "hard",
        question: "If f(x)=2x+3, find f(4).",
        options: [
            "8",
            "9",
            "11",
            "12"
        ],
        answer: "11",
        explanation: "2(4)+3 = 11.",
        hint: "x की जगह 4 रखो।"
    }

];


/* =====================================================
   GET ELEMENT
===================================================== */

function $(id) {
    return document.getElementById(id);
}


/* =====================================================
   CHAPTER DROPDOWN — FIXED
===================================================== */

function loadChapters() {

    const classSelect = $("classSelect");
    const chapterSelect = $("chapter");

    if (!classSelect || !chapterSelect) {
        console.error(
            "❌ classSelect या chapter element नहीं मिला।"
        );
        return;
    }

    const selectedClass =
        Number(classSelect.value);

    chapterSelect.innerHTML = "";

    const list =
        chapters[selectedClass] || [];

    if (list.length === 0) {

        const option =
            document.createElement("option");

        option.value = "";
        option.textContent =
            "No Chapter Available";

        chapterSelect.appendChild(option);

        return;
    }

    list.forEach(function(chapterName) {

        const option =
            document.createElement("option");

        option.value = chapterName;
        option.textContent = chapterName;

        chapterSelect.appendChild(option);

    });

}


/* =====================================================
   SHUFFLE
===================================================== */

function shuffleArray(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

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
   GET QUESTIONS
===================================================== */

function getQuestions() {

    const classElement = $("classSelect");
    const chapterElement = $("chapter");
    const typeElement = $("type");
    const difficultyElement = $("difficulty");

    if (
        !classElement ||
        !chapterElement
    ) {

        console.error(
            "❌ Class या Chapter dropdown नहीं मिला।"
        );

        return [];

    }

    const selectedClass =
        Number(classElement.value);

    const selectedChapter =
        chapterElement.value;

    const selectedType =
        typeElement
            ? typeElement.value
            : "";

    const selectedDifficulty =
        difficultyElement
            ? difficultyElement.value
            : "";


    /* Exact filter */

    let list =
        questions.filter(function(q) {

            return (
                q.class === selectedClass &&
                q.chapter === selectedChapter &&
                (
                    !selectedType ||
                    q.type === selectedType
                ) &&
                (
                    !selectedDifficulty ||
                    q.difficulty === selectedDifficulty
                )
            );

        });


    /* Chapter + Type */

    if (list.length === 0) {

        list =
            questions.filter(function(q) {

                return (
                    q.class === selectedClass &&
                    q.chapter === selectedChapter &&
                    (
                        !selectedType ||
                        q.type === selectedType
                    )
                );

            });

    }


    /* Only Chapter */

    if (list.length === 0) {

        list =
            questions.filter(function(q) {

                return (
                    q.class === selectedClass &&
                    q.chapter === selectedChapter
                );

            });

    }


    /* Only Class */

    if (list.length === 0) {

        list =
            questions.filter(function(q) {

                return q.class === selectedClass;

            });

    }


    return shuffleArray([...list]);

}


/* =====================================================
   RESET QUIZ
===================================================== */

function resetQuizData() {

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
            $("time")?.value || 60
        );

}


/* =====================================================
   START QUIZ
===================================================== */

function startQuiz() {

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


    if (quizQuestions.length === 0) {

        alert(
            "इस Class और Chapter के लिए questions नहीं मिले।"
        );

        return;

    }


    $("quiz").style.display =
        "block";

    $("resultCard").style.display =
        "none";


    updateFeatureDisplay();
    updateAccuracy();
    updatePlayerLevel();


    nextQuestion();

    startTimer();

}


/* =====================================================
   TIMER
===================================================== */

function startTimer() {

    clearInterval(timer);

    timer =
        setInterval(function() {

            timeLeft--;

            const timerElement =
                $("timer");

            if (timerElement) {

                timerElement.innerText =
                    timeLeft;

            }


            if (timeLeft <= 10) {

                if (timerElement) {

                    timerElement.style.fontWeight =
                        "900";

                }

            }


            if (timeLeft <= 0) {

                clearInterval(timer);

                finishQuiz();

            }

        }, 1000);

}


/* =====================================================
   NEXT QUESTION
===================================================== */

function nextQuestion() {

    if (lives <= 0) {

        finishQuiz();
        return;

    }


    if (
        qNumber >=
        quizQuestions.length
    ) {

        finishQuiz();
        return;

    }


    currentQuestion =
        quizQuestions[qNumber];

    answered = false;

    qNumber++;


    if ($("qNo")) {

        $("qNo").innerText =
            "Question " +
            qNumber +
            "/" +
            quizQuestions.length;

    }


    if ($("question")) {

        $("question").innerText =
            currentQuestion.question;

    }


    if ($("result")) {

        $("result").innerText = "";

    }


    if ($("explanation")) {

        $("explanation").innerText = "";

    }


    if ($("options")) {

        $("options").innerHTML = "";

    }


    if ($("answer")) {

        $("answer").value = "";
        $("answer").style.display = "none";

    }


    if ($("longAnswer")) {

        $("longAnswer").value = "";
        $("longAnswer").style.display = "none";

    }


    if ($("check")) {

        $("check").disabled = false;

    }


    if ($("next")) {

        $("next").disabled = true;

    }


    if (
        currentQuestion.type ===
        "mcq"
    ) {

        showMCQ();

    }

    else if (
        currentQuestion.type ===
        "veryshort"
    ) {

        if ($("answer")) {

            $("answer").style.display =
                "block";

        }

    }

    else {

        if ($("longAnswer")) {

            $("longAnswer").style.display =
                "block";

        }

    }


    if ($("progress")) {

        $("progress").style.width =
            (
                qNumber /
                quizQuestions.length *
                100
            ) + "%";

    }


    updateFeatureDisplay();

}


/* =====================================================
   MCQ
===================================================== */

function showMCQ() {

    const container =
        $("options");

    if (!container)
        return;


    const options =
        currentQuestion.options || [];


    options.forEach(function(optionText) {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "option";

        button.innerText =
            optionText;


        button.addEventListener(
            "click",
            function() {

                if (answered)
                    return;


                document
                    .querySelectorAll(".option")
                    .forEach(function(btn) {

                        btn.classList.remove(
                            "selected"
                        );

                    });


                button.classList.add(
                    "selected"
                );


                if ($("answer")) {

                    $("answer").value =
                        optionText;

                }

            }
        );


        container.appendChild(button);

    });

}


/* =====================================================
   NORMALIZE
===================================================== */

function normalizeAnswer(answer) {

    return String(answer)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "");

}


/* =====================================================
   CHECK ANSWER
===================================================== */

function checkAnswer() {

    if (
        answered ||
        !currentQuestion
    )
        return;


    let userAnswer = "";


    if (
        currentQuestion.type ===
        "mcq" ||
        currentQuestion.type ===
        "veryshort"
    ) {

        userAnswer =
            $("answer")?.value?.trim() ||
            "";

    }

    else {

        userAnswer =
            $("longAnswer")?.value?.trim() ||
            "";

    }


    if (userAnswer === "") {

        if ($("result")) {

            $("result").innerText =
                "⚠️ पहले answer दें।";

        }

        return;

    }


    answered = true;


    const isCorrect =
        normalizeAnswer(userAnswer) ===
        normalizeAnswer(
            currentQuestion.answer
        );


    if (isCorrect) {

        handleCorrect();

    }

    else {

        handleWrong();

    }


    showExplanation();


    if ($("check"))
        $("check").disabled = true;


    if ($("next"))
        $("next").disabled = false;


    updateAccuracy();
    updateFeatureDisplay();


    if (lives <= 0) {

        setTimeout(
            finishQuiz,
            800
        );

    }

}


/* =====================================================
   CORRECT
===================================================== */

function handleCorrect() {

    correct++;

    streak++;

    combo++;


    let points = 10;


    if (combo >= 3)
        points += 5;


    if (combo >= 5)
        points += 10;


    if (streak >= 3)
        points += 5;


    score += points;


    addXP(points);


    if (streak > bestStreak) {

        bestStreak =
            streak;

        localStorage.setItem(
            "bestStreak",
            bestStreak
        );

    }


    if ($("result")) {

        $("result").innerText =
            `✅ Correct! +${points} XP 🔥`;

    }


    playSound("correct");

}


/* =====================================================
   WRONG
===================================================== */

function handleWrong() {

    wrong++;

    lives--;

    streak = 0;

    combo = 0;


    if ($("result")) {

        $("result").innerText =
            "❌ Wrong! Correct Answer: " +
            currentQuestion.answer;

    }


    playSound("wrong");

}


/* =====================================================
   EXPLANATION
===================================================== */

function showExplanation() {

    if ($("explanation")) {

        $("explanation").innerText =
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

function useHint() {

    if (
        answered ||
        !currentQuestion
    )
        return;


    if (hintsLeft <= 0) {

        alert(
            "💡 आपके सभी hints खत्म हो गए हैं।"
        );

        return;

    }


    hintsLeft--;


    if ($("result")) {

        $("result").innerText =
            "💡 Hint: " +
            currentQuestion.hint;

    }


    addXP(2);

    updateFeatureDisplay();

}


/* =====================================================
   SKIP
===================================================== */

function skipQuestion() {

    if (
        answered ||
        !currentQuestion
    )
        return;


    answered = true;

    skipped++;

    wrong++;

    streak = 0;

    combo = 0;


    if ($("result")) {

        $("result").innerText =
            "⏭️ Question skipped";

    }


    if ($("explanation")) {

        $("explanation").innerText =
            "Correct Answer: " +
            currentQuestion.answer;

    }


    if ($("check"))
        $("check").disabled = true;


    if ($("next"))
        $("next").disabled = false;


    updateAccuracy();
    updateFeatureDisplay();

}


/* =====================================================
   ACCURACY
===================================================== */

function updateAccuracy() {

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


    if ($("accuracy")) {

        $("accuracy").innerText =
            accuracy + "%";

    }

}


/* =====================================================
   FEATURE PANEL
===================================================== */

function updateFeatureDisplay() {

    let panel =
        $("featurePanel");


    if (!panel) {

        panel =
            document.createElement("div");

        panel.id =
            "featurePanel";


        const quiz =
            $("quiz");


        if (quiz) {

            quiz.prepend(panel);

        }

    }


    if (!panel)
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
   XP
===================================================== */

function addXP(amount) {

    playerXP += amount;


    const newLevel =
        Math.floor(
            playerXP / 100
        ) + 1;


    if (
        newLevel >
        playerLevel
    ) {

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
   LEVEL DISPLAY
===================================================== */

function updatePlayerLevel() {

    document
        .querySelectorAll(".playerLevel")
        .forEach(function(element) {

            element.innerText =
                "Level " +
                playerLevel;

        });


    document
        .querySelectorAll(".playerXP")
        .forEach(function(element) {

            element.innerText =
                playerXP +
                " XP";

        });

}


/* =====================================================
   LEVEL UP
===================================================== */

function showLevelUp() {

    playSound("success");


    if ($("result")) {

        $("result").innerText =
            "🎉 LEVEL UP! Level " +
            playerLevel;

    }

}


/* =====================================================
   ACHIEVEMENTS
===================================================== */

function checkAchievements() {

    const achievements =
        JSON.parse(
            localStorage.getItem(
                "achievements"
            ) || "[]"
        );


    function unlock(name) {

        if (
            !achievements.includes(name)
        ) {

            achievements.push(name);

        }

    }


    if (correct >= 10)
        unlock("🎯 10 Correct");


    if (bestStreak >= 5)
        unlock("🔥 5 Streak");


    if (score >= 100)
        unlock("🏆 100 Score");


    if (
        correct ===
        quizQuestions.length &&
        quizQuestions.length > 0
    ) {

        unlock("💯 Perfect Quiz");

    }


    if (dailyMode)
        unlock("🔥 Daily Challenger");


    localStorage.setItem(
        "achievements",
        JSON.stringify(achievements)
    );

}


/* =====================================================
   DAILY STREAK
===================================================== */

function updateDailyStreak(today) {

    if (
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
            .slice(0, 10);


    if (
        lastDailyDate === yesterday
    ) {

        dailyStreak++;

    }

    else {

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
   DAILY CHALLENGE
===================================================== */

function startDailyChallenge() {

    clearInterval(timer);

    dailyMode = true;

    resetQuizData();


    const today =
        new Date()
            .toISOString()
            .slice(0, 10);


    updateDailyStreak(today);


    let seed = 0;


    for (
        let i = 0;
        i < today.length;
        i++
    ) {

        seed =
            (
                seed * 31 +
                today.charCodeAt(i)
            ) >>> 0;

    }


    function random() {

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


    for (
        let i =
            quizQuestions.length - 1;
        i > 0;
        i--
    ) {

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


    if ($("quiz"))
        $("quiz").style.display =
            "block";


    if ($("resultCard"))
        $("resultCard").style.display =
            "none";


    updateFeatureDisplay();
    updateAccuracy();


    nextQuestion();

    startTimer();

}


/* =====================================================
   FINISH QUIZ
===================================================== */

function finishQuiz() {

    clearInterval(timer);


    if (
        !quizQuestions.length
    )
        return;


    /*
       Perfect bonus
    */

    let perfectBonus = 0;


    if (
        correct ===
        quizQuestions.length &&
        quizQuestions.length > 0
    ) {

        perfectBonus = 50;

        score += perfectBonus;

        addXP(perfectBonus);

    }


    checkAchievements();


    if ($("quiz"))
        $("quiz").style.display =
            "none";


    if ($("resultCard"))
        $("resultCard").style.display =
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


    saveStats();

    saveQuizHistory();

    updatePlayerLevel();

    playSound("success");

}


/* =====================================================
   SET TEXT
===================================================== */

function setText(id, value) {

    const element =
        $(id);

    if (element) {

        element.innerText =
            value;

    }

}


/* =====================================================
   SAVE STATS
===================================================== */

function saveStats() {

    const oldBest =
        Number(
            localStorage.getItem(
                "bestScore"
            ) || 0
        );


    if (score > oldBest) {

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

function saveQuizHistory() {

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

        score: score,

        correct: correct,

        wrong: wrong,

        skipped: skipped,

        accuracy: accuracy,

        level: playerLevel,

        xp: playerXP,

        daily: dailyMode,

        date:
            new Date()
                .toLocaleString()

    });


    localStorage.setItem(
        "quizHistory",
        JSON.stringify(
            history.slice(0, 20)
        )
    );

}


/* =====================================================
   DARK MODE
===================================================== */

function toggleDark() {

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

function loadDarkMode() {

    if (
        localStorage.getItem(
            "darkMode"
        ) === "true"
    ) {

        document.body
            .classList
            .add("dark");

    }

}


/* =====================================================
   SOUND
===================================================== */

function playSound(type) {

    if (!soundOn)
        return;


    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext)
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


        if (type === "correct") {

            oscillator.frequency.value =
                700;

        }

        else if (type === "wrong") {

            oscillator.frequency.value =
                200;

        }

        else {

            oscillator.frequency.value =
                900;

        }


        gain.gain.value =
            0.06;


        oscillator.start();


        oscillator.stop(
            audio.currentTime + 0.18
        );

    }

    catch (error) {

        console.log(
            "Sound unavailable"
        );

    }

}


/* =====================================================
   SOUND TOGGLE
===================================================== */

function toggleSound() {

    soundOn =
        !soundOn;


    const button =
        $("soundBtn");


    if (button) {

        button.innerText =
            soundOn
                ? "🔊"
                : "🔇";

    }

}


/* =====================================================
   PLAY AGAIN
===================================================== */

function playAgain() {

    startQuiz();

}


/* =====================================================
   INITIALIZATION — IMPORTANT
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
        -----------------------------------------------
        Chapter dropdown
        -----------------------------------------------
        */

        const classSelect =
            $("classSelect");


        if (classSelect) {

            classSelect.addEventListener(
                "change",
                loadChapters
            );

        }


        /*
        -----------------------------------------------
        Load chapters immediately
        -----------------------------------------------
        */

        loadChapters();


        /*
        -----------------------------------------------
        Other data
        -----------------------------------------------
        */

        loadDarkMode();

        updatePlayerLevel();

        setText(
            "bestScore",
            localStorage.getItem(
                "bestScore"
            ) || 0
        );

    }
);


/* =====================================================
   GLOBAL FUNCTIONS
===================================================== */

window.loadChapters =
    loadChapters;

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
