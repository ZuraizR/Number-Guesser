// Initializing Game Values //
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3

// UI Elements //
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message')

minNum.textContent = min
maxNum.textContent = max

// Play Again Event Listener //
game.addEventListener('mousedown', (e) => {
  if (e.target.className === 'play-again') {
    window.location.reload()
  }
})

// Listen for a Guess //
guessBtn.addEventListener('click', () => {
  let guess = parseInt(guessInput.value)

  // Validation //
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red')
  }

  // Check If Won //
  else if (guess === winningNum) {
    // Game Over - Won
    gameOver(true, `${winningNum} is correct, YOU WIN THE GAME!`)
  } else {
    // Wrong Guess
    guessesLeft -= 1

    if (guessesLeft === 0) {
      // Game Over - Lost
      gameOver(
        false,
        `Game Over, you lost. The correct answer was ${winningNum}`
      )
    } else {
      // Game Continues - Wrong Answer
      // Change Border Color
      guessInput.style.borderColor = 'red'

      // Clear the Input
      guessInput.value = ''

      // Tell User that's the wrong guess
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
    }
  }
})

// Game Over Func //
function gameOver(won, msg) {
  let color
  won === true ? (color = 'green') : (color = 'red')

  //   Disable the Input
  guessInput.disabled = true

  // Change Border Color
  guessInput.style.borderColor = color

  // Change Text Color
  message.style.color = color

  //   Set Message
  setMessage(msg)

  //   Play Again?
  guessBtn.value = 'Play Again'
  //   Add Class to it
  guessBtn.className += 'play-again'
}

// Get Random Number Func //
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Set Message Func //
function setMessage(msg, color) {
  message.textContent = msg
  message.style.color = color
}
