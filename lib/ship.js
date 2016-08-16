let MovingObject = require("./moving_objects");
let inherits = require("./utils").inherits;
let Norm = require("./utils").Norm;
let Bullet = require("./bullet");

function Ship(options){
  this.vel = [0,0];
  this.COLOR = "white";
  this.RADIUS = 10;
  this.facingDir = 0;
  this.game = options.game;
  MovingObject.call(this, {pos: options.pos, color: this.COLOR, radius: this.RADIUS, vel: this.vel});

}

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length !== array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] !== array[i]) {
            return false;
        }
    }
    return true;
  };
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

inherits(Ship, MovingObject);

Ship.prototype.power = function (impulse) {
  console.log(impulse);
  if (impulse.equals([-1, 0]) && this.facingDir !== Math.PI) {
    this.facingDir <= Math.PI ? this.facingDir += 30 / 180 * Math.PI : this.facingDir -= 30 / 180 * Math.PI;
  }
  if (impulse.equals([1, 0]) && this.facingDir !== 0) {
    this.facingDir <= 0 ? this.facingDir += 30 / 180 * Math.PI : this.facingDir -= 30 / 180 * Math.PI;
  }
  if (impulse.equals([0, 1]) && this.facingDir !== (Math.PI / 2 * 3)) {
    this.facingDir <= (3 * Math.PI / 2) ? this.facingDir += 30 / 180 * Math.PI : this.facingDir -= 30 / 180 * Math.PI;
  }
  if (impulse.equals([0, -1]) && this.facingDir !== (Math.PI / 2)) {
    this.facingDir <= (Math.PI / 2) ? this.facingDir += 30 / 180 * Math.PI : this.facingDir -= 30 / 180 * Math.PI;
  }
  console.log(this.facingDir);
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};


Ship.prototype.fireBullet = function () {
  let pos = [this.pos[0] + (this.radius * Math.cos(this.facingDir)), this.pos[1] + (this.radius * Math.sin(this.facingDir))];
  let vel = [this.vel[0] + (5 * Math.cos(this.facingDir)), this.vel[1] + (5 * Math.sin(this.facingDir))];
  let bullet = new Bullet({pos: pos, vel: vel});
  this.game.bullets.push(bullet);
};

module.exports = Ship;
