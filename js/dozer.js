/*
 * Dozer, the HTML interface for doz.js and romulus.js
 * (c) 2018 Gramkraxor
 */

doz.log();
rom.log();

let
NAME = "Dozer",
AUTHORS = [ "Gramkraxor" ],
YEAR = 2018,
charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
bases = [],
labelBase = 12,
usedModes = [ "AB", "XE", "ZEU" ];

let qCustomRadix  = new Query("c", 0, enterCustomRadix);

let qCurrentMode  = new Query("m",  doz.AB, setMode, function() {
	return getModeIndex(this.val).toLowerCase();
});

let qCurrentEntry = new Query("n",  0, function(v) {
	enter($("#dec").val(parseFloat(v)));
});

function Base(c, a) {
	if (typeof c == "number") {
		this.r = c;
		this.c = charset.substring(0, this.r);
	} else {
		this.r = c.length;
		this.c = c;
	}
	this.a = []; // array of 3- and 1-letter abbreviations, name, and aliases
	if (Array.isArray(a)) {
		for (let i = 0; i < a.length; i++) {
			this.a.push(a[i].toLowerCase());
		}
	} else if (typeof a == "string") {
		this.a.push(a);
	}
	bases.push(this);
}

let bBin = new Base(2,  [ "bin", "b", "binary" ]);
let bOct = new Base(8,  [ "oct", "o", "octal" ]);
let bDec = new Base(10, [ "dec", "d", "decimal" ]);
let bDoz = new Base(12, [ "doz", "z", "dozenal", "duodecimal" ]);
let bHex = new Base(16, [ "hex", "x", "hexadecimal" ]);
//let bVig = new Base(20, [ "vig", "v", "vigesimal" ]);

let english = [
	"zero",        "one",         "two",        "three",        "four",         "five",
	"six",         "seven",       "eight",      "nine",         "ten",          "eleven",
	"twelve",      "thirteen",    "fourteen",   "fifteen",      "sixteen",      "seventeen",
	"eighteen",    "nineteen",    "twenty",     "twenty-one",   "twenty-two",   "twenty-three",
	"twenty-four", "twenty-five", "twenty-six", "twenty-seven", "twenty-eight", "twenty-nine",
	"thirty",      "thirty-one",  "thirty-two", "thirty-three", "thirty-four",  "thirty-five",
	"thirty-six"
]

$(function() {

	$("body").append($("<div>")
		.attr("id", "wrapper")
		.prop("spellcheck", false)
		.append($("<div>")
			.attr("id", "title")
			.text(NAME)
		)
		.append($("<div>")
			.attr("id", "dozer")
			.append($("<div>")
				.attr("id", "convert")
			)
			.append($("<div>")
				.attr("id", "mode")
				.append($("<p>")
					.attr("id", "mode-title")
					.html("Transdecimals")
				)
			)
		)
		.append($("<div>")
			.attr("id", "romulator")
			.append($("<input>")
				.attr("type", "text")
				.attr("id", "roman")
				.click(function() {
					if ($(this).val() == rom.N) $(this).val("");
					setLabels($(this).attr("id"));
				})
				.keypress(function(e) {
					if (e.which == 13) enter($(this));
				})
			)
		)
		.append("<br>")
		.append($("<div>")
			.attr("id", "footer")
		)
	);

	for (let i = 0; i < bases.length; i++) {
		let b = bases[i];
		$("#convert").append(
			$("<p>")
				.append($("<span>")
					.text(b.a[0])
				)
				.append($("<input>")
					.attr("type", "text")
					.addClass("dozee")
					.attr("id", b.a[0])
					.click(function() {
						setLabels($(this).attr("id"));
					})
					.keypress(function(e) {
						if (e.which == 13) enter($(this));
					})
				)
		);
	}

	$("#convert").append($("<p>")
		.append($("<input>")
			.attr("type", "text")
			.attr("id", "custom-base")
			.attr("placeholder", "custom")
			.focus(function() {
				let $this = $(this)
					.one("mouseup.mouseupSelect", function() {
							$this.select();
							return false;
						})
					.one("mousedown", function() {
						// compensate for untriggered "mouseup" caused by focus via tab
						$this.off("mouseup.mouseupSelect");
					})
				.select();
			})
			.focusout(function() {
				enterCustomRadix();
			})
			.keypress(function(e) {
				if (e.which == 13) enterCustomRadix();
			})
		)
		.append($("<input>")
			.attr("type", "text")
			.addClass("dozee")
			.attr("id", "custom")
			.click(function() {
				setLabels($(this).attr("id"));
			})
			.keypress(function(e) {
				if (e.which == 13) enter($(this));
			})
		)

	);

	for (let i = 0; i < usedModes.length; i++) {
		let mIndex = usedModes[i];
		let m = doz[mIndex];
		$("#mode").append(
			$("<p>")
				.append($("<input>")
					.attr("id", mIndex.toLowerCase())
					.attr("type", "radio")
					.attr("name", "mode")
					.click(function() {
						setMode(doz[this.id.toUpperCase()]);
					})
					.prop("checked", m == qCurrentMode.val)
				)
				.append($("<label>")
					.attr("for", mIndex.toLowerCase())
					.append($("<span>")
						.html(m[0] + " " + m[1])
					)
				)
		);
	}

	Query.load();

	setLabels();

});

function repl(s, o, n) {
	return s.split(o).join(n);
}

function getModeIndex(x) {
	if (usedModes.includes(x.toUpperCase())) return x.toUpperCase();
	for (let i = 0; i < usedModes.length; i++) {
		if (x == doz[usedModes[i]]) return usedModes[i];
	}
	return getModeIndex(qCurrentMode.defaultVal);
}

