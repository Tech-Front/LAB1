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

A candy is constructed using a ``` color``` and a ```unique ID```. Both of these fields should be immutable. Other fields that the  candy has are ```row``` and ```column``` which should both be initialized to ```null```


Define the candy colors in a list as a candy field. Candy colors include: ``` "red" , "yellow", "green", "orange", "blue"``` and ``` "purple"```


### Methods 

Getter and setter methods for the ```row``` and ```column```


```
/**
*Returns a string representation of the candy
*/
toString()
 
### The ```Board```

 The ```Board``` represents a  candyBoard, which is a square array of squares. It can be any size. 

 Each board square contains exactly one candy, and is identified by it's row and column, indexed ```0``` to ```boardSize -1```

 ```Square[0][0]``` is the upper left corner of the candyBoard. 
 Rows are numbered downwards and the columns to the right. Candies are mutable, they can be added, removed and moved. The boardSize however is immutable. 

The board broadcasts four event types: ```"add", "remove", "move"``` and ```"scoreUpdate"```


###Object description 
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



/** Get's the candy at [row, column] or null if the square is empty. 
*/
getCandyAt(row, col) {
    //Your code here 
}


/**
*Get the location of the candy (row, column) if it's on the board or null if it's not found.
*/
getLocationOf(candy){
    //Your code here 
}



/**
*Get a list of all candies on the board, in no particular order 
*/
getAllCandies(){
    //Your code here
}


