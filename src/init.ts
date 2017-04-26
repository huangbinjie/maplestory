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
	behaviorQueue: { user: number, action: "jump" | "left" | "right" | "stand" }[],
	cursors?: Phaser.CursorKeys,
	platformGroup?: Phaser.Group,
	userGroup?: Phaser.Group,
	online?: Phaser.Text,
	my?: Phaser.Sprite
} = { behaviorQueue: [] }
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
	global.my = new User(game, game.world.randomX, game.world.height - 106, "你", 1)
	game.camera.follow(global.my)
	global.userGroup.addChild(global.my)
	// global.behaviors.push({ user: 1, action: "stand" })
	// 方向键
	global.cursors = game.input.keyboard.createCursorKeys();
}

function update() {
	// 碰撞检测
	game.physics.arcade.collide(global.userGroup, global.platformGroup)
	// 触发各种行为，添加到队列
	const { my, cursors } = global
	if (my && cursors && my.body.touching.down) {
		if (cursors.left.isDown) {
			global.behaviorQueue.push({ user: 1, action: "left" })
		} else if (cursors.right.isDown) {
			global.behaviorQueue.push({ user: 1, action: "right" })
		} else {
			global.behaviorQueue.push({ user: 1, action: "stand" })
		}
	}

	if (my && cursors && cursors.up.isDown) {
		global.behaviorQueue.push({ user: 1, action: "jump" })
	}

	// 处理队列里的各种行为
	for (let behavior of global.behaviorQueue) {
		console.log(behavior.action)
		const user = global.userGroup!.children.find((user: User) => user.id === behavior.user) as User
		if (!user) continue
		if (behavior.action === "left") {
			user.curAction = "left"
		}
		else if (behavior.action === "right") {
			user.curAction = "right"
		}
		else if (behavior.action === "jump") {
			user.curAction = "jump"
		}
		else if (behavior.action === "stand") {
			user.curAction = "stand"
		} else {
			user.curAction = "stand"
		}

		global.behaviorQueue.shift()
	}

	for (let user of global.userGroup!.children as User[]) {
		user.do()
	}
}