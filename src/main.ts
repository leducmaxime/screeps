import { ErrorMapper } from "utils/ErrorMapper"
import { roleHarvester } from "roles/harvester"
import { roleUpgrader } from "roles/upgrader"
import { roleBuilder } from "roles/builder"

export const loop = ErrorMapper.wrapLoop(() => {
	console.log(`Current game tick is ${Game.time}`)

	for(const name in Memory.creeps) {
		if(!Game.creeps[name]) {
			delete Memory.creeps[name]
			console.log('Clearing non-existing creep memory:', name)
		}
	}

	const builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder')
	console.log('builders: ' + builders.length)

	if(builders.length < 3) {
		const newName = 'builder' + Game.time
		console.log('Spawning new builder: ' + newName)
		Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
			{memory: {role: 'builder', }})
	}

	const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader')
	console.log('upgraders: ' + upgraders.length)

	if(upgraders.length < 3) {
		const newName = 'upgrader' + Game.time
		console.log('Spawning new upgrader: ' + newName)
		Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
			{memory: {role: 'upgrader'}})
	}

	const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester')
	console.log('Harvesters: ' + harvesters.length)

	if(harvesters.length < 4) {
		const newName = 'Harvester' + Game.time
		console.log('Spawning new harvester: ' + newName)
		Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName,
			{memory: {role: 'harvester'}})
	}

	if(Game.spawns['Spawn1'].spawning) {
		const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name]
		Game.spawns['Spawn1'].room.visual.text(
			'🛠️' + spawningCreep.memory.role,
			Game.spawns['Spawn1'].pos.x + 1,
			Game.spawns['Spawn1'].pos.y,
			{align: 'left', opacity: 0.8})
	}

	const tower = Game.getObjectById<StructureTower>('TOWER_ID')
	if(tower) {
		const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: (structure) => structure.hits < structure.hitsMax
		})
		if(closestDamagedStructure) {
			tower.repair(closestDamagedStructure)
		}

		const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
		if(closestHostile) {
			tower.attack(closestHostile)
		}
	}

	for(const name in Game.creeps) {
		const creep = Game.creeps[name]
		if(creep.memory.role == 'harvester') {
			roleHarvester.run(creep)
		}
		if(creep.memory.role == 'upgrader') {
			roleUpgrader.run(creep)
		}
		if(creep.memory.role == 'builder') {
			roleBuilder.run(creep)
		}
	}
})
