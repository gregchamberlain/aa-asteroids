const Asteroid = require("./asteroid");



function Game(){
  this.asteroids = [];
  this.addAsteroids();
}
Game.DIM_X = 800;
Game.DIM_Y = 800;
Game.NUM_ASTEROIDS = 20;

Game.prototype.addAsteroids = function(){
  for (let i =0; i < NUM_ASTEROIDS; i++){
    let x = Math.random() * DIM_X;
    let y = Math.random() * DIM_Y;

    let asteroid = new Asteroid({pos: [x,y]});
    this.asteroids.push(asteroid);
  }
};


Game.prototype.draw = function(ctx){
  ctx.clearRect(0,0,DIM_X, DIM_Y);
  this.asteroids.forEach(asteroid => {
    asteroid.draw(ctx);
  });
};


Game.prototype.moveObjects = function() {
  this.asteroids.forEach(asteroid => {
    asteroid.move();
  });
};

module.exports = Game;
