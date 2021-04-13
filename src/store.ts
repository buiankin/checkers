import Game from './ai/game';
import Computer from './ai/computer';
import Move from './ai/move';


export const initialState = { 
  actionsToSend: [],
  character: 'sber',
  respectfulAppeal: true,

  //The initial setup

  hasArrowSelectedItem: false,
  arrowSelectedItemRow: 0, arrowSelectedItemColumn: 0,

  hasSelectedItem: false,
  selectedItemRow: 0, selectedItemColumn: 0,

  playerTurn: 1,
  // 1 -> player 1 normal pieces, 2 -> player 2 normal pieces, 3 -> player 1 kings, 4 -> player 2 kings
  gameBoard : [
    [0, 11, 0, 21, 0, 31, 0, 41],
    [51, 0, 61, 0, 71, 0, 81, 0],
    [0, 91, 0, 103, 0, 111, 0, 121],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [134, 0, 142, 0, 152, 0, 162, 0],
    [0, 172, 0, 182, 0, 192, 0, 202],
    [212, 0, 222, 0, 232, 0, 242, 0]
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

  hasArrowSelectedItem: boolean,
  arrowSelectedItemRow: number, arrowSelectedItemColumn: number,

  hasSelectedItem: boolean,
  selectedItemRow: number, selectedItemColumn: number,

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
    type: "arrow_down"
  }
  | {
    type: "arrow_up"
  }
  | {
    type: "arrow_left"
  }
  | {
    type: "arrow_right"
  }
  | {
    type: "arrow_ok"
  }
  | {
    type: "test";
  };


function getLegalMoves(state: State)
{
  // Есть ли эта шашка возможных ходах
  let checkers = new Game();
  // Важно, чтобы -1 заполнились там, где нельзя ничего ставить
  checkers.newGame();
  // Текущее состояние
  checkers.setCurrentState(state.gameBoard, state.playerTurn, 1);
  // дамки без этого не ходят
  //checkers.getBoardStatus();
  let legalMoves = checkers.getLegalMoves(checkers.board);
  return legalMoves;
}  


// повторяющиеся в разных местах действия. правильность хода проверяется в другом месте (до этого)
// учитывается переход хода
function doMove(state: State, move: Move)
{
  let newBoard: number[][]=[];
  state.gameBoard.forEach(line => {
   newBoard.push(line.slice());
  });

  // Записываем нули туда, где были срубленные шашки
  if (move.listCaptureCol.length>0)
  {
    // На самом деле реализуем только один шаг
    let row=move.listCaptureRow[0];
    let col=move.listCaptureCol[0];
    newBoard[row][col] = 0;
  }

  if (move.listCaptureCol.length>1)
  {
    // Ход не переходит
    // TODO сделать, что игрок может ходить дальше только этой шашкой и только продолжать рубить
    let checker=newBoard[move.initialRow][move.initialCol];
    newBoard[move.initialRow][move.initialCol] = 0;

    if ((move.listVisitedRow[0]===7&&checker%10===1)||(move.listVisitedRow[0]===0&&checker%10===2))
    {
      checker+=2;
    }

    newBoard[move.listVisitedRow[0]][move.listVisitedCol[0]] = checker;
  
    return {
      ...state,
      gameBoard: newBoard
    };
  }

  // Обычный ход, либо последний срубленный
  let checker=newBoard[move.startRow][move.startCol];
  newBoard[move.startRow][move.startCol] = 0;
  if ((move.endRow===7&&checker%10===1)||(move.endRow===0&&checker%10===2))
  {
    checker+=2;
  }
  newBoard[move.endRow][move.endCol] = checker;

  


  // Ход переходит
  return {
    ...state,
    gameBoard: newBoard,
    playerTurn: state.playerTurn===1?2:1
  };
}

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
     let newBoard: number[][]=[];
     state.gameBoard.forEach(line => {
      newBoard.push(line.slice());
     });

     if (state.hasSelectedItem)
     {
       // это для теста, чтобы можно было двигать любые фигуры
       let color=newBoard[state.selectedItemRow][state.selectedItemColumn];
      newBoard[state.selectedItemRow][state.selectedItemColumn] = 0;
      newBoard[action.row][action.column] = color;// state.playerTurn;
     }

      return {
        ...state,
        gameBoard: newBoard,
        playerTurn: state.playerTurn===1?2:1
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
      ...state,
      hasSelectedItem: true,
      selectedItemRow: action.row,
      selectedItemColumn: action.column
    };

    case "arrow_down":
      return {
        ...state,
        hasArrowSelectedItem: true,
        arrowSelectedItemRow: state.arrowSelectedItemRow>=7?7:state.arrowSelectedItemRow+1
      };

    case "arrow_up":
      return {
        ...state,
        hasArrowSelectedItem: true,
        arrowSelectedItemRow: state.arrowSelectedItemRow>0?state.arrowSelectedItemRow-1:0
      };

    case "arrow_right":
      return {
        ...state,
        hasArrowSelectedItem: true,
        arrowSelectedItemColumn: state.arrowSelectedItemColumn>=7?7:state.arrowSelectedItemColumn+1
      };


    case "arrow_left":
      return {
        ...state,
        hasArrowSelectedItem: true,
        arrowSelectedItemColumn: state.arrowSelectedItemColumn>0?state.arrowSelectedItemColumn-1:0
      };

    case "arrow_ok":
    {
      // если не был курсор на экране, просто включим его, без обработки
      if (state.hasArrowSelectedItem)
      {
        let checker=state.gameBoard[state.arrowSelectedItemRow][state.arrowSelectedItemColumn];
        // поле, где есть шашка
        if (checker>0)
        {
          // если это шашка игрока
          if (checker%10===state.playerTurn||checker%10===state.playerTurn+2)
          {
            let legalMoves=getLegalMoves(state);
            if (legalMoves.length!==0)
            {
              let foundedMove=null;
              legalMoves.forEach(move => {
                if (move.startRow===state.arrowSelectedItemRow&&move.startCol===state.arrowSelectedItemColumn)
                {
                  foundedMove=move;
                }
              });
              if (foundedMove!==null)
              {
                // Выделаем шашку, которой собрался ходить игрок
                return {
                  ...state,
                  hasArrowSelectedItem: true,
                  hasSelectedItem: true,
                  selectedItemRow: state.arrowSelectedItemRow,
                  selectedItemColumn: state.arrowSelectedItemColumn
                };
  
              }
            }
          }
        } else
        if (checker===0)
        {
          // пустое поле, если сюда выделенная шашка ходит, то делаем ход
          if (state.hasSelectedItem)
          {
            let legalMoves=getLegalMoves(state);
            let foundedMove=null;
            legalMoves.forEach(move => {
              if (move.listCaptureCol.length>0)
              {
                // если есть срубленные, надо смотреть координаты initial 
                if (move.initialRow===state.selectedItemRow&&move.initialCol===state.selectedItemColumn&&move.listVisitedRow[0]===state.arrowSelectedItemRow&&move.listVisitedCol[0]===state.arrowSelectedItemColumn)
                  foundedMove=move;
              } else {
                if (move.startRow===state.selectedItemRow&&move.startCol===state.selectedItemColumn&&move.endRow===state.arrowSelectedItemRow&&move.endCol===state.arrowSelectedItemColumn)
                  foundedMove=move;
              }
          });
            if (foundedMove!==null)
            {
              // делаем ход
              let newState=doMove(state, foundedMove);
              //
              return {
                ...newState,
                hasArrowSelectedItem: true,
                hasSelectedItem: false
              };

            }

          }
        }

      }
      return {
        ...state,
        hasArrowSelectedItem: true
      }
    }
  


    case "test":
    {
      let checkers = new Game();
      let computerPlayer = new Computer(state.playerTurn, 1);
      // Важно, чтобы -1 заполнились там, где нельзя ничего ставить
      checkers.newGame();
      // Текущее состояние
      checkers.setCurrentState(state.gameBoard, state.playerTurn, 1);

      let legalMoves = checkers.getLegalMoves(checkers.board);
      if (legalMoves.length===0) {
        console.log("I am lost!");
          //gameOver = true;
          //console.log("Player 2 Wins!");
          //continue;
      } else {
      //console.log("Player 1's Turn: ");
      //checkers.printListMoves(legalMoves);
      //if (player1IsComputer){
          let move = computerPlayer.alphaBetaSearch(checkers);
          if (move)
          {
            checkers.applyMove(move, checkers.board);
            console.log("Player Chose: ");
            checkers.printMove(move);

            let newState=doMove(state, move);

             return {
               ...newState,
               playerTurn: state.playerTurn===1?2:1
             };
       

          }
      }
      //}
      //checkers.printNote();
      //checkers.printBoard();

    

      return {
        ...state,
        playerTurn: state.playerTurn===1?2:1
      };
    }

    default:
      throw new Error();
  }
};
