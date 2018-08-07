/**
 * Representation of the rules of the game
 */
class Rules {

    /**
     * Constructor to pass the board where rules are applied on
     * @param {Board} _board
     */
    constructor(_board) {
        this.board = _board;
        this.scoring = false;
    }

    /**
    *
    *   Returns true if flipping fromCandy with the candy in the direction
    *   specified (["up", "down", "left", "right"]) is valid
    *   (according to the rules), else returns false.
    *   
    *   Move is valid if the candies match colors
    * 
    * @param {Candy} fromCandy
    * @param {String} direction
    * @returns {Boolean} true | false
    *
    */
    isMoveTypeValid(fromCandy, direction) {
       return this.numberCandiesCrushedByMove(fromCandy,direction) > 0;
    }

    /**
     * Get crushes: gets all crushable candies on the board
     * returns a list of all candy crushes on the board.
     * A crush is a list of three candies in a single row or 
     * column that have the same color. Each crush is returned
     * as a list of lists
     * @returns {Array} array of crushable candies
     */
    getCandyCrushes() {
        //Utility functions for removing intersects
        function someMatch(list1,list2){
            var someMatch = false;
            for(let i = 0; i < list1.length && !someMatch; i++){
                var e1 = list1[i];
                for (let j = 0; j < list2.length && !someMatch; j++){
                    var e2 = list2[j];
                    if(e1 == e2){
                        someMatch = true;
                        break;
                    }
                }
            }
            return someMatch;
        }

        function mergeMatch(list1,list2){
                var result_array = [];
                var arr = list1.concat(list2);
                var len = arr.length;
                var assoc = {};

                for(let i = 0; i < len; i++){
                    let item = arr[i];

                    if(!assoc[item]){
                        result_array.unshift(item);
                        assoc[item] = true;
                    }
                }
                return result_array;
        }

        var allMatches = this.getMatchingStrips();

        //Check for intersects
        for (var j = 0; j < allMatches.length; j++) {
            var set = allMatches[j];
            var setNext = null;
            if(j+1 < allMatches.length){
                setNext = allMatches[j + 1];
            }

            //compare and merge
            if(setNext && someMatch(set,setNext)){
                allMatches.push(mergeMatch(set,setNext));
                allMatches.splice(j,2);
            }

        }
        return allMatches;
    }

    /** 
    *   Deletes all candies in listOfListsOfCrushes. If the game has already began, incremements 
    *   the board score. Does not move the candies down at all. 
    *   @param {Array} listOfListsOfCrushes
    */
    removeCrushes(crushesList) {
        for (let i = 0; i < crushesList.length; i++) {
            var list = crushesList[i];
            for(let k = 0; k < list.length; k++){
                if (this.scoring) {
                    this.board.incrememtScore(list[k], list[k].row, list[k].col);
                }
                this.board.remove(list[k]);
            }                        
        }
    }

    /**
    *   Moves candies down as far as there are spaces. Issues calls to Board.moveTo which generates move 
    *   events. If there are holes created by moving the candies down, populates the board with new random candies
    */
    moveCandiesDown() {
        for(let col = 0; col < this.board.getSize(); col++){
            //Get lowest empty row
            var lowestEmptyRow = null;

            for (let row = 0; row < this.board.getSize(); row++) {
                var candy = this.board.getCandyAt(row,col);
                if(!candy) lowestEmptyRow = row;
                break;
            }
        }

        //Move candies down 
        for(var row=lowestEmptyRow; row >= 0; row--){
            var candy = this.board.getCandyAt(row, col);
            if(candy){
                this.board.moveTo(candy, lowestEmptyRow, col);
                lowestEmptyRow--;
            } 
        }

        //if there are any remaining empty rows, add random candies
        for(; lowestEmptyRow >= 0; lowestEmptyRow--){
            this.board.addRandomCandy(lowestEmptyRow,col,-1,col);
        }        
    }

