/*
 * Phi, a physics simulator
 * © 2018 Gramkraxor
 */

const mspf = 25; // milliseconds per frame
const stageSize = new vector(576, 576);
var bg = "#000000";

const AUTHORS = [ "Gramkraxor" ];
const YEAR = 2018;

// namespace objects
const
vectors = {},
stage   = {};

// gravity constant
var G = 7.6;

function und(x) {
	return typeof x == "undefined";
}

// get the stage's 2d context
function s() {
	return $("#stage")[0].getContext("2d");
}

// object with x and y components
function vector(x, y) {
	var v = {};
	v.x = und(x)? 0 : x;
	v.y = und(y)? 0 : y;
	v.isVector = true;
	v.plus = function(vec) {
		return vector(v.x + vec.x, v.y + vec.y);
	}
	return v;
}

vectors.add = function(v0, v1) {
	return vector(v0.x + v1.x, v0.y + v1.y);
}

var bodies = [];

function Body(vpos, vvel, vsiz, nmas, scol) {
	this.pos = und(vpos)? vector(0, 0) : vpos;
	this.vel = und(vvel)? vector(0, 0) : vvel;
	this.siz = und(vsiz)? vector(4, 4) : vsiz;
	this.mas = und(nmas)? 1 : nmas;
	this.col = und(scol)? "#FF0000" : scol;
	bodies.push(this);
}

Body.prototype.draw= function() {
	stage.rect(this.pos, this.siz, this.col);
}

stage.fill = function(style) {
	s().fillStyle = style;
}

// takes two vector objects
// and a color, too
stage.rect = function(pos, siz, col) {
	if (!und(col)) s().fillStyle = col;
	s().fillRect(pos.x, pos.y, siz.x, siz.y);
}

// looping refresh drawing function
function draw() {
	var ctx = $("#stage")[0].getContext("2d");
	ctx.fillStyle = bg;
	ctx.fillRect(0, 0, stageSize.x, stageSize.y);

	for (let i = 0; i < bodies.length; i++) {
		let b = bodies[i];
		b.pos = vectors.add(b.pos, b.vel);
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

				let acc = vector(ax, ay);

				b1.vel = vectors.add(b1.vel, acc)
		}
	}

	setTimeout(draw, mspf); // loop at proper fps
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
				.attr("width",  stageSize.x)
				.attr("height", stageSize.y)
			)
		)
		.append($("<div/>")
			.attr("id", "footer")
			.text(["\u00A9", YEAR, AUTHORS[0]].join(" "))
			.click(dark)
		)
	;

	dark();
	draw();

});

function dark(b) {
	var body = $("body");
	var d = "dark";
	if (typeof b != "boolean") var b = !body.hasClass(d);
	if (b) {
		body.addClass(d);
	} else {
		body.removeClass(d);
	}
}

/*
body(vector(216, 288), vector(0, 1), vector(10, 10), 1, "#FF00FF");
body(vector(288, 288), vector(0, -0.1), vector(20, 20), 10, "#00FF00");
*/
new Body(vector(216, 288), vector( 0,  1), vector(10, 10), 5, "#FF0000");
new Body(vector(288, 216), vector(-1,  0), vector(10, 10), 5, "#00FF00");
new Body(vector(360, 288), vector( 0, -1), vector(10, 10), 5, "#00FFFF");
new Body(vector(288, 360), vector( 1,  0), vector(10, 10), 5, "#FF00FF");
new Body(vector(288, 288), vector( 0,  0), vector(10, 10), 5, "#FFFFFF");
