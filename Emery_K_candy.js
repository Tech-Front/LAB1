class Candy{
	constructor(Color, uniqueID){
		this.color = color;
		this.uniqueID = uniqueID;
		this.row = null;
		this.column = null;
		this.colors = ["red" , "yellow", "green", "orange", "blue", "purple"];
	}
}

toString(){
}


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
