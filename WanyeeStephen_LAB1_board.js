/**
* Representation of the candyboard: a square array of squares
*/
class Board{
    
    /**
    * Constructor for Board
    * @param {Number} size 
    */
    constructor(size){
        //Board size is immutable
        Object.defineProperty(this,"boardSize",{
            value: size,
            writable: false
        });

        //To keep track of the Candy IDs
        this.candyCount = 0;

        //To keep track of game score
        this.score = 0;

        /**
        * A 2D array that represents the board
        * Array size is the board size
        * square[row][column] is a position on the board
        */
        this.square = new Array(this.boardSize);

        //Create an empty board
        for (let i = 0; i < this.square.length; i++) {
            this.square[i] = new Array(this.boardSize);            
        }     
    }

    //Methods

    /**
    *Returns a boolean indication of whether the row and column identify a valid square on the board.
    *@param {Number} row
    *@param {Number} col
    *@returns {Boolean} valid square or not
    */
    isValidLocation(row, col) {
        return (row >= 0 && col >= 0 &&
            row <= this.boardSize && col <= this.boardSize &&
            Number.isInteger(row) && Number.isInteger(col));  
    }

    /** 
    * @param {Number} row
    * @param {Number} col
    * @returns {Boolean} true if location is empty false if occupied with candy
    */
    isEmptyLocation(row, col) {
        if(this.getCandyAt(row,col)){
            return false;
        }else{
            return true;
        }
    }

    /**
    * @returns {Number} number of squares on each side
    */
   getBoardSize(){
       return this.boardSize;
   }

    /**
    * @param {Number} row
    * @param {Number} col
    * @returns {Boolean} candy on square or null if empty
    */
    getCandyAt(row, col) {
        if (this.isValidLocation(row, col)) {
            return this.square[row][col];
        }
    } 
    
    /**
     * @param {Candy} candy
     * @returns {Object} position of candy (row,column) | null if not found
     */
    getLocationOf(candy){
        return {row:candy.row,col:candy.col};
    }

    /**
     * @returns {Array} List of all candies on the board, no order
     */
   getAllCandies(){
       var allCandies = [];
        for (var currRow in this.square) {
            for (var currCol in this.square[currRow]) {
                if (this.square[currRow][currCol]){
                    allCandies.push(this.square[currRow][currCol]);
                }
            }
        }
        return allCandies;
   }

/*
*The board broadcasts four event types: add, remove, move, scoreUpdate
*
*/

    /**
    * Add new candy to the board. Requires candy added to not be on the board
    * and (row,col) must be a valid empty square.
    * The optional spawnRow and spawnCol indicate where the candy was "spawned"
    * the moment before it moved to row,col. This location which may be off the board, is added to the "add"
    * event and can be used to animate new candies that are coming in from  offBoard.
    * Dispatches a new "add" event with details containing the candy, fromRow, fromCol, toRow and toCol
    * 
    *  
    * @param {Candy} candy 
    * @param {Number} row index
    * @param {Number} col index
    * @param {Number} spawnRow index
    * @param {Number} spawnCol index
    * 
    */
   add(candy,row,col,spawnRow,spawnCol){
        if(this.isEmptyLocation(row,col)){
            //create a detail object to be passed to the event
            var details = {
                candy: candy,
                toRow: row,
                toCol: col,
                fromRow: spawnRow,
                fromCol: spawnCol
            };
            //assign the candy its position
            candy.row = row;
            candy.col = col;

            //indicate it on the board
            this.square[row][col] = candy;
        }

        var add = new CustomEvent("add",{detail:details});
        document.dispatchEvent(add);
   }   

   /**
    * Candy must be already on the board
    * (toRow,toCol) must be a valid Empty square
    * Moves the candy to (toRow,toCol) position
    * Dispatches a new  "move" event with
    * details on the candy, toRow, fromRow, toCol, fromCol.
    * @param {Candy} candy
    * @param {Number} toRow
    * @param {Number} toCol
    */
   moveTo(candy,toRow,toCol){
       if (this.isEmptyLocation(toRow, toCol)) {
           var details = {
               candy: candy,
               toRow: toRow,
               toCol: toCol,
               fromRow: candy.row,
               fromCol: candy.col
           };

           delete this.square[candy.row][candy.col];
           this.square[toRow][toCol] = candy;

           candy.row = toRow;
           candy.col = toCol;

           var move = new CustomEvent("move", { detail: details });
           document.dispatchEvent(move);
       }
   }

