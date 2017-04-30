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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

let Map = __webpack_require__( 1 );
let Player = __webpack_require__( 3 );
let Platform = __webpack_require__( 2 );

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

  Game.stage.backgroundColor = '#f1f1f1';

  Game.physics.startSystem(Phaser.Physics.ARCADE);
  Game.physics.arcade.gravity.y = 2000;

  Game.camera.y = 550;

  cursors = Game.input.keyboard.createCursorKeys();
  jumpButton = Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  this.Map.create();
  this.Player.create();

  this.Platform1 = new Platform('fade', {
    x: 1520,
    y: 920,
    width: 60,
  }, this);
  this.Platform1.create();
  this.Platform2 = new Platform('fade', {
    x: 1820,
    y: 1120,
    width: 60,
  }, this);
  this.Platform2.create();
}

function update() {

  this.Player.update();

  this.Platform1.update();
  this.Platform2.update();

  if (cursors.left.isDown)
  {
      this.Player.player.body.velocity.x = -300;
  }
  else if (cursors.right.isDown)
  {
      this.Player.player.body.velocity.x = 300;
  }

  if (jumpButton.isDown && this.Player.player.body.onFloor() && Game.time.now > jumpTimer)
  {
      this.Player.jump();
      jumpTimer = Game.time.now + 150;
  }

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
}

function render() {

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
  this.tilemap.addTilesetImage('tilemap', 'tilemap', 40, 40);
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
  if(this.type == 'moving') {

  }
  if(this.type == 'fade') {
    this.platform = this.Game.add.sprite(this.set.x, this.set.y, 'fadePlatform');
    this.platform.width = this.set.width,
    this.Game.physics.enable(this.platform, Phaser.Physics.ARCADE);
    this.platform.body.immovable = true;
    this.platform.body.allowGravity = false;
  }
}

Platform.prototype.update = function() {

  //Столкновения
  this.Game.physics.arcade.collide(this.Game.Player.player, this.platform, this.fade, null, this.Game);
}

Platform.prototype.fade = function(player, platform) {
  platform.kill();
  setTimeout(() => {
    platform.revive();
  }, 1000);
}

module.exports = Platform;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function Player(Game) {
    this.Game = Game;
}

Player.prototype.create = function() {
  this.player = this.Game.add.sprite(80, 1000, 'char');
  this.Game.physics.enable(this.player, Phaser.Physics.ARCADE);

  this.player.body.bounce.y = 0;
  this.player.body.collideWorldBounds = true;

  console.log(this.player.body);
  //this.Game.camera.follow(this.player);
}

Player.prototype.update = function() {
  this.player.body.velocity.x = 0;

  //Столкновения
  this.Game.physics.arcade.collide(this.player, this.Game.Map.mapLayer);

}

Player.prototype.jump = function() {
  this.player.body.velocity.y = -700;
}

module.exports = Player;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

let game = __webpack_require__( 0 );


/***/ })
/******/ ]);