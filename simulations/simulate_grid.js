const { Grid } = require("../lib/grid");
const { Candy } = require("../lib/board");
const { pickRandom, inGrid } = require("../lib/utils");


function testGrid(rows, cols) {
    const COLORS = ['red', 'blue', 'green', 'yellow'];

    const g = new Grid(rows, cols);

    let count = 0;
    while (count < g.size) {
        let c = new Candy(count, pickRandom(COLORS));
        c.position = Grid.matrixIndex(g.columns, count);

        g.fillCell(c.position, c);
        !g.isEmptyCell(c.position) ? console.log(`Added ${c.fullInfo}`) : console.error(`Couldn't addToGrid ${c.fullInfo}`);

        count++;
    }

    console.log('\n', g.pretty_grid);

    [...COLORS, 'pink'].forEach(color => {
        let location = g.find(candy => { return candy.color == color; });
        if (inGrid(location)) {
            console.log(`Found ${g.getCell(location).fullInfo}`);
        } else {
            console.error(`Didn't find ${color} candy`);
        }
    });

}

function testMultipleGrids(max_rows, max_cols) {
    for (let rows = 2; rows < max_rows; rows++) {
        for (let columns = 2; columns < max_cols; columns++) {
            console.log('\n');
            testGrid(rows, columns);
            console.log('\n');
        }
    }
}

module.exports = {
    testGrid: testGrid,
    testMultipleGrids: testMultipleGrids
};