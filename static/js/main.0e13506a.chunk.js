(this.webpackJsonpcheckers=this.webpackJsonpcheckers||[]).push([[0],{10:function(e,t,c){},11:function(e,t,c){},13:function(e,t,c){"use strict";c.r(t);var n=c(1),i=c.n(n),r=c(4),s=c.n(r),a=(c(10),c(5)),l=(c(11),c(2)),o={actionsToSend:[],character:"sber",respectfulAppeal:!0,playerTurn:1,gameBoard:[[0,1,0,1,0,1,0,1],[1,0,1,0,1,0,1,0],[0,1,0,1,0,1,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[2,0,2,0,2,0,2,0],[0,2,0,2,0,2,0,2],[2,0,2,0,2,0,2,0]],pieces:[],tiles:[]},d=function(e,t){switch(t.type){case"go":case"go_enemy":case"tile_click":case"piece_click":return Object(l.a)({},e);case"test":return Object(l.a)(Object(l.a)({},e),{},{playerTurn:1===e.playerTurn?2:1});default:throw new Error}},j=c(0),u=["0vmin","10vmin","20vmin","30vmin","40vmin","50vmin","60vmin","70vmin","80vmin","90vmin"],h=Object(n.memo)((function(){var e=Object(n.useReducer)(d,o),t=Object(a.a)(e,2),c=t[0],i=t[1];function r(e,t,c){c.preventDefault(),i({type:"tile_click",row:e,column:t})}function s(e,t,c){c.preventDefault(),i({type:"piece_click",row:e,column:t})}function l(e){for(var t=[],n=0,i=0;i<c.gameBoard.length;i++)for(var r=0;r<c.gameBoard[i].length;r++)if(c.gameBoard[i][r]===e){var a={top:u[i],left:u[r]};t.push(Object(j.jsx)("div",{className:"piece",id:"piece"+n.toString(),style:a,onClick:function(e){return s(1,1,e)}},n.toString())),n++}return t}return Object(j.jsxs)("div",{className:"App",children:[Object(j.jsxs)("div",{className:"column",children:[Object(j.jsxs)("div",{className:"info",children:[Object(j.jsx)("h1",{children:"Checkers"}),Object(j.jsx)("hr",{}),Object(j.jsxs)("p",{children:["Made by codethejason for ",Object(j.jsx)("a",{href:"http://fossasia.org",children:"FOSSASIA"})," 2015."]})]}),Object(j.jsxs)("div",{className:"stats",children:[Object(j.jsx)("h2",{children:"Game Statistics"}),Object(j.jsxs)("div",{className:"wrapper",children:[Object(j.jsx)("div",{id:"player1",children:Object(j.jsx)("h3",{children:"Player 1 (Top)"})}),Object(j.jsx)("div",{id:"player2",children:Object(j.jsx)("h3",{children:"Player 2 (Bottom)"})})]}),Object(j.jsx)("div",{className:"clearfix"}),Object(j.jsx)("div",{className:"turn",style:1===c.playerTurn?{background:"linear-gradient(to right, #BEEE62 50%, transparent 50%)"}:{background:"linear-gradient(to right, transparent 50%, #BEEE62 50%)"}}),Object(j.jsx)("span",{id:"winner"}),Object(j.jsx)("button",{id:"cleargame",onClick:function(e){e.preventDefault(),i({type:"test"})},children:"Reset Game"})]})]}),Object(j.jsx)("div",{className:"column",children:Object(j.jsxs)("div",{id:"board",children:[Object(j.jsx)("div",{className:"tiles",children:function(){for(var e=[],t=0,n=function(n){for(var i=function(c){if(n%2==1){if(c%2==0){var i={top:u[n],left:u[c]};e.push(Object(j.jsx)("div",{className:"tile",id:"tile"+t.toString(),style:i,onClick:function(e){return r(n,c,e)}},t.toString())),t++}}else if(c%2==1){var s={top:u[n],left:u[c]};e.push(Object(j.jsx)("div",{className:"tile",id:"tile"+t.toString(),style:s,onClick:function(e){return r(n,c,e)}},t.toString())),t++}},s=0;s<c.gameBoard[n].length;s++)i(s)},i=0;i<c.gameBoard.length;i++)n(i);return e}()}),Object(j.jsxs)("div",{className:"pieces",children:[Object(j.jsx)("div",{className:"player1pieces",children:l(1)}),Object(j.jsx)("div",{className:"player2pieces",children:l(2)})]})]})})]})})),p=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,14)).then((function(t){var c=t.getCLS,n=t.getFID,i=t.getFCP,r=t.getLCP,s=t.getTTFB;c(e),n(e),i(e),r(e),s(e)}))};s.a.render(Object(j.jsx)(i.a.StrictMode,{children:Object(j.jsx)(h,{})}),document.getElementById("root")),p()}},[[13,1,2]]]);
//# sourceMappingURL=main.0e13506a.chunk.js.map