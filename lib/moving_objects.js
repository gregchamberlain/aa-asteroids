let Utils = require("./utils");

function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
}

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function(dt) {
  this.pos[0] += this.vel[0] * dt;
  this.pos[1] += this.vel[1] * dt;
  if (this.pos[0] > Utils.dims[0]) {
    this.pos[0] = 0;
  }else if (this.pos[0] < 0){
    this.pos[0] = Utils.dims[0];
  }
  if (this.pos[1] > Utils.dims[1]) {
    this.pos[1] = 0;
  } else if (this.pos[1] < 0){
    this.pos[1] = Utils.dims[1];
  }
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  return Utils.Dist(this.pos, otherObject.pos) <= this.radius + otherObject.radius;
};

module.exports = MovingObject;
