function Player(Game) {
    this.Game = Game;
}

Player.prototype.create = function() {
  this.player = this.Game.add.sprite(80, 1000, 'char');
  this.Game.physics.enable(this.player, Phaser.Physics.ARCADE);

  this.player.body.bounce.y = 0;
  this.player.body.collideWorldBounds = true;

  //this.Game.camera.follow(this.player);
}

Player.prototype.update = function() {
  this.player.body.velocity.x = 0;

  //Столкновения
  this.Game.physics.arcade.collide(this.player, this.Game.Map.mapLayer);

}

Player.prototype.jump = function() {
  this.player.body.velocity.y = -700;
}

module.exports = Player;
