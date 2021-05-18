
import Game from './ai/game';
import Computer from './ai/computer';
import Move from './ai/move';
//import { debug } from 'node:console';


export const initialState = { 
  actionsToSend: [],
  character: 'sber',
  respectfulAppeal: true,
  assistantBottomString: "0px",

  //The initial setup

  russianRules: false,

  backwardDirection: true,
  players: [{isRobot: false}, {isRobot: true}],
  playerTurn: 1,
  gameOver: false,
  playerWin: 0,
  capturedPieces: [0, 0],


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

  //arrays to store the instances
  //pieces : [],
  //tiles : []

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
  assistantBottomString: string,

  russianRules: boolean,
  backwardDirection: boolean,
  players: {isRobot: boolean}[],
  playerTurn: number,
  gameOver: boolean,
  playerWin: number,
  capturedPieces: Array<number>,


  hasArrowSelectedItem: boolean,
  arrowSelectedItemRow: number, arrowSelectedItemCol: number,

  hasSelectedItem: boolean,
  selectedItemRow: number, selectedItemCol: number,

  isContiniousMoving: number,
  continiousMoving: {y: number, x: number}[],
  continiousCaptured: {y: number, x: number}[],

  gameBoard: number[][],
  //pieces : string[],
  //tiles : string[]

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
    type: "assistantBottomString";
    bottomString: string;
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
    // -1 потому, что в массиве нумерация с 0, а в игре с 1
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
        selectedItemRow: move.listVisitedRow[0], selectedItemCol:move.listVisitedCol[0],
        capturedPieces: [state.capturedPieces[0]+(state.playerTurn===1?1:0), state.capturedPieces[1]+(state.playerTurn===1?0:1)]
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
      hasSelectedItem: false,
      capturedPieces: [state.capturedPieces[0]+(state.playerTurn===1?1:0), state.capturedPieces[1]+(state.playerTurn===1?0:1)]
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
  // если срубили, увеличим счетчик
  if (move.listCaptureCol.length>0)
  {
    return endTurnChangePlayer({...state, gameBoard: newBoard, isContiniousMoving: 0, hasSelectedItem: false, capturedPieces: [state.capturedPieces[0]+(state.playerTurn===1?1:0), state.capturedPieces[1]+(state.playerTurn===1?0:1)]});
  }
  // не рубили
  return endTurnChangePlayer({...state, gameBoard: newBoard, isContiniousMoving: 0, hasSelectedItem: false});
  /*
  return {
    ...state,
    gameBoard: newBoard,
    isContiniousMoving: 0,
    playerTurn: state.playerTurn===1?2:1,
    hasSelectedItem: false
  };
  */
}

// вызывается, когда надо передать ход другому игроку. проверяет, что игра закончилась
function endTurnChangePlayer(state: State)
{
  // на всякий случай проверка, что игра уже закончилась
  if (state.gameOver)
    return state;
  let checkers = Game.EmptyGameStatic();
  // Важно, чтобы -1 заполнились там, где нельзя ничего ставить
  checkers.newGame();
  // Текущее состояние
  checkers.setCurrentState(state.gameBoard, 3-state.playerTurn, 3);
  checkers.russianRules=state.russianRules;

  let legalMoves = checkers.getLegalMoves(checkers.board);
  if (legalMoves.length===0) {
    return {
      ...state,
      gameOver: true,
      playerWin: state.playerTurn
    };
  }
  return {
    ...state,
    playerTurn: 3-state.playerTurn
  };


}

