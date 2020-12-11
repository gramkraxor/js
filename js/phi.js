/*
 * Phi, a physics simulator
 * (c) 2018 Gramkraxor
 */

const AUTHORS = [ "Gramkraxor" ];
const YEAR = 2018;

// namespace object
const stage = {
	size: V(576, 576),
	bg: "#000000"
};

const mspf = 25; // milliseconds per frame

// gravity constant
//let G = 7.6;
let G = 7.5 + 0.2 * Math.random();
//let G = 3.9 + 0.2 * Math.random();

let bodies = [];


function Body(vpos, vvel, vsiz, nmas, scol) {
	this.pos = vpos instanceof V ? vpos : V(0, 0);
	this.vel = vvel instanceof V ? vvel : V(0, 0);
	this.siz = vsiz instanceof V ? vsiz : V(4, 4);
	this.mas = isNaN(nmas)? 1 : nmas;
	this.col = scol || "#FF0000";
	bodies.push(this);
}

Body.prototype.draw = function() {
	stage.rect(this.pos, this.siz, this.col);
};

stage.fill = function(style) {
	ctx.fillStyle = style;
};

// takes two V objects
// and a color, too
stage.rect = function(pos, siz, col) {
	if (col) ctx.fillStyle = col;
	ctx.fillRect(pos.x, pos.y, siz.x, siz.y);
};

// looping refresh drawing function
function draw() {
	ctx.fillStyle = stage.bg;
	ctx.fillRect(0, 0, stage.size.x, stage.size.y);

	for (let i = 0; i < bodies.length; i++) {
		let b = bodies[i];
		b.pos = b.pos.add(b.vel);
		ctx.fillStyle = b.col;
		ctx.fillRect(b.pos.x - b.siz.x / 2, b.pos.y - b.siz.y / 2, b.siz.x, b.siz.y);

/*
	}for (let i = 0; i < bodies.length; i++) {
		let b = bodies[i];
//*/

		gravity:
		for (let j = 0; j < bodies.length; j++) {
			if (j === i) continue gravity;
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

function dark(b) {
	$("body").toggleClass("dark", b);
}

new Body(V(288, 288), V( 0,  0), V(10, 10), 5, "#ffffff");

new Body(V(288, 216), V(-1,  0), V(10, 10), 5, "#ff0000");
new Body(V(360, 288), V( 0, -1), V(10, 10), 5, "#80ff00");
new Body(V(288, 360), V( 1,  0), V(10, 10), 5, "#00ffff");
new Body(V(216, 288), V( 0,  1), V(10, 10), 5, "#8000ff");

/*
let off = (x, y) => V(288, 288).add(72 * x, 72 * y);
let lil = Math.sin(2*Math.PI / 12);
let big = Math.cos(2*Math.PI / 12);
new Body(off( lil, -big), V(-big, -lil), V(10, 10), 5, "#ff8000");
new Body(off( big, -lil), V(-lil, -big), V(10, 10), 5, "#ffff00");
new Body(off( big,  lil), V( lil, -big), V(10, 10), 5, "#00ff00");
new Body(off( lil,  big), V( big, -lil), V(10, 10), 5, "#00ff80");
new Body(off(-lil,  big), V( big,  lil), V(10, 10), 5, "#0080ff");
new Body(off(-big,  lil), V( lil,  big), V(10, 10), 5, "#0000ff");
new Body(off(-big, -lil), V(-lil,  big), V(10, 10), 5, "#ff00ff");
new Body(off(-lil, -big), V(-big,  lil), V(10, 10), 5, "#ff0080");
//*/

$("body")
	.append($("<div>")
		.append($("<div>")
			.attr("id", "title")
			.html("&phi;")
		)
		.append($("<canvas>")
			.attr("id", "stage")
			.attr("width",  stage.size.x)
			.attr("height", stage.size.y)
		)
	)
	.append($("<div>")
		.attr("id", "footer")
		.text(["\u00A9", YEAR, AUTHORS[0]].join(" "))
		.click(dark)
		.click()
	)
;

let ctx = $("#stage")[0].getContext("2d");
let loopId = setInterval(draw, mspf);
