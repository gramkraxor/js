/*
 * Eo, JS-konvertilo de Esperantaj signoj
 * © 2018 Gramkraksoro
 */

const Eo = function(s) { return Eo.convert(s); }
// const Alias = Eo;

Eo.NAME = "Eo";
Eo.AUTHORS = [ "Gramkraksoro" ];
Eo.YEAR = 2018;

Eo.X = "x";

Eo.signoj = [];

Eo.Signo = function(l, u) {
	let signo = {};
	this.l = l;
	this.u = u;
	Eo.signoj.push(this);
}

Eo.CX = new Eo.Signo("c", "\u0109");
Eo.GX = new Eo.Signo("g", "\u011D");
Eo.HX = new Eo.Signo("h", "\u0125");
Eo.JX = new Eo.Signo("j", "\u0135");
Eo.SX = new Eo.Signo("s", "\u015D");
Eo.UX = new Eo.Signo("u", "\u016D");

// Eo functions //

Eo.repl = function(s, o, n) {
	return s.split(o).join(n);
}

Eo.fromX = function(s) {
	s = Eo.repl(s, Eo.X.toUpperCase(), Eo.X);
	for (let i = 0; i < Eo.signoj.length; i++) {
		let signo = Eo.signoj[i];
		s = Eo.repl(s, signo.l + Eo.X, signo.u);
		s = Eo.repl(s, signo.l.toUpperCase() + Eo.X, signo.u.toUpperCase());
	}
	return s;
}

Eo.toX = function(s) {
	for (let i = 0; i < Eo.signoj.length; i++) {
		let signo = Eo.signoj[i];
		s = Eo.repl(s, signo.u, signo.l + Eo.X);
		s = Eo.repl(s, signo.u.toUpperCase(), signo.l.toUpperCase() + Eo.X);
	}
	return s;
}

Eo.convert = function(s) {
	for (let i = 0; i < Eo.signoj.length; i++) {
		if (s.toLowerCase().includes(Eo.signoj[i].l + Eo.X)) {
			return Eo.fromX(s);
		}
	}

	return Eo.toX(s);
}


Eo.log = function() {
	console.log(Eo.NAME + " de " + Eo.AUTHORS[0] + "\nKopirajto \u00A9 " + Eo.YEAR);
}
