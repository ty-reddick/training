var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	console.log('Hello from preload')
}

function create() {
	console.log('Hello from create')
}

function update() {
	// console.log('Hello from update')
}