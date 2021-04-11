

export const initialState = { 
  actionsToSend: [],
  character: 'sber',
  respectfulAppeal: true,

  //The initial setup
  playerTurn: 1,
  gameBoard : [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0]
  ],
  //arrays to store the instances
  pieces : [],
  tiles : []

};




/*
type Note = {
  id: string;
  title: string;
  completed: boolean;
};
*/

type ActionToSend = {
  id: string;
  Action: { action: any };
}

type State = {
  //notes: Array<Note>;
  actionsToSend: Array<ActionToSend>,

  character: string,
  respectfulAppeal: boolean,

  playerTurn: number,
  gameBoard: number[][],
  pieces : string[],
  tiles : string[]

};

type Action =
  | {
    type: "init";
  }
  | {
    type: "go";
    coord: number;
    }
  | {
    type: "go_enemy";
    coord: number;
  }
  | {
    type: "tile_click";
    row: number;
    column: number;
  }
  | {
    type: "piece_click";
    row: number;
    column: number;
  }
  | {
    type: "test";
  };


export const reducer = (state: State, action: Action) => {

  switch (action.type) {

    case "go":
      return {
        ...state
      };

    case "go_enemy":
      return {
        ...state
      };


    case "tile_click":
      //move piece when tile is clicked

      /*
    //make sure a piece is selected
    if ($('.selected').length != 0) {
      //find the tile object being clicked
      var tileID = $(this).attr("id").replace(/tile/, '');
      var tile = tiles[tileID];
      //find the piece being selected
      var piece = pieces[$('.selected').attr("id")];
      //check if the tile is in range from the object
      var inRange = tile.inRange(piece);
      if (inRange != 'wrong') {
        //if the move needed is jump, then move it but also check if another move can be made (double and triple jumps)
        if (inRange == 'jump') {
          if (piece.opponentJump(tile)) {
            piece.move(tile);
            if (piece.canJumpAny()) {
              // Board.changePlayerTurn(); //change back to original since another turn can be made
              piece.element.addClass('selected');
              // exist continuous jump, you are not allowed to de-select this piece or select other pieces
              Board.continuousjump = true;
            } else {
              Board.changePlayerTurn()
            }
          }
          //if it's regular then move it if no jumping is available
        } else if (inRange == 'regular' && !Board.jumpexist) {
          if (!piece.canJumpAny()) {
            piece.move(tile);
            Board.changePlayerTurn()
          } else {
            alert("You must jump when possible!");
          }
        }
      }
    }
      */

      return {
        ...state
      };
  

    case "piece_click":
      //select the piece on click if it is the player's turn

    /*
    var selected;
    var isPlayersTurn = ($(this).parent().attr("class").split(' ')[0] == "player" + Board.playerTurn + "pieces");
    if (isPlayersTurn) {
      if (!Board.continuousjump && pieces[$(this).attr("id")].allowedtomove) {
        if ($(this).hasClass('selected')) selected = true;
        $('.piece').each(function (index) {
          $('.piece').eq(index).removeClass('selected')
        });
        if (!selected) {
          $(this).addClass('selected');
        }
      } else {
        let exist = "jump exist for other pieces, that piece is not allowed to move"
        let continuous = "continuous jump exist, you have to jump the same piece"
        let message = !Board.continuousjump ? exist : continuous
        console.log(message)
      }
    }

    */
      return {
        ...state
      };

    case "test":
      return {
        ...state,
        playerTurn: state.playerTurn===1?2:1
      };

    default:
      throw new Error();
  }
};
