// Abstraction for immutable objects
class Immutable {
    constructor(item){
        this.value = item;
    }
}

// The Candy
class Candy {
    constructor(color, uniqueId) {
        this.color  = Object.freeze(new Immutable(color));
        this.id     = Object.freeze(new Immutable(uniqueId));
        this.row    = null;
        this.column = null;
    }
    set(property, value){
        if (this.hasOwnProperty(property)) {
            let oldValue = this[property];
            this[property] = value;
            return oldValue;
        }
        this[property] = value;
        return this[property];
    }
    get(property) {
        return this[property];
    }
    print(){
        return this.toString();
    }
}

// Candy colors
const candyField = ["red", "yellow", "green", "blue", "orange", "purple"];


let candy = new Candy("Blue", 1);
console.log(candy);


candy.set("color", "green");

console.log(candy);
