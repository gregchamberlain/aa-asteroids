let MovingObject = require("./moving_objects");
let inherits = require("./utils").inherits;

function Bullet(options){
  this.COLOR = "yellow";
  this.RADIUS = 2;
  MovingObject.call(this, {pos: options.pos, color: this.COLOR, radius: this.RADIUS, vel: options.vel});

}


inherits(Bullet, MovingObject);

Bullet.prototype.move = function (dt) {
  this.pos[0] += this.vel[0] * dt;
  this.pos[1] += this.vel[1] * dt;
};
module.exports = Bullet;
