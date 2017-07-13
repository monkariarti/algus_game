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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

let Map = __webpack_require__( 6 );
let Player = __webpack_require__( 8 );
let Boss = __webpack_require__( 2 );
let Platform = __webpack_require__( 7 );
let Spike = __webpack_require__( 10 );
let Rope = __webpack_require__( 9 );
let Stairs = __webpack_require__( 11 );
let Worker = __webpack_require__( 12 );
let Bonus = __webpack_require__( 1 );
let Gun = __webpack_require__( 5 );
let Fire = __webpack_require__( 4 );
let Door = __webpack_require__( 3 );
let Menu = __webpack_require__( 13 );
let Money = __webpack_require__( 14 );

let root = document.getElementById('root');
var Game = new Phaser.Game(root.offsetWidth, root.offsetHeight, Phaser.AUTO, 'root', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

let sprites = {
    black: 'images/black.png',
    tilemap: 'images/map_sprites.png',
    char: 'images/char.png',
    topWalls: 'images/top_walls.png',
    bottomWalls: 'images/bottom_walls.png',
    fadePlatform: 'images/fade_platform.png',
    fadePlatform1: 'images/fade_platform_1.png',
    fadePlatform2: 'images/fade_platform_2.png',
    movePlatform: 'images/move_platform.png',
    rope: 'images/rope.png',
    menuBg: 'images/menuBg.png',
    danila: 'images/danila1.png',
    clear: 'images/clear.png',
    bonus: 'images/bonus.png',
    hrusha: 'images/hrusha.png',
    fan: 'images/fan2.png',
    air: 'images/air2.png',
    bomb: 'images/bomb.png',
    key: 'images/key.png',
    door: 'images/door.png',
    lever: 'images/lever.png',
    start: 'images/start.png',
    end: 'images/end.png',
}

function preload() {
    for(spriteKey in sprites) {
      this.load.image(spriteKey, sprites[spriteKey]);
    }

    this.load.image('worker_1', 'images/workers/1.png');
    this.load.image('worker_2', 'images/workers/2.png');
    this.load.image('worker_3', 'images/workers/3.png');
    this.load.image('worker_4', 'images/workers/4.png');
    this.load.image('worker_5', 'images/workers/5.png');
    this.load.image('worker_6', 'images/workers/6.png');
    this.load.image('worker_7', 'images/workers/7.png');
    this.load.image('worker_8', 'images/workers/8.png');
    this.load.image('worker_9', 'images/workers/9.png');
    this.load.image('worker_10', 'images/workers/10.png');
    this.load.image('worker_1`', 'images/workers/11.png');
    this.load.image('worker_12', 'images/workers/12.png');
    this.load.image('worker_13', 'images/workers/13.png');
    this.load.image('worker_14', 'images/workers/14.png');
    this.load.image('worker_15', 'images/workers/15.png');
    this.load.image('worker_16', 'images/workers/16.png');

    Game.load.spritesheet('danila_run', 'images/danila_run.png', 40, 60);
    Game.load.spritesheet('danila2', 'images/danila2.png', 40, 60);
    Game.load.spritesheet('exp1', 'images/exp1.png', 150, 150);
    Game.load.spritesheet('table', 'images/table.png', 110, 60);
    Game.load.spritesheet('boss', 'images/boss.png', 239, 140);

    Game.load.tilemap('tilemap', 'tilemap_objects.csv', null, Phaser.Tilemap.CSV);
    Game.load.tilemap('tilemapWalls', 'tilemap_walls.csv', null, Phaser.Tilemap.CSV);
    Game.load.tilemap('tilemapOther', 'tilemap_other.csv', null, Phaser.Tilemap.CSV);

    this.global = {
      root: root,
    };

    this.Map = new Map(this);
    this.Player = new Player(this);
    this.Boss = new Boss(this);

    //GUI
    this.Money = new Money(this);
    this.Menu = new Menu(this);
}

function create() {
  Game.world.setBounds(0, 0, 4000, 2000);

  Game.stage.backgroundColor = '#ffffff';

  Game.physics.startSystem(Phaser.Physics.ARCADE);
  Game.physics.arcade.gravity.y = 490;

  Game.camera.y = 550;

  this.Map.create();

  //Бонусы
  this.Bonuses = [];
  this.Bonuses[0] = new Bonus({
    x: 100,
    y: 530,
  }, this);
  this.Bonuses[0].create();
  this.Bonuses[1] = new Bonus({
    x: 440,
    y: 410,
  }, this);
  this.Bonuses[1].create();
  this.Bonuses[2] = new Bonus({
    x: 640,
    y: 130,
  }, this);
  this.Bonuses[2].create();
  this.Bonuses[3] = new Bonus({
    x: 1480,
    y: 330,
  }, this);
  this.Bonuses[3].create();
  this.Bonuses[4] = new Bonus({
    x: 2680,
    y: 110,
  }, this);
  this.Bonuses[4].create();
  this.Bonuses[5] = new Bonus({
    x: 3480,
    y: 130,
  }, this);
  this.Bonuses[5].create();
  this.Bonuses[6] = new Bonus({
    x: 440,
    y: 870,
  }, this);
  this.Bonuses[6].create();
  this.Bonuses[7] = new Bonus({
    x: 900,
    y: 950,
  }, this);
  this.Bonuses[7].create();
  this.Bonuses[8] = new Bonus({
    x: 2100,
    y: 770,
  }, this);
  this.Bonuses[8].create();
  this.Bonuses[9] = new Bonus({
    x: 2290,
    y: 870,
  }, this);
  this.Bonuses[9].create();
  this.Bonuses[10] = new Bonus({
    x: 3260,
    y: 1070,
  }, this);
  this.Bonuses[10].create();
  this.Bonuses[11] = new Bonus({
    x: 3120,
    y: 1290,
  }, this);
  this.Bonuses[11].create();
  this.Bonuses[12] = new Bonus({
    x: 3700,
    y: 1590,
  }, this);
  this.Bonuses[12].create();
  this.Bonuses[13] = new Bonus({
    x: 3000,
    y: 1810,
  }, this);
  this.Bonuses[13].create();
  this.Bonuses[14] = new Bonus({
    x: 2640,
    y: 1430,
  }, this);
  this.Bonuses[14].create();
  this.Bonuses[15] = new Bonus({
    x: 2420,
    y: 1910,
  }, this);
  this.Bonuses[15].create();
  this.Bonuses[16] = new Bonus({
    x: 1620,
    y: 1510,
  }, this);
  this.Bonuses[16].create();
  this.Bonuses[17] = new Bonus({
    x: 980,
    y: 1630,
  }, this);
  this.Bonuses[17].create();
  this.Bonuses[18] = new Bonus({
    x: 220,
    y: 1530,
  }, this);
  this.Bonuses[18].create();
  for(let b = 19; b < 39; b++) {
    this.Bonuses[b] = new Bonus({
      x: Game.rnd.between(250, 850),
      y: Game.rnd.between(1820, 1910),
      death: true,
    }, this);
    this.Bonuses[b].create();
  }

  this.Guns = [];
  this.Guns[0] = new Gun(1,
  {
    x: 700,
    y: 860,
  },
  {
    x: 720,
    y: 700,
  }, this);
  this.Guns[0].create();

  this.Guns[1] = new Gun(3,
  {
    x: 2200,
    y: 860,
  },
  {
    x: 1520,
    y: 730,
  }, this);
  this.Guns[1].create();

  this.Guns[2] = new Gun(3,
  {
    x: 3960,
    y: 380,
  },
  {
    x: 3220,
    y: 40,
  }, this);
  this.Guns[2].create();

  this.Guns[3] = new Gun(1,
  {
    x: 3060,
    y: 980,
  },
  {
    x: 3250,
    y: 730,
  }, this);
  this.Guns[3].create();

  // this.Guns[4] = new Gun(2,
  // {
  //   x: 2620,
  //   y: 1500,
  // },
  // {
  //   x: 2300,
  //   y: 1350,
  // }, this);
  // this.Guns[4].create();

  //Пропадающие платформы
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
    sprite: 'fadePlatform2',
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
    sprite: 'fadePlatform1',
  }, this);
  this.FadePlatforms[4].create();
  this.FadePlatforms[5] = new Platform('fade', {
    x: 840,
    y: 480,
    width: 60,
  }, this);
  this.FadePlatforms[5].create();

  //Двигающиеся платформы
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
  this.MovingPlatforms[3] = new Platform('moving', {
    x: 1060,
    y: 180,
    width: 120,
  }, this);
  this.MovingPlatforms[3].create();
  this.MovingPlatforms[4] = new Platform('moving', {
    x: 360,
    y: 380,
    width: 120,
  }, this);
  this.MovingPlatforms[4].create();

  //Шипы
  this.Spikes = [];
  this.Spikes[0] = new Spike({
    x: 1400,
    y: 1220,
    width: 620,
    height: 120,
  }, this);
  this.Spikes[0].create();
  this.Spikes[1] = new Spike({
    x: 780,
    y: 660,
    width: 60,
    height: 20,
    noCollidesBot: true,
  }, this);
  this.Spikes[1].create();
  this.Spikes[2] = new Spike({
    x: 3040,
    y: 660,
    width: 60,
    height: 20,
    noCollidesBot: true,
  }, this);
  this.Spikes[2].create();

  //Веревки
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

  //Лестницы
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
  this.Stairs[2] = new Stairs({
    x: 360,
    y: 1760,
    width: 120,
    height: 100,
  }, this);
  this.Stairs[2].create();

  // //Огонь
  // this.FireAll = [];
  // this.FireAll[0] = new Fire({
  //   x: 3400,
  //   y: 1340,
  //   height: 500,
  // }, this);
  // this.FireAll[0].create();
  // this.FireAll[1] = new Fire({
  //   x: 2620,
  //   y: 1380,
  //   height: 300,
  //   align: 'top',
  // }, this);
  // this.FireAll[1].create();

  this.Doors = [];
  this.Doors[0] = new Door({
    x: 160,
    y: 680,
    width: 120,
    height: 20,
    rx: 80,
    ry: 640,
  }, this);
  this.Doors[0].create();
  this.Doors[1] = new Door({
    x: 360,
    y: 1760,
    width: 120,
    height: 20,
    rx: 490,
    ry: 1700,
    key: true
  }, this);
  this.Doors[1].create();

  //Работники
  this.Workers = [];
  //Саня
  this.Workers[0] = new Worker({
    x: 400,
    y: 250,
    sprite: 'worker_4'
  }, this);
  this.Workers[0].create();
  //Костя
  this.Workers[1] = new Worker({
    x: 420,
    y: 650,
    sprite: 'worker_13'
  }, this);
  this.Workers[1].create();
  //Ярик
  this.Workers[2] = new Worker({
    x: 980,
    y: 650,
    sprite: 'worker_14'
  }, this);
  this.Workers[2].create();
  //Миха
  this.Workers[3] = new Worker({
    x: 1680,
    y: 650,
    sprite: 'worker_12'
  }, this);
  this.Workers[3].create();
  //Маша
  this.Workers[4] = new Worker({
    x: 640,
    y: 550,
    sprite: 'worker_9'
  }, this);
  this.Workers[4].create();
  //Ирина
  this.Workers[5] = new Worker({
    x: 980,
    y: 350,
    sprite: 'worker_15'
  }, this);
  this.Workers[5].create();
  //Оля СЕО
  this.Workers[6] = new Worker({
    x: 2540,
    y: 330,
    sprite: 'worker_6'
  }, this);
  this.Workers[6].create();
  //Инна
  this.Workers[7] = new Worker({
    x: 2900,
    y: 330,
    sprite: 'worker_10'
  }, this);
  this.Workers[7].create();
  //Илья
  this.Workers[8] = new Worker({
    x: 3700,
    y: 150,
    sprite: 'worker_8'
  }, this);
  this.Workers[8].create();
  //Лера
  this.Workers[9] = new Worker({
    x: 3540,
    y: 650,
    sprite: 'worker_7'
  }, this);
  this.Workers[9].create();
  //Катя
  this.Workers[10] = new Worker({
    x: 3820,
    y: 530,
    sprite: 'worker_3'
  }, this);
  this.Workers[10].create();
  //Ярик СЕО
  this.Workers[11] = new Worker({
    x: 1140,
    y: 1730,
    sprite: 'worker_5'
  }, this);
  this.Workers[11].create();
  //Анна
  this.Workers[12] = new Worker({
    x: 560,
    y: 1550,
    sprite: 'worker_2'
  }, this);
  this.Workers[12].create();
  //Вера
  this.Workers[13] = new Worker({
    x: 200,
    y: 1730,
    sprite: 'worker_16'
  }, this);
  this.Workers[13].create();
  //Рыжич
  this.Workers[14] = new Worker({
    x: 860,
    y: 130,
    sprite: 'worker_1'
  }, this);
  this.Workers[14].create();

  this.Player.create();

  this.Boss.create();

  //GUI
  this.Money.create();
  this.Menu.create();


  //Создание заплаток для юнитов
  this.Patches = [];
  this.Patches[0] = Game.add.sprite(1540, 1700, 'clear');
  this.Patches[0].width = 20;
  this.Patches[0].height = 60;
  for(let i = 0; i < this.Patches.length; i++) {
    Game.physics.enable(this.Patches[i], Phaser.Physics.ARCADE);
    this.Patches[i].body.immovable = true;
    this.Patches[i].body.allowGravity = false;
  }

  this.endGame = false;

  this.endGameScreen = Game.add.sprite(0, 0, 'end');
  this.endGameScreen.width = Game.camera.width;
  this.endGameScreen.height = Game.camera.height;
  this.endGameScreen.visible = false;
  this.endGameScreen.alpha = 0;
  this.endGameScreen.fixedToCamera = true;
}

