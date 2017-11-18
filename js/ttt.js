
const
cols = 3,
rows = 3,
connect = 3;

var board = [],
won = false,
tpm = true,
turn = 1;

function und(v) {
	return typeof v == "undefined";
}

const
G = "g",
M = "m";

function getName(gx, gy, mx, my) {
	var r = G + gx + gy;
	if (!und(my)) r += M + mx + my;
	return r;
}

$(function() {
	
	$("body").append($("<div/>")
		.attr("id", "wrapper")
		.append($("<div/>")
			.attr("id", "turn")
			.text("P1")
		)
		.append($("<div/>")
			.attr("id", "board")
		)
		.append($("<div/>")
			.attr("id", "options")
			.append($("<span/>")
				.attr("id", "mode")
				.click(function() {
					tpm = !tpm;
					if (tpm) {
						$(this).text("P1 v P2");
					} else {
						$(this).text("P1 v AI");
					}
				})
			)
			.append($("<span/>")
				.attr("id", "reset")
				.text("RESET")
				.click(function() { reset(); })
			)
		)
	);
	$("#mode").click();
	
	// make all the squares
	for (let gy = 0; gy < rows; gy++) {
		
		let GROW = "grow";
		$("#board").append($("<div/>") // starting with the row divs
			.addClass(GROW)
		);
		
		for (let gx = 0; gx < cols; gx++) {
			
			$("." + GROW).eq(gy).append($("<div/>")
				.attr("id", getName(gx, gy))
				.addClass(G)
			);
			//if (gx == cols - 1) $("#board").append($("<br/>"));
			
			for (let my = 0; my < rows; my++) {
				
				let MROW = "mrow";
				$("#" + getName(gx, gy)).append($("<div/>")
					.addClass(MROW)
				);
				
				for (let mx = 0; mx < cols; mx++) {
					
					$("#" + getName(gx, gy) + " ." + MROW).eq(my).append($("<div/>")
						.attr("id", getName(gx, gy, mx, my))
						.addClass(M)
					);
				}
			}
			
			
			
			/*$("#board").append($("<div/>")
				.attr("id", "col-" + x) // columns are divs with id col-x
				.addClass("col")        // and class col
				.click(function() { onClick(x); })
			);
			board[x] = [];
			for (let y = 0; y < rows; y++) {
				board[x][y] = 0;
				$("#col-" + x).append($("<div/>")
					.attr("class", "row-" + y + " cell") // cells are divs with id cxry
					.attr("id", "c" + x + "r" + y)       // and id cxry
					.append($("<span/>"))
				);
			}*/
		}
	}
	$("#g00m00").addClass("mtac");//////
});

function repl(s, o, n) {
	if (o != n) while (s.includes(o)) s = s.replace(o, n);
	return s;
}

function def(x) {
	return typeof x != "undefined";
}

function cell(col, row) {
	return "c" + col + "r" + row;
}

function $cell(col, row) {
	return $("#" + cell(col, row));
}

function reset() {
	cls = ["p1", "p2", "select"];
	for (let c = 0; c < cls.length; c++) $("." + cls[c]).removeClass(cls[c]);
	for (let x = 0; x < cols; x++) for (let y = 0; y < rows; y++) board[x][y] = 0;
	won = false;
}

// when a column gets clicked
function onClick(col) {
	if (!won) {
		if (tpm) {
			if (drop(col, turn)) {
				if (turn == 2) {
					turn = 1;
				} else {
					turn = 2;
				}
			}
			return;
		} else if (turn == 1) {
			//if (drop(col, 1)) ai();
		}
	}
}

// try to drop a piece in a col, return success boolean
// returns false if game over
function drop(col, p) {
	for (let row = 0; row < rows; row++) {
		if (board[col][row] == 0) {
			board[col][row] = p;
			$cell(col, row).addClass("p" + p)
			return !bingo(p);
		}
	}
	return false;
}

// check if anyone's connected four
function bingo(p) {
	if (!def(p)) {
		bingo(1);
		bingo(2);
	}
	var cells = []; // counter, stores winning cells
	var check = function(a, b) {
		if (board[a][b] == p) {
			cells.push($cell(a, b));
			if (cells.length == connect) {
				win(p, cells);
				return true;
			}
		} else {
			cells = [];
		}
		return false;
	}
	// check for horizontal wins
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) if (check(x, y)) return true;
		cells = [];
	}
	// check for vertical wins
	for (let x = 0; x < cols; x++) {
		for (let y = 0; y < rows; y++) if (check(x, y)) return true;
		cells = [];
	}
	// positive diagonal wins
	for (let x = 0; x < cols - connect + 1; x++) {
		for (let y = 0; y < rows - connect + 1; y++) {
			for (let i = 0; i < connect; i++) if (check(x + i, y + i)) return true;
			cells = [];
		}
	}
	// negative diagonal wins
	for (let x = 0; x < cols - connect + 1; x++) {
		for (let y = connect - 1; y < rows; y++) {
			for (let i = 0; i < connect; i++) if (check(x + i, y - i)) return true;
			cells = [];
		}
	}
}

function win(p, cells) {
	won = true;
	console.log("P" + p + ", YOU WIN!!!");
	for (let i = 0; i < cells.length; i++) cells[i].addClass("select");
}