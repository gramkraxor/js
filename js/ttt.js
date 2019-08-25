/*
 * js/ttt v2.0.0
 * Ultimate Tic Tac Toe game
 * (c) 2018 Gramkraxor
 */

const NAME = "Ultimate Tic Tac Toe";
const ID = "js/ttt";
const VERSION = "2.0.0";
const AUTHORS = [ "Gramkraxor" ];
const YEAR = 2018;

const players = [ "x", "o" ];
const open = "_";

const colorClasses = [ "dark", "pale" ];

const boardSizes = [ 2, 3, 4, 5 ];
const defaultBoardSizesIndex = 1;
let boardSizesIndex = 1;

let justReset = false;

let victor;
let gboard; // array of 3^2 large cells
let mboard; // array of 3^4 small cells

let posPos; // array of possible next moves
let turnsTaken;
let beenUndone;
let prevData;

$(() => {
	$("body")
		.append($("<div>", { id: "wrapper" })
			.append($("<div>", { id: "board" }))
			.append($("<div>", { id: "buttons" })
				.append($("<div>", { id: "undo",    text:  "Undo",   click: onUndo    }))
				.append($("<div>", { id: "reset",   text:  "Reset",  click: onReset   }))
				.append($("<div>", { id: "resize",                   click: onResize  }))
				.append($("<div>", { id: "recolor", html:  "&nbsp;", click: onRecolor }))
			)
		)
		.append($("<div>", { id: "v", text: "v" + VERSION }))
		.append($("<div>", { id: "gk", text: "\u00A9 " + AUTHORS[0] }));
	onStart();
});


function copy(arr) {
	return JSON.parse(JSON.stringify(arr));
}

function color(index) {
	if (!isNaN(index)) {
		color.index = index;
	} else if (!color.index) {
		color.index = 0;
	}
	color.index %= 4;
	$("body")
		.toggleClass(colorClasses[0], (color.index + 3) % 4 < 2)
		.toggleClass(colorClasses[1], color.index > 1);
	try {
		storage(sessionStorage, ID + "/color", color.index);
	} catch (e) {
	}
}

// label a cell in the array and in the DOM
function draw(p, gx, gy, mx, my) {
	if (p === open) return;
	getCell(gx, gy, mx, my).addClass(p);
	if (!isNaN(my)) {
		mboard[gx][gy][mx][my] = p;
	} else if (!isNaN(gy)) {
		gboard[gx][gy] = p;
	} else {
		victor = p;
	}
}

// re-label all items
function drawAll() {
	draw(victor);
	for (let gx = 0; gx < getBoardSize(); gx++) {
		for (let gy = 0; gy < getBoardSize(); gy++) {
			draw(gboard[gx][gy], gx, gy);
			for (let mx = 0; mx < getBoardSize(); mx++) {
				for (let my = 0; my < getBoardSize(); my++) {
					draw(mboard[gx][gy][mx][my], gx, gy, mx, my);
				}
			}
		}
	}
}

// add hover-higlight class for possible next moves
function drawish() {
	for (let i = 0; i < posPos.length; i++) {
		getCell(posPos[i][0], posPos[i][1]).addClass(getWhoseTurn() + "-ish");
	}
	if (turnsTaken === 0) $(".g").addClass("nope");
}

function eq(a, b) {
	return JSON.stringify(a) === JSON.stringify(b);
}

function exportData(withPrevData) {
	try {
		let data = getData();
		if (withPrevData) data.prevData = prevData;
		storage(sessionStorage, ID + "/data", data);
		return true;
	} catch (e) {
		return false;
	}
}

// label every open sopt as a possible next move
function freeMove() {
	posPos = [];
	for (let gx = 0; gx < getBoardSize(); gx++) {
		for (let gy = 0; gy < getBoardSize(); gy++) {
			if (gboard[gx][gy] === open) posPos.push([gx, gy]);
		}
	}
}

function getBoardSize() {
	return boardSizes[boardSizesIndex];
}

