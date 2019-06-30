let newBoard = new Board(5);

// function for generating random candies for testing purposes
randomCandy = () => {
    colors = ["red", "yellow", "green", "orange", "blue", "purple"];
    randomColor = colors[Math.floor(Math.random() * colors.length)];
    randomId = Math.floor(Math.random() * 100);
    candy = new Candy(randomColor, randomId);
    return candy;
}

// filling the board with random candies


// newBoard.cells.forEach(row => {
//     row.forEach(cell => {
//         candy = randomCandy();
//         newBoard.add(candy, 1, 2, 3, 4);
//     });
// });

candy = randomCandy();
newBoard.add(candy, 1, 2, 3, 4);

newBoard.getAllCandies();
console.log(newBoard);

console.log(newBoard.isValidLocation(5, 5));
console.log(newBoard.isValidLocation(8, 1));
console.log(newBoard.isValidLocation(3, 3));

console.log(newBoard.isEmptyLocation(3, 3));
console.log(newBoard.getBoardSize());