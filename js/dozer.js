/*
 * Dozer, the HTML interface for doz.js and romulus.js
 * © 2018 Gramkraxor
 */

//TODO add option to select bases to show (how about two custom bases?)

Doz.log();
Rom.log();

var
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
CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";


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

var
bBin = new Base(2,  [ "bin", "b", "binary" ]),
bOct = new Base(8,  [ "oct", "o", "octal" ]),
bDec = new Base(10, [ "dec", "d", "decimal" ]),
bDoz = new Base(12, [ "doz", "z", "dozenal", "duodecimal" ]),
bHex = new Base(16, [ "hex", "x", "hexadecimal" ]);

$(function() {

	$("body").append($("<div/>")
		.attr("id", "bod")
		.prop("spellcheck", false)
		.append($("<div/>")
			.attr("id", "title")
		)
		.append($("<div/>")
			.attr("id", "doz")
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
			.attr("id", "roman")
			.append($("<input/>")
				.attr("type", "text")
				.attr("name", "roman")
				.click(function() {
					if ($(this).val() == Rom.N) $(this).val("");
					setLabels($(this).attr("name"));
				})
				.keypress(function(e) {
					if (e.which == 13) enter($(this).attr("name"));
				})
			)
		)
		.append("<br/>")
		.append($("<div/>")
			.attr("id", "footer")
		)
	);

	for (let i = 0; i < bases.length; i++) {
		var b = bases[i];
		$("#convert").append(
			$("<p/>")
				.append($("<input/>")
					.attr("type", "button")
					.attr("name", b.a[0])
					.attr("value", b.a[0])
					.attr("tabindex", -1)
					.click(function() {
						enter($(this).attr("name"));
					})
				)
				.append($("<input/>")
					.attr("type", "text")
					.attr("name", b.a[0])
					.click(function() {
						setLabels($(this).attr("name"));
					})
					.keypress(function(e) {
						if (e.which == 13) enter($(this).attr("name"));
					})
				)
		);
	}

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
	if (o != n) while (s.includes(o)) s = s.replace(o, n);
	return s;
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

function enter(b) {
	setLabels(b);

	var input;
	if (b == "roman") {
		input = $("input[type='text'][name='" + b + "']");
	} else {
		b = getBase(b);
		input = $("input[type='text'][name='" + b.a[0] + "']");
	}
	var v = input.val().toUpperCase();

	if (cheat(v)) {
		input.val("");
		return;
	}

	if (b == "roman") {
		v = Rom(repl(v, "\u2022", "*"));
	} else {
		if (b.r == 12) v = dozMode(v, Doz.AB);
		while (v.startsWith("0") && v.length > 1) v = v.substring(1, v.length);
		if (v.length == 0) v == "0";
		v = Doz.getNumber(v, b.r);
	}

	for (let i = 0; i < bases.length; i++) {
		var val = Doz.getString(v, bases[i].r);
		if (bases[i].r == 12) val = dozMode(val, currentMode);
		if (val == "0") val = "";
		$("input[type='text'][name='" + bases[i].a[0] + "']").val(val);
	}
	$("#roman input").val(repl(Rom.getString(v, true, true), "*", "\u2022")); // replace dozenths (*) with bullet character
}

function setLabels(b) {
	var r = (b == "roman");
	if (b && !r) {
		b = getBase(b).r;
		labelBase = b;
	} else {
		b = labelBase;
	}
	var v = r ? Rom(version)  : Doz(version,  b, currentMode);
	var y = r ? Rom(copyYear) : Doz(copyYear, b, currentMode);

	$("#title").text(title + " v" + v);
	$("#footer").text(["\u00A9", y, copy].join(" "));
	//$("#footer").html("&copy; " + $z(copyYear, currentMode) + " (" + copyYear + ") " + copy);
}

function cheat(v) {
	v = v.toLowerCase();
	var cheats = [
		{ s: "light",      f: function() { eggDarkMode(false) } },
		{ s: "dark",       f: function() { eggDarkMode(true) } },
		{ s: "jeb_",       f: function() { eggRainbow(!eggRainbowEnabled) } },
		{ s: "dinnerbone", f: eggFlip },
		{ s: "grumm",      f: eggFlip },
		{ s: "\u0070\u006F\u0072\u006E", f: eggP }
	];
	var cheated = false;
	for (let i = 0; i < cheats.length; i++) {
		let c = cheats[i];
		if (v.includes(c.s)) {
			c.f();
			cheated = true;
		}
	}
	return cheated;
}

var eggRainbowHue = 0;
var eggRainbowEnabled = false;

function eggRainbow(b) {
	if (b === false) {
		eggRainbowEnabled = false;
		$("body").removeAttr("style");
	} else {
		eggRainbowEnabled = true;

		let l = $("body").hasClass("dark")? 25 : 75;
		$("body").css("background", "hsl(" + eggRainbowHue++ + ", 100%, " + l + "%)");
		if (eggRainbowHue > 359) eggRainbowHue = 0;
		setTimeout(eggRainbow, 16);
	}
}

function eggDarkMode(b) {
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

var eggPN;

function eggP() {
	eggPN = 6;
	$("body")
		.append($("<center/>")
			.attr("id", "eggp")
			.css("position", "fixed")
			.css("top",    "0")
			.css("bottom", "0")
			.css("left",   "0")
			.css("right",  "0")
			.css("padding", "48px")
			.css("background", "#fff")
			.css("color", "#000")
			.append("Redirecting to https://&#x77;&#x77;&#x77;&#x2e&rho;&omicron;&#x72;&#x6e;&#x68;&#x75;&#x62;&#x2e;&#x63;&omicron;&#x6d; in ")
			.append($("<span/>")
				.attr("id", "eggpc")
				.css("color", "#000")
				.text(eggPN)
			)
		);
	setTimeout(eggPCount, 1000);
}

function eggPCount() {
	if (eggPN == 0) {
		$("#eggp")
			.empty()
			.text("haha jk");
		setTimeout(function() {
			$("#eggp").remove();
		}, 4000);
	} else {
		eggPN--;
		$("#eggpc").text(eggPN);
		setTimeout(eggPCount, 1000);
	}
}
