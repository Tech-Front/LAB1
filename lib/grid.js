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
    
    validateCell(cell, callback, args=[]){
        const isValid = this.isValidCell(cell);
        const error_msg = `${cell.toString()} isn't valid cell in ${this.dimension} Grid`;
        const argv = [cell, ...args];

        return Grid.validate(isValid, error_msg, callback, argv, this);
    }
    
    validateIndex(index, max, callback, args=[], min=0) {
        const isValid = index < max && index >= min;
        const error_msg = `Out of Index Error: ${ index } not in range[${ min }, ${ max })`;
        const argv = [index, ...args];

        return Grid.validate(isValid, error_msg, callback, argv, this);
    }
    
    find(rule) {
        return Grid.matrixIndex(this.columns, this.slots.findIndex(rule));
    }

    getCell(cell, validated=false) {
        return validated ? 
            this.slots[Grid.flatIndex(this.columns, cell)] : 
            this.validateCell(cell, this.getCell);
    }

    fillCell(cell, obj, validated=false) {
        return validated ? 
            (this.slots[Grid.flatIndex(this.columns, cell)] = obj) && this.getCell(cell) : 
            this.validateCell(cell, this.fillCell, [obj]);
    }


    getRow(row_num, validated=false) {
        return validated ?
            [...this.slots.slice(row_num * this.columns, row_num * this.columns + this.columns)] :
            this.validateIndex(row_num, this.rows, this.getRow);
    }
    
    getColumn(col_num, validated=false) {
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

module.exports = { Cell: Cell, Grid: Grid };