var player1 = prompt("Player One: You will be blue. Please, enter your name:")
const player1Color = "rgb(86, 151, 255)"
var player2 = prompt("Player Two: You will be red. Please, enter your name:")
const player2Color = "rgb(237, 45, 73)"

var table = $("table tr")

//initialization
var currentPlayer = 1
var currentName = player1
var currentColor = player1Color
var game_on = true
var freeSpaces = $(".board button").length
$("#turnMessage").text(generateTurnMessage(currentPlayer))


function generateTurnMessage(currentPlayer) {
    var msg = (currentPlayer === 1 ? player1 : player2)
    msg += (": It is your turn, please pick a column to drop your ")
    msg += (currentPlayer === 1 ? "blue chip." : "red chip.")
    return msg
}

function reportWin(rowNum, colNum) {
    console.log("You won starting at this row " + rowNum + " ,col " + colNum);
    game_on = false
}

function changeColor(rowIndex, colIndex, color) {
    return table.eq(rowIndex).find("td")
        .eq(colIndex).find("button")
        .css("background-color", color)
}

function getColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find("td")
        .eq(colIndex).find("button")
        .css("background-color")
}

function checkBottom(colIndex) {
    var colorReport = ""
    for (let row = 5; row >= 0; row--) {
        colorReport = getColor(row, colIndex)
        if (colorReport === "rgb(128, 128, 128)") {
            return row
        }
    }
    return -1
}

function colorMatchCheck(_1, _2, _3, _4) {
    return (_1 === _2 && _1 === _3 && _1 === _4
        && _1 !== "rgb(128, 128, 128)"
        && _1 !== undefined)
}

function horizontalWinCheck() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (colorMatchCheck(getColor(row, col), getColor(row, col + 1), getColor(row, col + 2), getColor(row, col + 3))) {
                console.log("horizontal win");
                reportWin(row, col)
                return true
            }
        }
    }
}

function verticalWinCheck() {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            if (colorMatchCheck(getColor(row, col), getColor(row + 1, col), getColor(row + 2, col), getColor(row + 3, col))) {
                console.log("vertical win");
                reportWin(row, col)
                return true
            }
        }
    }
}

function diagonalWinCheck() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            if (colorMatchCheck(getColor(row, col), getColor(row + 1, col + 1), getColor(row + 2, col + 2), getColor(row + 3, col + 3))) {
                console.log("diagonal win");
                reportWin(row, col)
                return true
            }
        }
    }
    for (let row = 3; row <= 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (colorMatchCheck(getColor(row, col), getColor(row - 1, col + 1), getColor(row - 2, col + 2), getColor(row - 3, col + 3))) {
                console.log("diagonal win");
                reportWin(row, col)
                return true
            }
        }
    }
}

function gameIsOver() {
    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
        $("h1").text(currentName + ", you have won!")
        $("h2").slideUp(3000)
        $("h3").slideUp(3000)
    } else if (freeSpaces === 0) {
        $("h1").text("Draw!")
        $("h2").text("There is no more spaces!")
        $("h3").slideUp(3000)
    }
}

$(".board button").on("click", function () {
    if (game_on) {
        var col = $(this).closest("td").index()
        var row = checkBottom(col)
        if (row !== -1) {
            changeColor(row, col, currentColor)
            freeSpaces--
            if (gameIsOver() !== false) {
                currentPlayer *= -1
                if (currentPlayer === 1) {
                    currentName = player1
                    currentColor = player1Color
                } else {
                    currentName = player2
                    currentColor = player2Color
                }
                $("#turnMessage").text(generateTurnMessage(currentPlayer))
            }
        }
    }
})