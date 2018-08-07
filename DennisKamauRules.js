class Rules {
    constructor (Board){
        this.scoring = false;
        this.Board = Board;
    }

    /*
     *
     *   Returns true if flipping fromCandy with the candy in the direction
     *   specified (["up", "down", "left", "right"]) is valid
     *   (according to the rules), else returns false.
     *
     */
    isMoveTypeValid(fromCandy, direction) {
        //Your code here
        switch(direction) {
            case fromCandy.up: {
                return true
            }
            case fromCandy.down: {
                return true
            }
            case fromCandy.left: {
                return true
            }
            case fromCandy.right: {
                return true
            }

        }
    }


    /*
     *   Returns a list of all candy crushes on the board. A crush is a list of three
     *   candies in a single row or column that have the same color. Each crush is returned 
     *   as a list of lists
     */
    getCandyCrushes() {
        //Your code here
        var allCandyCrushes = new Array()
        // The candies must be 3 of the same color
        var tempArray = new Array()
        var position = 0
        for ( let row=0; row < this.Board.length; row++){
            // Get the color of the candy at that point
            // Evaluate if the next Candy is of the same color
            // if yes repeat the evaluation on the next candy + 1
            // if not check if the evaluated candy are of a number 3 or greater than 3
            // if yes push to temp array
            // if not drop the count
             for (let i = 0; i < this.Board.length; i++){
                while(i< this.Board.length){
                if (this.Board[row][col].color == this.Board[row][col + 1]) { 
                    position = i
                    tempArray.push(i[row][col])
                 }
                }
             }
             allCandyCrushes.push(tempArray);   
    }


    


    /* 
     *   Deletes all candies in listOfListsOfCrushes. If the game has already began, incremements 
     *   the board score. Does not move the candies down at all. 
     */
    removeCrushes(listOfListsOfCrushes) {
        //Your code here 
    }


    /* 
     *   Moves candies down as far as there are spaces. Issues calls to Board.moveTo which generates move 
     *   events. If there are holes created by moving the candies down, populates the board with new random candies
     */
    moveCandiesDown() {
        //Your code here 
    }

    /* 
     *   If there is a valid move on the board, returns an object with two properties: candy: a candy that can be moved 
     *   and direction: the direction to be moved. If there are no valid moves, returns null. The move is selected 
     *   randomly from available moves. 
     */
    getRandomValidMove() {
        //Your code here
    }


    /* 
     *   Populates the board with random candies
     */
    populateBoard() {
        //Your code here
    }

    /*
     *   Returns a list of candies that would be crushed if fromCandy were to be moved in the direction
     *   specified by direction. If no candies are to be crushed, returns an empty list.  
     */
    getCandiesToCrushGivenMove(fromCandy, direction) {
        //your code here
    }

    /*
     *   Returns number of sets of candies that would be crushed if the candy was moved in the specified
     *   direction
     */
    numberCandiesCrushedByMove(fromCandy, direction) {
        //Your code here
    }


    /*
     *   prepares new game with no sets of crushable candies. Sets the score to zero so that player doesn't 
     *   get crushes by luck 
     */
    prepareNewGame() {
        //Your code here 
    }
}