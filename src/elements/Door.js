function Door(set, Game) {
  this.set = set;
  this.Game = Game;

  this.set.key = set.key || false;

  this.openTimer = 0;
}

Door.prototype.create = function() {
  this.door = this.Game.add.sprite(this.set.x, this.set.y, 'black');
  this.door.width = this.set.width;
  this.door.height = this.set.height;
  this.door.open = false;

  this.Game.physics.enable(this.door, Phaser.Physics.ARCADE);
  this.door.body.immovable = true;
  this.door.body.allowGravity = false;

  this.lever = this.Game.add.sprite(this.set.rx, this.set.ry, 'black');
  this.lever.width = 20;
  this.lever.height = 40;

  this.Game.physics.enable(this.lever, Phaser.Physics.ARCADE);
  this.lever.body.immovable = true;
  this.lever.body.allowGravity = false;
}

Door.prototype.update = function() {
  this.lever.overlapPlayer = false;

  this.Game.physics.arcade.collide(this.door, this.Game.Player.player, null, null, this);

  this.Game.physics.arcade.overlap(this.lever, this.Game.Player.player, this.leverOverlap, null, this);

  if(this.lever.overlapPlayer && this.Game.checkButton.isDown && this.Game.time.now > this.openTimer) {
    this.openCloseDoor();
    this.openTimer = this.Game.time.now + 500;
  }
}

Door.prototype.leverOverlap = function(lever, player) {
  lever.overlapPlayer = true;
}

Door.prototype.openCloseDoor = function() {
  if(this.set.key && !this.Game.Player.haveBonusesKey) {
    alert('Вам нужен ключ от хранилища!');
    return;
  }
  if(this.door.open) {
    this.door.open = false;
    this.door.x = this.set.x;
  } else {
    this.door.open = true;
    this.door.x -= this.door.width;
  }
}

module.exports = Door;
