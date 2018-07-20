const EventEmitter = require('events').EventEmitter();

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

class Board {
    constructor(row, col){
        this.row = row;
        this.col = col;
        this.surface = [];
        this.candies = [];
        this.events = require('events');
        this.eventEmitter = new events.EventEmitter();
    }
    
    initializeBoard(row, col){
        this.surface = new Array(row);
        for (var i = 0; i < row; i++) {
            this.surface[i] = new Array(col);
            this.surface[i].fill(null);
        }
    }

    
    /**
    *Returns a boolean indication of whether the row and column identify a valid square on the board.
    */
    isValidLocation(row, col) {
        //Your code here   
        if (row < 0 || col < 0 || row > this.row || col > this.col) return false;
        else return true;
    }



    /** 
    * Returns a boolean indication of whether the board[row][column] is empty (Does not contain a candy.
    */
    isEmptyLocation(row, col) {
        //Your code here
        return this.surface[row][col] == null;
    }



    /**
    *Returns the number of squares on each side of the board 
    */
    getBoardSize() {
        //Your code here 
        return this.row * this.col;
    }



    /** 
    * Get's the candy at [row, column] or null if the square is empty. 
    */
    getCandyAt(row, col) {
        //Your code here 
        return this.surface[row][col];
    }


    /**
    * Get the location of the candy (row, column) if it's on the board or null if it's not found.
    */
    getLocationOf(candy) {
        //Your code here 
        // for(var i = 0; i < this.surface.length; i++){
        //     for(var j = 0; j < this.surface[i].length; j++){
        //         if(this.surface[i][j].ID == candy.ID) return i+', '+j;
        //     }
        // }
        var loc = {
            row: candy.row,
            col: candy.col
        }
        return null;
    }



    /**
    * Get a list of all candies on the board, in no particular order 
    */
    getAllCandies() {
        //Your code here
        return this.candies;
    }

    findCandy(candy){
        function findMatch(item){
            return onSiteCandy.ID == item.ID;
        }
        return this.candies.find(vm.findMatch)
    }

    /** 
    * Add a new candy to the board. Requires candy added to not be on the board an*d (row, col) must
    * be a valid empty square. The optional spawnRow and spawnCol indicate where the candy was "spawned" 
    * the moment before it moved to row,col. This location which may be off the board, is added to the "add"
    * event and can be used to animate new candies that are coming in from  offBoard. 
    * Dispaches a new "add" event with details containing the candy, fromRow, fromCol, toRow and toCol */
    // * Add a new candy to the board. Requires candy added to not be on the board 
    // * an*d (row, col) must be a valid 
    // * empty square.
    // * The optional spawnRow and spawnCol indicate where the candy was "spawned" the moment before it moved to row,col.
    // *  This location which may be off the board, 
    // * is added to the "add" event and can be used to animate new candies that are coming in from  offBoard
    // * Dispaches a new "add" event with details containing the candy, fromRow, fromCol, toRow and toCol
    add(candy, row, col, spawnRow, spawnCol) {
        //Your code here
        let vm = this;
        var candy = candy;
        var found = false;
        if(!vm.isValidLocation(row, col)){
            var found = vm.findCandy(candy);
            if(!found)  {
                vm.surface[row][col] = candy;
                vm.candies.push(candy);
                vm.boardModification('add', candy, row, col);
                document.body.addEventListener("add", foo.func, {once:true})
            }
            else return "Candy already on board";

        } else return "Invalid location";
    }

    boardModification(action, candy, row, col){
        switch(action){
            case('add'):
            case('move'):
            case('remove'):
            	vm.resetScore();
        }
    }


    /**
    * moves a candy from it's square to another square. Requires that this candy be found on this board and
    *  (toRow, toCol) must denote a valid empty spot on the board. Dispatches a new  "move" event with 
    * details on the candy, toRow, fromRow, toCol, fromCol. */
    moveTo(candy, toRow, toCol) {
        //Your code here
    }



    /**
    * Removes a candy from this board. Requires that candy be found on this board. Dispatches a new 
    * "remove" event with details on the candy, fromRow, fromCol.
    */
    remove(candy) {
        //Your code here 
    }



    /**
    * Reomves candy at given location from this board. Requires that candy be found on this board. */
    removeAt(row, col) {
        //Your code here
    }



    /**
    * Remove all candies from board. 
    */
    clear() {
        //Your code here 
        let vm = this;
        for (var i = 0; i < vm.row; i++) {
            this.surface[i] = new Array(col);
            this.surface[i].fill(null);
        }
    }



    /**
    * Adds a candy of specified color to row, col.
    */
    addCandy(color, row, col, spawnRow, spawnCol) {
        //Your code here
        let vm = this;
        var candy = {};
        var ID = Math.random()*10000000000000000;
        candy.ID = ID;
        while(vm.findCandy(candy)){
            ID = Math.random()*10000000000000000;
            candy.ID = ID;
        }
        candy.color = color;
        const immutable_candy = candy;
        vm.add(immutable_candy, row, col, spawnRow, spawnCol);
    }




    /**
    * Adds a candy of randowm color at row, col
    */
    addRandomCandy(row, col, spawnRow, spawnCol) {
        //Your code here
        var colorPickerCandy = new Candy('param', 1);
        var random_color = Math.random() * 6;
        let vm = this;
        vm.addCandy(colorPickerCandy.colors[random_color], row, col, spawnRow, spawnCol);
    }



    /**
    * Returns the candy immediately in the direction specified ['up', 'down', 'left', 
    'right'] from the candy passed as fromCandy
    */
    getCandyInDirection(fromCcandy, direction) {
        //Your code here
        let vm = this;
        vm.get
    }


    /**
    * Flips candies passed, firing two move events. Does not verify the validity of the 
    * flip and does not crush candies lined up after flip. With the events fired, details
    * on the candy, toRow, fromRow, toCol and fromCol are also dispatched
    */
    flipCandies(candy1, candy2) {
        //Your code here 
    }



    /**
    * Resets the score. dispatches a new scoreUpdateEvent with details on the score.
    */
    resetScore() {
        //Your code here 
    }


    /*
    * Adds some score
    * Dispatches a new "scoreUpdate" event with details on score, candy, row and col.
    */
    incrememtScore(candy, row, col) {
        //Your code here 
    }


    /*
    * Returns current score
    */
    getScore() {
        //Your code here 
    }


    /**
    * Returns a string representation of the board
    */
    toString() {
        //Your code here 
    }

}