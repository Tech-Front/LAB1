class Cell {
    constructor(row_num, col_num) {
        this.row_num = row_num;
        this.col_num = col_num;
    }

    get row() {
        return this.row_num;
    }

    get column() {
        return this.col_num;
    }

    toString() {
        return `Cell{row: ${this.row}, column: ${this.column}}`;
    }

    toArray() {
        return [this.row, this.column];
    }
}
class Grid {
    constructor(num_rows, num_columns, val = null) {
        Grid.validateRowCol(num_rows, num_columns);
        this.rows = num_rows;
        this.columns = num_columns;
        this.slots = new Array(num_rows * num_columns).fill(val);
    }

    static flatIndex(num_columns, cell) {
        return (cell.row * num_columns) + cell.column;
    }

    static matrixIndex(num_columns, index) {
        return new Cell(Math.floor(index / num_columns), index % num_columns);
    }

    isValidCell(cell) {
        return Grid.flatIndex(this.columns, cell) >= 0 && Grid.flatIndex(this.columns, cell) < this.size;
    }

    isEmptyCell(cell) {
        return this.getCell(cell) == null;
    }

    static validate(isValid, msg, callback = () => { return true; }, args = [], thisArg = this) {
        if (isValid) {
            return callback.call(thisArg, ...args, true);
        } else {
            const err = new Error(msg);
            throw err;
        }
    }

    static validateRowCol(num_rows, num_columns) {
        const isValid = num_rows > 0 && num_columns > 0 && Number.isInteger(num_rows) && Number.isInteger(num_columns);
        const error_msg = `Cannot initialize ${num_rows} by ${num_columns} Grid`;

        return Grid.validate(isValid, error_msg);
    }

    validateCell(cell, callback, args = []) {
        const isValid = this.isValidCell(cell);
        const error_msg = `${cell.toString()} isn't valid cell in ${this.dimension} Grid`;
        const argv = [cell, ...args];

        return Grid.validate(isValid, error_msg, callback, argv, this);
    }

    validateIndex(index, max, callback, args = [], min = 0) {
        const isValid = index < max && index >= min;
        const error_msg = `Out of Index Error: ${index} not in range[${min}, ${max})`;
        const argv = [index, ...args];

        return Grid.validate(isValid, error_msg, callback, argv, this);
    }

    find(rule) {
        return Grid.matrixIndex(this.columns, this.slots.findIndex(rule));
    }

    getCell(cell, validated = false) {
        return validated ?
            this.slots[Grid.flatIndex(this.columns, cell)] :
            this.validateCell(cell, this.getCell);
    }

    fillCell(cell, obj, validated = false) {
        return validated ?
            (this.slots[Grid.flatIndex(this.columns, cell)] = obj) && this.getCell(cell) :
            this.validateCell(cell, this.fillCell, [obj]);
    }


    getRow(row_num, validated = false) {
        return validated ?
            [...this.slots.slice(row_num * this.columns, row_num * this.columns + this.columns)] :
            this.validateIndex(row_num, this.rows, this.getRow);
    }

    getColumn(col_num, validated = false) {
        return validated ?
            this.slots.filter((_, ind) => { return ind % this.columns === col_num; }) :
            this.validateIndex(col_num, this.columns, this.getColumn);
    }

    getMany(fn, num) {
        return [...new Array(num).fill('*')].map((_, ind) => { return fn.call(this, ind); });
    }

    get allRows() {
        return this.getMany(this.getRow, this.rows);
    }

    get allColumns() {
        return this.getMany(this.getColumn, this.columns);
    }

    get dimension() {
        return `${this.rows} by ${this.columns}`;
    }

    get size() {
        return this.rows * this.columns;
    }

    get grid() {
        return this.allRows.map(row => { return `${row}\n`; }).toString();
    }

    get pretty_grid() {
        const cell_width = this.slots.reduce((a, b) => { return Math.max(a.toString().length, b.toString().length); }) + 5;
        let pretty_grid = '';

        const horizontal_border = '*'.repeat((cell_width + 2) * this.columns + 2);
        const row_separator = '-'.repeat(horizontal_border.length);
        const vertical_border = '|';
        const newl = '\n';
        const padding = ' ';

        const centre = (str) => {
            const ws = (cell_width - str.length);
            const [left, right] = [Math.ceil(ws / 2), Math.floor(ws / 2)];
            return padding.repeat(left) + str + padding.repeat(right);
        };

        const addBoarder = (str) => { return vertical_border + str + vertical_border; };

        pretty_grid += horizontal_border + newl;

        this.allRows.forEach((row, ind, arr) => {
            pretty_grid += vertical_border;

            row.forEach(val => {
                pretty_grid += addBoarder(centre(val.toString()));
            });

            pretty_grid += vertical_border + newl;

            if (ind < arr.length - 1) {
                pretty_grid += row_separator + newl;
            }
        }
        );

        pretty_grid += horizontal_border + newl;
        return pretty_grid;
    }

    toString() {
        return `${this.dimension} Grid`;
    }
}

class CustomEvent {
    constructor(name, detail) {
        this.name = name;
        this.details = detail.detail;
    }

    static dispatchEvent(e) {
        console.log(`${e.name} event dispatched ${e.details}`);
    }
}

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
