/**
 *Class that contains activities and values that a candy can have/perform
 *
 * @export
 * @class Candy
 */
class Candy {
    constructor(color, uniqueId) {
        this.color = color;
        this.uniqueId = uniqueId;

        this.row = 0;
        this.column = 0;

        let colors = ["red", "yellow", "green", "orange", "blue", "purple"];

    }

    //method for generating a random candy Colors
    changeColor() {
        this.color = colors[Math.floor(Math.random * colors.length)];
        return this.color;
    }

    // methods for setting values
    setPosition(row, column) {
        setRow(row);
        setColumn(column);
    }
    setRow(row) {
        this.row = row;
    }
    setColumn(column) {
        this.column = column;
    }

    // Methods for getting values
    getPosition() {
        row = getRow();
        col = getColumn();
        return { row: row, column: col };
    }
    getRow(row) {
        return this.row;
    }
    getColumn(column) {
        return this.column;
    }

    //representation of the class
    toString() {
        return JSON.stringify(this);
    }
}
//module.exports = Candy;