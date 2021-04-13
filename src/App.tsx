import logo from './logo.svg';
import './App.css';

import Game from './ai/game';
import Computer from './ai/computer';
import Move from './ai/move';

import king1 from './img/king1.png';
import king2 from './img/king2.png';

import React, {
  FC,
  memo,
  useReducer,
  //useState,
  //useRef,
  //useEffect,
  //useLayoutEffect,
  //RefObject,
} from 'react';

/*
import {
  createSmartappDebugger,
  createAssistant,
  createRecordPlayer,
  AssistantAppState,
  AssistantSmartAppData,
  AssistantCharacterType
} from "@sberdevices/assistant-client";
*/

import { initialState, reducer } from "./store";
import { background } from '@sberdevices/plasma-tokens';
import { Row } from '@sberdevices/ui';


const dictionary = ["0vmin", "10vmin", "20vmin", "30vmin", "40vmin", "50vmin", "60vmin", "70vmin", "80vmin", "90vmin"];
const label_coords =
  [[0,1,0,2,0,3,0,4],
   [5,0,6,0,7,0,8,0],
   [0,9,0,10,0,11,0,12],
   [13,0,14,0,15,0,16,0],
   [0,17,0,18,0,19,0,20],
   [21,0,22,0,23,0,24,0],
   [0,25,0,26,0,27,0,28],
   [29,0,30,0,31,0,32,0]
  ];


