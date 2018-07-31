//ADT for Candy data type
class Candy{
    constructor(color, uniqueID){
       Object.defineProperty(this, 'color', {
           value: color,
           writable: false
       });

       Object.defineProperty(this, 'uniqueID', {
           value: color,
           writable: false
       });

       this.row = null;
       this.col = null;
    }

    //field containing list for mutable color values initialized to null
    candyColors(){
        Candy.colors = ['red', 'yellow', 'green', 'orange', 'blue', 'purple'];
    }

    //getter method returning string rep of candy
    get candyRep(){
        return this.row;
        return this.col;
    }

    //setter method returning string rep of candy
    set candyRep(rowVal, colVal){
        return this.row = rowVal;
        return this.col = colVal;
    }

    candyToString(){
        return ("Unique ID: " + this.uniqueID + "Color: "+this.color
    +"Position: "+ this.row + "Column " + this.col);
    }
};


