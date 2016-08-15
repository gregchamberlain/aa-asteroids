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
	  this.game.bindKeyHandlers();
	  setInterval(()=>{
	    this.game.moveObjects();
	    this.game.draw(this.ctx);
	    this.game.checkCollisions();
	  }, 20);
	};

	module.exports = GameView;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(1);
	let Utils = __webpack_require__(7);
	let Ship = __webpack_require__(6);


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
	  this.allObjects().forEach(asteroid => {
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
	};

	module.exports = {
	  Game
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

	MovingObject.prototype.isCollidedWith = function (otherObject) {
	  return Utils.Dist(this.pos, otherObject.pos) <= this.radius + otherObject.radius;
	};

	module.exports = MovingObject;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	let MovingObject = __webpack_require__(5);
	let inherits = __webpack_require__(7).inherits;

	function Ship(options){
	  this.vel = [0,0];
	  this.COLOR = "white";
	  this.RADIUS = 10;
	  MovingObject.call(this, {pos: options.pos, color: this.COLOR, radius: this.RADIUS, vel: this.vel});

	}

	inherits(Ship, MovingObject);

	Ship.prototype.power = function (impulse) {
	  this.vel[0] += impulse[0];
	  this.vel[1] += impulse[1];
	};



	module.exports = Ship;


/***/ },
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