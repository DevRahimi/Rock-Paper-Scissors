// Score tracker
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

function pickComputerMove() {
  // A function that generates a move for the computer
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'Rock';
  } else if (randomNumber >= 1 / 3 && randomNumber <
    2 / 3) {
    computerMove = 'Paper';
  } else {
    computerMove = 'Scissors';
  }
  return computerMove;
}

function playGame(playerMove) {
  // A function that plays a round of Rock, Paper, Scissors, by comparing the
  // computer's move to the user's move, and alerts the result
  const computerMove = pickComputerMove();
  let result = '';
  
  if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'You lose!';
    } else if (computerMove === 'Paper') {
      result = 'You win!';
    } else if (computerMove === 'Scissors') {
      result = 'It\'s a tie.';
    }
  } else if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'It\'s a tie.';
    } else if (computerMove === 'Paper') {
      result = 'You lose!';
    } else if (computerMove === 'Scissors') {
      result = 'You win!';
    }
  } else if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You win!';
    } else if (computerMove === 'Paper') {
      result = 'It\'s a tie.';
    } else if (computerMove === 'Scissors') {
      result = 'You lose!';
    }
  }
  
  if (result === 'You win!') {
    score.wins += 1;
  } else if (result === 'You lose!') {
    score.losses += 1;
  } else if (result === 'It\'s a tie.') {
    score.ties += 1;
  }
  
  localStorage.setItem('score', JSON.stringify(score));
  
  updateScoreElement();

  document.getElementById('user-choice').innerHTML = `You picked <span>${playerMove.toUpperCase()}</span>`;
  document.getElementById('cpu-choice').innerHTML = `Computer picked <span>${computerMove.toUpperCase()}</span>`;
  document.getElementById('result').innerHTML = result;
  
  if (result === 'You win!') {
    document.body.style.backgroundColor = '#90ee90';
  } else if (result === 'You lose!') {
    document.body.style.backgroundColor = '#ffcdd2';
  } else if (result === 'It\'s a tie.') {
    document.body.style.backgroundColor = '#d3d3d3';
  }

}

function updateScoreElement() {
  document.getElementById('user-score').innerHTML = score.wins;
  document.getElementById('ties-score').innerHTML = score.ties;
  document.getElementById('cpu-score').innerHTML = score.losses;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  
  localStorage.removeItem('score');
  updateScoreElement();

  document.body.style.backgroundColor = '#000000';
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('Scissors');
});

// TODO: add reset button
document.querySelector('.js-reset-button').addEventListener('click', () => {
  resetScore();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock');
  } else if (event.key === 'p') {
      playGame('Paper');
  } else if (event.key === 's') {
      playGame('Scissors');
  } else if (event.key === 'q') {
      resetScore();
  }
});
