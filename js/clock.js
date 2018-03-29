/*
 * Clock
 * © 2018 Gramkraxor
 */

var now = new Date();

const AUTHORS = [ "Gramkraxor" ];
const YEAR = 2018;

var timeout = 83;

function Meter(id, get) {
	this.id = id;
	this.get = get;
}

var year       = new Meter("year",     function() { return fix(now.getFullYear(),  2047); });
var month      = new Meter("month",    function() { return fix(now.getMonth() + 1, 11); });
var day        = new Meter("day",      function() { return fix(now.getDate(), 31); });
var mHours     = new Meter("hour",     function() { return fix(now.getHours(), 23); });
var mMinutes   = new Meter("minute",   function() { return fix(now.getMinutes(), 59); });
var mSeconds   = new Meter("second",   function() { return fix(now.getSeconds(), 59); });
var mMeridian  = new Meter("meridian", function() { return now.getHours() > 11 ? "PM" : "AM"; });
var mMeridian2 = new Meter("meridian", function() { return now.getHours() > 11 ? "P" : "A"; });
var mMeridian3 = new Meter("meridian", function() { return now.getHours() > 11 ? "*" : "\u00A0"; });
var mHours12   = new Meter("hour",     function() {
	let h = ((now.getHours() + 11) % 12) + 1;
	h = fix(h);
	if (h.length < 2) h = "\u00A0" + h;
	return h;
});

// https://dozenal.ae-web.ca
var mBicia = new Meter("second", function() {
	return fix(getBicia(), 12);
});
var mNilqua = new Meter("minute", function() {
	return fix(getNilqua(), 12);
});
var mBiqua  = new Meter("hour",   function() {
	let b = getBiqua();
	b = fix(b);
	if (b.length < 2) b = "\u00A0" + b;
	return b;
});

var faces = [];

function Face(n, m) {
	this.n = n;
	this.m = m;
	faces.push(this);
}

var f1 = new Face("standard",   [ mHours, mMinutes, mSeconds ]);
var f2 = new Face("AM/PM",      [ mMeridian, mHours12, mMinutes, mSeconds ]);
var f3 = new Face("A/P",        [ mHours12, mMinutes, mSeconds, mMeridian2 ]);
var f4 = new Face("min",        [ mHours12, mMinutes ]);
var fZ = new Face("dozenalist", [ mBiqua, mNilqua, mBicia ]);

var settings = [];

function Setting(n, o) {
	this.s = 0;
	this.n = n;
	this.o = o;
	settings.push(this);
}

function Option(n, f) {
	this.n = n;
	this.f = f;
}

var faceOps = [];
for (let i = 0; i < faces.length; i++) {
	let f = faces[i];
	if (f == fZ) {
		faceOps.push(new Option(f.n, function() {
			setFace(f);
			sBase.o[1].f();
			$("#s-base").hide();
		}));
	} else {
		faceOps.push(new Option(f.n, function() {
			setFace(f);
			sBase.o[sBase.s].f();
			$("#s-base").show();
		}));
	}
}

var sFace = new Setting("s-face", faceOps);

var sBase = new Setting("s-base", [
	new Option("decimal",     function() { base = 10; $("#s-mode").hide(); }),
	new Option("dozenal",     function() { base = 12; $("#s-mode").show(); }),
	new Option("hexadecimal", function() { base = 16; $("#s-mode").hide(); })
]);

var sMode = new Setting("s-mode", [
	new Option("X\u0190",      function() { mode = Doz.XEL; }),
	//new Option("XE",           function() { mode = Doz.XE;  }),
	//new Option("Z\u0190",      function() { mode = "Z\u0190;"; }),
	//new Option("ZE",           function() { mode = Doz.ZE;  }),
	new Option("AB",           function() { mode = Doz.AB;  }),
	new Option("\u218A\u218B", function() { mode = Doz.ZEU; })
]);

var sDark = new Setting("s-dark", [
	new Option("light", function() { $("body").removeClass("dark"); }),
	new Option("dark",  function() { $("body").addClass("dark"); })
]);

var mode = Doz.XEL;
var base;
var face = f1;

$(function() {
	$("body")
		.append(
			$("<div/>", {id: "clock"})
				.append(
					$("<div/>", {id: "face"})
				)
		)
		.append(
			$("<div/>", {id: "settings"})
		)
		.append(
			$("<div/>", {id: "footer"})
				.text(["\u00A9", YEAR, AUTHORS[0]].join(" ")
			)
	);
	for (let i = 0; i < settings.length; i++) {
		let s = settings[i];
		$("#settings").append($("<input/>")
				.attr("id", s.n)
				.attr("type", "submit")
				.attr("value", s.o[s.s].n)
				.click(function() {
					s.s++;
					s.s %= s.o.length;
					$("#" + s.n).attr("value", s.o[s.s].n);
					s.o[s.s].f();
				})
		);
	}
	for (let i = 0; i < settings.length; i++) {
		let s = settings[i];
		s.o[s.s].f();
	}
	if ((now.getHours() + 6) % 24 <= 12) {
		$("#" + sDark.n).click();
	}
	setFace(face);
	startTime();
});

function setFace(f) {
	face = f;
	$("#face").empty();
	for (let i = 0; i < face.m.length; i++) {
		$("#face").append(
			$("<span/>", {id: face.m[i].id})
		);
	}
}

function startTime() {
	now = new Date();
	for (let i = 0; i < face.m.length; i++) {
		let m = face.m[i];
		set(m.id, m.get());
	}

	setTimeout(startTime, timeout);
}

function set(id, val) {
	var obj = $("#" + id);
	if (obj.html().trim() != val.trim()) {
		obj.html(val + " ");
	}
}

function fix(n, max) {
	if (typeof n != "number") {
		if (typeof n != "string") {
			return;
		}
		n = Doz(n, base);
	}
	if (typeof max == "undefined") {
		var max = 1;
	}
	var v = Doz(n, base);
	if (base == 12) v = Doz.toMode(v, mode);
	while (v.length < Doz(max, base).length) {
		v = "0" + v;
	}
	return v;
}

function getBiqua() {
	return Math.floor(now.getHours() / 2);
}
function getMsThisBiqua() {
	let ms = now.getMilliseconds();
	ms += now.getSeconds() * 1000;
	ms += now.getMinutes() * 60 * 1000;
	ms += (now.getHours() % 2) * 60 * 60 * 1000;
	return ms;
}
// there are 1000 * 60 * 60 * 2 ms in a biqua
// there are 144 nilqua in a biqua
// there are 144 * 144 bicia in a biqua
function getNilqua() {
	return Math.floor(getMsThisBiqua() * 144 / (2 * 60 * 60 * 1000));
}
function getBicia() {
	return Math.floor((getMsThisBiqua() * (144 * 144) / (2 * 60 * 60 * 1000)) % 144);
}