function getCell(gx, gy, mx, my) {
	if (isNaN(gx)) {
		return $("#board");
	} else {
		return $("#" + getName(gx, gy, mx, my));
	}
}

function getData() {
	return {
		victor: victor,
		gboard: copy(gboard),
		mboard: copy(mboard),
		posPos: copy(posPos),
		boardSizesIndex: boardSizesIndex,
		turnsTaken: turnsTaken,
		justReset: justReset
	};
}

// generate cell name
function getName(gx, gy, mx, my) {
	let r = "g" + gx + "-" + gy;
	if (!isNaN(my)) r += "m" + mx + "-" + my;
	return r;
}

function getWhoseTurn(turns) {
	if (isNaN(turns)) turns = turnsTaken;
	return players[turns % players.length];
}

function gotBingo(p, gx, gy) {
	let board = (isNaN(gx) || isNaN(gy))? gboard : mboard[gx][gy];

	let dexter   = true;
	let sinister = true;
	for (let i = 0; i < getBoardSize(); i++) {
		let thisCol = true;
		let thisRow = true;
		for (let j = 0; j < getBoardSize(); j++) {
			if (board[i][j] != p) thisCol = false;
			if (board[j][i] != p) thisRow = false;
		}
		if (thisCol || thisRow) return true;
		if (board[i][i]                      != p) dexter   = false;
		if (board[i][getBoardSize() - 1 - i] != p) sinister = false;
	}
	return dexter || sinister;
}

// array contains?
function has(arr, x) {
	for (let i = 0; i < arr.length; i++) {
		if (eq(arr[i], x)) return true;
	}
	return false;
}

function importData() {
	let data = storage(sessionStorage, ID + "/data");
	if (!data) throw true;
	boardSizesIndex = data.boardSizesIndex;
	newDomBoard();
	turnsTaken = data.turnsTaken;
	victor = data.victor;
	gboard = copy(data.gboard);
	mboard = copy(data.mboard);
	posPos = copy(data.posPos);
	justReset = data.justReset;
	prevData = data.prevData;
	drawAll();
	drawish();
}

function isCatsGame(gx, gy) {
	let board = (isNaN(gy))? gboard : mboard[gx][gy];
	for (let x = 0; x < getBoardSize(); x++) {
		for (let y = 0; y < getBoardSize(); y++) {
			if (board[x][y] === open) {
				return false;
			}
		}
	}
	return true;
}

function newDataBoard() {
	victor = open;
	gboard = [];
	mboard = [];
	for (let gx = 0; gx < getBoardSize(); gx++) {
		gboard.push([]);
		mboard.push([]);
		for (let gy = 0; gy < getBoardSize(); gy++) {
			gboard[gx].push(open);
			mboard[gx].push([]);
			for (let mx = 0; mx < getBoardSize(); mx++) {
				mboard[gx][gy].push([]);
				for (let my = 0; my < getBoardSize(); my++) {
					mboard[gx][gy][mx].push(open);
				}
			}
		}
	}
}

// replace the DOM board
function newDomBoard() {
	$("#board").empty();
	$("#resize").text(getBoardSize()).append($("<sup>").text("4"));
	// make all the squares
	for (let gy = 0; gy < getBoardSize(); gy++) {
		$("#board").append($("<div>", { class: "g-row" })); // starting with the row divs
		for (let gx = 0; gx < getBoardSize(); gx++) {
			$(".g-row").eq(gy).append($("<div>", { class: "g-box" })
				.append($("<div>", { id: getName(gx, gy), class: "g" }))
			);
			// now make the smaller ones
			for (let my = 0; my < getBoardSize(); my++) {
				$("#" + getName(gx, gy)).append($("<div>", { class: "m-row" }));
				for (let mx = 0; mx < getBoardSize(); mx++) {
					$("#" + getName(gx, gy) + " .m-row").eq(my).append($("<div>", { class: "m-box" })
						.append($("<div>", {
							id: getName(gx, gy, mx, my),
							class: "m",
							click: () => onClick(gx, gy, mx, my)
						}))
					);
				}
			}
		}
	}
}

