const { Cell } = require("./grid");

const pickRandom = (arr) => { return arr[Math.floor(Math.random() * arr.length)]; };

const randomCell = (num_rows, num_cols) => { return new Cell(Math.floor(Math.random() * num_rows), Math.floor(Math.random() * num_cols)); };

const inGrid = (cell) => { return cell.row > -1 && cell.column > -1; };

class CustomEvent {
    constructor(name, detail) {
        this.name = name;
        this.details = detail.detail;
    }

    static dispatchEvent(e) {
        console.log(`${e.name} event dispatched ${e.details}`);
    }
}

module.exports = { 
    pickRandom: pickRandom, 
    inGrid: inGrid, 
    CustomEvent: CustomEvent, 
    randomCell: randomCell 
};