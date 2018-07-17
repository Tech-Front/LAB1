class Point{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get horizontal() {
        return this.x;
    }

    get vertical() {
        return this.y;
    }
}

class Candy {
    constructor(id, color) {
        this.id = id;
        this.color = color;
        this.row = null;
        this.column = null;
    }

    set position(point) {
        this.row = point.horizontal;
        this.column = point.vertical;
    }

    get position() {
        return `row: ${this.row}, col: ${this.column}`;
    }

    setPosition(row, column) {
        this.position = new Point(row, column);
    }

    getPosition() {
        return this.position;
    }

    toString() {
        return `${this.color} candy at ${this.position}`;
    }
}

class SquareMatrix {
    constructor(side_length, val = null) {
        this.size = side_length;

        const rows = new Array(side_length);
        const columns = new Array(side_length).fill(val);

        this.matrix = rows.fill(columns);
    }

    isValidLication(row, col) {
        return (row >= 0 && row < this.size) && (col >= 0 && col < this.size);
    }

    toString() {
        return `${this.dimension} by ${this.dimension} SquareMatrix`;
    }

    getSlotAt(row, col) {
        if (this.isValidLication(row, col)) {
            return this.matrix[row][col];
        } else {
            const err = new Error(`Slot r${row}, c${col} isn't valid slot in board ${this.toString()}`);
            throw err;
        }
    }

    get slots() {
        return [].concat(...this.matrix);
    }

    isEmptyLocation(row, col) {
        return this.getSlotAt(row,col) == null;
    }

    get dimension() {
        return this.size;
    }
}

class Board extends SquareMatrix {
    constructor(size) {
        super(size);
    }
}

function main() {
    const candy = new Candy(1, 'red');
    candy.position = new Point(0, 0);

    console.log(candy.toString());

    const board = new Board(5);

    console.log(board.slots);
}

main();