# Rules for the Candy Crush game

## Instructions
Implement the rules of Candy crush in a javascript class. 

Rules are constructed by passing in a ```Board```
The class has only one field ```scoring``` which is set to ```false``` at the 
beginning of the game to ensure the crushes that happen at the beginning of the 
game are not counted. 

Implement the following methods strictly following the specifications given. 

```
/*
*
*   Returns true if flipping fromCandy with the candy in the direction
*   specified (["up", "down", "left", "right"]) is valid
*   (according to the rules), else returns false.
*
*/
isMoveTypeValid(fromCandy, direction) {
 \\Your code here
}


/*
*   Returns a list of all candy crushes on the board. A crush is a list of three
*   candies in a single row or column that have the same color. Each crush is returned 
*   as a list of lists
*/
getCandyCrushes() {
    //Your code here
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

``` 
