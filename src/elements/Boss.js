function Boss(Game) {
    this.Game = Game;

    this.default = {
      x: 2890,
      y: 1890,
    }

    this.turn = 0;
}

Boss.prototype.create = function() {
  this.boss = this.Game.add.sprite(this.default.x, this.default.y + 10, 'boss');
  this.boss.width = 239;
  this.boss.height = 140;
  this.boss.anchor.set(0.5, 0.5);
  this.boss.health = 10000;
  this.boss.animations.add('left', [1, 3, 5, 7, 5, 3], 6, true);
  this.boss.animations.add('right', [0, 2, 4, 6, 4, 2], 6, true);

  this.Game.physics.enable(this.boss, Phaser.Physics.ARCADE);
  this.boss.body.collideWorldBounds = true;
  this.boss.body.immovable = true;
  this.boss.body.allowGravity = false;
  this.boss.body.bounce.set(1);
  this.boss.body.velocity.set(-150, 0);
  this.boss.body.setSize(161, 140, 39, 0);

  this.weapon = this.Game.add.weapon(30, 'bomb');
  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
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
    bullet.body.setSize(30, 30, 0, 0);
    bullet.damage = 1000;
    bullet.body.bounce.set(0.6);
  });
}

Boss.prototype.update = function() {
  //this.Game.physics.arcade.collide(this.Game.Player.player, this.boss, this.collidePlayer, null, this.Game);
  //this.Game.physics.arcade.collide(this.boss, this.Game.Map.mapLayer, null, null, this.Game);

  this.Game.physics.arcade.collide(this.weapon.bullets, this.Game.Map.mapLayer, this.collideBulletMap, null, this);
  this.Game.physics.arcade.collide(this.Game.Player.player, this.weapon.bullets, this.collidePlayerBullet, null, this);
  this.Game.physics.arcade.collide(this.Game.Player.player, this.boss, this.collidePlayerBoss, null, this);

  if(this.boss.x >= 3890) {
    this.boss.body.velocity.set(-150, 0);
    this.turn = 0;
  }
  if(this.boss.x <= 2015) {
    this.boss.body.velocity.set(150, 0);
    this.turn = 1;
  }

  if(this.turn == 1) {
    this.weapon.fireAngle = 0;
    this.boss.play('right', 10, false);
  } else {
    this.weapon.fireAngle = -180;
    this.boss.play('left', 10, false);
  }

  if(this.boss.health <= 0 && !this.boss.death) {
    this.death();
  }

  if(this.key) {
    this.Game.physics.arcade.collide(this.key, this.Game.Player.player, this.collidePlayerKey, null, this);
    this.Game.physics.arcade.collide(this.key, this.Game.Map.mapLayer);
  }
}

Boss.prototype.collidePlayerBoss = function(player, boss) {
  player.death();
}

Boss.prototype.collideBulletMap = function(bullet, map) {
  if(!bullet.timeout) {
    bullet.timeout = setTimeout(() => {
      this.bulletBoom(bullet);
    }, 2000);
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

Boss.prototype.createKey = function() {
  this.key = this.Game.add.sprite(this.boss.x, this.boss.y, 'key');
  this.key.anchor.set(0.5, 0.5);
  this.Game.physics.enable(this.key, Phaser.Physics.ARCADE);
}

Boss.prototype.collidePlayerKey = function(key, player) {
  this.Game.Player.haveBonusesKey = true;
  key.kill();
}

Boss.prototype.death = function() {
  this.boss.kill();
  this.weapon.autofire = false;
  this.createKey();
  this.boss.death = true;
}

module.exports = Boss;
