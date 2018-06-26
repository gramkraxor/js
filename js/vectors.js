/*
 * Vectors, a simple x-y coordinate interface
 * (c) 2018 Gramkraxor
 */


// object with x and y components
function Vector(x, y) {
	//if (!(this instanceof Vector)) return new Vector(x, y);
	if (x instanceof Vector) return x;
	this.x = isNaN(x)? 0 : x;
	this.y = isNaN(y)? 0 : y;
}

function nV(x, y) {
	return new Vector(x, y);
}


Vector.prototype.length = function() {
	return Math.hypot(this.x, this.y);
}

Vector.prototype.add = function(v, y) {
	v = nV(v, y);
	return nV(this.x + v.x, this.y + v.y);
}

Vector.prototype.subtract = function(v, y) {
	v = nV(v, y).scale(-1);
	return nV(this.x + v.x, this.y + v.y);
}

Vector.prototype.scale = function(n) {
	return nV(this.x * n, this.y * n);
}

Vector.prototype.dot = function(v, y) {
	v = nV(v, y);
	return this.x * v.x + this.y * v.y;
}

Vector.prototype.cross = function(v, y) {
	v = nV(v, y);
	return this.x * v.y - this.y * v.x;
}

Vector.prototype.unit = function() {
	return this.scale(1 / this.length());
}

Vector.prototype.angle = function() {
	return Math.atan2(this.y, this.x);
}


Vector.fromAngle = function(theta) {
	return nV(Math.cos(theta), Math.sin(theta));
}
