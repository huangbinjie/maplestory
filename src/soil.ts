import * as Phaser from "phaser"

class Ledge extends Phaser.Sprite {
	constructor(game: Phaser.Game, x: number, y: number) {
		super(game, x, y, "soil")
		this.scale.setTo(1, 1)
		this.body.immovable = true
	}
}