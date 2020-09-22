/*global _ Game FIND_STRUCTURES STRUCTURE_CONTAINER STRUCTURE_EXTENSION Memory FIND_SOURCES LOOK_TERRAIN RoomPosition OK*/

var logicRoom = {
    analyseRoom: function(room) {
        if (!Memory.sources) {
            Memory.sources = [];
            var sources = room.find(FIND_SOURCES);
    
            for (var i in sources)
            {
                var s = {'sourceId': sources[i].id, 'harvestingLocations': []};
                
                var source = sources[i];
                var terrains = room.lookForAtArea(LOOK_TERRAIN,source.pos.y-1,source.pos.x-1,source.pos.y+1,source.pos.x+1);
        
                let h = 0;
                for (var y in terrains) {
                    for (var x in terrains[y]) {
                        if (terrains[y][x] != 'wall') {
                            s.harvestingLocations.push({'source': i, 'ref': h++, 'x': x, 'y': y, 'hasContainer': false, 'hasHarvester': false});
                        }
                    }
                }
                Memory.sources.push(s);
            }
        }
    },
    initRoom: function(room) {
        var k = 0;
        for (var i in Memory.sources) {
            var src = Memory.sources[i];
            for (var j in src.harvestingLocations) {
                if (k++ < 5) {
                    var hL = src.harvestingLocations[j];
                    var pos = new RoomPosition(hL.x, hL.y, room.name);
                    if (pos.createConstructionSite(STRUCTURE_CONTAINER) == OK) {
                        hL.hasContainer = true;
                    }
                }
            }
        }
    },
    run: function (room) {
        this.analyseRoom(room);
        this.initRoom(room);
    }
};

module.exports = logicRoom;

