/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(3);

	document.addEventListener("DOMContentLoaded", function() {
	  const Canvas = document.getElementById("game-canvas");
	  const ctx = Canvas.getContext('2d');
	  let gameview = new GameView(ctx);
	  gameview.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	let MovingObject = __webpack_require__(5);
	let inherits = __webpack_require__(7).inherits;
	let randomVec = __webpack_require__(7).randomVec;

	function Asteroid (options){
	  this.COLOR = "grey";
	  this.RADIUS = 20;
	  MovingObject.call(this, {pos: options.pos, color: this.COLOR, radius: this.RADIUS, vel: randomVec(3)});
	}
	inherits(Asteroid, MovingObject);

	module.exports = Asteroid;


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(4).Game;


	function GameView(ctx){
	  this.game = new Game();
	  this.ctx = ctx;
	}

	GameView.prototype.start = function(){
	  setInterval(()=>{
	    this.game.moveObjects();
	    this.game.draw(this.ctx);
	  }, 20);
	};

	module.exports = GameView;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(1);



	function Game(){
	  this.asteroids = [];
	  this.addAsteroids();
	}
	const DIM_X = 800;
	const DIM_Y = 800;
	const NUM_ASTEROIDS = 10;

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

	module.exports = {
	  Game,
	  DIM_X,
	  DIM_Y,
	  NUM_ASTEROIDS,
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	let Utils = __webpack_require__(7);

	function MovingObject(options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	}

	MovingObject.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();
	  ctx.arc(
	    this.pos[0],
	    this.pos[1],
	    this.radius,
	    0,
	    2 * Math.PI,
	    false
	  );

	  ctx.fill();
	};

	MovingObject.prototype.move = function() {
	  this.pos[0] += this.vel[0];
	  if (this.pos[0] > Utils.dims[0]) {
	    this.pos[0] = 0;
	  }
	  this.pos[1] += this.vel[1];
	  if (this.pos[1] > Utils.dims[1]) {
	    this.pos[1] = 0;
	  }
	};

	module.exports = MovingObject;


/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	function Dist(pos1, pos2) {
	  let xDiff = (pos1[0] - pos2[0]);
	  let yDiff = (pos1[1] - pos2[1]);
	  return Math.sqrt( xDiff * xDiff + yDiff * yDiff);
	}

	function Norm(pos) {
	  return Dist([0,0], pos);
	}

	function inherits(childClass, parentClass) {
	  let Surrogate = function() {};
	  Surrogate.prototype = parentClass.prototype;
	  childClass.prototype = new Surrogate();
	  childClass.prototype.constructor = childClass;
	}

	let dims = [800,800];


	function randomVec(length){
	  let x = Math.random() * length;
	  let y = Math.sqrt((length * length) - (x * x));
	  return [x, y];
	}

	module.exports = {
	  Dist,
	  Norm,
	  inherits,
	  randomVec,
	  dims
	};


/***/ }
/******/ ]);