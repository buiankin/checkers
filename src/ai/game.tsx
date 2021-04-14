
import Move from "./move";

class Game {
    // 8x8 board composed of integers from -1 to 4.
    // -1 invalid board space, 0 empty board space
    // 1 -> player 1 normal pieces, 2 -> player 2 normal pieces, 3 -> player 1 kings, 4 -> player 2 kings
    board: number[][]=[];

    static directions=[{y:1, x:1},{y:-1,x:1},{y:1,x:-1},{y:-1,x:-1}];

    // set default starting player and time limit
    currentPlayer = 1;
    timeLimit = 3;

    russianRules = false;
    // board colors
    //public const ANSI_RED = "\u001B[91m";
    //public const ANSI_WHITE_BACKGROUND = "\u001B[47m";
    //public const ANSI_CYAN = "\u001B[96m";
    //public const ANSI_RESET = "\u001B[0m";
    // empty constructor
    constructor() {

    }
    // copy constructor, used for when AI needs to apply minimax algorithm
    public static Game(game: Game) {
        let newGame=new Game();
        newGame.board = [];
        for (let i = 0; i < game.board.length; i++) {
            newGame.board.push(game.board[i].slice());
        }
        newGame.currentPlayer = game.currentPlayer;
        newGame.timeLimit = game.timeLimit;
        return newGame;
    }

