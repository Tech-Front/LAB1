
// The Candy
class Candy {
    constructor(color, uniqueId) {
        Object.defineProperty(this, 'color', { value: color, writable: false });
        Object.defineProperty(this, 'id', { value: uniqueId, writable: false });

        this.row    = null;
        this.column = null;
    }
    setRow(value) {
        this.row = value;
    }
    getRow() {
        return this.toString();
    }
    setColumn(value) {
        this.column = value;
    }
    getColumn() {
        return this.toString();
    }
}

// Candy colors

// The Board
class Board {
    constructor(size) {
        this.size = size;
        this.score = 0;

        let row   = [];
        while (row.push(null) < size);

        this.candyBoard = [];
        while (this.candyBoard.push(row) < size);

        this.candyField = ["red", "yellow", "green", "blue", "orange", "purple"];

        this.createEvent = function(name, details) {
            return new CustomEvent(name, { detail: details });
        }
    }

    print() {
        let _board = this.candyBoard;

        for (const row in _board) {
            console.log(_board[row]);
            console.log();
        }
    }

    isValidLocation(row, col) {
        if (Number.isInteger(row) && Number.isInteger(col)) {
            return (row >= 0 && row < this.size) && (col >= 0 && col < this.size)
        }
    }

    isEmptyLocation(row, col) {
        if (this.isValidLocation(row, col)) {
            return this.candyBoard[row][col] == null;
        }
        return false;
    }

    getBoardSize() {
        return this.size;
    }

    getCandyAt(row, col) {
        if (this.isValidLocation(row, col)) {
            return this.candyBoard[row][col];
        }
        return null;
    }

    getLocationOf(candy) {
        let _board = this.candyBoard;

        let row = candy.row;
        let col = candy.col;

        if (Number.isInteger(row) && Number.isInteger(col)){
            if (_board[row][col] === candy) {
                return [row, col];
            }
        }
        return null;
    }

    getAllCandies(){
        let _board  = this.candyBoard;
        let candies = [];

        for (const row in _board) {
            for (const col in row) {
                let item = _board[row][col];
                if (item !== null) {
                    candies.push(item);
                }
            }
        }
        return candies;
    }

    add(candy, row, col, spawnRow=null, spawnCol=null) {
        let _board = this.candyBoard;

        spawnRow = spawnRow ? spawnRow : -1;
        spawnCol = spawnCol ? spawnCol : col;

        if (this.isValidLocation(row, col) && this.isEmptyLocation(row, col) && !this.getLocationOf(candy)) {
            _board[row][col] = candy;

            candy.setRow(row);
            candy.setColumn(col);

            // let _add  = new CustomEvent('add', {
            //     detail: {
            //         candy,
            //         fromRow: spawnRow,
            //         fromCol: spawnCol,
            //         toRow: row,
            //         toCol: col
            //     }
            // });
            // this.dispatchEvent(_add);
        }
    }

    move(candy, toRow, toCol) {

        if (this.getLocationOf(candy) && this.isValidLocation(toRow, toCol) && this.isEmptyLocation(toRow, toCol)) {

            this.add(candy, toRow, toCol, candy.row, candy.col);

            let move = this.createEvent('move', {
                candy,
                fromRow: candy.row,
                fromCol: candy.column,
                toRow,
                toCol
            });

            this.dispatchEvent(move);
        }
    }

    remove(candy) {
        let _board = this.candyBoard;
        let _location = this.getLocationOf(candy);

        if (_location) {
            _board[_location[0]][_location[1]] = null;

            let remove = this.createEvent('remove', {
                candy,
                fromRow: candy.row,
                fromCol: candy.column
            });

            this.dispatchEvent(remove);
        }
    }

    removeAt(row, col) {
        let _board = this.candyBoard;

        if (!this.isEmptyLocation(row, col)) {
            _board[_location[0]][_location[1]] = null;
        }
    }

    clear(){
        let _board = this.candyBoard;

        for (const row in _board) {
            for (const col in row) {
                _board[row][col] = null;
            }
        }
    }

    addCandy(color, row, col, spawnRow, spawnCol) {
        let candy = new Candy(color, 1); // Generate unique id

        if (this.isValidLocation(row, col)) {
            this.add(candy, row, col, spawnRow, spawnCol);
        }
    }

    addRandomCandy(row, col, spawnRow, spawnCol) {
        let randomColor = this.candyField[Math.floor(Math.random() * Math.floor(this.candyField.length))];
        let candy = new Candy(randomColor, 1); // Generate unique id

        if (this.isValidLocation(row, col)) {
            this.add(candy, row, col, spawnRow, spawnCol);
        }
    }

    getCandyInDirection(fromCandy, direction) {
        let position = [];
        let row = fromCandy.row;
        let col = fromCandy.column;

        console.log(row, col)

        if (this.isValidLocation(row, col)) {
            switch(direction) {
                case 'up':
                    position = [ row - 1, col ];
                    break;
                case 'down':
                    position = [ row + 1, col ];
                    break;
                case 'left':
                    position = [ row, col - 1 ];
                    break;
                case 'right':
                    position = [ row, col + 1 ];
                    break;
            }
            console.log(position)
            if (this.isValidLocation(position[0], position[1])) {
                return this.getCandyAt(position[0], position[1]);
            }
        }
        return null;
    }

    flipCandies(candy1, candy2) {
        let candyCopy = candy1; // Mutability of object shallow copy?

        let move1 = this.createEvent('move', {
            candy1,
            fromRow: candy1.row,
            fromCol: candy1.column,
            toRow:   candy2.row,
            toCol:   candy2.column
        });

        let move2 = this.createEvent('move', {
            candy2,
            fromRow: candy2.row,
            fromCol: candy2.col,
            toRow:   candyCopy.row,
            toCol:   candyCopy.column
        });

        this.dispatchEvent(move1);
        this.dispatchEvent(move2);
    }

    resetScore() {
        this.score = 0;

        let event = this.createEvent('scoreUpdate', {
            score: this.score
        });

        this.dispatchEvent(event);
    }

    incrementScore(candy, row, col) {
        this.score += 1;

        let event = this.createEvent('scoreUpdate', {
            score: this.score,
            candy,
            row,
            col
        });

        this.dispatchEvent(event);
    }

    getScore() {
        return this.score;
    }

    _toString() {
        return this.toString();
    }
}
