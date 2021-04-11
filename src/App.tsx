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


const dictionary = ["0vmin", "10vmin", "20vmin", "30vmin", "40vmin", "50vmin", "60vmin", "70vmin", "80vmin", "90vmin"];


export const App: FC = memo(() => {
  const [appState, dispatch] = useReducer(reducer, initialState);


function _tileRender (row: any, column: any, countTiles: any) {
  //this.tilesElement.append("<div class='tile' id='tile" + countTiles + "' style='top:" + this.dictionary[row] + ";left:" + this.dictionary[column] + ";'></div>");
  //tiles[countTiles] = new Tile($("#tile" + countTiles), [parseInt(row), parseInt(column)]);
  return countTiles + 1
};

function playerPiecesRender (playerNumber: any, row: any, column: any, countPieces: any) {
  //$(`.player${playerNumber}pieces`).append("<div class='piece' id='" + countPieces + "' style='top:" + this.dictionary[row] + ";left:" + this.dictionary[column] + ";'></div>");
  //pieces[countPieces] = new Piece($("#" + countPieces), [parseInt(row), parseInt(column)]);
  return countPieces + 1;
};

function _renderTiles()
{
  //let values = [<div key="empty" className="header cell"></div>];
  //let values = [<div key="empty" className="tile"></div>];
  let values = [];

  let countTiles=0;

  for (let row=0; row<appState.gameBoard.length; row++) { //row is the index
    for (let column=0; column<appState.gameBoard[row].length; column++) { //column is the index
      //whole set of if statements control where the tiles and pieces should be placed on the board
      if (row % 2 == 1) {
        if (column % 2 == 0) {
          //countTiles = this.tileRender(row, column, countTiles)

          //values.push(<div key={i} className="header cell">{letters[i]}</div>);
          //   <div class="tile" id="tile0" style="top:0vmin;left:10vmin;"></div>

          const divStyle = {
            top: dictionary[row],
            left: dictionary[column]
          };          
      
          values.push(<div key={countTiles.toString()} className="tile" id={"tile"+countTiles.toString()} style={divStyle}></div>);
          countTiles++;

        }
      } else {
        if (column % 2 == 1) {
          //countTiles = this.tileRender(row, column, countTiles)
          const divStyle = {
            top: dictionary[row],
            left: dictionary[column]
          };          
      
          values.push(<div key={countTiles.toString()} className="tile" id={"tile"+countTiles.toString()} style={divStyle}></div>);
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
      <div className="turn"></div>
      <span id="winner"></span>
      <button id="cleargame">Reset Game</button>
    </div>
  </div>

    <div className="column">
    <div id="board">
      <div className="tiles">
      {_renderTiles()}
      </div>
      <div className="pieces">
        <div className="player1pieces">
        </div>
        <div className="player2pieces">
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