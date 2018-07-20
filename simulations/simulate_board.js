const { Board } = require("../lib/board");
const { randomCell } = require("../lib/utils");

function testBoard(size) {
    const b = new Board(size);

    let count = 0;
    while (count < b.size) {
        b.addRandomCandyCell(Grid.matrixIndex(b.columns, count));
        count++;
    }

    let c = b.getCandyAt(...randomCell(b.rows, b.columns).toArray());
    console.log(c.fullInfo);

    let d;
    let found = false;
    while (!found) {
        try {
            d = b.getCandyInDirection(c, pickRandom(directions));
            found = true;
        } catch (e) {
            found = false;
        }
    }

    console.log(`\nFlipping b and c:`);
    console.log(b.toString());
    b.flipCandies(c, d);
    console.log(b.toString());

    console.log(`\nRemoving c:`);
    b.remove(c);
    console.log(b.toString());

    b.clear();
    console.log(b.getAllCandies());
}

module.exports.simulateBoard = testBoard;
