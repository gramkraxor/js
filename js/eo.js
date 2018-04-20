/*
 * Eo, JS-konvertilo de Esperantaj signoj
 * © 2018 Gramkraksoro
 */

const Eo = {};
// const Alias = Eo;

// basic funtions //

Eo.repl = function(s, o, n) {
	return s.split(o).join(n);
}

// variables and constructors //

Eo.NAME = "Eo";
Eo.VERSION = 2;
Eo.AUTHORS = [ "Gramkraksoro" ];
Eo.YEAR = 2018;

Eo.x = "x";
Eo.signoj = [];

function Signo(l, u) {
	let signo = {};
	this.l = l;
	this.u = u;
	Eo.signoj.push(this);
}

Eo.cx = new Signo("c", "\u0109");
Eo.gx = new Signo("g", "\u011D");
Eo.hx = new Signo("h", "\u0125");
Eo.jx = new Signo("j", "\u0135");
Eo.sx = new Signo("s", "\u015D");
Eo.ux = new Signo("u", "\u016D");

// Eo functions //

Eo.fromX = function(s) {
	s = Eo.repl(s, Eo.x.toUpperCase(), Eo.x);
	for (let i = 0; i < Eo.signoj.length; i++) {
		let signo = Eo.signoj[i];
		s = Eo.repl(s, signo.l + Eo.x, signo.u);
		s = Eo.repl(s, signo.l.toUpperCase() + Eo.x, signo.u.toUpperCase());
	}
	return s;
}

Eo.toX = function(s) {
	for (let i = 0; i < Eo.signoj.length; i++) {
		let signo = Eo.signoj[i];
		s = Eo.repl(s, signo.u, signo.l + Eo.x);
		s = Eo.repl(s, signo.u.toUpperCase(), signo.l.toUpperCase() + Eo.x);
	}
	return s;
}

Eo.convert = function(s) {
	if (s.toLowerCase().includes(Eo.x)) {
		return Eo.fromX(s);
	} else {
		return Eo.toX(s);
	}
}

// shortcut functions //

function Eo$(s) {
	return Eo.convert(s);
}


Eo.log = function() {
	console.log(Eo.NAME + " versio " + Eo.VERSION + " de " + Eo.AUTHORS[0] + "\nKopirajto \u00A9 " + Eo.YEAR);
}
