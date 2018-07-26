//i have tried to do most functions as specifified . hope it makes sense

 class Candy {
  constructor(colour,Id) {
   this.colour=colour;
    this.Id=Id;
    this.row;
    this.column;
    }
      getRow  () {
    return this.row;
    };
      setRow (rowl) {
      this.row=rowl;
    };
     getColumn () {
      return this.column;
    };
     setColumn  (columnl) {
      this.column=columnl;

    };
    tostring (){
      let v=this.colour+this.Id+this.row+this.col;
      return v;
    }

};
 class Board {
  constructor(length) {
    this.board;
    this.length=length;
    this.identifier=0;
    this.board=Array(length);
    this.score=0;
    for(let counter1=0;counter1<length;counter1++){
      this.board[counter1]=Array(length);
    };

 this.addCandy = new Event("add");
 this.ScoreUpdate =  new Event("ScoreUpdate");
 this.removeCandy= new Event("removeCandy");
 this.move=new Event("move");

};
}


Board.prototype.isValidLocation = function (row,column) {
  if((row<this.length)&&(column<this.length)){
    return true;
  }
    else{
      return false;
    }


};
Board.prototype.isEmptyLocation = function (row,column) {
  if (this.board[row][column]==null){
    return false;
  }
  else{
    return true;
  }

};
Board.prototype.getBoardSize = function () {
  return this.length
};

Board.prototype.getCandyAt = function (row,column) {
  return this.board[row][column];
};
Board.prototype.getLocationOf = function (idGiven) {
  let flag=0;
  for(let i =0;i<this.length;i++){
    for(let j=0;j<this.length;j++){
      if (this.board[i][j]!=null){
      if(this.board[i][j].Id==idGiven){
         //console.log("row is"+i+"column is "+j);
         let location=[i,j]
         return location;
         flag=1;
       }
      }
    }
  }
  if (flag==0){
    console.log("null")
    return 'object not on board';
  }
};
Board.prototype.getAllCandies = function () {
  for(let i =0;i<this.length;i++){
    for(let j=0;j<this.length;j++){
      console.log("candy at "+"row "+i+" column "+j+" is "+this.board[i][j].colour+" id "+this.board[i][j].Id);
      }
    }


};
/*Board.prototype.add = function (candy,row,col,spawnrow,spawncol) {
  thhis.board[row][col]=candy;*/

//};//not too sure what is to be happenning here
Board.prototype.moveTo = function (candy,toRow,toCol) {
  let temp;
  for(let i =0;i<this.length;i++){
    for(let j=0;j<this.length;j++){
      if(this.board[i][j]!=null){
      if(this.board[i][j].Id==candy){
         temp=this.board[i][j];
         this.board[i][j]=null;
       }
      }
    }
  }
  if (this.board[toRow][toCol]==null)
  {
    this.board[toRow][toCol]=temp;
    window.addEventListener('move', function () { }, false);
  window.dispatchEvent(this.move);
  }
};
Board.prototype.remove = function (candy) {
  for(let i =0;i<this.length;i++){
    for(let j=0;j<this.length;j++){
      if(this.board!=null){
      if(this.board[i][j].Id==candy){
         this.board[i][j]=null;
         window.addEventListener('removeCandy', function () { }, false);
       window.dispatchEvent(this.removeCandy);
      }
    }
  }
  }
};
Board.prototype.removeAt = function (row,col) {
  this.board[row][col]=null;
  window.addEventListener('removeCandy', function () { }, false);
window.dispatchEvent(this.removeCandy);
};
Board.prototype.clear =function(){
  board.map(x=>null);
}
Board.prototype.addRandomCandy =function(row,col,spawncol,spawnrow){
let colours=["red","orange","yellow","green","blue","purple"];
let x=Math.floor(Math.random()*5)
  this.board[row][col]=new Candy(colours[x],this.identifier);
  this.identifier++;
  window.addEventListener('add', function () { }, false);
window.dispatchEvent(this.addCandy);
}
Board.prototype.addCandy  = function (color, row, col, spawnRow, spawnCol) {
  this.board[row][col]=new Candy(color,this.identifier);
  this.identifier++;
  window.addEventListener('add', function () { }, false);
window.dispatchEvent(this.addCandy);

};


Board.prototype.getCandyInDirection = function (fromCandy,direction) {

   let location=this.getLocationOf(fromCandy);

   if (direction=='up'){
     if (location[0]!=0){
     let frow=location[0]-1;
     let fcol=location[1];
    return this.board[frow][fcol];
    }
   }
   else if(direction=='down'){
     if (location[0]!=this.length-1){
       let frow=location[0]+1;
       let fcol=location[1];
      return this.board[frow][fcol];
     }
   }
   else if(direction=='left'){
     if (location[1]!=0){
     let frow=location[0];
     let fcol=location[1]-1;
    return this.board[frow][fcol];
    }

   }
   else if(direction=='right'){
     if (location[1]!=this.length-1){
       let frow=location[0];
       let fcol=location[1]+1;
      return this.board[frow][fcol];
     }
   }
};
Board.prototype.flipCandies = function (candy1,candy2) {

let location1=  this.getLocationOf(candy1);
let location2=this.getLocationOf(candy2);
let temp;
temp=this.board[location1[0]][location1[1]];
this.board[location1[0]][location1[1]]=this.board[location2[0]][location2[1]];
  this.board[location2[0]][location2[1]]=temp;
};
Board.prototype.resetScore = function () {
  this.score=0;
  window.addEventListener('ScoreUpdate', function () { }, false);
window.dispatchEvent(this.ScoreUpdate);
};
Board.prototype.incrementScore = function (candy,row,col) {
  this.score+=1;
  window.addEventListener('ScoreUpdate', function () { }, false);
window.dispatchEvent(this.ScoreUpdate);
};
Board.prototype.incrementScore = function (candy,row,col) {
  return this.score;
};

Board.prototype.initializeBoard=function(){
  for(let counter1=0;counter1<this.length;counter1++){
    for(let counter2=0;counter2<this.length;counter2++){
      this.addRandomCandy(counter1,counter2);
    }
  }
}


Candyboard=new Board(7);
let cheking=Candyboard.isValidLocation(9,9);
let decision=Candyboard.isEmptyLocation(2,2);
Candyboard.addRandomCandy(2,2)
let tester=Candyboard.getCandyAt(2,2);
Candyboard.initializeBoard();
Candyboard.getAllCandies();
console.log(tester);
Candyboard.resetScore();
