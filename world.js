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


var World = function() {
     
     this.grid = [];
     this.preGrid = [];
     
     this.xCells = 900;
     this.yCells = 500;
     
};

World.prototype.initWorld  = function (x, y) {
    this.x = x;
    this.y = y;
    
    this.grid = createArray(x, y);
    this.preGrid = createArray(x, y);
    
    //test
    this.grid[2][3] = new Creature();
    this.grid[2][3].hp = 10;
    this.grid[2][3].energy = 0;
    this.grid[2][3].attack = 0;
    
    this.grid[3][3] = new Creature();
    this.grid[3][3].hp = 10;
    this.grid[3][3].energy = 3;
    this.grid[3][3].speciesId = 1;
    this.grid[3][3].attack = 12;
    
    //TODO
};

World.prototype.neighbourEffect = function (x, y, me) {
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
    for (i = 0; i < numNeighbours; i++) {
        xn = neighbours[i][0];
        yn = neighbours[i][1];
        
        if(this.preGrid[xn][yn])
        {
            //me.affectedByNeighbour(this.preGrid[xn][yn].creature);
            me.affectedByNeighbour(this.preGrid[xn][yn]);
        }
    }
};

World.prototype.update = function () {
    //var tmp = this.preGrid;
    
    // Alert: this is not correct actually
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
            if(this.grid[x][y]) {
                //this.neighbourEffect(x, y, this.grid[x][y].creature);
                this.neighbourEffect(x, y, this.grid[x][y]);
            }
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
                    this.grid[x][y] = null;
                }
            }
        }
    }
};