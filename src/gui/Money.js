function Money(Game) {
  this.Game = Game;

  this.textStyle = { font: "30px Arial", fill: "#000000" };

  this.money = 0;
  this.maxMoney = 100000;

  this.penalty = 200;
}

Money.prototype.create = function() {
  this.text = this.Game.add.text(40, 40, this.money + " / " + this.maxMoney, this.textStyle);
  this.text.fixedToCamera = true;
}

Money.prototype.update = function() {
  this.text.setText(this.money + " / " + this.maxMoney);
}

Money.prototype.addMoney = function(money) {
  this.money += money;
}

Money.prototype.setPenalty = function(money) {
  this.money -= money;
}

module.exports = Money;
