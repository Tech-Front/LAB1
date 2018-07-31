/**
 * Representation of a candy on board(which are mutable)
 */
class Candy{
    /**
     * 
     * @param {String} color of candy
     * @param {String} uniqueID representing candy
     */
    constructor(color,id){
        //Immutable fields
        Object.defineProperty(this,"color",{
            value:color,
            writable: false
        });
        Object.defineProperty(this, "id", {
            value: id,
            writable: false
        });

        //Other fields
        this.row = null;
        this.col = null;
    }
    
    //Getter and setter methods for the row and column properties
    get row(){
        return this._row;
    }

    set row(value){
        this._row = value;
    }

    get col(){
        return this._col;
    }

    set col(value){
        this._col=value;
    }

    /**
     * @returns {String} representation of the Candy
     */
    toString(){
        return ("ID: "+this.id+" Color: "+this.color+
    "\nPosition-> row: "+this.row+" column: "+this.col );
    }
}
/**
 * A list of colors that a candy can be
 */
Candy.colors = [
    'red',
    'yellow',
    'green',
    'orange',
    'blue',
    'purple'
];