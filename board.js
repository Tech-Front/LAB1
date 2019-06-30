/**
 *The Class defining the board and all its properties
 *
 * @export
 * @class Board
 */
class Board {
    constructor(sides) {
        this.sides = sides;
        this.cells = Array(sides).fill(Array(sides).fill());
    }
    isValidLocation(row, col) {
        if (row > this.sides - 1 || col > this.sides - 1) {
            return false;
        } else {
            return true;
        }
    }
    isEmptyLocation(row, col) {
        if (this.isValidLocation(row, col)) {
            if (this.cells[row][col] === undefined) {
                return true;
            }
        } else {
            return false;
        }
    }
    getBoardSize() {
        return this.sides;
    }
    getCandyAt(row, col) {
        if (isEmptyLocation(row, col) === true) {
            return null;
        } else {
            return this.cells[row][col];
        }
    }
    getAllCandies() {
            let allCandies = Array();
            this.cells.forEach(row => {
                row.forEach(cell => {
                    allCandies.push(cell);
                });
            });
            console.log(allCandies);
            return allCandies;
        }
        /**
         *
         *
         * @param {*} candy
         * @param {*} row
         * @param {*} col
         * @param {*} spawnRow
         * @param {*} spawnCol
         * @returns
         * @memberof Board
         */
    add(candy, row, col, spawnRow, spawnCol) {
        if (this.isEmptyLocation(spawnRow, spawnCol)) {
            candy.row = row;
            candy.column = col;
            this.cells[spawnRow][spawnCol] = candy;
            return true;
        } else {
            return false;
        }
    }

    /**
     * moves a candy from it's square to another square. Requires that this candy be found on this board and
     *  (toRow, toCol) must denote a valid empty spot on the board. Dispatches a new  "move" event with 
     * details on the candy, toRow, fromRow, toCol, fromCol. */
    moveTo(candy, toRow, toCol) {
        //Your code here
    }

    /**
     * Removes a candy from this board. Requires that candy be found on this board. Dispatches a new 
     * "remove" event with details on the candy, fromRow, fromCol.
     */
    remove(candy) {
        //Your code here 
    }



    /**
     * Reomoves candy at given location from this board. Requires that candy be found on this board. */
    removeAt(row, col) {
        //Your code here
    }



    /**
     * Remove all candies from board. 
     */
    clear() {
        //Your code here 
    }



    /**
     * Adds a candy of specified color to row, col.
     */
    addCandy(color, row, col, spawnRow, spawnCol) {
        //Your code here
    }




    /**
     * Adds a candy of randowm color at row, col
     */
    addRandomCandy(row, col, spawnRow, spawnCol) {
        //Your code here
    }



    /**
    * Returns the candy immediately in the direction specified ['up', 'down', 'left', 
    'right'] from the candy passed as fromCandy
    */
    getCandyInDirection(fromCcandy, direction) {
        //Your code here
    }


    /**
     * Flips candies passed, firing two move events. Does not verify the validity of the 
     * flip and does not crush candies lined up after flip. With the events fired, details
     * on the candy, toRow, fromRow, toCol and fromCol are also dispatched
     */
    flipCandies(candy1, candy2) {
        //Your code here 
    }



    /**
     * Resets the score. dispatches a new scoreUpdateEvent with details on the score.
     */
    resetScore() {
        //Your code here 
    }


    /*
     * Adds some score
     * Dispatches a new "scoreUpdate" event with details on score, candy, row and col.
     */
    incrememtScore(candy, row, col) {
        //Your code here 
    }


    /*
     * Returns current score
     */
    getScore() {
        //Your code here 
    }


    /**
     * Returns a string representation of the board
     */
    toString() {
        //Your code here 
    }

}
//module.exports = Board;