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
	  this.points = [];
	  MovingObject.call(this, {pos: options.pos, color: this.COLOR, radius: this.RADIUS, vel: randomVec(3)});
	}
	inherits(Asteroid, MovingObject);

	Asteroid.prototype.createPoints = function () {

	};

	module.exports = Asteroid;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	let MovingObject = __webpack_require__(5);
	let inherits = __webpack_require__(7).inherits;

	function Bullet(options){
	  this.COLOR = "yellow";
	  this.RADIUS = 2;
	  MovingObject.call(this, {pos: options.pos, color: this.COLOR, radius: this.RADIUS, vel: options.vel});

	}


	inherits(Bullet, MovingObject);

	Bullet.prototype.move = function (dt) {
	  this.pos[0] += this.vel[0] * dt;
	  this.pos[1] += this.vel[1] * dt;
	};
	module.exports = Bullet;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(4).Game;
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(1);
	let Utils = __webpack_require__(7);
	let Ship = __webpack_require__(6);
	let Bullet = __webpack_require__(2);


	function Game(){
	  this.asteroids = [];
	  this.addAsteroids();
	  this.ship = new Ship({pos: this.randomPosition(), game: this});
	  this.bullets = [];
	  this.lives = 3;
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
	  ctx.fillRect(0, 0, Utils.dims[0], Utils.dims[1]);
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
	        this.remove(bullet);
	        this.remove(asteroid1);
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

	MovingObject.prototype.move = function(dt) {
	  this.pos[0] += this.vel[0] * dt;
	  this.pos[1] += this.vel[1] * dt;
	  if (this.pos[0] > Utils.dims[0]) {
	    this.pos[0] = 0;
	  }else if (this.pos[0] < 0){
	    this.pos[0] = Utils.dims[0];
	  }
	  if (this.pos[1] > Utils.dims[1]) {
	    this.pos[1] = 0;
	  } else if (this.pos[1] < 0){
	    this.pos[1] = Utils.dims[1];
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
	let Norm = __webpack_require__(7).Norm;
	let Bullet = __webpack_require__(2);

	function Ship(options){
	  this.vel = [0,0];
	  this.COLOR = "white";
	  this.RADIUS = 10;
	  this.facingDir = [0,-1];
	  this.game = options.game;
	  MovingObject.call(this, {pos: options.pos, color: this.COLOR, radius: this.RADIUS, vel: this.vel});

	}

	inherits(Ship, MovingObject);

	Ship.prototype.power = function (impulse) {
	  this.facingDir = impulse;
	  this.vel[0] += impulse[0];
	  this.vel[1] += impulse[1];
	};


	Ship.prototype.fireBullet = function () {
	  let pos = [this.pos[0] + (this.radius * this.facingDir[0]), this.pos[1] + (this.radius * this.facingDir[1])]
	  let vel = [this.vel[0] + (5 * this.facingDir[0]), this.vel[1] + (5 * this.facingDir[1])];
	  console.log(this.vel);
	  console.log(vel);
	  let bullet = new Bullet({pos: pos, vel: vel});
	  this.game.bullets.push(bullet);
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