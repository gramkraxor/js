/* JS by Gramkraxor */

const ttt = {}; // namespace object

ttt.NAME = "Ultimate Tic Tac Toe";
ttt.AUTHORS = [ "Gramkraxor" ];
ttt.YEAR = new Date().getFullYear();

// superior string replacement function
ttt.repl = function(s, o, n) {
	return s.split(o).join(n);
}

// array equals?
ttt.eq = function(a, b) {
	return JSON.stringify(a) == JSON.stringify(b);
}

// array contains?
ttt.has = function(arr, x) {
	for (let i = 0; i < arr.length; i++) {
		if (ttt.eq(arr[i], x)) return true;
	}
	return false;
}

// create a seperate copy of array
ttt.copy = function(arr) {
	return JSON.parse(JSON.stringify(arr));
}

// class names/array values
ttt.G = "g";
ttt.M = "m";
ttt.X = "x";
ttt.O = "o";
ttt.open = "open";
ttt.cat  = "cat";
ttt.Xish = "x-ish";
ttt.Oish = "o-ish";
ttt.nope = "nope";

ttt.cols;
ttt.rows;
ttt.connect; // cells to connect to conquer

ttt.gboard; // array of 3^2 large cells
ttt.mboard; // array of 3^4 small cells

ttt.turn; // whose turn it is
ttt.posPos; // array of possible next moves
ttt.turnsTaken; // number of turns taken in the current game

// remember the last turn's data to allow the undo function
ttt.prevGboard;
ttt.prevMboard;
ttt.prevPosPos;

ttt.undone; // whether the previous move has been undone

ttt.sizes = [ 2, 3, 4, 5 ]; // standard board sizes
ttt.sizeIndex = 1; // index of scrolling through ttt.sizes

// generate cell name
ttt.getName = function(gx, gy, mx, my) {
	var r = ttt.G + gx + gy;
	if (!isNaN(my)) r += ttt.M + mx + my;
	return r;
}

// select cell
ttt.getCell = function(gx, gy, mx, my) {
	return $("#" + ttt.getName(gx, gy, mx, my));
}

// label a cell in the array and in the DOM
ttt.draw = function(p, gx, gy, mx, my) {
	if (p == ttt.open) return;
	ttt.getCell(gx, gy, mx, my).addClass(p);
	if (!isNaN(my)) {
		ttt.mboard[gx][gy][mx][my] = p;
	} else {
		ttt.gboard[gx][gy] = p;
	}
}

// test for a win
ttt.bingo = function(p, gx, gy) {
	let board = (isNaN(gy))? ttt.gboard : ttt.mboard[gx][gy];
	
	// easter egg
	if (gx == 1 && gy == 1) {
		let bigX = [
			[ttt.X,    ttt.open, ttt.X   ],
			[ttt.open, ttt.X,    ttt.open],
			[ttt.X,    ttt.open, ttt.X   ]
		];
		if (ttt.eq(board, bigX)) {
			$("body").addClass("dark");
		}
	}
	
	// check for horizontal wins
	H0: for (let x0 = 0; x0 < ttt.cols - ttt.connect + 1; x0++) {
		V: for (let y = 0; y < ttt.rows; y++) {
			H: for (let x = x0; x < ttt.cols; x++) {
				if (board[x][y] != p) continue V;
			}
			return true;
		}
	}
	// check for vertical wins
	V0: for (let y0 = 0; y0 < ttt.rows - ttt.connect + 1; y0++) {
		H: for (let x = 0; x < ttt.cols; x++) {
			V: for (let y = y0; y < ttt.rows; y++) {
				if (board[x][y] != p) continue H;
			}
			return true;
		}
	}
	// check for positive diagonal ttt.victory
	H0: for (let x0 = 0; x0 < ttt.cols - ttt.connect + 1; x0++) {
		V0: for (let y0 = 0; y0 < ttt.rows - ttt.connect + 1; y0++) {
			I: for (let i = 0; i < ttt.rows - x0 && i < ttt.cols - y0; i++) {
					if (board[x0 + i][y0 + i] != p) continue V0;
			}
			return true;
		}
	}
	// check for negative diagonal ttt.victory
	H0: for (let x0 = 0; x0 < ttt.cols - ttt.connect + 1; x0++) {
		V0: for (let y0 = ttt.rows - 1; y0 >= ttt.connect - 1; y0--) {
			I: for (let i = 0; i < ttt.connect; i++) {
					if (board[x0 + i][y0 - i] != p) continue V0;
			}
			return true;
		}
	}
	return false;
}

