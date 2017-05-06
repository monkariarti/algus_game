function Rope(set, Game) {
  this.set = set;
  this.Game = Game;
}

Rope.prototype.create = function() {
  this.rope = this.Game.add.sprite(this.set.x, this.set.y, 'black');
  this.rope.width = 5;
  this.rope.height = this.set.height;
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
