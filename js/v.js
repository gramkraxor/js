/*
 * v.js v2.0.0
 * V, a simple 2D coordinate interface
 * (c) 2018 Gramkraxor
 */

function V(x, y) {
	if (!(this instanceof V)) return new V(x, y);
	if (x instanceof V) return x;
	this.x = isNaN(x)? 0 : x;
	this.y = isNaN(y)? 0 : y;
}


V.prototype.length = function() {
	return Math.hypot(this.x, this.y);
};

V.prototype.add = function(v, y) {
	v = V(v, y);
	return V(this.x + v.x, this.y + v.y);
};

V.prototype.subtract = function(v, y) {
	v = V(v, y).scale(-1);
	return V(this.x + v.x, this.y + v.y);
};

V.prototype.scale = function(n) {
	return V(this.x * n, this.y * n);
};

V.prototype.dot = function(v, y) {
	v = V(v, y);
	return this.x * v.x + this.y * v.y;
};

V.prototype.cross = function(v, y) {
	v = V(v, y);
	return this.x * v.y - this.y * v.x;
};

V.prototype.unit = function() {
	return this.scale(1 / this.length());
};

V.prototype.angle = function() {
	return Math.atan2(this.y, this.x);
};

V.prototype.toString = function() {
	return "(" + this.x + "," + this.y + ")";
};


V.fromAngle = function(theta) {
	return V(Math.cos(theta), Math.sin(theta));
};
