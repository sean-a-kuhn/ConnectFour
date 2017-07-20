
var connectFour = {
    playerTurn: 5,
    winsPlayerOne: 0,
    winsPlayerTwo: 0,
    gridArray: [
        [0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0,],
        ],
    addValuetoArray: function (buttonNumber) {
        for (var i = 5; i >= 0; i--) {
            if (connectFour.gridArray[buttonNumber][i] ===  0) {
                connectFour.gridArray[buttonNumber][i] = connectFour.playerTurn;
                break;
            }
        }
    },
    changePlayer: function (buttonNumber) {
        if (connectFour.gridArray[buttonNumber][0] !==  0) {
                $(".gameDisplay").html("");
                $(".gameDisplay").html("<h2>This column is full! Choose another!</h2>");
        } else if (connectFour.playerTurn === 1) {
            connectFour.playerTurn = 5;
        } else if (connectFour.playerTurn === 5) {
            connectFour.playerTurn = 1;
        }
    },
    updateCurrentTurn: function () {
        if (connectFour.playerTurn === 1) {
            $(".currentTurn").html("Player Two");
        } else if (connectFour.playerTurn === 5) {
            $(".currentTurn").html("Player One");
        }
    },
    updateGameFeed: function () {
        $(".gameDisplay").html("");
    },
    updateGamePieceDisplay: function () {
        for (var i = 0; i < connectFour.gridArray.length; i++) {
            for (var j = 0; j < connectFour.gridArray[i].length; j++) {
                if (connectFour.gridArray[i][j] === 1) {
                    var gamePieceCoordinate = '#' + i + '-' + j;
                    $(gamePieceCoordinate).css("background-color", "rgba(255, 0, 0, 0.9)");
                } else if (connectFour.gridArray[i][j] === 5) {
                    var gamePieceCoordinate = '#' + i + '-' + j;
                    $(gamePieceCoordinate).css("background-color", "rgba(0, 0, 0, 0.9)");
                } else if (connectFour.gridArray[i][j] === 0) {
                    var gamePieceCoordinate = '#' + i + '-' + j;
                    $(gamePieceCoordinate).css("background-color", "rgba(255, 255, 255, 1)");
                }
            }
        }
    },
    checkForWin: function () {
        connectFour.checkHorizontal();
        connectFour.checkVertical();
        connectFour.checkDiagonalUp();
        connectFour.checkDiagonalDown();
    },
    updatePlayerWins: function () {
        $(".playerOne").html("Player One: " + connectFour.winsPlayerOne);
        $(".playerTwo").html("Player Two: " + connectFour.winsPlayerTwo);
    },
    checkHorizontal: function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < connectFour.gridArray[i].length; j++) {
                if ((connectFour.gridArray[i][j] + connectFour.gridArray[i + 1][j] + connectFour.gridArray[i + 2][j] + connectFour.gridArray[i + 3][j]) === 4) {
                    $(".gameDisplay").html("");
                    $(".gameDisplay").html("<h2>Player One wins!</h2>");
                    connectFour.winsPlayerOne += 1;
                } else if ((connectFour.gridArray[i][j] + connectFour.gridArray[i + 1][j] + connectFour.gridArray[i + 2][j] + connectFour.gridArray[i + 3][j]) === 20) {
                    $(".gameDisplay").html("");
                    $(".gameDisplay").html("<h2>Player Two wins!</h2>");   
                    connectFour.winsPlayerTwo += 1;
                }
            }
        }
    },
    checkVertical: function () {
        for (var i = 0; i < connectFour.gridArray.length; i++) {
            for (var j = 0; j < 3; j++) {
                if ((connectFour.gridArray[i][j] + connectFour.gridArray[i][j + 1] + connectFour.gridArray[i][j + 2] + connectFour.gridArray[i][j + 3]) === 4) {
                    $(".gameDisplay").html("");
                    $(".gameDisplay").html("<h2>Player One wins!</h2>"); 
                    connectFour.winsPlayerOne += 1;
                } else if ((connectFour.gridArray[i][j] + connectFour.gridArray[i][j + 1] + connectFour.gridArray[i][j + 2] + connectFour.gridArray[i][j + 3]) === 20) {
                    $(".gameDisplay").html("");
                    $(".gameDisplay").html("<h2>Player Two wins!</h2>"); 
                    connectFour.winsPlayerTwo += 1;
                }
            }
        }
    },
    checkDiagonalUp: function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 3; j < 6; j++) {
                if ((connectFour.gridArray[i][j] + connectFour.gridArray[i + 1][j - 1] + connectFour.gridArray[i + 2][j - 2] + connectFour.gridArray[i + 3][j - 3]) === 4) {
                    $(".gameDisplay").html("");
                    $(".gameDisplay").html("<h2>Player One wins!</h2>"); 
                    connectFour.winsPlayerOne += 1;
                } else if ((connectFour.gridArray[i][j] + connectFour.gridArray[i + 1][j - 1] + connectFour.gridArray[i + 2][j - 2] + connectFour.gridArray[i + 3][j - 3]) === 20) {
                    $(".gameDisplay").html("");
                    $(".gameDisplay").html("<h2>Player Two wins!</h2>"); 
                    connectFour.winsPlayerTwo += 1;
                }
            }
        }
    },
    checkDiagonalDown: function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 3; j++) {
                if ((connectFour.gridArray[i][j] + connectFour.gridArray[i + 1][j + 1] + connectFour.gridArray[i + 2][j + 2] + connectFour.gridArray[i + 3][j + 3]) === 4) {
                    $(".gameDisplay").html("");
                    $(".gameDisplay").html("<h2>Player One wins!</h2>");
                    connectFour.winsPlayerOne += 1;
                } else if ((connectFour.gridArray[i][j] + connectFour.gridArray[i + 1][j + 1] + connectFour.gridArray[i + 2][j + 2] + connectFour.gridArray[i + 3][j + 3]) === 20) {
                    $(".gameDisplay").html("");
                    $(".gameDisplay").html("<h2>Player Two wins!</h2>");
                    connectFour.winsPlayerTwo += 1;
                }
            }
        }
    },
    resetGame: function () {
        connectFour.gridArray = [
            [0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 0,],
            ]
        connectFour.updateGamePieceDisplay();
        $(".gameDisplay").html("");
    },
    addGamePiece: function (event) {
        var buttonNumber = parseInt(event.target.dataset.button);
        connectFour.updateGameFeed();
        connectFour.changePlayer(buttonNumber);
        connectFour.addValuetoArray(buttonNumber);
        connectFour.updateGamePieceDisplay();
        connectFour.checkForWin();
        connectFour.updateCurrentTurn();
        connectFour.updatePlayerWins();
    }
};

$(".buttons").click(connectFour.addGamePiece);
$(".resetButton").click(connectFour.resetGame);