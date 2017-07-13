function Menu(Game) {
  this.Game = Game;

  this.textStyle = { font: "40px Arial", fill: "#000000" };
  this.textStyleHover = { font: "40px Arial", fill: "#333333" };

  this.paused = false;
  this.firstStart = true;
}

Menu.prototype.create = function() {
  this.bg = this.Game.add.sprite(0, 0, 'start');
  this.bg.fixedToCamera = true;
  //this.bg.anchor.set(0.5, 05);
  this.bg.width = this.Game.camera.width;
  this.bg.height = this.Game.camera.height;

  this.startGame = this.Game.add.text(this.Game.camera.width / 2, this.Game.camera.height / 2 + 5, "Начать игру", this.textStyle);
  this.startGame.anchor.set(0.5, 0.5);
  this.startGame.fixedToCamera = true;
  this.startGame.inputEnabled = true;

  this.startGame.events.onInputOver.add((e) => {
    e.setStyle(this.textStyleHover, true);
  }, this.Game);
  this.startGame.events.onInputOut.add((e) => {
    e.setStyle(this.textStyle, true);
  }, this.Game);
  this.startGame.events.onInputDown.add((e) => {
    this.close();
  }, this.Game);

  this.open();
}

Menu.prototype.update = function() {
  this.bindKey();
  this.bg.bringToTop();
  this.startGame.bringToTop();
}

Menu.prototype.bindKey = function() {
  if (this.Game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
    this.open();
  }
}

Menu.prototype.open = function() {
  this.Game.physics.arcade.isPaused = true;
  this.bg.revive();
  this.startGame.revive();

  if(!this.firstStart) {
    this.startGame.setText('Продолжить игру');
  }
  this.firstStart = false;
}

Menu.prototype.close = function() {
  this.Game.physics.arcade.isPaused = false;
  this.bg.kill();
  this.startGame.kill();
  this.endGame = false;
}

module.exports = Menu;
