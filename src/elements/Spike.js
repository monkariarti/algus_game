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
  this.Game.physics.arcade.collide(this.Game.Player.player, this.spike);
}

module.exports = Spike;
