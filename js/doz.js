/*
 * Doz, a JS numeral base converter
 * © 1202 (2018) Gramkraxor
 */

// numbers are in the radix-independent String.prototype.length form

const Doz = function(v, b, x1, x2) { return Doz.convert(v, b, x1, x2); }
// const Alias = Doz;

Doz.NAME = "Doz";
Doz.AUTHORS = [ "Gramkraxor" ];
Doz.YEAR = 2018;

Doz.B = 0x02
Doz.T = 0x03
Doz.Q = 0x04
Doz.P = 0x05
Doz.H = 0x06
Doz.S = 0x07
Doz.O = 0x08
Doz.E = 0x09
Doz.D = 0x0A
Doz.L = 0x0B
Doz.Z = 0x0C
Doz.X = 0x10;
Doz.V = 0x14;

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
	let f = s.length - 1 - s.indexOf(".");
	s = Doz.repl(s, ".", "");
	return parseInt(s, b) / (b ** f);
}

Doz.getString = function(n, b) {
	if (n == 0 || n > Doz.X ** Doz.Z || isNaN(n)) return "0";
	let s = n.toString(b).toUpperCase();
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
	let s = str.split("");
	let p = [];
	for (let i = 0; i < cs0.length; i++) {
		p.push([]);
		for (let j = 0; j < s.length; j++) {
			if (s[j] == cs0[i]) p[i].push(j);
		}
	}
	for (let i = 0; i < cs0.length; i++) {
		for (let j = 0; j < p[i].length; j++) {
			s[p[i][j]] = cs1[i];
		}
	}
	return s.join("");
}


Doz.log = function() {
	console.log(Doz.NAME + " by " + Doz.AUTHORS[0] + "\nCopyright \u00A9 " + Doz(Doz.YEAR, Doz.Z, Doz.XE) + " (decimal " + Doz(Doz.YEAR, Doz.D) + ")");
}
