class Cell {
    constructor(horizontal, vertical) {
        this.horizontal = horizontal;
        this.vertical = vertical;
    }

    get row() {
        return this.horizontal;
    }

    get column() {
        return this.vertical;
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
        return `${this.color} candy at ${this.position.toString()}`;
    }
}

class Grid {
    constructor(num_rows, num_columns) {
        this.rows = num_rows;
        this.columns = num_columns;
        this.slots = new Array(num_rows * num_columns).fill(null);
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

    add(obj, row, col) {
        this.fillCell(new Cell(row, col), obj);
    }

    find(rule) {
        return Grid.matrixIndex(this.columns, this.slots.findIndex(rule));
    }

    get grid() {
        let grid = `${this.toString()}\n`;
        for(let row = 0; row < this.rows; row++){
            grid += `${[...this.slots.slice(row * this.columns, row * this.columns + this.columns)]}\n`;
        }
        return grid;
    }

    get size() {
        return this.rows * this.columns;
    }

    toString() {
        return `${this.rows} by ${this.columns} Grid`;
    }
}

class Board extends Grid {
    constructor(size) {
        super(size);
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
        !g.isEmptyCell(c.position) ? console.log(`Added ${c.fullInfo}`) : console.error(`Couldn't add ${c.fullInfo}`);
        count++;
    }
    
    console.log('\n', g.grid);

    [...COLORS, 'pink'].forEach(color => {
        let location = g.find(candy => { return candy.color == color; });
        if (inGrid(location)) {
            console.log(`Found ${g.getCell(location).fullInfo}`);
        } else {
            console.error(`Didn't find ${color} candy`);
        }
    });

}

function test(max_rows, max_cols) {
    for (let rows= 1; rows < max_rows; rows++) {
        for (let columns = 1; columns <max_cols; columns++) {
            testGrid(rows, columns);
        }
    }
}

test(10, 10);