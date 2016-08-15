const Asteroid = require("./asteroid");
let Utils = require("./utils");
let Ship = require("./ship");
let Bullet = require("./bullet");


function Game(){
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship({pos: this.randomPosition(), game: this});
  this.bullets = [];
  this.lives = 5;
  this.score = 0;
  this.gameOver = false;
  this.level = 1;
}
const NUM_ASTEROIDS = 3;

Game.prototype.addAsteroids = function(num = NUM_ASTEROIDS){
  for (let i =0; i < num; i++){
    let pos = this.randomPosition();

    let asteroid = new Asteroid({pos: pos});
    this.asteroids.push(asteroid);
  }
};


Game.prototype.draw = function(ctx){
  ctx.clearRect(0,0,Utils.dims[0], Utils.dims[1]);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, Utils.dims[0], Utils.dims[1])
  this.allObjects().forEach(asteroid => {
    asteroid.draw(ctx);
  });
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,175,22);
  ctx.fillStyle = "black";
  ctx.font = "italic "+14+"pt Arial ";
  ctx.fillText(`Lives: ${this.lives}, Score: ${this.score}`, 10,20 );

};


Game.prototype.moveObjects = function(dt) {
  this.allObjects().forEach(asteroid => {
    asteroid.move(dt);
  });
};

Game.prototype.checkCollisions = function () {
  this.asteroids.forEach((asteroid1, idx1) => {
    this.bullets.forEach((bullet) => {
      if (asteroid1.isCollidedWith(bullet)) {
        this.remove(asteroid1);
        this.remove(bullet);
        this.score +=1;
      }
    });
    if (asteroid1.isCollidedWith(this.ship)){
      this.ship.pos = this.randomPosition();
      this.ship.vel = [0,0];
      this.lives -= 1;
      if (this.lives === 0){this.gameOver = true;}
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
    if (this.asteroids.length === 0){
      this.level += 1;
      this.addAsteroids(this.level * NUM_ASTEROIDS);
    }
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
    this.ship.fireBullet();
  });
};

module.exports = {
  Game
};
