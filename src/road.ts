import * as Phaser from "phaser"

export default class Road extends Phaser.Sprite {
	constructor(game: Phaser.Game, x: number, y: number) {
		super(game, x, y, "road")
		game.physics.enable(this, Phaser.Physics.ARCADE)
		this.scale.setTo(1, 1)
		this.body.immovable = true
		this.body.offset.y = 10
	}
}