// test for a tie
ttt.catsGame = function(gx, gy) {
	let board = (isNaN(gy))? ttt.gboard : ttt.mboard[gx][gy];
	for (let x = 0; x < ttt.cols; x++) {
		for (let y = 0; y < ttt.rows; y++) {
			if (board[x][y] == ttt.open) {
				return false;
			}
		}
	}
	return true;
}

// label every open sopt as a possible next move
ttt.freebie = function() {
	ttt.posPos = [];
	for (let gx = 0; gx < ttt.cols; gx++) {
		for (let gy = 0; gy < ttt.rows; gy++) {
			if (ttt.gboard[gx][gy] == ttt.open) ttt.posPos.push([gx, gy]);
		}
	}
}

// start/restart entire game
ttt.reset = function() {
	
	ttt.gboard = [];
	ttt.mboard = [];
	for (let gx = 0; gx < ttt.cols; gx++) {
		ttt.gboard.push([]);
		ttt.mboard.push([]);
		for (let gy = 0; gy < ttt.rows; gy++) {
			ttt.gboard[gx].push(ttt.open);
			ttt.mboard[gx].push([]);
			for (let mx = 0; mx < ttt.cols; mx++) {
				ttt.mboard[gx][gy].push([]);
				for (let my = 0; my < ttt.rows; my++) {
					ttt.mboard[gx][gy][mx].push(ttt.open);
				}
			}
		}
	}
	
	ttt.wipe();
	
	ttt.turn = ttt.X;
	ttt.turnsTaken = 0;
	ttt.freebie();
	ttt.drawish(true);
}

ttt.nextTurn = function() {
	ttt.turn = (ttt.turn == ttt.O)? ttt.X : ttt.O;
}

// copy the previous board
ttt.remember = function() {
	ttt.prevGboard = ttt.copy(ttt.gboard);
	ttt.prevMboard = ttt.copy(ttt.mboard);
	ttt.prevPosPos = ttt.copy(ttt.posPos);
}

// undo one turn
ttt.undo = function() {
	if (ttt.undone || ttt.turnsTaken == 0) return;
	ttt.undone = true;
	ttt.turnsTaken--;
	ttt.wipe();
	ttt.gboard = ttt.copy(ttt.prevGboard);
	ttt.mboard = ttt.copy(ttt.prevMboard);
	ttt.posPos = ttt.copy(ttt.prevPosPos);
	ttt.nextTurn();
	for (let gx = 0; gx < ttt.cols; gx++) {
		for (let gy = 0; gy < ttt.rows; gy++) {
			ttt.draw(ttt.gboard[gx][gy], gx, gy);
			for (let mx = 0; mx < ttt.cols; mx++) {
				for (let my = 0; my < ttt.rows; my++) {
					ttt.draw(ttt.mboard[gx][gy][mx][my], gx, gy, mx, my);
				}
			}
		}
	}
	ttt.drawish(ttt.turnsTaken == 0);
}

// run through possible game sizes
ttt.resize = function() {
	ttt.sizeIndex++;
	if (ttt.sizeIndex == ttt.sizes.length) ttt.sizeIndex = 0;
	ttt.newBoard(ttt.sizes[ttt.sizeIndex]);
}

// add hover-higlight class for possible next moves
ttt.drawish = function(nope) {
	var ish = (ttt.turn == ttt.O)? ttt.Oish : ttt.Xish;
	for (let i = 0; i < ttt.posPos.length; i++) ttt.getCell(ttt.posPos[i][0], ttt.posPos[i][1]).addClass(ish);
	if (nope) $("." + ttt.G).addClass(ttt.nope);
}

// remove hover-higlight classes
ttt.wipeish = function() {
	$("." + ttt.G + ", ." + ttt.M).removeClass([ttt.Xish, ttt.Oish, ttt.nope].join(" "));
}

// remove changable classes
ttt.wipe = function() {
	$("#board, #board *").removeClass([ttt.X, ttt.O, ttt.cat, ttt.Xish, ttt.Oish, ttt.nope].join(" "));
}

