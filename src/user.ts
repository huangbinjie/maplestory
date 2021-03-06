import * as Phaser from "phaser"

export default class User extends Phaser.Sprite {
	public curAction = "stand"
	namestyle = {
		font: "bold 12px Arial",
		fill: "#fff",
		boundsAlignH: "center",
		boundsAlignV: "middle"
	}
	constructor(game: Phaser.Game, x: number, y: number, name: string, public id: number) {
		super(game, x, y, "user")
		game.physics.enable(this, Phaser.Physics.ARCADE)
		// 人物描点
		this.anchor.setTo(.5, 1)
		// 人物方块属性
		this.body.gravity.y = 700
		this.body.collideWorldBounds = true
		this.body.velocity.x = 1
		// 人物动作
		this.animations.add('walk', [3, 4, 5, 6], 6, true)
		this.animations.add('stand', [0, 1, 2, 1], 2, true)
		this.animations.add('jump', [7], 1, false)
		this.animations.add('floor', [8], 100, false)

		this.animations.play("stand")

		// 姓名板属性
		const Name = new Phaser.Text(game, 0, 0, name, this.namestyle)
		Name.anchor.setTo(.5, 0)
		this.addChild(Name)
	}

	moveLeft() {
		this.body.velocity.x = -100
		this.scale.x = 1
		this.children[0].scale.x = 1
		this.animations.play('walk')
	}
	moveRight() {
		this.body.velocity.x = 100
		this.scale.x = -1
		this.children[0].scale.x = -1
		this.animations.play('walk')
	}
	down() {
		//没有做趴下的动画
	}
	stand() {
		this.anchor.setTo(.5, 1)
		this.rotation = 0
		this.body.velocity.x = 0
		this.animations.play('stand')
	}
	jump() {
		if (!this.body.touching.down) return
		this.body.velocity.y = -300;
		this.animations.play('jump')
	}
	do() {
		switch (this.curAction) {
			case "left": return this.moveLeft()
			case "right": return this.moveRight()
			case "stand": return this.stand()
			case "jump": return this.jump()
			default: this.stand()
		}
	}
}
