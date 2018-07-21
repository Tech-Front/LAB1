const { Cell } = require("./grid");

const pickRandom = (arr) => { return arr[Math.floor(Math.random() * arr.length)]; };

const randomCell = (num_rows, num_cols) => { return new Cell(Math.floor(Math.random() * num_rows), Math.floor(Math.random() * num_cols)); };

const inGrid = (cell) => { return cell.row > -1 && cell.column > -1; };

const validate = function (isValid, msg, callback = () => { return true; }, args = [], thisArg = this) {
    if (isValid) {
        return callback.call(thisArg, ...args, true);
    } else {
        const err = new Error(msg);
        throw err;
    }
};

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
    validate: validate,
    CustomEvent: CustomEvent, 
    randomCell: randomCell
};