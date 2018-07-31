/**
 *
 *
 * @class Board
 */
class Board {
  /**
   *Creates an instance of Board.
   * @param {number} size
   * @memberof Board
   */
  constructor(size) {
    Object.defineProperty(this, 'boardSize', {
      value: size,
      writeable: false,
    });

    /**
     * 
     * Create a new grid array and fill it with the cells
     */
    this.grid = new Array(this.boardSize).fill(new Array(this.boardSize));
    this.score = 0;

  }
  /**
   *Returns a boolean indication of whether the row and column identify a valid square on the board.
   *
   *
   * @param {number} row
   * @param {number} col
   * @returns
   * @memberof Board
   */
  isValidLocation(row, col) {
    return row >= 0 && row === Math.round(row) && row <= this.boardSize &&
      col >= 0 && col === Math.round(col) && col <= this.boardSize;
  }

  /**
   * Returns a boolean indication of whether the board[row][column] is empty (Does not contain a candy.
   *
   *
   * @param {*} row
   * @param {*} col
   * @returns
   * @memberof Board
   */
  isEmptyLocation(row, col) {
    //Your code here
    if (this.grid[row][col]) {
      return false;
    }
    return true;
  }

  /**
   *Returns the number of squares on each side of the board
   */
  /**
   *
   *
   * @returns
   * @memberof Board
   */
  getSize() {
    //Your code here
    return this.boardSize;
  }


  /**
   * Get's the candy at [row, column] or null if the square is empty.
   *
   *
   * @param {*} row
   * @param {*} col
   * @returns
   * @memberof Board
   */
  getCandyAt(row, col) {
    //Your code here
    if (this.isEmptyLocation(row, col)) {
      return null;
    } else {
      for (let i of this.grid) {
        return this.grid[row][col];
      }
    }

  }


  /**
   * Get the location of the candy (row, column) if it's on the board or null if it's not found.
   *
   *
   * @param {string} candy
   * @returns
   * @memberof Board
   */
  getLocationOf(candy) {
    if (this.isValidLocation(candy.row, candy.col)) {
      return this.getCandyAt(candy.row, candy.col);
    } else {
      return null;
    }

  }



  /**
   * Get a list of all candies on the board, in no particular order
   *
   *
   * @memberof Board
   */
  getAllCandies() {
    for (var i = 0; i < this.grid.length; i++) {
      var grid = this.grid[i];
      for (var j = 0; j < grid.length; j++) {
        return grid[i][j];
      }
    }
  }


  /**
   * Add a new candy to the board. Requires candy added to not be on the board an*d (row, col) must
   * be a valid empty square. The optional spawnRow and spawnCol indicate where the candy was "spawned"
   * the moment before it moved to row,col. This location which may be off the board, is added to the "add"
   * event and can be used to animate new candies that are coming in from  offBoard.
   * Dispaches a new "add" event with details containing the candy, fromRow, fromCol, toRow and toCol
   *
   * @param {string} candy
   * @param {number} row
   * @param {number} col
   * @param {number} spawnRow
   * @param {number} spawnCol
   * @memberof Board
   */
  add(candy, row, col, spawnRow, spawnCol) {
    //Your code here
    if (this.isValidLocation(row, col) && this.isEmptyLocation(row, col)) {
      let details = {
        candy: candy,
        toRow: row,
        toCol: col,
        fromRow: spawnRow,
        fromCol: spawnCol
      }

      this.grid[row][col] = candy;
      candy.setRow(row);
      candy.setCol(col);

      const addCandy = new CustomEvent('addCandy', {
        detail: details
      });
      document.dispatchEvent(addCandy);
    }
  }


  /**
   * moves a candy from it's square to another square. Requires that this candy be found on this board and
   *  (toRow, toCol) must denote a valid empty spot on the board. Dispatches a new  "move" event with
   * details on the candy, toRow, fromRow, toCol, fromCol.
   *
   *
   * @param {string} candy
   * @param {number} toRow
   * @param {number} toCol
   * @returns
   * @memberof Board
   */
  moveTo(candy, toRow, toCol) {
    if (this.isValidLocation(candy.row, candy.col)) {
      if (this.isEmptyLocation(toRow, toCol)) {
        delete this.grid[candy.row][candy.col];
        var moveTo = new CustomEvent('moveTo', {
          detail: {
            candy: candy,
            fromRow: candy.row,
            fromCol: candy.col,
            toCol: toCol,
            toRow: toRow
          }
        });
        document.dispatchEvent(moveTo);
      }
    }
  }

  /**
   * Removes a candy from this board. Requires that candy be found on this board. Dispatches a new
   * "remove" event with details on the candy, fromRow, fromCol.
   *
   *
   * @param {*} candy
   * @returns
   * @memberof Board
   */
  remove(candy) {
    if(this.isValidLocation(candy.row, candy.col)){
      delete this.grid[candy.row][candy.col];
      return this.isEmptyLocation(candy.row, candy.col);
      var removeCandy = new CustomEvent('removeCandy', {
        detail: {
          candy: candy,
          fromRow: candy.row,
          fromCol: candy.col
        }
      })
      document.dispatchEvent(removeCandy);
    }
  }



