// The code for start of game session is down below
// Init
let rand;
let range = 2;
let userGuess;
let score = 0;
localStorage.setItem("score", score);
localStorage.setItem("range", range);

// Update score for every correct guess and increase range
const updateScore = () => {
  // get score from cookie and update
  let savedScore = parseInt(localStorage.getItem("score"));
  savedScore = savedScore + 1;
  alert(`Your current score is ${savedScore}`);
  // use timer here if alert doesn't work well
  alert("Let's up the difficulty a bit");

  // remove old score cookie and add updated one
  localStorage.removeItem("score");
  localStorage.setItem("score", savedScore);

  //   increase range for number generation
  let getRange = parseInt(localStorage.getItem("range"));
  getRange = getRange + 1;
  localStorage.removeItem("range");
  localStorage.setItem("range", getRange);

  playGame(); //call game function so it would loop and play again
};

// Quit game
const quit = () => {
  // clear all cookies
  localStorage.removeItem("score");
  localStorage.removeItem("username");
  localStorage.removeItem("range");
};

// Reset score and start again or Quit game
const retry = () => {
  const retry = prompt("Do you want to play again? Y or N");
  if (retry == "y" || retry == "Y") {
    //   if yes, reset score and range
    localStorage.removeItem("score");
    localStorage.setItem("score", 0);
    localStorage.removeItem("range");
    localStorage.setItem("range", 2);
    playGame();
  } else if (retry == "n" || retry == "N") {
    //   if no, quit
    const user = localStorage.getItem("username");
    alert(`Thanks for playing, Bye ${user}!`);
    quit();
  } else {
    alert("Invalid input");
    pseudoRetry();
  }
};

// Since i call retry inside itself
const pseudoRetry = () => {
  retry();
};

// Collect user input and compare with random number generated
const checkInput = (userGuess, rand, range) => {
  if (userGuess == rand) {
    alert("You guessed right!");
    updateScore();
  } else if (userGuess > range) {
    alert("Psych! you guessed outside the range, try again");
    playGame();
  } else {
    alert("Oops!, you guessed wrong, GAME OVER!");
    const savedScore = localStorage.getItem("score");
    alert(`Your Final score is ${savedScore}`);
    retry();
  }
};

// START THE GAME SESSION
const playGame = () => {
  // get user and range
  const user = localStorage.getItem("username");
  const range = localStorage.getItem("range");

  //   initiate random number and take user input
  rand = Math.ceil(Math.random() * range);
  userGuess = prompt(`${user}, guess a number from 1 to ${range}`);
  userGuessInt = parseInt(userGuess);
  checkInput(userGuessInt, rand, range);
};

("run'n ");
// *
// **
// ***
// ***CODE EXECUTES FROM HERE *** //
// Check for saved user
const fetchUsername = localStorage.getItem("username");

// If no saved user, collect username and save in cookie, then start game
if (!fetchUsername) {
  let username = prompt("Hello, what is your name?");
  //   save username in cookie
  localStorage.setItem("username", username);
  playGame();
}

// If saved user, start game
if (fetchUsername) {
  alert(`Welcome back ${fetchUsername}`);
  playGame();
}

// ***
// **
// *
