/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

let Map = __webpack_require__( 1 );
let Player = __webpack_require__( 3 );
let Platform = __webpack_require__( 2 );
let Spike = __webpack_require__( 5 );
let Rope = __webpack_require__( 4 );
let Stairs = __webpack_require__( 6 );
let Worker = __webpack_require__( 7 );

let root = document.getElementById('root');
var Game = new Phaser.Game(root.offsetWidth, root.offsetHeight, Phaser.AUTO, 'root', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

let sprites = {
    black: 'images/black.png',
    tilemap: 'images/tilemap.png',
    char: 'images/char.png',
    fadePlatform: 'images/fade_platform.png',
}

function preload() {
    for(spriteKey in sprites) {
        this.load.image(spriteKey, sprites[spriteKey]);
    }

    Game.load.tilemap('tilemap', 'tilemap.csv', null, Phaser.Tilemap.CSV);

    this.global = {
        root: root,
    };

    this.Map = new Map(this);
    this.Player = new Player(this);
}

function create() {
  Game.world.setBounds(0, 0, 4000, 2000);

  Game.stage.backgroundColor = '#ffffff';

  Game.physics.startSystem(Phaser.Physics.ARCADE);
  Game.physics.arcade.gravity.y = 490;

  Game.camera.y = 550;

  this.cursors = Game.input.keyboard.createCursorKeys();
  this.jumpButton = Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.checkButton = Game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
  this.jumpTimer = 0;

  this.Map.create();

  this.FadePlatforms = [];
  this.FadePlatforms[0] = new Platform('fade', {
    x: 1560,
    y: 920,
    width: 60,
  }, this);
  this.FadePlatforms[0].create();
  this.FadePlatforms[1] = new Platform('fade', {
    x: 1900,
    y: 1120,
    width: 100,
  }, this);
  this.FadePlatforms[1].create();
  this.FadePlatforms[2] = new Platform('fade', {
    x: 2580,
    y: 1960,
    width: 120,
    height: 40,
  }, this);
  this.FadePlatforms[2].create();
  this.FadePlatforms[3] = new Platform('fade', {
    x: 1740,
    y: 1660,
    width: 100,
  }, this);
  this.FadePlatforms[3].create();
  this.FadePlatforms[4] = new Platform('fade', {
    x: 1560,
    y: 680,
    width: 80,
    height: 40,
  }, this);
  this.FadePlatforms[4].create();
  this.FadePlatforms[5] = new Platform('fade', {
    x: 840,
    y: 480,
    width: 60,
  }, this);
  this.FadePlatforms[5].create();

  this.MovingPlatforms = [];
  this.MovingPlatforms[0] = new Platform('moving', {
    x: 700,
    y: 920,
    width: 120,
  }, this);
  this.MovingPlatforms[0].create();
  this.MovingPlatforms[1] = new Platform('moving', {
    x: 3080,
    y: 880,
    width: 120,
  }, this);
  this.MovingPlatforms[1].create();
  this.MovingPlatforms[2] = new Platform('moving', {
    x: 2710,
    y: 1580,
    x2: 3480,
    width: 120,
  }, this);
  this.MovingPlatforms[2].create();

  this.Spikes = [];
  this.Spikes[0] = new Spike({
    x: 1400,
    y: 1220,
    width: 620,
    height: 120,
  }, this);
  this.Spikes[0].create();

  this.Ropes = [];
  this.Ropes[0] = new Rope({
    x: 1320,
    y: 920,
    height: 160,
  }, this);
  this.Ropes[0].create();
  this.Ropes[1] = new Rope({
    x: 2400,
    y: 680,
    height: 160,
  }, this);
  this.Ropes[1].create();
  this.Ropes[2] = new Rope({
    x: 3900,
    y: 880,
    height: 360,
  }, this);
  this.Ropes[2].create();
  this.Ropes[3] = new Rope({
    x: 240,
    y: 140,
    height: 160,
  }, this);
  this.Ropes[3].create();

  this.Stairs = [];
  this.Stairs[0] = new Stairs({
    x: 3840,
    y: 1340,
    width: 120,
    height: 280,
  }, this);
  this.Stairs[0].create();
  this.Stairs[1] = new Stairs({
    x: 160,
    y: 680,
    width: 120,
    height: 100,
  }, this);
  this.Stairs[1].create();

  this.Workers = [];
  //Саня
  this.Workers[0] = new Worker({
    x: 400,
    y: 250,
  }, this);
  this.Workers[0].create();
  //Костя
  this.Workers[1] = new Worker({
    x: 430,
    y: 650,
  }, this);
  this.Workers[1].create();
  //Ярик
  this.Workers[2] = new Worker({
    x: 990,
    y: 650,
  }, this);
  this.Workers[2].create();
  //Миха
  this.Workers[3] = new Worker({
    x: 1680,
    y: 650,
  }, this);
  this.Workers[3].create();
  //Маша
  this.Workers[4] = new Worker({
    x: 650,
    y: 550,
  }, this);
  this.Workers[4].create();
  //Ирина
  this.Workers[5] = new Worker({
    x: 990,
    y: 350,
  }, this);
  this.Workers[5].create();
  //Оля СЕО
  this.Workers[6] = new Worker({
    x: 2540,
    y: 330,
  }, this);
  this.Workers[6].create();
  //Инна
  this.Workers[7] = new Worker({
    x: 2900,
    y: 330,
  }, this);
  this.Workers[7].create();
  //Илья
  this.Workers[8] = new Worker({
    x: 3700,
    y: 150,
  }, this);
  this.Workers[8].create();
  //Лера
  this.Workers[9] = new Worker({
    x: 3540,
    y: 650,
  }, this);
  this.Workers[9].create();
  //Катя
  this.Workers[10] = new Worker({
    x: 3820,
    y: 530,
  }, this);
  this.Workers[10].create();
  //Анжелика
  this.Workers[11] = new Worker({
    x: 1140,
    y: 1730,
  }, this);
  this.Workers[11].create();
  //Анна
  this.Workers[12] = new Worker({
    x: 580,
    y: 1550,
  }, this);
  this.Workers[12].create();
  //Вера
  this.Workers[13] = new Worker({
    x: 200,
    y: 1730,
  }, this);
  this.Workers[13].create();

  this.Player.create();
}

function update() {

  this.Player.update();

  for(let i = 0; i < this.FadePlatforms.length; i++) {
    for(let o = 0; o < this.Workers.length; o++) {
      Game.physics.arcade.collide(this.Workers[o].worker, this.FadePlatforms[i].platform);
    }
    this.FadePlatforms[i].update();
  }
  for(let i = 0; i < this.MovingPlatforms.length; i++) {
    for(let o = 0; o < this.Workers.length; o++) {
      Game.physics.arcade.collide(this.Workers[o].worker, this.MovingPlatforms[i].platform);
    }
    this.MovingPlatforms[i].update();
  }
  for(let i = 0; i < this.Spikes.length; i++) {
    for(let o = 0; o < this.Workers.length; o++) {
      Game.physics.arcade.collide(this.Workers[o].worker, this.Spikes[i].spike);
    }
    this.Spikes[i].update();
  }
  for(let i = 0; i < this.Ropes.length; i++) {
    for(let o = 0; o < this.Workers.length; o++) {
      Game.physics.arcade.collide(this.Workers[o].worker, this.Ropes[i].rope);
    }
    this.Ropes[i].update();
  }
  for(let i = 0; i < this.Stairs.length; i++) {
    for(let o = 0; o < this.Workers.length; o++) {
      Game.physics.arcade.collide(this.Workers[o].worker, this.Stairs[i].stairs);
    }
    this.Stairs[i].update();
  }
  for(let i = 0; i < this.Workers.length; i++) {
    this.Workers[i].update();
  }

  if (this.cursors.up.isDown) {
    if(this.Player.player.inRope || this.Player.player.inStairs) {
      this.Player.player.body.velocity.y = -250;
    }
  }
  if (this.cursors.down.isDown) {
    if(this.Player.player.inRope || this.Player.player.inStairs) {
      this.Player.player.body.velocity.y = 250;
    }
  }
  if (this.cursors.left.isDown) {
    this.Player.player.body.velocity.x = -250;
  }
  else if (this.cursors.right.isDown) {
    this.Player.player.body.velocity.x = 250;
  }

  if (this.jumpButton.isDown && (this.Player.player.body.onFloor() || this.Player.player.inPlatform) && Game.time.now > this.jumpTimer) {
    this.Player.jump();
    this.jumpTimer = Game.time.now + 150;
  }

  //Камера по X
  if(this.Player.player.x > 660) {
    Game.camera.x = 550;
  }
  if(this.Player.player.x < 660) {
    Game.camera.x = 0;
  }
  if(this.Player.player.x > 2180) {
    Game.camera.x = 2080;
  }
  if(this.Player.player.x < 2180 && this.Player.player.x > 660) {
    Game.camera.x = 550;
  }
  //Камера по Y
  if(this.Player.player.y > 660) {
    Game.camera.y = 550;
  }
  if(this.Player.player.y < 660) {
    Game.camera.y = 0;
  }
  if(this.Player.player.y > 1280) {
    Game.camera.y = 1280;
  }
  if(this.Player.player.y < 1280 && this.Player.player.y > 660) {
    Game.camera.y = 550;
  }
}

function render() {
  //Game.debug.spriteInfo(this.Player.player, 32, 32);
}

module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function Map(Game) {
    this.Game = Game;
}

Map.prototype.create = function() {
  this.tilemap = this.Game.add.tilemap('tilemap', 20, 20);
  this.tilemap.addTilesetImage('tilemap', 'tilemap', 20, 20);
  this.tilemap.setCollisionByExclusion([0]);

  this.mapLayer =  this.tilemap.createLayer(0);
  this.Game.physics.enable(this.mapLayer, Phaser.Physics.ARCADE);
  this.mapLayer.body.immovable = true;
  this.mapLayer.body.allowGravity = false;
}

module.exports = Map;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function Platform(type, set, Game) {
  this.type = type;
  this.set = set;
  this.Game = Game;
}

Platform.prototype.create = function() {
  this.set.height = this.set.height ? this.set.height : 20;
  //Подвижная плафторма
  if(this.type == 'moving') {
    this.platform = this.Game.add.tileSprite(this.set.x, this.set.y, this.set.width, this.set.height, 'fadePlatform');
  }
  //Пропадающая платформа
  if(this.type == 'fade') {
    this.platform = this.Game.add.tileSprite(this.set.x, this.set.y, this.set.width, this.set.height, 'fadePlatform');
  }

  this.platform.settedData = this.set;
  this.Game.physics.enable(this.platform, Phaser.Physics.ARCADE);
  this.platform.body.immovable = true;
  this.platform.body.allowGravity = false;

  if(this.type == 'moving') {
    this.platform.body.velocity.set(150, 0);
    this.platform.body.bounce.set(1);
  }
}

Platform.prototype.update = function() {
  if(this.type == 'moving') {
    if(this.set.x2) {
      if(this.platform.x >= this.set.x2) {
        this.platform.body.velocity.set(-150, 0);
      }
      if(this.platform.x <= this.set.x) {
        this.platform.body.velocity.set(150, 0);
      }
    }

    //Столкновения
    this.Game.physics.arcade.collide(this.Game.Map.mapLayer, this.platform);
    this.Game.physics.arcade.collide(this.Game.Player.player, this.platform, this.checkPlatform, null, this.Game);
  }
  if(this.type == 'fade') {
    //Столкновения
    this.Game.physics.arcade.collide(this.Game.Player.player, this.platform, this.fade, null, this.Game);
  }
}

Platform.prototype.checkPlatform = function(player, platform) {
  player.inPlatform = true;
}

Platform.prototype.fade = function(player, platform) {
  platform.kill();
  setTimeout(() => {
    platform.revive();
    platform.x = platform.settedData.x;
    platform.y = platform.settedData.y;
  }, 300);
}

module.exports = Platform;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function Player(Game) {
    this.Game = Game;

    this.default = {
      x: 80,
      y: 1000,
    };
}

Player.prototype.create = function() {
  this.player = this.Game.add.sprite(this.default.x, this.default.y, 'char');
  this.Game.physics.enable(this.player, Phaser.Physics.ARCADE);

  this.player.body.bounce.y = 0;
  this.player.body.gravity.y = 980;
  this.player.body.collideWorldBounds = true;

  this.player.body.tilePadding.x = 10;
  this.player.body.tilePadding.y = 10;

  this.player.death = () => {
    this.player.x = this.default.x;
    this.player.y = this.default.y;
  }

  this.player.haveWorker = false;

  //this.Game.camera.follow(this.player);
}

Player.prototype.update = function() {
  this.player.body.velocity.x = 0;

  //Выход за пределы карты
  if(this.player.body.checkWorldBounds()) {
    this.player.death();
  }

  //Столкновения с картой
  this.Game.physics.arcade.collide(this.player, this.Game.Map.mapLayer, null, this.collideMap, this.Game);

  //Платформы
  this.Game.Player.player.inPlatform = false;
  //Веревки
  this.Game.Player.player.inRope = false;
  //Лестницы
  this.Game.Player.player.inStairs = false;
}

Player.prototype.collideMap = function(player, map) {
  if(player.inRope) {
    return false;
  }
  return true;
}

Player.prototype.jump = function() {
  this.player.body.velocity.y = -620;
}

module.exports = Player;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

function Rope(set, Game) {
  this.set = set;
  this.Game = Game;
}

Rope.prototype.create = function() {
  this.rope = this.Game.add.sprite(this.set.x, this.set.y, 'black');
  this.rope.width = 5;
  this.rope.height = this.set.height;
  this.Game.physics.enable(this.rope, Phaser.Physics.ARCADE);
  this.rope.body.immovable = true;
  this.rope.body.allowGravity = false;
}

Rope.prototype.update = function() {
  //Наложение
  this.Game.physics.arcade.overlap(this.Game.Player.player, this.rope, this.overlap, null, this.Game);
}

Rope.prototype.overlap = function(player, spike) {
  player.inRope = true;
}

module.exports = Rope;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

function Spike(set, Game) {
  this.set = set;
  this.Game = Game;
}

Spike.prototype.create = function() {
  this.spike = this.Game.add.sprite(this.set.x, this.set.y, 'black');
  this.spike.width = this.set.width;
  this.spike.height = this.set.height;
  this.Game.physics.enable(this.spike, Phaser.Physics.ARCADE);
  this.spike.body.immovable = true;
  this.spike.body.allowGravity = false;
}

Spike.prototype.update = function() {
  //Столкновения
  this.Game.physics.arcade.collide(this.Game.Player.player, this.spike, this.collide, null, this.Game);
}

Spike.prototype.collide = function(player, spike) {
  player.death();
}

module.exports = Spike;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

function Stairs(set, Game) {
  this.set = set;
  this.Game = Game;
}

Stairs.prototype.create = function() {
  this.stairs = this.Game.add.sprite(this.set.x, this.set.y, 'fadePlatform');
  this.stairs.width = this.set.width;
  this.stairs.height = this.set.height;
  this.Game.physics.enable(this.stairs, Phaser.Physics.ARCADE);
  this.stairs.body.immovable = true;
  this.stairs.body.allowGravity = false;
}

Stairs.prototype.update = function() {
  //Наложение
  this.Game.physics.arcade.overlap(this.Game.Player.player, this.stairs, this.overlap, null, this.Game);
}

Stairs.prototype.overlap = function(player, spike) {
  player.inStairs = true;
}

module.exports = Stairs;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

function Worker(set, Game) {
  this.set = set;
  this.Game = Game;

  this.upTimer = 0;
}

Worker.prototype.create = function() {
  this.table = this.Game.add.sprite(this.set.x, this.set.y, 'fadePlatform');
  this.Game.physics.enable(this.table, Phaser.Physics.ARCADE);
  this.table.width = 100;
  this.table.height = 30;
  this.table.body.immovable = true;
  this.table.body.allowGravity = false;

  this.worker = this.Game.add.sprite(this.set.x + 30, this.set.y - 30, 'char');
  this.Game.physics.enable(this.worker, Phaser.Physics.ARCADE);
  this.worker.body.bounce.x = 1;
  this.worker.body.gravity.y = 980;
  this.worker.body.collideWorldBounds = true;
  this.worker.isUp = false;
  this.worker.inPlayer = false;
}

Worker.prototype.update = function() {
  this.worker.overlapPlayer = false;
  this.table.overlapPlayer = false;

  //Столкновения с картой
  this.Game.physics.arcade.collide(this.worker, this.Game.Map.mapLayer, this.collideMap, null, this.Game);

  this.Game.physics.arcade.overlap(this.Game.Player.player, this.worker, this.overlapPlayer, null, this.Game);
  this.Game.physics.arcade.overlap(this.Game.Player.player, this.table, this.overlapTablePlayer, null, this.Game);

  if(this.Game.time.now > this.upTimer && !this.worker.isUp) {
    this.worker.isUp = true;
    this.moveWorker();
  }

  if(this.worker.overlapPlayer && this.Game.checkButton.isDown && this.worker.isUp ) {
    this.goInPlayer();
    this.Game.Player.player.haveWorker = true;
  }

  if(this.worker.inPlayer) {
    this.worker.position.x = this.Game.Player.player.position.x + 50;
    this.worker.position.y = this.Game.Player.player.position.y - 40;
  }

  if(this.table.overlapPlayer && this.worker.inPlayer) {
    this.startWorkWorker();
    this.Game.Player.player.haveWorker = false;
  }
}

Worker.prototype.startWorkWorker = function() {
  this.upTimer = this.Game.time.now + (this.Game.rnd.between(90, 180) * 1000);
  this.worker.position.x = this.set.x + 30;
  this.worker.position.y = this.set.y - 30;
  this.worker.body.velocity.x = 0;
  this.worker.body.velocity.y = 0;
  this.worker.body.allowGravity = true;
  this.worker.angle = 0;
  this.worker.inPlayer = false;
  this.worker.isUp = false;
}

Worker.prototype.goInPlayer = function() {
  this.worker.body.velocity.x = 0;
  this.worker.body.velocity.y = 0;
  this.worker.angle = 90;
  this.worker.body.allowGravity = false;
  this.worker.inPlayer = true;
  this.worker.isUp = false;
}

Worker.prototype.moveWorker = function() {
  if(this.Game.rnd.between(1, 50) > 25) {
    this.worker.body.velocity.x = 150;
  } else {
    this.worker.body.velocity.x = -150;
  }
}

Worker.prototype.overlapPlayer = function(player, worker) {
  worker.overlapPlayer = true;
}
Worker.prototype.overlapTablePlayer = function(player, table) {
  table.overlapPlayer = true;
}

Worker.prototype.collideMap = function(worker, map) {

}

module.exports = Worker;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

let game = __webpack_require__( 0 );


/***/ })
/******/ ]);