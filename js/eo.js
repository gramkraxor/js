/*
 * Eo, JS-konvertilo de Esperantaj signoj
 * (c) 2018 Gramkraksoro
 */

const eo = function(s) { return eo.convert(s); };
// const Alias = eo;

eo.NAME = "Eo";
eo.AUTHORS = [ "Gramkraksoro" ];
eo.YEAR = 2018;

eo.X = "x";

eo.signoj = [];

eo.Signo = function(l, u) {
	let signo = {};
	this.l = l;
	this.u = u;
	eo.signoj.push(this);
};

eo.CX = new eo.Signo("c", "\u0109");
eo.GX = new eo.Signo("g", "\u011D");
eo.HX = new eo.Signo("h", "\u0125");
eo.JX = new eo.Signo("j", "\u0135");
eo.SX = new eo.Signo("s", "\u015D");
eo.UX = new eo.Signo("u", "\u016D");

// Eo functions //

eo.repl = function(s, o, n) {
	return s.split(o).join(n);
};

eo.fromX = function(s) {
	s = eo.repl(s, eo.X.toUpperCase(), eo.X);
	for (let i = 0; i < eo.signoj.length; i++) {
		let signo = eo.signoj[i];
		s = eo.repl(s, signo.l + eo.X, signo.u);
		s = eo.repl(s, signo.l.toUpperCase() + eo.X, signo.u.toUpperCase());
	}
	return s;
};

eo.toX = function(s) {
	for (let i = 0; i < eo.signoj.length; i++) {
		let signo = eo.signoj[i];
		s = eo.repl(s, signo.u, signo.l + eo.X);
		s = eo.repl(s, signo.u.toUpperCase(), signo.l.toUpperCase() + eo.X);
	}
	return s;
};

eo.convert = function(s) {
	for (let i = 0; i < eo.signoj.length; i++) {
		if (s.toLowerCase().includes(eo.signoj[i].l + eo.X)) {
			return eo.fromX(s);
		}
	}

	return eo.toX(s);
};


eo.log = function() {
	console.log(eo.NAME + " de " + eo.AUTHORS[0] + "\nKopirajto (c) " + eo.YEAR);
};
