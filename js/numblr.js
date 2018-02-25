/*
 * Numblr, a non-floating point, non-radix-denominational system for JS math
 * © 2018 Gramkraxor
 */

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


// instead of converting charcters, use the modulus to go through `digs`.

var digs = "0123456789ABCDEF".split("");

function getIndex(n) {
	for (let i = 0; i < digs.length; i++) {
		if (digs[i] === n.toUpperCase()) return i;
	}
}

function nuts(n) {
	while (n[0] == digs[0]) {
		n = n.slice(1);
	}
}

function increment(n, b) {
	if (n == "") n = digs[0];
	if (getIndex(n.slice(-1)) + 1 == b) {
		return increment(n.slice(0, -1), b) + digs[0];
	} else {
		return n.slice(0, -1) + digs[getIndex(n.slice(-1)) + 1];
	}
	return nuts(n);
}

function addInt(n0, n1, b) {

}

function b2b(n, b0, b1) {
}
