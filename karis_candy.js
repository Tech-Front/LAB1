class Candy {
    constructor(colour, uid) {
        Object.defineProperty(this.uid, {
            value: uid,
            writeable: false,
            configurable: false
        })
        Object.defineProperty(this.colour, {
            value: colour,
            writeable: false,
            configurable: false
        })

        this.row = null;
        this.col = null;
    }

    // Getters for the row and column
    get row() {
        return this.row;
    }

    set row(row_pos) {
        return this.row = row_pos;
    }

    get col() {
        return this.col;
    }

    // Setters for the row and column
    set col(col_pos) {
        return this.col = col_pos;
    }

    // Returns a string representation of the candy

    toString() {
        return `Unique ID: ${this.uid}, Colour: ${this.colour}, Row: ${this.row}, Col: ${this.row}`;
    }
}

// Colour List 
Candy.colours = ["red", "yellow", "green", "orange", "blue", "purple"];