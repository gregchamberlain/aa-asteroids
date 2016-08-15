const Game = require("./game").Game;
const img = new Image();
function GameView(ctx){
  this.game = new Game();
  this.ctx = ctx;
}

GameView.prototype.start = function(){
  this.game.bindKeyHandlers();
  setInterval(()=>{
    this.game.moveObjects();
    this.game.draw(this.ctx);
    this.game.checkCollisions();
  }, 20);
};

module.exports = GameView;
