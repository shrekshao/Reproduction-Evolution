function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}


// var Grid = function() {
    
//     this.creature = null;
    
//     this.prototype.getColor = function() {
//         if(this.)
//     };
// };
function reproduceArrayDecay(v, id, ary) {
    // if(ary[id]) {
    //     ary[id] -= 1;
    // } else {
    //     ary[id] = 0;
    // }
    ary[id] -= 1;
    if(ary[id] < 0) {
        ary[id] = 0;
    }
    
}

var EnvironmentGrid = function () {
    //this.reproduceArray = [];
    this.reproduceArray = createArray(3);
    this.food = 0;
    
};

EnvironmentGrid.prototype.decay = function () {
    this.reproduceArray.forEach(reproduceArrayDecay);
    
    if(this.food > 0) {
        this.food -= 1;
    }
    
};

//--------------------


var World = function() {
     
     this.grid = [];
     this.preGrid = [];
     
     this.environmentGrid = [];
     
     this.xCells = 0;
     this.yCells = 0;
     
     // species in this world
     // [0] is the player
     this.speciesArray = [];
     
     
     //test
     this.curGenSpeciesId = 0;
};

World.prototype.initWorld  = function (x, y) {
    this.xCells = x;
    this.yCells = y;
    
    this.grid = createArray(x, y);
    this.preGrid = createArray(x, y);
    
    this.environmentGrid = createArray(x,y);
    var i,j;
    for (i = 0; i < this.xCells; i++) {
        for (j = 0; j < this.yCells; j++) {
            //this.neighbourEffect(i, j, this.grid[i][j]);
            this.environmentGrid[i][j] = new EnvironmentGrid();
        }
    }
    //test
    
    
    this.speciesArray = [new Species(0), new Species(1), new Species(2)]; 
    var player = this.speciesArray[0];
    
    
    this.grid[2][3] = jQuery.extend(true, {}, player.creature);
    // this.grid[2][3] = new Creature();
    // this.grid[2][3].hp = 10;
    // this.grid[2][3].energy = 0;
    // this.grid[2][3].attack = 0;
    
    this.grid[3][3] = jQuery.extend(true, {}, this.speciesArray[1].creature);
    // this.grid[3][3] = new Creature();
    // this.grid[3][3].hp = 10;
    // this.grid[3][3].energy = 3;
    // this.grid[3][3].speciesId = 1;
    // this.grid[3][3].attack = 12;
    // this.grid[3][3].color = 'green';
    
    
    
    
    
    
    //TODO
};

World.prototype.generateCell = function (x,y, speciesId) {
    this.grid[x][y] = jQuery.extend(true, {}, this.speciesArray[speciesId].creature);
};



World.prototype.getColor = function (x, y, offColor) {
    return this.grid[x][y] ? this.grid[x][y].color : offColor;
};


World.prototype.neighbourEffect = function (x, y, me) {
    
    // if(this.environmentGrid[x][y]) {
        //try{
            this.environmentGrid[x][y].decay();
        //}
        //catch(e){
        //    console.log(x,y);
        //}
    // }
    // else
    // {
    //     console.log(x,y);
    // }
    
    var neighbours = [
        [x, (y - 1 + this.yCells) % this.yCells],
        [(x + 1 + this.xCells) % this.xCells, (y - 1 + this.yCells) % this.yCells],
        [(x + 1 + this.xCells) % this.xCells, y],
        [(x + 1 + this.xCells) % this.xCells, (y + 1 + this.yCells) % this.yCells],
        [x, (y + 1 + this.yCells) % this.yCells],
        [(x - 1 + this.xCells) % this.xCells, (y + 1 + this.yCells) % this.yCells],
        [(x - 1 + this.xCells) % this.xCells, y],
        [(x - 1 + this.xCells) % this.xCells, (y - 1 + this.yCells) % this.yCells]
    ];
    
    var numNeighbours = neighbours.length;
    var xn, yn;
    var i, creature;
    
    //var reproduction_ary = [];
    
    for (i = 0; i < numNeighbours; i++) {
        xn = neighbours[i][0];
        yn = neighbours[i][1];
        
        if(this.preGrid[xn][yn])
        {
            //me.affectedByNeighbour(this.preGrid[xn][yn].creature);
            if(me) {
                me.affectedByNeighbour(this.preGrid[xn][yn]);
                me.affectedByEnvironment(this.environmentGrid[xn][yn]);
            }
            else {
                //me doesn't exist
                //reproduce
                // if(!this.environmentGrid[x][y]) {
                //     this.environmentGrid[x][y] = new EnvironmentGrid();
                // }
                
                var a = this.environmentGrid[x][y].reproduceArray[this.preGrid[xn][yn].speciesId] || 0;
                a += this.preGrid[xn][yn].reproduce;
                
                if (a > 8) {
                    this.generateCell(x,y, this.preGrid[xn][yn].speciesId);
                    a = 0;
                }
                
                this.environmentGrid[x][y].reproduceArray[this.preGrid[xn][yn].speciesId] = a;
                
                
                // reproduction_ary[this.preGrid[xn][yn].speciesId ] += this.preGrid[xn][yn].reproduce;
            }
        }
    }
};

World.prototype.update = function () {
    //var tmp = this.preGrid;
    
    // !!!Alert: this is not correct actually
    // some changes first
    this.preGrid = this.grid;
    //this.grid = this.preGrid;
    
    var x, y;
    
    // function die(){
    //     this.grid[x][y] = null;
    // }
    
    // neighbour effect, modify grid based on preGrid(actually grid)
    for (x = 0; x < this.xCells; x++) {
        for (y = 0; y < this.yCells; y++) {
            // if(this.grid[x][y]) {
            //     //this.neighbourEffect(x, y, this.grid[x][y].creature);
            //     this.neighbourEffect(x, y, this.grid[x][y]);
            // }
            this.neighbourEffect(x, y, this.grid[x][y]);
        }
    }
    
    // update grid, die, starve...
    var me;
    for (x = 0; x < this.xCells; x++) {
        for (y = 0; y < this.yCells; y++) {
            me = this.grid[x][y];
            if(me) {
                me.updateStatus();
                if(me.dieCheck())
                {
                    this.environmentGrid[x][y].food += this.grid[x][y].size * 5;
                    this.grid[x][y] = null;
                    
                }
            }
        }
    }
};