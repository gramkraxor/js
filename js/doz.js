/* 
 * Doz, a JS numeral base converter
 * © 1201 (2017) Owen Graham
 */

// numbers are in the radix-independent String.prototype.length form

const Doz = {};
// const Alias = Doz;

// basic funtions //

Doz.repl = function(s, o, n) {
	if (typeof n == "undefined" || o == n) return s;
	while (s.includes(o)) s = s.replace(o, n);
	return s;
}

Doz.und = function(v) {
	return typeof v == "undefined";
}

// variables and constructors //

Doz.NAME = "Doz";
Doz.VERSION = "123456789AB01234".length;
Doz.AUTHORS = [ "Owen Graham" ];
Doz.YEAR = new Date().getFullYear();

Doz.b = "01"              .length;
Doz.o = "01234567"        .length;
Doz.d = "0123456789"      .length;
Doz.z = "0123456789AB"    .length;
Doz.x = "0123456789ABCDEF".length;

// "enum" for constructor types
Doz.MODE = "mode";

Doz.modes = [];

Doz.Mode = function(c, p, a, n) {
	this.type = Doz.MODE;
	this.c = c;
	this.p = Doz.und(p)? "."    : p;
	this.a = Doz.und(a)? "mode" : a;
	this.n = Doz.und(n)? "Mode" : n;
	if (!Doz.und(a)) Doz.modes.push(this);
}

Doz.ab       = new Doz.Mode([ "A",      "B"      ], ".", "ab",       "Hex Style"); // used for computing
Doz.pitman   = new Doz.Mode([ "\u218A", "\u218B" ], ";", "pitman",   "Pitman Unicode");
Doz.zeu      = new Doz.Mode([ "\u218A", "\u218B" ], ";", "zeu",      "Pitman Unicode");
Doz.ze       = new Doz.Mode([ "Z",      "E"      ], ";", "ze",       "Pitman ASCII");
Doz.dwiggins = new Doz.Mode([ "\u218C", "\u218D" ], ";", "dwiggins", "Dwiggins Unicode"); // not part of Unicode yet
Doz.xeu      = new Doz.Mode([ "\u218C", "\u218D" ], ";", "xeu",      "Dwiggins Unicode");
Doz.xel      = new Doz.Mode([ "X",      "\u0190" ], ";", "xel",      "Dwiggins Latin");
Doz.xe       = new Doz.Mode([ "X",      "E"      ], ";", "xe",       "Dwiggins ASCII");
	
Doz.mode = Doz.ab;

// Doz functions //

Doz.getMode = function(v) {
	if (v.type == Doz.MODE) return v;
	var val = v;
	if (typeof v == "string") v = v.toLowerCase();
	for (let i = 0; i < Doz.modes.length; i++) {
		let m = Doz.modes[i];
		if (v == m || v == m.a.toLowerCase() || v == m.n.toLowerCase() || v == m.c.join("").toLowerCase() || v == (m.c.join("") + m.p).toLowerCase()) return m;
	}
	if (typeof val == "string") {
		let l = "AB".length;
		if (val.length > l) return new Doz.Mode(val.substring(0, l).split(""), val.charAt(l));
		return new Doz.Mode(val.split(""));
	}
	return Doz.ab;
}

Doz.setMode = function(m) {
	Doz.mode = Doz.getMode(m);
	return Doz;
}

Doz.convert = function(v, b, nb, m) { // nb can be used as m
	if (!Doz.und(nb) && Doz.und(m)) m = Doz.getMode(nb);
	if (typeof v != "number" && typeof v != "string") return 0;
	
	if (typeof v == "string") {
		if (!Doz.und(nb)) return Doz.stringBase(Doz.floatBase(v, b), nb);
		return Doz.floatBase(v, b);
	}
	return Doz.stringBase(v, b);
}

Doz.intBase = function(s, b) {
	return Doz.floatBase(s, b, true);
}

Doz.floatBase = function(s, b, integer) {
	while (s.startsWith("0") && s.length > 1) s = s.substring(1, s.length);
	if (s.length == 0) return 0;
	if (b == Doz.z) s = Doz.stringMode(s, Doz.ab);
	
	if (!s.includes(Doz.ab.p) || integer) return parseInt(s, b);
	if (s.length - Doz.repl(s, Doz.ab.p, "").length > 1) return parseInt(s, b);
	
	var f = s.length - 1 - s.indexOf(Doz.ab.p);
	s = Doz.repl(s, Doz.ab.p, "");
	return parseInt(s, b) / (b ** f);
}

Doz.stringBase = function(n, b, m) {
	//if (n < 0) n *= -1;
	if (n == 0 || n > Doz.x ** Doz.z || isNaN(n)) return "0";
	var s = n.toString(b).toUpperCase();
	if (b == Doz.z) {
		let mode = Doz.und(m)? Doz.mode : Doz.getMode(m);
		s = Doz.stringMode(s, mode);
	}
	return s;
}

Doz.stringMode = function(s, m, a) { 
	if (typeof s != "string" || Doz.und(m)) return s;
	if (typeof a != "object") a = Doz.modes;
	s = s.toUpperCase();
	m = Doz.getMode(m);
	for (let i = 0; i < a.length; i++) {
		for (let j = 0; j < a[i].c.length; j++) {
			let c = a[i].c[j].toUpperCase();
			s = Doz.repl(s, c, m.c[j]);
		}
		s = Doz.repl(s, a[i].p, m.p);
	}
	return s;
}

// shortcut functions //

function $Doz(v, b, m) {
	return Doz.convert(v, b, m);
}

function $d(v) {
	return Doz.convert(v, Doz.d);
}

function $z(v, m) {
	if (typeof v == "string" && !Doz.und(m)) return Doz.stringMode(v, m);
	if (typeof v == "number" && Doz.und(m)) m = Doz.xe;
	return Doz.convert(v, Doz.z, m);
}

function $x(v) {
	return Doz.convert(v, Doz.x);
}

//console.log(Doz.NAME + " version " + $z(Doz.VERSION) + " by " + Doz.AUTHORS[0] + "\nCopyright \u00A9 " + $z(Doz.YEAR, Doz.xe) + " (decimal " + Doz.YEAR + ")");
