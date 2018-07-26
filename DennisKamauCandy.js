class Candy {
    constructor(id, color) {
        this.row = null;
        this.column = null;


        Object.defineProperty(this.id, {
            writable: false,
            value: id
        });
        Object.defineProperty(this.color, {
            writable: false,
            value: color
        });

    }


    /**
     *Returns a string representation of the candy
     */

    toString() {
        return `("Row: "+${this.row},"Column: "+ ${this.column}, "Id: "+${this.id},"color: "+ ${this.color})`;
    }
    get row() {
        return this.row;
    }
    set column(val) {
        this.column = val;
    }
    get column() {
        return this.column;
    }
    set row(val) {
        this.row = val;
    }

}
Candy.colors = ["red", "yellow", "green", "orange", "blue", "purple"];