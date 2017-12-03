/* JS by Gramkraxor */

//TODO add option to select bases to show

Doz.log();
Rom.log();

var
name = Doz.NAME,
version = Doz.VERSION,
versionName = "Radix",
title = name/* + " " + versionName*/,
copyYear = Doz.YEAR,
copy = Doz.AUTHORS[0],
bases = [],
labelBase = 12,
usedModes = [ Doz.ab, Doz.ze, Doz.xe ],
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
bin = new Base(2,  [ "bin", "b", "binary" ]),
oct = new Base(8,  [ "oct", "o", "octal" ]),
dec = new Base(10, [ "dec", "d", "decimal" ]),
doz = new Base(12, [ "doz", "z", "dozenal", "duodecimal" ]),
hex = new Base(16, [ "hex", "x", "hexadecimal" ]);

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
					.html("Dozenal Mode")
				)
			)
		)
		.append($("<div/>")
			.attr("id", "roman")
			.append($("<input/>")
				.attr("type", "text")
				.attr("name", "roman")
				.click(function() {
					if ($(this).val() == Rom.n) $(this).val("");
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
					.attr("type", "submit")
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
		var m = usedModes[i];
		$("#mode").append(
			$("<p/>")
				.append($("<input/>")
					.attr("id", m.a)
					.attr("type", "radio")
					.attr("name", "mode")
					.click(function() { setMode() })
					.prop("checked", m == Doz.mode)
				)
				.append($("<label/>")
					.attr("for", m.a)
					.append($("<span/>")
						.html(m.c.join(" "))
					)
					.append(" (" + m.n + ")")
				)
		);
	}
	
	setLabels();
	
});

function getMode() {
	var mode = $("input[name='mode']:checked").attr("id");
	for (let i = 0; i < usedModes.length; i++) {
		if (usedModes[i].a == mode) {
			return usedModes[i];
		}
	}
	return Doz.ab;
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

/*String.prototype.repl = function(o, n) {
	//return s.replace(new RegExp(o, "g"), n);
	return repl(this, o, n);
}*/

function repl(s, o, n) {
	if (o != n) while (s.includes(o)) s = s.replace(o, n);
	return s;
}

function dozMode(s, m) {
	s = s.toUpperCase();
	for (let i = 0; i < usedModes.length; i++) {
		for (let j = 0; j < usedModes[i].c.length; j++) {
			let c = usedModes[i].c[j];
			s = repl(s, c, m.c[j]);
		}
		s = repl(s, usedModes.p, m.p);
	}
	return s;
}

function enter(b) {
	setLabels(b);
	var mode = Doz.mode;
	if (mode != getMode() && b == 0xC) {
		$("#" + mode.a).prop("checked", true);
		setLabels();
	}
	
	if (b == "roman") {
		var v = $("input[type='text'][name='" + b + "']").val();
		cheat(v);
		v = Rom.integer(repl(v, "\u2022", "*"));
	} else {
		b = getBase(b);
		var v = $("input[type='text'][name='" + b.a[0] + "']").val().toUpperCase();
		cheat(v);
		if (b.r == 12) v = dozMode(v, Doz.ab);
		while (v.startsWith("0") && v.length > 1) v = v.substring(1, v.length);
		if (v.length == 0) v == "0";
		v = Doz.floatBase(v, b.r);
	}
	
	for (let i = 0; i < bases.length; i++) {
		var val = Doz.stringBase(v, bases[i].r);
		if (bases[i].r == 12) val = dozMode(val, mode);
		if (val == "0") val = "";
		$("input[type='text'][name='" + bases[i].a[0] + "']").val(val);
	}
	$("#roman input").val(repl(Rom.numeral(v, true), "*", "\u2022")); // replace dozenths (*) with bullet character
}

function setMode(m) {
	if (typeof m == "undefined") {
		m = getMode();
	}
	if (typeof m == "string") {
		getmode:
		for (let i = 0; i < usedModes.length; i++) {
			if (m == usedModes[i].a) {
				m = usedModes[i];
				break getmode;
			}
		}
	}
	if (typeof m != "object") {
		return;
	}
	Doz.setMode(m);
	$("#" + m.a).prop("checked", true)
	setLabels();
}

function setLabels(b) {
	var r = b == "roman";
	if (b && !r) {
		b = getBase(b).r;
		labelBase = b;
	} else {
		b = labelBase;
	}
	var v = r ? $R(version)  : $Doz(version,  b, Doz.mode);
	var y = r ? $R(copyYear) : $Doz(copyYear, b, Doz.mode);
	$("#title").html(title + " " + v);
	$("#footer").html("&copy; " + y + " " + copy);
	//$("#footer").html("&copy; " + $z(copyYear, Doz.mode) + " (" + copyYear + ") " + copy);
}

function cheat(v) {
	v = v.toLowerCase();
	if (v.includes("light")) eggDarkMode(false);
	if (v.includes("dark")) eggDarkMode(true);
	if (v.includes("jeb_")) eggRainbow(!eggRainbowEnabled);
	if (v.includes("grumm") || v.includes("dinnerbone")) eggFlip();
	if (v.includes("\u0070\u006F\u0072\u006E")) eggP();
}

var eggRainbowHue = 0;
var eggRainbowEnabled = false;

function eggRainbow(b) {
	if (!b) {
		eggRainbowEnabled = false;
		$("body").removeAttr("style");
	}
	if (b) eggRainbowEnabled = true;
	if (eggRainbowEnabled) {
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
	let c = "flip";
	if ($("body").hasClass(c)) {
		$("body").removeClass(c);
	} else {
		$("body").addClass(c);
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
