function Platform(type, set, Game) {
  this.type = type;
  this.set = set;
  this.Game = Game;
}

Platform.prototype.create = function() {
  //Подвижная плафторма
  if(this.type == 'moving') {
    this.platform = this.Game.add.tileSprite(this.set.x, this.set.y, this.set.width, 20, 'fadePlatform');
  }
  //Пропадающая платформа
  if(this.type == 'fade') {
    this.platform = this.Game.add.tileSprite(this.set.x, this.set.y, this.set.width, 20, 'fadePlatform');
  }

  this.Game.physics.enable(this.platform, Phaser.Physics.ARCADE);
  this.platform.body.immovable = true;
  this.platform.body.allowGravity = false;

  if(this.type == 'moving') {
    this.platform.body.velocity.set(150, 0);
    this.platform.body.bounce.set(1);
  }
}

Platform.prototype.update = function() {
  if(this.type == 'moving') {
    //Столкновения
    this.Game.physics.arcade.collide(this.Game.Map.mapLayer, this.platform);
    this.Game.physics.arcade.collide(this.Game.Player.player, this.platform);
  }
  if(this.type == 'fade') {
    //Столкновения
    this.Game.physics.arcade.collide(this.Game.Player.player, this.platform, this.fade, null, this.Game);
  }
}

Platform.prototype.fade = function(player, platform) {
  platform.kill();
  setTimeout(() => {
    platform.revive();
  }, 1000);
}

module.exports = Platform;
