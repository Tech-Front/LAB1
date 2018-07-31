/**
 *
 *
 * @class Rules
 */
class Rules {
    /**
     *Creates an instance of Rules.
     * @param {Board} board
     * @memberof Rules
     */
    constructor(board) {
        this.board = board;
        this.scoring = false;
    }
    /**
     * Returns true if flipping fromCandy with the candy in the direction
     * specified (["up", "down", "left", "right"]) is valid
     * (according to the rules), else returns false.
     *
     *
     *
     * @param {Candy} fromCandy
     * @param {string} direction
     * @memberof Rules
     */
    isMoveTypeValid(fromCandy, direction) {
        //Your code here
    }


    /**
     * Returns a list of all candy crushes on the board. A crush is a list of three
     * candies in a single row or column that have the same color. Each crush is returned 
     * as a list of lists
     *
     *
     * @memberof Rules
     */
    getCandyCrushes() {
        //Your code here
    }


    /**
     * Deletes all candies in listOfListsOfCrushes. If the game has already began, incremements 
     * the board score. Does not move the candies down at all. 
     *
     *
     * @param {*} listOfListsOfCrushes
     * @memberof Rules
     */
    removeCrushes(listOfListsOfCrushes) {
        //Your code here 
    }


    /**
     * Moves candies down as far as there are spaces. Issues calls to Board.moveTo which generates move 
     * events. If there are holes created by moving the candies down, populates the board with new random candies
     *
     *
     * @memberof Rules
     */
    moveCandiesDown() {
        //Your code here 
    }

    /**
     * If there is a valid move on the board, returns an object with two properties: candy: a candy that can be moved 
     * and direction: the direction to be moved. If there are no valid moves, returns null. The move is selected 
     * randomly from available moves.
     *
     *
     * @memberof Rules
     */
    getRandomValidMove() {
        //Your code here
    }


    /**
     * Populates the board with random candies
     *
     * @memberof Rules
     */
    populateBoard() {
        //Your code here
    }

    /**
     * Returns a list of candies that would be crushed if fromCandy were to be moved in the direction
     * specified by direction. If no candies are to be crushed, returns an empty list.  
     *
     *
     * @param {*} fromCandy
     * @param {*} direction
     * @memberof Rules
     */
    getCandiesToCrushGivenMove(fromCandy, direction) {
        //your code here
    }

    /**
     * Returns number of sets of candies that would be crushed if the candy was moved in the specified
     * direction
     *
     * @param {*} fromCandy
     * @param {*} direction
     * @memberof Rules
     */
    numberCandiesCrushedByMove(fromCandy, direction) {
        //Your code here
    }

    /**
     * prepares new game with no sets of crushable candies. Sets the score to zero so that player doesn't 
     * get crushes by luck
     *
     *
     * @memberof Rules
     */
    prepareNewGame() {
        //Your code here 
    }
}