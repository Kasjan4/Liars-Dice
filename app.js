
// ! Game variables

const roll = document.querySelector('.roll')
const liar = document.querySelector('.liar')
const play = document.querySelector('.play')
const betMenu = document.querySelector('.bet-menu')
const rules = document.querySelector('.intro')

const alLeft = document.querySelector('.al-left')
const alRight = document.querySelector('.al-right')

const pirateOneBubble = document.querySelector('.bubble-left')
const pirateTwoBubble = document.querySelector('.bubble-right')
const pirateOneSpeech = document.querySelector('.pirate-1-speech')
const pirateTwoSpeech = document.querySelector('.pirate-2-speech')

var diceDivs = []

// for showing al dice when liar is called, adds class of cup-player
const cupAl = document.querySelectorAll('.cup-al')

// al dice, to be shown when liar is called
const diceAl1 = document.querySelector('.dice-al1')
const diceAl2 = document.querySelector('.dice-al2')

// ! Sounds

const amb = document.querySelector('.amb')
const shake = document.querySelector('.shake')
const grunt = document.querySelector('.grunt')

// Betting menu
const diceType = document.querySelector('#dice-type')
const diceTypeCurrent = document.querySelector('.dice-type-current')

const diceCount = document.querySelector('#dice-count')
const diceCountCurrent = document.querySelector('.dice-count-current')

const betIncrease = document.querySelector('.bet-increase')


// Player dice
const a1 = document.querySelector('.a1')
const a2 = document.querySelector('.a2')
const a3 = document.querySelector('.a3')
const a4 = document.querySelector('.a4')
const a5 = document.querySelector('.a5')

// Al1 dice
const b1 = document.querySelector('.b1')
const b2 = document.querySelector('.b2')
const b3 = document.querySelector('.b3')
const b4 = document.querySelector('.b4')
const b5 = document.querySelector('.b5')

// Al2 dice
const c1 = document.querySelector('.c1')
const c2 = document.querySelector('.c2')
const c3 = document.querySelector('.c3')
const c4 = document.querySelector('.c4')
const c5 = document.querySelector('.c5')

// Player starting dice and combined dice
let player = []
let al1 = []
let al2 = []
let allDice = []

// Turn of player or al
let turn = 'player'

// Current bet
let currentPlayerBet = []
let currentAl1Bet = []
let currentAl2Bet = []


// ! Starting the game

function startGame() {

  if (turn === 'player') {
    betMenu.style.visibility = 'visible'

    if (currentAl1Bet.length > 0) {
      liar.style.visibility = 'visible'
    }
  } else if (turn === 'al1') {

    setTimeout(() => {

      let sumOfPlayerBet = 0

      for (let i = 0; i < currentPlayerBet.length; i++) {
        sumOfPlayerBet += currentPlayerBet[i]
      }

      if (sumOfPlayerBet > getRandomArbitrary(20, 30)) {
     
        pirateOneBubble.style.visibility = 'visible'
        pirateOneSpeech.innerHTML = 'LIAR!'
        // make all al cups transparent
        document.querySelectorAll('.cup-al').forEach(cup => {
          cup.style.opacity = '0.4'
        })
        // show al dice
        diceAl1.style.opacity = '1'
        diceAl2.style.opacity = '1'
        // check if liar is true
        alLiar(player)


      } else {

        alBetIncrease(currentPlayerBet)
      }

    }, 4000)

  } else if (turn === 'al2') {

    setTimeout(() => {

      let sumOfAl1Bet = 0

      for (let i = 0; i < currentAl1Bet.length; i++) {
        sumOfAl1Bet += currentAl1Bet[i]
      }

      if (sumOfAl1Bet > getRandomArbitrary(15, 30)) {
    
        pirateTwoBubble.style.visibility = 'visible'
        pirateTwoSpeech.innerHTML = 'LIAR!'
        // make all al cups transparent
        document.querySelectorAll('.cup-al').forEach(cup => {
          cup.classList.add('cup-player')
        })
        // show al dice
        diceAl1.style.opacity = '1'
        diceAl2.style.opacity = '1'


        alLiar(currentAl1Bet)
      }
      else {
        alBetIncrease(al2)
      }
    }, 4000)

  }

}



