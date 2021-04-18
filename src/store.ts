
import Game from './ai/game';
import Computer from './ai/computer';
import Move from './ai/move';
import { debug } from 'node:console';


export const initialState = { 
  actionsToSend: [],
  character: 'sber',
  respectfulAppeal: true,

  //The initial setup

  russianRules: false,
  /*
  backwardDirection: true,
  players: [{isRobot: true}, {isRobot: false}],
  playerTurn: 2,
  */

  backwardDirection: false,
  players: [{isRobot: false}, {isRobot: true}],
  playerTurn: 1,


  // с клавиатуры выбирали поле
  hasArrowSelectedItem: false,
  arrowSelectedItemRow: 4, arrowSelectedItemCol: 4,

  // Здесь счетчик
  isContiniousMoving: 0,
  continiousMoving: [],
  continiousCaptured: [],

  // какая-то шашка выбрана. после любого хода сбрасывается
  hasSelectedItem: false,
  selectedItemRow: 0, selectedItemCol: 0,

  // 1 -> player 1 normal pieces, 2 -> player 2 normal pieces, 3 -> player 1 kings, 4 -> player 2 kings
  // Нормальное начальное состояние
  gameBoard : [
    [0, 11, 0, 21, 0, 31, 0, 41],
    [51, 0, 61, 0, 71, 0, 81, 0],
    [0, 91, 0, 101, 0, 111, 0, 121],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [132, 0, 142, 0, 152, 0, 162, 0],
    [0, 172, 0, 182, 0, 192, 0, 202],
    [212, 0, 222, 0, 232, 0, 242, 0]
  ],
  // нули для копирования
  /*
  gameBoard : [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  */


  /*
  gameBoard : [
    [0, 0, 0, 0, 0, 0, 0, 11],
    [21, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [12, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 22, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 33],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  gameBoard : [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 12, 0, 0, 0, 0, 0, 11],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 23, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  */
  /*
  gameBoard : [
    [0, 11, 0, 21, 0, 0, 0, 41],
    [51, 0, 61, 0, 71, 0, 81, 0],
    [0, 91, 0, 0, 0, 111, 0, 0],
    [202, 0, 0, 0, 501, 0, 0, 0],
    [0, 0, 0, 0, 0, 401, 0, 402],
    [134, 0, 0, 0, 0, 0, 0, 0],
    [0, 172, 0, 182, 0, 0, 0, 0],
    [212, 0, 222, 0, 232, 0, 242, 0]
  ],

  gameBoard : [
    [0, 0, 0, 0, 0, 24, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 12, 0, 0, 0, 11, 0, 21],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [32, 0, 42, 0, 0, 0, 52, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 62, 0, 0, 0, 0, 0]
  ],
  */


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

  russianRules: boolean,
  backwardDirection: boolean,
  players: {isRobot: boolean}[],
  playerTurn: number,

  hasArrowSelectedItem: boolean,
  arrowSelectedItemRow: number, arrowSelectedItemCol: number,

  hasSelectedItem: boolean,
  selectedItemRow: number, selectedItemCol: number,

  isContiniousMoving: number,
  continiousMoving: {y: number, x: number}[],
  continiousCaptured: {y: number, x: number}[],

  gameBoard: number[][],
  pieces : string[],
  tiles : string[]

};

type Action =
  | {
    type: "init";
  }
  | {
    type: "character";
    character_id: string;
  }
  | {
    type: "change_direction";
    data: any;
  }
  | {
    type: "fire123";
    data: any;
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
    type: "move_robot"; // первый ход робота (хотя можно запускать и чтобы робот сделал ход за человека его шашками)
  }
  | {
    type: "continue_move_by_robot" // следующие ходы робота
  };


