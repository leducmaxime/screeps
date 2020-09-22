/*global _ Game FIND_STRUCTURES STRUCTURE_CONTAINER STRUCTURE_EXTENSION Memory */

var logicState = {

    run: function () {
        Memory.state = {};
        Memory.state.spawn = Game.spawns['Spawn1'];
        
        Memory.state.harvestersCount = _.filter(Game.creeps, (creep) => (creep.memory.role == 'harvester')).length;

        // Get number of containers build
        var containers = Memory.state.spawn.room.find(FIND_STRUCTURES, {
            filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER) }
        });

        Memory.state.containersCount = containers.length;

        var extensions = Memory.state.spawn.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION);
            }
        });

        Memory.state.energyCapacity = 300 + extensions.length * 50;
    }
};

module.exports = logicState;
