function Gun(rotation, set, poligon_set, Game) {
  this.rotation = rotation;
  this.set = set;
  this.poligon_set = poligon_set;
  this.Game = Game;
}

Gun.prototype.create = function() {
  this.gun = this.Game.add.sprite(this.set.x, this.set.y, 'fan');
  this.gun.width = 31;
  this.gun.height = 62;
  this.Game.physics.enable(this.gun, Phaser.Physics.ARCADE);
  this.gun.body.immovable = true;
  this.gun.body.allowGravity = false;
  this.gun.anchor.set(0, 0.5);

  this.circle = new Phaser.Circle(this.poligon_set.x+350, this.poligon_set.y+350, 700);
  this.graphics = this.Game.add.graphics(0, 0);
  //очертание полигона
  //this.graphics.lineStyle(1, 0x00ff00, 1);
  this.graphics.drawCircle(this.circle.x, this.circle.y, this.circle.diameter);

  this.weapon = this.Game.add.weapon(30, 'air');
  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = 700;
  this.weapon.fireRate = 4000;
  this.weapon.trackSprite(this.gun, 60, 0, true);
  this.weapon.bullets.forEach((bullet) => {
    bullet.width = 38;
    bullet.height = 28;
  });
}

Gun.prototype.update = function() {
  if (this.rotation == 1) {
    this.gun.angle = 0;
  } else if (this.rotation == 2) {
    this.gun.angle = 90;
  } else if (this.rotation == 3) {
    this.gun.angle = 180;
  } else if (this.rotation == 4) {
    this.gun.angle = 270;
  }

  if (check_overlap(this.Game.Player.player, this.graphics)) {
    this.gun.rotation = this.Game.physics.arcade.angleBetween(this.gun, this.Game.Player.player);
    this.weapon.fire();
  }

  this.Game.physics.arcade.collide(this.weapon.bullets, this.Game.Player.player, function(bullet, enemy){bullet.death(); enemy.kill();});
  this.Game.physics.arcade.collide(this.weapon.bullets, this.Game.Map.mapLayer, function(bullet, enemy){bullet.kill();});
}


module.exports = Gun;

function check_overlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);
}
