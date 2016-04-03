// a creature instance contains all status
var Species = function (typeID = 0) {
    //this.speciesId = 0;
    //this.color = 'blue';
    
    // // features (static)
    // this.energy_cost = 1;
    // this.energy_gain = 0;
    
    // this.attack = 0;
    

    
    this.creature = null;
    
    // static
    this.features = [];
    
    
    this.mutation = 0;
    
        
    
    //init
    this.initPreset(typeID);
    
    //test gui
    var gui = new dat.GUI();
    //gui.add(this, 'mutation');
    gui.add(this.creature, 'color');
    gui.add(this.creature, 'energy', 1, 50);
    gui.add(this.creature, 'hp', 1, 50);
    gui.add(this.creature, 'energy_cost', 0, 10);
    gui.add(this.creature, 'energy_gain', 0, 10);
    gui.add(this.creature, 'attack', 0, 10);
    gui.add(this.creature, 'reproduce', 1, 5);
    gui.add(this.creature, 'size', 1, 5);
};

// Creature.prototype.updateFeatures = function () {
//     //update features/ability due to environments, neighbours, enemy
    
//     // e.g. features 
// };

Species.prototype.initPreset = function (typeID) {
    this.creature = new Creature();
    switch(typeID) {
        case 0:
            this.creature.init(0, 'blue', 15, 10, 1, 0, 1);
            break;
        case 1:
            this.creature.init(1, 'rgb(255,100,100)', 15, 15, 2, 0, 2);
            break;
        case 2:
            this.creature.init(2, 'rgb(200,200,0)', 3, 2, 1, 2, 0);
            this.features.push('Photosynthesis');
            break;
    }  
};