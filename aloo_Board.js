class Board {
    constructor(row, col){
        this.row = row;
        this.col = col;
        this.surface = [];
        this.candies = [];
        this.state = 'FINAL';
        this.events = require('events');
        this.eventEmitter = new events.EventEmitter();
    }
    
    initializeBoard(row, col){
        this.surface = new Array(row);
        for (var i = 0; i < row; i++) {
            this.surface[i] = new Array(col);
            this.surface[i].fill(0);
        }
    }

    
    /**
    *Returns a boolean indication of whether the row and column identify a valid square on the board.
    */
    isValidLocation(row, col) {
        //Your code here   
        if (row < 0 || col < 0 || row > this.row || col > this.col ||
                typeof(row) == string || typeof(col) == string) return false;
        else return true;
    }



    /** 
    * Returns a boolean indication of whether the board[row][column] is empty (Does not contain a candy.
    */
    isEmptyLocation(row, col) {
        //Your code here
        let vm = this;
        if(vm.isValidLocation(row, col)){
            return this.surface[row][col] == 0;
        } else return "isEmptyLocation function using invalid board location";
        
    }



    /**
    *Returns the number of squares on each side of the board 
    */
    getBoardSize() {
        //Your code here 
        if(this.row && this.col) return "("+this.row+", "+this.col+")";
        else "row or col not initialized";
    }



    /** 
    * Get's the candy at [row, column] or null if the square is empty. 
    */
    getCandyAt(row, col) {
        //Your code here 
        let vm = this;
        if(vm.isValidLocation(row, col)){
            if (this.surface[row][col] == 0) return null;
            return this.surface[row][col];
        } else return "getCandyAt function using invalid board location";
    }


    /**
    * Get the location of the candy (row, column) if it's on the board or null if it's not found.
    */
    getLocationOf(candy) {
        // Your code here 
        let vm = this;
        let foundCandy = vm.findCandy(candy);
        if(!foundCandy) return null;
        return "("+foundCandy.row+", "+foundCandy.col+")";
    }



    /**
    * Get a list of all candies on the board, in no particular order 
    */
    getAllCandies() {
        //Your code here
        return this.candies;
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
        let state = vm.getState();
        if(state == 'FINAL'){
            let candy = candy;
            if(vm.isValidLocation(row, col)){
                let found= vm.getAllCandies().find(function (onSiteCandy){
                    return onSiteCandy.ID == candy.ID;
                });
                if(!found)  {
                    vm.surface[row][col] = candy;
                    vm.candies.push(candy);
                    vm.sweep();
                    vm.boardModification('add', candy, row, col);
                    document.body.addEventListener("add", foo.func, {once:true})
                } else return "candy already on board";
            } else return "invalid location passed to function add";
        } else return "cannot add candy to board during intermittent state";
        
    }

    boardModification(action, candy, row, col){
        let vm = this;
        switch(action){
            case('add'):
            case('move'):
            case('remove'):
            	vm.resetScore();
        }
    }

    getState(){
        let vm = this;
        vm.state = 'INTERMITTENT';
        vm.state = 'FINAL';
    }

    colGravitate(row, col, numberOfHoles){
        let vm = this;
        let countAboveHoles = this.col - col - numberOfHoles;
        function 
        while()
        for(var i = 0; i < countAboveHoles; i ++){
            vm.surface
        }
    }

    rowGravitate(row, col, numberOfHoles){
        let vm = this;
        this
        for(var i = 0; i < )
    }

    sweep(){
        let vm = this;
        for(var i = 0; i < this.row; i++){
            for(var j = 0; j < this.col; j++){
                let continuousHorizontalLength = vm.checkMatchesHorizontal(vm.getCandyAt(i, j));
                if(continuousHorizontalLength > 2){
                    for(var k = 0; k < continuousHorizontalLength; k++){
                        vm.surface[i][j+k] = 0;
                    }
                    vm.gravitate();
                }
                for(var l = 0; l < vm.row - )
                let continuousVerticalLength = vm.checkMatchesVertical(vm.getCandyAt(i,j));
                if(continuousVerticalLength > 2){
                    
                }
            }
        }
        if(vm.state == 'INTERMITTENT'){

        }
    }

    checkMatchesHorizontal(candy){
        let vm = this;
        if(!(candy.row > this.row - 3)){
            let matchCount = 1;
            let nextCandy = vm.surface[row][col+matchCount]
            while(nextCandy && nextCandy.color == candy.color){
                nextCandy = vm.getCandyAt(row, col+(++matchCount));
            }
            return matchCount;
        }else "candy in second last or last column";
    }

    checkMatchesVertical(candy){
        let vm = this;
        if(!(candy.row > this.row - 3)){
            let matchCount = 0;
            let nextCandy = vm.surface[row][col+1]
            while(nextCandy && nextCandy.color == candy.color){
                matchCount++;
                nextCandy = vm.surface[row][col+matchCount+1];
            }
            return matchCount;
        }else "candy in second last or last row";
    }

    checkAsFirstVertical(){
        let vm = this;
        vm.checkLastRowEdgeCase();
        vm.checkSecondLastRowEdgeCase();
        vm.checkRegularFirstVertical();
        return length = 0;
    }

    checkAsFirstHorizontal(){
        let vm = this;
        vm.checkLastRowEdgeCase();
        vm.checkSecondLastRowEdgeCase();
        vm.checkRegularFirstVertical();
        return length = 0;
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
    getCandyInDirection(fromCandy, direction) {
        //Your code here
        let vm = this;
        let returnedCandy;
        let row = fromCandy.row;
        let col = fromCandy.col;
        switch(direction){
            case('up'):
                row = fromCandy.row - 1;
                returnedCandy = vm.getCandyAt(row, col);
            case('down'):
            case('left'):
            case('right'):
        }
    }


    /**
    * Flips candies passed, firing two move events. Does not verify the validity of the 
    * flip and does not crush candies lined up after flip. With the events fired, details
    * on the candy, toRow, fromRow, toCol and fromCol are also dispatched
    */
    flipCandies(candy1, candy2) {
        //Your code here 
        let vm = this;

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