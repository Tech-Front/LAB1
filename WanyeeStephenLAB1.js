// -----------------THE CANDY CLASS-------------
/**
 * Representation of a candy on board(which are mutable)
 */
class Candy {
    /**
     * 
     * @param {String} color of candy
     * @param {String} uniqueID representing candy
     */
    constructor(color, uniqueID) {
        //Immutable fields
        Object.defineProperty(this, "color", {
            value: color,
            writable: false
        });
        Object.defineProperty(this, "uniqueID", {
            value: uniqueID,
            writable: false
        });

        //Other fields
        this.row = null;
        this.col = null;
    }

    //Getter and setter methods for the row and column properties
    get row() {
        return this._row;
    }

    set row(value) {
        this._row = value;
    }

    get col() {
        return this._col;
    }

    set col(value) {
        this._col = value;
    }

    /**
     * @returns String representation of the Candy
     */
    toString() {
        return ("UniqueID: " + this.uniqueID + " Color: " + this.color +
            "\nPosition-> row: " + this.row + " column: " + this.col);
    }
}
/**
 * A list of colors that a candy can be
 */
Candy.colors = [
    'red',
    'yellow',
    'green',
    'orange',
    'blue',
    'purple'
];


//-----------------------THE BOARD CLASS-----------------------------
/**
* Representation of the candyboard: a square array of squares
*/
class Board {

    /**
    * Constructor for Board
    * @param {Number} size 
    */
    constructor(size) {
        //Board size is immutable
        Object.defineProperty(this, "boardSize", {
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
    *@returns {Boolean} valid square or not
    */
    isValidLocation(row, col) {
        return (row >= 0 && col >= 0 &&
            row <= this.boardSize && col <= this.boardSize &&
            Number.isInteger(row) && Number.isInteger(col));
    }

    /** 
    *@returns {Boolean} true if location is empty false if occupied with candy
    */
    isEmptyLocation(row, col) {
        if (this.getCandyAt(row, col)) {
            return false;
        } else {
            return true;
        }
    }

    /**
    * @returns {Number} number of squares on each side
    */
    getBoardSize() {
        return this.boardSize;
    }

    /**
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
    getLocationOf(candy) {
        return { row: candy.row, col: candy.col };
    }

    /**
     * @returns {Array} List of all candies on the board, no order
     */
    getAllCandies() {
        var allCandies = [];
        for (var currRow in this.square) {
            for (var currCol in this.square[currRow]) {
                if (this.square[currRow][currCol]) {
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
    * Fromcol and Tocol are optional (they can beused to animate the candy)
    * Requires a candy to be off the board, (toRow,FromCol) must be a
    * valid empty space.
    * 
    * @param {Candy} candy 
    * @param {Number} toRow index
    * @param {Number} toCol index
    * @param {Number} fromRow index
    * @param {Number} fromCol index
    * 
    */
    add(candy, toRow, toCol, fromRow, fromCol) {
        if (this.isEmptyLocation(toRow, toCol)) {
            //create a detail object to be passed to the event
            var details = {
                candy: candy,
                toRow: toRow,
                toCol: toCol,
                fromRow: fromRow,
                fromCol: fromCol
            };
            //assign the candy its position
            candy.row = toRow;
            candy.col = toCol;

            //indicate it on the board
            this.square[toRow][toCol] = candy;
        }

        var add = new CustomEvent("add", { detail: details });
        document.dispatchEvent(add);
    }

    /**
     * Removes candy from the board, requires candy to be present
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
     * Candy must be already on the board
     * (toRow,toCol) must be a valid Empty square
     * Moves the candy to (toRow,toCol) position
     * @param {Candy} candy
     * @param {Number} toRow
     * @param {Number} toCol
     */
    move(candy, toRow, toCol) {
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
    *  Updates the score
    */
    scoreUpdate() {
        var details = {
            score: this.score
        };
        var scoreUpdate = new CustomEvent("scoreUpdate", { detail: details });
        document.dispatchEvent(scoreUpdate);
    }
}