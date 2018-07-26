class Board {
    constructor(size) {
        Object.defineProperty(this.size, {
            writable: false,
            value: size
        });


        this.square = new Array(this.size);
        this.board = new Array();
        this.board.fill(this.square);
        this.score = 0;
        this.count = 0;
    }

    /**
     *Returns a boolean indication of whether the row and column identify a valid square on the board.
     */
    isValidLocation(row, col) {
        //Your code here
        if (row >= 0 || row <= this.size - 1 && col >= 0 || col <= this.size - 1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Returns a boolean indication of whether the board[row][column] is empty (Does not contain a candy.
     */
    isEmptyLocation(row, col) {
        //Your code here
        if (this.getCandyAt(row, col)) {
            return false;
        } else {
            return true;
        }
    }

    /**
     *Returns the number of squares on each side of the board
     */
    getBoardSize() {
        //Your code here
        return this.size;
    }

    /**
     * Get's the candy at [row, column] or null if the square is empty.
     */
    getCandyAt(row, col) {
        //Your code here
        if (!this.isEmptyLocation(row, col)) {
            return this.square[row][col];
        } else {
            return null;
        }
    }

    /**
     * Get the location of the candy (row, column) if it's on the board or null if it's not found.
     */
    getLocationOf(candy) {
        //Your code here
        if (this.isValidLocation(row, col)) {
            return `("row: "+${candy.row},"column: "+${candy.col} )`;
        } else {
            return null;
        }
    }

    /**
     * Get a list of all candies on the board, in no particular order
     */
    getAllCandies() {
        //Your code here
        for (var i = 0, len = this.square.length; ++1) {
            for (var j = 0, len2 = this.square[i].length; j < len2; j++) {

            }
        }
    }


    /**
     * Add a new candy to the board. Requires candy added to not be on the board an*d (row, col) must
     * be a valid empty square. The optional spawnRow and spawnCol indicate where the candy was "spawned"
     * the moment before it moved to row,col. This location which may be off the board, is added to the "add"
     * event and can be used to animate new candies that are coming in from  offBoard.
     * Dispaches a new "add" event with details containing the candy, fromRow, fromCol, toRow and toCol */
    add(candy, row, col, spawnRow, spawnCol) {
        //Your code here
        if(this.isEmptyLocation(row,col)){
            var candyDetails = { candy: candy,fromRow: spawnRow,fromCol: spawnCol, toRow:row, toCol:col};

        }

        let addEvent = new Event("add",{"details":candyDetails});
        document.dispatchEvent(addEvent);
    }

    /**
     * moves a candy from it's square to another square. Requires that this candy be found on this board and
     *  (toRow, toCol) must denote a valid empty spot on the board. Dispatches a new  "move" event with
     * details on the candy, toRow, fromRow, toCol, fromCol. */
    moveTo(candy, toRow, toCol) {
        //Your code here
        if(this.getLocationOf(candy) && this.isEmptyLocation(toRow,toCol)){
            var candyDetails = {candy:candy, toRow: row, toCol: col ,fromRow: candy.row, fromCol: candy.col}
        }
        let moveEvent = new Event("move", {"details": candyDetails});
        document.dispatchEvent(moveEvent);
    }

    /**
     * Removes a candy from this board. Requires that candy be found on this board. Dispatches a new
     * "remove" event with details on the candy, fromRow, fromCol.
     */
    remove(candy) {
        //Your code here
        if(this.getLocationOf(candy)){
            var candyDetails = {candy:candy,fromRow:candy.row,fromCol:candy.col}
        }
        let removeEvent = new Event("remove",{"details":candyDetails});
        document.dispatchEvent(removeEvent);
    }

    /**
     * Reomves candy at given location from this board. Requires that candy be found on this board. */
    removeAt(row, col) {
        //Your code here
        if(!this.isEmptyLocation(row,col)){
            this.board.pop(this.square);
        }
    }

    /**
     * Remove all candies from board.
     */
    clear() {
        //Your code here
        this.board.length = 0;
    }

    /**
     * Adds a candy of specified color to row, col.
     */
    addCandy(color, row, col, spawnRow, spawnCol) {
        //Your code here
        var candyColor = new Candy.colors(color);
        if(this.isEmptyLocation(row,col)){
            this.board.push(this.square(row,col,spawnCol,spawnRow,candyColor));
        }
    }

    /**
     * Adds a candy of randowm color at row, col
     */
    addRandomCandy(row, col, spawnRow, spawnCol) {
        //Your code here
        var candyColor =  new Candy.colors(Math.floor(Math.random()*Candy.colors.length))
        if(this.isEmptyLocation(row,col)){
            this.board.push(this.square(row,col,spawnCol,spawnRow,candyColor));
        }
    }

    /**
      * Returns the candy immediately in the direction specified ['up', 'down', 'left', 
      'right'] from the candy passed as fromCandy
      */
    getCandyInDirection(fromCandy, direction) {
        //Your code here
        switch (direction) {
            case "up": {
                return this.getCandyAt(fromCandy.row + 1, fromCandy.col);
            }
            case "down": {
                return this.getCandyAt(fromCandy.row - 1, fromCandy.col);
            }
            case "left": {
                return this.getCandyAt(fromCandy.row, fromCandy.col - 1);
            }
            case "right": {
                return this.getCandyAt(fromCandy.row, fromCandy.col + 1);
            }
        }
    }

    /**
     * Flips candies passed, firing two move events. Does not verify the validity of the
     * flip and does not crush candies lined up after flip. With the events fired, details
     * on the candy, toRow, fromRow, toCol and fromCol are also dispatched
     */
    flipCandies(candy1, candy2) {
        //Your code here

        var candy1Details = {candy:candy1,toRow:candy2.row,toCol:candy2.col,fromRow:candy1.row, fromCol:candy1.col};
        var candy2Details = {candy:candy2,toRow:candy1.row,toCol:candy1.col,fromRow:candy2.row, fromCol:candy2.col};
        
        candy1.row = candy1Details.toRow;
        cnady2.row = candy2Details.toRow;
        candy1.col = candy1Details.toCol;
        candy2.col = candy2Details.toCol;
        let flip1 = new Event("flip1",{"details":candy1Details});
        let flip2 = new Event("flip2",{"details":candy2Details});
        document.dispatchEvent(flip1);
        document.dispatchEvent(flip2);
    }

    /**
     * Resets the score. dispatches a new scoreUpdateEvent with details on the score.
     */
    resetScore() {
        //Your code here
        this.score = 0;
        var scoreDetails =this.score;
        let scoreUpdateEvent = new Event("scoreUpdateEvent",{"details":scoreDetails});
        document.dispatchEvent(scoreUpdateEvent);
    }

    /*
     * Adds some score
     * Dispatches a new "scoreUpdate" event with details on score, candy, row and col.
     */
    incrememtScore(candy, row, col) {
        //Your code here
        this.score += 1;

        var scoreDetails = {score:this.score,candy:candy,row:row,col:col};
        let scoreUpdate = new Event("scoreUpdate", {"details":scoreDetails});
        document.dispatchEvent(scoreUpdate);
    }

    /*
     * Returns current score
     */
    getScore() {
        //Your code here
        return this.score;
    }

    /**
     * Returns a string representation of the board
     */
    toString() {
        //Your code here
        return `("Board: "+${this.board})`;
    }
}