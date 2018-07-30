const { Grid, Cell } = require("./grid");
const { CustomEvent } = require("./utils");

class Candy {
    constructor(id, color) {
        Object.defineProperty(this, 'id', {
            value: id,
            writable: false,
        });
        Object.defineProperty(this, 'color', {
            value: color,
            writable: false,
        });
        this.row = null;
        this.column = null;
    }

    set position(cell) {
        this.row = cell.row;
        this.column = cell.column;
    }

    get position() {
        return new Cell(this.row, this.column);
    }

    setPosition(row, column) {
        this.position = new Cell(row, column);
    }

    getPosition() {
        return this.position;
    }

    toString() {
        return `${this.color} candy`;
    }

    get fullInfo() {
        return `#${this.id} ${this.color} candy at ${this.position.toString()}`;
    }

    get clone() {
        const candyClone = new Candy(this.id, this.color);
        candyClone.position = this.position;
        return candyClone;
    }
}

class Board extends Grid {
    constructor(size) {
        super(size, size);
        this.candies = 0;
        this.colors = ["red", "yellow", "green", "orange", "blue", "purple"];
        this.score = 0;
    }

    isValidLocation(row, col) {
        return super.isValidCell(new Cell(row, col));
    }

    isEmptyLocation(row, cell) {
        return super.isEmptyCell(new Cell(row, col));
    }

    get valid_colors() {
        return this.colors;
    }

    get valid_directions() {
        return ['up', 'down', 'left', 'right'];
    }

    get boardSize() {
        return this.rows;
    }

    getBoardSize() {
        return this.boardSize;
    }

    getCandyAt(row, col) {
        return super.getCell(new Cell(row, col));
    }

    getLocationOf(candy) {
        const location = super.find((candy_on_board) => { return candy_on_board ? candy_on_board.id === candy.id : null; })
        const onBoard = (cell) => { return cell.row > -1 && cell.column > -1; };

        return onBoard(location) ? location : null;
    }

    getAllCandies() {
        return this.slots;
    }

    isEmptyAndValid(cell) {
        return super.isValidCell(cell) && super.isEmptyCell(cell);
    }

    updateAddCandy(candy, cell) {
        candy.position = cell;
        super.fillCell(cell, candy);
    }

    add(candy, row, col, spawnRow = null, spawnCol = null) {
        const location = new Cell(row, col);
        const valid = this.isEmptyAndValid(location) && !this.getLocationOf(candy);
        if (valid) {
            this.updateAddCandy(candy, location);
            const event = new CustomEvent('add', {
                detail: {
                    candy: candy,
                    row: row,
                    col: col,
                    spawnRow: spawnRow,
                    spawnCol: spawnCol
                }
            });

            CustomEvent.dispatchEvent(event);
        }
    }

    moveTo(candy, toRow, toCol) {
        const origin = candy.position;
        const destination = new Cell(toRow, toCol);
        const valid = !!this.getLocationOf(candy) && this.isEmptyAndValid(destination);
        if (valid) {
            this.updateAddCandy(candy, destination);
            const event = new CustomEvent('move', {
                detail: {
                    candy: candy,
                    toRow: candy.position.row,
                    fromRow: origin.row,
                    toCol: candy.position.column,
                    fromCol: origin.column
                }
            });

            CustomEvent.dispatchEvent(event);
        } else {
            console.error(!!this.getLocationOf(candy), this.isEmptyAndValid(destination));
            throw Error(`invalid move operation`);
        }
    }

    remove(candy) {
        const valid = !!this.getLocationOf(candy);
        if (valid) {
            super.fillCell(candy.position, null);
            const event = new CustomEvent('remove', {
                detail: {
                    candy: candy,
                    fromRow: candy.row,
                    fromCol: candy.column
                }
            });

            CustomEvent.dispatchEvent(event);
        }
    }

    removeAt(row, col) {
        const location = new Cell(row, col);
        const valid = super.isValidCell(location);
        if (valid) {
            const candy = super.getCell(location);
            super.fillCell(candy.position, null);
            const event = new CustomEvent('remove', {
                detail: {
                    candy: candy,
                    fromRow: candy.row,
                    fromCol: candy.column
                }
            });

            CustomEvent.dispatchEvent(event);
        }

    }

    clear() {
        this.slots = new Array(this.size * this.size).fill(null);
    }

    addCandy(color, row, col, spawnRow = null, spawnCol = null) {
        this.add(new Candy(this.candies, color), row, col, spawnRow, spawnRow);
        this.candies++;
    }

    addRandomCandy(row, col, spawnRow, spawnCol) {
        const pickRandom = (arr) => { return arr[Math.floor(Math.random() * arr.length)]; };
        this.addCandy(pickRandom(this.colors), row, col, spawnRow, spawnCol);
    }

    addRandomCandyCell(cell) {
        this.addRandomCandy(cell.row, cell.column);
    }

    getCandyInDirection(fromCandy, direction) {
        switch (direction) {
            case 'up':
                return this.getCandyAt(fromCandy.position.row - 1, fromCandy.position.column);
            case 'down':
                return this.getCandyAt(fromCandy.position.row + 1, fromCandy.position.column);
            case 'left':
                return this.getCandyAt(fromCandy.position.row, fromCandy.position.column - 1);
            case 'right':
                return this.getCandyAt(fromCandy.position.row, fromCandy.position.column + 1);
            default:
                throw Error(`Expected up, down, left, right; got ${direction}`);
        }
    }

    moveToCell(candy, cell) {
        this.moveTo(candy, cell.row, cell.column);
    }

    flipCandies(candy1, candy2) {
        const [pos1initial, pos2initial] = [candy1.position, candy2.position];
        this.moveToCell(candy1, pos2initial);
        this.moveToCell(candy2, pos1initial);
    }

    get current_score() {
        return this.score;
    }

    set current_score(new_score) {
        this.score = new_score;
    }

    resetScore() {
        const event = new CustomEvent('scoreUpdate', {
            detail: {
                prev_score: this.current_score,
                new_score: 0
            }
        });
        this.current_score = 0;
        CustomEvent.dispatchEvent(event);

    }

    incrementScore(candy, row, col) {
        const INC = 0;
        const event = new CustomEvent('scoreUpdate', {
            detail: {
                prev_score: this.current_score,
                new_score: this.current_score + INC,
                candy: candy,
                row: row,
                col: col
            }
        });
        this.current_score = this.current_score + INC;
        CustomEvent.dispatchEvent(event);

    }

    getScore() {
        return this.current_score;
    }

    toString() {
        return this.grid;
    }
}

module.exports = { Candy: Candy, Board: Board };