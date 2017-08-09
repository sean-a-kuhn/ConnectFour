var connectFour = {

   // var representing which player's turn(1=black, -1=red) and number of wins for each
   playerTurn: 1,
   blackWins: 0,
   redWins: 0,

   // One-dimensional array to hold token values representing both players' gamePiece locations
   // Empty slot value = 0, Black token value = 1, Red token value = -1
   gameArray:
         [  0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0  ],

   // function to indicate player turn at "p.currentTurn"
   alertTurn: function () {

      // change '.currentTurn' html to indicate which player's turn
      if (connectFour.playerTurn === 1) {
         $(".currentTurn").html('<h3 style="color:black;font-weight:bold;">Black</h3>');
      }
      else {
         $(".currentTurn").html('<h3 style="color: red;font-weight:bold;">Red</h3>');
      }
   }, // end function: alertTurn

   // function to control switch between player turns
   switchTurn: function() {

      // set playerTurn value to var "turn" and convert it to opposite value
      var turn = connectFour.playerTurn;
      turn = -1 * turn;

      // switch playerTurn value, +1 to -1 or -1 to +1
      connectFour.playerTurn = turn;

      // change html to indicate player turn at "p.currentTurn"
      connectFour.alertTurn();
   }, // end function: switchTurn

   // function to find correct gameArray index to add new value
   findIndex: function(value) {

      // "error" case, index value exists outside of array size
      // probably due to a full column
      if (value > connectFour.gameArray.length) {
         return value;
      }

      // base case, value at array index is 0, so return index to function call
      else if (connectFour.gameArray[value] === 0) {
         return value;
      }

      // value at gameArray index does not equal zero, so check at next index within the column
      else {
         return connectFour.findIndex(value + 7);
      }
   }, // end function: findIndex

   updateGameArray: function (index) {
      connectFour.gameArray[index] = connectFour.playerTurn;
   }, // end function: updateGameArray

   // function to "add token" to game board by changing color of div inside slot
   addToken: function (index) {
      var tokenId = '#' + index + " div";
      if (connectFour.playerTurn === 1) {
         $(tokenId).css("background-color", "black");
      }
      else {
         $(tokenId).css("background-color", "red");
      }
   }, //end function: addToken

   // function to check for a Connect Four
   checkWin: function(index) {

      if (connectFour.checkHorizontal(index) || connectFour.checkVertical(index) || connectFour.checkDiagUp() || connectFour.checkDiagDown()) {
         return true;
      }
      else {
         return false;
      }
   }, // end function: checkWin

   // function to check for a horizontal Connect Four based upon index of most recently added token
   checkHorizontal: function(index) {

      // find row of target index
      var row = Math.floor(index/7);

      // find range of check indices based on row of target index
      var startRow = 7 * row;
      var endRow = startRow + 6;

      // fine tune range by comparing "starRow" and "endRow" values with indices 3 away to left and right of target index
      var min = Math.max(startRow, index-3);
      var max = Math.min(index+3, endRow);

      // loop to find sum of 4 consecutive array values, 1+1+1+1 or (-1)+(-1)+(-1)+(-1) wins
      for (var i = min; i <= max-3; i++) {
         if (Math.abs(connectFour.gameArray[i] + connectFour.gameArray[i+1] + connectFour.gameArray[i+2] + connectFour.gameArray[i+3]) === 4) {
            return true;
         }
      }

      // if no wins, return false
      return false;
   }, // end function: checkHorizontal

   // function to check for vertical Connect Four based upon index of most recently added token
   checkVertical: function(index) {

      // find base value of column containing index by calculatsing index modulo 7(row length)
      var base = index%7;

      // loop adding 4 vertically consecutive array values, 1+1+1+1 or (-1)+(-1)+(-1)+(-1) wins
      // loop cycles 3 times because there are only 3 combinations of sets of 4 stacked tokens in 6-row board
      for (var i = 0; i <= 2; i++) {
         if (Math.abs(connectFour.gameArray[base] + connectFour.gameArray[base+7] + connectFour.gameArray[base+14] + connectFour.gameArray[base+21]) === 4) {
            return true;
         }
         // if no wins, use token one row up as base
         else {
            base = base+7;
         }
      }

      // if no wins, return false
      return false;
   }, //end function: checkVertical

   // function to check for diagonal connect four moving up and to the right from the start token index
   // algorithm is static and specific to a 6row x 7column grid
   // function begins at bottom-leftmost token, scans, and increments start position right for 3 tokens until a connect four is found. it performs this on rows 0, 1, and 2
   // algorithm is inefficient as it checks every possible location for such a connect four, everytime
   checkDiagUp: function() {

      for (var i=0; i<=14; i+=7) {
         var checkIndex = i;
         for (var j=0; j<=3; j++) {
            if (Math.abs(connectFour.gameArray[checkIndex] + connectFour.gameArray[checkIndex+8] + connectFour.gameArray[checkIndex+16] + connectFour.gameArray[checkIndex+24]) === 4) {
               return true;
            }
            else {
               checkIndex += 1;
            }
         }
      }
      return false;
   }, //end function: checkDiagUp

   // function to check for diagonal connect four moving down and to the right from the start token index
   // algorithm is static and specific to a 6row x 7column grid
   // function begins at top-leftmost token, scans, and increments start position right for 3 tokens until a connect four is found. it performs this on rows 5, 4, and 3
   // algorithm is inefficient as it checks every possible location for such a connect four, everytime
   checkDiagDown: function(index) {

      for (var i=35; i>=21; i-=7) {
         var checkIndex = i;
         for (var j=0; j<=3; j++) {
            if (Math.abs(connectFour.gameArray[checkIndex] + connectFour.gameArray[checkIndex-6] + connectFour.gameArray[checkIndex-12] + connectFour.gameArray[checkIndex-18]) === 4) {
               return true;
            }
            else {
               checkIndex += 1;
            }
         }
      }
      return false;
   }, // end function: checkDiagDown

   // function to hide welcomebox div and unhide gamebox div
   welcomeboxToGamebox: function () {

      // Hide Welcomebox
      $("#welcomebox").addClass('hide');

      // Reveal Gamebox
      $("#gamebox").removeClass('hide');

   }, // end function: welcomeboxToGamebox

   gameboxToWelcomebox: function () {

      // hide gamebox
      $("#gamebox").addClass('hide');

      // Unhide welcomebox
      $("#welcomebox").removeClass('hide');

   }, // end function: gameboxToWelcomebox

   // function to build gameboard
   buildBoard: function () {

      // Populate gameBoard div with gridBoxes, 6 rows by 7 columns
      for (var i=0; i<42; i++) {
         var addSlot = $('<div class="col-xs-1 slot"><div class="gamePiece"></div></div>');
         $("#gameboard").append(addSlot);

      // Assign numerical id to each gridBox.
         addSlot.attr('id', i);
      }

      // round corners by adding classes to corner slots
      $("#0").addClass('slotBottomLeft');
      $("#6").addClass('slotBottomRight');
      $("#35").addClass('slotTopLeft');
      $("#41").addClass('slotTopRight');

      // report number wins for each players
      $("p.playerBlack").html("Black: " + connectFour.blackWins.toString());
      $("p.playerRed").html("Red: " + connectFour.redWins.toString());

      // indicate player turn
      connectFour.alertTurn();
   }, // end function: buildBoard

   dropToken: function (event) {
      // var column captures value "data-buttons", indicating which column user wants to drop token based on button clicked
      var column = parseInt(event.target.dataset.button);

      // var index determines which index of gameArray to add playerTurn value
      var index = connectFour.findIndex(column);

      if (index > connectFour.gameArray.length) {
         alert("Selected column is full, ya dingus.");
      }
      else {
         connectFour.updateGameArray(index);
         connectFour.addToken(index);

         if (connectFour.checkWin(index)) {
            // increment winner's score and alert winner
            if(connectFour.playerTurn === 1) {
               connectFour.blackWins += 1;
               $("#welcomebox").html('<h2 style="color:black; text-align:center;"><b>Black wins!</b></h2><br>');
            }
            else {
               connectFour.redWins += 1;
               $("#welcomebox").html('<h2 style="color:red; text-align:center;"><b>Red wins!</b></h2><br>');
            }

            // ask user to play again
            $("#welcomebox").append('<button class="btn-lg center-block playButton">Play Again</button>');
            connectFour.gameboxToWelcomebox();
         }
         else {
            connectFour.switchTurn();
         }
      }
   }, // end function: dropToken

   resetGame: function () {
      $("#gameboard").empty();
      connectFour.gameArray =
            [  0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0  ];
      connectFour.playerTurn = 1;
      connectFour.buildBoard();
   }
}

$(".playButton").click(function() {connectFour.welcomeboxToGamebox(); connectFour.resetGame()});
$(".buttons").click(connectFour.dropToken);
$(".resetButton").click(connectFour.resetGame);
