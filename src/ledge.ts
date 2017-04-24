import * as Phaser from "phaser"

class Ledge extends Phaser.Sprite {
	constructor(game: Phaser.Game, x: number, y: number) {
		super(game, x, y, "ledge")
		this.body.immovable = true
		this.body.offset.y = 10
		this.body.width = 25
		this.body.height = 0
		this.body.offset.x = 15
		this.body.checkCollision.left = false
		this.body.checkCollision.right = false
		this.body.checkCollision.down = false
	}
}