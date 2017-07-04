function Player(Game) {
    this.Game = Game;

    this.default = {
      x: 120,
      y: 1000,
      // x: 2290,
      // y: 1840,
    };
}

Player.prototype.create = function() {
  this.player = this.Game.add.sprite(this.default.x, this.default.y, 'danila');
  this.Game.physics.enable(this.player, Phaser.Physics.ARCADE);

  this.player.width = 40;
  this.player.height = 60;
  this.player.body.bounce.y = 0;
  this.player.body.gravity.y = 980;
  this.player.body.collideWorldBounds = true;

  this.player.body.tilePadding.x = 10;
  this.player.body.tilePadding.y = 10;

  //АНИМАЦИИ
  //Дыхание
  //this.player.animations.add('dih');

  this.player.death = () => {
    this.player.x = this.default.x;
    this.player.y = this.default.y;
  }

  this.player.haveWorker = false;

  //this.player.animations.stop();

  //this.Game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
}

Player.prototype.update = function() {
  this.player.body.velocity.x = 0;

  //Выход за пределы карты
  if(this.player.body.checkWorldBounds()) {
    this.player.death();
  }

  //Столкновения с картой
  this.Game.physics.arcade.collide(this.player, this.Game.Map.mapLayer, null, this.collideMap, this.Game);

  //Платформы
  this.Game.Player.player.inPlatform = false;
  //Веревки
  this.Game.Player.player.inRope = false;
  //Лестницы
  this.Game.Player.player.inStairs = false;

  //АНИМАЦИИ
  //Дыхание
  // if(this.player.body.velocity.x == 0) {
  //   this.player.animations.play('dih', 9, true);
  // } else {
  //   this.player.animations.stop('dih', 0);
  // }

  if(this.player.x > 660) {
    this.Game.camera.x = 550;
  }
  if(this.player.x < 660) {
    this.Game.camera.x = 0;
  }
  if(this.player.x > 2180) {
    this.Game.camera.x = 2080;
  }
  if(this.player.x < 2180 && this.player.x > 660) {
    this.Game.camera.x = 550;
  }
  //Камера по Y
  if(this.player.y > 660) {
    this.Game.camera.y = 550;
  }
  if(this.player.y < 660) {
    this.Game.camera.y = 0;
  }
  if(this.player.y > 1280) {
    this.Game.camera.y = 1280;
  }
  if(this.player.y < 1280 && this.player.y > 660) {
    this.Game.camera.y = 550;
  }
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