function setMode(m) {
	m = getModeIndex(m);
	$("#" + m.toLowerCase()).prop("checked", true)
	qCurrentMode.val = doz[m];
	setLabels();
	Query.updateQueryString();
}

function dozMode(s, m) {
	for (let i = 0; i < usedModes.length; i++) {
		for (let j = 0; j < 3; j++) {
			let c = doz[usedModes[i]][j];
			s = repl(s, c, m[j]);
		}
	}
	return s;
}

function getBase(v) {
	if (v == "roman") return bDec;
	if (v instanceof Base) return v;
	if (typeof v == "string") v = v.toLowerCase();
	if (typeof v == "number") v = Math.floor(v);
	for (let i = 0; i < bases.length; i++) {
		let b = bases[i];
		if (v == b || v == b.r || b.a.includes(v)) return b;
	}
	if (typeof v == "number" && v <= charset.length && v > 1) return new Base(v);
	return bDec;
}

function enter($input) {

	let id = $input.attr("id");
	let v = $input.val().toUpperCase();

	if (cheat(v)) {
		$input.val("");
		return;
	}

	setLabels(id);

	let radix;
	if (id == "custom") {
		if (!qCustomRadix.val) {
			radix = doz.D;
			v = "0";
		}
		radix = qCustomRadix.val;
	} else if (id != "roman") {
		radix = getBase(id).r;
	}

	if (id == "roman") {
		v = rom(repl(v, "\u2022", "*"));
	} else {
		if (radix == 12) v = dozMode(v, doz.AB);
		while (v.startsWith("0") && v.length > 1) v = v.substring(1, v.length);
		if (v.length == 0) v == "0";
		v = doz.getNumber(v, radix);
	}

	if (isNaN(v)) v = 0;

	for (let i = 0; i < bases.length; i++) {
		let b = bases[i];
		let val = doz.getString(v, b.r);
		if (b.r == 12) val = dozMode(val, qCurrentMode.val);
		if (val == "0") val = "";
		$("#" + b.a[0]).val(val);
	}
	// replace dozenths (*) with bullet character
	$("#roman").val(repl(rom.getString(v, true, true), "*", "\u2022"));
	if (qCustomRadix.val && v != 0) {
		$("#custom").val(doz(v, qCustomRadix.val));
	} else {
		$("#custom").val("");
	}

	qCurrentEntry.val = v;
	Query.updateQueryString();
}

function enterCustomRadix(radix) {

	let $input = $("#custom-base");
 	if (!radix) radix = $input.val();

	if (cheat(radix)) {
		$input.val(qCustomRadix.val ? english[qCustomRadix.val] : "");
		return;
	}

	for (let i = 0; i < english.length; i++) {
		if (repl(radix, " ", "-") == english[i]) {
			radix = i;
			break;
		}
	}
	radix = Math.floor(radix);
	if (!radix || isNaN(radix)) {
		// do something clever without resorting to a default
		$input.val("");
		qCustomRadix.val = 0;
		Query.updateQueryString();
		return;
	}
	if (radix < 2)  radix = 2;
	if (radix > 36) radix = 36;

	$input.val(english[radix]);
	qCustomRadix.val = radix;

	if (qCustomRadix.val && qCurrentEntry.val) $("#custom").val(doz(qCurrentEntry.val, qCustomRadix.val));

	Query.updateQueryString();
}

function setLabels(b) {
	let r = (b == "roman");
	let c = (b == "custom");
	let z = (b == "doz");

	if (b && !r && !c) {
		labelBase = getBase(b).r;
	} else if (c) {
		if (!qCustomRadix.val) return;
		labelBase = qCustomRadix.val;
	}

	//let v = r ? rom(VERSION)  : doz(VERSION,  labelBase, z ? qCurrentMode.val : undefined);
	let y = r ? rom(YEAR) : doz(YEAR, labelBase, z ? qCurrentMode.val : undefined);

	//$("#title").text(NAME + " v" + v);
	$("#footer").text(["\u00A9", y, AUTHORS[0]].join(" "));
}

function cheat(v) {
	v = v.toLowerCase();
	let cheats = [
		{ s: "light",      f: function() { eggDark(false) } },
		{ s: "dark",       f: function() { eggDark(true) } },
		{ s: "jeb_",       f: function() { eggRainbow(!eggRainbow.enabled) } },
		{ s: "dinnerbone", f: eggFlip },
		{ s: "grumm",      f: eggFlip },
	];
	let cheated = false;
	for (let i = 0; i < cheats.length; i++) {
		let c = cheats[i];
		if (v.includes(c.s)) {
			c.f();
			cheated = true;
		}
	}
	return cheated;
}

function eggRainbow(b) {
	if (b === false) {
		eggRainbow.enabled = false;
		clearInterval(eggRainbow.loopId);
		$("body").css("background", "");
	} else {
		eggRainbow.enabled = true;
		eggRainbow.loopId = setInterval(eggRainbow.loop, 50);
	}
}
eggRainbow.hue = 0;
eggRainbow.enabled = false;
eggRainbow.loop = function() {
	eggRainbow.hue++;
	eggRainbow.hue %= 360;
	let l = $("body").hasClass("dark")? 25 : 75;
	$("body").css("background", "hsl(" + eggRainbow.hue + ", 100%, " + l + "%)");
}

function eggDark(b) {
	let c = "dark";
	if (b) {
		$("body").addClass(c);
	} else {
		$("body").removeClass(c);
	}
}

function eggFlip() {
	if ($("body").hasClass("flip")) {
		$("body").removeClass("flip");
	} else {
		$("body").addClass("flip");
	}
}
