/*
 * Romulus, a JS Roman numeral converter
 * © MMXVIII (2018) Gramkraxor
 */

const Rom = function(v) { return Rom.convert(v); }
const Romulus = Rom;

Rom.NAME = "Romulus";
Rom.AUTHORS = [ "Gramkraxor" ];
Rom.YEAR = 2018;

Rom.N = "N";
Rom.I = "I";
Rom.V = "V";
Rom.X = "X";
Rom.L = "L";
Rom.C = "C";
Rom.D = "D";
Rom.M = "M";

Rom.ONES      = [ "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX" ];
Rom.TENS      = [ "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC" ];
Rom.HUNDREDS  = [ "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM" ];
Rom.THOUSANDS = [ "", "M", "MM", "MMM"];

Rom.FOURS = [  "IIII",  "XXXX",  "CCCC",  "MMMM" ];
Rom.NINES = [ "VIIII", "LXXXX", "DCCCC" ]

Rom.U = "*";
Rom.S = "S";

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


Rom.convert = function(v) {
	if (typeof v == "string") return Rom.getNumber(v);
	return Rom.getString(v);
}

Rom.str = function(v) {
	return Rom.getString(v);
}

Rom.num = function(v) {
	return Rom.getNumber(v);
}

Rom.getString = function(n, subRule, nulla) { // nulla determines whether to allow "N" as output
	if (typeof n != "number" || isNaN(n)) return "";

	if (typeof subRule == "undefined") subRule = true;

	if (n < 0) n *= -1;
	if (n == 0) return (nulla ? Rom.N : "");
	remainder = n - Math.floor(n);
	n = Math.floor(n);
	if (n >= 4000) return "";
	n = n.toString();
	while (n.length < 4) {
		n = "0" + n;
	}
	let a = n.split("");
	for (let i = 0; i < a.length; i++) {
		a[i] = Rom.places[i].c[parseInt(a[i])];
	}
	let rem = Math.round(remainder * 12);
	if (rem >= Rom.UNCIAE.length) rem = Rom.UNCIAE.length - 1;
	let r = a.join("") + Rom.UNCIAE[rem];
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

Rom.getNumber = function(s) {
	s = s.trim().toUpperCase();
	let r = 0;

	for (let i = 0; i < Rom.NINES.length; i++) {
		s = s.split(Rom.NINES[i]).join(Rom.places[Rom.places.length - 1 - i].c[9]);
	}
	for (let i = 0; i < Rom.FOURS.length; i++) {
		s = s.split(Rom.FOURS[i]).join(Rom.places[Rom.places.length - 1 - i].c[4]);
	}

	//let places = [ Rom.ONES, Rom.TENS, Rom.HUNDREDS, Rom.THOUSANDS ];
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


Rom.log = function() {
	console.log(Rom.NAME + " by " + Rom.AUTHORS[0] + "\nCopyright \u00A9 " + Rom(Rom.YEAR) /*+ " (Hindu-Arabic " + Rom.YEAR + ")"*/);
}