// when a small square gets clicked
ttt.onClick = function(gx, gy, mx, my) {
	if (!(ttt.has(ttt.posPos, [gx, gy]) && ttt.mboard[gx][gy][mx][my] == ttt.open)) return;
	ttt.remember();
	ttt.turnsTaken++;
	ttt.undone = false;
	ttt.draw(ttt.turn, gx, gy, mx, my);
	
	if (ttt.bingo(ttt.turn, gx, gy)) {
		ttt.draw(ttt.turn, gx, gy);
		if (ttt.bingo(ttt.turn)) {
			ttt.victory(ttt.turn);
			ttt.nextTurn();
			return;
		} else if (ttt.catsGame()) {
			ttt.tie();
			ttt.nextTurn();
			return;
		}
	} else if (ttt.catsGame(gx, gy)) {
		ttt.draw(ttt.cat, gx, gy);
	}
	
	ttt.nextTurn();
	ttt.posPos = [];
	if (ttt.gboard[mx][my] == ttt.open) {
		ttt.posPos.push([mx, my]);
	} else {
		ttt.freebie();
	}
	ttt.wipeish();
	ttt.drawish();
}

// somebody won
ttt.victory = function(p) {
	//console.log("VICTORY FOR " + ttt.turn.toUpperCase());
	$("#board").addClass(p);
}

// nobody won
ttt.tie = function() {
	//console.log("IT\'S A TIE");
	$("#board").addClass(ttt.cat);
}

// on load
$(function() {
	
	$("body")
		.append($("<div/>")
			.attr("id", "wrapper")
			.append($("<div/>")
				.attr("id", "board")
			)
			.append($("<div/>")
				.attr("id", "buttons")
				.append($("<div/>")
					.attr("id", "undo")
					.text("UNDO")
					.click(function() { ttt.undo(); })
				)
				.append($("<div/>")
					.attr("id", "reset")
					.text("RESET")
					.click(function() { ttt.reset(); })
				)
				.append($("<div/>")
					.attr("id", "resize")
					.click(function() { ttt.resize(); })
				)
				.append($("<div/>")
					.attr("id", "darken")
					.text("\u25A0")
					.html("&nbsp;")
					.click(function() {
						if ($("body").hasClass("dark")) {
							$("body").removeClass("dark");
						} else {
							$("body").addClass("dark");
						}
					})
				)
			)
		)
		.append($("<div/>")
			.attr("id", "footer")
			.text(["\u00A9", ttt.YEAR, ttt.AUTHORS[0]].join(" "))
		)
	;
	
	ttt.newBoard();
	
});

ttt.newBoard = function(size) {
	
	// empty the board for resizing
	$("#board").empty();
	ttt.gboard = [];
	ttt.mboard = [];
	
	// default game size
	if (isNaN(size)) size = 3;
	ttt.cols = ttt.rows = ttt.connect = size;
	
	$("#resize").text(size).append($("<sup/>").text("4"))
	
	// make all the squares
	for (let gy = 0; gy < ttt.rows; gy++) {
		
		var ROW = "row";
		var BOX = "box";
		var GROW = ttt.G + ROW;
		var GBOX = ttt.G + BOX;
		$("#board").append($("<div/>") // starting with the row divs
			.addClass(GROW)
		);
		
		for (let gx = 0; gx < ttt.cols; gx++) {
			
			$("." + GROW).eq(gy).append($("<div/>")
				.addClass(GBOX)
				.append($("<div/>")
					.attr("id", ttt.getName(gx, gy))
					.addClass(ttt.G)
				)
			);
			
			// now make the smaller ones
			for (let my = 0; my < ttt.rows; my++) {
				
				var MROW = ttt.M + ROW;
				var MBOX = ttt.M + BOX;
				$("#" + ttt.getName(gx, gy)).append($("<div/>")
					.addClass(MROW)
				);
				
				for (let mx = 0; mx < ttt.cols; mx++) {
					
					$("#" + ttt.getName(gx, gy) + " ." + MROW).eq(my).append($("<div/>")
						.addClass(MBOX)
						.append($("<div/>")
							.attr("id", ttt.getName(gx, gy, mx, my))
							.addClass(ttt.M)
							.click(function() {
								ttt.onClick(gx, gy, mx, my);
							})
						)
					);
				}
			}
		}
	}
	
	ttt.reset(); // begin!
	
}

ttt.show = function(arr) {
	let r = "";
	for (let gy = 0; gy < arr[0].length; gy++) {
		for (let gx = 0; gx < arr.length; gx++) {
			r += (arr[gx][gy] == ttt.open)? "_" : arr[gx][gy];
			r += " ";
		}
		if (gy < arr[0].length - 1) r += "\n";
	}
	console.log(r);
}
