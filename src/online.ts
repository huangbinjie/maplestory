import * as Phaser from "phaser"

export default class Online extends Phaser.Text {
	constructor(game: Phaser.Game, x: number, y: number, text: string) {
		super(game, x, y, text, { fontSize: 16, fill: '#ffffff' })
		this.fixedToCamera = true
	}
}