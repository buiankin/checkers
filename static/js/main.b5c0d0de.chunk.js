(this.webpackJsonpcheckers=this.webpackJsonpcheckers||[]).push([[0],{12:function(e,t,i){},13:function(e,t,i){},15:function(e,t,i){"use strict";i.r(t);var r=i(2),a=i.n(r),n=i(6),s=i.n(n),o=(i(12),i(7)),c=(i(13),i(1)),l=i(3),u=i(4);Game.directions=[{y:1,x:1},{y:-1,x:1},{y:1,x:-1},{y:-1,x:-1}];var h=Game,m=function(){function e(t,i){Object(l.a)(this,e),this.maximizingPlayer=0,this.maxDepth=0,this.timeLimit=2,this.heuristicType=0,this.startTime=0,this.currentTime=0,this.outOfTime=!1,this.numAllyPieces=0,this.numAllyKings=0,this.numOppPieces=0,this.numOppKings=0,this.maximizingPlayer=t,this.heuristicType=i}return Object(u.a)(e,[{key:"alphaBetaSearch",value:function(e){var t=new Date;this.startTime=t.getTime(),this.getBoardStatus(e),this.outOfTime=!1;var i=0,r=0,a=null,n=[],s=e.getLegalMoves(e.board);if(1===s.length)return console.log("Searched to depth 0 in 0 seconds."),s[0];for(this.maxDepth=0;this.maxDepth<15&&!this.outOfTime;this.maxDepth++){n=[];for(var o=Number.NEGATIVE_INFINITY,c=0;c<s.length;c++){var l=s[c],u=h.Game(e);u.applyMove(l,u.board);var m=this.minVal(u,Number.NEGATIVE_INFINITY,Number.MAX_VALUE,0);if(this.outOfTime)break;if(m===o&&n.push(l),m>o&&(n.length=0,n.push(l),o=m),o===Number.MAX_VALUE)break}if(!this.outOfTime)a=n[Math.floor(Math.random()*n.length)],r=this.maxDepth,i=o;if(i===Number.MAX_VALUE)break}return console.log("Searched to depth "+r+" in "+(this.currentTime-this.startTime)/1e3+" seconds."),a}},{key:"cutoffTest",value:function(e,t){return 0===e||t===this.maxDepth}},{key:"evalFcn",value:function(e){switch(this.heuristicType){case 1:return this.easyHeuristic(e);case 2:return this.mediumHeuristic(e);case 3:default:return this.hardHeuristic(e)}}},{key:"hardHeuristic",value:function(e){for(var t=e.board.length,i=e.board[0].length,r=0,a=0,n=0,s=0,o=0,c=0;c<t;c++)for(var l=0;l<i;l++)if(1===this.maximizingPlayer)switch(e.board[c][l]){case 1:a++,r+=50*this.numDefendingNeighbors(c,l,e.board)+this.backBonus(c)+15*c+this.middleBonus(c,l);break;case 2:s++,r-=50*this.numDefendingNeighbors(c,l,e.board)+this.backBonus(c)+15*(7-c)+this.middleBonus(c,l);break;case 3:n++,r+=this.middleBonus(c,l);break;case 4:o++,r-=this.middleBonus(c,l)}else switch(e.board[c][l]){case 1:s++,r-=50*this.numDefendingNeighbors(c,l,e.board)+this.backBonus(c)+15*c+this.middleBonus(c,l);break;case 2:a++,r+=50*this.numDefendingNeighbors(c,l,e.board)+this.backBonus(c)+15*(7-c)+this.middleBonus(c,l);break;case 3:o++,r-=this.middleBonus(c,l);break;case 4:n++,r+=this.middleBonus(c,l)}if(this.numAllyPieces+this.numAllyKings>this.numOppPieces+this.numOppKings&&s+o!==0&&this.numOppPieces+this.numOppKings!==0&&1!==this.numOppKings&&((a+n)/(s+o)>(this.numAllyPieces+this.numAllyKings)/(this.numOppPieces+this.numOppKings)?r+=150:r-=150),r+=600*a+1e3*n-600*s-1e3*o,this.numOppPieces+this.numOppKings<6||this.numAllyPieces+this.numAllyKings<6){var u=e.currentPlayer;e.currentPlayer=1;var h=e.getLegalMoves(e.board);e.currentPlayer=2;var m=e.getLegalMoves(e.board);if(e.currentPlayer=u,0===h.length)return 1===this.maximizingPlayer?Number.NEGATIVE_INFINITY:Number.MAX_VALUE;if(0===m.length)return 2===this.maximizingPlayer?Number.NEGATIVE_INFINITY:Number.MAX_VALUE}return s+o===0&&a+n>0&&(r=Number.MAX_VALUE),a+n===0&&s+o>0&&(r-=Number.MIN_VALUE),r}},{key:"mediumHeuristic",value:function(e){for(var t=e.board.length,i=e.board[0].length,r=0,a=0;a<t;a++)for(var n=0;n<i;n++)if(1===this.maximizingPlayer)switch(e.board[a][n]){case 1:r+=3+.5*a+this.numDefendingNeighbors(a,n,e.board),0!==n&&8!==n||(r+=1),0===a&&(r+=2);break;case 2:r-=3+.5*(7-a)+this.numDefendingNeighbors(a,n,e.board),0!==n&&8!==n||(r-=1),7===a&&(r-=2);break;case 3:r+=5+this.numDefendingNeighbors(a,n,e.board),0!==n&&8!==n||(r+=1),0===a&&(r+=2);break;case 4:r-=5+this.numDefendingNeighbors(a,n,e.board),0!==n&&8!==n||(r-=1),7===a&&(r-=2)}else switch(e.board[a][n]){case 1:r-=3+.5*a+this.numDefendingNeighbors(a,n,e.board),0!==n&&8!==n||(r-=1),0===a&&(r-=2);break;case 2:r+=3+.5*(7-a)+this.numDefendingNeighbors(a,n,e.board),0!==n&&8!==n||(r+=1),7===a&&(r+=2);break;case 3:r-=5+this.numDefendingNeighbors(a,n,e.board),0!==n&&8!==n||(r-=1),0===a&&(r-=2);break;case 4:r+=5+this.numDefendingNeighbors(a,n,e.board),0!==n&&8!==n||(r+=1),7===a&&(r+=2)}return r}},{key:"easyHeuristic",value:function(e){for(var t=e.board.length,i=e.board[0].length,r=0,a=0;a<t;a++)for(var n=0;n<i;n++)if(1===this.maximizingPlayer)switch(e.board[a][n]){case 1:r+=3;break;case 2:r-=3;break;case 3:r+=5;break;case 4:r-=5}else switch(e.board[a][n]){case 1:r-=3;break;case 2:r+=3;break;case 3:r-=5;break;case 4:r+=5}return r}},{key:"maxVal",value:function(e,t,i,r){var a=this,n=new Date;if(this.currentTime=n.getTime(),this.currentTime-this.startTime>=990*this.timeLimit)return this.outOfTime=!0,0;var s=e.getLegalMoves(e.board);if(this.cutoffTest(s.length,r))return this.evalFcn(e);var o=Number.NEGATIVE_INFINITY;return s.forEach((function(n){var s=h.Game(e);if(s.applyMove(n,s.board),(o=Math.max(o,a.minVal(s,t,i,r+1)))>=i)return o;t=Math.max(t,o)})),o}},{key:"minVal",value:function(e,t,i,r){var a=this,n=new Date;if(this.currentTime=n.getTime(),this.currentTime-this.startTime>990*this.timeLimit)return this.outOfTime=!0,0;var s=e.getLegalMoves(e.board);if(this.cutoffTest(s.length,r))return this.evalFcn(e);var o=Number.MAX_VALUE;return s.forEach((function(n){var s=h.Game(e);if(s.applyMove(n,s.board),(o=Math.min(o,a.maxVal(s,t,i,r+1)))<=t)return o;i=Math.min(i,o)})),o}},{key:"numDefendingNeighbors",value:function(e,t,i){var r=0;switch(i[e][t]){case 1:e+1<i.length&&t+1<i[0].length&&1===(1&i[e+1][t+1])&&(r+=1),e+1<i.length&&t-1>=0&&1===(1&i[e+1][t-1])&&(r+=1);break;case 2:e-1>=0&&t+1<i[0].length&&0===(1&i[e-1][t+1])&&(r+=1),e-1>=0&&t-1>=0&&0===(1&i[e-1][t-1])&&(r+=1);break;case 3:e+1<i.length&&t+1<i[0].length&&1===(1&i[e+1][t+1])&&(r+=1),e+1<i.length&&t-1>=0&&1===(1&i[e+1][t-1])&&(r+=1),e-1>=0&&t+1<i[0].length&&1===(1&i[e-1][t+1])&&(r+=1),e-1>=0&&t-1>=0&&1===(1&i[e-1][t-1])&&(r+=1);break;case 4:e+1<i.length&&t+1<i[0].length&&0===(1&i[e+1][t+1])&&(r+=1),e+1<i.length&&t-1>=0&&0===(1&i[e+1][t-1])&&(r+=1),e-1>=0&&t+1<i[0].length&&0===(1&i[e-1][t+1])&&(r+=1),e-1>=0&&t-1>=0&&0===(1&i[e-1][t-1])&&(r+=1)}return r}},{key:"backBonus",value:function(e){return 1===this.maximizingPlayer&&0===e||2===this.maximizingPlayer&&7===e?100:0}},{key:"middleBonus",value:function(e,t){return 100-10*(Math.abs(4-t)+Math.abs(4-e))}},{key:"getBoardStatus",value:function(e){var t=e.board.length,i=e.board[0].length;this.numAllyPieces=0,this.numAllyKings=0,this.numOppPieces=0,this.numOppKings=0;for(var r=0;r<t;r++)for(var a=0;a<i;a++)if(1===this.maximizingPlayer)switch(e.board[r][a]){case 1:this.numAllyPieces++;break;case 2:this.numOppPieces++;break;case 3:this.numAllyKings++;break;case 4:this.numOppKings++}else switch(e.board[r][a]){case 1:this.numOppPieces++;break;case 2:this.numAllyPieces++;break;case 3:this.numOppKings++;break;case 4:this.numAllyKings++}}}]),e}(),d={actionsToSend:[],character:"sber",respectfulAppeal:!0,russianRules:!1,backwardDirection:!1,players:[{isRobot:!1},{isRobot:!0}],playerTurn:1,hasArrowSelectedItem:!1,arrowSelectedItemRow:4,arrowSelectedItemCol:4,isContiniousMoving:0,continiousMoving:[],continiousCaptured:[],hasSelectedItem:!1,selectedItemRow:0,selectedItemCol:0,gameBoard:[[0,0,0,0,0,24,0,0],[0,0,0,0,0,0,0,0],[0,12,0,0,0,11,0,21],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[32,0,42,0,0,0,52,0],[0,0,0,0,0,0,0,0],[0,0,62,0,0,0,0,0]],pieces:[],tiles:[]};function b(e){var t=new h;return t.newGame(),t.setCurrentState(e.gameBoard,e.playerTurn,1),t.russianRules=e.russianRules,t.getLegalMoves(t.board)}function g(e,t){var i=[];if(e.gameBoard.forEach((function(e){i.push(e.slice())})),t.listCaptureCol.length>0){var r=t.listCaptureRow[0],a=t.listCaptureCol[0];i[r][a]=0}if(t.listCaptureCol.length>1){var n=i[t.initialRow][t.initialCol];i[t.initialRow][t.initialCol]=0,(7===t.listVisitedRow[0]&&n%10===1||0===t.listVisitedRow[0]&&n%10===2)&&(n+=2),i[t.listVisitedRow[0]][t.listVisitedCol[0]]=n;for(var s=[],o=[],l=0;l<t.listVisitedRow.length;l++)s.push({y:t.listVisitedRow[l],x:t.listVisitedCol[l]}),o.push({y:t.listCaptureRow[l],x:t.listCaptureCol[l]});return e.players[e.playerTurn-1]?Object(c.a)(Object(c.a)({},e),{},{gameBoard:i,isContiniousMoving:1,continiousMoving:s,continiousCaptured:o,hasSelectedItem:!0,selectedItemRow:t.listVisitedRow[0],selectedItemCol:t.listVisitedCol[0]}):Object(c.a)(Object(c.a)({},e),{},{gameBoard:i,isContiniousMoving:1,continiousMoving:s,continiousCaptured:o,hasSelectedItem:!1})}var u=i[t.startRow][t.startCol];return i[t.startRow][t.startCol]=0,(7===t.endRow&&u%10===1||0===t.endRow&&u%10===2)&&(u+=2),i[t.endRow][t.endCol]=u,Object(c.a)(Object(c.a)({},e),{},{gameBoard:i,isContiniousMoving:0,playerTurn:1===e.playerTurn?2:1,hasSelectedItem:!1})}var f=function(e,t){switch(t.type){case"go":case"go_enemy":return Object(c.a)({},e);case"tile_click":var i=[];if(e.gameBoard.forEach((function(e){i.push(e.slice())})),e.hasSelectedItem){var r=i[e.selectedItemRow][e.selectedItemCol];i[e.selectedItemRow][e.selectedItemCol]=0,i[t.row][t.column]=r}return Object(c.a)(Object(c.a)({},e),{},{gameBoard:i});case"piece_click":return Object(c.a)(Object(c.a)({},e),{},{hasSelectedItem:!0,selectedItemRow:t.row,selectedItemCol:t.column});case"arrow_down":return Object(c.a)(Object(c.a)({},e),{},{hasArrowSelectedItem:!0,arrowSelectedItemRow:e.arrowSelectedItemRow>=7?7:e.arrowSelectedItemRow+1});case"arrow_up":return Object(c.a)(Object(c.a)({},e),{},{hasArrowSelectedItem:!0,arrowSelectedItemRow:e.arrowSelectedItemRow>0?e.arrowSelectedItemRow-1:0});case"arrow_right":return Object(c.a)(Object(c.a)({},e),{},{hasArrowSelectedItem:!0,arrowSelectedItemCol:e.arrowSelectedItemCol>=7?7:e.arrowSelectedItemCol+1});case"arrow_left":return Object(c.a)(Object(c.a)({},e),{},{hasArrowSelectedItem:!0,arrowSelectedItemCol:e.arrowSelectedItemCol>0?e.arrowSelectedItemCol-1:0});case"arrow_ok":if(e.hasArrowSelectedItem){var a=e.gameBoard[e.arrowSelectedItemRow][e.arrowSelectedItemCol];if(a>0){if(a%10===e.playerTurn||a%10===e.playerTurn+2){var n=b(e);if(0!==n.length){var s=null;if(n.forEach((function(t){t.listCaptureRow.length>0?t.initialRow===e.arrowSelectedItemRow&&t.initialCol===e.arrowSelectedItemCol&&(s=t):t.startRow===e.arrowSelectedItemRow&&t.startCol===e.arrowSelectedItemCol&&(s=t)})),null!==s)return Object(c.a)(Object(c.a)({},e),{},{hasArrowSelectedItem:!0,hasSelectedItem:!0,selectedItemRow:e.arrowSelectedItemRow,selectedItemCol:e.arrowSelectedItemCol})}}}else if(0===a&&e.hasSelectedItem){var o=b(e),l=null;if(o.forEach((function(t){t.listCaptureCol.length>0?t.initialRow===e.selectedItemRow&&t.initialCol===e.selectedItemCol&&t.listVisitedRow[0]===e.arrowSelectedItemRow&&t.listVisitedCol[0]===e.arrowSelectedItemCol&&(l=t):t.startRow===e.selectedItemRow&&t.startCol===e.selectedItemCol&&t.endRow===e.arrowSelectedItemRow&&t.endCol===e.arrowSelectedItemCol&&(l=t)})),null!==l){var u=g(e,l);return Object(c.a)(Object(c.a)({},u),{},{hasArrowSelectedItem:!0})}}}return Object(c.a)(Object(c.a)({},e),{},{hasArrowSelectedItem:!0});case"move_robot":var d=new h,f=new m(e.playerTurn,1);if(d.newGame(),d.setCurrentState(e.gameBoard,e.playerTurn,3),d.russianRules=e.russianRules,0===d.getLegalMoves(d.board).length)console.log("I am lost!");else{var p=f.alphaBetaSearch(d);if(p){d.applyMove(p,d.board),console.log("Player Chose: "),d.printMove(p);var w=g(e,p);return Object(c.a)({},w)}}return Object(c.a)(Object(c.a)({},e),{},{playerTurn:1===e.playerTurn?2:1});case"continue_move_by_robot":if(0===e.isContiniousMoving||!e.players[e.playerTurn-1].isRobot)return e;var v=[];e.gameBoard.forEach((function(e){v.push(e.slice())}));var A=e.isContiniousMoving,y=v[e.continiousMoving[A-1].y][e.continiousMoving[A-1].x],j=e.continiousMoving.length-e.isContiniousMoving;return v[e.continiousMoving[A-1].y][e.continiousMoving[A-1].x]=0,v[e.continiousCaptured[A].y][e.continiousCaptured[A].x]=0,(7===e.continiousMoving[A].y&&y%10===1||0===e.continiousMoving[A].y&&y%10===2)&&(y+=2),v[e.continiousMoving[A].y][e.continiousMoving[A].x]=y,j>1?Object(c.a)(Object(c.a)({},e),{},{gameBoard:v,isContiniousMoving:e.isContiniousMoving+1}):Object(c.a)(Object(c.a)({},e),{},{gameBoard:v,isContiniousMoving:0,playerTurn:1===e.playerTurn?2:1});default:throw new Error}},p=i(0),w=["0vmin","10vmin","20vmin","30vmin","40vmin","50vmin","60vmin","70vmin","80vmin","90vmin"],v=[[0,1,0,2,0,3,0,4],[5,0,6,0,7,0,8,0],[0,9,0,10,0,11,0,12],[13,0,14,0,15,0,16,0],[0,17,0,18,0,19,0,20],[21,0,22,0,23,0,24,0],[0,25,0,26,0,27,0,28],[29,0,30,0,31,0,32,0]],A=Object(r.memo)((function(){var e=Object(r.useReducer)(f,d),t=Object(o.a)(e,2),i=t[0],n=t[1];function s(e){"ArrowDown"===e.key&&n({type:"arrow_down"}),"ArrowUp"===e.key&&n({type:"arrow_up"}),"ArrowLeft"===e.key&&n({type:"arrow_left"}),"ArrowRight"===e.key&&n({type:"arrow_right"}),"Enter"===e.key&&(e.preventDefault(),n({type:"arrow_ok"}))}function c(e,t,i){i.preventDefault(),n({type:"tile_click",row:e,column:t})}function l(e){for(var t=[],r=[],a=[],s=0,o=function(a){for(var o=function(o){var c=i.gameBoard[a][o],l=c%10;if(l===e||l===e+2){var u=3===l?{top:w[a],left:w[o],backgroundImage:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC+ElEQVRYR9VWMVbbQBD9I96z3YWcADgBpkisLqYIWqrYJwCfIHACyAkgJ8A5AaRilxSQTk4KzAkwJwh0dvKsyZtF68hCsi3DC8mW0uzO3z9//izhmRc9c3783wC0r86J+TbomOa8TM7NwNmrt1VeWLiUxDQcrm18/9KdB8TcAIyv2gC24qSfglBv/zUAp75a9oBrZv5sGSB6FwErm6HuFQUxFwPGV/sA9iJgXRJ6wDmAD0Go5XuhVRjAebW++LNcvgZwE3RMVbKZWiD1XyoNBivr3YvbIgjI+GoPUXQVfDs7mWXjma+2GTgioLURatEBsr5NO8u83mjA81bJ1IJbEL0A82HQMbvTNmpfye1JhXo5Gat9JfVnFeqVaWeYWnAAoh0w35GuBYdE9F42MXBR7vebeTTGqI+z6u10gShq5rFpxct8DCJbOmb+SE7RgkaYYKDnDYfNrL6OjWetNBgsp0FabVQqP+QSKtRWnMl16qt6nHzR5ZLOsSJ0IgJzC0RSVyaiXVdjW+c/xpPb884b0i1pdQbsS+KIqBEDuQpCXbcAkiLCcNhlz2uDaJWBtgp1y4KMjWdSv4/YBCxIYWVQqRwTUAfwtdTvN35VKo2kiC2AuLV6THQp9NmN5XJbDAbMXYqiltiuGI/qmMYkkRlfXQB4Ix7hKJdaq47ZkX3pMo58IOuGuhbsENGBSyiHboZaEuQuW+t7YxKV3YF524kyzZCEjAAkajzmaLF4xCN6znhmaDM7mKTeSXt2HZccXmNOmNfLUhI5sKjLpYFmecg4AEf5hF6edvu8/85DmHlXdcyhixsDMOrlGcRWFIiuBSci6lK//zLJ5INhlBdYNGEy3l0McXsm/z0AkEfVYwCMuimjtJnjuMhgmQVY3gAba8PkQW6wiK/PkmBaTOyEmQ+WTAbiqdW1Y/op1v0MqGY92Qq/iJ4Cz0QRup/aV0cAxh4dj0jec0MtfUYuAyJEApYekXS0lYGb9Asq04ieIlnRM/5dDRS9ybzxvwFIdrAs1qT1KgAAAABJRU5ErkJggg==)"}:4===l?{top:w[a],left:w[o],backgroundImage:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACyElEQVRYR9VWwVEbQRDsgdMbHIFFBIgIDBEgRWARgdFjl+IFflHcPoAIkCMAIkCOwBABcgSGt4TaNVe7qtVxJ+lOLmPv8253p6enp2cF77zknePj/wbgHO9JPFsrnbpM1mYgTdkSwQ8NTGLHWnmoA6I2AOfYB/DZB/1mjHT/GoCzMzaTBE8A7nzQ/fEYW8fHMqwKohYDzvEUwAmAPR/wHsBXY0S/V1qVAVxccHM8zrL/aYy0NJpz1Pp/TBJs9XryXAWBOMeTyQSPR0dyu8zBNGVXBNckDqwV1QGKvi266/yc7bU1bEua8lkEGwAujZHeooNpyicRiDHSjPc6xyEJWitbi+5wjhcADkm8KIBLEXzxhwZJgk4ZjR71TVG9gy4mE3TK2FTxrq/jRgRZ6UhcSVB0hkawQUKV3Cnqa288O40GmnmQXhu/AAyMkSDOKRnOcReAgt8MsbRzMhEGEU0mOBBBXwQk0Qs19nUOxlPa88Eb8i2pOgNw6gO3FQiJR2tlNwMQiwjAg4IAsE2ib60ceJCZ8czr98gfMpCeFc16l8T3RgPt0QjtWMQZAN04GmGo1qr0+YMacJ+Etpgyo7Z7Z4xoBqUrTTkQwSfvEYHyK2vl0Cei82NaxqkPFNHnHPWQKjasPWNkMA+Ar7Uak4rshUQ3iDLPkO6ZAoiGy4yj6YUkbkUwDMazRJtlg2k8Rju259Bx8fCaccKyXtaS6IVVXS4PtMhD8gAyyuf18qLsy/5HHtIzRi7DvhkAUS8vFFtVIM5RrX4/SfAhZvLNMCrbWDVgvD9K7I2HvAFQRtUqAEI3FZW2cBxXGSzLACsbYDNtGF8UPTjm9vwywf0enQOFD5ZCBvzUUkvWMb3yUkN6fUWr6MlW+UW0MprcBaUA0pTXIph5dNQNriM+DLX8HaUAVIj6zqsbNHdO34+Fyfy7JfhDmS+85t0Z+A3L4JeX/JQtUQAAAABJRU5ErkJggg==)"}:{top:w[a],left:w[o]},h=i.hasSelectedItem&&i.selectedItemRow===a&&i.selectedItemCol===o?"piece selected":"piece";t.push(Object(p.jsx)("div",{className:h,id:"piece"+Math.floor(c/10).toString(),style:u,onClick:function(e){return function(e,t,i){i.preventDefault(),n({type:"piece_click",row:e,column:t})}(a,o,e)}},Math.floor(c/10).toString())),r.push({checker:c,idx:s}),s++}},c=0;c<i.gameBoard[a].length;c++)o(c)},c=0;c<i.gameBoard.length;c++)o(c);r.sort((function(e,t){return e.checker-t.checker}));for(var l=0;l<r.length;l++)a.push(t[r[l].idx]);return a}return a.a.useEffect((function(){return window.addEventListener("keydown",s),function(){window.removeEventListener("keydown",s)}})),a.a.useEffect((function(){i.players[i.playerTurn-1].isRobot&&(0!==i.isContiniousMoving?setTimeout((function(){n({type:"continue_move_by_robot"})}),3100):setTimeout((function(){n({type:"move_robot"})}),210))}),[i.isContiniousMoving,i.playerTurn]),Object(p.jsxs)("div",{className:"App",children:[Object(p.jsxs)("div",{className:"column",children:[Object(p.jsxs)("div",{className:"info",children:[Object(p.jsx)("h1",{children:"Checkers"}),Object(p.jsx)("hr",{}),Object(p.jsxs)("p",{children:["Made by codethejason for ",Object(p.jsx)("a",{href:"http://fossasia.org",children:"FOSSASIA"})," 2015."]})]}),Object(p.jsxs)("div",{className:"stats",children:[Object(p.jsx)("h2",{children:"Game Statistics"}),Object(p.jsxs)("div",{className:"wrapper",children:[Object(p.jsx)("div",{id:"player1",children:Object(p.jsx)("h3",{children:"Player 1 (Top)"})}),Object(p.jsx)("div",{id:"player2",children:Object(p.jsx)("h3",{children:"Player 2 (Bottom)"})})]}),Object(p.jsx)("div",{className:"clearfix"}),Object(p.jsx)("div",{className:"turn",style:1===i.playerTurn?{background:"linear-gradient(to right, #BEEE62 50%, transparent 50%)"}:{background:"linear-gradient(to right, transparent 50%, #BEEE62 50%)"}}),Object(p.jsx)("span",{id:"winner"}),Object(p.jsx)("button",{id:"cleargame",onClick:function(e){e.preventDefault(),n({type:"move_robot"})},children:"Reset Game"})]})]}),Object(p.jsx)("div",{className:"column",children:Object(p.jsxs)("div",{id:"board",onKeyDown:function(e){console.debug("key")},children:[Object(p.jsx)("div",{className:"tiles",children:function(){for(var e=[],t=0,r=function(r){for(var a=function(a){if(r%2===1){if(a%2===0){var n={top:i.backwardDirection?w[7-r]:w[r],left:i.backwardDirection?w[7-a]:w[a],color:"#FF3333"};e.push(Object(p.jsx)("div",{className:"tile",id:"tile"+t.toString(),style:n,onClick:function(e){return c(r,a,e)},children:v[i.backwardDirection?7-r:r][i.backwardDirection?7-a:a].toString()},t.toString())),t++}}else if(a%2===1){var s={top:i.backwardDirection?w[7-r]:w[r],left:i.backwardDirection?w[7-a]:w[a],color:"#FF3333"};e.push(Object(p.jsx)("div",{className:"tile",id:"tile"+t.toString(),style:s,onClick:function(e){return c(r,a,e)},children:v[i.backwardDirection?7-r:r][i.backwardDirection?7-a:a].toString()},t.toString())),t++}},n=0;n<i.gameBoard[r].length;n++)a(n)},a=0;a<i.gameBoard.length;a++)r(a);return e}()}),Object(p.jsxs)("div",{className:"pieces",children:[Object(p.jsx)("div",{className:"player1pieces",children:l(1)}),Object(p.jsx)("div",{className:"player2pieces",children:l(2)})]}),Object(p.jsx)("div",{className:"pult",children:function(){var e=[];if(i.hasArrowSelectedItem){var t={top:w[i.arrowSelectedItemRow],left:w[i.arrowSelectedItemCol]};e.push(Object(p.jsx)("div",{className:"selection",style:t}))}return e}()})]})})]})})),y=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,16)).then((function(t){var i=t.getCLS,r=t.getFID,a=t.getFCP,n=t.getLCP,s=t.getTTFB;i(e),r(e),a(e),n(e),s(e)}))};s.a.render(Object(p.jsx)(a.a.StrictMode,{children:Object(p.jsx)(A,{})}),document.getElementById("root")),y()}},[[15,1,2]]]);
//# sourceMappingURL=main.b5c0d0de.chunk.js.map