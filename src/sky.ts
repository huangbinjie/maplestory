import * as Phaser from "phaser"

class Ledge extends Phaser.Sprite {
	constructor(game: Phaser.Game, x: number, y: number) {
		super(game, x, y, "sky")
		this.width = 1280
		this.height = 700
	}
}