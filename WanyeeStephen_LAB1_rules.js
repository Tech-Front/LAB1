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
        this.numberCandiesCrushedByMove(fromCandy,direction) > 0;
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
        //
        var parentCandy = {};
        var sizes = {};

        function find(candy){
            var parent = parentCandy[candy];
            if(parent == null) return candy;
            parent = find(parent);
            parentCandy[candy] = parent; //Path compression; make all candies point to root 
            return parent;
        }
        
        function size(someSet) {
            return sizes[someSet] || 1;
        }

        function union(candy1,candy2){
            //get parents
            var parent1 = find(candy1);
            var parent2 = find(candy2);

            if(parent1 == parent2) return parent1;

            parentCandy[parent2] = parent1;
            sizes[parent1] = size(parent1) + size(parent2);
            delete size[parent2];
        }

        var allMatches = this.getMatchingStrips();
        // Utilising the disjoint set algorithm to unionize the sets
        for (var j = 0; j < allMatches.length; j++) {
            var set = allMatches[j];
            for (var k = 1; k < set.length; k++) {
                union(set[0].id, set[k].id)
            }
        }
        //Get the list of lists
        var results = {}
        for (let row = 0; row < board.boardSize; row++) {
            for (let col = 0; col < board.boardSize; col++) {
                var candy = board.getCandyAt(row, col);
                if (candy) {
                    var parent = find(candy.id);
                    if (size(parent) >= 3) {
                        if (!(parent in results)) results[parent] = [];
                        results[parent].push(candy);
                    }
                }
            }
        }
        // Make the matches to be in a list of lists
        var crushableCandies = [];
        for (var key in results) {
            crushableCandies.push(results[key]);
        }

        return crushableCandies;
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

        //For candie edges and same color candies
        if(!flipCandy || flipCandy.color == fromCandy.color ) return [];

        //temporarily flip the candies
        function swap(candy1,candy2){
            var fromRow = candy1.row;
            var fromCol = candy1.col;
            var toRow = candy2.row;
            var toCol = candy2.col;
            this.board.square[toRow][toCol] = candy1;
            candy1.row = toRow
            candy1.col = toCol;
            this.board.square[fromRow][fromCol] = candy2;
            candy2.row = fromRow
            candy2.col = fromCol;
        }
        swap(fromCandy,flipCandy);
        var crushes = this.getCandyCrushes();
        swap(flipCandy, fromCandy);

        //As a precaution, filter out the crushes that relate to the move
        var filteredCrushes = crushes.filter(set => {
            var moveCandies = [fromCandy,flipCandy];
            moveCandies.forEach(element => {
                return set.includes(element);
            });
        });
        return filteredCrushes;
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
     * @returns {Array} list of all matching candies
     */
    getMatchingStrips() {
        var allMatches = [];

        //Get matching candies in a row 
       for(let row=0; row<this.board.getSize(); row++){
           for(let next,col= 0; col<this.board.getSize(); col = next){
               var candies = [];
                var candy = this.board.getCandyAt(row,col);
                next = col+1;
                if(!candy)continue;
                candies.push(candy);

                while(next < this.board.getSize()){
                    var candyNext = this.board.getCandyAt(row,next);

                    if(candy.color == candyNext.color){
                        candies.push(candyNext);
                        next++;
                    }else{
                        break;
                    }
                }
               if (candies.length > 2) {
                   allMatches.push(candies);
               }
           }           
       }

        //Get matching candies in a column
        for (let col = 0; col < this.board.getSize(); col++) {
            for (let next, row = 0; row < this.board.getSize(); row = next) {
                var candies = [];
                var candy = this.board.getCandyAt(row, col);
                next = row + 1;
                if (!candy) continue;
                candies.push(candy);

                while (next < this.board.getSize()) {
                    var candyNext = this.board.getCandyAt(next, col);

                    if (candy.color == candyNext.color) {
                        candies.push(candyNext);
                        next++;
                    } else {
                        break;
                    }
                }
                if (candies.length > 2) {
                    allMatches.push(candies);
                }
            }            
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
                    this.board.addRandomCandy(row, col);
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

        while(true){
            this.populateBoard();
            var crushesList = this.getCandyCrushes();
            if(crushesList.length == 0) break;
            this.removeCrushes(crushesList);
        }
        this.scoring = true;        
    }

}

var board = new Board(6);
var rules = new Rules(board);

rules.prepareNewGame();
console.log(rules.board.toString());

console.log(rules.getCandyCrushes());
