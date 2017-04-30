let Map = require( './elements/Map' );
let Player = require( './elements/Player' );
let Platform = require( './elements/Platform' );

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
    black: '/images/black.png',
    tilemap: '/images/tilemap.png',
    char: '/images/char.png',
    fadePlatform: '/images/fade_platform.png',
}

function preload() {
    for(spriteKey in sprites) {
        this.load.image(spriteKey, sprites[spriteKey]);
    }

    Game.load.tilemap('tilemap', '/tilemap.csv', null, Phaser.Tilemap.CSV);

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
