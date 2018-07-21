class Candy{
    constructor(color, uniqueId){
        this.color =color
        this.row = null;
        this.column = null;

        //immmutable field uniqueId
        Object.defineProperty(this,"uniqueId",{
            configurable:false,
            writable:false,
            value:uniqueId

        });
        Object.defineProperty(this,"color",{
            configurable:false,
            writable:false,
            value:color

        });
       


    }
    Colors =[
    
            'red' , 'yellow',
             'green', 'orange', 
             'blue','purple'
    ]

    get row(){
        return this.row;
    }

    set row(row){
        this.row = row;
    }

    get column(){
        return this.column;
    } 

    set column(column){
        this.column = column;
    }

    toString(){
        String(this.Candy);
    }
  
  
    
}



    

