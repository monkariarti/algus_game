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
  this.player.body.gravity.y = 1000;
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
