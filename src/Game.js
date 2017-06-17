let Map = require( './elements/Map' );
let Player = require( './elements/Player' );
let Platform = require( './elements/Platform' );
let Spike = require( './elements/Spike' );
let Rope = require( './elements/Rope' );
let Stairs = require( './elements/Stairs' );
let Worker = require( './elements/Worker' );
let Bonus = require( './elements/Bonus' );
let Gun = require( './elements/Gun' );
let Fire = require( './elements/Fire' );
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
    fadePlatform: 'images/fade_platform.png',
    menuBg: 'images/menuBg.png',
}

function preload() {
    for(spriteKey in sprites) {
        this.load.image(spriteKey, sprites[spriteKey]);
    }

    Game.load.spritesheet('danila_dih', 'images/danila_dih.png', 40, 60);

    Game.load.tilemap('tilemap', 'tilemap_objects.csv', null, Phaser.Tilemap.CSV);
    Game.load.tilemap('tilemapWalls', 'tilemap_walls.csv', null, Phaser.Tilemap.CSV);

    this.global = {
        root: root,
    };

    this.Map = new Map(this);
    this.Player = new Player(this);

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

  this.cursors = Game.input.keyboard.createCursorKeys();
  this.jumpButton = Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.checkButton = Game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
  this.jumpTimer = 0;

  this.Map.create();


  // this.Guns = [];
  // this.Guns[0] = new Gun({
  //   x: 500,
  //   y: 1000,
  // }, this);
  // this.Guns[0].create();

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
    x: 790,
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

  //Огонь
  this.FireAll = [];
  this.FireAll[0] = new Fire({
    x: 3400,
    y: 1340,
    height: 500,
  }, this);
  this.FireAll[0].create();

  //Работники
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
  //Рыжич
  this.Workers[14] = new Worker({
    x: 860,
    y: 130,
  }, this);
  this.Workers[14].create();

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

  this.Player.create();

  //GUI
  this.Money.create();
  this.Menu.create();
}

function update() {
  this.Menu.update();

  if(Game.physics.arcade.isPaused) return;

  this.Money.update();

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
  for(let i = 0; i < this.FireAll.length; i++) {
    this.FireAll[i].update();
  }
  // for(let i = 0; i < this.Guns.length; i++) {
  //   this.Guns[i].update();
  // }

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

  //Game.camera.follow(this.Player.player, Phaser.Camera.FOLLOW_PLATFORMER);

}



function render() {
  //Game.debug.spriteInfo(this.Player.player, 32, 32);
}

module.exports = Game;
