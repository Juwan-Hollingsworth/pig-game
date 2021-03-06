'use strict';

// Assign elements to variables by element ID
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// starting conditions

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

init();

const switchPlayer = function () {
  // Switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generate a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. display the dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check if rolled 1:
    // if true, switch to next player
    if (dice != 1) {
      // add dice to current score
      currentScore = currentScore + dice;
      //building ID name dynamically
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to score of active player
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      // add winner class to activePlayer
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('.player--winner');
      // remove active class from activePlayer
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('.player--active');

      // hide dice
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
  //3. if so finish game
  //4. Switch to the next player
});
btnNew.addEventListener('click', init);
