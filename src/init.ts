import "pixi.js"
import "p2.js"
import * as Phaser from "phaser"
import User from "./user"
import Sky from "./sky"
import Online from "./online"
import Soil from "./soil"
import Road from "./road"

const game = new Phaser.Game("100%", "100%", Phaser.WEBGL, document.body, {
	preload,
	create,
	update
})

function preload() {
	game.load.spritesheet("user", require('../assets/user.png'), 39, 66)
	game.load.audio("login", require('../assets/login.mp3'))
	game.load.image("road", require('../assets/road.png'))
	game.load.image("soil", require('../assets/soil.png'))
	game.load.image("ladge", require('../assets/ladge.png'))
	game.load.image("sky", require('../assets/sky.png'))
}
const global: {
	behaviors: { user: number, action: "jump" | "left" | "right" | "stand" }[],
	cursors?: Phaser.CursorKeys,
	platformGroup?: Phaser.Group,
	userGroup?: Phaser.Group,
	userList: Phaser.Sprite[],
	online?: Phaser.Text
} = { behaviors: [], userList: [] }
function create() {
	//开启物理引擎ninja or arcade
	game.physics.startSystem(Phaser.Physics.ARCADE)
	//设置世界大小
	game.world.setBounds(0, 0, 1280, 700)
	// 碰撞物体组
	global.platformGroup = game.add.group()
	global.platformGroup.enableBody = true
	// 用户组
	global.userGroup = game.add.group()
	global.userGroup.enableBody = true
	//背景音乐!
	const music = game.add.audio("login")
	music.play()
	//添加背景
	game.world.add(new Sky(game, 0, 0), true, 0)
	//添加在线人数
	global.online = new Online(game, 16, 16, "在线: 0")
	game.world.add(global.online)
	//添加地面
	for (var i = Math.ceil(1280 / 90); i--;) {
		const soil = new Soil(game, i * 90, game.world.height - 60)
		global.platformGroup.add(soil)

		const road = new Road(game, i * 90, game.world.height - 106)
		global.platformGroup.add(road)
	}
	//添加玩家
	const my = new User(game, game.world.randomX, game.world.height - 106, "你", 1)
	game.camera.follow(my)
	global.userGroup.addChild(my)
	const behavior = { user: 1, action: "stand" }
	global.behaviors.push(behavior as any)
	// 鼠标
	const cursors = game.input.keyboard.createCursorKeys();
	game.input.keyboard.onDownCallback = function (e: KeyboardEvent) {
		if (my.body.touching.down) {
			if (cursors.left.isDown) {
				behavior.action = "left"
			}
			else if (cursors.up.isDown) {
				behavior.action = "jump"
			}
			else if (cursors.right.isDown) {
				behavior.action = "right"
			} else {
				behavior.action = "stand"
			}
		}
	}
	// game.input.keyboard.onUpCallback = function (e: KeyboardEvent) {
	// 	behavior.action = "stand"
	// }
}

function update() {
	game.physics.arcade.collide(global.userGroup, global.platformGroup)

	for (let behavior of global.behaviors) {
		const user = global.userGroup!.children.find((user: User) => user.id === behavior.user) as User
		if (!user) continue
		if (behavior.action === "left") {
			user.moveLeft()
		}

		else if (behavior.action === "right") {
			user.moveRight()
		}

		else if (behavior.action === "jump") {
			user.jump()
		}

		else if (behavior.action === "stand") {
			user.stand()
		}
		// game.input.keyboard.onDownCallback = function () {
		// 	if (behavior.action === "jump" && user.body.touching.down) {
		// 		user.body.velocity.y = -300;
		// 	}
		// }
	}
}