function alLiar(player) {

  let counter = 0
  let lie = true

  if (turn === 'al1') {
    grunt.src = './aud/grunt1.wav'
    grunt.play()

    for (let i = 0; i < allDice.length; i++) {
      if (allDice[i] === currentPlayerBet[0]) {
        counter += 1
      }
    }
    if (counter >= currentPlayerBet.length) lie = false

  } else if (turn === 'al2') {
    grunt.src = './aud/grunt2.wav'
    grunt.play()
    for (let i = 0; i < allDice.length; i++) {
      if (allDice[i] === currentAl1Bet[0]) {
        counter += 1
      }
    }
    if (counter >= currentAl1Bet.length) lie = false

  }

  if (lie && turn === 'al1') {
    setTimeout(() => {
      pirateOneSpeech.innerHTML = 'I knew it! Hand over the gold!'
      setTimeout(() => {
        pirateOneSpeech.innerHTML = ''
        pirateOneBubble.style.visibility = 'hidden'
        alLeft.style.visibility = 'hidden'
        alRight.style.visibility = 'hidden'
        rules.style.visibility = 'visible'
        play.style.visibility = 'visible'

      }, 4000)
    }, 4000)


  } else if (lie && turn === 'al2') {

    setTimeout(() => {
      pirateTwoSpeech.innerHTML = 'I knew it, you never impress me.'
      setTimeout(() => {
        pirateTwoSpeech.innerHTML = ''
        pirateTwoBubble.style.visibility = 'hidden'

        alLeft.style.visibility = 'hidden'
        alRight.style.visibility = 'hidden'
        rules.style.visibility = 'visible'
        play.style.visibility = 'visible'
      }, 4000)
    }, 4000)

  } else if (!lie && turn === 'al1') {
    setTimeout(() => {
      pirateOneSpeech.innerHTML = "I'll get you next time!"
      setTimeout(() => {
        pirateOneSpeech.innerHTML = ''
        pirateOneBubble.style.visibility = 'hidden'

        alLeft.style.visibility = 'hidden'
        alRight.style.visibility = 'hidden'
        rules.style.visibility = 'visible'
        play.style.visibility = 'visible'
      }, 4000)
    }, 4000)
    //pirate 1 leaves the game

  } else if (!lie && turn === 'al2') {
    setTimeout(() => {
      pirateTwoSpeech.innerHTML = "You'll see me again, I guarantee."
      setTimeout(() => {
        pirateTwoSpeech.innerHTML = ''
        pirateTwoBubble.style.visibility = 'hidden'

        alLeft.style.visibility = 'hidden'
        alRight.style.visibility = 'hidden'
        rules.style.visibility = 'visible'
        play.style.visibility = 'visible'
      }, 4000)
    }, 4000)
    //pirate 2 leaves the game

  }

}

// ! Al increases bet

