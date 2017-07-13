let Map = require( './elements/Map' );
let Player = require( './elements/Player' );
let Boss = require( './elements/Boss' );
let Platform = require( './elements/Platform' );
let Spike = require( './elements/Spike' );
let Rope = require( './elements/Rope' );
let Stairs = require( './elements/Stairs' );
let Worker = require( './elements/Worker' );
let Bonus = require( './elements/Bonus' );
let Gun = require( './elements/Gun' );
let Fire = require( './elements/Fire' );
let Door = require( './elements/Door' );
let Menu = require( './gui/Menu' );
let Money = require( './gui/Money' );

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
}

function update() {
  this.Menu.update();

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
