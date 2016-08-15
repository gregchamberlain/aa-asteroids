const Asteroid = require("./asteroid");
let Utils = require("./utils");
let Ship = require("./ship");
let Bullet = require("./bullet");


function Game(){
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship({pos: this.randomPosition(), game: this});
  this.bullets = [];
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
  this.allObjects().forEach(asteroid => {
    asteroid.draw(ctx);
  });
};


Game.prototype.moveObjects = function() {
  this.allObjects().forEach(asteroid => {
    asteroid.move();
  });
};

Game.prototype.checkCollisions = function () {
  this.asteroids.forEach((asteroid1, idx1) => {
    this.bullets.forEach((bullet) => {
      if (asteroid1.isCollidedWith(bullet)) {
        this.remove(asteroid1);
        this.remove(bullet);
      }
    });
    if (asteroid1.isCollidedWith(this.ship)){
      this.ship.pos = this.randomPosition();
      this.ship.vel = [0,0];
    }
  });
};

Game.prototype.remove = function (obj) {
  let arr = [];
  if (obj instanceof Asteroid) {
    arr = this.asteroids;
  } else if (obj instanceof Bullet) {
    arr = this.bullets;
  }
  let idx = arr.indexOf(obj);
  let left = arr.slice(0,idx);
  let right = arr.slice(idx + 1);
  if (obj instanceof Asteroid) {
    this.asteroids = [...left, ...right];
  } else if (obj instanceof Bullet) {
    this.bullets = [...left, ...right];
  }
};

Game.prototype.randomPosition = function () {
  let x = Math.random() * Utils.dims[0];
  let y = Math.random() * Utils.dims[1];
  return [x,y];
};


Game.prototype.allObjects = function () {
  return [...this.asteroids, ...this.bullets, this.ship];
};

Game.prototype.bindKeyHandlers = function(){
  key('w', ()=>{
    this.ship.power([0,-1]);
  });

  key('a', ()=>{
    this.ship.power([-1,0]);
  });
  key('s', ()=>{
    this.ship.power([0,1]);
  });

  key('d', ()=>{
    this.ship.power([1,0]);
  });

  key('space', ()=>{
    console.log("Space hit");
    this.ship.fireBullet();
  });
};

module.exports = {
  Game
};
