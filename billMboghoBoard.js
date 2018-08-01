// JavaScript source code
class Board {
    constructor(length) {
        this.board;
        Object.defineProperty(this, 'boardSize', {
          value: length,
          writable: false
          });

        this.identifier = 0;
        this.board = new Array(this.boardSize);
        this.score = 0;
        for (let counter1 = 0; counter1 < this.boardSize; counter1++) {
            //this.board.push(new Array(this.boardSize));
            this.board[counter1]=new Array(this.boardSize);
        };
        for (let counter1 = 0; counter1 < this.boardSize; counter1++) {
           for (let counter2 = 0; counter2 < this.boardSize; counter2++) {
              this.board[counter1][counter2]=null;
            }
          }

    };

    isValidLocation(row, column) {
        if ((row < this.boardSize) && (column < this.boardSize)&&(row>=0)&&(column>=0)&&(Number.isInteger(row))&&(Number.isInteger(column))) {
            return true;
        }
        else {
            return false;
        }
    }


    isEmptyLocation(row, column) {
        if (this.board[row][column] == null) {
            return true;
        }
        else {
            return false;
        }
    };


    getSize() {
        return this.boardSize;
    };

    getCandyAt(row, column) {
        return this.board[row][column];
    };
    getLocationOf(candy) {
        if((candy.row!=null)&&(candy.column!=null)){
          return {row: candy.row, col: candy.column}
        }
        else{
          return null;
        }


    };


    getAllCandies() {
      var allOfThem=[];
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < this.length; j++) {
              if(this.board[i][j]!=null){
                allOfThem=allOfThem.push({row:i,col:j});
              }

            }
        }
        return allOfThem;
    };
    add  (candy,row,col,spawnrow,spawncol) {
      this.board[row][col]=candy;
      this.board[row][col].setRow(row);
      this.board[row][col].setColumn(col);
      console.log(this.board[row][col].row)
    //  console.log(this.board[row][col]);

    };//not too sure what is to be happenning here


    moveTo  (candy, toRow, toCol) {
      let row=candy.row;
      let col=candy.column;
      this.board[row][col]=null;
      this.board[toRow][toCol]=candy;
      candy.row=toRow;
      candy.column=toCol;
    };
    remove (candy) {

      let row=candy.row;
      let col=candy.column;
      this.board[row][col]=null;
      //console.log(row);
             };

    removeAt (row, col) {
        this.board[row][col] = null;
        window.addEventListener('removeCandy', function () { }, false);
        window.dispatchEvent(this.removeCandy);
    };
    clear  () {
        board.map(x => null);
    }
    addRandomCandy  (row, col, spawncol, spawnrow) {
        let colours = ["red", "orange", "yellow", "green", "blue", "purple"];
        let x = Math.floor(Math.random() * 5)
        this.board[row][col] = new Candy(colours[x], this.identifier);
        this.identifier++;
        //window.addEventListener('add', function () { }, false);
        //window.dispatchEvent(this.addCandy);
    }
    addCandy (color, row, col, spawnRow, spawnCol) {
        this.board[row][col] = new Candy(color, this.identifier);
        this.identifier++;
        //window.addEventListener('add', function () { }, false);
        //window.dispatchEvent(this.addCandy);

    };


    getCandyInDirection(fromCandy, direction) {

        let location = this.getLocationOf(fromCandy);

        if (direction == 'up') {
            if (location[0] != 0) {
                let frow = location[0] - 1;
                let fcol = location[1];
                return this.board[frow][fcol];
            }
        }
        else if (direction == 'down') {
            if (location[0] != this.length - 1) {
                let frow = location[0] + 1;
                let fcol = location[1];
                return this.board[frow][fcol];
            }
        }
        else if (direction == 'left') {
            if (location[1] != 0) {
                let frow = location[0];
                let fcol = location[1] - 1;
                return this.board[frow][fcol];
            }

        }
        else if (direction == 'right') {
            if (location[1] != this.length - 1) {
                let frow = location[0];
                let fcol = location[1] + 1;
                return this.board[frow][fcol];
            }
        }
    };
    flipCandies(candy1, candy2) {

        let location1 = this.getLocationOf(candy1);
        let location2 = this.getLocationOf(candy2);
        let temp;
        temp = this.board[location1[0]][location1[1]];
        this.board[location1[0]][location1[1]] = this.board[location2[0]][location2[1]];
        this.board[location2[0]][location2[1]] = temp;
    };
    resetScore() {
        this.score = 0;
      //  window.addEventListener('ScoreUpdate', function () { }, false);
        //window.dispatchEvent(this.ScoreUpdate);
    };
    incrementScore  (candy, row, col) {
        this.score += 1;
        //window.addEventListener('ScoreUpdate', function () { }, false);
        //window.dispatchEvent(this.ScoreUpdate);
    };
    incrementScore  (candy, row, col) {
        return this.score;
    };

     initializeBoard () {
        for (let counter1 = 0; counter1 < this.length; counter1++) {
            for (let counter2 = 0; counter2 < this.length; counter2++) {
                this.addRandomCandy(counter1, counter2);
            }
        }
    }
}
