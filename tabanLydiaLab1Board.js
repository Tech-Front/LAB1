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
    add(candy, row, col, spawnRow, spawnCol){
        var btn = document.querySelector('add');
        btn.onClick = function(){
        for (!col === candy; col < spawnRow; candy++){
            for (!row === candy; col < spawnCol; candy++){
                Square.extend();
                var newCandy = Candy();
            }
        }
        }
    }
    /*Removes a candy from this board. Requires that candy be found on this board. Dispatches a new  "remove" event with details on the candy*/
    remove(candy){
        var btn = document.querySelector('remove');
        if (btn.onClick('remove')){
            delete this.candy();
        }
    }

    
/*Removes candy at given location from this board. Requires that candy be found on this board. */
    removeAt(row, col, candy) {
    var btn = document.querySelector('removeAt');
    if (btn.onClick('removeAt')){
        if (candy in candyList){
            candy.remove();
            }
        else{
            alert('The candy doesnt exist!');
            }
        }
    }


    moveTo(candy, toRow, toCol){
        var btn = document.querySelector('move');
        btn.onClick(candy) = function(){
            if (!candy.colNumber === toCol && !candy.rowNumber === toRow){
                alert("Already where you wanna go");
            }
            else{
                candy.colNumber = toCol;
                candy.rowNumber = toRow;

            }

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
            for (candy === 0; candy < candy.getBoardSize; candy++){
                var candyList = [];
                candyList.append(candy);
            }
        }
    }


/*Remove all candies from board */
    clear(candy) {
        for(candylist.includes(candy); candy < candyList.length; candy++){
            candy.remove();
        }
    }

/* Adds a candy of randowm color at row, col*/
    addRandomCandy(row, col, spawnRow, spawnCol) {
    var randCandy = function(candy){
        if(!candy.spawnRow === row){
            var randColor = Math.floor(Math.random()*candyColors.length);
            return candy.setAttribute('src', candyColor[randColor]);
            return candy [spawnRow], [spawnCol];
        }
        else{
            return null;
        }
    }
}

/*Resets the score. dispatches a new scoreUpdateEvent with details on the score.*/
    resetScore() {
    var resetScore = new Event('reset');
    Element.addEventListener('reset', function (clear){
        var myScore = document.URL.indexOf('');
        myScore = 0;

    }, false)

    Element.dispatchEvent(resetScore);
}

/* Adds some score Dispatches a new "scoreUpdate" event with details on score, candy, row and col.
*/
    incrememtScore(candy, row, col) {
    var incrementScore = new Event('incerement');
    Element.addEventListener('increment', function (increment){
        var myScore = document.URL.indexOf('');
        myScore = +myScore;
        return candy.setAttribute('row' [], 'col' []);

    }, false)
    Element.dispatchEvent(incrementScore);
}

/*Returns current score*/ 
    getScore() {
    scoreUpdate();
}

/*Returns a string representation of the board*/
    toString() {
        for(candylist.includes(candy); candy < candyList.length; candy++){
            console.log(Math.random());
        }
    }

}


