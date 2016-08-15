let MovingObject = require("./moving_objects");
let inherits = require("./utils").inherits;
let Norm = require("./utils").Norm;
let Bullet = require("./bullet");

function Ship(options){
  this.vel = [0,0];
  this.COLOR = "white";
  this.RADIUS = 10;
  this.game = options.game;
  MovingObject.call(this, {pos: options.pos, color: this.COLOR, radius: this.RADIUS, vel: this.vel});

}

inherits(Ship, MovingObject);

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};


Ship.prototype.fireBullet = function () {
  let vel = [this.vel[0] * 2, this.vel[1] * 2];
  let bullet = new Bullet({pos: Array.from(this.pos), vel: vel});
  this.game.bullets.push(bullet);
};

module.exports = Ship;
