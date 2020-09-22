/*global FIND_SOURCES ERR_NOT_IN_RANGE FIND_STRUCTURES STRUCTURE_CONTAINER RESOURCE_ENERGY _ Game RoomPosition */

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, state) {
        if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
        }
        else if(creep.carry.energy < 50) {
            creep.memory.harvesting = true;
        }

        if(creep.memory.harvesting) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.target.source]) == ERR_NOT_IN_RANGE) {
                const pos = new RoomPosition(creep.memory.target.x, creep.memory.target.y, creep.room.name);
                creep.moveTo(pos, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            if (state.containersCount < 3) {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
            else {
                var containerTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                             _.sum(structure.store) < structure.storeCapacity
                    }
                });
                if(containerTargets.length > 0) {
                    if(creep.transfer(containerTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containerTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }
};

module.exports = roleHarvester;

