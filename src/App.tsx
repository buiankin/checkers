// based on https://github.com/codethejason/checkers

import logo from './logo.svg';
import './App.css';
//import styled, { css } from 'styled-components';

//import Game from './ai/game';
//import Computer from './ai/computer';
import Move from './ai/move';

import king1 from './img/king1.png';
import king2 from './img/king2.png';
import img0 from "./img/320_320_0.jpg";
import img1 from "./img/320_320_1.jpg";

import React, {
  FC,
  memo,
  useReducer,
  //useState,
  useRef,
  useEffect,
  //useLayoutEffect,
  //RefObject,
} from 'react';

import {
  createSmartappDebugger,
  createAssistant,
//  createRecordPlayer,
  AssistantAppState,
  AssistantSmartAppData,
  AssistantCharacterType
} from "@sberdevices/assistant-client";

import { initialState, reducer } from "./store";
//import { Row } from '@sberdevices/ui';

// createGlobalStyle нужен для создания глобальных стилей
import styled, { createGlobalStyle, css } from 'styled-components';

// получаем значение для целевой платформы
import { sberBox, sberPortal, mobile } from '@sberdevices/plasma-tokens/typo';
import { detectDevice } from '@sberdevices/ui/utils';
// получаем стилевые объекты для нашего интерфейса
import { body1, headline2 } from '@sberdevices/plasma-tokens';

// получаем тему персонажа
import { darkEva, darkSber, darkJoy } from '@sberdevices/plasma-tokens/themes';

// получаем цвета для нашего интерфейса
import { text, background, gradient } from '@sberdevices/plasma-tokens';

import { applyView, ViewProps, View } from '@sberdevices/plasma-core/mixins';

/*
import {
  Card,
  CardBody,
  CardContent,
  CardMedia,
  CardHeadline1,
  TextBox,
  TextBoxBigTitle,
  TextBoxBiggerTitle,
  TextBoxSubTitle,
  Button
} from '@sberdevices/plasma-ui';
*/


//const dictionary = ["0vmin", "10vmin", "20vmin", "30vmin", "40vmin", "50vmin", "60vmin", "70vmin", "80vmin", "90vmin"];
const dictionary = ["0%", "12.5%", "25%", "37.5%", "50%", "62.5%", "75%", "87.5%", "100%", "100%"];
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

const label_coords_backwards =
  [[0,29,0,30,0,31,0,32],
   [25,0,26,0,27,0,28,0],
   [0,21,0,22,0,23,0,24],
   [17,0,18,0,19,0,20,0],
   [0,13,0,14,0,15,0,16],
   [9,0,10,0,11,0,12,0],
   [0,5,0,6,0,7,0,8],
   [1,0,2,0,3,0,4,0]
  ];


// создаем react-компонент c глобальными стилями типографики
const TypoScaleSberBox = createGlobalStyle(sberBox);
const TypoScaleSberPortal = createGlobalStyle(sberPortal);
const TypoScaleTouch = createGlobalStyle(mobile);


// можно добавить свою переменную, например --my_view_type: 1;
// создаем react-компонент для подложки
const DocStyles = createGlobalStyle`
    /* stylelint-disable-next-line selector-nested-pattern */
    html {
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};

        /** необходимо залить градиентом всю подложку */
        min-height: 100vh;
    }
`;

const ThemeBackgroundEva = createGlobalStyle(darkEva);
const ThemeBackgroundSber = createGlobalStyle(darkSber);
const ThemeBackgroundJoy = createGlobalStyle(darkJoy);


const initializeAssistant = (getState: any) => {
    console.log('process.env.NODE_ENV=');
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === "development") {
      return createSmartappDebugger({
        token: process.env.REACT_APP_TOKEN ?? "",
        initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
        getState,
      });
    }
  
    return createAssistant({ getState });
};
  


