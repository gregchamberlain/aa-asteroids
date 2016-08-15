let MovingObject = require("./moving_objects");
let inherits = require("./utils").inherits;
let Norm = require("./utils").Norm;
let Bullet = require("./bullet");

function Ship(options){
  this.vel = [0,0];
  this.COLOR = "white";
  this.RADIUS = 10;
  this.facingDir = [0,-1];
  this.game = options.game;
  MovingObject.call(this, {pos: options.pos, color: this.COLOR, radius: this.RADIUS, vel: this.vel});

}

inherits(Ship, MovingObject);

Ship.prototype.power = function (impulse) {
  this.facingDir = impulse;
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};


Ship.prototype.fireBullet = function () {
  let pos = [this.pos[0] + (this.radius * this.facingDir[0]), this.pos[1] + (this.radius * this.facingDir[1])]
  let vel = [this.vel[0] + (5 * this.facingDir[0]), this.vel[1] + (5 * this.facingDir[1])];
  console.log(this.vel);
  console.log(vel);
  let bullet = new Bullet({pos: pos, vel: vel});
  this.game.bullets.push(bullet);
};

module.exports = Ship;
