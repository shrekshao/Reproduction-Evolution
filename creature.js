// a creature instance contains all status
var Creature = function () {
    this.speciesId = 0;
    this.color = 'blue';
    
    // status
    this.energy = 0;
    this.hp = 0;
    
    // features (static)
    this.energy_cost = 1;
    this.energy_gain = 0;
    
    this.attack = 0;
    
    // static
    this.features = [];

};

Creature.prototype.updateFeatures = function () {
    //update features/ability due to environments, neighbours, enemy
    
    // e.g. features 
};

Creature.prototype.updateStatus = function () {
    this.energy -= this.energy_cost;
    this.energy += this.energy_gain;
    
};

Creature.prototype.dieCheck = function () {
    if (this.energy <= 0 || this.hp <= 0) {
        //TODO: this creature dies
        console.log("die");
        return true;
    }
    return false;
}

Creature.prototype.affectedByNeighbour = function (neighbour) {
    if(neighbour) {
        if(neighbour.speciesId !== this.speciesId) {
            this.beAttacked(neighbour.attack);
        }
    }
    
};

Creature.prototype.beAttacked = function (attack) {
    this.hp -= attack;
};