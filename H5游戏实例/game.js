// Create the canvas
var canvas = document.createElement("canvas");//画布绘制
var ctx = canvas.getContext("2d");
var gqs = 0;//关卡数
var tj = 5;//通关条件
var hp1 = 100;//怪物1hp
var hp2 = 100;//怪物2hp
canvas.width = 620;//画布宽度定义
canvas.height = 480;//画布高度定义
document.body.appendChild(canvas);

// 背景图片属性
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// 英雄属性
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/pkq.png";

var BulletReady = false;
var BulletImage = new Image();
BulletImage.onload = function () {
	BulletReady = true;
};
BulletReady.src = "images/xhl.png";

// 怪物1属性
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
var m1 = Math.round(Math.random())
// alert(m1);
if (m1 == 0) {
	monsterImage.src = "images/jng.png";

} else {
	monsterImage.src = "images/mwzz.png";

}
//怪物2属性
var monsterReady2 = false;
var monsterImage2 = new Image();
monsterImage2.onload = function () {
	monsterReady2 = true;
};
var m1 = Math.round(Math.random())
// alert(m1);
if (m1 == 0) {
	monsterImage2.src = "images/jng.png";

} else {
	monsterImage2.src = "images/mwzz.png";

}

// Game objects
var hero = {
	speed: 300 // movement in pixels per second
};

var Bullet = {
	speed: 500 // movement in pixels per second
};
var monster = {
};
var monster2 = {
};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var herozhix = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
}
var shuiyi = function () {
	Bullet.x = 32;
	Bullet.y = 50;
}
var reset = function () {

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};
var reset1 = function () {
	monster2.x = 32 + (Math.random() * (canvas.width - 64));
	monster2.y = 32 + (Math.random() * (canvas.height - 64));

}

// Update game objects
var update = function (modifier) {
	if (38 in keysDown && hero.y >= 20) {
		hero.y -= hero.speed * modifier;

	}
	
	if (40 in keysDown && hero.y <= 410) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown && hero.x >= 20) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown && hero.x <= 540) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		hp1 = hp1 - 50;
		if (hp1==0) {
			++monstersCaught;
			reset();
			hp1=100;
			var m1 = Math.round(Math.random())
			if (m1 == 0) {
				monsterImage.src = "images/jng.png";

			} else {
				monsterImage.src = "images/mwzz.png";

			}

		} else {
			monster.x = 32 + (Math.random() * (canvas.width - 64));
			monster.y = 32 + (Math.random() * (canvas.height - 64));
		}

	}
	if (
		
		hero.x <= (monster2.x + 32)
		&& monster2.x <= (hero.x + 32)
		&& hero.y <= (monster2.y + 32)
		&& monster2.y <= (hero.y + 32)
	) {
		hp2 = hp2- 50;
		if (hp2==0) {
			
			++monstersCaught;
		reset1();
		hp2=100;
		var m1 = Math.round(Math.random())
		if (m1 == 0) {
			monsterImage2.src = "images/jng.png";

		} else {
			monsterImage2.src = "images/mwzz.png";

		}

		}
		else
		{
			monster2.x = 32 + (Math.random() * (canvas.width - 64));
		monster2.y = 32 + (Math.random() * (canvas.height - 64));
	}
		
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	if (monsterReady2) {
		ctx.drawImage(monsterImage2, monster2.x, monster2.y);
	}
	if (BulletReady) {
		ctx.drawImage(BulletImage, Bullet.x, Bullet.y);
	}
	// Score

	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("击杀数: " + monstersCaught, 32, 22);
	ctx.fillText("关卡数: " + gqs, 32, 60);
	ctx.fillText("目标击杀: " + tj + "只野生宠物", 200, 22);
	//ctx.font="10px Georgia";
	ctx.fillText("HP: " + hp1, monster.x-10, monster.y+50);
	ctx.fillText("HP: " + hp2, monster2.x-10, monster2.y+50);
	if (monstersCaught == tj) {
		monstersCaught = 0;
		gqs += 1;
		tj = tj + 3;
		herozhix();
		reset();
		reset1();

	}

};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
reset1();
herozhix();
main();