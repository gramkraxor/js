/*
 * doz.js v2.0.0
 * Numeral base converter
 * (c) 1202 (2018) Gramkraxor
 */

const doz = function(value, radix, toRadix) {
	return doz.convert(value, radix, toRadix);
};

doz.NAME = "Doz";
doz.ID = "doz.js";
doz.VERSION = "2.0.0";
doz.AUTHORS = [ "Gramkraxor" ];
doz.YEAR = 2018;

doz.DIGITS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

doz.MODES = [
	doz.AB  = "AB.", // default
	doz.XE  = "XE;",
	doz.XEL = "X\u0190;",
	doz.XEU = doz.DWIGGINS = "\u218C\u218D;", // not in Unicode yet
	doz.ZE  = "ZE.",
	doz.ZEU = doz.PITMAN   = "\u218A\u218B.",
	doz.TE  = "TE;",
	doz.DE  = "\u03B4\u03B5;"
];

doz.convert = function(value, radix, toRadix) {
	if (typeof value === "string") {
		if (toRadix) {
			return doz.getString(doz.getNumber(value, radix), toRadix);
		}
		return doz.getNumber(value, radix);
	} else if (typeof value === "number") {
		return doz.getString(value, radix);
	}
	return NaN;
};

doz.fromMode = function(string, mode) {
	return doz.toCharset(string, mode, doz.AB);
};

doz.getNumber = function(string, radix) {
	string = string.trim().toUpperCase();

	let digits = doz.DIGITS.slice(0, radix);
	let regex = new RegExp(
		"^\\-?(?:[" + digits + "]*\\.?[" + digits + "+|[" + digits + "]+\\.?)$"
	);
	if (regex.test(string) && doz.isValidRadix(radix)) {
		if (string.endsWith(".")) {
			string = string.slice(0, -1);
		}
		if (string.includes(".")) {
			let pointIndex = string.indexOf(".");
			string = string.split(".").join("");
			let f = string.length - pointIndex;
			return parseInt(string, radix) / (radix ** f);
		}
		return parseInt(string, radix);

	}
	return NaN;
};

doz.getString = function(value, radix, toRadix) {
	if (toRadix) {
		return doz.getString(doz.getNumber(value, radix), toRadix);
	}
	if (isFinite(value) && doz.isValidRadix(radix)) {
		return value.toString(radix).toUpperCase();
	}
	return NaN.toString();
};

doz.isValidRadix = function(radix) {
	return Number.isInteger(radix) && radix >= 0x2 && radix <= doz.DIGITS.length;
};

doz.toCharset = function(string, fromCharset, toCharset) {
	if (typeof string === "string" && fromCharset && toCharset) {
		let positions = [];
		let stringArray = string.split("");
		for (let i = 0; i < fromCharset.length; i++) {
			positions.push([]);
			for (let j = 0; j < stringArray.length; j++) {
				if (stringArray[j] === fromCharset[i]) {
					positions[i].push(j);
				}
			}
		}
		for (let i = 0; i < fromCharset.length; i++) {
			for (let j = 0; j < positions[i].length; j++) {
				stringArray[positions[i][j]] = toCharset[i];
			}
		}
		return stringArray.join("");
	}
	return string;
};

doz.toMode = function(string, mode, toMode) {
	if (toMode) {
		return doz.toCharset(string, mode, toMode);
	}
	return doz.toCharset(string, doz.AB, mode);
};
