let MovingObject = require("./moving_objects");
let inherits = require("./utils").inherits;
let randomVec = require("./utils").randomVec;

function Asteroid (options){
  this.COLOR = "grey";
  this.RADIUS = 20;
  MovingObject.call(this, {pos: options.pos, color: this.COLOR, radius: this.RADIUS, vel: randomVec(3)});
}
inherits(Asteroid, MovingObject);

module.exports = Asteroid;