function getLegalMoves(state: State)
{
  // Есть ли эта шашка возможных ходах
  let checkers = Game.EmptyGameStatic();
  // Важно, чтобы -1 заполнились там, где нельзя ничего ставить
  checkers.newGame();
  // Текущее состояние
  checkers.setCurrentState(state.gameBoard, state.playerTurn, 1);
  checkers.russianRules=state.russianRules;
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
    let checker=newBoard[move.initialRow][move.initialCol];
    newBoard[move.initialRow][move.initialCol] = 0;

    if ((move.listVisitedRow[0]===7&&checker%10===1)||(move.listVisitedRow[0]===0&&checker%10===2))
    {
      checker+=2;
    }

    newBoard[move.listVisitedRow[0]][move.listVisitedCol[0]] = checker;

    // 
    let continiousMoving=[];
    let continiousCaptured=[];
    for (let i=0; i<move.listVisitedRow.length; i++)
    {
      continiousMoving.push({y:move.listVisitedRow[i], x:move.listVisitedCol[i]});
      continiousCaptured.push({y:move.listCaptureRow[i], x:move.listCaptureCol[i]});
    }

    // Игрок может ходить дальше только этой шашкой и только продолжать рубить
    if (state.players[state.playerTurn-1])
    {
      return {
        ...state,
        gameBoard: newBoard,
        isContiniousMoving: 1,
        continiousMoving: continiousMoving,
        continiousCaptured: continiousCaptured,
        // сразу выделим эту шашку
        hasSelectedItem: true,
        selectedItemRow: move.listVisitedRow[0], selectedItemCol:move.listVisitedCol[0]
      };
  
    }
    
    // Это робот
    return {
      ...state,
      gameBoard: newBoard,
      isContiniousMoving: 1,
      continiousMoving: continiousMoving,
      continiousCaptured: continiousCaptured,
      // не важно, что это робот, но после хода сбрасываем выделенную шашку
      hasSelectedItem: false
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
    isContiniousMoving: 0,
    playerTurn: state.playerTurn===1?2:1,
    hasSelectedItem: false
  };
}

