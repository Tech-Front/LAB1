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
            const err = new Error(`${cell.toString()} isn't valid cell in ${this.dimension} Grid`);
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
    
    getColumn(col_num) {
        if (col_num < this.columns) {
            return this.slots.filter((_, ind) => { return ind % this.columns === col_num; });
        } else {
            const err = new Error(`Out of Index Error: ${col_num} not in range [0, ${this.columns})`);
            throw err;
        }
    }
    
    get allRows() {
        const allrows = new Array(this.rows).fill('*');
        allrows.forEach((_, ind, arr) => { arr[ind] = this.getRow(ind); });
        return allrows;
    }

    get allColumns() {
        const allcolumns = new Array(this.columns).fill('*');
        allcolumns.forEach((_, ind, arr) => { arr[ind] = this.getColumn(ind); });
        return allcolumns;
    }

    get grid() {
        return this.allRows.map(row => { return `${row}\n`; }).toString();
    }

    get pretty_grid() {
        const cell_width = this.slots.reduce((a, b) => { return Math.max(a.toString().length, b.toString().length); }) + 5;
        let pretty_grid = '';

        const horizontal_border = '*'.repeat((cell_width + 2) * this.columns);
        const row_separator = '-'.repeat(horizontal_border.length + 2);
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

    get dimension() {
        return `${this.rows} by ${this.columns}`;
    }

    get size() {
        return this.rows * this.columns;
    }

    toString() {
        return `${this.dimension} Grid`;
    }
}

module.exports = { Cell: Cell, Grid: Grid };