function Player(Game) {
    this.Game = Game;

    this.default = {
      x: 120,
      y: 1000,
      // x: 2290,
      // y: 1840,
    };

    this.haveBonusesKey = false;

    this.cursors = this.Game.input.keyboard.createCursorKeys();
    this.jumpButton = this.Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.checkButton = this.Game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
    this.jumpTimer = 0;

    this.turn = 'right';
    this.animTimer = 0;

    this.countWorkers = 0;
}

Player.prototype.create = function() {
  this.player = this.Game.add.sprite(this.default.x, this.default.y, 'danila2');
  this.Game.physics.enable(this.player, Phaser.Physics.ARCADE);

  this.player.width = 40;
  this.player.height = 60;
  this.player.body.bounce.y = 0;
  this.player.body.gravity.y = 980;
  this.player.body.collideWorldBounds = true;

  this.player.body.tilePadding.x = 10;
  this.player.body.tilePadding.y = 10;

  this.player.anchor.set(0.5, 1);

  //АНИМАЦИИ
  this.player.animations.add('stay', [0], 0, true);
  this.player.animations.add('handup', [1], 0, true);
  //Бег
  // this.player.animations.add('right', [1, 2, 3, 4, 5], 8, true);
  // this.player.animations.add('left', [6, 7, 8, 9, 10], 8, true);

  this.player.death = () => {
    this.player.x = this.default.x;
    this.player.y = this.default.y;
    this.Game.camera.flash(0xff0000, 500);
    //this.Game.camera.shake(0.05, 200);
  }

  this.player.haveWorker = false;


  this.weapon = this.Game.add.weapon(30, 'bomb');
  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = 400;
  this.weapon.fireRate = 800;
  this.weapon.autofire = false;
  this.weapon.bulletAngleVariance = 10;
  this.weapon.fireAngle = 0;
  this.weapon.setBulletBodyOffset(30, 30);
  this.weapon.trackSprite(this.player, 0, -45);
  this.weapon.bullets.forEach((bullet) => {
    bullet.width = 15;
    bullet.height = 15;
    bullet.damage = 500;
    bullet.body.setSize(15, 15, 0, 0);
    bullet.body.bounce.set(0.6);
  });

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

  //АНИМАЦИИ
  //Дыхание
  // if(this.player.body.velocity.x == 0) {
  //   this.player.animations.play('dih', 9, true);
  // } else {
  //   this.player.animations.stop('dih', 0);
  // }

  if (this.cursors.up.isDown) {
    if(this.player.inRope || this.player.inStairs) {
      this.player.body.velocity.y = -250;
    }
  } else if (this.cursors.down.isDown) {
    if(this.player.inRope || this.player.inStairs) {
      this.player.body.velocity.y = 250;
    }
  }
  if (this.cursors.left.isDown) {
    this.player.body.velocity.x = -250;
    this.turn = 'left';
  }
  else if (this.cursors.right.isDown) {
    this.player.body.velocity.x = 250;
    this.turn = 'right';
  }
  if(this.Game.time.now > this.animTimer && (this.player.body.onFloor() || this.player.inPlatform || this.player.inRope || this.player.inStairs)) {
    if(this.cursors.left.isDown || this.cursors.up.isDown || this.cursors.right.isDown)  {
      if(this.player.angle == 7) {
        this.player.angle = -7;
      } else {
        this.player.angle = 7;
      }
      this.animTimer = this.Game.time.now + 200;
    } else {
      this.player.angle = 0;
    }
  }

  if(this.countWorkers > 0) {
    this.player.animations.play('handup', 0);
  } else {
    this.player.animations.play('stay', 0);
  }

  //Прыжок
  if (this.jumpButton.isDown && (this.player.body.onFloor() || this.player.inPlatform) && this.Game.time.now > this.jumpTimer) {
    this.jump();
    this.jumpTimer = this.Game.time.now + 150;
  }

  //Платформы
  this.player.inPlatform = false;
  //Веревки
  this.player.inRope = false;
  //Лестницы
  this.player.inStairs = false;


  //Орудие
  this.Game.physics.arcade.collide(this.weapon.bullets, this.Game.Map.mapLayer, this.collideBulletMap, null, this);
  this.Game.physics.arcade.collide(this.Game.Boss.boss, this.weapon.bullets, this.collideBossBullet, null, this);
  this.Game.physics.arcade.collide(this.Game.Boss.weapon.bullets, this.weapon.bullets, this.collideBulletVsBullet, null, this);

  if(this.turn == 'left') {
    this.weapon.fireAngle = 180;
  } else {
    this.weapon.fireAngle = 0;
  }
  if (this.checkButton.isDown && (this.player.x >= 1995 && this.player.x <= 3920) && this.player.y >= 1820) {
    this.weapon.fire();
  }

  //Камера по X
  let widthScr = this.Game.global.root.offsetWidth / 3;
  let screenWCount = Math.floor(this.player.x / widthScr);
  if(this.player.x > widthScr * screenWCount) {
    this.Game.camera.x = widthScr * screenWCount - widthScr / 2;
  }
  //Камера по Y
  if(this.player.y > 720) {
    this.Game.camera.y = 550;
  }
  if(this.player.y < 720) {
    this.Game.camera.y = 0;
  }
  if(this.player.y > 1340) {
    this.Game.camera.y = 1280;
  }
  if(this.player.y < 1340 && this.player.y > 720) {
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

Player.prototype.collideBulletMap = function(bullet, map) {
  if(!bullet.timeout) {
    bullet.timeout = setTimeout(() => {
      this.bulletBoom(bullet);
    }, 2000);
  }
}

Player.prototype.collideBossBullet = function(boss, bullet) {
  this.bulletBoom(bullet);
  this.Game.Boss.boss.health -= bullet.damage;
}
Player.prototype.collideBulletVsBullet = function(bullet1, bullet2) {
  this.Game.Boss.bulletBoom(bullet1);
  this.bulletBoom(bullet2);
}

Player.prototype.bulletBoom = function(bullet) {
  bullet.kill();

  let explosion = this.Game.add.sprite(bullet.x, bullet.y, 'exp1');
  explosion.width = 100;
  explosion.height = 100;
  explosion.anchor.set(0.5, 0.5);
  explosion.animations.add('boom');
  explosion.animations.play('boom', 64, false, true);

  clearTimeout(bullet.timeout);
  bullet.timeout = false;
}

module.exports = Player;