export const reducer = (state: State, action: Action) => {

  switch (action.type) {

    case "character":
      return {
        ...state,
        character: action.character_id, respectfulAppeal: action.character_id!=='joy'
      }

    case "change_direction":
      console.log("change_direction");
      return {
        ...state
      }

    case "fire123":
      console.log("fire123");
      return {
        ...state
      }

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
       let color=newBoard[state.selectedItemRow][state.selectedItemCol];
      newBoard[state.selectedItemRow][state.selectedItemCol] = 0;
      newBoard[action.row][action.column] = color;// state.playerTurn;
     }

      return {
        ...state,
        gameBoard: newBoard
        // TODO включить переход хода
        //playerTurn: state.playerTurn===1?2:1
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
      selectedItemCol: action.column
    };

    case "arrow_down":
      return {
        ...state,
        hasArrowSelectedItem: true,
        //arrowSelectedItemRow: !state.backwardDirection?(state.arrowSelectedItemRow>=7?7:state.arrowSelectedItemRow+1):(state.arrowSelectedItemRow>0?state.arrowSelectedItemRow-1:0)
        arrowSelectedItemRow: state.arrowSelectedItemRow>=7?7:state.arrowSelectedItemRow+1
      };

    case "arrow_up":
      return {
        ...state,
        hasArrowSelectedItem: true,
        //arrowSelectedItemRow: state.backwardDirection?(state.arrowSelectedItemRow>=7?7:state.arrowSelectedItemRow+1):(state.arrowSelectedItemRow>0?state.arrowSelectedItemRow-1:0)
        arrowSelectedItemRow: state.arrowSelectedItemRow>0?state.arrowSelectedItemRow-1:0
      };

    case "arrow_right":
      return {
        ...state,
        hasArrowSelectedItem: true,
        //arrowSelectedItemCol: !state.backwardDirection?(state.arrowSelectedItemCol>=7?7:state.arrowSelectedItemCol+1):(state.arrowSelectedItemCol>0?state.arrowSelectedItemCol-1:0)
        arrowSelectedItemCol: state.arrowSelectedItemCol>=7?7:state.arrowSelectedItemCol+1
      };


    case "arrow_left":
      return {
        ...state,
        hasArrowSelectedItem: true,
        //arrowSelectedItemCol: state.backwardDirection?(state.arrowSelectedItemCol>=7?7:state.arrowSelectedItemCol+1):(state.arrowSelectedItemCol>0?state.arrowSelectedItemCol-1:0)
        arrowSelectedItemCol: state.arrowSelectedItemCol>0?state.arrowSelectedItemCol-1:0
      };

    case "arrow_ok":
    {
      // если не был курсор на экране, просто включим его, без обработки
      if (state.hasArrowSelectedItem)
      {
        let checker=state.gameBoard[state.arrowSelectedItemRow][state.arrowSelectedItemCol];
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
                if (move.listCaptureRow.length>0)
                {
                  if (move.initialRow===state.arrowSelectedItemRow&&move.initialCol===state.arrowSelectedItemCol)
                  {
                    foundedMove=move;
                  }
                } else
                {
                  if (move.startRow===state.arrowSelectedItemRow&&move.startCol===state.arrowSelectedItemCol)
                  {
                    foundedMove=move;
                  }
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
                  selectedItemCol: state.arrowSelectedItemCol
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
                if (move.initialRow===state.selectedItemRow&&move.initialCol===state.selectedItemCol&&move.listVisitedRow[0]===state.arrowSelectedItemRow&&move.listVisitedCol[0]===state.arrowSelectedItemCol)
                  foundedMove=move;
              } else {
                if (move.startRow===state.selectedItemRow&&move.startCol===state.selectedItemCol&&move.endRow===state.arrowSelectedItemRow&&move.endCol===state.arrowSelectedItemCol)
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
                // это выставляется в doMove - если ходил игрок и дальше должен рубить этой же шашкой, то выделение остается
                //hasSelectedItem: false
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
  


    case "move_robot": // первый ход робота (хотя можно запускать и чтобы робот сделал ход за человека его шашками)
    {
      let checkers = Game.EmptyGameStatic();
      let computerPlayer = new Computer(state.playerTurn, 1);
      // Важно, чтобы -1 заполнились там, где нельзя ничего ставить
      checkers.newGame();
      // Текущее состояние
      checkers.setCurrentState(state.gameBoard, state.playerTurn, 3);
      checkers.russianRules=state.russianRules;

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
               ...newState
               //playerTurn: state.playerTurn===1?2:1
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

    case "continue_move_by_robot":
    {
      // продолжаем только если это робот
      // для человека просто ход ограничивается этой шашкой (и она при этом выделена всегда)
      if (state.isContiniousMoving===0||!state.players[state.playerTurn-1].isRobot)
        return state;

      let newBoard: number[][]=[];
      state.gameBoard.forEach(line => {
       newBoard.push(line.slice());
      });

      // Тут будет 1,2,... потому, что нулевой ход уже сделан
      let i=state.isContiniousMoving;
      // Столько ходов осталось
      let checker=newBoard[state.continiousMoving[i-1].y][state.continiousMoving[i-1].x];
      // Откуда переместились
      let restMoves=state.continiousMoving.length-state.isContiniousMoving;
      newBoard[state.continiousMoving[i-1].y][state.continiousMoving[i-1].x]=0;
      // Срубленные
      newBoard[state.continiousCaptured[i].y][state.continiousCaptured[i].x]=0;
      // Переход в дамки
      if ((state.continiousMoving[i].y===7&&checker%10===1)||(state.continiousMoving[i].y===0&&checker%10===2))
      {
        checker+=2;
      }
      // Новая координата
      newBoard[state.continiousMoving[i].y][state.continiousMoving[i].x] = checker;

      if (restMoves>1)
      {
        // Ход не переходит
        return {
          ...state,
          gameBoard: newBoard,
          isContiniousMoving: state.isContiniousMoving+1
        };
      }
    
      // Обычный ход, либо последний срубленный
    
    
      // Ход переходит
      return {
        ...state,
        gameBoard: newBoard,
        isContiniousMoving: 0,
        playerTurn: state.playerTurn===1?2:1
      };
    }

    default:
      throw new Error();
  }
};
