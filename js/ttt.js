
const
cols = 3,
rows = 3,
connect = 3,
G = "g",
M = "m",
X = "x",
O = "o",
open = "open",
cat  = "cat",
Xish = "x-ish",
Oish = "o-ish",
nope = "nope";

var
gboard = [],
mboard = [],
turn,
posPos;

function getName(gx, gy, mx, my) {
	var r = G + gx + gy;
	if (!isNaN(my)) r += M + mx + my;
	return r;
}

$(function() {
	
	$("body").append($("<div/>")
		.attr("id", "wrapper")
		.append($("<div/>")
			.attr("id", "board")
		)
		.append($("<div/>")
			.attr("id", "reset")
			.text("RESET")
			.click(function() { reset(); })
		)
	);
	$("#mode").click();
	
	// make all the squares
	for (let gy = 0; gy < rows; gy++) {
		
		var ROW = "row";
		var BOX = "box";
		var GROW = G + ROW;
		var GBOX = G + BOX;
		$("#board").append($("<div/>") // starting with the row divs
			.addClass(GROW)
		);
		
		for (let gx = 0; gx < cols; gx++) {
			
			$("." + GROW).eq(gy).append($("<div/>")
				.addClass(GBOX)
				.append($("<div/>")
					.attr("id", getName(gx, gy))
					.addClass(G)
				)
			);
			
			// now make the smaller ones
			for (let my = 0; my < rows; my++) {
				
				var MROW = M + ROW;
				var MBOX = M + BOX;
				$("#" + getName(gx, gy)).append($("<div/>")
					.addClass(MROW)
				);
				
				for (let mx = 0; mx < cols; mx++) {
					
					$("#" + getName(gx, gy) + " ." + MROW).eq(my).append($("<div/>")
						.addClass(MBOX)
						.append($("<div/>")
							.attr("id", getName(gx, gy, mx, my))
							.addClass(M)
							.click(function() {
								onClick(gx, gy, mx, my);
							})
						)
					);
				}
			}
		}
	}
	
	reset();
});

function repl(s, o, n) {
	return s.split(o).join(n);
}

function eq(a, b) {
	return JSON.stringify(a) == JSON.stringify(b);
}

function has(arr, x) {
	for (let i = 0; i < arr.length; i++) {
		if (eq(arr[i], x)) return true;
	}
	return false;
}

function draw(p, gx, gy, mx, my) {
	getCell(gx, gy, mx, my).addClass(p);
	if (!isNaN(my)) {
		mboard[gx][gy][mx][my] = p;
	} else {
		gboard[gx][gy] = p;
	}
}

function getCell(gx, gy, mx, my) {
	return $("#" + getName(gx, gy, mx, my));
}

function reset() {
	
	gboard = [];
	mboard = [];
	for (let gx = 0; gx < cols; gx++) {
		gboard.push([]);
		mboard.push([]);
		for (let gy = 0; gy < rows; gy++) {
			gboard[gx].push(open);
			mboard[gx].push([]);
			for (let mx = 0; mx < cols; mx++) {
				mboard[gx][gy].push([]);
				for (let my = 0; my < rows; my++) {
					mboard[gx][gy][mx].push(open);
				}
			}
		}
	}
	
	let classes = [ X, O, open, cat, Xish, Oish, nope ];
	for (let i = 0; i < classes.length; i++) {
		c = classes[i];
		$("." + c).removeClass(c);
	}
	
	turn = X;
	freebie();
	drawish();
	$(".g").addClass(nope);
}

function onClick(gx, gy, mx, my) {
	if (!(has(posPos, [gx, gy]) && mboard[gx][gy][mx][my] == open)) return;
	draw(turn, gx, gy, mx, my);
	if (bingo(turn, gx, gy)) {
		draw(turn, gx, gy);
		if (bingo(turn)) {
			victory();
		}
	}
	let full = true;
	for (let x = 0; x < cols; x++) {
		for (let y = 0; y < rows; y++) {
			if (mboard[gx][gy][x][y] == open) full = false;
		}
	}
	if (full && gboard[gx][gy] == open) {
		gboard[gx][gy] = cat;
		getCell(gx, gy).addClass(cat);
	}
	
	turn = (turn == O)? X : O;
	posPos = [];
	if (gboard[mx][my] == open) {
		posPos.push([mx, my]);
	} else {
		freebie();
	}
	removeish();
	drawish();
}

function victory() {
	//console.log("VICTORY FOR " + turn.toUpperCase());
	$("#board").addClass(turn);
}

function freebie() {
	posPos = [];
	for (let gx = 0; gx < cols; gx++) {
		for (let gy = 0; gy < rows; gy++) {
			if (gboard[gx][gy] == open) posPos.push([gx, gy]);
		}
	}
}

function drawish() {
	var ish = (turn == O)? Oish : Xish;
	for (let i = 0; i < posPos.length; i++) getCell(posPos[i][0], posPos[i][1]).addClass(ish);
}

function removeish() {
	$("." + Xish).removeClass(Xish);
	$("." + Oish).removeClass(Oish);
	$("." + nope).removeClass(nope);
}

function bingo(p, gx, gy) {
	let board = (isNaN(gy))? gboard : mboard[gx][gy];
	// check for horizontal wins
	H0: for (let x0 = 0; x0 < cols - connect + 1; x0++) {
		V: for (let y = 0; y < rows; y++) {
			H: for (let x = x0; x < cols; x++) {
				if (board[x][y] != p) continue V;
			}
			return true;
		}
	}
	// check for vertical wins
	V0: for (let y0 = 0; y0 < rows - connect + 1; y0++) {
		H: for (let x = 0; x < cols; x++) {
			V: for (let y = y0; y < rows; y++) {
				if (board[x][y] != p) continue H;
			}
			return true;
		}
	}
	// check for positive diagonal victory
	H0: for (let x0 = 0; x0 < cols - connect + 1; x0++) {
		V0: for (let y0 = 0; y0 < rows - connect + 1; y0++) {
			I: for (let i = 0; i < rows - x0 && i < cols - y0; i++) {
					if (board[x0 + i][y0 + i] != p) continue V0;
			}
			return true;
		}
	}
	// check for negative diagonal victory
	H0: for (let x0 = 0; x0 < cols - connect + 1; x0++) {
		V0: for (let y0 = rows - 1; y0 >= connect - 1; y0--) {
			I: for (let i = 0; i < connect; i++) {
					if (board[x0 + i][y0 - i] != p) continue V0;
			}
			return true;
		}
	}
}
