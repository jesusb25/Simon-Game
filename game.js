const COLORS = ["blue", "red", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let level = 0;

$(document).on("keydown", function () {
  if (level === 0) {
    $("h1").text(`Level ${level}`);
    nextSequence();
  } else {
  }
});

// returns random integer between max and min inclusive
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// add push event on each button
$(".btn").on("click", function () {
  let userColor = this.id;
  userPattern.push(userColor);
  checkAnswer(userPattern.length - 1);
  animateButton(userColor);
  playColorSound(userColor);
});

function checkAnswer(currentIndex) {
  // console.log("Game Pattern:");
  // console.log(gamePattern);
  // console.log("User Pattern:");
  // console.log(userPattern);
  if (gamePattern[currentIndex] === userPattern[currentIndex]) {
    if (gamePattern.length == userPattern.length) {
      setTimeout(() => {
        nextSequence();
        userPattern = [];
      }, 1000);
    }
  } else {
    resetGame();
  }
}

function resetGame() {
  let audio = new Audio("./sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press Any Key to Restart");
  level = 0;
  gamePattern = [];
  userPattern = [];
}

// add next color for game sequence
function nextSequence() {
  level += 1;
  $("h1").text(`Level ${level}`);
  // push random color from COLORS to game pattern
  let randomNumber = getRandomInt(0, 3);
  let randomColor = COLORS[randomNumber];
  gamePattern.push(randomColor);
  // animate random color for next step
  animateButton(randomColor);
  // play color sound
  playColorSound(randomColor);
}

// animate buttons given color of button
function animateButton(color) {
  let button = $("#" + color);
  button.addClass("pressed");
  setTimeout(() => {
    button.removeClass("pressed");
  }, 100);
}

// play sound given color of button
function playColorSound(color) {
  let audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();
}
