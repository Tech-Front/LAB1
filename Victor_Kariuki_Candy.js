class Candy {
    constructor(color, id) {
        Object.defineProperty(this, 'id', {
            value: id,
            writable: false

        })
        Object.defineProperty(this, 'color', {
            value: color,
            writable: false

        })

        this.row = null;
        this.col = null;
    }


    // Getters for the row and column
    getRow() {
        return this.row;
    }

    setRow(row_pos) {
        return this.row = row_pos;
    }

    getCol() {
        return this.col;
    }

    // Setters for the row and column
    setCol(col_pos) {
        return this.col = col_pos;
    }

    // Returns a string representation of the candy

    toString() {
        return `Unique ID: ${this.id}, colors: ${this.color}, Row: ${this.row}, Col: ${this.row}`;
    }
}

// Colour List 
Candy.colors = ["red", "yellow", "green", "orange", "blue", "purple"];