    /**
    *   Returns a list of candies that would be crushed if fromCandy were to be moved in the direction
    *   specified by direction. If no candies are to be crushed, returns an empty list.  
    *   @param {Candy} fromCandy
    *   @param {String} direction
    *   @param {Array} list of crushes
    */
    getCandiesToCrushGivenMove(fromCandy, direction) {
        var flipCandy = this.board.getCandyInDirection(fromCandy,direction);

        //For candy edges and same color candies
        if(!flipCandy || flipCandy.color == fromCandy.color ) return [];

        //temporarily flip the candies
        function swap(candy1,candy2,board){
            var fromRow = candy1.row;
            var fromCol = candy1.col;
            var toRow = candy2.row;
            var toCol = candy2.col;
            board.square[toRow][toCol] = candy1;
            candy1.row = toRow
            candy1.col = toCol;
            board.square[fromRow][fromCol] = candy2;
            candy2.row = fromRow
            candy2.col = fromCol;
        }
        swap(fromCandy,flipCandy,this.board);
        var crushes = this.getCandyCrushes();
        swap(flipCandy, fromCandy,this.board);

        
        return crushes;
    }

    /**
    *   Returns number of sets of candies that would be crushed if the candy was moved in the specified
    *   direction
    * @param {Candy} fromCandy
    * @param {String} direction
    * @returns {Number} Number of sets of candies that are crushable
    */
    numberCandiesCrushedByMove(fromCandy, direction) {
        return this.getCandiesToCrushGivenMove(fromCandy, direction).length;
    }

    /*
       Utility functions

    */

    /** 
    *If there is a valid move on the board, returns an object with two properties: candy: a candy that can be moved 
    *and direction: the direction to be moved. If there are no valid moves, returns null. The move is selected 
    *randomly from available moves. 
    * @returns {Object | null} Object | null
    */
    getRandomValidMove() {
        //Have to check for every candy, valid moves
        var directions = ['up','down','right','left'];
        var validNormal = [];
        var validExtra = [];

        this.board.square.forEach(element => {
            element.forEach(candy =>{
                for (let i = 0; i < directions.length; i++) {
                    if (this.isMoveTypeValid(candy, directions[i]) ){
                        var crushes = this.getCandiesToCrushGivenMove(candy,directions[i])[0];

                        if(crushes.length == 3){
                            validNormal.push({candy:candy,direction:directions[i]});
                        } else if (crushes.length > 3){
                            validExtra.push({ candy: candy, direction: directions[i] });
                        }
                    }
                }
            });            
        });

        if(!validExtra || !validNormal){
            return null;
        }else if(validExtra.length > 0){
            //pick a random validExtra
            return validExtra[Math.floor(Math.random()*validExtra.length)];
        }else{
            //pick a random validNormal
            return validNormal[Math.floor(Math.random() * validNormal.length)];
        }
    }

    /**
     * @returns {Array} list of all matching candies
     */
    getMatchingStrips() {
        var allMatches = [];

        function getRow(index,board){
            return board.square[index];
        }

        function getColumn(index,board) {
            var column = [];
            board.square.forEach(element => {
                column.push(element[index]);
            });
            return column;
        }

        function checkMatchingStrips(someSet) {
            for (let y = 0; y < someSet.length; y++) {
                var candies = [];
                var candy = someSet[y];
                candies.push(candy);

                while (y + 1 < someSet.length) {
                    var candyNext = someSet[y+1];

                    if (candy.color == candyNext.color) {
                        candies.push(candyNext);
                        y++;
                    } else {
                        break;
                    }
                }
                if (candies.length > 2) {
                    allMatches.push(candies);
                }
            }
        }
        
        //Get matching candies in a row
        for (let row = 0; row < this.board.getSize(); row++) {
            checkMatchingStrips(getRow(row, this.board));
        }

        //Get matching candies in a column
        for (let col = 0; col < this.board.getSize(); col++) {
            checkMatchingStrips(getColumn(col, this.board))
        }
        
        return allMatches;
    }

    /**
     * Populates board with random candies
     */
    populateBoard() {
        for (var row = 0; row < this.board.getSize(); ++row) {
            for (var col = 0; col < this.board.getSize(); ++col) {
                if (this.board.isEmptyLocation(row, col)) {
                    this.board.addRandomCandy(row, col, -1, -1);
                }
            }
        }
    }

    /**
    *   prepares new game with no sets of crushable candies. Sets the score to zero so that player doesn't 
    *   get crushes by luck 
    */
    prepareNewGame() {
        this.board.score = 0;
        this.scoring = false;

        var crushesPresent = true;
        while(crushesPresent){
            this.populateBoard();
            var crushesList = this.getCandyCrushes();
            if(crushesList.length == 0) crushesPresent = false;
            this.removeCrushes(crushesList);
        }
        this.scoring = true;        
    }

}