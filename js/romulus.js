/* 
 * Romulus, a JS Roman numeral converter
 * © MMXVII (2017) Owen Graham
 */

const Rom = {};
const Romulus = Rom;

Rom.NAME = "Romulus";
Rom.VERSION = 2;
Rom.AUTHORS = [ "Owen Graham" ];
Rom.YEAR = new Date().getFullYear();

Rom.n = "N";
Rom.i = "I";
Rom.v = "V";
Rom.x = "X";
Rom.l = "L";
Rom.c = "C";
Rom.d = "D";
Rom.m = "M";

Rom.ONES      = [ "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX" ];
Rom.TENS      = [ "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC" ];
Rom.HUNDREDS  = [ "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM" ];
Rom.THOUSANDS = [ "", "M", "MM", "MMM"];

Rom.u = "*";
Rom.s = "S";

Rom.DOZENALS  = [ "", "*", "**", "***", "****", "*****", "S", "S*", "S**", "S***", "S****", "S*****" ];

Rom.places = [];

Rom.Place = function(c) {
	this.c = c;
	Rom.places.push(this);
}

Rom.mil  = new Rom.Place(Rom.THOUSANDS);
Rom.cent = new Rom.Place(Rom.HUNDREDS);
Rom.dec  = new Rom.Place(Rom.TENS);
Rom.un   = new Rom.Place(Rom.ONES);

Rom.numeral = function(n, nulla) { // nulla determines whether to allow N as output
	if (typeof n != "number" || isNaN(n)) return "";
	if (n < 0) n *= -1;
	if (n == 0 && nulla) return Rom.n;
	remainder = n - Math.floor(n);
	n = Math.floor(n);
	if (n >= 4000) return "";
	n = n.toString();
	while (n.length < 4) {
		n = "0" + n;
	}
	var a = n.split("");
	for (let i = 0; i < a.length; i++) {
		a[i] = Rom.places[i].c[parseInt(a[i])];
	}
	var rem = Math.round(remainder * 12 + 1 / 24);
	return a.join("") + Rom.DOZENALS[rem];
}

Rom.integer = function(s) { // Roman to Hindu-Arabic
	s = s.toUpperCase();
	var r = 0;
	var places = [ Rom.ONES, Rom.TENS, Rom.HUNDREDS, Rom.THOUSANDS ];
	for (let p = places.length - 1; p >= 0; p--) {
		let place = places[p];
		
		digit:
		for (let i = place.length - 1; i >= 0; i--) {
			if (s.startsWith(place[i])) {
				s = s.substring(place[i].length);
				r += i * (10 ** p);
				break digit;
			}
		}
	}
	if (s.length > 0) return 0;
	return r;
}

function $R(v) {
	if (typeof v == "string") {
		v = ParseInt(s);
	}
	return Rom.numeral(v);
}

//console.log(Rom.NAME + " version " + $R(Rom.VERSION) + " by " + Rom.AUTHORS[0] + "\nCopyright \u00A9 " + $R(Rom.YEAR) + " (Arabic " + Rom.YEAR + ")");
