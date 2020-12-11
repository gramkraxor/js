/*
 * js/dozagon v2.0.0
 * (c) 2018 Gramkraxor
 */

const size = 96;
const polys = ["2", "3", "4", "6", "10"];
let write = "";
for (let i = 0; i < polys.length; i++) {
	p = polys[i];
	write += svg(size, parseInt(p, 0xC), "p" + p);
}
document.body.innerHTML += write;

function svg(size, poly, id) {
	let s = "<svg id=\"" + id + "\" width=\""+ size + "\" height=\""+ size + "\" viewBox=\"0 0 " + size + " " + size + "\"><polygon points=\"";
	const r = size * 3 / 8;
	const offset = size / 2;
	const tau = 2 * Math.PI;
	for (let i = 0; i < poly; i++) {
		s += (r * (Math.sin(tau * i / poly)) + offset) + "," + (r * (Math.cos(tau * i / poly)) + offset) + " ";
	}
	s += "\"/></svg>";
	return s;
}
