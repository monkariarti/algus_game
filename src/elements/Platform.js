function Platform(type, set, Game) {
  this.type = type;
  this.set = set;
  this.Game = Game;
}

Platform.prototype.create = function() {
  this.set.height = this.set.height ? this.set.height : 20;
  //Подвижная плафторма
  if(this.type == 'moving') {
    this.platform = this.Game.add.tileSprite(this.set.x, this.set.y, this.set.width, this.set.height, 'fadePlatform');
  }
  //Пропадающая платформа
  if(this.type == 'fade') {
    this.platform = this.Game.add.tileSprite(this.set.x, this.set.y, this.set.width, this.set.height, 'fadePlatform');
  }

  this.platform.settedData = this.set;
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
    if(this.set.x2) {
      if(this.platform.x >= this.set.x2) {
        this.platform.body.velocity.set(-150, 0);
      }
      if(this.platform.x <= this.set.x) {
        this.platform.body.velocity.set(150, 0);
      }
    }

    //Столкновения
    this.Game.physics.arcade.collide(this.Game.Map.mapLayer, this.platform);
    this.Game.physics.arcade.collide(this.Game.Player.player, this.platform, this.checkPlatform, null, this.Game);
  }
  if(this.type == 'fade') {
    //Столкновения
    this.Game.physics.arcade.collide(this.Game.Player.player, this.platform, this.fade, null, this.Game);
  }
}

Platform.prototype.checkPlatform = function(player, platform) {
  player.inPlatform = true;
}

Platform.prototype.fade = function(player, platform) {
  platform.kill();
  setTimeout(() => {
    platform.revive();
    platform.x = platform.settedData.x;
    platform.y = platform.settedData.y;
  }, 300);
}

module.exports = Platform;
