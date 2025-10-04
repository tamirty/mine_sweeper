'use strict'

const MINE = '💣'
const FLAG = '🚩'
var gBoard
var gTimer

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    revealedCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function init() {
    gBoard = buildBoard()
    renderBoard(gBoard, '.game-board')
    gGame.isOn = true
    gGame.revealedCount = 0
    gGame.secsPassed = 0
    renderRevealedCount()
    renderSmiley()
    startTimer()

}


function updateLevel(cells, mines) {
    gLevel.SIZE = cells
    gLevel.MINES = mines
    gGame.isOn = true
    const elDisplay = document.querySelector('.game-over')
    elDisplay.style.display = 'none'
    gBoard = buildBoard()
    renderBoard(gBoard, '.game-board')
    gGame.revealedCount = 0
    gGame.secsPassed = 0
    startTimer()
    renderRevealedCount()
    renderSmiley()
}

function buildBoard() {
    const size = gLevel.SIZE
    const minesNum = gLevel.MINES
    const board = []

    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isRevealed: false,
                isMine: false,
                isMarked: false
            }
        }
    }

    placeMines(board, minesNum)

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            board[i][j].minesAroundCount = setMinesNegsCount(i, j, board)

        }
    }
    return board
}

function placeMines(board, minesNum) {
    const size = board.length
    var minesPlaced = 0

    while (minesPlaced < minesNum) {
        const i = getRandomIntInclusive(0, size - 1)
        const j = getRandomIntInclusive(0, size - 1)
        if (board[i][j].isMine) continue

        board[i][j].isMine = true
        minesPlaced++
    }
}

function setMinesNegsCount(rowIdx, colIdx, board) {
    var count = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === rowIdx && j === colIdx) continue
            if (board[i][j].isMine) count++
        }
    }
    return count
}

function onCellClicked(elCell, i, j) {
    if (!gGame.isOn) return
    if (gBoard[i][j].isRevealed || gBoard[i][j].isMarked) return
    gBoard[i][j].isRevealed = true
    gGame.revealedCount++
    renderBoard(gBoard, '.game-board')
    renderRevealedCount()
    var isGameOver = checkGameOver()
    if (isGameOver === 'win') {
        gGame.isOn = false
        stopTimer()
        const elHeader = document.querySelector('.game-over h3')
        elHeader.innerText = 'Congrats You DID it!'
        elHeader.classList.add('win')
        const elDisplay = document.querySelector('.game-over')
        elDisplay.style.display = 'block'
        const elSmiley = document.querySelector('#smiley')
        elSmiley.innerText = '😎'

    } else if (isGameOver === 'loss') {
        gGame.isOn = false
        stopTimer()
        const elHeader = document.querySelector('.game-over h3')
        elHeader.innerText = 'Game Over'
        const elDisplay = document.querySelector('.game-over')
        elDisplay.style.display = 'block'
        const elSmiley = document.querySelector('#smiley')
        elSmiley.innerText = '🤯'
    }

}

function onCellMarked(elCell, i, j) {
    if (!gGame.isOn) return
    gBoard[i][j].isMarked = !gBoard[i][j].isMarked
    renderBoard(gBoard, '.game-board')
    var isGameOver = checkGameOver()
    if (isGameOver === 'win') {
        gGame.isOn = false
        stopTimer()
        const elHeader = document.querySelector('.game-over h3')
        elHeader.innerText = 'Congrats You DID it!'
        elHeader.classList.add('win')
        const elDisplay = document.querySelector('.game-over')
        elDisplay.style.display = 'block'
        const elSmiley = document.querySelector('#smiley')
        elSmiley.innerText = '😎'

    } else if (isGameOver === 'loss') {
        gGame.isOn = false
        stopTimer()
        const elHeader = document.querySelector('.game-over h3')
        elHeader.innerText = 'Game Over'
        const elDisplay = document.querySelector('.game-over')
        elDisplay.style.display = 'block'
        const elSmiley = document.querySelector('#smiley')
        elSmiley.innerText = '🤯'
        renderSmiley()
    }

}

function checkGameOver() {
    var minesMarked = 0
    const minesNum = gLevel.MINES
    var remainSafeCells = false
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const curCell = gBoard[i][j]
            if (curCell.isMine && curCell.isRevealed) return 'loss'
            if (curCell.isMine && curCell.isMarked) minesMarked++
            if (!curCell.isMine && !curCell.isRevealed) remainSafeCells = true
        }
    }
    if (minesNum === minesMarked && !remainSafeCells) return 'win'
    return null
}

function renderRevealedCount() {
    const elBoxLeft = document.querySelector("#revealedCount")
    elBoxLeft.innerText = gGame.revealedCount

}

function renderSmiley() {
    const elBoxMiddle = document.querySelector("#smiley")
    elBoxMiddle.innerText = '😃'

}

function renderTime() {
    const elBoxLeft = document.querySelector("#secpass")
    elBoxLeft.innerText = gGame.secsPassed

}

function startTimer() {
    gGame.secsPassed = 0
    renderTime()
    clearInterval(gTimer)
    gTimer = setInterval(() => {
        gGame.secsPassed++
        renderTime()
    }, 1000)
}

function stopTimer() {
    clearInterval(gTimer)
}