export const App: FC = memo(() => {
  const [appState, dispatch] = useReducer(reducer, initialState);

  const assistantStateRef = useRef<AssistantAppState>();
  const assistantRef = useRef<ReturnType<typeof createAssistant>>();

  // TODO assistant.Close

  useEffect(() => {

    //dispatch({type: 'init'});

    assistantRef.current = initializeAssistant(() => assistantStateRef.current);

    //assistantRef.current.on("start", () => {
    //  alert("Start!");
    //});

    assistantRef.current.on("data", ({ type, character, navigation, action, insets, command }: any) => {
      // Из-за того, что React.Strict несмотря на то, что вызов я делаю 1 раз, dispatch срабатывае дважды
      // поэтому сделаем счетчик
      // AssistantCharacterCommand
      if (character)
      {
        // TODO брать respectfulAppeal из character
        // 'sber' | 'eva' | 'joy';
        //setAppState({...appState, character: character.id, respectfulAppeal: character.id!=='joy'});
        dispatch({type: 'character', character_id: character.id});
      }
      // AssistantServerAction
      if (action) {
        dispatch(action);
      }
      // AssistantInsetsCommand - команда, которая сообщает смартапу о том, что поверх него будет отображен нативный UI и его размеры.
      if (insets)
      {
        //alert("left="+insets.left+", top="+insets.top+", right="+insets.right+", bottom="+insets.bottom);
        // это можно использовать, если ассистент перекрывает и мешает видеть доску
        // но эта проблема, как выяснилось, только на компьютере - в сбербоксе это не мешает
        // а в салюте эти области не пересекаются совсем
        //dispatch({type: 'assistantBottomString', bottomString: insets.bottom.toString()+"px"});
      }
      if (type==='close_app')
      {
        assistantRef?.current?.close();
      }
    });

  }, []);
  

  function downHandler(e: KeyboardEvent ) {
    if (e.key==='ArrowDown')
    {
      e.preventDefault();
      dispatch({type: 'arrow_down'});
    }
    if (e.key==='ArrowUp')
    {
      e.preventDefault();
      dispatch({type: 'arrow_up'});
    }
    if (e.key==='ArrowLeft')
    {
      e.preventDefault();
      dispatch({type: 'arrow_left'});
    }
    if (e.key==='ArrowRight')
    {
      e.preventDefault();
      dispatch({type: 'arrow_right'});
    }
    if (e.key==='Enter')
    {
      e.preventDefault();
      dispatch({type: 'arrow_ok'});
    }
  }

  function upHandler(e: KeyboardEvent ) {
  }
  

  function processContinueMove()
  {
    dispatch({type: 'continue_move_by_robot'});
  }

  function processRobotMove()
  {
    dispatch({type: 'move_robot'});
  }
  

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    }
  });

  useEffect(() => {
    // Обрабатываем изменения счетчика ходов, а также смены игрока
    // если ход робота
    if (appState.players[appState.playerTurn-1].isRobot)
    {
      // если продолжение, то ждем 3 секунды и двигаем дальше
      if (appState.isContiniousMoving!==0)
      {
        setTimeout(() => processContinueMove(), 3100);
      } else {
        // надо сделать обычный ход
        //dispatch({type: 'move_robot'});
        // однако надо начать думать над ходом не раньше, чем доска отрисуется (0.2сек)
        setTimeout(() => processRobotMove(), 410);

      }
    } else {
      // играет человек
    }
  }, [appState.isContiniousMoving, appState.playerTurn, appState.players]);


  /*
  function changePlayerTurn() {
    if (this.playerTurn == 1) {
      this.playerTurn = 2;
      $('.turn').css("background", "linear-gradient(to right, transparent 50%, #BEEE62 50%)");
    } else {
      this.playerTurn = 1;
      $('.turn').css("background", "linear-gradient(to right, #BEEE62 50%, transparent 50%)");
    }
    this.check_if_jump_exist()
    return;
  }
 */

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
            top: appState.backwardDirection?dictionary[7-row]:dictionary[row],
            left: appState.backwardDirection?dictionary[7-column]:dictionary[column],
            color: "#FF3333"
          };

          let _label_coords=(appState.backwardDirection?(label_coords_backwards[7-row][7-column]):label_coords[row][column]).toString();
          if (appState.gameBoard[row][column]>0)
            _label_coords="";
      
          values.push(<div key={countTiles.toString()} className="tile" id={"tile"+countTiles.toString()} style={divStyle} onClick={(e)=>handleTileClick(row, column, e)}>{_label_coords}</div>);
          countTiles++;

        }
      } else {
        if (column % 2 === 1) {
          //countTiles = this.tileRender(row, column, countTiles)
          const divStyle = {
            top: appState.backwardDirection?dictionary[7-row]:dictionary[row],
            left: appState.backwardDirection?dictionary[7-column]:dictionary[column],
            color: "#FF3333"
          };          

          let _label_coords=(appState.backwardDirection?(label_coords_backwards[7-row][7-column]):label_coords[row][column]).toString();
          if (appState.gameBoard[row][column]>0)
            _label_coords="";
      
          values.push(<div key={countTiles.toString()} className="tile" id={"tile"+countTiles.toString()} style={divStyle} onClick={(e)=>handleTileClick(row, column, e)}>{_label_coords}</div>);
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
          top: appState.backwardDirection?dictionary[7-row]:dictionary[row],
          left: appState.backwardDirection?dictionary[7-column]:dictionary[column],
          backgroundImage: "url(" + king1 + ")"
        }:checkersType===4?{
          top: appState.backwardDirection?dictionary[7-row]:dictionary[row],
          left: appState.backwardDirection?dictionary[7-column]:dictionary[column],
          backgroundImage: "url(" + king2 + ")"
        }: {
          top: appState.backwardDirection?dictionary[7-row]:dictionary[row],
          left: appState.backwardDirection?dictionary[7-column]:dictionary[column]
        };

        let myClassName=appState.hasSelectedItem&&appState.selectedItemRow===row&&appState.selectedItemCol===column?"piece selected":"piece";

        let _label_coords=(appState.backwardDirection?(label_coords_backwards[7-row][7-column]):label_coords[row][column]).toString();
      
        values.push(<div key={Math.floor(checker/10).toString()} className={myClassName} id={"piece"+Math.floor(checker/10).toString()} style={divStyle} onClick={(e)=>handlePieceClick(row,column,e)}>{_label_coords}</div>);
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

function _renderCapturedPieces(playerId: number)
{
  let res=[];
  for (let i=0; i<appState.capturedPieces[playerId-1]; i++)
    res.push(<div className="capturedPiece"></div>);
  return res;
}

function handleClearGameClick(e: any) {
  e.preventDefault();
  //dispatch({type: 'move_robot'});
  dispatch({type: 'change_direction', data: null});
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
    /*
    const divStyle = {
      top: appState.backwardDirection?dictionary[7-appState.arrowSelectedItemRow]:dictionary[appState.arrowSelectedItemRow],
      left: appState.backwardDirection?dictionary[7-appState.arrowSelectedItemCol]:dictionary[appState.arrowSelectedItemCol]
    };
    */          
    const divStyle = {
      top: dictionary[appState.arrowSelectedItemRow],
      left: dictionary[appState.arrowSelectedItemCol]
    };


    values.push(<div className="selection" style={divStyle}></div>);
  }

  return values;

}

  // Вариант со старой разметкой
  /*
  const AppStyled = styled.div`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    margin:0;
    padding: 30;
    bottom: ${appState.assistantBottomString};
    ${body1}
`;
*/




