/*
 * Numblr, a non-floating point, non-radix-denominational system for JS math
 * © 2018 Gramkraxor
 */

// hoping to use Numblr to fix the scientific notation in doz.js

const AUTHORS = [ "Gramkraxor" ];
const YEAR = 2018;

$(function() {
	$("body").append(
		$($("<div/>")
			.attr("id", "footer")
			.text(["\u00A9", YEAR, AUTHORS[0]].join(" "))
		)
	);
});


// instead of converting charcters, use the modulus to go through `DIGS`.

const DIGS = "0123456789ABCDEF".split("");
const NEG = "-";

function getIndex(n) {
	for (let i = 0; i < DIGS.length; i++) {
		if (DIGS[i] === n.toUpperCase()) return i;
	}
}

function trimInt(n) {
	if (n == "") n = DIGS[0];

	let neg = n[0] == NEG;
	if (neg) n = n.slice(1);
	n = n.toUpperCase();

	while (n[0] == DIGS[0] && n.length > 1) {
		n = n.slice(1);
	}

	if (n != DIGS[0] && neg) n = NEG + n;
	return n;
}

function incrementInt(n, b) {
	if (n == "") n = DIGS[0];

	if (n[0] == NEG) {
		return trimInt(NEG + decrementInt(n.slice(1), b));
	}

	if (getIndex(n.slice(-1)) + 1 == b) {
		return incrementInt(n.slice(0, -1), b) + DIGS[0];
	}

	return trimInt(n.slice(0, -1) + DIGS[getIndex(n.slice(-1)) + 1]);
}

function decrementInt(n, b) {
	if (trimInt(n) == DIGS[0]) return NEG + DIGS[1];

	if (n[0] == NEG) {
		return trimInt(NEG + incrementInt(n.slice(1), b));
	}

	if (getIndex(n.slice(-1)) == 0) {
		return decrementInt(n.slice(0, -1), b) + DIGS[b - 1];
	}

	return trimInt(n.slice(0, -1) + DIGS[getIndex(n.slice(-1)) - 1]);
}

function isGreater(n0, n1) {

}

// can only add positive values at the moment
function addInt(n0, n1, b) {
	let r = "";
	let carry = false;

	while (n0.length < n1.length) {
		n0 = DIGS[0] + n0;
	}
	while (n1.length < n0.length) {
		n1 = DIGS[0] + n1;
	}

	for (let i = 0; i < n0.length; i++) {
		let x = getIndex(n0.slice(-i - 1)[0]) + getIndex(n1.slice(-i - 1)[0]) + carry;
		carry = x >= b;
		r = DIGS[x % b] + r;
	}
	if (carry) r = DIGS[1] + r;
	return trimInt(r);
}

function b2b(n, b0, b1) {
	// try harder
	return parseInt(n, b0).toString(b1).toUpperCase();
}

function y() {
	let hue = 150 + 30 * Math.sin(y.x++/60);
	$("body").css("background", "hsl(" + hue + ", 80%, 40%)");
}
y.x = 0;
setInterval(y, 50);
