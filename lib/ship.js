let MovingObject = require("./moving_objects");
let inherits = require("./utils").inherits;

function Ship(options){
  this.vel = [0,0];
  this.COLOR = "white";
  this.RADIUS = 10;
  MovingObject.call(this, {pos: options.pos, color: this.COLOR, radius: this.RADIUS, vel: this.vel});

}

inherits(Ship, MovingObject);


module.exports = Ship;
