# LAB1
## Due Thursday July 19, 2018 at 2100Hrs
 
## Part 1

## Instructions 
The main goal of this first lab is to get you ramped up with Javascript, by building 
Abstract Data types for your candy crash project.
For this part of the lab, you're only required to implement the methods specified, 
promptly following the specifications. 


### The``` Candy```

Create a javascript class which will be an abstract data type representing a candy on the board. Candies are mutable. 
### Object description

A candy is constructed using a ``` color``` and a ```unique ID```. Both of these fields should be immutable. Other
 fields that the  candy has are ```row``` and ```column``` which should both be initialized to ```null```


Define the candy colors in a list as a candy field. Candy colors include: ``` "red" , "yellow", "green", "orange", 
"blue"``` and ``` "purple"```

    
### Methods 

Getter and setter methods for the ```row``` and ```column```


```
/**
*Returns a string representation of the candy
*/
toString()
```
 
### The ```Board```

 The ```Board``` represents a  candyBoard, which is a square array of squares. It can be any size. 

 Each board square contains exactly one candy, and is identified by it's row and column, indexed ```0``` to ```boardSize -1```

 ```Square[0][0]``` is the upper left corner of the candyBoard. 
 Rows are numbered downwards and the columns to the right. Candies are mutable, they can be added, removed and moved. 
 The boardSize however is immutable. 

The board broadcasts four event types: ```"add", "remove", "move"``` and ```"scoreUpdate"```


### Object description 
The ```Board``` is constructed by passing in a ```size``` which is a field of the object.
Represent the board appropriately. 


### Methods 
```
/**
*Returns a boolean indication of whether the row and column identify a valid square on the board.
*/
isValidLocation(row, col) {
    //Your code here   
} 



/** 
* Returns a boolean indication of whether the board[row][column] is empty (Does not contain a candy.
*/
isEmptyLocation(row, col) {
    //Your code here
}



/**
*Returns the number of squares on each side of the board 
*/
getBoardSize() {
    //Your code here 
}



/** 
* Get's the candy at [row, column] or null if the square is empty. 
*/
getCandyAt(row, col) {
    //Your code here 
}


/**
* Get the location of the candy (row, column) if it's on the board or null if it's not found.
*/
getLocationOf(candy){
    //Your code here 
}



/**
* Get a list of all candies on the board, in no particular order 
*/
getAllCandies(){
    //Your code here
}


/** 
* Add a new candy to the board. Requires candy added to not be on the board an*d (row, col) must
* be a valid empty square. The optional spawnRow and spawnCol indicate where the candy was "spawned" 
* the moment before it moved to row,col. This location which may be off the board, is added to the "add"
* event and can be used to animate new candies that are coming in from  offBoard. 
* Dispaches a new "add" event with details containing the candy, fromRow, fromCol, toRow and toCol */
add(candy, row, col, spawnRow, spawnCol) {
    //Your code here
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
}



/**
* Adds a candy of specified color to row, col.
*/
addCandy(color, row, col, spawnRow, spawnCol) {
    //Your code here
}




/**
* Adds a candy of randowm color at row, col
*/
addRandomCandy(row, col, spawnRow, spawnCol) {
    //Your code here
}



/**
* Returns the candy immediately in the direction specified ['up', 'down', 'left', 
'right'] from the candy passed as fromCandy
*/
getCandyInDirection(fromCcandy, direction) {
    //Your code here
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


```


End of Lab1 Part1! Congratulations! Stay tuned for part two. 


