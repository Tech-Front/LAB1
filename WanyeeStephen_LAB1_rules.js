/**
 * Representation of the rules of the game
 */
class Rules {
    
    /**
     * Constructor to pass the board where rules are applied on
     * @param {Board} _board
     */
    constructor(_board){
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
        var flipCandy = this.board.getCandyInDirection(fromCandy,direction);
        
        //Get candies around it 
        var candyRight = this.board.getCandyInDirection(flipCandy,"right");
        var candyLeft = this.board.getCandyInDirection(flipCandy,"left");
        var candyRightNext = this.board.getCandyInDirection(candyRight, "right");
        var candyLeftNext = this.board.getCandyInDirection(candyLeft, "left");

        var candyUp = this.board.getCandyInDirection(flipCandy, "up");
        var candyDown = this.board.getCandyInDirection(flipCandy, "down");
        var candUpNext = this.board.getCandyInDirection(candyUp, "up");
        var candyDownNext = this.board.getCandyInDirection(candyDown,"down");

        var 
       
    }

    // /*
    //  * Crushes can only happen when three or more candies of the same color 
    //  * are aligned; horizontally or vertically
    //  */

    //  /**
    //   * Get crushes: gets all crushable candies on the board
    //   * @returns {Array} array of crushable candies
    //   */
    //  getCrushable(){
    //      var crushableCandies = [];
    //     //Loop throught the board to checking candy colors
    //     var boardSize = this.board.getBoardSize();
    //     for(let row=0; row < boardSize; row++){
    //         for(let col=0; col < boardSize; col++){
    //             //Get the candy
    //             var candy = this.board.getCandyAt(row,col);
    //             //Check the candies around it
    //             var candiesUp = this.matchingCandies(candy,"up");
    //             var candiesDown = this.matchingCandies(candy, "down");
    //             var candiesLeft = this.matchingCandies(candy, "left");
    //             var candiesRight = this.matchingCandies(candy, "right");
                
    //             //Create an object of the matching candies
    //             var theMatches = {
    //                 up : candiesUp,
    //                 down: candiesDown,
    //                 left: candiesLeft,
    //                 right: candiesRight
    //             }
    //             crushableCandies = this.pushMatchingCandies(theMatches,crushableCandies,candy);
    //         }
    //     }
    //      return crushableCandies;

    //  }

    //  /*
    //     Utility functions

    //  */

    //  /**
    //   * Checks matching candies in a certain direction 
    //   * @param {Candy} candyFrom
    //   * @param {String} direction to check matching candies
    //   * @returns {Array} matchingCandies
    //   */
    //  matchingCandies(candyFrom, direction ){
    //     var matchingCandies = [];

    //     var candy = candyFrom;
    //     var comparing = true;
    //     while(comparing){
    //         var color1 = candy.color;
    //         var candyNext = this.board.getCandyInDirection(candy, direction);
    //         var color2 = "";
    //         if (!candyNext){
    //             color2 = "";
    //         }else{
    //             color2 = candyNext.color;
    //         }
            
    //         if(color1 == color2){
    //             //add it to the matchingCandies
    //             matchingCandies.push(candyNext);
    //             candy = candyNext;
    //         }else{
    //             comparing = false;
    //         }
    //     }
    //     return matchingCandies;
    //  }

    // /**
    //  * Checks if the matching Candies array is greater than two
    //  * then adds to crushableCandies if that's the case 
    //  * @param {Object} matchingCandiesObject
    //  * @param {Array} crushableCandies
    //  * @returns {Array} crushableCandies
    //  */
    // pushMatchingCandies(theMatches, crushableCandies,candy){
    //     var crushable = crushableCandies;
        
    //     //loop through all properties of theMatches
    //     for (const direction in theMatches) {
    //         var matching = theMatches[direction];

    //         if(matching.length >= 2){
    //             //To make sure we don't repeat candies
    //             matching.forEach(element => {
    //                 if(!crushable.includes(element)){
    //                     crushable.push(element);
    //                 }
                    
    //                 //add the candy of comparison
    //                 if (!crushable.includes(candy)){
    //                     crushable.push(candy);
    //                 }
    //             });
    //         }
    //     }

    //     return crushable;
    // }   

}