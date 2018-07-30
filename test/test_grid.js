const { Cell, Grid } = require("../lib/grid");
const { Candy } = require("../lib/board");
const { pickRandom, inGrid } = require("../lib/utils");

const assert = require('assert');
const COLORS = ['red', 'blue', 'green', 'yellow'];

describe('Cell', function() {
    const c = new Cell(3, 5);
    const d = new Cell(2, 1);
    
    describe('#constructor()', function() {
        it('creates new cells', function() {
            assert(c);
            assert(d);
        });
    });

    describe('getters', function() {
        it('returns cell row and column as numbers', function() {
            assert(Number.isInteger(c.row));
            assert(Number.isInteger(d.row));
        });
        it('retains values it was initialized with', function() {
            assert.equal(c.row, 3);
            assert.equal(c.column, 5);
            assert.equal(d.row, 2);
            assert.equal(d.column, 1);
        });
    });

    describe('interfaces', function() {
        it('implements toString and toArray methods', function() {
            assert(c.toString());
            assert(c.toArray());
        })
    });
});

describe('Grid', function() {
    const g = new Grid(3, 2);
    const h = new Grid(5, 5);
    const grids = [g, h];
    
    describe('#constructor()', function() {
        it('Rejects zero values, negatives and floats', function() {
            assert.throws(() => { new Grid(0, 0); });
            assert.throws(() => { new Grid(0.5, 5.5); });
            assert.throws(() => { new Grid(-5, -2); });
        });

        it('creates new grids', function() {
            grids.forEach((grid) => assert(grid instanceof Grid));
        });
    });

    describe('static methods', function() {
        describe('#matrixIndex()', function() {
            const c = Grid.matrixIndex(4, 10);
            const d = Grid.matrixIndex(4, 13);

            it('converts flat indexes to matrix cells', function() {
                assert(c instanceof Cell);
                assert(d instanceof Cell);
            });
            it('calculates correct coordinates for flat indexes', function() {
                assert.equal(c.row, 2);
                assert.equal(c.column, 2);

                assert.equal(d.row, 3);
                assert.equal(d.column, 1);
            });
        });

        describe('#flatIndex()', function () {
            const c = new Cell(0, 1);
            const d = new Cell(2, 3);

            it('converts matrix cells to integers', function () {
                assert(Number.isInteger(Grid.flatIndex(4, c)));
                assert(Number.isInteger(Grid.flatIndex(4, d)));
            });

            it('calculates correct coordinates for matrix indexes', function () {
                assert.equal(Grid.flatIndex(4, c), 1);
                assert.equal(Grid.flatIndex(4, d), 11);
            });
        });
    });

    describe('properties', function() {
        it('retains initialized size', function() {
            assert.equal(g.size, 3*2);
            assert.equal(h.size, 5*5);
        });

        it('displays correct dimensions', function() {
            assert.equal(g.dimension, `3 by 2`);
            assert.equal(h.dimension, `5 by 5`);
        });
    });


    describe('#fillCell()', function() {
        it('adds items to grid', function() {
            grids.forEach(grid => {
                let count = 0;
                while (count < grid.size) {
                    let c = new Candy(count, pickRandom(COLORS));
                    c.position = Grid.matrixIndex(grid.columns, count);

                    grid.fillCell(c.position, c);
                    assert(!grid.isEmptyCell(c.position));

                    count++;
                }
            });
        });
    });
});