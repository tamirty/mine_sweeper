'use strict'

const MINE = '💣'
const FLAG = '🚩'
var gBoard

var gLevel = {
    SIZE: 4,
    MINES: 2
}

function init() {

    gBoard = buildBoard()
    renderBoard(gBoard, '.game-board')

}

function updateLevel(cells, mines) {
    gLevel.SIZE = cells
    gLevel.MINES = mines
    gBoard = buildBoard()
    renderBoard(gBoard, '.game-board')
}

function buildBoard() {
    const size = gLevel.SIZE
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

// onCellClicked(elCell, i, j) {


// }

// onCellMarked(elCell, i, j) {


// }

// checkGameOver() {


// }