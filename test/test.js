//  var assert = require('assert');
//  var Candy = require('../candy.js');
//  var Board = require('../board.js');
//  var Util = require('../util.js');


describe('Correctly initializes Candy class', function() {
    it('should return "object" as the initialized type', function() {
      var newCandy = new Candy('red', 1)
      expect(typeof(newCandy)).to.equal("object");
    });
  });

describe('Unwritable ID', function() {
    it('should return 1 with an attempt to overwrite id', function() {
      var newCandy = new Candy('red', 1);
      newCandy.id = 2;
     expect(newCandy.id).to.be(1);
    });
  });

describe('Unwritable color', function() {
    it('should return "red" with an attempt to overwrite color', function() {
      var newCandy = new Candy('red', 1);
      newCandy.color = "yellow";
      expect(newCandy.color).to.be("red");
    });
  });

describe('Unwritable Board size', function() {
    it('should return 5 with an attempt to overwrite Board size', function() {
	var newBoard = new Board(5);
	newBoard.boardSize = 6
	expect(newBoard.getSize()).to.be(5);
     });
  });

describe('Test isValidLocation', function() {
    it('should return false with row  greater than BoardSize', function() {
	var newBoard = new Board(5);
	expect(newBoard.isValidLocation(6, 3)).to.be(false);
     });
  });

describe('Test isValidLocation', function() {
    it('should return false with row  less than 0', function() {
	var newBoard = new Board(5);
	expect(newBoard.isValidLocation(-1, 3)).to.be(false);
     });
  });

describe('Test isValidLocation', function() {
    it('should return false with column greater than boardSize', function() {
	var newBoard = new Board(5);
	expect(newBoard.isValidLocation(0, 8)).to.be(false);
     });
  });


describe('Test isValidLocation', function() {
    it('should return true  with both row and column  less than or equal to board size', function() {
	var newBoard = new Board(5);
	expect(newBoard.isValidLocation(4, 4)).to.be(true);
     });
  });

describe('Test isValidLocation', function() {
    it('should return true with  both row and column equal to zero', function() {
	var newBoard = new Board(5);
	expect(newBoard.isValidLocation(0, 0)).to.be(true);
     });
  });

describe('Test isValidLocation', function() {
    it('should return false with floating point values', function() {
	var newBoard = new Board(5);
	expect(newBoard.isValidLocation(4.5, 4.5)).to.be(false);
     });
  });

describe('Test isEmptyLocation', function() {
    it('should return true with a  non populated board', function() {
	var newBoard = new Board(5);
	expect(newBoard.isEmptyLocation(2,3)).to.be(true);
     });
  });

describe('Test isEmptyLocation', function() {
    it('should return false with a candy added at a specific spot', function() {
	var newBoard = new Board(5);
	var candytoAdd = new Candy("red", 1);
	newBoard.add(candytoAdd, 1, 2, -1, -1);
	expect(newBoard.isEmptyLocation(1,2)).to.be (false);
     });
  });

describe('Test getBoardSize', function() {
    it('should return 5 with board initialized as 5', function() {
	var newBoard = new Board(5);
	expect(newBoard.getSize()).to.be(5);
     });
  });

describe('Test getCandyAt', function() {
    it('should return null with an empty Board', function() {
	var newBoard = new Board(5);
	expect(newBoard.getCandyAt(1,2)).to.be(null);
     });
  });

describe('Test getCandyAt', function() {
    it('should return Candy Object  at this location', function() {
	var newBoard = new Board(5);
    var candyToAdd = new Candy("yellow", 2)
    newBoard.add(candyToAdd, 1, 2, -1, -1)
    // console.log("newBoard.getCandyAt(1, 2)", newBoard.getCandyAt(1, 2))
	expect(newBoard.getCandyAt(1, 2)).to.equal(candyToAdd);
     });
  });


describe('Test getLocationOf', function() {
    it('should return null with a candy not found on this board', function() {
	var newBoard = new Board(5);
	var newCandy = new Candy("red", 3);
	expect(newBoard.getLocationOf(newCandy)).to.be(null);
     });
  });

  describe('Test getAllCandies', function() {
    it('should return a non-ordered list of all candies on the board', function() {
    var newBoard = new Board(5)
    var expected = new Array()
	for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++) {
            let newCandy = new Candy("red", i*j)
            newBoard.add(newCandy,i, j, -1, -1)
            expected.push(newCandy)
        }
    }
	expect(newBoard.getAllCandies()).to.eql(expected);
     });
  });

  describe('Test moveTo', function() {
    it('should show that a Candy has been moved from {1,2} to {3 , 4}', function() {
	var newBoard = new Board(5);
    var newCandy = new Candy("red", 3)
    newBoard.add(newCandy, 1, 2, -1, -1)
    newBoard.moveTo(newCandy, 3, 4)
    expect(newBoard.getLocationOf(newCandy)).to.eql({row: 3, col: 4});
    expect(newBoard.isEmptyLocation(1,2)).to.be(true)
     });
  });

  describe('Test remove', function() {
    it('should show that a Candy has been moved from {1,2} ', function() {
	var newBoard = new Board(5);
    var newCandy = new Candy("red", 3)
    newBoard.add(newCandy, 1, 2, -1, -1)
    newBoard.remove(newCandy)
    expect(newBoard.isEmptyLocation(1,2)).to.be(true)
     });
  });
