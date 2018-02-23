/* JS by Gramkraxor */

const mspf = 25; // milliseconds per frame
const stageSize = new vector(576, 576);
var bg = "#000000";

const AUTHORS = [ "Gramkraxor" ];
const YEAR = new Date().getFullYear();

// namespace objects
const
vectors = {},
stage   = {};

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

function body(vpos, vvel, vsiz, nmas, scol) {
	b = {};
	b.pos = und(vpos)? vector(0, 0) : vpos;
	b.vel = und(vvel)? vector(0, 0) : vvel;
	b.siz = und(vsiz)? vector(4, 4) : vsiz;
	b.mas = und(nmas)? 1 : nmas;
	b.col = und(scol)? "#FF0000" : scol;
	b.draw = function() {
		stage.rect(b.pos, b.siz, b.col);
	}
	bodies.push(b);
	return b;
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
		ctx.fillRect(b.pos.x, b.pos.y, b.siz.x, b.siz.y);
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
		)
	;
	
	draw();
	
});

body(vector(0, 0), vector(0.1, 0.1), vector(10, 10), 1, "#FF00FF");
