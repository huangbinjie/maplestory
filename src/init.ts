import * as Phaser from "phaser"

const game = new Phaser.Game("100%", "100%", Phaser.WEBGL, '', {
	preload: preload
})


function preload() {
	game.load.spritesheet("user", 'assets/user.png', 39, 66);
	game.load.audio("login", 'assets/login.mp3');
	game.load.image("road", 'assets/road.png');
	game.load.image("soil", 'assets/soil.png');
	game.load.image("ladge", 'assets/ladge.png');
	game.load.image("sky", 'assets/sky.png');
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE)
	game.world.setBounds(0, 0, 1280, 700)
	const platforms = game.add.group()
	platforms.enableBody = true
	const users = game.add.group()
	users.enableBody = true
	const music = game.add.audio("login")
	music.play()
}

function update() {

}