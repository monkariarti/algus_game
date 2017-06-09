function Gun(set, Game) {
  this.set = set;
  this.Game = Game;
}

Gun.prototype.create = function() {
  this.gun = this.Game.add.sprite(this.set.x, this.set.y, 'gun');
  this.gun.width = 80;
  this.gun.height = 80;
  this.Game.physics.enable(this.gun, Phaser.Physics.ARCADE);
  this.gun.body.immovable = true;
  this.gun.body.allowGravity = false;
  this.gun.anchor.set(0, 0.5);
  
  this.circle = new Phaser.Circle(this.set.x+350, this.set.y+350, 700);
  this.graphics = this.Game.add.graphics(0, 0);
  this.graphics.lineStyle(1, 0x00ff00, 1);
  this.graphics.drawCircle(this.circle.x, this.circle.y, this.circle.diameter);

  this.weapon = this.Game.add.weapon(150, 'weapon');
  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = 1000;
  this.weapon.fireRate = 2000;
  this.weapon.trackSprite(this.gun, 60, 0, true);
  this.weapon.bullets.forEach((bullet) => {
    bullet.width = 20;
    bullet.height = 40;
  });
}

Gun.prototype.update = function() {

  if (check_overlap(this.Game.Player.player, this.graphics)) {
    this.gun.rotation = this.Game.physics.arcade.angleBetween(this.gun, this.Game.Player.player);
    this.weapon.fire();
  }

  this.Game.physics.arcade.collide(this.weapon.bullets, this.Game.Player.player, function(bullet, enemy){bullet.death(); enemy.kill();}); 
}


module.exports = Gun;

function check_overlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);
}