/*global _ Game WORK CARRY MOVE OK Memory*/
var tools = require('tools');

var logicSpawning = {

    spawnHarvester: function() {
        const pwhs = tools.getPositionsWithoutHarvester();
        var newName = 'Harvester #' + Game.time;
        let skills;
        if (Memory.state.energyCapacity < 500) {
            skills = [WORK,CARRY,CARRY,MOVE,MOVE];
        }
        else if (Memory.state.energyCapacity <= 700) {
            skills = [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
        }
        else if (Memory.state.energyCapacity <= 900) {
            skills = [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
        }

        const target = pwhs[0];

        var spawned = Game.spawns['Spawn1'].spawnCreep(skills, newName, {memory: {role: 'harvester', target: target}});
        if (spawned == OK) {
            console.log('Spawning new harvester: ' + newName);
            target.hasHarvester = true;
            Memory.state.spawning = true;
        }
        else {
            console.log('Tried to spawn new harvester');
        }
    },
    spawnBuilder: function() {
        var newName = 'Builder #' + Game.time;
        let skills;
        if (Memory.state.energyCapacity < 500) {
            skills = [WORK,CARRY,CARRY,MOVE,MOVE];
        }
        else if (Memory.state.energyCapacity <= 700) {
            skills = [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
        }
        else if (Memory.state.energyCapacity <= 900) {
            skills = [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
        }

        var spawned = Game.spawns['Spawn1'].spawnCreep(skills, newName, {memory: {role: 'builder'}});
        if (spawned == OK) {
            console.log('Spawning new Builder: ' + newName);
            Memory.state.spawning = true;
        }
        else {
            console.log('Tried to spawn new Builder');
        }
    },
    run: function() {
        if (!Memory.state.spawning && !Memory.state.spawn.spawning) {

            const pwhs = tools.getPositionsWithoutHarvester();
            if(pwhs.length > 3) {
                this.spawnHarvester();
                return;
            }

            const builders = tools.getBuilders();
            if(builders.length < 2) {
                this.spawnBuilder();
                return;
            }

            if(pwhs.length > 0) {
                this.spawnHarvester();
                return;
            }

        // var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

        // if(upgraders.length < 6) {
        //     var newName = 'Upgrader' + Game.time;
        //     console.log('Spawning new upgrader: ' + newName);
        //     Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
        //         {memory: {role: 'upgrader'}});
        // }

        // var transferers = _.filter(Game.creeps, (creep) => creep.memory.role == 'transferer');

        // if(transferers.length < 2) {
        //     var newName = 'Transferer' + Game.time;
        //     console.log('Spawning new transferer: ' + newName);
        //     Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
        //         {memory: {role: 'transferer'}});
        // }

        // var harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role == 'harvester') && (creep.memory.target == 1));

        // if(harvesters.length < 2) {
        //     var newName = 'Harvester' + Game.time;
        //     console.log('Spawning new harvester: ' + newName);
        //     Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
        //         {memory: {role: 'harvester', target: 1}});
        // }

        // var harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role == 'harvester') && (creep.memory.target == 0));

        // if(harvesters.length < 4) {
        //     var newName = 'Harvester' + Game.time;
        //     console.log('Spawning new harvester: ' + newName);
        //     Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName,
        //         {memory: {role: 'harvester', target: 0}});
        // }

        // if(Game.spawns['Spawn1'].spawning) {
        //     var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        //     Game.spawns['Spawn1'].room.visual.text(
        //         spawningCreep.memory.role,
        //         Game.spawns['Spawn1'].pos.x + 1,
        //         Game.spawns['Spawn1'].pos.y,
        //         {align: 'left', opacity: 0.8});
        // }
        }
    }
};

module.exports = logicSpawning;

