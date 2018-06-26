/*
 * Doz, a JS numeral base converter
 * (c) 1202 (2018) Gramkraxor
 */

const doz = function(v, b, x1, x2) { return doz.convert(v, b, x1, x2); }
// const Alias = doz;

doz.NAME = "Doz";
doz.AUTHORS = [ "Gramkraxor" ];
doz.YEAR = 2018;

doz.B = 0x02;
doz.T = 0x03;
doz.Q = 0x04;
doz.P = 0x05;
doz.H = 0x06;
doz.S = 0x07;
doz.O = 0x08;
doz.E = 0x09;
doz.D = 0x0A;
doz.L = 0x0B;
doz.Z = 0x0C;
doz.X = 0x10;
doz.V = 0x14;

doz.modes = [];

doz.modes.push(doz.AB  = "AB."); // default
doz.modes.push(doz.XE  = "XE;");
doz.modes.push(doz.XEL = "X\u0190;");
doz.modes.push(doz.XEU = doz.DWIGGINS = "\u218C\u218D;"); // not part of Unicode yet
doz.modes.push(doz.ZE  = "ZE.");
doz.modes.push(doz.ZEU = doz.PITMAN   = "\u218A\u218B.");
doz.modes.push(doz.TE  = "TE;");
doz.modes.push(doz.DE  = "\u03B4\u03B5;");

doz.repl = function(s, o, n) {
	return s.split(o).join(n);
}

doz.convert = function(v, b, x1, x2) {
	if (typeof v != "number" && typeof v != "string") return 0;

	if (typeof v == "string") {
		if (x1) {
			if (x2) {
				return doz.toMode(doz.getString(doz.getNumber(v, b), x1), x2);
			}
			if (typeof x1 == "string") {
				return doz.getNumber(doz.toMode(v, x1, doz.AB), b);
			}
			return doz.getString(doz.getNumber(v, b), x1);
		}
		return doz.getNumber(v, b);
	}

	if (x1) {
		return doz.toMode(doz.getString(v, b), x1);
	}
	return doz.getString(v, b);
}

doz.num = function(v, b) {
	return doz.getNumber(v, b);
}

doz.str = function(v, b, b1) {
	if (b1) return doz.getString(doz.getNumber(v, b), b1);
	return doz.getString(v, b);
}

doz.getInt = function(s, b) {
	return doz.getNumber(s, b, true);
}

doz.getNumber = function(s, b, integer) {
	s = s.trim();
	while (s.startsWith("0") && s.length > 1) s = s.substring(1, s.length);
	if (s.length == 0) return 0;
	if (b == doz.Z) s = doz.toMode(s, doz.AB);

	if (!s.includes(".") || integer) return parseInt(s, b);
	if (s.length - doz.repl(s, ".", "").length > 1) return parseInt(s, b);

	// parseFloat() doesn't accept a radix
	let f = s.length - 1 - s.indexOf(".");
	s = doz.repl(s, ".", "");
	return parseInt(s, b) / (b ** f);
}

doz.getString = function(n, b) {
	if (n == 0 || n > doz.X ** doz.Z || isNaN(n)) return "0";
	let s = n.toString(b).toUpperCase();
	return s;
}

doz.toMode = function(s, m, m1) {
	if (!m1) {
		return doz.toCharset(s, doz.AB, m);
	}
	return doz.toCharset(s, m, m1);
}

doz.fromMode = function(s, m) {
	return doz.toCharset(s, m, doz.AB);
}

doz.toCharset = function(str, cs0, cs1) {
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


doz.log = function() {
	console.log(
		doz.NAME + " by " + doz.AUTHORS[0] + "\nCopyright (c) " +
		doz(doz.YEAR, doz.Z, doz.XE) + " (decimal " + doz(doz.YEAR, doz.D) + ")"
	);
}
