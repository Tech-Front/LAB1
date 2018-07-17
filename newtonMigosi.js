class Candy {
    constructor(id, color) {
        this.id = id;
        this.color = color;
        this.row = null;
        this.column = null;
    }

    setPosition(row, column) {
        this.row = row;
        this.column = column;
    }

    toString() {
        return `${this.color} candy at r${this.row}, c${this.column}`;
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
        return `${this.boardSize} by ${this.boardSize} SquareMatrix`;
    }

    getSlotAt(row, col) {
        if (this.isValidLication(row, col)) {
            return this.matrix[row][col]
        } else {
            const err = new Error(`Slot r${row}, c${col} isn't valid slot in board ${this.toString()}`);
            throw err;
        }
    }


    isEmptyLocation(row, col) {
        return this.getSlotAt(row,col) == null;
    }

    get boardSize() {
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
    candy.setPosition(0, 0);

    console.log(candy.toString());

    const board = new Board(5);

    console.log(board.getSlotAt(4, 4));
}

main();