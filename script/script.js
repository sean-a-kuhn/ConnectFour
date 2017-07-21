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
         $('.currentTurn').html('<h3 style="color:black;font-weight:bold;">Black</h3>');
      }
      else {
         $('.currentTurn').html('<h3 style="color: red;font-weight:bold;">Red</h3>');
      }
   }, // end function: alertTurn

   // function to control switch between player turns
   switchTurn: function() {

      // set playerTurn value to var "turn" and convert it to opposite value
      var turn = connectFour.playerTurn;
      turn = -1*turn;

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

   addToken: function (index) {
      var tokenId = '#' + index;
      if (connectFour.playerTurn === 1) {
         $(tokenId).css("background-color", "black");
      }
      else {
         $(tokenId).css("background-color", "red");
      }
   }, //end function: addToken

   // function to create gameboard
   buildBoard: function () {

      // Hide Welcomebox
      $('#welcomebox').addClass('hide');

      // Reveal Gamebox
      $('#gamebox').removeClass('hide');

      // Create gameBoard div with class and id "gameboard"
      $("#drop_buttons").after('<div class="center-block gameboard" id="gameboard"></div>');

      // Populate gameBoard div with gridBoxes, 6 rows by 7 columns
      for (var i=0; i<42; i++) {
         var addSlot = $('<div class="col-xs-1 slot"><div class="gamePiece"></div></div>');
         $("#gameboard").append(addSlot);

      // Assign numerical id to each gridBox.
         addSlot.attr('id', i);
      }

      // round corners by adding classes to corner slots
      $('#0').addClass('slotBottomLeft');
      $('#6').addClass('slotBottomRight');
      $('#35').addClass('slotTopLeft');
      $('#41').addClass('slotTopRight');

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
         connectFour.switchTurn();
      }
   } // end function: dropToken
}

$(".playbutton").click(connectFour.buildBoard);
$(".buttons").click(connectFour.dropToken);
