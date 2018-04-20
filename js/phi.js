/*
 * Phi, a physics simulator
 * © 2018 Gramkraxor
 */


// namespace object
const stage = {};
stage.size = vect(576, 576);
stage.bg   = "#000000";

const mspf = 25; // milliseconds per frame

const AUTHORS = [ "Gramkraxor" ];
const YEAR = 2018;

// gravity constant
let G = 7.6;

// ID of setInterval(draw)
let loopId;

function und(x) {
	return typeof x == "undefined";
}

// get the stage's 2d context
function s() {
	return $("#stage")[0].getContext("2d");
}

// object with x and y components
function Vector(x, y) {
	this.x = isNaN(x)? 0 : x;
	this.y = isNaN(y)? 0 : y;
}

Vector.prototype.plus = function(v) {
	return new Vector(this.x + v.x, this.y + v.y);
}

function vect(x, y) {
	return new Vector(x, y);
}

// all bodies in the stage
let bodies = [];

function Body(vpos, vvel, vsiz, nmas, scol) {
	this.pos = vpos instanceof Vector ? vpos : vect(0, 0);
	this.vel = vvel instanceof Vector ? vvel : vect(0, 0);
	this.siz = vsiz instanceof Vector ? vsiz : vect(4, 4);
	this.mas = isNaN(nmas)? 1         : nmas;
	this.col = und(scol)?   "#FF0000" : scol;
	bodies.push(this);
}

Body.prototype.draw = function() {
	stage.rect(this.pos, this.siz, this.col);
}

stage.fill = function(style) {
	s().fillStyle = style;
}

// takes two Vector objects
// and a color, too
stage.rect = function(pos, siz, col) {
	if (!und(col)) s().fillStyle = col;
	s().fillRect(pos.x, pos.y, siz.x, siz.y);
}

// looping refresh drawing function
function draw() {
	let ctx = $("#stage")[0].getContext("2d");
	ctx.fillStyle = stage.bg;
	ctx.fillRect(0, 0, stage.size.x, stage.size.y);

	for (let i = 0; i < bodies.length; i++) {
		let b = bodies[i];
		b.pos = b.pos.plus(b.vel);
		ctx.fillStyle = b.col;
		ctx.fillRect(b.pos.x - b.siz.x / 2, b.pos.y - b.siz.y / 2, b.siz.x, b.siz.y);


		gravity:
		for (let j = 0; j < bodies.length; j++) {
			if (j == i) continue gravity;
				let b1 = bodies[i];
		 		let b2 = bodies[j];

		 		let m1 = b1.mas;
		 		let m2 = b2.mas;

		 		let Dx = b2.pos.x - b1.pos.x;
				let Dy = b2.pos.y - b1.pos.y;

				let r  = Math.hypot(Dx, Dy);

				let F  = G * m1 * m2 / Math.pow(r, 2);

				let Fx = F * Dx / r;
				let Fy = F * Dy / r;

				let ax = Fx / m1;
				let ay = Fy / m1;

				let acc = vect(ax, ay);

				b1.vel = b1.vel.plus(acc);
		}
	}
}

// on document load
$(function() {

	$("body")
		.append($("<div/>")
			.append($("<div/>")
				.attr("id", "title")
				//.text("\u03c6")
				.append("&phi;")
			)
			.append($("<canvas/>")
				.attr("id", "stage")
				.attr("width",  stage.size.x)
				.attr("height", stage.size.y)
			)
		)
		.append($("<div/>")
			.attr("id", "footer")
			.text(["\u00A9", YEAR, AUTHORS[0]].join(" "))
			.click(dark)
		)
	;

	dark();

	loopId = setInterval(draw, mspf); // loop at proper fps

});

function dark(b) {
	let $body = $("body");
	let d = "dark";
	if (typeof b != "boolean") b = !$body.hasClass(d);
	if (b) {
		$body.addClass(d);
	} else {
		$body.removeClass(d);
	}
}

/*
body(vect(216, 288), vect(0, 1), vect(10, 10), 1, "#FF00FF");
body(vect(288, 288), vect(0, -0.1), vect(20, 20), 10, "#00FF00");
*/
new Body(vect(216, 288), vect( 0,  1), vect(10, 10), 5, "#FF0000");
new Body(vect(288, 216), vect(-1,  0), vect(10, 10), 5, "#00FF00");
new Body(vect(360, 288), vect( 0, -1), vect(10, 10), 5, "#00FFFF");
new Body(vect(288, 360), vect( 1,  0), vect(10, 10), 5, "#FF00FF");
new Body(vect(288, 288), vect( 0,  0), vect(10, 10), 5, "#FFFFFF");