    public setCurrentState(board: number[][], currentPlayer: number, timeLimit: number): void {
        this.currentPlayer = currentPlayer;
        this.timeLimit = timeLimit;

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (board[i][j]>=0)
                    this.board[i][j] = board[i][j]%10;
            }
        }

    }


    // initialize board as new game board
    newGame(): void {
        // прервое число - количество строк, второе - колонок
        this.board = new Array(8).fill(0).map(() => new Array(8).fill(0));
        // initialize the board with null spaces as -1, empty spaces as 0, player 1
        // as 1 (red checkers) and player 2 as 2 (blue checkers)
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 8; j += 2) {
                if ((i & 1) === 1) {
                    this.board[i][j + 1] = -1;
                    this.board[i][j] = 1;
                } else {
                    this.board[i][j] = -1;
                    this.board[i][j + 1] = 1;
                }
            }
        }

        for (let i = 3; i < 5; i++) {
            for (let j = 0; j < 8; j += 2) {
                if ((i & 1) === 1) {
                    this.board[i][j + 1] = -1;
                    this.board[i][j] = 0;
                } else {
                    this.board[i][j] = -1;
                    this.board[i][j + 1] = 0;
                }
            }
        }

        for (let i = 5; i < 8; i++) {
            for (let j = 0; j < 8; j += 2) {
                if ((i & 1) === 1) {
                    this.board[i][j + 1] = -1;
                    this.board[i][j] = 2;
                } else {
                    this.board[i][j] = -1;
                    this.board[i][j + 1] = 2;
                }
            }
        }
    }
    /*
    // load games into board[][] and fill other variables using .txt files following Sable's board format
    loadGameBoard(filename: string): boolean {
        try {
            //BufferedReader reader = new BufferedReader(new FileReader(filename));
            this.board = new Array(8).fill(0).map(() => new Array(8).fill(0));
            for (let i = 0; i < 8; i++) {
                String[] boardValues = reader.readLine().trim().split("\\s+");
                if ((i & 1) == 0) {
                    for (int j = 0; j < 8; j += 2) {
                        board[i][j] = -1;
                        board[i][j + 1] = Integer.valueOf(boardValues[j / 2]);
                    }
                } else {
                    for (int j = 0; j < 8; j += 2) {
                        board[i][j] = Integer.valueOf(boardValues[j / 2]);
                        board[i][j + 1] = -1;
                    }
                }
            }
            String currPlayer = reader.readLine();
            currentPlayer = Integer.valueOf(currPlayer);
            String cpuTimeLimit = reader.readLine();
            timeLimit = Integer.valueOf(cpuTimeLimit);
            return true;
        } catch (FileNotFoundException e) {
            //e.printStackTrace();
            System.out.println("File not found.");
            return false;
        } catch (IOException e) {
            //e.printStackTrace();
            System.out.println("IO exception occurred.");
            return false;
        }
    }
    // print board corresponding to board[][]
    void printBoard() {
        System.out.println("      0      1      2      3      4      5      6      7   ");
        for (int i = 0; i < 8; i++) {
            System.out.print("   ");
            if ((i & 1) == 0) { // print even rows
                // padding with extra row of black/white space
                for (int j = 0; j < 4; j++) {
                    System.out.print(ANSI_WHITE_BACKGROUND + "       " + ANSI_RESET + "       ");
                }

                System.out.println("");
                System.out.print(" " + (i) + " ");

                for (int j = 0; j < 8; j++) {
                    printCorrectPiece(board[i][j]);
                }

                System.out.println("");
                System.out.print("   ");

                // padding with extra row of black/white space
                for (int j = 0; j < 4; j++) {
                    System.out.print(ANSI_WHITE_BACKGROUND + "       " + ANSI_RESET + "       ");
                }

            } else { //print odd rows
                // padding with extra row of black/white space
                for (int j = 0; j < 4; j++) {
                    System.out.print("       " + ANSI_WHITE_BACKGROUND + "       " + ANSI_RESET);
                }

                System.out.println("");
                System.out.print(" " + (i) + " ");

                for (int j = 0; j < 8; j++) {
                    printCorrectPiece(board[i][j]);
                }

                System.out.println("");
                System.out.print("   ");

                // padding with extra row of black/white space
                for (int j = 0; j < 4; j++) {
                    System.out.print("       " + ANSI_WHITE_BACKGROUND + "       " + ANSI_RESET);
                }
            }

            System.out.println("");
        }
    }
    // helper function for printBoard()
    void printCorrectPiece(int val) {
        switch (val) {
            case -1:
                System.out.print(ANSI_WHITE_BACKGROUND + "       " + ANSI_RESET);
                break;
            case 0:
                System.out.print("       ");
                break;
            case 1:
                System.out.print(ANSI_RED + "   -   " + ANSI_RESET);
                break;
            case 2:
                System.out.print(ANSI_CYAN + "   .   " + ANSI_RESET);
                break;
            case 3:
                System.out.print(ANSI_RED + "   *   " + ANSI_RESET);
                break;
            case 4:
                System.out.print(ANSI_CYAN + "   0   " + ANSI_RESET);
                break;

        }
    }
    */

    // function to iterate over all pieces in the board and get legal moves for current player
    getLegalMoves(state: number[][]): Move[] {
        //List<Move> slideMoves = new ArrayList<Move>();
        //List<Move> jumpMoves = new ArrayList<Move>();
        let slideMoves: Move[]=[];
        let jumpMoves: Move[]=[];

        // iterate over the entire board, check for legal moves for all pieces of current player
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.currentPlayer === 1) {
                    if (this.board[i][j] === 1 || this.board[i][j] === 3) {
                        this.getJumps(jumpMoves, null, this.board[i][j], i, j, state);
                        // stop looking for slide moves if we find any jump moves
                        if (jumpMoves.length===0) {
                            this.getSlides(slideMoves, this.board[i][j], i, j, this.board);
                        }
                    }
                } else {
                    if (this.board[i][j] === 2 || this.board[i][j] === 4) {
                        this.getJumps(jumpMoves, null, this.board[i][j], i, j, state);
                        // stop looking for slide moves if we find any jump moves
                        if (jumpMoves.length===0) {
                            this.getSlides(slideMoves, this.board[i][j], i, j, this.board);
                        }

                    }
                }
            }
        }
        return jumpMoves.length===0 ? slideMoves : jumpMoves;
    }
    // function which mutates the moves list it takes as a parameter
    getSlides(moves: Move[], pieceType: number, startRow: number, startCol: number, state:number[][]): void {
        //ArrayList<Integer> endRow = new ArrayList<Integer>();
        //ArrayList<Integer> endCol = new ArrayList<Integer>();
        let endRow: number[]=[];
        let endCol: number[]=[];
        let kingMoves = [];

        switch (pieceType) {
            case 1:
                endRow.push(startRow + 1);
                endRow.push(startRow + 1);
                endCol.push(startCol + 1);
                endCol.push(startCol - 1);
                break;
            case 2:
                endRow.push(startRow - 1);
                endRow.push(startRow - 1);
                endCol.push(startCol + 1);
                endCol.push(startCol - 1);
                break;
            case 3:
            case 4:
                if (this.russianRules)
                {
                    // Дамка ходит в любом направлении
                    for (let dir=0; dir<4; dir++)
                    {
                        let y=startRow;
                        let x=startCol;
                        let offset_y=Game.directions[dir].y;
                        let offset_x=Game.directions[dir].x;
                        for (let offset=1; offset<=7; offset++)
                        {
                            y+=offset_y;
                            x+=offset_x;
                            // если вышли за границы
                            if (y < 0 || y > 7 || x < 0 || x > 7) break;
                            endRow.push(y);
                            endCol.push(x);
                            kingMoves.push({len: offset, dir_y: Game.directions[dir].y, dir_x: Game.directions[dir].x});
                        }
                    }
                } else
                {
                    endRow.push(startRow + 1);
                    endRow.push(startRow + 1);
                    endRow.push(startRow - 1);
                    endRow.push(startRow - 1);
                    endCol.push(startCol + 1);
                    endCol.push(startCol - 1);
                    endCol.push(startCol + 1);
                    endCol.push(startCol - 1);
                    break;
                }
        }

        let numMoves = endRow.length;

        for (let i = 0; i < numMoves; i++) {
            // check if inside the board
            if (endRow[i] < 0 || endRow[i] > 7 || endCol[i] < 0 || endCol[i] > 7) continue;
            // check if end position is occupied
            if (state[endRow[i]][endCol[i]] !== 0) continue;
            if ((pieceType===3||pieceType===4)&&this.russianRules)
            {
                let cantMove=false;
                let kingMove=kingMoves[i];
                // если это дамка, то надо, чтобы в промежуточных положениях никого не было
                for (let j=0; j<kingMoves[i].len; j++)
                {
                    if (state[startRow+kingMove.dir_y*j][startCol+kingMove.dir_x*j] !== 0)
                    {
                        cantMove=true;
                        break;
                    }
                }

            }
            // move was legal so add it to list
            moves.push(Move.fill_1(startRow, startCol, endRow[i], endCol[i], state));
        }
    }
    // function which mutates the moves list it takes as a parameter
    getJumps(moves: Move[], move: Move|null, pieceType: number, startRow: number, startCol: number, state: number[][]): void  {
        // endRow/endCol list to add all possible squares to move to from each piece
        // captureRow/captureCol list to add all possible squares that can be captured
        let endRow: number[]=[];
        let endCol: number[]=[];
        let captureRow: number[]=[];
        let captureCol: number[]=[];

        if (this.russianRules)
        {
            switch (pieceType) {
                case 1:
                case 2:
                    // все рубят в любом направлении
                    endRow.push(startRow + 2);
                    endRow.push(startRow + 2);
                    endRow.push(startRow - 2);
                    endRow.push(startRow - 2);
                    endCol.push(startCol - 2);
                    endCol.push(startCol + 2);
                    endCol.push(startCol - 2);
                    endCol.push(startCol + 2);
                    captureRow.push(startRow + 1);
                    captureRow.push(startRow + 1);
                    captureRow.push(startRow - 1);
                    captureRow.push(startRow - 1);
                    captureCol.push(startCol - 1);
                    captureCol.push(startCol + 1);
                    captureCol.push(startCol - 1);
                    captureCol.push(startCol + 1);
                    break;
                case 3:
                case 4:
                    // Дамка ходит (рубит) в любом направлении на любое расстояние
                    for (let dir=0; dir<4; dir++)
                    {
                        let offset_y=Game.directions[dir].y;
                        let offset_x=Game.directions[dir].x;
                        // здесь рубят
                        let y=startRow+offset_y;
                        let x=startCol+offset_x;

                        for (let offset=1; offset<=7; offset++)
                        {
                            // а тут останавливаются
                            y+=offset_y;
                            x+=offset_x;
                            // если вышли за границы
                            if (y < 0 || y > 7 || x < 0 || x > 7) break;
                            endRow.push(y);
                            endCol.push(x);
                            captureRow.push(y-offset_y);
                            captureCol.push(x-offset_x);
                        }
                    }
                    break;
            }

        } else
        {
            switch (pieceType) {
                case 1:
                    endRow.push(startRow + 2);
                    endRow.push(startRow + 2);
                    endCol.push(startCol - 2);
                    endCol.push(startCol + 2);
                    captureRow.push(startRow + 1);
                    captureRow.push(startRow + 1);
                    captureCol.push(startCol - 1);
                    captureCol.push(startCol + 1);
                    break;
                case 2:
                    endRow.push(startRow - 2);
                    endRow.push(startRow - 2);
                    endCol.push(startCol - 2);
                    endCol.push(startCol + 2);
                    captureRow.push(startRow - 1);
                    captureRow.push(startRow - 1);
                    captureCol.push(startCol - 1);
                    captureCol.push(startCol + 1);
                    break;
                case 3:
                case 4:
                    endRow.push(startRow + 2);
                    endRow.push(startRow + 2);
                    endRow.push(startRow - 2);
                    endRow.push(startRow - 2);
                    endCol.push(startCol - 2);
                    endCol.push(startCol + 2);
                    endCol.push(startCol - 2);
                    endCol.push(startCol + 2);
                    captureRow.push(startRow + 1);
                    captureRow.push(startRow + 1);
                    captureRow.push(startRow - 1);
                    captureRow.push(startRow - 1);
                    captureCol.push(startCol - 1);
                    captureCol.push(startCol + 1);
                    captureCol.push(startCol - 1);
                    captureCol.push(startCol + 1);
                    break;
            }
        }

        let numMoves = endRow.length;
        let anyValidMoves = false;
        // new boolean[numMoves]
        let whichAreValid = new Array(numMoves).fill(false);

        for (let i = 0; i < numMoves; i++) {
            // check if inside the board
            if (endRow[i] < 0 || endRow[i] > 7 || endCol[i] < 0 || endCol[i] > 7) continue;
            // check if end position is occupied
            if (move !== null) {
                // check if end position is occupied but allow piece to land on initial position
                if (state[endRow[i]][endCol[i]] !== 0 && state[endRow[i]][endCol[i]] !== state[move.initialRow][move.initialCol]) continue;
                // check if we're trying to capture a piece we've already captured in current move
                //if (move.capturedSquares.has(new Pair(captureRow[i], captureCol[i]))) continue;
                if (move.capturedSquares.has(captureRow[i]*100+captureCol[i])) continue;
            }
            else {
                // if move is null, make sure end position isn't occupied
                if (state[endRow[i]][endCol[i]] !== 0) continue;
            }
            // check if captured positions were occupied by the opposite player
            if (this.currentPlayer === 1 && !(state[captureRow[i]][captureCol[i]] === 2 || state[captureRow[i]][captureCol[i]] === 4)) continue;

            if (this.currentPlayer === 2 && !(state[captureRow[i]][captureCol[i]] === 1 || state[captureRow[i]][captureCol[i]] === 3)) continue;

            // if we got this far, it means the move is valid
            anyValidMoves = true;
            whichAreValid[i] = true;
        }

        if (move !== null && !anyValidMoves) {
            moves.push(move);
            return;
        }

        if (move === null && anyValidMoves) {
            for (let i = 0; i < numMoves; i++) {
                if (whichAreValid[i]) {
                    let newMove = Move.fill_1(startRow, startCol, endRow[i], endCol[i], state);
                    newMove.initialRow = startRow;
                    newMove.initialCol = startCol;
                    newMove.startRow = startRow;
                    newMove.startCol = startCol;
                    newMove.endRow = endRow[i];
                    newMove.endCol = endCol[i];
                    newMove.listCaptureRow.push(captureRow[i]);
                    newMove.listCaptureCol.push(captureCol[i]);
                    newMove.listVisitedRow.push(endRow[i]);
                    newMove.listVisitedCol.push(endCol[i]);
                    newMove.capturedSquares.add(captureRow[i]*100+captureCol[i]);
                    this.getJumps(moves, newMove, pieceType, newMove.endRow, newMove.endCol, state);
                }
            }
        }
        if (move !== null && anyValidMoves) {
            for (let i = 0; i < numMoves; i++) {
                if (whichAreValid[i]) {
                    let newMove = Move.fill_2(move);
                    newMove.startRow = startRow;
                    newMove.startCol = startCol;
                    newMove.endRow = endRow[i];
                    newMove.endCol = endCol[i];
                    newMove.listCaptureRow.push(captureRow[i]);
                    newMove.listCaptureCol.push(captureCol[i]);
                    newMove.listVisitedRow.push(endRow[i]);
                    newMove.listVisitedCol.push(endCol[i]);
                    newMove.capturedSquares.add(captureRow[i]*100+captureCol[i]);
                    this.getJumps(moves, newMove, pieceType, newMove.endRow, newMove.endCol, state);
                }
            }
        }
        return;
    }
    // function to a apply a move to the board
    applyMove(move: Move, state: number[][]): void {
        // handle slide move
        if (move.listCaptureRow.length===0) {
            // update end position to match current piece
            state[move.endRow][move.endCol] = state[move.startRow][move.startCol];
            // make the piece a king if it is in the back row of the opposite team's side
            if (state[move.startRow][move.startCol] === 1 && move.endRow === 7) {
                state[move.endRow][move.endCol] += 2;
            }
            if (state[move.startRow][move.startCol] === 2 && move.endRow === 0) {
                state[move.endRow][move.endCol] += 2;
            }
            // clear initial position
            state[move.startRow][move.startCol] = 0;
        }
        // handle jump move
        else {
            // clear capture positions
            for (let i = 0; i < move.listCaptureRow.length; i++) {
                state[move.listCaptureRow[i]][move.listCaptureCol[i]] = 0;
            }
            // update end position to match current piece
            state[move.endRow][move.endCol] = state[move.initialRow][move.initialCol];
            // make the piece a king if it is in the back row of the opposite team's side
            if (state[move.initialRow][move.initialCol] === 1 && move.endRow === 7) {
                state[move.endRow][move.endCol] += 2;
            }
            if (state[move.initialRow][move.initialCol] === 2 && move.endRow === 0) {
                state[move.endRow][move.endCol] += 2;
            }
            //  clear initial position
            state[move.initialRow][move.initialCol] = 0;
        }
        // switch the currentPlayer
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        //System.out.println("Current Player: " + currentPlayer);
    }
    // print moves and in the case of jumps show intermediate jumps
    printListMoves(movesList: Move[]) {
        if (movesList[0].listCaptureRow.length===0) {
            for (let i = 0; i < movesList.length; i++) {
                console.debug("Move " + i + ": (" + movesList[i].startRow + "," + movesList[i].startCol + ") --> (" + movesList[i].endRow + "," + movesList[i].endCol + ")");

            }
        } else {
            for (let i = 0; i < movesList.length; i++) {
                console.debug("\n");
                console.debug("Move " + i + ": (" + movesList[i].initialRow + "," + movesList[i].initialCol + ")");
                for (let j = 0; j < movesList[i].listVisitedRow.length; j++) {
                    console.debug(" --> (" + movesList[i].listVisitedRow[j] + "," + movesList[i].listVisitedCol[j] + ")");
                }
            }
            console.debug("");
        }
        console.debug("");
    }
    // print individual move
    printMove(move: Move) {
        if (move.listCaptureRow.length===0){
            console.debug("Move " + ": (" + move.startRow + "," + move.startCol + ") --> (" + move.endRow + "," + move.endCol + ")");
        } else {
            console.debug("Move " + ": (" + move.initialRow + "," + move.initialCol + ")");
            for (let j = 0; j < move.listVisitedRow.length; j++) {
                console.debug(" --> (" + move.listVisitedRow[j] + "," + move.listVisitedCol[j] + ")");
            }
            console.debug("");
        }
        console.debug("");
    }
    /*
    // print help note which shows what symbols represent the pieces of each player
    void printNote() {
        System.out.println("Player 1 is" + ANSI_RED + "  -  " + ANSI_RESET + "(normal piece) and" + ANSI_RED + "  *  " + ANSI_RESET + "(king)");
        System.out.println("Player 2 is" + ANSI_CYAN + "  .  " + ANSI_RESET + "(normal piece) and" + ANSI_CYAN + "  0  " + ANSI_RESET + "(king)");
        System.out.println("");
    }
    */
}

export default Game;
