
var connectFour = {

   // One-dimensional array to hold token values representing both players' gamePiece locations
   // Empty slot value = 0, Black token value = 1, Red token value = -1
   gameArray:
         [  0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0  ],

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
   }
}

$(".welcomebox").click(connectFour.buildBoard);
