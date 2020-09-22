var tools = require('tools');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('build');
        }

        if(creep.memory.building) {
            var buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
            var repairTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: function(object){
                        return (object.hits < object.hitsMax);
                    }
                }
            );

            if(buildTargets.length) {
                if(creep.build(buildTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if(repairTargets.length) {
                if(creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else
            {
                creep.moveTo(Game.flags['BuilderFlag'], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            // var sources = creep.room.find(FIND_SOURCES);
            // if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            // }

            const pwhs = tools.getPositionsWithoutHarvester();
            if(pwhs.length == 0) {
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN)
                    }
                });
    
                console.log(containers[0]);
                if(containers.length > 0) {
                    if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containers[0]);
                    }
                }
            }

        }
    }
};

module.exports = roleBuilder;