    /**
     * Removes candy from the board, requires candy to be present
     * Dispatches a new
     * "remove" event with details on the candy, fromRow, fromCol.
     * @param {Candy} candy 
     */
    remove(candy) {
        var details = {
            candy: candy,
            fromRow: candy.row,
            fromCol: candy.col
        };

        delete this.square[candy.row][candy.col];
        candy.row = null;
        candy.col = null;

        var remove = new CustomEvent("remove", { detail: details });
        document.dispatchEvent(remove);
    }

    /**
    * Reomves candy at given location from this board.
    * Requires that candy be found on this board.
    * @param {Number} row
    * @param {Number} col
     */
    removeAt(row, col) {
        if(!this.isEmptyLocation(row,col)){
            this.remove(this.square[row][col]);
        }else{
            console.log("Empty square");
            
        }
    }

    /**
    * Remove all candies from board. 
    */
    clear() {
        for (var currRow in this.square) {
            for (var currCol in this.square[currRow]) {
                if (this.square[currRow][currCol]) {
                    this.removeAt(currRow,currCol);
                }
            }
        }
    }

    /**
    * Adds a candy of specified color to row, col.
    * @param {String} color
    * @param {Number} row
    * @param {Number} col
    * @param {Number} spawnRow
    * @param {Number} spawncol
    * 
    */
    addCandy(color, row, col, spawnRow, spawnCol) {
        var candy = new Candy(color,this.candyCount++);
        this.add(candy,row,col,spawnRow,spawnCol);
    }

    /**
    * Adds a candy of randowm color at row, col
    * @param {Number} row
    * @param {Number} col
    * @param {Number} spawnRow
    * @param {Number} spawnCol
    */
    addRandomCandy(row, col, spawnRow, spawnCol) {
        var myRandom = Math.floor(Math.random()* Candy.colors.length);
        var randomColor = Candy.colors[myRandom];
        var candy = new Candy(randomColor,this.candyCount++);
        this.add(candy, row, col, spawnRow, spawnCol);
    }

    /**
    * Returns the candy immediately in the direction 
    * specified ['up', 'down', 'left','right'] from the candy 
    * passed as fromCandy
    * @param {Candy} fromCandy
    * @param {String} direction
    */
    getCandyInDirection(fromCandy, direction) {
        switch (direction) {
            case "up": {
                return this.getCandyAt(fromCandy.row - 1, fromCandy.col);
            }
            case "down": {
                return this.getCandyAt(fromCandy.row + 1, fromCandy.col);
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
    * @param {Candy} candy1
    * @param {Candy} candy2
    */
    flipCandies(candy1, candy2) {
        var details1 = {
            candy: candy1,
            toRow: candy2.row,
            toCol: candy2.col,
            fromRow: candy1.row,
            fromCol: candy1.col
        };
        var details2 = {
            candy: candy2,
            toRow: candy1.row,
            toCol: candy1.col,
            fromRow: candy2.row,
            fromCol: candy2.col
        };
        candy1.row = details1.toRow;
        candy1.col = details1.toCol;
        this.square[details1.toRow][details1.toCol] = candy1;
        candy2.row = details2.toRow;
        candy2.col = details2.toCol;
        this.square[details2.toRow][details2.toCol] = candy2;
        
        //Fire two move events
        var move1 = new CustomEvent("move", { detail: details1 });
        document.dispatchEvent(move1);

        var move2 = new CustomEvent("move", { detail: details2 });
        document.dispatchEvent(move2);
    }

    /**
    * Resets the score.
    * Dispatches a new scoreUpdateEvent with details on the score.
    */
    resetScore() {
        this.score = 0;
        var details = {
            score: this.score
        };
        var scoreUpdate = new CustomEvent("scoreUpdate",{detail: details});
        document.dispatchEvent(scoreUpdate);        
    }

    /**
    * Adds some score
    * Dispatches a new "scoreUpdate" event with details on score, candy, row and col.
    * @param {Candy} candy
    * @param {Number} row
    * @param {Number} col
    */
    incrememtScore(candy, row, col) {
        this.score += 1;
        var details = {
            score: this.score,
            candy: candy,
            row: row,
            col:col
        };
        
        var scoreUpdate = new CustomEvent("scoreUpdate", { detail: details });
        document.dispatchEvent(scoreUpdate);
    }


    /**
    * Returns current score
    * @returns {Number} score
    */
    getScore() {
        return this.score;
    }


    /**
    * Returns a string representation of the board
    *  c represents candy and ~ represents empty square
    * @returns {String} representation of the board
    */
    toString() {
        var representation = "";

        var size = this.boardSize;
        for(let row = 0; row < size; ++row ){
            for(let col = 0; col < size; ++col){
                var candy = this.square[row][col];
                if(candy){
                    representation += "c ";
                }else{
                    representation += "~ ";
                }
            }
            representation += "\n";
        }
               
        return representation;
    }    
}