const AppStyled = styled.div`
  width: 100%;
  height: calc(100vh - ${appState.assistantBottomString});
  padding: 0;
  box-sizing: border-box;
  text-align: center;

  display: flex;

  flex-direction: row;
  @media (min-aspect-ratio: 1/1)  {
    height: 100vh;
  }

  justify-content: space-around;

  @media (max-aspect-ratio: 1/1)  {
    flex-direction: column;
  }
  
  overflow:auto;

  ${body1}
`;



// как сделать квадрат
// https://stackoverflow.com/questions/51041691/inner-div-with-square-ratio-and-flexbox

/*
#blue {
  display: flex;
  align-items: center;
  justify-content:center;
  --h:80vh;
  height:var(--h);
  background: blue;
}

#yellow {
  height: calc(var(--h) / 2);
  width:calc(var(--h) / 2);
  background: yellow;
  position:relative;
}
<div id="blue" >
  <div id="yellow" >
    <div class="content">Some content here</div>
  </div>
</div>
*/


/*
// то, что работает max-width, можно проверить, сделав такой же min-width
const Column1Styled = styled.div`
  background-size: cover;
  max-width: calc(100vw - calc(100vmin - ${appState.assistantBottomString}));

  height: calc(100vmin - ${appState.assistantBottomString});
`;

const Column2Styled = styled.div`
  height: calc(100vmin - ${appState.assistantBottomString});
  flex: 0 0 calc(100vmin - ${appState.assistantBottomString});
`;
*/

