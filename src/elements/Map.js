function Map(Game) {
    this.Game = Game;
}

Map.prototype.create = function() {
  this.tilemap = this.Game.add.tilemap('tilemap', 20, 20);
  this.tilemap.addTilesetImage('tilemap', 'tilemap', 20, 20);
  this.tilemap.setCollisionByExclusion([]);

  this.mapLayer =  this.tilemap.createLayer(0);
  this.Game.physics.enable(this.mapLayer, Phaser.Physics.ARCADE);
  this.mapLayer.body.immovable = true;
  this.mapLayer.body.allowGravity = false;
}

module.exports = Map;
