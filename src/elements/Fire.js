function Fire(set, Game) {
  this.set = set;
  this.Game = Game;
}

Fire.prototype.create = function() {
  this.fire = this.Game.add.sprite(this.set.x, this.set.y, 'black');
  this.Game.physics.enable(this.fire, Phaser.Physics.ARCADE);
  this.fire.width = 40;
  this.fire.height = this.set.height;
  this.fire.anchor.set(0, 1);
  this.fire.visible = false;
  this.fire.body.immovable = true;
  this.fire.body.allowGravity = false;

  this.rndFire();
}

Fire.prototype.update = function() {
    if(this.fire.visible) {
        this.Game.physics.arcade.collide(this.Game.Player.player, this.fire, this.checkFire, null, this);
    }
}

Fire.prototype.checkFire = function(player, fire) {
    player.death();
}

Fire.prototype.rndFire = function() {
    this.interval = setInterval(() => {
        this.fire.visible = true;
        setTimeout(() => {
            this.fire.visible = false;
        }, 2000)
    }, this.Game.rnd.between(3, 6) * 1000);
}

module.exports = Fire;