const Column1Styled = styled.div`
  @media (min-aspect-ratio: 1/1)  {
    background-size: cover;
    max-width: calc(100vw - calc(100vmin - ${appState.assistantBottomString}));
  }

  @media (max-aspect-ratio: 1/1)  {
    background-size: cover;
    width: 100wv;
  }

`;

const Column2Styled = styled.div`
  @media (min-aspect-ratio: 1/1)  {
    height: calc(100vmin - ${appState.assistantBottomString});
    flex: 0 0 calc(100vmin - ${appState.assistantBottomString});
  }

  @media (max-aspect-ratio: 1/1)  {

    display: flex;
    align-items: center;
    justify-content:center;
    --h:100vh;
    height:var(--h);
  }
  

`;





  //<div className="App" style={{position: 'absolute', width: "100%", top: 0, left: 0, margin:0, padding: 0, bottom: appState.assistantBottomString}}>
  //<AppStyled className="App">

  const cover = false;//boolean('cover', false);

  return (
    <AppStyled>
    {/* Используем глобальные react-компоненты один раз */}
    {(() => {
        switch (detectDevice()) {
          case "sberPortal":
            return <TypoScaleSberBox />
          case "sberBox": 
            return <TypoScaleSberPortal />
          case "mobile":
            return <TypoScaleTouch />
          default:
            return;
        }
      })()}
    <DocStyles />
    {(() => {
                switch (appState.character) {
                    case 'sber':
                        return <ThemeBackgroundSber />;
                    case 'eva':
                        return <ThemeBackgroundEva />;
                    case 'joy':
                        return <ThemeBackgroundJoy />;
                    default:
                        return;
                }
            })()}    
    {/*ColumnSpanStyled*/}
    <Column1Styled>

      <div className="stats">
        <h2>Английские шашки</h2>
        <div className="wrapper">
        <div id="player1">
          <h3>Игрок 1 ({appState.backwardDirection?'Внизу':'Сверху'})</h3>
          {_renderCapturedPieces(1)}
        </div>
        <div id="player2">
          <h3>Игрок 2 ({appState.backwardDirection?'Вверху':'Внизу'})</h3>
          {_renderCapturedPieces(2)}
        </div>
        </div>
        <div className="clearfix"></div>
        <div className="turn" style={appState.playerTurn===1?{background: "linear-gradient(to right, var(--plasma-colors-accent) 50%, transparent 50%)"}:{background: "linear-gradient(to right, transparent 50%, var(--plasma-colors-accent) 50%)"}}></div>
        <span id="winner">{appState.gameOver?"Игрок "+appState.playerWin+" победил!":""}</span>
        {/*<button id="cleargame" onClick={handleClearGameClick}>Reset Game</button>*/}
      </div>



  </Column1Styled>
  {/*ColumnSpanStyled*/}
  <Column2Styled>
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
  </Column2Styled>
  {/*ColumnSpanStyled*/}
  </AppStyled>
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