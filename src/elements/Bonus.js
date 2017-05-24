function Bonus(set, Game) {
  this.set = set;
  this.Game = Game;
}

Bonus.prototype.create = function() {
  this.createBonus();
}

Bonus.prototype.update = function() {
  //Наложение
  this.Game.physics.arcade.overlap(this.Game.Player.player, this.bonus, this.overlap, null, this);
}

Bonus.prototype.overlap = function(player, bonus) {
  bonus.destroy();
  this.Game.Money.addMoney(100);
  setTimeout(() => {
    this.createBonus();
  }, this.Game.rnd.between(1, 2) * 60 * 1000);
}

Bonus.prototype.createBonus = function() {
  this.bonus = this.Game.add.sprite(this.set.x, this.set.y, 'black');
  this.bonus.rotation = 0.8;
  this.Game.physics.enable(this.bonus, Phaser.Physics.ARCADE);
  this.bonus.body.immovable = true;
  this.bonus.body.allowGravity = false;
}

module.exports = Bonus;
