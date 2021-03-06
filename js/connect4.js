/*
 * Connect 4 game
 * (c) 2018 Gramkraxor
 */

const cols = 7;
const rows = 6;
const connect = 4;

let board = [];
let won = false;
let tpm = false;
let turn = 1;

const AUTHORS = [ "Gramkraxor" ];
const YEAR = 2018;

$(function() {

	$("body").append($("<div>")
		.attr("id", "wrapper")
		.append($("<div>")
			.attr("id", "turn")
			.text("P1")
		)
		.append($("<div>")
			.attr("id", "board")
			.attr("class", "red")
		)
		.append($("<div>")
			.attr("id", "options")
			.append($("<span>")
				.attr("id", "mode")
				.click(function() {
					tpm = !tpm;
					if (tpm) {
						$(this).text("P1 v P2");
					} else {
						$(this).text("P1 v AI");
					}
					if (board[0]) { // reset() requires the game board to be loaded
						reset();
					} else {
						updateTurn(1);
					}
				})
			)
			.append($("<span>")
				.attr("id", "reset")
				.text("RESET")
				.click(function() { reset(); })
			)
		)
	)
	.append($("<div>")
		.attr("id", "footer")
		.text(["\u00A9", YEAR, AUTHORS[0]].join(" "))
		.click(function() { dark(); })
	);
	$("#mode").click();
	for (let x = 0; x < cols; x++) {
		$("#board").append($("<div>")
			.attr("id", "col-" + x) // columns are divs with id col-x
			.addClass("col")        // and class col
			.click(function() { onClick(x); })
		);
		board[x] = [];
		for (let y = 0; y < rows; y++) {
			board[x][y] = 0;
			$("#col-" + x).append($("<div>")
				.attr("class", "row-" + y + " cell") // cells are divs with id cxry
				.attr("id", "c" + x + "r" + y)       // and id cxry
				.append($("<span>"))
			);
		}
	}

});

function def(x) {
	return typeof x !== "undefined";
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
	$("body").removeClass("won");
	updateTurn(1);
}

function updateTurn(t) {
	$("body").removeClass("turn-" + turn);

	if (def(t)) {
		turn = t;
	} else {
		turn = turn % 2 + 1;
	}

	$("#turn").text("P" + turn);
	$("body").addClass("turn-" + turn);
}

// when a column gets clicked
function onClick(col) {
	if (!won) {
		if (tpm) {
			if (drop(col, turn)) {
				updateTurn();
			}
			return;
		} else if (turn === 1) {
			if (drop(col, 1)) ai();
		}
	}
}

// try to drop a piece in a col, return success boolean
// returns false if game over
function drop(col, p) {
	for (let row = 0; row < rows; row++) {
		if (board[col][row] === 0) {
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
	let cells = []; // counter, stores winning cells
	let check = function(a, b) {
		if (board[a][b] === p) {
			cells.push($cell(a, b));
			if (cells.length === connect) {
				win(p, cells);
				return true;
			}
		} else {
			cells = [];
		}
		return false;
	};
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
	$("body").addClass("won");
	console.log("P" + p + ", YOU WIN!!!");
	for (let i = 0; i < cells.length; i++) cells[i].addClass("select");
}

function ai() {
	// randomly drop a piece, try again if it didn't work
	while(!drop(Math.floor(Math.random() * (cols)), 2) && !won) {
	}
}

function dark(b) {
	$("body").toggleClass("dark", b);
}
