/*global _ Game FIND_STRUCTURES STRUCTURE_CONTAINER STRUCTURE_EXTENSION Memory FIND_SOURCES LOOK_TERRAIN RoomPosition OK*/

var tools = {
    clearMemory: () => {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                Memory.sources[Memory.creeps[name].target.source].harvestingLocations[Memory.creeps[name].target.ref].hasHarvester = false;
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },
    getBuilders: () => {
        return _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    },
    getPositionsWithoutHarvester: () => {
        return _.filter(_.flatten(Memory.sources.map(s => s.harvestingLocations)), (h) => h.hasContainer === true && h.hasHarvester === false);
    }
};

module.exports = tools;

