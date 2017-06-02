function Gun(set, Game) {
  this.set = set;
  this.Game = Game;
}

Gun.prototype.create = function() {
  this.gun = this.Game.add.sprite(this.set.x, this.set.y, 'black');
  this.gun.width = 40;
  this.gun.height = 40;
  this.Game.physics.enable(this.gun, Phaser.Physics.ARCADE);
  this.gun.body.immovable = true;
  this.gun.body.allowGravity = false;

  this.weapon = this.Game.add.weapon(40, 'black');
  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = 400;
  this.weapon.fireRate = 500;
  this.weapon.trackSprite(this.gun, 0, 0);
  this.weapon.autofire = true;
}

Gun.prototype.update = function() {

}


module.exports = Gun;
