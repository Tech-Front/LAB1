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
        return this.surface[row][col] == 0;
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
        if (this.surface[row][col] == 0) return null;
        return this.surface[row][col];
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

    findCandy(candy){
        return this.candies.find(function (onSiteCandy){
            return onSiteCandy.ID == candy.ID;
        });
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
        vm.state = 'INTERMITENT';
        vm.state = 'FINAL';
        var candy = candy;
        var found = false;
        if(vm.isValidLocation(row, col)){
            var found = vm.findCandy(candy);
            if(!found)  {
                vm.surface[row][col] = candy;
                vm.candies.push(candy);
                vm.sweep();
                vm.boardModification('add', candy, row, col);
                document.body.addEventListener("add", foo.func, {once:true})
            } else return "Candy already on board";
        } else return "Invalid location";
    }

    sweep(){
        let vm = this;
        for(var i = 0; i < this.row; i++){
            for(var j = 0; j < this.col; j++){
                vm.checkMatchesHorizontal(vm.surface[i][j]);
                vm.checkMatchesVertical(vm.surface[i][j]);
            }
        }
        if(vm.state == 'INTERMITTENT'){

        }
    }

    checkMatchesHorizontal(candy){
        let vm = this;
        if(candy.col == 0){

        } else if(candy.col == vm.col){

        }
    }

    checkMatchesVertical(candy){
        let vm = this;
        if(candy.row == 0){
            
        }else if (candy.row == vm.row){

        } else {
            //check whether there is enough space south with matching candy colors
            if(vm.row - candy.row > 1){
                if((vm.surface[candy.row - 1][] && vm.surface[candy.row + 1][]) ||
                    vm.surface[candy.row + 1][] && vm.surface[candy.row + 2][] ||
                    true
                ) true;
            }
            // if just one space, just check with above
            
            // ...
            
            // then check three up with current cell as lowest

            // ...

            // then check for a possible fourth one

            // ...
            
        }
    }

    checkAsFirstVertical(){
        let vm = this;
        vm.checkFirstRowEdgeCase();
        vm.checkSecondRowEdgeCase();
        vm.checkLastRowEdgeCase();
        vm.checkSecondLastRowEdgeCase();
        vm.checkRegularFirstVertical();
    }

    checkAsSecondVertical(){

    }

    checkAsThirdVertical(){

    }

    checkAsFirstHorizontal(){
        
    }

    checkAsFirstHorizontal(){

    }

    checkAsFirstHorizontal(){

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