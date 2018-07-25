class Candy{

    constructor(color, uniqueId){
        this.color =color
        this.row = null;
        this.column = null;

        //immmutable field uniqueId
        Object.defineProperty(this,"uniqueId",{
            configurable:false,
            writable:false,
            value:uniqueId

        });
        //immmutable field color
        Object.defineProperty(this,"color",{
            configurable:false,
            writable:false,
            value:color

        });

        let Colors =[
    
            'red' , 'yellow',
             'green', 'orange', 
             'blue','purple'
    ]

    }
  

    get row(){
        return this.row;
    }

    set row(row){
        this.row = row;
    }

    get column(){
        return this.column;
    } 

    set column(column){
        this.column = column;
    }

    toString(){
    return ('the Candy is of '+this.color+'color. UniqueId'+this.uniqueId+'row'+this.row+'column'+this.column);
    }
  
  
    
}
class BoardSquare{
    constructor(size){
        this.size =size;
        
        

    }
    
}

class Board extends BoardSquare {
    constructor (size){
        super(size);
    
        //BoardSize is immutable
        Object.defineProperty(this,"size",{
            writable:false,
            value:size
        });

        //initialize candy id to 0
        this.candyCount =0;

        //initialize game score to 0
        this.score = 0;

         /*
        create a new board and add a Square from position Square[0][0]
        into the board
        */
       let obj = new BoardSquare();

       this.board = new Array(this.size);

       for (i = 0; i < this.size; i++) {
           this.board[i] = new Array(this.size);
           for (j = 0; j < this.size; j++) {
             //add square to an empty Board
             this.board[i][j] =[];
            this.board[i][j].push(obj);
           
   
              }
          }
        console.log(this.board[0][0]);


    }
    

    
    /**
*Returns a boolean indication of whether the row and column identify a valid square on the board.
*/
isValidLocation(row, col) {
   if(row <= this.size && col<=this.size &&
    row >= 0 && col >= 0 &&
    Number.isInteger(row) && Number.isInteger(col)){
    return true;
}else{
    return false;
}
} 

/** 
* Returns a boolean indication of whether the board[row][column] is empty (Does not contain a candy.
*/
isEmptyLocation(row, col) {
   if(this.getCandyAt(row,col)===null)
   {
       return true;
   }
}

/**
*Returns the number of squares on each side of the board 
*/
getBoardSize() {
    return this.board;
}
/** 
* Get's the candy at [row, column] or null if the square is empty. 
*/
getCandyAt(row, col) {
    if(this.isValidLocation){
        return this.board[row][col];

    }else{
        return null;

    }
}

/**
* Get the location of the candy (row, column) if it's on the board or null if it's not found.
*/
getLocationOf(candy){
    if(!this.isEmptyLocation){
        {
        currentRow :candy.row;
        currentColumn: candy.column;
        };
        return true;
    }else{
        return null;
    }
}



/**
* Get a list of all candies on the board, in no particular order 
*/
getAllCandies(){
    if(this.isValidLocation &&
        !this.isEmptyLocation
    ){
        for(i=0;i<this.board.length;i++){
            var allCandies = [];
           allCandies.push(this.getCandyAt());
        }
    }
    
}


/** 
* Add a new candy to the board. Requires candy added to not be on the board an*d (row, col) must
*/
add(candy, row, col, spawnRow, spawnCol) {

    /*
  first  Requires candy added to not be on the board, 
  check if unique id exists anywhere else on the board
    */

    var found = this.board.some(function (el) {
      return el.uniqueId === candy.uniqueId;
    });

    if(this.isEmptyLocation(row,column) && !found  ){
        candy.row =row;
        candy.column=col;
    }
    var addDetails ={
        row: row,
        column: column,
        candy: candy
        
    };
    var addCandy = new CustomEvent('add candy',{addDetails:addDetails});
    document.dispatchEvent(addCandy);
   
}


/**
* moves a candy from it's square to another square. Requires that this candy be found on this board and
*  (toRow, toCol) must denote a valid empty spot on the board. Dispatches a new  "move" event with 
* details on the candy, toRow, fromRow, toCol, fromCol. */
moveTo(candy, toRow, toCol) {
   if(this.isValidLocation && this.isEmptyLocation(toRow, toCol)){
       delete this.board[candy.row][candy.column];
       this.board[toRow][toCol]= candy;
       candy.row = toRow;
       candy.col = toCol;
    var moveDetails ={
        fromRow: candy.row,
        fromColumn: candy.column,
        toRow : toRow,
        toCol: toCol,
        candy:candy
};
var moveCandy = new CustomEvent('move candy',{ moveDetails: moveDetails});
document.dispatchEvent(moveCandy);
   }
}



/**
* Removes a candy from this board. Requires that candy be found on this board. Dispatches a new 
* "remove" event with details on the candy, fromRow, fromCol.
*/
remove(candy) {
    if(this.isValidLocation){
        delete this.board[candy.row][candy.col];

        candy.row = null;
        candy.col = null;

        var removeDetails ={
            fromRow: candy.row,
            fromColumn: fromColumn,
            candy:candy
    };
    var removeCandy = new CustomEvent('remove candy',{ removeDetails: removeDetails});
    document.dispatchEvent(removeCandy);
    }
}



/**
* Reomves candy at given location from this board. Requires that candy be found on this board. */
removeAt(row, col) {
    if(this.isValidLocation){
        delete this.getCandyAt(row,col);
        candy.row = null;
        candy.col = null;
   
    }
    
}

}