function alBetIncrease() {

  if (turn === 'al1') {

    let playerCurrentHandValue = 0
    let al1CurrentHandValue = 0

    for (let i = 0; i < currentPlayerBet.length; i++) {
      playerCurrentHandValue += currentPlayerBet[i]
    }

    // get a new al1 bet

    let newBet = newAlBet(al1)

    for (let i = 0; i < currentAl1Bet.length; i++) {
      al1CurrentHandValue += currentAl1Bet[i]
    }

    if (al1CurrentHandValue > playerCurrentHandValue) {
     
      turn = 'al2'
      pirateOneSpeech.innerHTML = `I bet ${currentAl1Bet}`
      pirateOneBubble.style.visibility = 'visible'
      setTimeout(() => {
        pirateOneSpeech.innerHTML = ''
        pirateOneBubble.style.visibility = 'hidden'
        startGame()
      }, 4000)
    } else if (al1CurrentHandValue <= playerCurrentHandValue) {

      const strategy = [al1.sort((a, b) => a - b)[al1.length - 1], 6, 5]
 
      const largerstDice = strategy[Math.floor(Math.random() * 3)]

      const diff = Math.ceil(playerCurrentHandValue / largerstDice) + 1

      newBet = []

      for (let i = 0; i < diff; i++) {
        newBet.push(largerstDice)
      }

      currentAl1Bet = newBet

      turn = 'al2'
      pirateOneSpeech.innerHTML = `I bet ${newBet}`
      pirateOneBubble.style.visibility = 'visible'
      setTimeout(() => {
        pirateOneSpeech.innerHTML = ''
        pirateOneBubble.style.visibility = 'hidden'
        startGame()
      }, 4000)

    }

  } else if (turn === 'al2') {

    let al1CurrentHandValue = 0
    let al2CurrentHandValue = 0

    for (let i = 0; i < currentAl1Bet.length; i++) {
      al1CurrentHandValue += currentAl1Bet[i]
    }

    // ! get a new al2 bet

    let newBet = newAlBet(al2)

    for (let i = 0; i < currentAl2Bet.length; i++) {
      al2CurrentHandValue += currentAl2Bet[i]
    }

    if (al2CurrentHandValue > al1CurrentHandValue) {
      turn = 'player'
      pirateTwoSpeech.innerHTML = `I bet ${currentAl2Bet}`
      pirateTwoBubble.style.visibility = 'visible'
      setTimeout(() => {
        pirateTwoSpeech.innerHTML = ''
        pirateTwoBubble.style.visibility = 'hidden'
        startGame()
      }, 4000)
    } else if (al2CurrentHandValue <= al1CurrentHandValue) {

      const strategy = [al1.sort((a, b) => a - b)[al1.length - 1], 6, 5]
  
      const largerstDice = strategy[Math.floor(Math.random() * 3)]

      const diff = Math.ceil(al1CurrentHandValue / largerstDice) + 1

      newBet = []

      for (let i = 0; i < diff; i++) {
        newBet.push(largerstDice)
      }

      currentAl2Bet = newBet

      turn = 'player'
      pirateTwoSpeech.innerHTML = `I bet ${newBet}`
      pirateTwoBubble.style.visibility = 'visible'
      setTimeout(() => {
        pirateTwoSpeech.innerHTML = ''
        pirateTwoBubble.style.visibility = 'hidden'
        startGame()
      }, 4000)

    }

  }


}

// ! Listeners on game


// initial roll
roll.addEventListener('click', () => {
  shake.play()
  play.style.visibility = 'hidden'
  roll.style.visibility = 'hidden'
  betMenu.style.visibility = 'visible'

  for (let i = 0; i < 5; i++) {
    player.push(Math.ceil(Math.random() * 6))
    al1.push(Math.ceil(Math.random() * 6))
    al2.push(Math.ceil(Math.random() * 6))
  }
  // get all initial dice into one array
  for (let i = 0; i < 5; i++) {
    allDice.push(player[i])
    allDice.push(al1[i])
    allDice.push(al2[i])
  }

  // assign the initial dice to the field

  a1.innerHTML = player[0]
  a2.innerHTML = player[1]
  a3.innerHTML = player[2]
  a4.innerHTML = player[3]
  a5.innerHTML = player[4]
  b1.innerHTML = al1[0]
  b2.innerHTML = al1[1]
  b3.innerHTML = al1[2]
  b4.innerHTML = al1[3]
  b5.innerHTML = al1[4]
  c1.innerHTML = al2[0]
  c2.innerHTML = al2[1]
  c3.innerHTML = al2[2]
  c4.innerHTML = al2[3]
  c5.innerHTML = al2[4]

  diceDivs.push(a1, a2, a3, a4, a5, b1, b2, b3, b4, b5, c1, c2, c3, c4, c5)

  for (let i = 0; i < diceDivs.length; i++) {
    if (diceDivs[i].innerHTML === '1') diceDivs[i].classList.add('one')
    else if (diceDivs[i].innerHTML === '2') diceDivs[i].classList.add('two')
    else if (diceDivs[i].innerHTML === '3') diceDivs[i].classList.add('three')
    else if (diceDivs[i].innerHTML === '4') diceDivs[i].classList.add('four')
    else if (diceDivs[i].innerHTML === '5') diceDivs[i].classList.add('five')
    else if (diceDivs[i].innerHTML === '6') diceDivs[i].classList.add('six')
  }

  startGame()
})

