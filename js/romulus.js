/*
 * Romulus, a JS Roman numeral converter
 * © MMXVIII (2018) Gramkraxor
 */

const Rom = {};
const Romulus = Rom;

Rom.NAME = "Romulus";
Rom.VERSION = 3;
Rom.AUTHORS = [ "Gramkraxor" ];
Rom.YEAR = 2018;

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

Rom.FOURS = [  "IIII",  "XXXX",  "CCCC",  "MMMM" ];
Rom.NINES = [ "VIIII", "LXXXX", "DCCCC" ]

Rom.u = "*";
Rom.s = "S";

Rom.UNCIAE  = [ "", "*", "**", "***", "****", "*****", "S", "S*", "S**", "S***", "S****", "S*****" ];

Rom.places = [];

Rom.Place = function(c) {
	this.c = c;
	Rom.places.push(this);
}

Rom.mil  = new Rom.Place(Rom.THOUSANDS);
Rom.cent = new Rom.Place(Rom.HUNDREDS);
Rom.dec  = new Rom.Place(Rom.TENS);
Rom.un   = new Rom.Place(Rom.ONES);

// float to Roman string
Rom.numeral = function(n, subRule, nulla) { // nulla determines whether to allow "N" as output
	if (typeof n != "number" || isNaN(n)) return "";

	if (typeof subRule == typeof undefined) subRule = true;

	if (n < 0) n *= -1;
	if (n == 0) return (nulla ? Rom.n : "");
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
	var rem = Math.round(remainder * 12);
	if (rem >= Rom.UNCIAE.length) rem = Rom.UNCIAE.length - 1;
	var r = a.join("") + Rom.UNCIAE[rem];
	if (!subRule) {
		for (let i = 0; i < Rom.NINES.length; i++) {
			r = r.split(Rom.places[Rom.places.length - 1 - i].c[9]).join(Rom.NINES[i]);
		}
		for (let i = 0; i < Rom.FOURS.length; i++) {
			r = r.split(Rom.places[Rom.places.length - 1 - i].c[4]).join(Rom.FOURS[i]);
		}
	}
	return r;
}

// Roman string to float
Rom.integer = function(s) {
	s = s.trim().toUpperCase();
	var r = 0;

	for (let i = 0; i < Rom.NINES.length; i++) {
		s = s.split(Rom.NINES[i]).join(Rom.places[Rom.places.length - 1 - i].c[9]);
	}
	for (let i = 0; i < Rom.FOURS.length; i++) {
		s = s.split(Rom.FOURS[i]).join(Rom.places[Rom.places.length - 1 - i].c[4]);
	}

	//var places = [ Rom.ONES, Rom.TENS, Rom.HUNDREDS, Rom.THOUSANDS ];
	for (let p = 0; p < Rom.places.length; p++) {
		let place = Rom.places[p].c;

		digit:
		for (let i = place.length - 1; i >= 0; i--) {
			if (s.startsWith(place[i])) {
				s = s.substring(place[i].length);
				r += i * (10 ** (Rom.places.length - 1 - p));
				break digit;
			}
		}
	}

	for (let i = Rom.UNCIAE.length - 1; i >= 0; i--) {
		if (s.includes(Rom.UNCIAE[i])) {
			s = s.substring(Rom.UNCIAE[i].length);
			r += i / 12;
			break;
		}
	}

	if (s.length > 0) return 0;
	return r;
}

function R$(v) {
	if (typeof v == "string") v = parseInt(v);
	return Rom.numeral(v);
}


Rom.log = function() {
	console.log(Rom.NAME + " version " + R$(Rom.VERSION) + " by " + Rom.AUTHORS[0] + "\nCopyright \u00A9 " + R$(Rom.YEAR) + " (Hindu-Arabic " + Rom.YEAR + ")");
}
