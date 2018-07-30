class Candy {
    constructor(color,id) {
        this.row = null;
        this.column = null;


        Object.defineProperty(this, 'id', {
            writable: false,
            value: id
        });

        Object.defineProperty(this, 'color', {
            writable: false,
            value: color
        });

    }


    toString() {
        return `("Row: "+${this.row},"Column: "+ ${this.column}, "Id: "+${this.id},"color: "+ ${this.color})`;
    }
    getRow() {
        return this.row;
    }
    setColumn(val) {
        this.column = val;
    }
    getColumn() {
        return this.column;
    }
    setRow(val) {
        this.row = val;
    }

}
Candy.colors = ["red", "yellow", "green", "orange", "blue", "purple"];