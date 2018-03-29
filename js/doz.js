/*
 * Doz, a JS numeral base converter
 * © 1202 (2018) Gramkraxor
 */

// numbers are in the radix-independent String.prototype.length form

const Doz = function(v, b, x1, x2) { return Doz.convert(v, b, x1, x2); }
// const Alias = Doz;

Doz.NAME = "Doz";
Doz.VERSION = "123456789AB01234567".length;
Doz.AUTHORS = [ "Gramkraxor" ];
Doz.YEAR = 2018;

Doz.B = "01"              .length;
Doz.O = "01234567"        .length;
Doz.D = "0123456789"      .length;
Doz.Z = "0123456789AB"    .length;
Doz.X = "0123456789ABCDEF".length;

Doz.modes = [];

Doz.modes.push(Doz.AB  = "AB."); // default
Doz.modes.push(Doz.XE  = "XE;");
Doz.modes.push(Doz.XEL = "X\u0190;");
Doz.modes.push(Doz.XEU = Doz.DWIGGINS = "\u218C\u218D;"); // not part of Unicode yet
Doz.modes.push(Doz.ZE  = "ZE.");
Doz.modes.push(Doz.ZEU = Doz.PITMAN   = "\u218A\u218B.");
Doz.modes.push(Doz.TE  = "TE;");
Doz.modes.push(Doz.DE  = "\u03B4\u03B5;");

Doz.repl = function(s, o, n) {
	return s.split(o).join(n);
}

Doz.convert = function(v, b, x1, x2) {
	if (typeof v != "number" && typeof v != "string") return 0;

	if (typeof v == "string") {
		if (x1) {
			if (x2) {
				return Doz.toMode(Doz.getString(Doz.getNumber(v, b), x1), x2);
			}
			if (typeof x1 == "string") {
				return Doz.getNumber(Doz.toMode(v, x1, Doz.AB), b);
			}
			return Doz.getString(Doz.getNumber(v, b), x1);
		}
		return Doz.getNumber(v, b);
	}

	if (x1) {
		return Doz.toMode(Doz.getString(v, b), x1);
	}
	return Doz.getString(v, b);
}

Doz.num = function(v, b) {
	return Doz.getNumber(v, b);
}

Doz.str = function(v, b, b1) {
	if (b1) return Doz.getString(Doz.getNumber(v, b), b1);
	return Doz.getString(v, b);
}

Doz.getInt = function(s, b) {
	return Doz.getNumber(s, b, true);
}

Doz.getNumber = function(s, b, integer) {
	s = s.trim();
	while (s.startsWith("0") && s.length > 1) s = s.substring(1, s.length);
	if (s.length == 0) return 0;
	if (b == Doz.Z) s = Doz.toMode(s, Doz.AB);

	if (!s.includes(".") || integer) return parseInt(s, b);
	if (s.length - Doz.repl(s, ".", "").length > 1) return parseInt(s, b);

	// parseFloat() doesn't accept a radix
	var f = s.length - 1 - s.indexOf(".");
	s = Doz.repl(s, ".", "");
	return parseInt(s, b) / (b ** f);
}

Doz.getString = function(n, b) {
	if (n == 0 || n > Doz.X ** Doz.Z || isNaN(n)) return "0";
	var s = n.toString(b).toUpperCase();
	return s;
}

Doz.toMode = function(s, m, m1) {
	if (!m1) {
		return Doz.toCharset(s, Doz.AB, m);
	}
	return Doz.toCharset(s, m, m1);
}

Doz.fromMode = function(s, m) {
	return Doz.toCharset(s, m, Doz.AB);
}

Doz.toCharset = function(str, cs0, cs1) {
	if (typeof str != "string" || !cs0 || !cs1) return str;
	var s = str.split("");
	var p = [];
	for (let i = 0; i < 3; i++) {
		p.push([]);
		for (let j = 0; j < s.length; j++) {
			if (s[j] == cs0[i]) p[i].push(j);
		}
	}
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < p[i].length; j++) {
			s[p[i][j]] = cs1[i];
		}
	}
	return s.join("");
}

Doz.log = function() {
	console.log(Doz.NAME + " version " + z$(Doz.VERSION) + " by " + Doz.AUTHORS[0] + "\nCopyright \u00A9 " + z$(Doz.YEAR, Doz.XE) + " (decimal " + d$(Doz.YEAR) + ")");
}


function d$(v)    { return Doz.convert(v, Doz.D);    }
function z$(v, m) { return Doz.convert(v, Doz.Z, m); }
function x$(v)    { return Doz.convert(v, Doz.X);    }
