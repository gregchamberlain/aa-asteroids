let MovingObject = require("./moving_objects");
let inherits = require("./utils").inherits;
let randomVec = require("./utils").randomVec;

function Asteroid (options){
  this.COLOR = "grey";
  this.RADIUS = 20 + Math.random() * 20;
  this.points = [];
  MovingObject.call(this, {pos: options.pos, color: this.COLOR, radius: this.RADIUS, vel: randomVec(3)});
  this.createPoints();
}
inherits(Asteroid, MovingObject);

Asteroid.prototype.createPoints = function () {
  for(let i = 0; i < 360; i += 60) {
    let dist = this.radius / 2 + Math.random() * this.radius / 2;
    let radians = i / 180 * Math.PI;
    let x = Math.cos(radians) * dist;
    let y = Math.sin(radians) * dist;
    this.points.push([x,y]);
  }
};

Asteroid.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  let start = this.points[this.points.length - 1];
  let startX = this.pos[0] + start[0];
  let startY = this.pos[1] + start[1];
  ctx.moveTo(startX, startY);
  this.points.forEach((point) => {
    let x = this.pos[0] + point[0];
    let y = this.pos[1] + point[1];
    ctx.lineTo(x, y);
  });
  ctx.fill();
};

module.exports = Asteroid;
