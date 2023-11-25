let autoplay = false;
let intervalId;
const autoPlayButton = document.querySelector(".auto-play");
const score = JSON.parse(localStorage.getItem("score")) || {
    win: 0,
    loss: 0,
    tie: 0
};

displayScore();

document.body.addEventListener("keydown", (event) => {
    if (event.key === "r") {
        playGame("rock");
    }
    else if (event.key === "p") {
        playGame("paper");
    }
    else if (event.key === "s") {
        playGame("scissors");
    }
    else if (event.key === "a") {
        autoPlay();
    }
    else if (event.key === "Backspace") {
        confirmation();
    }
});

document.querySelectorAll(".choice-button").forEach((choice, index) => {
    choice.addEventListener("click", () => {
        let userChoice;

        if (index == 0) {
            userChoice = "rock";
        }
        else if (index == 1) {
            userChoice = "paper";
        }
        else if (index == 2) {
            userChoice = "scissors";
        }

        playGame(userChoice);
    });
});

document.querySelector(".reset-score").addEventListener("click", () => {
    confirmation();
});

autoPlayButton.addEventListener("click", () => {
    autoPlay();
});

function autoPlay() {
    let userChoice = computer();

    if (!autoplay) {
        intervalId = setInterval(() => {
            playGame(userChoice);
        }, 1000);

        autoPlayButton.innerHTML = "Stop Playing";
        autoplay = true;
    }
    else {
        clearInterval(intervalId);

        autoPlayButton.innerHTML = "Auto Play";
        autoplay = false;
    }
}

function checkResult(userChoice, computerChoice) {
    if (userChoice === "rock" && computerChoice === "rock") {
        return "Tie.";
    }
    else if (userChoice === "rock" && computerChoice === "paper") {
        return "You lose.";
    }
    else if (userChoice === "rock" && computerChoice === "scissors") {
        return "You win.";
    }
    else if (userChoice === "paper" && computerChoice === "rock") {
        return "You win.";
    }
    else if (userChoice === "paper" && computerChoice === "paper") {
        return "Tie.";
    }
    else if (userChoice === "paper" && computerChoice === "scissors") {
        return "You lose.";
    }
    else if (userChoice === "scissors" && computerChoice === "rock") {
        return "You lose.";
    }
    else if (userChoice === "scissors" && computerChoice === "paper") {
        return "You win.";
    }
    else if (userChoice === "scissors" && computerChoice === "scissors") {
        return "Tie.";
    }
}

function computer() {
    const choice = Math.random();

    if (choice < 1 / 3) {
        return "rock";
    }
    else if (choice < 2 / 3) {
        return "paper";
    }
    else {
        return "scissors";
    }
}

function confirmation() {
    const confirmation = document.querySelector(".confirmation");

    confirmation.innerHTML = `
        Are you sure you want to reset the score?
        <button class="confirmation-yes">Yes</button>
        <button class="confirmation-no">No</button>
    `;

    document.querySelector(".confirmation-yes").addEventListener("click", () => {
        resetScore();
        confirmation.innerHTML = "";
    });

    document.querySelector(".confirmation-no").addEventListener("click", () => {
        confirmation.innerHTML = "";
    });
}

function displayScore() {
    localStorage.setItem("score", JSON.stringify(score));

    document.querySelector(".score").innerHTML = `Wins: ${score.win}, Losses: ${score.loss}, Ties: ${score.tie}`;
}

function playGame(userChoice) {
    const computerChoice = computer();
    let result = checkResult(userChoice, computerChoice);
    document.querySelector(".result").innerHTML = result;

    updateResult(userChoice, computerChoice);
    updateScore(result);
    displayScore();
}

function resetScore() {
    localStorage.removeItem("score");
    score.win = 0;
    score.loss = 0;
    score.tie = 0;

    displayScore();
}

function updateResult(userChoice, computerChoice) {
    document.querySelector(".game-choice").innerHTML = `
        You
        <img alt="rock" class="choice-icon" src="images/${userChoice}-emoji.png">
        <img alt="rock" class="choice-icon" src="images/${computerChoice}-emoji.png">
        Computer
    `;
}

function updateScore(result) {
    if (result === "You win.") {
        score.win++;
    }
    else if (result === "You lose.") {
        score.loss++;
    }
    else {
        score.tie++;
    }
}