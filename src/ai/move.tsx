
import Pair from './pair';

class Move{
    public initialRow=0;
    public initialCol=0;

    public startRow=0;
    public startCol=0;

    public endRow=0;
    public endCol=0;

    public listCaptureRow: number[]=[];
    public listCaptureCol: number[]=[];

    public listVisitedRow: number[]=[];
    public listVisitedCol: number[]=[];

    //public Set<Pair> capturedSquares;
    public capturedSquares = new Set();
    public state: number[][]=[];

    constructor()
    {

    }

    static fill_1(startRow: number, startCol: number, endRow: number, endCol: number, state: number[][]) {
        let newMove=new Move();
        newMove.startRow = startRow;
        newMove.startCol = startCol;
        newMove.endRow = endRow;
        newMove.endCol = endCol;
        newMove.state = state;
        newMove.listCaptureRow = [];
        newMove.listCaptureCol = [];
        newMove.listVisitedRow = [];
        newMove.listVisitedCol = [];
        newMove.capturedSquares = new Set();
        return newMove;
    }

    // copy constructor
    static fill_2(move: Move) {
        let newMove=new Move();
        newMove.initialRow = move.initialRow;
        newMove.initialCol = move.initialCol;
        newMove.startRow = move.startRow;
        newMove.startCol = move.startCol;
        newMove.endRow = move.endRow;
        newMove.endCol = move.endCol;
        newMove.listVisitedRow = move.listVisitedRow.slice();
        newMove.listVisitedCol = move.listVisitedCol.slice();
        newMove.listCaptureRow = move.listCaptureRow.slice();
        newMove.listCaptureCol = move.listCaptureCol.slice();
        newMove.capturedSquares = new Set();
        move.capturedSquares.forEach(element => {
            newMove.capturedSquares.add(element);
        });
        //
        newMove.state=[];
        move.state.forEach(line => {
            newMove.state.push(line.slice());
        });
        return newMove;
    }

}

export default Move;