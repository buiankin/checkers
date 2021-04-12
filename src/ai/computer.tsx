import Game from './game';
import Move from './move';

class Computer
{
    // maximizingPlayer specifies which player the computer is playing for.
    maximizingPlayer=0;
    // maxDepth used to keep track of depth reached using iterative deepening search
    maxDepth=0;
    // default time limit
    timeLimit = 2;
    // heuristicType specifies which heuristic is used for the computer
    heuristicType=0;
    // startTime and currentTime used to ensure search doesn't exceed time limit
    startTime = 0; // long
    currentTime = 0; // long
    outOfTime = false;
    // used to keep track of number of pieces on board prior to search
    numAllyPieces = 0;
    numAllyKings = 0;
    numOppPieces = 0;
    numOppKings = 0;

    // evaluation function for mini-max.
    constructor(maximizingPlayer: number, heuristicType: number) {
        this.maximizingPlayer = maximizingPlayer;
        this.heuristicType = heuristicType;
    }

    // iterative deepening mini-max search with alpha beta pruning
    // Move
    public alphaBetaSearch(game: Game): Move|null {
        // begin by getting start time for search
        let date = new Date();
        this.startTime = date.getTime();
        // initialize necessary variables
        this.getBoardStatus(game);
        this.outOfTime = false;
        let bestMoveVal = 0;
        let depthReached = 0;
        let bestMove:Move|null = null;
        let listBestMovesCurrentDepth: Move[]=[];
        let legalMovesList:Move[] = game.getLegalMoves(game.board);
        // just return move if only 1 move available
        if (legalMovesList.length === 1) {
            console.log("Searched to depth 0 in 0 seconds.");
            return legalMovesList[0];
        }
        // actual search (iterative deepening mini-max w/ alpha beta pruning).
        for (this.maxDepth = 0; this.maxDepth < 15 && !this.outOfTime; this.maxDepth++) {
            listBestMovesCurrentDepth = [];
            let bestVal = Number.NEGATIVE_INFINITY;
            for (let i=0; i<legalMovesList.length; i++)
            {
                let move=legalMovesList[i];
                let copy = Game.Game(game);
                copy.applyMove(move, copy.board);
                //let min = this.minVal(copy, Number.MIN_VALUE, Number.MAX_VALUE, 0);
                let min = this.minVal(copy, Number.NEGATIVE_INFINITY, Number.MAX_VALUE, 0);
                if (this.outOfTime) break;
                // System.out.println("Possible move val: " + min);
                if (min === bestVal) {
                    listBestMovesCurrentDepth.push(move);
                }
                if (min > bestVal) {
                    listBestMovesCurrentDepth.length=0;
                    listBestMovesCurrentDepth.push(move);
                    bestVal = min;
                }
                if (bestVal === Number.MAX_VALUE) break;
            }
            if (!this.outOfTime) {
                //let chosenMove = random.nextInt(listBestMovesCurrentDepth.length);
                let chosenMove=Math.floor(Math.random()*listBestMovesCurrentDepth.length);
                bestMove = listBestMovesCurrentDepth[chosenMove];
                depthReached = this.maxDepth;
                bestMoveVal = bestVal;
            }
            if (bestMoveVal === Number.MAX_VALUE) break;
        }
        // System.out.println("Best move value " + bestMoveVal);
        console.log("Searched to depth " + depthReached + " in " + ((this.currentTime-this.startTime)/1000) + " seconds.");
        return bestMove;
    }
    // check if we've reached leaf nodes or maximum depth
    public cutoffTest(numMoves: number, depth: number) {
        if (numMoves === 0 || depth === this.maxDepth){
            return true;
        }
        return false;
    }
    // eval function decides the heuristic used to calculate value of leaf nodes
    public evalFcn(game: Game): number {
        switch (this.heuristicType) {
            case 1:
                return this.easyHeuristic(game);
            case 2:
                return this.mediumHeuristic(game);
            case 3:
                return this.hardHeuristic(game);
            default:
                return this.hardHeuristic(game);
        }
    }
    // heuristic which takes into account: number of pieces, defending neighbors, backrow protectors, closeness to becoming king,
    // and number of moves each player has for given board. also forces trades when ahead.
    public hardHeuristic(game: Game): number {
        let numRows = game.board.length;
        let numCols = game.board[0].length;
        let boardVal = 0;
        let cntAllyPieces = 0;
        let cntAllyKings = 0;
        let cntOppPieces = 0;
        let cntOppKings = 0;

        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                if (this.maximizingPlayer === 1){
                    switch(game.board[i][j]) {
                        case 1:
                            cntAllyPieces++;
                            boardVal += this.numDefendingNeighbors(i, j, game.board) * 50 + this.backBonus(i) + (15 * i) + this.middleBonus(i, j);
                            break;
                        case 2:
                            cntOppPieces++;
                            boardVal -= this.numDefendingNeighbors(i, j, game.board) * 50 + this.backBonus(i) + (15 * (7 - i)) + this.middleBonus(i, j);
                            break;
                        case 3:
                            cntAllyKings++;
                            boardVal += this.middleBonus(i,j);
                            break;
                        case 4:
                            cntOppKings++;
                            boardVal -= this.middleBonus(i,j);
                            break;
                    }
                } else {
                    switch(game.board[i][j]) {
                        case 1:
                            cntOppPieces++;
                            boardVal -= this.numDefendingNeighbors(i, j, game.board) * 50 + this.backBonus(i)  + (15 * i) + this.middleBonus(i, j);
                            break;
                        case 2:
                            cntAllyPieces++;
                            boardVal += this.numDefendingNeighbors(i, j, game.board) * 50 + this.backBonus(i) + (15 * (7 - i)) + this.middleBonus(i, j);;
                            break;
                        case 3:
                            cntOppKings++;
                            boardVal -= this.middleBonus(i, j);
                            break;
                        case 4:
                            cntAllyKings++;
                            boardVal += this.middleBonus(i, j);
                            break;
                    }
                }
            }
        }

        // force trades when ahead
        if (this.numAllyPieces + this.numAllyKings > this.numOppPieces + this.numOppKings && cntOppPieces + cntOppKings !== 0 && this.numOppPieces + this.numOppKings !== 0 && this.numOppKings !== 1) {
            if ((cntAllyPieces + cntAllyKings)/(cntOppPieces + cntOppKings) > (this.numAllyPieces + this.numAllyKings)/(this.numOppPieces + this.numOppKings)) {
                boardVal += 150;
            } else {
                boardVal -= 150;
            }
        }

        boardVal += 600 * cntAllyPieces + 1000 * cntAllyKings - 600 * cntOppPieces - 1000 * cntOppKings;

        // heavy computation to see how many moves each player has, dont do until players have under 6 pieces
        if (this.numOppPieces + this.numOppKings < 6 || this.numAllyPieces + this.numAllyKings < 6) {
            let originalPlayer = game.currentPlayer;
            game.currentPlayer = 1;
            let player1Moves: Move[] = game.getLegalMoves(game.board);
            game.currentPlayer = 2;
            let player2Moves: Move[] = game.getLegalMoves(game.board);
            game.currentPlayer = originalPlayer;

            if (player1Moves.length===0) {
                return this.maximizingPlayer === 1 ? Number.NEGATIVE_INFINITY : Number.MAX_VALUE;
            }

            if (player2Moves.length===0) {
                return this.maximizingPlayer === 2 ? Number.NEGATIVE_INFINITY : Number.MAX_VALUE;
            }
        }

        if (cntOppPieces + cntOppKings === 0 && cntAllyPieces + cntAllyKings > 0) {
            boardVal = Number.MAX_VALUE;
        }

        if (cntAllyPieces + cntAllyKings === 0 && cntOppPieces + cntOppKings > 0) {
            boardVal -= Number.MIN_VALUE;
        }

        return boardVal;
    }

    public mediumHeuristic(game: Game): number {
        let numRows = game.board.length;
        let numCols = game.board[0].length;
        let boardVal = 0;

        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                if (this.maximizingPlayer === 1){
                    switch(game.board[i][j]) {
                        case 1:
                            boardVal += 3 + (i * 0.5) + this.numDefendingNeighbors(i, j, game.board);
                            if (j === 0 || j === 8) {
                                boardVal += 1;
                            }
                            if (i === 0) {
                                boardVal += 2;
                            }
                            break;
                        case 2:
                            boardVal -= 3 + ((7 - i) * 0.5) + this.numDefendingNeighbors(i, j, game.board);
                            if (j === 0 || j === 8) {
                                boardVal -= 1;
                            }
                            if (i === 7) {
                                boardVal -= 2;
                            }
                            break;
                        case 3:
                            boardVal += 5 + this.numDefendingNeighbors(i, j, game.board);
                            if (j === 0 || j === 8) {
                                boardVal += 1;
                            }
                            if (i === 0) {
                                boardVal += 2;
                            }
                            break;
                        case 4:
                            boardVal -= 5 + this.numDefendingNeighbors(i, j, game.board);
                            if (j === 0 || j === 8) {
                                boardVal -= 1;
                            }
                            if (i === 7) {
                                boardVal -= 2;
                            }
                            break;
                    }
                } else {
                    switch(game.board[i][j]) {
                        case 1:
                            boardVal -= 3 + (i * 0.5) + this.numDefendingNeighbors(i, j, game.board);
                            if (j === 0 || j === 8) {
                                boardVal -= 1;
                            }
                            if (i === 0) {
                                boardVal -= 2;
                            }
                            break;
                        case 2:
                            boardVal += 3 + ((7 - i) * 0.5) + this.numDefendingNeighbors(i, j, game.board);
                            if (j === 0 || j === 8) {
                                boardVal += 1;
                            }
                            if (i === 7) {
                                boardVal += 2;
                            }
                            break;
                        case 3:
                            boardVal -= 5 + this.numDefendingNeighbors(i, j, game.board);
                            if (j === 0 || j === 8) {
                                boardVal -= 1;
                            }
                            if (i === 0) {
                                boardVal -= 2;
                            }
                            break;
                        case 4:
                            boardVal += 5 + this.numDefendingNeighbors(i, j, game.board);
                            if (j === 0 || j === 8) {
                                boardVal += 1;
                            }
                            if (i === 7) {
                                boardVal += 2;
                            }
                            break;
                    }
                }
            }
        }
        return boardVal;
    }

    public easyHeuristic(game: Game): number {
        let numRows = game.board.length;
        let numCols = game.board[0].length;
        let boardVal = 0;

        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                if (this.maximizingPlayer === 1){
                    switch(game.board[i][j]) {
                        case 1:
                            boardVal += 3;
                            break;
                        case 2:
                            boardVal -= 3;
                            break;
                        case 3:
                            boardVal += 5;
                            break;
                        case 4:
                            boardVal -= 5;
                            break;
                    }
                } else {
                    switch(game.board[i][j]) {
                        case 1:
                            boardVal -= 3;
                            break;
                        case 2:
                            boardVal += 3;
                            break;
                        case 3:
                            boardVal -= 5;
                            break;
                        case 4:
                            boardVal += 5;
                            break;
                    }
                }
            }
        }
        return boardVal;
    }
    // minimax with alpha beta pruning
    public maxVal(game: Game, alpha: number, beta: number, depth: number): number {
        // check if ran out of time for search
        let newDate = new Date();
        this.currentTime = newDate.getTime();
        if ((this.currentTime - this.startTime) >= this.timeLimit * 990) {
            this.outOfTime = true;
            return 0;
        }
        // actual max algorithm
        let listLegalMoves: Move[] = game.getLegalMoves(game.board);
        if (this.cutoffTest(listLegalMoves.length, depth)) {
            return this.evalFcn(game);
        }
        let v = Number.NEGATIVE_INFINITY;
        listLegalMoves.forEach(move => {
            let copyGame = Game.Game(game);
            copyGame.applyMove(move, copyGame.board);
            v = Math.max(v, this.minVal(copyGame, alpha, beta, depth + 1));
            if (v >= beta) return v;
            alpha = Math.max(alpha, v);
        });
        return v;
    }

    public minVal(game: Game, alpha: number, beta: number, depth: number): number {
        // check if ran out of time for search
        let newDate = new Date();
        this.currentTime = newDate.getTime();
        if ((this.currentTime - this.startTime) > this.timeLimit * 990) {
            this.outOfTime = true;
            return 0;
        }
        // actual min algorithm
        let listLegalMoves: Move[] = game.getLegalMoves(game.board);
        if (this.cutoffTest(listLegalMoves.length, depth)) {
            return this.evalFcn(game);
        }
        let v = Number.MAX_VALUE;
        listLegalMoves.forEach(move => {
            let copyGame = Game.Game(game);
            copyGame.applyMove(move, copyGame.board);
            v = Math.min(v, this.maxVal(copyGame, alpha, beta, depth + 1));
            if (v <= alpha) return v;
            beta = Math.min(beta, v);
        });
        return v;
    }
    // gets number of neighbors for a piece on the board
    public numDefendingNeighbors(row: number, col: number, state: number[][]): number {
        let defense = 0;
        switch (state[row][col]) {
            case 1:
                if (row + 1 < state.length && col + 1 < state[0].length) {
                    if ((state[row + 1][col + 1] & 1) === 1) {
                        defense += 1;
                    }
                }
                if (row + 1 < state.length && col - 1 >= 0) {
                    if ((state[row + 1][col - 1] & 1) === 1) {
                        defense += 1;
                    }
                }
                break;
            case 2:
                if (row - 1 >= 0 && col + 1 < state[0].length) {
                    if ((state[row - 1][col + 1] & 1) === 0) {
                        defense += 1;
                    }
                }
                if (row - 1 >= 0 && col - 1 >= 0) {
                    if ((state[row - 1][col - 1] & 1) === 0) {
                        defense += 1;
                    }
                }
                break;
            case 3:
                if (row + 1 < state.length && col + 1 < state[0].length) {
                    if ((state[row + 1][col + 1] & 1) === 1) {
                        defense += 1;
                    }
                }
                if (row + 1 < state.length && col - 1 >= 0) {
                    if ((state[row + 1][col - 1] & 1) === 1) {
                        defense += 1;
                    }
                }
                if (row - 1 >= 0 && col + 1 < state[0].length) {
                    if ((state[row - 1][col + 1] & 1) === 1) {
                        defense += 1;
                    }
                }
                if (row - 1 >= 0 && col - 1 >= 0) {
                    if ((state[row - 1][col - 1] & 1) === 1) {
                        defense += 1;
                    }
                }
                break;
            case 4:
                if (row + 1 < state.length && col + 1 < state[0].length) {
                    if ((state[row + 1][col + 1] & 1) === 0) {
                        defense += 1;
                    }
                }
                if (row + 1 < state.length && col - 1 >= 0) {
                    if ((state[row + 1][col - 1] & 1) === 0) {
                        defense += 1;
                    }
                }
                if (row - 1 >= 0 && col + 1 < state[0].length) {
                    if ((state[row - 1][col + 1] & 1) === 0) {
                        defense += 1;
                    }
                }
                if (row - 1 >= 0 && col - 1 >= 0) {
                    if ((state[row - 1][col - 1] & 1) === 0) {
                        defense += 1;
                    }
                }
                break;

        }
        return defense;
    }
    // returns bonus if piece is protecting its king row
    public backBonus(row: number) {
        if (this.maximizingPlayer === 1 && row === 0) {
            return 100;
        }
        if (this.maximizingPlayer === 2 && row === 7) {
            return 100;
        }
        return 0;
    }
    // returns bonus depending on how close piece is to the middle
    public middleBonus(row: number, col: number) {
        return 100 - ((Math.abs(4 - col) + Math.abs(4 - row)) * 10);
    }

    // get number of pieces on original board and update global variables
    public getBoardStatus(game: Game) {
        let numRows = game.board.length;
        let numCols = game.board[0].length;
        this.numAllyPieces = 0;
        this.numAllyKings = 0;
        this.numOppPieces = 0;
        this.numOppKings = 0;

        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                if (this.maximizingPlayer === 1) {
                    switch (game.board[i][j]) {
                        case 1:
                            this.numAllyPieces++;
                            break;
                        case 2:
                            this.numOppPieces++;
                            break;
                        case 3:
                            this.numAllyKings++;
                            break;
                        case 4:
                            this.numOppKings++;
                            break;
                    }
                }
                else {
                    switch (game.board[i][j]) {
                        case 1:
                            this.numOppPieces++;
                            break;
                        case 2:
                            this.numAllyPieces++;
                            break;
                        case 3:
                            this.numOppKings++;
                            break;
                        case 4:
                            this.numAllyKings++;
                            break;
                    }
                }
            }
        }
    }

}

export default Computer;