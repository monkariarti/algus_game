function Platform(type, set, Game) {
  this.type = type;
  this.set = set;
  this.Game = Game;
}

Platform.prototype.create = function() {
  if(this.type == 'moving') {

  }
  if(this.type == 'fade') {
    this.platform = this.Game.add.sprite(this.set.x, this.set.y, 'fadePlatform');
    this.platform.width = this.set.width,
    this.Game.physics.enable(this.platform, Phaser.Physics.ARCADE);
    this.platform.body.immovable = true;
    this.platform.body.allowGravity = false;
  }
}

Platform.prototype.update = function() {

  //Столкновения
  this.Game.physics.arcade.collide(this.Game.Player.player, this.platform, this.fade, null, this.Game);
}

Platform.prototype.fade = function(player, platform) {
  platform.kill();
  setTimeout(() => {
    platform.revive();
  }, 1000);
}

module.exports = Platform;
