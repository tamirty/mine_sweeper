'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            var cell
            var cellStyle = `cell-rev`

            if (!mat[i][j].isRevealed) {
                cell = ''
                cellStyle = `cell`
                if (mat[i][j].isMarked) {
                    cell = FLAG
                }
            }

            else if (mat[i][j].isMine) {
                cell = MINE
            }
            else {
                if (mat[i][j].minesAroundCount === 0) {
                    cell = ''
                } else {
                    cell = mat[i][j].minesAroundCount
                }
            }

            const cellIdx = `cell-${i}-${j}`

            strHTML += `<td onClick = "onCellClicked(this, ${i}, ${j})" oncontextmenu="onCellMarked(this, ${i}, ${j}); return false;" class="${cellStyle} ${cellIdx}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'

    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}