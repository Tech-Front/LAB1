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

class Candy {
    constructor(id, color) {
        this.id = id;
        this.color = color;
        this.row = null;
        this.column = null;
    }

    set position(cell) {
        this.row = cell.row;
        this.column = cell.column;
    }

    get position() {
        return new Cell(this.row,this.column);
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

class Grid {
    constructor(num_rows, num_columns, val = null) {
        this.rows = num_rows;
        this.columns = num_columns;
        this.slots = new Array(num_rows * num_columns).fill(val);
    }
    
    static flatIndex(num_columns, cell) {
        return cell.row * num_columns + cell.column;
    }

    static matrixIndex(num_columns, index) {
        return new Cell(Math.floor(index / num_columns) , index % num_columns);
    }

    isValidCell(cell) {
        return Grid.flatIndex(this.columns, cell) >= 0 && Grid.flatIndex(this.columns, cell) < this.size;
    }

    getCell(cell) {
        if (this.isValidCell(cell)) {
            return this.slots[Grid.flatIndex(this.columns, cell)];
        } else {
            const err = new Error(`${cell.toString()} isn't valid cell in ${this.toString()}`);
            throw err;
        }
    }

    isEmptyCell(cell) {
        return this.getCell(cell) == null;
    }

    fillCell(cell, obj) {
        if (this.isValidCell(cell)) {
            this.slots[Grid.flatIndex(this.columns, cell)] = obj;
            return this.getCell(cell);
        } else {
            const err = new Error(`${cell.toString()} isn't valid cell in ${this.toString()}`);
            throw err;
        }
    }

    find(rule) {
        return Grid.matrixIndex(this.columns, this.slots.findIndex(rule));
    }

    getRow(row_num) {
        if (row_num < this.rows) {
            return [...this.slots.slice(row_num * this.columns, row_num * this.columns + this.columns)];
        } else {
            const err = new Error(`Out of Index Error: ${row_num} not in range [0, ${this.rows})`);
            throw err;
        }
    }
    
    get allRows() {
        const allrows = new Array(this.rows).fill('*');
        allrows.forEach((_, ind, arr) => { arr[ind] = this.getRow(ind); });
        return allrows;
    }
    
    get grid() {
        let grid = '';
        this.allRows.forEach((_, ind) => { grid += `${this.getRow(ind)}\n`; })        
        return grid;
    }

    getColumn(col_num) {
        if (col_num < this.columns) {
            return this.slots.filter((_, ind) => { return ind % this.columns === col_num; });
        } else {
            const err = new Error(`Out of Index Error: ${col_num} not in range [0, ${this.columns})`);
            throw err;
        }
    }

    get pretty_grid() {
        const cell_width = this.slots.reduce((a, b) => { return Math.max(a.toString().length, b.toString().length); }) + 5;
        console.log(cell_width);
        let pretty_grid = '';
        
        const horizontal_border = '*'.repeat((cell_width + 2) * this.columns);
        // console.log(horizontal_border - 2);
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

        this.allRows.forEach((row, ind, arr) =>  {
            pretty_grid += vertical_border;

            row.forEach(val => {
                pretty_grid +=  addBoarder(centre(val.toString()));
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

    get size() {
        return this.rows * this.columns;
    }

    toString() {
        return `${this.rows} by ${this.columns} Grid`;
    }
}

// CustomEvent is a temporary class for testing code
class CustomEvent{
    constructor(name, detail) {
        this.name = name;
        this.details = detail.detail;
    }

    static dispatchEvent(e) {
        console.log(`${e.name} event dispatched ${e.details}`);
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

    add(candy, row, col, spawnRow=null, spawnCol=null) {
        const location = new Cell(row, col);
        const valid = this.isEmptyAndValid(location) && !this.getLocationOf(candy) ;
        if (valid) {
            this.updateAddCandy(candy, location);
            const event = new CustomEvent('add', {detail: {
                                        candy: candy, 
                                        row: row, 
                                        col: col, 
                                        spawnRow: spawnRow, 
                                        spawnCol: spawnCol }
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
        if (valid){
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
        this.slots = new Array(this.size*this.size).fill(null);
    }

    addCandy(color, row, col, spawnRow=null, spawnCol=null) {
        this.add(new Candy(this.candies, color) ,row, col, spawnRow, spawnRow);
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
        switch(direction) {
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
        const event = new CustomEvent('scoreUpdate', { detail: {
            prev_score: this.current_score,
            new_score: 0
        }});
        this.current_score = 0;
        CustomEvent.dispatchEvent(event);

    }

    incrementScore(candy, row, col) {
        const INC = 0;
        const event = new CustomEvent('scoreUpdate', { detail: {
            prev_score: this.current_score,
            new_score: this.current_score + INC,
            candy: candy,
            row: row,
            col: col
        }});
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

const pickRandom = (arr) => { return arr[Math.floor(Math.random()*arr.length)]; };

function testGrid(rows, cols) {
    const COLORS = ['red', 'green', 'blue', 'yellow'];
    const inGrid = (cell) => { return cell.row > -1 && cell.column > -1; };
    
    const g = new Grid(rows, cols);
    
    let count = 0;
    while (count < g.size) {
        
        let c = new Candy(count, pickRandom(COLORS));
        
        c.position = Grid.matrixIndex(g.columns, count);
        
        g.fillCell(c.position, c);
        !g.isEmptyCell(c.position) ? console.log(`Added ${c.fullInfo}`) : console.error(`Couldn't addToGrid ${c.fullInfo}`);
        
        count++;
    }
    
    console.log('\n', g.pretty_grid);

    [...COLORS, 'pink'].forEach(color => {
        let location = g.find(candy => { return candy.color == color; });
        if (inGrid(location)) {
            console.log(`Found ${g.getCell(location).fullInfo}`);
        } else {
            console.error(`Didn't find ${color} candy`);
        }
    });

}

function testBoard(size) {
    const b = new Board(size);
    const randomCell = (size) => { return [Math.floor(Math.random()*size), Math.floor(Math.random()*size)]; };
    const directions = ['up', 'down', 'left', 'right'];

    let count = 0;
    while (count < b.boardSize * b.boardSize) {
        b.addRandomCandyCell(Grid.matrixIndex(b.columns, count));
        count++;
    }

    let c = b.getCandyAt(...randomCell(b.boardSize));
    console.log(c.fullInfo);
    
    let d;
    let found = false;
    while (!found) {
        try {
            d = b.getCandyInDirection(c, pickRandom(directions));
            found = true;
        } catch (e) {
            // console.error(e);
            found = false;
        }
    }
    console.log(d.fullInfo);
    
    console.log(`\nFlipping b and c:`);
    console.log(b.toString());
    b.flipCandies(c, d);
    console.log(b.toString());

    console.log(`\nRemoving c:`);
    b.remove(c);
    console.log(b.toString());

    b.clear();
    console.log(b.getAllCandies());
}

function testMultipleGrids(max_rows, max_cols) {
    for (let rows= 4; rows < max_rows; rows++) {
        for (let columns = 4; columns <max_cols; columns++) {
            console.log('\n');
            testGrid(rows, columns);
            console.log('\n');
        }
    }
}

testGrid(2,2);
// testBoard(5);
// testMultipleGrids(10, 10);