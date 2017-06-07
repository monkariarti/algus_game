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

  this.weapon = this.Game.add.weapon(50, 'black');
  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = 1000;
  this.weapon.fireRate = 1000;
  this.weapon.trackSprite(this.gun, 50, 50);
  this.weapon.autofire = true;
}

Gun.prototype.update = function() {
  this.gun.rotation = this.Game.physics.arcade.angleBetween(this.gun, this.Game.Player.player);
  console.log(this.weapon);
  //this.Game.physics.arcade.moveToObject(this.weapon, 4000, 400);
  //this.Player.player.body.velocity.x
  /*if (this.weapon.body.velocity.x < this.Game.Player.player.body.velocity.x) {
    var i = this.weapon.body.velocity.x;
    while (i < this.Game.Player.player.body.velocity.x) {
      i--;
    }
  }*/
}


module.exports = Gun;
