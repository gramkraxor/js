
const mspf = 250;
const stageSize = new vector(576, 576);
var bg = "#000000";

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

stage = {};

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
	
	
	setTimeout(draw, mspf); // loop at proper fps
}

// on document load
$(function() {
	
	$("body").append($("<div/>")
		.append($("<div/>")
			.attr("id", "title")
			.text("\u03c6")
		)
		.append($("<canvas/>")
			.attr("id", "stage")
			.attr("width",  stageSize.x)
	    .attr("height", stageSize.y)
		)
	);
	
	var ctx = $("#stage")[0].getContext("2d");
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(0, 0, 24, 24);
	
	draw();
	
});
