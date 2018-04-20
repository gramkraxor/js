/*
 * Dozer, the HTML interface for doz.js and romulus.js
 * © 2018 Gramkraxor
 */

//TODO add option to select bases to show (how about two custom bases?)

Doz.log();
Rom.log();

let
name = Doz.NAME,
version = Doz.VERSION,
title = name,
copyYear = Doz.YEAR,
copy = Doz.AUTHORS[0],
bases = [],
labelBase = 12,
usedModes = [ "AB", "XE", "ZEU" ],
currentMode = Doz.AB,
BASE = "base",
CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
customRadix = 0;


function Base(c, a) {
	this.type = BASE;
	if (typeof c == "number") {
		this.r = c;
		this.c = CHARSET.substring(0, this.r);
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
	"zero",
	"one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve",
	"thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "twenty-one", "twenty-two", "twenty-three", "twenty-four",
	"twenty-five", "twenty-six", "twenty-seven", "twenty-eight", "twenty-nine", "thirty", "thirty-one", "thirty-two", "thirty-three", "thirty-four", "thirty-five", "thirty-six"
]

$(function() {

	$("body").append($("<div/>")
		.attr("id", "wrapper")
		.prop("spellcheck", false)
		.append($("<div/>")
			.attr("id", "title")
		)
		.append($("<div/>")
			.attr("id", "dozer")
			.append($("<div/>")
				.attr("id", "convert")
			)
			.append($("<div/>")
				.attr("id", "mode")
				.append($("<p/>")
					.attr("id", "mode-title")
					.html("Transdecimals")
				)
			)
		)
		.append($("<div/>")
			.attr("id", "romulator")
			.append($("<input/>")
				.attr("type", "text")
				.attr("id", "roman")
				.click(function() {
					if ($(this).val() == Rom.N) $(this).val("");
					setLabels($(this).attr("id"));
				})
				.keypress(function(e) {
					if (e.which == 13) enter($(this));
				})
			)
		)
		.append("<br/>")
		.append($("<div/>")
			.attr("id", "footer")
		)
	);

	for (let i = 0; i < bases.length; i++) {
		let b = bases[i];
		$("#convert").append(
			$("<p/>")
				.append($("<span/>")
					.text(b.a[0])
				)
				.append($("<input/>")
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

	$("#convert").append($("<p/>")
		.append($("<input/>")
			.attr("type", "text")
			.attr("id", "custom-base")
			.attr("placeholder", "custom")
			.on("focus", function() {
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
			.keypress(function(e) {

				if (e.which != 13) return;

				let $this = $(this);
				let radix = $this.val();

				if (cheat(radix)) {
					$this.val(customRadix ? english[customRadix] : "");
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
					$this.val("");
					customRadix = 0;
					return;
				}
				if (radix < 2)  radix = 2;
				if (radix > 36) radix = 36;

				$this.val(english[radix]);
				customRadix = radix;

			})
		)
		.append($("<input/>")
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
		let m = Doz[mIndex];
		$("#mode").append(
			$("<p/>")
				.append($("<input/>")
					.attr("id", mIndex.toLowerCase())
					.attr("type", "radio")
					.attr("name", "mode")
					.click(function() {
						setMode(Doz[this.id.toUpperCase()]);
					})
					.prop("checked", m == currentMode)
				)
				.append($("<label/>")
					.attr("for", mIndex.toLowerCase())
					.append($("<span/>")
						.html(m[0] + " " + m[1])
					)
				)
		);
	}

	setLabels();

});

function repl(s, o, n) {
	return s.split(o).join(n);
}

function getModeIndex(x) {
	for (let i = 0; i < usedModes.length; i++) {
		if (Doz[usedModes[i]] == x) return usedModes[i];
	}
}

function setMode(m) {
	$("#" + getModeIndex(m).toLowerCase()).prop("checked", true)
	if (usedModes.includes(m)) {
		m = Doz[m];
	}
	currentMode = m;
	setLabels();
}

function dozMode(s, m) {
	for (let i = 0; i < usedModes.length; i++) {
		for (let j = 0; j < 3; j++) {
			let c = Doz[usedModes[i]][j];
			s = repl(s, c, m[j]);
		}
	}
	return s;
}

function getBase(v) {
	if (v == "roman") return dec;
	if (v.type == BASE) return v;
	if (typeof v == "string") v = v.toLowerCase();
	if (typeof v == "number") v = Math.floor(v);
	for (let i = 0; i < bases.length; i++) {
		let b = bases[i];
		if (v == b || v == b.r || b.a.includes(v)) return b;
	}
	if (typeof v == "number" && v <= CHARSET.length && v > 1) return new Base(v);
	return dec;
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
		if (!customRadix) return;
		radix = customRadix;
	} else if (id != "roman") {
		radix = getBase(id).r;
	}

	if (id == "roman") {
		v = Rom(repl(v, "\u2022", "*"));
	} else {
		if (radix == 12) v = dozMode(v, Doz.AB);
		while (v.startsWith("0") && v.length > 1) v = v.substring(1, v.length);
		if (v.length == 0) v == "0";
		v = Doz.getNumber(v, radix);
	}

	for (let i = 0; i < bases.length; i++) {
		let b = bases[i];
		let val = Doz.getString(v, b.r);
		if (b.r == 12) val = dozMode(val, currentMode);
		if (val == "0") val = "";
		$("#" + b.a[0]).val(val);
	}
	$("#roman").val(repl(Rom.getString(v, true, true), "*", "\u2022")); // replace dozenths (*) with bullet character
	if (customRadix) $("#custom").val(v != 0 ? Doz(v, customRadix) : "");
}

function setLabels(b) {
	let r = (b == "roman");
	let c = (b == "custom");
	let z = (b == "doz");

	if (b && !r && !c) {
		labelBase = getBase(b).r;
	} else if (c) {
		labelBase = customRadix || labelBase;
	}

	let v = r ? Rom(version)  : Doz(version,  labelBase, z ? currentMode : undefined);
	let y = r ? Rom(copyYear) : Doz(copyYear, labelBase, z ? currentMode : undefined);

	$("#title").text(title + " v" + v);
	$("#footer").text(["\u00A9", y, copy].join(" "));
	//$("#footer").html("&copy; " + $z(copyYear, currentMode) + " (" + copyYear + ") " + copy);
}

function cheat(v) {
	v = v.toLowerCase();
	let cheats = [
		{ s: "light",      f: function() { eggDark(false) } },
		{ s: "dark",       f: function() { eggDark(true) } },
		{ s: "jeb_",       f: function() { eggRainbow(!eggRainbowEnabled) } },
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

let eggRainbowHue = 0;
let eggRainbowEnabled = false;
let eggRainbowLoopId;

function eggRainbow(b) {
	if (b === false) {
		eggRainbowEnabled = false;
		clearInterval(eggRainbowLoopId);
		$("body").css("background", "");
	} else {
		eggRainbowEnabled = true;
		eggRainbowLoopId = setInterval(eggRainbowLoop, 50);
	}
}

function eggRainbowLoop() {
	eggRainbowHue++;
	eggRainbowHue %= 360;

	let l = $("body").hasClass("dark")? 25 : 75;
	$("body").css("background", "hsl(" + eggRainbowHue + ", 100%, " + l + "%)");
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
