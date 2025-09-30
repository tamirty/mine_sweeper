'use strict'

const MINE = '💣'
const FLAG = '🚩'
var gBoard

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

}

function updateLevel(cells, mines) {
    gLevel.SIZE = cells
    gLevel.MINES = mines
    const elHeader = document.querySelector('h3')
    elHeader.innerText = ''
    gBoard = buildBoard()
    renderBoard(gBoard, '.game-board')
}

function buildBoard() {
    const size = gLevel.SIZE
    const minesNum = gLevel.MINES
    const board = []

    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 4,
                isRevealed: false,
                isMine: false,
                isMarked: false
            }
        }
    }

    board[2][3].isMine = true
    board[0][2].isMine = true
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            board[i][j].minesAroundCount = setMinesNegsCount(i, j, board)

        }
    }
    return board
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
    gBoard[i][j].isRevealed = true
    renderBoard(gBoard, '.game-board')
    var isGameOver = checkGameOver()
    if (isGameOver) {
        const elHeader = document.querySelector('h3')
        elHeader.innerText = 'Game Over'
    }

}

function onCellMarked(elCell, i, j) {
    gBoard[i][j].isMarked = !gBoard[i][j].isMarked
    renderBoard(gBoard, '.game-board')

}

function checkGameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine && gBoard[i][j].isRevealed) return true
        }
    }
}