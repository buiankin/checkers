import logo from './logo.svg';
import './App.css';

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


export const App: FC = memo(() => {
  const [appState, dispatch] = useReducer(reducer, initialState);


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
      if (row % 2 == 1) {
        if (column % 2 == 0) {

          const divStyle = {
            top: dictionary[row],
            left: dictionary[column]
          };          
      
          values.push(<div key={countTiles.toString()} className="tile" id={"tile"+countTiles.toString()} style={divStyle} onClick={(e)=>handleTileClick(row, column, e)}></div>);
          countTiles++;

        }
      } else {
        if (column % 2 == 1) {
          //countTiles = this.tileRender(row, column, countTiles)
          const divStyle = {
            top: dictionary[row],
            left: dictionary[column]
          };          
      
          values.push(<div key={countTiles.toString()} className="tile" id={"tile"+countTiles.toString()} style={divStyle} onClick={(e)=>handleTileClick(row, column, e)}></div>);
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

  let countPieces=0;

  for (let row=0; row<appState.gameBoard.length; row++) { //row is the index
    for (let column=0; column<appState.gameBoard[row].length; column++) { //column is the index
      if (appState.gameBoard[row][column] === playerId) {

        const divStyle = {
          top: dictionary[row],
          left: dictionary[column]
        };          
    
        values.push(<div key={countPieces.toString()} className="piece" id={"piece"+countPieces.toString()} style={divStyle} onClick={(e)=>handlePieceClick(1,1,e)}></div>);
        countPieces++;
      }
    }
  }

  return  values;

}

function handleClearGameClick(e: any) {
  e.preventDefault();
  dispatch({type: 'test'});
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
    <div id="board">
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