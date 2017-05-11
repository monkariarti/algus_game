let Map = require( './elements/Map' );
let Player = require( './elements/Player' );
let Platform = require( './elements/Platform' );
let Spike = require( './elements/Spike' );
let Rope = require( './elements/Rope' );
let Stairs = require( './elements/Stairs' );

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
  Game.physics.arcade.gravity.y = 490;

  Game.camera.y = 550;

  cursors = Game.input.keyboard.createCursorKeys();
  jumpButton = Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

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

  if (cursors.up.isDown) {
    if(this.Player.player.inRope || this.Player.player.inStairs) {
      this.Player.player.body.velocity.y = -250;
    }
  }
  if (cursors.down.isDown) {
    if(this.Player.player.inRope || this.Player.player.inStairs) {
      this.Player.player.body.velocity.y = 250;
    }
  }
  if (cursors.left.isDown) {
      this.Player.player.body.velocity.x = -250;
  }
  else if (cursors.right.isDown) {
      this.Player.player.body.velocity.x = 250;
  }

  if (jumpButton.isDown && (this.Player.player.body.onFloor() || this.Player.player.inPlatform) && Game.time.now > jumpTimer) {
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
