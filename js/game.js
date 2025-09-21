'use strict'

var gMat

var gBoard = {
    minesAroundCount: 4,
    isRevealed: false,
    isMine: false,
    isMarked: false
}

var gLevel = {
    SIZE: 4,
    MINES: 2
}

function init() {

    gMat = buildBoard()
    renderBoard(gMat, '.game-board')

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

    return board
}