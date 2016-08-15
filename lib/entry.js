const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", function() {
  const Canvas = document.getElementById("game-canvas");
  const ctx = Canvas.getContext('2d');
  let gameview = new GameView(ctx);
  gameview.start();
});
