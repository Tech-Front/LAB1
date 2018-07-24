class Candy {
	 constructor(color, uniqueId) {
        this.color = color;
		this.uniqueID = uniqueId;
		this.row = null;
		this.column = null;
    }
    toString() {
        return 'Color: ' + this.color + ', ID: ' + this.uniqueID +
          ', Row and Column: [' + this.row + '][' + this.column + ']';
    }
}
var colors = ["red" , "yellow", "green", "orange", "blue", "purple"];



get row(){
	return this.row;
}

get column(){
	return this.column;
}

set row(rowVal){
	return this.row = rowVal;
}

set column(colVal){
	return this.column = colVal;
}
