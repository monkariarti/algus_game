let Map = require( './elements/Map' );
let Player = require( './elements/Player' );
let Platform = require( './elements/Platform' );
let Spike = require( './elements/Spike' );
let Rope = require( './elements/Rope' );
let Stairs = require( './elements/Stairs' );
let Worker = require( './elements/Worker' );

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
  this.jumpTimer = 0;

  this.Map.create();

  this.FadePlatform1 = new Platform('fade', {
    x: 1560,
    y: 920,
    width: 60,
  }, this);
  this.FadePlatform1.create();
  this.FadePlatform2 = new Platform('fade', {
    x: 1900,
    y: 1120,
    width: 100,
  }, this);
  this.FadePlatform2.create();
  this.FadePlatform3 = new Platform('fade', {
    x: 2580,
    y: 1960,
    width: 120,
    height: 40,
  }, this);
  this.FadePlatform3.create();
  this.FadePlatform4 = new Platform('fade', {
    x: 1740,
    y: 1660,
    width: 100,
  }, this);
  this.FadePlatform4.create();

  this.MovingPlatform1 = new Platform('moving', {
    x: 700,
    y: 920,
    width: 120,
  }, this);
  this.MovingPlatform1.create();
  this.MovingPlatform2 = new Platform('moving', {
    x: 3080,
    y: 880,
    width: 120,
  }, this);
  this.MovingPlatform2.create();
  this.MovingPlatform3 = new Platform('moving', {
    x: 2710,
    y: 1580,
    x2: 3480,
    width: 120,
  }, this);
  this.MovingPlatform3.create();

  this.Spike1 = new Spike({
    x: 1400,
    y: 1220,
    width: 620,
    height: 120,
  }, this);
  this.Spike1.create();

  this.Rope1 = new Rope({
    x: 1320,
    y: 920,
    height: 160,
  }, this);
  this.Rope1.create();
  this.Rope2 = new Rope({
    x: 2400,
    y: 680,
    height: 160,
  }, this);
  this.Rope2.create();
  this.Rope3 = new Rope({
    x: 3900,
    y: 880,
    height: 360,
  }, this);
  this.Rope3.create();

  this.Stairs1 = new Stairs({
    x: 3840,
    y: 1340,
    width: 120,
    height: 280,
  }, this);
  this.Stairs1.create();
  this.Stairs2 = new Stairs({
    x: 160,
    y: 680,
    width: 120,
    height: 100,
  }, this);
  this.Stairs2.create();

  this.Workers = [];
  //Саня
  this.Workers[0] = new Worker({
    x: 40,
    y: 650,
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

  this.FadePlatform1.update();
  this.FadePlatform2.update();
  this.FadePlatform3.update();
  this.FadePlatform4.update();

  this.MovingPlatform1.update();
  this.MovingPlatform2.update();
  this.MovingPlatform3.update();

  this.Spike1.update();

  this.Rope1.update();
  this.Rope2.update();
  this.Rope3.update();

  this.Stairs1.update();
  this.Stairs2.update();

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
