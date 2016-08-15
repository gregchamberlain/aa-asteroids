const Asteroid = require("./asteroid");
let Utils = require("./utils");
let Ship = require("./ship");


function Game(){
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship({pos: this.randomPosition()});
}
const NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function(){
  for (let i =0; i < NUM_ASTEROIDS; i++){
    let pos = this.randomPosition();

    let asteroid = new Asteroid({pos: pos});
    this.asteroids.push(asteroid);
  }
};


Game.prototype.draw = function(ctx){
  ctx.clearRect(0,0,Utils.dims[0], Utils.dims[1]);
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,Utils.dims[0],Utils.dims[1]);
  this.allObjects().forEach(asteroid => {
    asteroid.draw(ctx);
    if(asteroid === this.ship) {
      console.log(asteroid);
    }
  });
};


Game.prototype.moveObjects = function() {
  this.asteroids.forEach(asteroid => {
    asteroid.move();
  });
};

Game.prototype.checkCollisions = function () {
  this.asteroids.forEach((asteroid1, idx1) => {
    if (asteroid1.isCollidedWith(this.ship)){
      this.ship.pos = this.randomPosition();
      this.ship.vel = [0,0];
    }
  });
};

Game.prototype.remove = function (asteroid) {
  let idx = this.asteroids.indexOf(asteroid);
  let left = this.asteroids.slice(0,idx);
  let right = this.asteroids.slice(idx + 1);
  this.asteroids = [...left, ...right];
};

Game.prototype.randomPosition = function () {
  let x = Math.random() * Utils.dims[0];
  let y = Math.random() * Utils.dims[1];
  return [x,y];
};


Game.prototype.allObjects = function () {
  return [...this.asteroids, this.ship];
};

module.exports = {
  Game
};