// when a small square gets clicked
function onClick(gx, gy, mx, my) {
	if (!has(posPos, [gx, gy]) || mboard[gx][gy][mx][my] !== open) return;
	prevData = getData();
	let whoseTurn = getWhoseTurn();
	justReset = false;
	beenUndone = false;
	turnsTaken++;
	draw(whoseTurn, gx, gy, mx, my);

	if (gotBingo(whoseTurn, gx, gy)) {
		draw(whoseTurn, gx, gy);
		let bingo = gotBingo(whoseTurn);
		if (bingo || isCatsGame()) {
			if (bingo) {
				draw(whoseTurn);
			} else {
				draw("cat");
			}
			posPos = [];
			exportData(true);
			return;
		}
	} else if (isCatsGame(gx, gy)) {
		draw("cat", gx, gy);
	}

	posPos = [];
	if (gboard[mx][my] === open) {
		posPos.push([mx, my]);
	} else {
		freeMove();
	}
	exportData(true);
	wipeish();
	drawish();
}

function onRecolor() {
	color.index++;
	color();
}

function onReset() {
	if (!justReset) prevData = getData();
	justReset = true;
	beenUndone = false;
	newDataBoard();
	startNewGame();
	exportData(true);
}

function onResize() {
	if (!justReset) prevData = getData();
	justReset = true;
	beenUndone = false;
	boardSizesIndex++;
	boardSizesIndex %= boardSizes.length;
	newDomBoard();
	newDataBoard();
	startNewGame();
	exportData(true);
}

function onStart() {
	try {
		color(storage(sessionStorage, ID + "/color"));
	} catch (e) {
		color();
	}
	try {
		importData();
	} catch (e) {
		newDomBoard();
		newDataBoard();
		startNewGame();
	}
}

function onUndo() {
	if (!prevData || beenUndone) return;
	if (justReset) {
		boardSizesIndex = prevData.boardSizesIndex;
		newDomBoard();
		turnsTaken = prevData.turnsTaken;
	} else {
		turnsTaken--;
	}
	victor = prevData.victor;
	gboard = copy(prevData.gboard);
	mboard = copy(prevData.mboard);
	posPos = copy(prevData.posPos);
	beenUndone = true;
	justReset = false;
	exportData(false);
	wipe();
	drawAll();
	drawish();
}

function startNewGame() {
	turnsTaken = 0;
	posPos = [];
	wipe();
	freeMove();
	drawish();
}

function storage(store, key, data) {
	if (typeof data === "undefined") {
		let value = store.getItem(key);
		try {
			return JSON.parse(value);
		} catch (e) {
			return value;
		}
	} else {
		store.setItem(key, JSON.stringify(data));
		return data;
	}
}

// remove changable classes
function wipe() {
	$("#board, #board *").removeClass("x o cat x-ish o-ish nope");
}

// remove hover-higlight classes
function wipeish() {
	$(".g, .m").removeClass("x-ish o-ish nope");
}



function displayBoard(arr) {
	let addCell = (cell) => {
		if (cell === "cat") {
			r += "="
		} else {
			r += cell;
		}
		r += " ";
	}
	let r = "Local Boards:\n";

	for (let gy = 0; gy < getBoardSize(); gy++) {
		for (let my = 0; my < getBoardSize(); my++) {
			for (let gx = 0; gx < getBoardSize(); gx++) {
				for (let mx = 0; mx < getBoardSize(); mx++) {
					addCell(mboard[gx][gy][mx][my]);
				}
				if (gx < getBoardSize() - 1) {
					r += "  ";
				}
			}
			r += "\n";
		}
		r += "\n";
	}
	r += "\nGlobal Board:\n"

	for (let gy = 0; gy < getBoardSize(); gy++) {
		for (let gx = 0; gx < getBoardSize(); gx++) {
			addCell(gboard[gx][gy]);
		}
		r += "\n";
	}

	r += "\n\nVictor:\n";
	addCell(victor);

	console.log(r);
}