function processCellPress(state: State, row: number, col: number): State
{
  // если игра закончилась или сейчас ход компьютера, выход без изменений
  if (state.gameOver||state.players[state.playerTurn-1].isRobot)
    return state;
  //
  let checker=state.gameBoard[row][col];
  // поле, где есть шашка
  if (checker>0)
  {
    // если это шашка игрока, чей ход
    if (checker%10===state.playerTurn||checker%10===state.playerTurn+2)
    {
      let legalMoves=getLegalMoves(state);
      if (legalMoves.length!==0)
      {
        let foundedMove=null;
        legalMoves.forEach(move => {
          if (move.listCaptureRow.length>0)
          {
            if (move.initialRow===row&&move.initialCol===col)
            {
              foundedMove=move;
            }
          } else
          {
            if (move.startRow===row&&move.startCol===col)
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
            //hasArrowSelectedItem: true,
            hasSelectedItem: true,
            selectedItemRow: row,
            selectedItemCol: col
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
          if (move.initialRow===state.selectedItemRow&&move.initialCol===state.selectedItemCol&&move.listVisitedRow[0]===row&&move.listVisitedCol[0]===col)
            foundedMove=move;
        } else {
          if (move.startRow===state.selectedItemRow&&move.startCol===state.selectedItemCol&&move.endRow===row&&move.endCol===col)
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
          //hasArrowSelectedItem: true,
          // это выставляется в doMove - если ходил игрок и дальше должен рубить этой же шашкой, то выделение остается
          //hasSelectedItem: false
        };

      }

    }
  }

  // эту клетку нельзя выбирать, а если до этого что-то было выбрано, сбрасываем
  return {...state, hasSelectedItem: false};

}


// Голосом назвали откуда и куда ходить
function processFullMove(state: State, row: number, col: number, row_dest: number, col_dest: number): State
{
  let checker=state.gameBoard[row][col];
  let checker_dest=state.gameBoard[row_dest][col_dest];
  // поле, где есть шашка

  // Откуда ходим - это шашка игрока, а куда - пусто
  if (checker>0&&(checker%10===state.playerTurn||checker%10===state.playerTurn+2)&&checker_dest===0)
  {
    // пустое поле, если сюда выделенная шашка ходит, то делаем ход
    let legalMoves=getLegalMoves(state);
    let foundedMove=null;
    legalMoves.forEach(move => {
      if (move.listCaptureCol.length>0)
      {
        // если есть срубленные, надо смотреть координаты initial 
        if (move.initialRow===row&&move.initialCol===col&&move.listVisitedRow[0]===row_dest&&move.listVisitedCol[0]===col_dest)
          foundedMove=move;
      } else {
        if (move.startRow===row&&move.startCol===col&&move.endRow===row_dest&&move.endCol===col_dest)
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
        //hasArrowSelectedItem: true,
        // это выставляется в doMove - если ходил игрок и дальше должен рубить этой же шашкой, то выделение остается
        //hasSelectedItem: false
      };
    }
  }

  // если ход неправильный, ничего не меняем
  return state;

}


function coordToRowCol (index: number, backwardDirection: boolean): {row: number, col:number}|undefined
{
  if (index>=1&&index<=32)
  {
    let row=Math.floor((index-1)/4);
    let col=(index-1-row*4)*2+(row+1)%2;
    if (backwardDirection)
    {
      switch (col)
      {
        case 0:
          col=6;
          break;
        case 1:
          col=7;
          break;
        case 2:
          col=4;
          break;
        case 3:
          col=5;
          break;
        case 4:
          col=2;
          break;
        case 5:
          col=3;
          break;
        case 6:
          col=0;
          break;
        case 7:
          col=1;
          break;
      }
    }
    return {row: row, col:col};
  }
  return undefined;
}


export const reducer = (state: State, action: Action) => {

  switch (action.type) {

    case "character":
      return {
        ...state,
        character: action.character_id, respectfulAppeal: action.character_id!=='joy'
      }
      
    case "assistantBottomString":
      return {
        ...state,
        assistantBottomString: action.bottomString
      }

    case "change_direction":
      console.log("change_direction, userId={action.data?.userId}");
      if (action.data) 
      {
        if (action.data.direction&&action.data.direction===1)
        {
          return {
            ...state,
            backwardDirection: false
          }
        }
        if (action.data.direction&&action.data.direction===2)
        {
          return {
            ...state,
            backwardDirection: true
          }
        }
      }
      return {
        ...state,
        backwardDirection: !state.backwardDirection
      }

    case "fire123":
      //console.log("fire123");
      if (action.data.n0)
      {
        let cellCoord=coordToRowCol(action.data.n0, state.backwardDirection);
        if (cellCoord)
          return processCellPress(state, cellCoord.row, cellCoord.col);
      } else if (action.data.n1&&action.data.n2)
      {
        let cellCoord1=coordToRowCol(action.data.n1, state.backwardDirection);
        let cellCoord2=coordToRowCol(action.data.n2, state.backwardDirection);
        if (cellCoord1&&cellCoord2)
          return processFullMove(state, cellCoord1.row, cellCoord1.col, cellCoord2.row, cellCoord2.col);
      }
  
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
    {
      //move piece when tile is clicked
      /*
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
      */
      let newState=processCellPress(state, action.row, action.column);
      return newState;
      /*
      return {
        ...newState,
        hasSelectedItem: true,
        selectedItemRow: action.row,
        selectedItemCol: action.column
      };
      */
    }
  

    case "piece_click":
    {
      //select the piece on click if it is the player's turn

      let newState=processCellPress(state, action.row, action.column);
      return newState;
      /*
      return {
        ...newState,
        hasSelectedItem: true,
        selectedItemRow: action.row,
        selectedItemCol: action.column
      };
      */
    }

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
        if (state.backwardDirection)
          return processCellPress(state, 7-state.arrowSelectedItemRow, 7-state.arrowSelectedItemCol);
        return processCellPress(state, state.arrowSelectedItemRow, state.arrowSelectedItemCol)
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

      // На самом деле эта проверка на всякий случай, т.к. проверка происходит сразу после хода предыдущего игрока
      let legalMoves = checkers.getLegalMoves(checkers.board);
      if (legalMoves.length===0) {
        //console.log("I am lost!");
        return {
          ...state,
          gameOver: true,
          playerWin: 3-state.playerTurn
        };

      } else {
          let move = computerPlayer.alphaBetaSearch(checkers);
          if (move)
          {
            checkers.applyMove(move, checkers.board);
            //console.log("Player Chose: ");
            //checkers.printMove(move);

            let newState=doMove(state, move);
            return newState;
          }
      }
      // Сюда не придет, т.к. если ход есть, то он будет найден
      return state;
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
          isContiniousMoving: state.isContiniousMoving+1,
          capturedPieces: [state.capturedPieces[0]+(state.playerTurn===1?1:0), state.capturedPieces[1]+(state.playerTurn===1?0:1)]
        };
      }
    
      // Обычный ход, либо последний срубленный
      // Ход переходит
      return endTurnChangePlayer({...state, gameBoard: newBoard, isContiniousMoving: 0, capturedPieces: [state.capturedPieces[0]+(state.playerTurn===1?1:0), state.capturedPieces[1]+(state.playerTurn===1?0:1)]});
      /*
      return {
        ...state,
        gameBoard: newBoard,
        isContiniousMoving: 0,
        playerTurn: state.playerTurn===1?2:1
      };
      */
    }

    default:
      throw new Error();
  }
};
