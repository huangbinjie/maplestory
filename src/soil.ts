import * as Phaser from "phaser"

export default class Soil extends Phaser.Sprite {
	constructor(game: Phaser.Game, x: number, y: number) {
		super(game, x, y, "soil")
		game.physics.enable(this, Phaser.Physics.ARCADE)
		this.scale.setTo(1, 1)
		this.body.immovable = true
	}
}