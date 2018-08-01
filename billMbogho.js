//i have tried to do most functions as specifified . hope it makes sense

 class Candy {
  constructor(colour,Id) {
   //this.colour=colour;
    //this.Id=Id;
    this.row=null;
    this.column=null;
    Object.defineProperty(this, 'id', {
        value: Id,
        writable: false
      });

      Object.defineProperty(this, 'color', {
          value: colour,
          writable: false
        });
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
