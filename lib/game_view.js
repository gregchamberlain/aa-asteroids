const Game = require("./game").Game;
const img = new Image();
function GameView(ctx){
  this.game = new Game();
  this.ctx = ctx;
  this.lastTime = 0;
}

GameView.prototype.start = function(){
  this.game.bindKeyHandlers();
  this.animate(0);
};
GameView.prototype.animate = function (time) {
  let dt = time  - this.lastTime;
  this.lastTime = time;
  this.game.moveObjects(dt / 20);
  this.game.draw(this.ctx);
  this.game.checkCollisions();
  if (!this.game.gameOver){
    window.requestAnimationFrame((dTime) => {
      this.animate(dTime);
    });
  } else {
    this.ctx.fillStyle = "white";
    this.ctx.font = "italic "+24+"pt Arial ";
    this.ctx.fillText(`Game Over \n Press Enter to restart`, 100,200 );
    key('enter', ()=>{
      this.game = new Game();
      this.start();
    });
  }
};

module.exports = GameView;
