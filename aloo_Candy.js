class Candy {
    constructor(color, ID) {
        this.color = color;
        this.ID = ID;
        this.row = null;
        this.column = null;
        this.colors = ["red", "yellow", "green", "orange", "blue", "purple"];
    }

    getRow() {
        return this.row;
    }

    getColumn() {
        return this.column;
    }

    toString() {
        return String(this);
    }
}