  /**
   * Reomves candy at given location from this board. Requires that candy be found on this board.
   *
   *
   * @param {*} row
   * @param {*} col
   * @memberof Board
   */
  removeAt(row, col) {
    if(this.isValidLocation(row, col)){
      let candy = this.grid[row][col];
      this.remove(candy);
    }
  }



  /**
   * Remove all candies from board.
   */
  /**
   *
   *
   * @returns
   * @memberof Board
   */
  clear() {
    //Your code here
    return this.grid.length = 0;
  }



  /**
   * Adds a candy of specified color to row, col.
   */
  /**
   *
   *
   * @param {*} color
   * @param {*} row
   * @param {*} col
   * @param {*} spawnRow
   * @param {*} spawnCol
   * @returns
   * @memberof Board
   */
  addCandy(color, row, col, spawnRow, spawnCol) {
    //Your code here
    if (Candy.colour === color) {
      if (this.isValidLocation(row, col)) {
        return candy.row = spawnRow;
        return candy.col = spawnCol;
        const addCandy = new CustomEvent('addCandy', {
          detail: {
            row: spawnRow,
            col: spawnCol
          }
        })

        document.dispatchEvent(addCandy);
      }
    }


  }



  /**
   * Adds a candy of randowm color at row, col
   */
  /**
   *
   *
   * @param {*} row
   * @param {*} col
   * @param {*} spawnRow
   * @param {*} spawnCol
   * @memberof Board
   */
  addRandomCandy(row, col, spawnRow, spawnCol) {
    //Your code here
    if (this.isValidLocation(row, col)) {
      const addRandomCandy = new CustomEvent('addRandomCandy', {
        detail: {
          row: spawnRow,
          col: spawnCol
        }
      })
      document.dispatchEvent(addRandomCandy);
    }
  }


  /**
  * Returns the candy immediately in the direction specified ['up', 'down', 'left',
  'right'] from the candy passed as fromCandy
  */
  /**
   *
   *
   * @param {*} fromCandy
   * @param {*} direction
   * @returns
   * @memberof Board
   */
  getCandyInDirection(fromCandy, direction) {
    //Your code here
    if (direction === 'right') {
      return this.getLocationOf(fromCandy.col + 1);
    } else if (direction === 'left') {
      return this.getLocationOf(fromCandy.col - 1)
    } else if (direction === 'up') {
      return this.getLocationOf(fromCandy.row + 1)
    } else if (direction === 'down') {
      return this.getLocationOf(fromCandy.col - 1)
    }
  }


  /**
   * Flips candies passed, firing two move events. Does not verify the validity of the
   * flip and does not crush candies lined up after flip. With the events fired, details
   * on the candy, toRow, fromRow, toCol and fromCol are also dispatched
   */
  /**
   *
   *
   * @param {*} candy1
   * @param {*} candy2
   * @memberof Board
   */
  flipCandies(candy1, candy2) {
    //Your code here
    let details_1 = {
      candy: candy1,
      toRow: candy2.row,
      fromRow: candy1.row,
      toCol: candy2.col,
      fromCol: candyq.col
    };
    let details_2 = {
      candy: candy1,
      toRow: candy1.row,
      fromRow: candy2.row,
      toCol: candy1.col,
      fromCol: candy2.col
    }

    const moveCandy1 = new CustomEvent('moveCandy1', {
      detail: details_1
    })

    document.dispatchEvent(moveCandy1);
    const moveCandy2 = new CustomEvent('moveCandy2', {
      detail: details_2
    })
    document.dispatchEvent(moveCandy2);
  }



  /**
   * Resets the score. dispatches a new scoreUpdateEvent with details on the score.
   */
  /**
   *
   *
   * @memberof Board
   */
  resetScore() {
    //Your code here
    const resetScore = new CustomEvent('resetScore', {
      detail: {
        score: this.score,
        new_score: 0

      }
    })
    document.dispatchEvent(resetScore);
  }


  /*
   * Adds some score
   * Dispatches a new "scoreUpdate" event with details on score, candy, row and col.
   */
  /**
   *
   *
   * @param {*} candy
   * @param {*} row
   * @param {*} col
   * @memberof Board
   */
  incrememtScore(candy, row, col) {
    //Your code here
    let counter = 0;
    const scoreUpdate = new CustomEvent('scoreUpdate', {
      previous_score: this.score,
      new_score: this.score + counter,
      candy: candy,
      row: row,
      col: col
    })

    document.dispatchEvent(scoreUpdate);
  }


  /*
   * Returns current score
   */
  /**
   *
   *
   * @returns
   * @memberof Board
   */
  getScore() {
    //Your code here
    return this.score;
  }


  /**
   * Returns a string representation of the board
   */
  /**
   *
   *
   * @returns
   * @memberof Board
   */
  toString() {
    //Your code here
    return this.grid;
  }

}