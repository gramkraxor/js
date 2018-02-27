/*
 * Dozagon
 * © 2018 Gramkraxor
 */

window.onload = f;

function f() {
	var size = 96;//768;
	z = function(n) {
		return parseInt(n, 0xC);
	}
	var polys = [z("2"), z("3"), z("4"), z("6"), z("10")];
	var write = "";
	for (var i = 0; i < polys.length; i++) {
		p = polys[i];
		write += svg(size, p, "p" + p.toString(12));
	}
	document.body.innerHTML += write;
}

function svg(size, poly, id) {
	var s = "<svg id='" + id + "'width='"+ size + "' height='"+ size + "' viewBox='0 0 " + size + " " + size + "'><polygon points='";
	var r = size * 3 / 8;
	var offset = size / 2;
	const tau = 2 * Math.PI;
	for (var i = 0; i < poly; i++) {
		s += (r * (Math.sin(tau * i / poly)) + offset) + "," + (r * (Math.cos(tau * i / poly)) + offset) + " ";
	}
	s += "'/></svg>";
	return s;
}
