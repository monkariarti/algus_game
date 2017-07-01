function Boss(Game) {
    this.Game = Game;

    this.default = {
      x: 2890,
      y: 1890,
    }

    this.turn = 0;
}

Boss.prototype.create = function() {
  this.boss = this.Game.add.sprite(this.default.x, this.default.y, 'black');
  this.boss.width = 140;
  this.boss.height = 140;
  this.boss.anchor.set(0.5, 0.5);

  this.Game.physics.enable(this.boss, Phaser.Physics.ARCADE);
  this.boss.body.collideWorldBounds = true;
  this.boss.body.immovable = true;
  this.boss.body.allowGravity = false;
  this.boss.body.bounce.set(1);
  this.boss.body.velocity.set(-150, 0);

  this.weapon = this.Game.add.weapon(30, 'black');
  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletAngleOffset = 90;
  this.weapon.bulletSpeed = 400;
  this.weapon.fireRate = 1500;
  this.weapon.autofire = true;
  this.weapon.bulletAngleVariance = 10;
  this.weapon.fireAngle = 0;
  this.weapon.setBulletBodyOffset(30, 30);
  this.weapon.trackSprite(this.boss, 0, -20);
  this.weapon.bullets.forEach((bullet) => {
    bullet.width = 30;
    bullet.height = 30;
    bullet.damage = 1000;
    bullet.body.bounce.set(0.6);
  });

  console.log(this.boss);
}

Boss.prototype.update = function() {
  //this.Game.physics.arcade.collide(this.Game.Player.player, this.boss, this.collidePlayer, null, this.Game);
  //this.Game.physics.arcade.collide(this.boss, this.Game.Map.mapLayer, null, null, this.Game);

  this.Game.physics.arcade.collide(this.weapon.bullets, this.Game.Map.mapLayer, this.collideBulletMap, null, this);
  this.Game.physics.arcade.collide(this.Game.Player.player, this.weapon.bullets, this.collidePlayerBullet, null, this);
  this.Game.physics.arcade.collide(this.Game.Player.player, this.boss, this.collidePlayerBoss, null, this);

  if(this.boss.x >= 3890) {
    this.turn = 0;
    this.boss.body.velocity.set(-150, 0);
  }
  if(this.boss.x <= 2015) {
    this.boss.body.velocity.set(150, 0);
    this.turn = 1;
  }

  if(this.turn == 1) {
    this.weapon.fireAngle = 0;
  } else {
    this.weapon.fireAngle = -180;
  }
}

Boss.prototype.collidePlayerBoss = function(player, boss) {
  player.death();
}

Boss.prototype.collideBulletMap = function(bullet, map) {
  if(!bullet.timeout) {
    bullet.timeout = setTimeout(() => {
      this.bulletBoom(bullet);
    }, 1200);
  }
}

Boss.prototype.collidePlayerBullet = function(player, bullet) {
  this.bulletBoom(bullet);
  player.death();
}

Boss.prototype.bulletBoom = function(bullet) {
  bullet.kill();

  let explosion = this.Game.add.sprite(bullet.x, bullet.y, 'exp1');
  explosion.width = 150;
  explosion.height = 150;
  explosion.anchor.set(0.5, 0.5);
  explosion.animations.add('boom');
  explosion.animations.play('boom', 64, false, true);

  clearTimeout(bullet.timeout);
  bullet.timeout = false;
}

module.exports = Boss;
