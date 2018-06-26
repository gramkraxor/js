/*
 * Romulus, a JS Roman numeral converter
 * (c) MMXVIII (2018) Gramkraxor
 */

const rom = function(v) { return rom.convert(v); }
const romulus = rom;

rom.NAME = "Romulus";
rom.AUTHORS = [ "Gramkraxor" ];
rom.YEAR = 2018;

rom.N = "N";
rom.I = "I";
rom.V = "V";
rom.X = "X";
rom.L = "L";
rom.C = "C";
rom.D = "D";
rom.M = "M";

rom.ONES      = [ "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX" ];
rom.TENS      = [ "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC" ];
rom.HUNDREDS  = [ "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM" ];
rom.THOUSANDS = [ "", "M", "MM", "MMM"];

rom.FOURS = [  "IIII",  "XXXX",  "CCCC",  "MMMM" ];
rom.NINES = [ "VIIII", "LXXXX", "DCCCC" ]

rom.U = "*";
rom.S = "S";

rom.UNCIAE  = [
	"",  "*",  "**",  "***",  "****",  "*****",
	"S", "S*", "S**", "S***", "S****", "S*****"
];

rom.places = [];

rom.Place = function(c) {
	this.c = c;
	rom.places.push(this);
}

rom.mil  = new rom.Place(rom.THOUSANDS);
rom.cent = new rom.Place(rom.HUNDREDS);
rom.dec  = new rom.Place(rom.TENS);
rom.un   = new rom.Place(rom.ONES);


rom.convert = function(v) {
	if (typeof v == "string") return rom.getNumber(v);
	return rom.getString(v);
}

rom.str = function(v) {
	return rom.getString(v);
}

rom.num = function(v) {
	return rom.getNumber(v);
}

rom.getString = function(n, subRule, nulla) { // nulla determines whether to allow "N" as output
	if (typeof n != "number" || isNaN(n)) return "";

	if (typeof subRule == "undefined") subRule = true;

	if (n < 0) n *= -1;
	if (n == 0) return (nulla ? rom.N : "");
	remainder = n - Math.floor(n);
	n = Math.floor(n);
	if (n >= 4000) return "";
	n = n.toString();
	while (n.length < 4) {
		n = "0" + n;
	}
	let a = n.split("");
	for (let i = 0; i < a.length; i++) {
		a[i] = rom.places[i].c[parseInt(a[i])];
	}
	let rem = Math.round(remainder * 12);
	if (rem >= rom.UNCIAE.length) rem = rom.UNCIAE.length - 1;
	let r = a.join("") + rom.UNCIAE[rem];
	if (!subRule) {
		for (let i = 0; i < rom.NINES.length; i++) {
			r = r.split(rom.places[rom.places.length - 1 - i].c[9]).join(rom.NINES[i]);
		}
		for (let i = 0; i < rom.FOURS.length; i++) {
			r = r.split(rom.places[rom.places.length - 1 - i].c[4]).join(rom.FOURS[i]);
		}
	}
	return r;
}

rom.getNumber = function(s) {
	s = s.trim().toUpperCase();
	let r = 0;

	for (let i = 0; i < rom.NINES.length; i++) {
		s = s.split(rom.NINES[i]).join(rom.places[rom.places.length - 1 - i].c[9]);
	}
	for (let i = 0; i < rom.FOURS.length; i++) {
		s = s.split(rom.FOURS[i]).join(rom.places[rom.places.length - 1 - i].c[4]);
	}

	//let places = [ rom.ONES, rom.TENS, rom.HUNDREDS, rom.THOUSANDS ];
	for (let p = 0; p < rom.places.length; p++) {
		let place = rom.places[p].c;

		digit:
		for (let i = place.length - 1; i >= 0; i--) {
			if (s.startsWith(place[i])) {
				s = s.substring(place[i].length);
				r += i * (10 ** (rom.places.length - 1 - p));
				break digit;
			}
		}
	}

	for (let i = rom.UNCIAE.length - 1; i >= 0; i--) {
		if (s.includes(rom.UNCIAE[i])) {
			s = s.substring(rom.UNCIAE[i].length);
			r += i / 12;
			break;
		}
	}

	if (s.length > 0) return 0;
	return r;
}


rom.log = function() {
	console.log(
		rom.NAME + " by " + rom.AUTHORS[0] + "\nCopyright (c) " +
		rom(rom.YEAR) /*+ " (Hindu-Arabic " + rom.YEAR + ")"*/
	);
}
