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
