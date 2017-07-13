function Money(Game) {
  this.Game = Game;

  this.textStyle = { font: "40px Arial", fill: "#fbd609" };

  this.money = 0;
  this.maxMoney = 6000;

  this.penalty = 200;
}

Money.prototype.create = function() {
  this.hrusha = this.Game.add.sprite(5, 5, 'hrusha');
  this.hrusha.fixedToCamera = true;

  this.text = this.Game.add.text(120, 36, this.money + " / " + this.maxMoney, this.textStyle);
  this.text.stroke = "#f4951d";
  this.text.strokeThickness = 8;
  this.text.fixedToCamera = true;
}

Money.prototype.update = function() {
  this.hrusha.bringToTop();
  this.text.setText(this.money + " / " + this.maxMoney);
  this.text.bringToTop();
}

Money.prototype.addMoney = function(money) {
  this.money += money;
  if(this.money >= this.maxMoney) {
    this.Game.endGame = true;
  }
}

Money.prototype.setPenalty = function(money) {
  this.money -= money;
}

module.exports = Money;
