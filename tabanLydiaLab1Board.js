/*Board definition with immutable values*/
class Board{
    constructor(rowNumbers, columnNumbers){
        this.rowNumbers = 5;
        rowNumbers.freeze();

        this.columnNumbers = 5;
        columnNumbers.freeze();

    }

    //defined square indices
    Square(rowInd, columnInd){
        var rowInd = [0];
        var columnInd = [0];
    //method for board extensibility
    var extend = this.Square;
        for (extend ===[0], [0]; extend < this.rowNumbers; extend++ ){
            return Square.rowInd + 1;
            return this.Square.columnInd + 1;
        }

    }
    /*Events broadcasted by the board*/
    add(){
        var btn = document.querySelector('add');
        btn.onClick = function(){
        var newCandy = Candy();
        }
    }

    remove(){
        var btn = document.querySelector('remove');
        if (btn.onClick('remove')){
            delete this.Candy();
        }
    }

    move(){
        var btn = document.querySelector('move');
        if(btn.onClick('move')){
            Square.extend();
        }
    }

    scoreUpdate(currentScore){
        var button = document.querySelector('score')
        var currentScore = function(){
            var myScore = document.URL.indexOf('');
        }

        return myScore;
    }

    
/*Returns a boolean indication of whether the row and column identify a valid square on the board.
*/
    isValidLocation(row, col) {
        var rowCol = function(row, col){
            if (row< this.rowNumbers, col < this.colNumbers){
                return true;
            }
            else {
                return false;
            }
        } 
} 


/* Returns a boolean indication of whether the board[row][column] is empty (Does not contain a candy.*/
isEmptyLocation(row, col) {
    var emptyLocation = function(row, col){
        if(row< this.rowNumber, col < this.colNumbers){
            return true;
        }
        else{
            return false;
        }
    }
}

/*
Returns the number of squares on each side of the board 
*/
getBoardSize() {
    var squareNumbers = function(rowMe, colMe){
        for(row = 0; row < this.rowNumber; row++){
            return rowMe;
        }
        for(col = 0; col < this.colNumber; col++){
            return colMe;
        }
    }
var totalSquares = (rowMe * colMe);
return totalSquares;
}

/*Get's the candy at [row, column] or null if the square is empty.*/
getCandyAt(row, col) {
    var location = function(row, col){
        if(row == this.rowInd && col == columnInd){
            return Candy.columnInd, Candy.rowInd;
        }
        else{
            return null;
        }
    }
}

/*Get the location of the candy (row, column) if it's on the board or null if it's not found.*/
getLocationOf(candy) {
    var candy = function(row, col){
        if (Candy.rowNumber && Candy.colNumber){
            return rowNumber, colNumber;
        }
        else{
            return null;
        }
    }
}

/*Get a list of all candies on the board, in no particular order */
getAllCandies(){
    var allCandies = function(row, col){
        for (candy = 0; candy < candy.getBoardSize; candy++){
            var candyList = {};
            candyList.append(candy);
        }
    }
}

}


