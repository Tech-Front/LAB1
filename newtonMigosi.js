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

function main() {
    candy = new Candy(1, 'red');
    candy.setPosition(0, 0);
    
    console.log(candy.toString());
}

main();