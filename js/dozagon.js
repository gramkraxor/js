/*
 * Dozagon
 * (c) 2018 Gramkraxor
 */

window.onload = function() {
	let size = 96;
	z = function(n) {
		return parseInt(n, 0xC);
	}
	let polys = [z("2"), z("3"), z("4"), z("6"), z("10")];
	let write = "";
	for (let i = 0; i < polys.length; i++) {
		p = polys[i];
		write += svg(size, p, "p" + p.toString(12));
	}
	document.body.innerHTML += write;
}

function svg(size, poly, id) {
	let s = "<svg id='" + id + "'width='"+ size + "' height='"+ size + "' viewBox='0 0 " + size + " " + size + "'><polygon points='";
	let r = size * 3 / 8;
	let offset = size / 2;
	const tau = 2 * Math.PI;
	for (let i = 0; i < poly; i++) {
		s += (r * (Math.sin(tau * i / poly)) + offset) + "," + (r * (Math.cos(tau * i / poly)) + offset) + " ";
	}
	s += "'/></svg>";
	return s;
}