// bet menu variables
diceType.addEventListener('change', (event) => {
  diceTypeCurrent.innerHTML = Number(event.target.value) + 1
})

diceCount.addEventListener('change', (event) => {
  diceCountCurrent.innerHTML = Number(event.target.value) + 1
})

// bet increase 
betIncrease.addEventListener('click', () => {

  let al2LatestHandValue = 0
  let playerCurrentHandValue = 0

  for (let i = 0; i < currentAl2Bet.length; i++) {
    al2LatestHandValue += currentAl2Bet[i]
  }
  for (let i = 0; i < Number(diceCount.value) + 1; i++) {
    playerCurrentHandValue += (Number(diceType.value) + 1)
  }

  if (playerCurrentHandValue > al2LatestHandValue) {
    currentPlayerBet = []
    let newPlayerBet = []
    for (let i = 0; i < Number(diceCount.value) + 1; i++) {
      newPlayerBet.push(Number(diceType.value) + 1)
    }
    currentPlayerBet = newPlayerBet
    betMenu.style.visibility = 'hidden'
    liar.style.visibility = 'hidden'
    turn = 'al1'
    startGame()
  } else if (al2LatestHandValue === 0) {
    for (let i = 0; i < Number(diceCount.value) + 1; i++) {
      currentPlayerBet.push(Number(diceType.value) + 1)
    }
    betMenu.style.visibility = 'hidden'
    liar.style.visibility = 'hidden'
    turn = 'al1'
    startGame()
  } else {
    alert('bet not high enough')
  }


})

// player liar! option
liar.addEventListener('click', () => {
  liar.style.visibility = 'hidden'
  betMenu.style.visibility = 'hidden'
  // show cups transparancy
  document.querySelectorAll('.cup-al').forEach(cup => {
    cup.classList.add('cup-player')
  })
  // show all dice
  diceAl1.style.opacity = '1'
  diceAl2.style.opacity = '1'

  grunt.src = './aud/grunt1.wav'
  grunt.play()

  let counter = 0
  let lie = true

  for (let i = 0; i < allDice.length; i++) {
    if (allDice[i] === currentAl2Bet[0]) {
      counter += 1
    }
  }
  if (counter >= currentAl2Bet.length) lie = false



  if (lie) {

    pirateTwoBubble.style.visibility = 'visible'
    pirateTwoSpeech.innerHTML = 'You got me arr.'

    setTimeout(() => {
      pirateTwoBubble.style.visibility = 'hidden'
      pirateTwoSpeech.innerHTML = ''

      alLeft.style.visibility = 'hidden'
      alRight.style.visibility = 'hidden'
      rules.style.visibility = 'visible'
      play.style.visibility = 'visible'
    }, 4000)
  } else if (!lie) {

    pirateTwoBubble.style.visibility = 'visible'
    pirateTwoSpeech.innerHTML = 'Dont try that again son.'

    setTimeout(() => {
      pirateTwoBubble.style.visibility = 'hidden'
      pirateTwoSpeech.innerHTML = ''

      alLeft.style.visibility = 'hidden'
      alRight.style.visibility = 'hidden'
      rules.style.visibility = 'visible'
      play.style.visibility = 'visible'

    }, 4000)
  }


})


