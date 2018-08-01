class Rules{
   constructor(Board){
     this.scoring=false;
     this.board=Board;

   };
   isMoveTypeValid(fromCandy, direction) {
     var rownumber=fromCandy.row;
     var columnNumber=fromCandy.column;
     var color=fromCandy.color;
     var boardSize=this.Board.BoardSize;


     if (direction=="up"){
        if(rownumber==0){
          return false;
        }
        else if( (rownumber<=2)&&(columnNumber==0)){
          if ( (this.Board[rownumber-1][1].color==color)&&(this.Board[rownumber-1][2].color==color)){
            return true;

          }
          else{
            return false;
          }

        }
        else if((rownumber>2)&&(columnNumber==0)){
          if ( (this.Board[rownumber-1][1].color==color)&&(this.Board[rownumber-1][2].color==color)){
            return true;
          }
          else if((this.Board[rownumber-2][0].color==color)&&(this.Board[rownumber-3][0].color==color)){
            return true;
          }
          else{
            return false;
          }
        }
        else if( (rownumber<=2)&&(columnNumber== boardSize-1)){
          if ( (this.Board[rownumber-1][boardSize-2].color==color)&&(this.Board[rownumber-1][boardSize-3].color==color)){
            return true;

          }
          else{
            return false;
          }
        }
          else if((rownumber>2)&&(columnNumber==boardSize-1)){
            if ( (this.Board[rownumber-1][boardSize-2].color==color)&&(this.Board[rownumber-1][boardSize-3].color==color)){
              return true;
            }
            else if((this.Board[rownumber-2][columnNumber].color==color)&&(this.Board[rownumber-3][columnNumber].color==color)){
              return true;
            }
            else{
              return false;
            }
          }
          else if ((rownumber<=2)&&(columnNumber>0)&&(columnNumber<boardSize-1)){
            if((this.Board[rownumber-1][columnNumber-1].color==color)&&(this.Board[rownumber-1][columnNumber+1].color==color)){
              return true
            }
            else if((this.Board[rownumber-1][columnNumber-1].color==color)&&(this.Board[rownumber-1][columnNumber-2].color==color)){
              return true;
            }
            else if((this.Board[rownumber-1][columnNumber+2].color==color)&&(this.Board[rownumber-1][columnNumber+1].color==color)){
              return true;
            }
            else{
              return false;
            }
          }
          else if((rownumber>2)&&(columnNumber>0)&&(columnNumber<boardSize-1)){
            if((this.Board[rownumber-1][columnNumber-1].color==color)&&(this.Board[rownumber-1][columnNumber+1].color==color)){
              return true
            }
            else if((this.Board[rownumber-1][columnNumber-1].color==color)&&(this.Board[rownumber-1][columnNumber-2].color==color)){
              return true;
            }
            else if((this.Board[rownumber-1][columnNumber+2].color==color)&&(this.Board[rownumber-1][columnNumber+1].color==color)){
              return true;
            }
            else if((this.Board[rownumber-2][columnNumber].color==color)&&(this.Board[rownumber-3][columnNumber].color==color)){
              return true;
            }
            else{
              return false;
            }

          }



   }
}
