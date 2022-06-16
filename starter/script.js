'use strict';
// const score0El=document.querySelector('#score--0').textContent=0;
// const score1El=document.querySelector('#score--1').textContent=0;

//Selecting element
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score1 = document.getElementById('score--0');
const score2 = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current1 = document.getElementById('current--0');
const current2 = document.getElementById('current--1');

let scores, CurrentScore, activePlayer, playing;
const initial = function () {
  //Starting conditions
  scores = [0, 0];
  CurrentScore = 0;
  activePlayer = 0;
  playing = true;

  score1.textContent = 0;
  score2.textContent = 0;
  current1.textContent = 0;
  current2.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
initial();

const switchplayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  CurrentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      CurrentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        CurrentScore;
    } else {
      //Switch next player
      switchplayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to active player's score
    scores[activePlayer] += CurrentScore;
    //scores[1] += CurrentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Chech if player's score >=100
    //finish the game

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the next player
      switchplayer();
    }
  }
});
btnNew.addEventListener('click', initial);
