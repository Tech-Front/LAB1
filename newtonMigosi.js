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
    
    console.log(board.isValidLication(-1,-1));
}

main();