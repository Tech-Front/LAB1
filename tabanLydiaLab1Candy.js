//ADT for Candy data type
class Candy{
    constructor(color, uniqueID){
       this.color = color;
       this.uniqueID =uniqueID; 
    }
    //field for mutable row values initialized to null
    row() {
        return this.row = null;
    }
    //field for mutable column values initialized to null
    column() {
        return this.column = null;
    }
    //field containing list for mutable color values initialized to null
    candyColors(){
        this.candyColors = ['red', 'yellow', 'green', 'orange'];
    }

    //getter method returning string rep of candy
    get CandyRep(){
        var candy =this.Candy();
        return candy;
    }

    //setter method creating string representation of Candy
    set candyString(stringMe){
        return this.Candy.toString();
    }
};


