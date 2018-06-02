/*
 * Phi, a physics simulator
 * © 2018 Gramkraxor
 */


// namespace object
const stage = {
	size: nV(576, 576),
	bg: "#000000"
};

const mspf = 25; // milliseconds per frame

const AUTHORS = [ "Gramkraxor" ];
const YEAR = 2018;

// gravity constant
//let G = 7.6;
let G = 7.5 + 0.2 * Math.random();

// ID of setInterval(draw)
let loopId;

function und(x) {
	return typeof x == "undefined";
}

// stage context
let ctx;

// all bodies in the stage
let bodies = [];

function Body(vpos, vvel, vsiz, nmas, scol) {
	this.pos = vpos instanceof Vector ? vpos : nV(0, 0);
	this.vel = vvel instanceof Vector ? vvel : nV(0, 0);
	this.siz = vsiz instanceof Vector ? vsiz : nV(4, 4);
	this.mas = isNaN(nmas)? 1         : nmas;
	this.col = und(scol)?   "#FF0000" : scol;
	bodies.push(this);
}

Body.prototype.draw = function() {
	stage.rect(this.pos, this.siz, this.col);
}

stage.fill = function(style) {
	ctx.fillStyle = style;
}

// takes two Vector objects
// and a color, too
stage.rect = function(pos, siz, col) {
	if (!und(col)) ctx.fillStyle = col;
	ctx.fillRect(pos.x, pos.y, siz.x, siz.y);
}

// looping refresh drawing function
function draw() {
	ctx.fillStyle = stage.bg;
	ctx.fillRect(0, 0, stage.size.x, stage.size.y);

	for (let i = 0; i < bodies.length; i++) {
		let b = bodies[i];
		b.pos = b.pos.add(b.vel);
		ctx.fillStyle = b.col;
		ctx.fillRect(b.pos.x - b.siz.x / 2, b.pos.y - b.siz.y / 2, b.siz.x, b.siz.y);


		gravity:
		for (let j = 0; j < bodies.length; j++) {
			if (j == i) continue gravity;
			let b1 = bodies[i];
		 	let b2 = bodies[j];

		 	let m1 = b1.mas;
		 	let m2 = b2.mas;

			let vr = b2.pos.add(b1.pos.scale(-1));
			let r = vr.length();

			let F  = G * m1 * m2 / r ** 2;

			let a = vr.scale(F / r / m1);

			b1.vel = b1.vel.add(a);
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

	ctx = $("#stage")[0].getContext("2d");

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
body(nV(216, 288), nV(0, 1), nV(10, 10), 1, "#FF00FF");
body(nV(288, 288), nV(0, -0.1), nV(20, 20), 10, "#00FF00");
*/
new Body(nV(216, 288), nV( 0,  1), nV(10, 10), 5, "#FF0000");
new Body(nV(288, 216), nV(-1,  0), nV(10, 10), 5, "#00FF00");
new Body(nV(360, 288), nV( 0, -1), nV(10, 10), 5, "#00FFFF");
new Body(nV(288, 360), nV( 1,  0), nV(10, 10), 5, "#FF00FF");
new Body(nV(288, 288), nV( 0,  0), nV(10, 10), 5, "#FFFFFF");
