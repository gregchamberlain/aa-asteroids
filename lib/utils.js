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


function randomVec(length){
  let x = Math.random() * length;
  let y = Math.sqrt((length * length) - (x * x));
  return [x, y];
}

module.exports = {
  Dist,
  Norm,
  inherits,
  randomVec
};
