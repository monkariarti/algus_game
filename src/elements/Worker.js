function Worker(set, Game) {
  this.set = set;
  this.Game = Game;

  this.set.sprite = set.sprite || 'char';

  this.upTimer = 0;
  this.moneyTimer = 0;
}

Worker.prototype.create = function() {
  this.table = this.Game.add.sprite(this.set.x, this.set.y-30, 'table');
  this.Game.physics.enable(this.table, Phaser.Physics.ARCADE);
  this.table.body.immovable = true;
  this.table.body.allowGravity = false;
  this.table.animations.add('select');

  this.worker = this.Game.add.sprite(this.set.x + 30, this.set.y - 30, this.set.sprite);
  this.Game.physics.enable(this.worker, Phaser.Physics.ARCADE);
  this.worker.width = 40;
  this.worker.height = 60;
  this.worker.body.bounce.x = 1;
  this.worker.body.gravity.y = 980;
  this.worker.body.width = 30;
  this.worker.body.collideWorldBounds = true;
  this.worker.isUp = false;
  this.worker.inPlayer = false;
}

Worker.prototype.update = function() {
  this.worker.overlapPlayer = false;
  this.table.overlapPlayer = false;

  //Столкновения с картой
  this.Game.physics.arcade.collide(this.worker, this.Game.Map.mapLayer, this.collideMap, null, this.Game);

  //Столкновения с заплатками
  this.Game.physics.arcade.collide(this.worker, this.Game.Patches);

  this.Game.physics.arcade.overlap(this.Game.Player.player, this.worker, this.overlapPlayer, null, this.Game);
  this.Game.physics.arcade.overlap(this.Game.Player.player, this.table, this.overlapTablePlayer, null, this.Game);

  if(this.Game.time.now > this.upTimer && !this.worker.isUp) {
    this.worker.isUp = true;
    this.moveWorker();
  }

  if(this.worker.overlapPlayer && this.Game.Player.checkButton.isDown && this.worker.isUp ) {
    this.goInPlayer();
    this.Game.Player.player.haveWorker = true;
  }

  if(this.worker.inPlayer) {
    this.worker.position.x = this.Game.Player.player.position.x + 30;
    this.worker.position.y = this.Game.Player.player.position.y - 90;

    this.table.animations.play('select', 1);
  } else {
    this.table.animations.currentAnim.setFrame(0);
    this.table.animations.stop('select', 1);
  }

  if(this.table.overlapPlayer && this.worker.inPlayer) {
    this.startWorkWorker();
    this.Game.Player.player.haveWorker = false;
  }

  //Деньги
  if(!this.worker.isUp && !this.worker.inPlayer && this.Game.time.now >= this.moneyTimer) {
    this.Game.Money.addMoney(1);
    this.moneyTimer = this.Game.time.now + 1000;
  }

  this.table.bringToTop();
}

Worker.prototype.startWorkWorker = function() {
  this.upTimer = this.Game.time.now + (this.Game.rnd.between(90, 180) * 1000);
  this.worker.position.x = this.set.x + 30;
  this.worker.position.y = this.set.y - 30;
  this.worker.body.velocity.x = 0;
  this.worker.body.velocity.y = 0;
  this.worker.body.allowGravity = true;
  this.worker.angle = 0;
  this.worker.inPlayer = false;
  this.worker.isUp = false;
  this.Game.Player.countWorkers--;
}

Worker.prototype.goInPlayer = function() {
  this.worker.body.velocity.x = 0;
  this.worker.body.velocity.y = 0;
  this.worker.angle = 90;
  this.worker.body.allowGravity = false;
  this.worker.inPlayer = true;
  this.worker.isUp = false;
  this.Game.Player.countWorkers++;
}

Worker.prototype.moveWorker = function() {
  if(this.Game.rnd.between(1, 50) > 25) {
    this.worker.body.velocity.x = 150;
  } else {
    this.worker.body.velocity.x = -150;
  }
}

Worker.prototype.overlapPlayer = function(player, worker) {
  worker.overlapPlayer = true;
}
Worker.prototype.overlapTablePlayer = function(player, table) {
  table.overlapPlayer = true;
}

Worker.prototype.collideMap = function(worker, map) {

}

module.exports = Worker;
