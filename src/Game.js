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
