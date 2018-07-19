class Candy {
  constructor(row,column,colour,Id) {
   this.colour="red";
    this.Id=01;
    this.row=NULL;
    this.column=NULL;

  }

}
candy.prototype.getRowColumn = function (rowl,columnl) {
  this.row=rowl;
  this.column=columnl;

};
let check=[][];
check [0][0]=new Candy;
candy.getRowColumn(0,0);
console.log(check[0][0].colour);