export const App: FC = memo(() => {
  const [appState, dispatch] = useReducer(reducer, initialState);

  function downHandler({key}: KeyboardEvent ) {
    if (key==='ArrowDown')
      dispatch({type: 'arrow_down'});
    if (key==='ArrowUp')
      dispatch({type: 'arrow_up'});
    if (key==='ArrowLeft')
      dispatch({type: 'arrow_left'});
    if (key==='ArrowRight')
      dispatch({type: 'arrow_right'});
    if (key==='Enter')
      dispatch({type: 'arrow_ok'});
  }

  React.useEffect(() => {
    window.addEventListener("keydown", downHandler);
    //window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      //window.removeEventListener("keyup", upHandler);
    };
  });  


  function changePlayerTurn() {
    /*
    if (this.playerTurn == 1) {
      this.playerTurn = 2;
      $('.turn').css("background", "linear-gradient(to right, transparent 50%, #BEEE62 50%)");
    } else {
      this.playerTurn = 1;
      $('.turn').css("background", "linear-gradient(to right, #BEEE62 50%, transparent 50%)");
    }
    this.check_if_jump_exist()
    return;
    */
  }

  function handleTileClick(row: any, column: any, e:any) {
    e.preventDefault();
    dispatch({type: 'tile_click', row: row, column: column});
  }
  

function _renderTiles()
{
  let values = [];

  let countTiles=0;

  for (let row=0; row<appState.gameBoard.length; row++) { //row is the index
    for (let column=0; column<appState.gameBoard[row].length; column++) { //column is the index
      //whole set of if statements control where the tiles and pieces should be placed on the board
      if (row % 2 === 1) {
        if (column % 2 === 0) {

          const divStyle = {
            top: dictionary[row],
            left: dictionary[column],
            color: "#FF3333"
          };          
      
          values.push(<div key={countTiles.toString()} className="tile" id={"tile"+countTiles.toString()} style={divStyle} onClick={(e)=>handleTileClick(row, column, e)}>{label_coords[row][column].toString()}</div>);
          countTiles++;

        }
      } else {
        if (column % 2 === 1) {
          //countTiles = this.tileRender(row, column, countTiles)
          const divStyle = {
            top: dictionary[row],
            left: dictionary[column],
            color: "#FF3333"
          };          
      
          values.push(<div key={countTiles.toString()} className="tile" id={"tile"+countTiles.toString()} style={divStyle} onClick={(e)=>handleTileClick(row, column, e)}>{label_coords[row][column].toString()}</div>);
          countTiles++;

        }
      }
      /*
      if (this.board[row][column] == 1) {
        countPieces = this.playerPiecesRender(1, row, column, countPieces)
      } else if (this.board[row][column] == 2) {
        countPieces = this.playerPiecesRender(2, row, column, countPieces)
      }
      */
    }
  }

  return  values;
}


function handlePieceClick(row: any, column: any, e:any) {
  e.preventDefault();
  dispatch({type: 'piece_click', row: row, column: column});
}


function _renderPieces(playerId: number)
{
  let values = [];
  let keys = [];
  let values_sorted = [];

  let countPieces=0;

  for (let row=0; row<appState.gameBoard.length; row++) { //row is the index
    for (let column=0; column<appState.gameBoard[row].length; column++) { //column is the index
      let checker=appState.gameBoard[row][column];
      let checkersType=checker%10;
      // 1, 3 - первый игрок, 2, 4 - второй
      if (checkersType === playerId || checkersType === playerId+2) {
        // TODO
        // this.element.css("backgroundImage", "url('img/king" + this.player + ".png')");

        const divStyle = checkersType===3?{
          top: dictionary[row],
          left: dictionary[column],
          backgroundImage: "url(" + king1 + ")"
        }:checkersType===4?{
          top: dictionary[row],
          left: dictionary[column],
          backgroundImage: "url(" + king2 + ")"
        }: {
          top: dictionary[row],
          left: dictionary[column]
        };

        let myClassName=appState.hasSelectedItem&&appState.selectedItemRow===row&&appState.selectedItemColumn===column?"piece selected":"piece";
      
        values.push(<div key={Math.floor(checker/10).toString()} className={myClassName} id={"piece"+Math.floor(checker/10).toString()} style={divStyle} onClick={(e)=>handlePieceClick(row,column,e)}></div>);
        // чтобы порядок не менялся при перемещении шашек в другие точки
        // (иначе не будет плавной анимации, в случае, когда меняется порядок (даже при неизменных id))
        keys.push({checker:checker, idx: countPieces});
        countPieces++;
      }

    }
  }

  keys.sort((a,b)=>a.checker-b.checker);

  for (let i = 0; i < keys.length; i++) {  
    values_sorted.push(values[keys[i].idx]);
  }

  return values_sorted;
}

function handleClearGameClick(e: any) {
  e.preventDefault();
  dispatch({type: 'test'});

  /*
  let checkers = new Game();
  let computerPlayer1 = new Computer(1, 3);
  let computerPlayer2 = new Computer(2, 3);
  checkers.newGame();

  let gameOver = false;
  // actual game play
  while (gameOver === false) {
    let legalMoves: Move[]=[];
    let moveNumber = -1;
    switch(checkers.currentPlayer) {
        case 1:
            legalMoves = checkers.getLegalMoves(checkers.board);
            if (legalMoves.length===0) {
                gameOver = true;
                console.log("Player 2 Wins!");
                continue;
            }
            console.log("Player 1's Turn: ");
            //checkers.printListMoves(legalMoves);
            //if (player1IsComputer){
                let move1 = computerPlayer1.alphaBetaSearch(checkers);
                if (move1)
                {
                  checkers.applyMove(move1, checkers.board);
                  console.log("Player 1 Chose: ");
                  checkers.printMove(move1);
                }
            //}
            //checkers.printNote();
            //checkers.printBoard();
            break;
        case 2:
            legalMoves = checkers.getLegalMoves(checkers.board);
            if (legalMoves.length===0) {
                gameOver = true;
                console.log("Player 1 Wins!");
                continue;
            }
            console.log("Player 2's Turn: ");
            //engine.checkers.printListMoves(legalMoves);
            //if (player2IsComputer) {
                let move2 = computerPlayer2.alphaBetaSearch(checkers);
                if (move2)
                {
                  checkers.applyMove(move2, checkers.board);
                  console.log("Player 2 Chose: ");
                  checkers.printMove(move2);
                }
            //}
            //checkers.printNote();
            //checkers.printBoard();
            break;
          }
        }
  */      

}

function handleKeyDown(e:any)
{
  console.debug("key");
}

function _renderPult()
{
  let values=[];

  if (appState.hasArrowSelectedItem)
  {
    const divStyle = {
      top: dictionary[appState.arrowSelectedItemRow],
      left: dictionary[appState.arrowSelectedItemColumn]
    };          

    values.push(<div className="selection" style={divStyle}></div>);
  }

  return values;

}


  return (
    <div className="App">
    <div className="column">
    <div className="info">
      <h1>Checkers</h1>
      <hr/>
      <p>Made by codethejason for <a href="http://fossasia.org">FOSSASIA</a> 2015.</p>
    </div>
    <div className="stats">
      <h2>Game Statistics</h2>
      <div className="wrapper">
      <div id="player1">
        <h3>Player 1 (Top)</h3>
      </div>
      <div id="player2">
        <h3>Player 2 (Bottom)</h3>
      </div>
      </div>
      <div className="clearfix"></div>
      <div className="turn" style={appState.playerTurn===1?{background: "linear-gradient(to right, #BEEE62 50%, transparent 50%)"}:{background: "linear-gradient(to right, transparent 50%, #BEEE62 50%)"}}></div>
      <span id="winner"></span>
      <button id="cleargame" onClick={handleClearGameClick}>Reset Game</button>
    </div>
  </div>

    <div className="column">
    <div id="board" onKeyDown={(e)=>handleKeyDown(e)}>
      <div className="tiles">
      {_renderTiles()}
      </div>
      <div className="pieces">
        <div className="player1pieces">
        {_renderPieces(1)}
        </div>
        <div className="player2pieces">
        {_renderPieces(2)}
        </div>
      </div>
      <div className="pult">
        {_renderPult()}
      </div>
    </div>
    </div>
    </div>
  );


    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
});