// ! initial play 

play.addEventListener('click', () => {
  amb.play()

  if (diceDivs.length > 0) {
    for (let i = 0; i < diceDivs.length; i++) {
      if (diceDivs[i].innerHTML === '1') diceDivs[i].classList.remove('one')
      else if (diceDivs[i].innerHTML === '2') diceDivs[i].classList.remove('two')
      else if (diceDivs[i].innerHTML === '3') diceDivs[i].classList.remove('three')
      else if (diceDivs[i].innerHTML === '4') diceDivs[i].classList.remove('four')
      else if (diceDivs[i].innerHTML === '5') diceDivs[i].classList.remove('five')
      else if (diceDivs[i].innerHTML === '6') diceDivs[i].classList.remove('six')
    }
  }

  player = []
  al1 = []
  al2 = []
  currentPlayerBet = []
  currentAl1Bet = []
  currentAl2Bet = []
  allDice = []
  turn = 'player'
  diceAl1.style.opacity = '0'
  diceAl2.style.opacity = '0'
  diceTypeCurrent.value = 0
  diceCountCurrent.value = 0

  document.querySelectorAll('.cup-al').forEach(cup => {
    cup.style.opacity = '1'
  })

  pirateOneSpeech.innerHTML = 'You must be new here.'
  pirateTwoSpeech.innerHTML = "Let's see what you got!"
  pirateOneBubble.style.visibility = 'hidden'
  pirateTwoBubble.style.visibility = 'hidden'
  play.style.visibility = 'hidden'

  setTimeout(() => {
    roll.style.visibility = 'visible'
  }, 4000)

  rules.style.visibility = 'hidden'
  alLeft.style.visibility = 'visible'
  alRight.style.visibility = 'visible'

  pirateOneBubble.style.visibility = 'visible'
  pirateTwoBubble.style.visibility = 'visible'

  setTimeout(() => {
    pirateOneBubble.style.visibility = 'hidden'
    pirateTwoBubble.style.visibility = 'hidden'
    pirateOneSpeech.innerHTML = ''
    pirateTwoSpeech.innerHTML = ''
  }, 4000)
})


function newAlBet(al) {
  var mf = 1
  var m = 0
  var item

  // get the most common dice the al has
  for (var i = 0; i < al.length; i++) {
    for (var j = i; j < al.length; j++) {
      if (al[i] == al[j])
        m++
      if (mf < m) {
        mf = m
        item = al[i]
      }
    }
    m = 0
  }
  // if undefined, meaning no more than one dice of each kind, get random dice
  if (item === undefined) {
    const randomNumber = Math.ceil(Math.random() * 10)
    if (randomNumber >= 7 && randomNumber <= 10) item = 6
    else if (randomNumber >= 5 && randomNumber < 7) item = 5
    else if (randomNumber >= 3 && randomNumber < 5) item = 4
    else if (randomNumber >= 0 && randomNumber < 3) item = 3
  }
  // the al's risk making decision, depending on how many dice of the same type it has
  let numberOfDice
  if (mf === 1) numberOfDice = getRandomArbitrary(1, 2)
  if (mf === 2) numberOfDice = getRandomArbitrary(2, 3)
  if (mf === 3) numberOfDice = getRandomArbitrary(3, 4)
  if (mf === 4) numberOfDice = getRandomArbitrary(4, 5)
  if (mf === 5) numberOfDice = getRandomArbitrary(5, 6)

  // create a new al bet using the most common dice the al has
  let newAlBet = []
  for (let i = 0; i < numberOfDice; i++) {
    newAlBet.push(item)
  }

  if (turn === 'al1') {
    currentAl1Bet = newAlBet
    return newAlBet
  } else if (turn === 'al2') {
    currentAl2Bet = newAlBet
    return newAlBet
  }


}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}