function update() {
  this.Menu.update();

  if(this.endGame)  {
    Game.physics.arcade.isPaused = true;
    this.endGameScreen.visible = true;
    this.endGameScreen.alpha += 0.09;
    if(this.endGameScreen.alpha >= 1) {
      this.endGameScreen.alpha = 1;
    }
    this.endGameScreen.bringToTop();
    return;
  }

  if(Game.physics.arcade.isPaused) return;

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

  this.Player.update();

  this.Boss.update();

  for(let i = 0; i < this.Spikes.length; i++) {
    if(!this.Spikes[i].set.noCollidesBot) {
      for(let o = 0; o < this.Workers.length; o++) {
          Game.physics.arcade.collide(this.Workers[o].worker, this.Spikes[i].spike);
      }
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
  for(let i = 0; i < this.Bonuses.length; i++) {
    this.Bonuses[i].update();
  }
  for(let i = 0; i < this.Guns.length; i++) {
    this.Guns[i].update();
  }
  for(let i = 0; i < this.Doors.length; i++) {
    this.Doors[i].update();
  }
  // for(let i = 0; i < this.FireAll.length; i++) {
  //   this.FireAll[i].update();
  // }
  this.Money.update();
}


function render() {
  //Game.debug.spriteInfo(this.Player.player, 32, 32);
}

module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function Bonus(set, Game) {
  this.set = set;
  this.Game = Game;

  this.set.death = set.death || false;
}

Bonus.prototype.create = function() {
  this.createBonus();
}

Bonus.prototype.update = function() {
  //Наложение
  this.Game.physics.arcade.overlap(this.Game.Player.player, this.bonus, this.overlap, null, this);
}

Bonus.prototype.overlap = function(player, bonus) {
  bonus.destroy();
  this.Game.Money.addMoney(100);
  if(!this.set.death) {
    setTimeout(() => {
      this.createBonus();
    }, this.Game.rnd.between(1, 2) * 60 * 1000);
  }
}

Bonus.prototype.createBonus = function() {
  this.bonus = this.Game.add.sprite(this.set.x, this.set.y, 'bonus');
  this.bonus.width = 30;
  this.bonus.height = 30;
  this.bonus.anchor.set(0.5, 0);
  this.Game.physics.enable(this.bonus, Phaser.Physics.ARCADE);
  this.bonus.body.immovable = true;
  this.bonus.body.allowGravity = false;
}

module.exports = Bonus;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function Boss(Game) {
    this.Game = Game;

    this.default = {
      x: 2890,
      y: 1890,
    }

    this.turn = 0;
}

Boss.prototype.create = function() {
  this.boss = this.Game.add.sprite(this.default.x, this.default.y + 10, 'boss');
  this.boss.width = 239;
  this.boss.height = 140;
  this.boss.anchor.set(0.5, 0.5);
  this.boss.health = 10000;
  this.boss.animations.add('left', [1, 3, 5, 7, 5, 3], 6, true);
  this.boss.animations.add('right', [0, 2, 4, 6, 4, 2], 6, true);

  this.Game.physics.enable(this.boss, Phaser.Physics.ARCADE);
  this.boss.body.collideWorldBounds = true;
  this.boss.body.immovable = true;
  this.boss.body.allowGravity = false;
  this.boss.body.bounce.set(1);
  this.boss.body.velocity.set(-150, 0);
  this.boss.body.setSize(161, 140, 39, 0);

  this.weapon = this.Game.add.weapon(30, 'bomb');
  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = 400;
  this.weapon.fireRate = 1500;
  this.weapon.autofire = true;
  this.weapon.bulletAngleVariance = 10;
  this.weapon.fireAngle = 0;
  this.weapon.setBulletBodyOffset(30, 30);
  this.weapon.trackSprite(this.boss, 0, -20);
  this.weapon.bullets.forEach((bullet) => {
    bullet.width = 30;
    bullet.height = 30;
    bullet.body.setSize(30, 30, 0, 0);
    bullet.damage = 1000;
    bullet.body.bounce.set(0.6);
  });
}

Boss.prototype.update = function() {
  //this.Game.physics.arcade.collide(this.Game.Player.player, this.boss, this.collidePlayer, null, this.Game);
  //this.Game.physics.arcade.collide(this.boss, this.Game.Map.mapLayer, null, null, this.Game);

  this.Game.physics.arcade.collide(this.weapon.bullets, this.Game.Map.mapLayer, this.collideBulletMap, null, this);
  this.Game.physics.arcade.collide(this.Game.Player.player, this.weapon.bullets, this.collidePlayerBullet, null, this);
  this.Game.physics.arcade.collide(this.Game.Player.player, this.boss, this.collidePlayerBoss, null, this);

  if(this.boss.x >= 3890) {
    this.boss.body.velocity.set(-150, 0);
    this.turn = 0;
  }
  if(this.boss.x <= 2015) {
    this.boss.body.velocity.set(150, 0);
    this.turn = 1;
  }

  if(this.turn == 1) {
    this.weapon.fireAngle = 0;
    this.boss.play('right', 10, false);
  } else {
    this.weapon.fireAngle = -180;
    this.boss.play('left', 10, false);
  }

  if(this.boss.health <= 0 && !this.boss.death) {
    this.death();
  }

  if(this.key) {
    this.Game.physics.arcade.collide(this.key, this.Game.Player.player, this.collidePlayerKey, null, this);
    this.Game.physics.arcade.collide(this.key, this.Game.Map.mapLayer);
  }
}

Boss.prototype.collidePlayerBoss = function(player, boss) {
  player.death();
}

Boss.prototype.collideBulletMap = function(bullet, map) {
  if(!bullet.timeout) {
    bullet.timeout = setTimeout(() => {
      this.bulletBoom(bullet);
    }, 2000);
  }
}

Boss.prototype.collidePlayerBullet = function(player, bullet) {
  this.bulletBoom(bullet);
  player.death();
}

Boss.prototype.bulletBoom = function(bullet) {
  bullet.kill();

  let explosion = this.Game.add.sprite(bullet.x, bullet.y, 'exp1');
  explosion.width = 150;
  explosion.height = 150;
  explosion.anchor.set(0.5, 0.5);
  explosion.animations.add('boom');
  explosion.animations.play('boom', 64, false, true);

  clearTimeout(bullet.timeout);
  bullet.timeout = false;
}

Boss.prototype.createKey = function() {
  this.key = this.Game.add.sprite(this.boss.x, this.boss.y, 'key');
  this.key.anchor.set(0.5, 0.5);
  this.Game.physics.enable(this.key, Phaser.Physics.ARCADE);
}

Boss.prototype.collidePlayerKey = function(key, player) {
  this.Game.Player.haveBonusesKey = true;
  key.kill();
}

Boss.prototype.death = function() {
  this.boss.kill();
  this.weapon.autofire = false;
  this.createKey();
  this.boss.death = true;
}

module.exports = Boss;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function Door(set, Game) {
  this.set = set;
  this.Game = Game;

  this.set.key = set.key || false;

  this.openTimer = 0;
}

Door.prototype.create = function() {
  this.door = this.Game.add.sprite(this.set.x, this.set.y, 'door');
  this.door.width = this.set.width;
  this.door.height = this.set.height;
  this.door.open = false;

  this.Game.physics.enable(this.door, Phaser.Physics.ARCADE);
  this.door.body.immovable = true;
  this.door.body.allowGravity = false;

  this.lever = this.Game.add.sprite(this.set.rx, this.set.ry + 40, 'lever');
  this.lever.anchor.set(0, 1);
  this.lever.width = 20;
  this.lever.height = 40;

  this.Game.physics.enable(this.lever, Phaser.Physics.ARCADE);
  this.lever.body.immovable = true;
  this.lever.body.allowGravity = false;
}

Door.prototype.update = function() {
  this.lever.overlapPlayer = false;

  this.Game.physics.arcade.collide(this.door, this.Game.Player.player, null, null, this);

  this.Game.physics.arcade.overlap(this.lever, this.Game.Player.player, this.leverOverlap, null, this);

  if(this.lever.overlapPlayer && this.Game.Player.checkButton.isDown && this.Game.time.now > this.openTimer) {
    this.openCloseDoor();
    this.openTimer = this.Game.time.now + 500;
  }
}

Door.prototype.leverOverlap = function(lever, player) {
  lever.overlapPlayer = true;
}

Door.prototype.openCloseDoor = function() {
  if(this.set.key && !this.Game.Player.haveBonusesKey) {
    alert('Вам нужен ключ от хранилища!');
    return;
  }
  if(this.door.open) {
    this.door.open = false;
    this.door.x = this.set.x;
    this.lever.angle = 0;
  } else {
    this.lever.angle = 20;
    this.door.open = true;
    this.door.x -= this.door.width;
  }
}

module.exports = Door;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

function Fire(set, Game) {
  this.set = set;
  this.Game = Game;
  this.set.align = this.set.align || 'bottom'
}

Fire.prototype.create = function() {
  this.fire = this.Game.add.sprite(this.set.x, this.set.y, 'black');
  this.Game.physics.enable(this.fire, Phaser.Physics.ARCADE);
  this.fire.width = 40;
  this.fire.height = this.set.height;
  if(this.set.align == 'bottom') {
    this.fire.anchor.set(0, 1);
  } else {
    this.fire.anchor.set(0, 0);
  }
  this.fire.visible = false;
  this.fire.body.immovable = true;
  this.fire.body.allowGravity = false;

  this.rndFire();
}

Fire.prototype.update = function() {
    if(this.fire.visible) {
        this.Game.physics.arcade.collide(this.Game.Player.player, this.fire, this.checkFire, null, this);
    }
}

Fire.prototype.checkFire = function(player, fire) {
    player.death();
}

Fire.prototype.rndFire = function() {
    this.interval = setInterval(() => {
        this.fire.visible = true;
        setTimeout(() => {
            this.fire.visible = false;
        }, 2000)
    }, this.Game.rnd.between(3, 6) * 1000);
}

module.exports = Fire;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

function Gun(rotation, set, poligon_set, Game) {
  this.rotation = rotation;
  this.set = set;
  this.poligon_set = poligon_set;
  this.Game = Game;
}

Gun.prototype.create = function() {
  this.gun = this.Game.add.sprite(this.set.x, this.set.y, 'fan');
  this.gun.width = 31;
  this.gun.height = 62;
  this.Game.physics.enable(this.gun, Phaser.Physics.ARCADE);
  this.gun.body.immovable = true;
  this.gun.body.allowGravity = false;
  this.gun.anchor.set(0, 0.5);

  this.circle = new Phaser.Circle(this.poligon_set.x+350, this.poligon_set.y+350, 700);
  this.graphics = this.Game.add.graphics(0, 0);
  //очертание полигона
  //this.graphics.lineStyle(1, 0x00ff00, 1);
  this.graphics.drawCircle(this.circle.x, this.circle.y, this.circle.diameter);

  this.weapon = this.Game.add.weapon(30, 'air');
  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = 700;
  this.weapon.fireRate = 4000;
  this.weapon.trackSprite(this.gun, 60, 0, true);
  this.weapon.bullets.forEach((bullet) => {
    bullet.width = 38;
    bullet.height = 28;
  });
}

Gun.prototype.update = function() {
  if (this.rotation == 1) {
    this.gun.angle = 0;
  } else if (this.rotation == 2) {
    this.gun.angle = 90;
  } else if (this.rotation == 3) {
    this.gun.angle = 180;
  } else if (this.rotation == 4) {
    this.gun.angle = 270;
  }

  if (check_overlap(this.Game.Player.player, this.graphics)) {
    this.gun.rotation = this.Game.physics.arcade.angleBetween(this.gun, this.Game.Player.player);
    this.weapon.fire();
  }

  this.Game.physics.arcade.collide(this.weapon.bullets, this.Game.Player.player, function(bullet, enemy){bullet.death(); enemy.kill();});
  this.Game.physics.arcade.collide(this.weapon.bullets, this.Game.Map.mapLayer, function(bullet, enemy){bullet.kill();});
}


module.exports = Gun;

function check_overlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

function Map(Game) {
    this.Game = Game;
}

Map.prototype.create = function() {
  // this.walls = this.Game.add.tilemap('tilemapWalls', 20, 20);
  // this.walls.addTilesetImage('tilemapWalls', 'tilemap', 20, 20);
  // this.wallsLayer =  this.walls.createLayer(0);
  this.topWalls = this.Game.add.tileSprite(0, 0, this.Game.camera.width, this.Game.camera.height, 'topWalls');
  this.topWalls.fixedToCamera = true;
  this.bottomWalls = this.Game.add.tileSprite(0, 1360, this.Game.world.width, 4000 - 1360, 'bottomWalls');

  this.other = this.Game.add.tilemap('tilemapOther', 20, 20);
  this.other.addTilesetImage('tilemapOther', 'tilemap', 20, 20);
  this.otherLayer =  this.other.createLayer(0);

  this.tilemap = this.Game.add.tilemap('tilemap', 20, 20);
  this.tilemap.addTilesetImage('tilemap', 'tilemap', 20, 20);
  this.tilemap.setCollisionByExclusion([28, 31, 44, 57, 104, 105, 106, 107, 108, 109, 110, 111, 91, 98]);

  this.mapLayer =  this.tilemap.createLayer(0);
  this.Game.physics.enable(this.mapLayer, Phaser.Physics.ARCADE);
  this.mapLayer.body.immovable = true;
  this.mapLayer.body.allowGravity = false;
}

module.exports = Map;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

function Platform(type, set, Game) {
  this.type = type;
  this.set = set;
  this.Game = Game;
  this.set.sprite = set.sprite || 'fadePlatform';
}

Platform.prototype.create = function() {
  this.set.height = this.set.height ? this.set.height : 20;
  //Подвижная плафторма
  if(this.type == 'moving') {
    this.platform = this.Game.add.tileSprite(this.set.x, this.set.y, this.set.width, this.set.height, 'movePlatform');
  }
  //Пропадающая платформа
  if(this.type == 'fade') {
    this.platform = this.Game.add.tileSprite(this.set.x, this.set.y, this.set.width, this.set.height, this.set.sprite);
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
    this.platform.position.x = this.set.x;
    this.platform.position.y = this.set.y;
    //Столкновения
    this.Game.physics.arcade.collide(this.Game.Player.player, this.platform, this.fade, null, this.Game);
  }

  this.Game.physics.arcade.collide(this.Game.Player.weapon.bullets, this.platform, null, null, this.Game);
  this.Game.physics.arcade.collide(this.Game.Boss.weapon.bullets, this.platform, null, null, this.Game);
}

Platform.prototype.checkPlatform = function(player, platform) {
  player.inPlatform = true;
}

Platform.prototype.fade = function(player, platform) {
  platform.kill();
  setTimeout(() => {
    platform.revive();
  }, 1000);
}

module.exports = Platform;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

function Player(Game) {
    this.Game = Game;

    this.default = {
      x: 120,
      y: 1000,
      // x: 2290,
      // y: 1840,
    };

    this.haveBonusesKey = false;

    this.cursors = this.Game.input.keyboard.createCursorKeys();
    this.jumpButton = this.Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.checkButton = this.Game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
    this.jumpTimer = 0;

    this.turn = 'right';
    this.animTimer = 0;

    this.countWorkers = 0;
}

Player.prototype.create = function() {
  this.player = this.Game.add.sprite(this.default.x, this.default.y, 'danila2');
  this.Game.physics.enable(this.player, Phaser.Physics.ARCADE);

  this.player.width = 40;
  this.player.height = 60;
  this.player.body.bounce.y = 0;
  this.player.body.gravity.y = 980;
  this.player.body.collideWorldBounds = true;

  this.player.body.tilePadding.x = 10;
  this.player.body.tilePadding.y = 10;

  this.player.anchor.set(0.5, 1);

  //АНИМАЦИИ
  this.player.animations.add('stay', [0], 0, true);
  this.player.animations.add('handup', [1], 0, true);
  //Бег
  // this.player.animations.add('right', [1, 2, 3, 4, 5], 8, true);
  // this.player.animations.add('left', [6, 7, 8, 9, 10], 8, true);

  this.player.death = () => {
    this.player.x = this.default.x;
    this.player.y = this.default.y;
    this.Game.camera.flash(0xff0000, 500);
    //this.Game.camera.shake(0.05, 200);
  }

  this.player.haveWorker = false;


  this.weapon = this.Game.add.weapon(30, 'bomb');
  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = 400;
  this.weapon.fireRate = 800;
  this.weapon.autofire = false;
  this.weapon.bulletAngleVariance = 10;
  this.weapon.fireAngle = 0;
  this.weapon.setBulletBodyOffset(30, 30);
  this.weapon.trackSprite(this.player, 0, -45);
  this.weapon.bullets.forEach((bullet) => {
    bullet.width = 15;
    bullet.height = 15;
    bullet.damage = 500;
    bullet.body.setSize(15, 15, 0, 0);
    bullet.body.bounce.set(0.6);
  });

  //this.player.animations.stop();

  //this.Game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
}

Player.prototype.update = function() {
  this.player.body.velocity.x = 0;

  //Выход за пределы карты
  if(this.player.body.checkWorldBounds()) {
    this.player.death();
  }

  //Столкновения с картой
  this.Game.physics.arcade.collide(this.player, this.Game.Map.mapLayer, null, this.collideMap, this.Game);

  //АНИМАЦИИ
  //Дыхание
  // if(this.player.body.velocity.x == 0) {
  //   this.player.animations.play('dih', 9, true);
  // } else {
  //   this.player.animations.stop('dih', 0);
  // }

  if (this.cursors.up.isDown) {
    if(this.player.inRope || this.player.inStairs) {
      this.player.body.velocity.y = -250;
    }
  } else if (this.cursors.down.isDown) {
    if(this.player.inRope || this.player.inStairs) {
      this.player.body.velocity.y = 250;
    }
  }
  if (this.cursors.left.isDown) {
    this.player.body.velocity.x = -250;
    this.turn = 'left';
  }
  else if (this.cursors.right.isDown) {
    this.player.body.velocity.x = 250;
    this.turn = 'right';
  }
  if(this.Game.time.now > this.animTimer && (this.player.body.onFloor() || this.player.inPlatform || this.player.inRope || this.player.inStairs)) {
    if(this.cursors.left.isDown || this.cursors.up.isDown || this.cursors.right.isDown)  {
      if(this.player.angle == 7) {
        this.player.angle = -7;
      } else {
        this.player.angle = 7;
      }
      this.animTimer = this.Game.time.now + 200;
    } else {
      this.player.angle = 0;
    }
  }

  this.player.animations.play('stay', 0);
  if(this.countWorkers > 0) {
    this.player.animations.play('handup', 0);
  }

  //Прыжок
  if (this.jumpButton.isDown && (this.player.body.onFloor() || this.player.inPlatform) && this.Game.time.now > this.jumpTimer) {
    this.jump();
    this.jumpTimer = this.Game.time.now + 150;
  }

  //Платформы
  this.player.inPlatform = false;
  //Веревки
  this.player.inRope = false;
  //Лестницы
  this.player.inStairs = false;


  //Орудие
  this.Game.physics.arcade.collide(this.weapon.bullets, this.Game.Map.mapLayer, this.collideBulletMap, null, this);
  this.Game.physics.arcade.collide(this.Game.Boss.boss, this.weapon.bullets, this.collideBossBullet, null, this);
  this.Game.physics.arcade.collide(this.Game.Boss.weapon.bullets, this.weapon.bullets, this.collideBulletVsBullet, null, this);

  if(this.turn == 'left') {
    this.weapon.fireAngle = 180;
  } else {
    this.weapon.fireAngle = 0;
  }
  if (this.checkButton.isDown && (this.player.x >= 1995 && this.player.x <= 3920) && this.player.y >= 1760) {
    this.weapon.fire();
  }

  //Камера по X
  let widthScr = this.Game.global.root.offsetWidth / 3;
  let screenWCount = Math.floor(this.player.x / widthScr);
  if(this.player.x > widthScr * screenWCount) {
    this.Game.camera.x = widthScr * screenWCount - widthScr / 2;
  }
  //Камера по Y
  if(this.player.y > 720) {
    this.Game.camera.y = 550;
  }
  if(this.player.y < 720) {
    this.Game.camera.y = 0;
  }
  if(this.player.y > 1340) {
    this.Game.camera.y = 1280;
  }
  if(this.player.y < 1340 && this.player.y > 720) {
    this.Game.camera.y = 550;
  }
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

Player.prototype.collideBulletMap = function(bullet, map) {
  if(!bullet.timeout) {
    bullet.timeout = setTimeout(() => {
      this.bulletBoom(bullet);
    }, 2000);
  }
}

Player.prototype.collideBossBullet = function(boss, bullet) {
  this.bulletBoom(bullet);
  this.Game.Boss.boss.health -= bullet.damage;
}
Player.prototype.collideBulletVsBullet = function(bullet1, bullet2) {
  this.Game.Boss.bulletBoom(bullet1);
  this.bulletBoom(bullet2);
}

Player.prototype.bulletBoom = function(bullet) {
  bullet.kill();

  let explosion = this.Game.add.sprite(bullet.x, bullet.y, 'exp1');
  explosion.width = 100;
  explosion.height = 100;
  explosion.anchor.set(0.5, 0.5);
  explosion.animations.add('boom');
  explosion.animations.play('boom', 64, false, true);

  clearTimeout(bullet.timeout);
  bullet.timeout = false;
}

module.exports = Player;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

function Rope(set, Game) {
  this.set = set;
  this.Game = Game;
}

Rope.prototype.create = function() {
  this.rope = this.Game.add.tileSprite(this.set.x-3, this.set.y, 7, this.set.height, 'rope');
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
/* 10 */
/***/ (function(module, exports) {

function Spike(set, Game) {
  this.set = set;
  this.Game = Game;
}

Spike.prototype.create = function() {
  this.spike = this.Game.add.sprite(this.set.x, this.set.y, 'clear');
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
/* 11 */
/***/ (function(module, exports) {

function Stairs(set, Game) {
  this.set = set;
  this.Game = Game;
}

Stairs.prototype.create = function() {
  this.stairs = this.Game.add.sprite(this.set.x, this.set.y, 'clear');
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
/* 12 */
/***/ (function(module, exports) {

function Worker(set, Game) {
  this.set = set;
  this.Game = Game;

  this.set.sprite = set.sprite || 'char';

  this.upTimer = 0;
  this.moneyTimer = 0;
}

Worker.prototype.create = function() {
  this.table = this.Game.add.sprite(this.set.x, this.set.y-30, 'table');
  this.Game.physics.enable(this.table, Phaser.Physics.ARCADE);
  this.table.body.immovable = true;
  this.table.body.allowGravity = false;
  this.table.animations.add('select');

  this.worker = this.Game.add.sprite(this.set.x + 30, this.set.y - 30, this.set.sprite);
  this.Game.physics.enable(this.worker, Phaser.Physics.ARCADE);
  this.worker.width = 40;
  this.worker.height = 60;
  this.worker.body.bounce.x = 1;
  this.worker.body.gravity.y = 980;
  this.worker.body.width = 30;
  this.worker.body.collideWorldBounds = true;
  this.worker.isUp = false;
  this.worker.inPlayer = false;
}

Worker.prototype.update = function() {
  this.worker.overlapPlayer = false;
  this.table.overlapPlayer = false;

  //Столкновения с картой
  this.Game.physics.arcade.collide(this.worker, this.Game.Map.mapLayer, this.collideMap, null, this.Game);

  //Столкновения с заплатками
  this.Game.physics.arcade.collide(this.worker, this.Game.Patches);

  this.Game.physics.arcade.overlap(this.Game.Player.player, this.worker, this.overlapPlayer, null, this.Game);
  this.Game.physics.arcade.overlap(this.Game.Player.player, this.table, this.overlapTablePlayer, null, this.Game);

  if(this.Game.time.now > this.upTimer && !this.worker.isUp) {
    this.worker.isUp = true;
    this.moveWorker();
  }

  if(this.worker.overlapPlayer && this.Game.Player.checkButton.isDown && this.worker.isUp ) {
    this.goInPlayer();
    this.Game.Player.player.haveWorker = true;
  }

  if(this.worker.inPlayer) {
    this.worker.position.x = this.Game.Player.player.position.x + 30;
    this.worker.position.y = this.Game.Player.player.position.y - 90;

    this.table.animations.play('select', 1);
  } else {
    this.table.animations.currentAnim.setFrame(0);
    this.table.animations.stop('select', 1);
  }

  if(this.table.overlapPlayer && this.worker.inPlayer) {
    this.startWorkWorker();
    this.Game.Player.player.haveWorker = false;
  }

  //Деньги
  if(!this.worker.isUp && !this.worker.inPlayer && this.Game.time.now >= this.moneyTimer) {
    this.Game.Money.addMoney(1);
    this.moneyTimer = this.Game.time.now + 1000;
  }

  this.table.bringToTop();
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
  this.Game.Player.countWorkers--;
}

Worker.prototype.goInPlayer = function() {
  this.worker.body.velocity.x = 0;
  this.worker.body.velocity.y = 0;
  this.worker.angle = 90;
  this.worker.body.allowGravity = false;
  this.worker.inPlayer = true;
  this.worker.isUp = false;
  this.Game.Player.countWorkers++;
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
/* 13 */
/***/ (function(module, exports) {

function Menu(Game) {
  this.Game = Game;

  this.textStyle = { font: "40px Arial", fill: "#000000" };
  this.textStyleHover = { font: "40px Arial", fill: "#333333" };

  this.paused = false;
  this.firstStart = true;
}

Menu.prototype.create = function() {
  this.bg = this.Game.add.sprite(0, 0, 'start');
  this.bg.fixedToCamera = true;
  //this.bg.anchor.set(0.5, 05);
  this.bg.width = this.Game.camera.width;
  this.bg.height = this.Game.camera.height;

  this.startGame = this.Game.add.text(this.Game.camera.width / 2, this.Game.camera.height / 2 + 5, "Начать игру", this.textStyle);
  this.startGame.anchor.set(0.5, 0.5);
  this.startGame.fixedToCamera = true;
  this.startGame.inputEnabled = true;

  this.startGame.events.onInputOver.add((e) => {
    e.setStyle(this.textStyleHover, true);
  }, this.Game);
  this.startGame.events.onInputOut.add((e) => {
    e.setStyle(this.textStyle, true);
  }, this.Game);
  this.startGame.events.onInputDown.add((e) => {
    this.close();
  }, this.Game);

  this.open();
}

Menu.prototype.update = function() {
  this.bindKey();
  this.bg.bringToTop();
  this.startGame.bringToTop();
}

Menu.prototype.bindKey = function() {
  if (this.Game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
    this.open();
  }
}

Menu.prototype.open = function() {
  this.Game.physics.arcade.isPaused = true;
  this.bg.revive();
  this.startGame.revive();

  if(!this.firstStart) {
    this.startGame.setText('Продолжить игру');
  }
  this.firstStart = false;
}

Menu.prototype.close = function() {
  this.Game.physics.arcade.isPaused = false;
  this.bg.kill();
  this.startGame.kill();
  this.endGame = false;
}

module.exports = Menu;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

function Money(Game) {
  this.Game = Game;

  this.textStyle = { font: "40px Arial", fill: "#fbd609" };

  this.money = 0;
  this.maxMoney = 6000;

  this.penalty = 200;
}

Money.prototype.create = function() {
  this.hrusha = this.Game.add.sprite(5, 5, 'hrusha');
  this.hrusha.fixedToCamera = true;

  this.text = this.Game.add.text(120, 36, this.money + " / " + this.maxMoney, this.textStyle);
  this.text.stroke = "#f4951d";
  this.text.strokeThickness = 8;
  this.text.fixedToCamera = true;
}

Money.prototype.update = function() {
  this.hrusha.bringToTop();
  this.text.setText(this.money + " / " + this.maxMoney);
  this.text.bringToTop();
}

Money.prototype.addMoney = function(money) {
  this.money += money;
  if(this.money >= this.maxMoney) {
    this.Game.endGame = true;
  }
}

Money.prototype.setPenalty = function(money) {
  this.money -= money;
}

module.exports = Money;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

let game = __webpack_require__( 0 );


/***/ })
/******/ ]);