var roleTransferer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.transfering = true;
        }
        else if(creep.carry.energy == 0) {
            creep.memory.transfering = false;
        }

        if(!creep.memory.transfering) {
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                         _.sum(structure.store) > 100
                }
            });

            if(containers.length > 0) {
                if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0]);
                }
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else
            {
                creep.moveTo(Game.flags['TransfererFlag'], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleTransferer;

