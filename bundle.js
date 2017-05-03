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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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

var jumpButton;
var jumpTimer = 0;
var cursors;

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
  Game.physics.arcade.gravity.y = 250;

  Game.camera.y = 550;

  cursors = Game.input.keyboard.createCursorKeys();
  jumpButton = Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  this.Map.create();

  this.Platform1 = new Platform('fade', {
    x: 1560,
    y: 920,
    width: 60,
  }, this);
  this.Platform1.create();
  this.Platform2 = new Platform('fade', {
    x: 1900,
    y: 1120,
    width: 100,
  }, this);
  this.Platform2.create();
  this.Platform3 = new Platform('moving', {
    x: 700,
    y: 920,
    width: 120,
  }, this);
  this.Platform3.create();
  this.Platform4 = new Platform('moving', {
    x: 3080,
    y: 880,
    width: 120,
  }, this);
  this.Platform4.create();
  this.Platform5 = new Platform('moving', {
    x: 2890,
    y: 1580,
    width: 120,
  }, this);
  this.Platform5.create();
  this.Platform6 = new Platform('fade', {
    x: 2580,
    y: 1960,
    width: 120,
    height: 40,
  }, this);
  this.Platform6.create();
  this.Platform7 = new Platform('fade', {
    x: 1740,
    y: 1660,
    width: 100,
  }, this);
  this.Platform7.create();

  this.Spike1 = new Spike({
    x: 1400,
    y: 1240,
    width: 600,
    height: 100,
  }, this);
  this.Spike1.create();

  this.Rope1 = new Rope({
    x: 1320,
    y: 920,
    height: 160,
  }, this);
  this.Rope1.create();

  this.Stairs1 = new Stairs({
    x: 3840,
    y: 1340,
    width: 120,
    height: 280,
  }, this);
  this.Stairs1.create();


  this.Player.create();
}

function update() {

  this.Player.update();

  this.Platform1.update();
  this.Platform2.update();
  this.Platform3.update();
  this.Platform4.update();
  this.Platform5.update();
  this.Platform6.update();
  this.Platform7.update();

  this.Spike1.update();

  this.Rope1.update();

  this.Stairs1.update();

  if (cursors.up.isDown) {
    if(this.Player.player.inRope || this.Player.player.inStairs) {
      this.Player.player.body.velocity.y = -300;
    }
  }
  if (cursors.down.isDown) {
    if(this.Player.player.inRope || this.Player.player.inStairs) {
      this.Player.player.body.velocity.y = 300;
    }
  }
  if (cursors.left.isDown) {
      this.Player.player.body.velocity.x = -300;
  }
  else if (cursors.right.isDown) {
      this.Player.player.body.velocity.x = 300;
  }

  if (jumpButton.isDown && this.Player.player.body.onFloor() && Game.time.now > jumpTimer) {
      this.Player.jump();
      jumpTimer = Game.time.now + 150;
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
    //Столкновения
    this.Game.physics.arcade.collide(this.Game.Map.mapLayer, this.platform);
    this.Game.physics.arcade.collide(this.Game.Player.player, this.platform);
  }
  if(this.type == 'fade') {
    //Столкновения
    this.Game.physics.arcade.collide(this.Game.Player.player, this.platform, this.fade, null, this.Game);
  }
}

Platform.prototype.fade = function(player, platform) {
  platform.kill();
  setTimeout(() => {
    platform.revive();
    platform.x = platform.settedData.x;
    platform.y = platform.settedData.y;
    console.log(platform.settedData);
    console.log(platform.x);
    console.log(platform.y);
  }, 1000);
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
  this.player.body.gravity.y = 2000;
  this.player.body.collideWorldBounds = true;

  this.player.death = () => {
    this.player.x = this.default.x;
    this.player.y = this.default.y;
  }

  //this.Game.camera.follow(this.player);
}

Player.prototype.update = function() {
  this.player.body.velocity.x = 0;

  //Столкновения
  this.Game.physics.arcade.collide(this.player, this.Game.Map.mapLayer, null, this.collideMap, this.Game);

}

Player.prototype.collideMap = function(player, map) {
  if(player.inRope) {
    return false;
  }
  return true;
}

Player.prototype.jump = function() {
  this.player.body.velocity.y = -770;
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
  this.Game.Player.player.inRope = false;
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
  this.Game.Player.player.inStairs = false;
  //Наложение
  this.Game.physics.arcade.overlap(this.Game.Player.player, this.stairs, this.overlap, null, this.Game);
}

Stairs.prototype.overlap = function(player, spike) {
  player.inStairs = true;
}

module.exports = Stairs;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

let game = __webpack_require__( 0 );


/***/ })
/******/ ]);