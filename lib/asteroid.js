let MovingObject = require("./moving_objects");
let inherits = require("./utils").inherits;
let randomVec = require("./utils").randomVec;

console.log(require("./utils"));
function Asteroid (options){
  this.COLOR = "grey";
  this.RADIUS = 40;
  MovingObject.call(this, {pos: options.pos, color: this.COLOR, radius: this.RADIUS, vel: randomVec(10)});
}
inherits(Asteroid, MovingObject);

module.exports = Asteroid;
