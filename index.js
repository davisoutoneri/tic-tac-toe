let firstTurnPlayer = getRandomInt(10)
let turnGame = 1
const player1 = document.getElementById("player1Name")
const player2 = document.getElementById("player2Name")
const winnerInput = document.getElementById("winner")
let currentPlayer = 0
let gameStarted = false
const root = document.querySelector(":root")
let haveWinner = false
let textWinner = ''
let gameTable = [
  '', '', '',
  '', '', '',
  '', '', '' 
 ]

function getRandomInt(max){
  return Math.floor(Math.random() * max)
}

function checkFirstPlayer(){
  if(firstTurnPlayer % 2 === 0){
    currentPlayer = 1 //par
  }else{
    currentPlayer = 2 //impar
  }
}

function checkCurrentPlayer(){
  if(currentPlayer === 1){
    player1Turn()
    document.getElementById("turnPlayer").innerText = player1.value
    return player1
  }
  else if(currentPlayer === 2){
    player2Turn()
    document.getElementById("turnPlayer").innerText = player2.value
    return player2
  }
}

function player1Turn(){
  root.style.setProperty("--current-player", "var(--player1-color)")
}

function player2Turn(){
  root.style.setProperty("--current-player", "var(--player2-color)")
}

function turnProgression(){
  if(currentPlayer === 1){
    currentPlayer = 2
  }else if (currentPlayer === 2){
    currentPlayer = 1
  }
}

function winnerCheck(){
  let buttonsPlay = document.querySelectorAll(".buttonXO")
  buttonsPlay.forEach(function(buttons, index){
   gameTable[index] = buttons.innerText 
  })
  /* 
    0 1 2
    3 4 5
    6 7 8 
  */
  // Player 1/X Win cases
  if(
    //HORIZONTALLY _
    (gameTable[0] === 'X' && gameTable[1] === 'X' && gameTable[2] === 'X')
    ||
    (gameTable[3] === 'X' && gameTable[4] === 'X' && gameTable[5] === 'X')
    ||
    (gameTable[6] === 'X' && gameTable[7] === 'X' && gameTable[8] === 'X')
    //VERTICALLY |
    ||
    (gameTable[0] === 'X' && gameTable[3] === 'X' && gameTable[6] === 'X')
    ||
    (gameTable[1] === 'X' && gameTable[4] === 'X' && gameTable[7] === 'X')
    ||
    (gameTable[2] === 'X' && gameTable[5] === 'X' && gameTable[8] === 'X')
    //DIAGONALLY /\
    ||
    (gameTable[0] === 'X' && gameTable[4] === 'X' && gameTable[8] === 'X')
    ||
    (gameTable[2] === 'X' && gameTable[5] === 'X' && gameTable[6] === 'X')
    ){
    textWinner = player1.value + ' ganhou o jogo!'
    haveWinner = true
    /* alert(textWinner) */
    //winnerInput.innerText = textWinner
  }
  // Player 2/O Win cases
  else if(
    //HORIZONTALLY _
    (gameTable[0] === 'O' && gameTable[1] === 'O' && gameTable[2] === 'O')
    ||
    (gameTable[3] === 'O' && gameTable[4] === 'O' && gameTable[5] === 'O')
    ||
    (gameTable[6] === 'O' && gameTable[7] === 'O' && gameTable[8] === 'O')
    //VERTICALLY |
    ||
    (gameTable[0] === 'O' && gameTable[3] === 'O' && gameTable[6] === 'O')
    ||
    (gameTable[1] === 'O' && gameTable[4] === 'O' && gameTable[7] === 'O')
    ||
    (gameTable[2] === 'O' && gameTable[5] === 'O' && gameTable[8] === 'O')
    //DIAGONALLY /\
    ||
    (gameTable[0] === 'O' && gameTable[4] === 'O' && gameTable[8] === 'O')
    ||
    (gameTable[2] === 'O' && gameTable[5] === 'O' && gameTable[6] === 'O')
  ){
    textWinner = player2.value + ' ganhou o jogo!'
    haveWinner = true
    /* alert(textWinner) */
    //winnerInput.innerText = textWinner
  }else{
    textWinner = "Partida em andamento!"
    let allFull = 0
    gameTable.forEach(function(index){
      if(index !== ''){
        allFull += 1
      }
    })
    if (allFull === 9 && haveWinner === false){
      textWinner = "Empate!"
    }
  }
  winnerInput.innerText = textWinner
}

function turnOver(){
  turnGame += 1
  turnProgression()
  checkCurrentPlayer()
  winnerCheck()
}

document.getElementById("startBtn").addEventListener('click', function(){
  if(player1.value === '' || player2.value === ''){
    alert("Para o jogo começar, deve ter 2 jogadores.")
  }else{
    checkFirstPlayer()
    checkCurrentPlayer()
    /* alert("O primeiro a jogar é " + checkCurrentPlayer().value + "!!") */
    gameStarted = true
  }
})

function disableRegion(button){
  button.style.cursor = 'default'
}

document.querySelectorAll(".buttonXO").forEach(function (buttonXO){
  buttonXO.addEventListener('click', function(ev){
    if(haveWinner === false){
      checkCurrentPlayer()
      if(gameStarted === true){
        const button = ev.currentTarget
        if(currentPlayer === 1){
          if(button.innerText === '' || button.dataset.value === ''){
            button.dataset.value = 'X'
            button.innerText = 'X'
            button.classList.add('selectedX')
            turnOver()
            disableRegion(button)
          }
        }
        else if(currentPlayer === 2){
          checkCurrentPlayer()
          if(button.innerText === '' || button.dataset.value === ''){
            button.dataset.value = 'O'
            button.innerText = 'O'
            button.classList.add('selectedO')
            turnOver()
            disableRegion(button)
          }
        }
      } 
    }
    
  })
})

document.getElementById('restartBtn').addEventListener('click', function(){
  firstTurnPlayer = getRandomInt(10)
  turnGame = 1
  currentPlayer = 0
  gameStarted = false  
  haveWinner = false
  textWinner = ''
  gameTable = [
    '', '', '',
    '', '', '',
    '', '', '' 
  ]

  document.querySelectorAll(".buttonXO").forEach(function (buttonXO){
    buttonXO.dataset.value = ''
    buttonXO.innerText = ''
    if(buttonXO.classList.contains('selectedX')){
      buttonXO.classList.remove('selectedX')
    }else if(buttonXO.classList.contains('selectedO')){
      buttonXO.classList.remove('selectedO')
    }
  })
})