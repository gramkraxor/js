/* 
 * Eo, Javaskripta konvertilo de Esperantaj signoj
 * © 2018 Gramkraksoro
 */

// numbers are in the radix-independent String.prototype.length form

const Eo = {};
// const Alias = Eo;

// basic funtions //

Eo.repl = function(s, o, n) {
	return s.split(o).join(n);
}

// variables and constructors //

Eo.NAME = "Eo";
Eo.VERSION = 1;
Eo.AUTHORS = [ "Gramkraksoro" ];
Eo.YEAR = 2018;

Eo.x = "x";
Eo.signoj = [];

function Signo(l, u) {
	let signo = {};
	signo.l = l;
	signo.u = u;
	Eo.signoj.push(signo);
	return signo;
}

Eo.Cx = Signo("C", "\u0108");
Eo.cx = Signo("c", "\u0109");
Eo.Gx = Signo("G", "\u011C");
Eo.gx = Signo("g", "\u011D");
Eo.Hx = Signo("H", "\u0124");
Eo.hx = Signo("h", "\u0125");
Eo.Jx = Signo("J", "\u0134");
Eo.jx = Signo("j", "\u0135");
Eo.Sx = Signo("S", "\u015C");
Eo.sx = Signo("s", "\u015D");
Eo.Ux = Signo("U", "\u016C");
Eo.ux = Signo("u", "\u016D");

// Eo functions //

Eo.fromX = function(s) {
	for (let i = 0; i < Eo.signoj.length; i++) {
		let signo = Eo.signoj[i];
		s = Eo.repl(s, signo.l + Eo.x, signo.u);
		s = Eo.repl(s, signo.l + Eo.x.toUpperCase(), signo.u);
	}
	return s;
}

Eo.toX = function(s) {
	for (let i = 0; i < Eo.signoj.length; i++) {
		let signo = Eo.signoj[i];
		s = Eo.repl(s, signo.u, signo.l + Eo.x);
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
