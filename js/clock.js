/*
 * Clock
 * © 2018 Gramkraxor
 */

let now = new Date();

const AUTHORS = [ "Gramkraxor" ];
const YEAR = 2018;

let timeout = 83;

function Meter(id, get) {
	this.id = id;
	this.get = get;
}

function get(fnLocal, fnUtc) { return function() { return utc ? now[fnUtc]() : now[fnLocal]() } }
let getFullYear = get("getFullYear", "getUTCFullYear");
let getMonth    = get("getMonth", "getUTCMonth");
let getDate     = get("getDate", "getUTCDate");
let getHours    = get("getHours", "getUTCHours");
let getMinutes  = get("getMinutes", "getUTCMinutes");
let getSeconds  = get("getSeconds", "getUTCSeconds");
let getMilliseconds = get("getMilliseconds", "getUTCMilliseconds");

let year       = new Meter("year",     function() { return fix(getFullYear(),  9999); });
let month      = new Meter("month",    function() { return fix(getMonth() + 1, 11); });
let day        = new Meter("day",      function() { return fix(getDate(), 31); });
let mHours     = new Meter("hour",     function() { return fix(getHours(), 23); });
let mMinutes   = new Meter("minute",   function() { return fix(getMinutes(), 59); });
let mSeconds   = new Meter("second",   function() { return fix(getSeconds(), 59); });
let mMeridian  = new Meter("meridian", function() { return getHours() > 11 ? "PM" : "AM"; });
let mMeridian2 = new Meter("meridian", function() { return getHours() > 11 ? "P" : "A"; });
let mMeridian3 = new Meter("meridian", function() { return getHours() > 11 ? "*" : "\u00A0"; });
let mHours12   = new Meter("hour",     function() {
	let h = ((getHours() + 11) % 12) + 1;
	h = fix(h);
	if (h.length < 2) h = "\u00A0" + h;
	return h;
});

// https://dozenal.ae-web.ca
let mBicia = new Meter("second", function() {
	return fix(getBicia(), 12);
});
let mNilqua = new Meter("minute", function() {
	return fix(getNilqua(), 12);
});
let mBiqua  = new Meter("hour",   function() {
	let b = getBiqua();
	b = fix(b);
	if (b.length < 2) b = "\u00A0" + b;
	return b;
});

let faces = [];

function Face(name, str, m) {
	this.name = name;
	this.str = str;
	this.m = m;
	faces.push(this);
}

let fStandard = new Face("standard", "standard",   [ mHours, mMinutes, mSeconds ]);
//let fAmPm     = new Face("ampm", "AM/PM",      [ mMeridian, mHours12, mMinutes, mSeconds ]);
let fAP       = new Face("ap", "A/P",        [ mHours12, mMinutes, mSeconds, mMeridian2 ]);
let fMin      = new Face("min", "min",        [ mHours12, mMinutes ]);
let fDozenal  = new Face("dozenalist", "dozenalist", [ mBiqua, mNilqua, mBicia ]);

let settings = [];

function Setting(name, o) {
	this.s = 0;
	this.name = name;
	this.id = "s-" + name;
	this.o = o;
	settings.push(this);
}

function Option(name, str, f) {
	this.name = name;
	this.str = str;
	this.f = f;
}

let faceOps = [];
for (let i = 0; i < faces.length; i++) {
	let f = faces[i];
	if (f == fDozenal) {
		faceOps.push(new Option(f.name, f.str, function() {
			setFace(f);
			sBase.o[1].f();
			$("#s-base").hide();
		}));
	} else {
		faceOps.push(new Option(f.name, f.str, function() {
			setFace(f);
			sBase.o[sBase.s].f();
			$("#s-base").show();
		}));
	}
}

let sFace = new Setting("face", faceOps);

let sUtc = new Setting("utc", [
	new Option("false", "local", function() { utc = false; }),
	new Option("true",  "UTC",   function() { utc = true;  })
]);

let sBase = new Setting("base", [
	new Option("dec", "decimal",     function() { base = 10; $("#s-mode").hide(); }),
	new Option("doz", "dozenal",     function() { base = 12; $("#s-mode").show(); }),
	new Option("hex", "hexadecimal", function() { base = 16; $("#s-mode").hide(); })
]);

let sMode = new Setting("mode", [
	new Option("xel", "X\u0190",      function() { mode = Doz.XEL; }),
	//new Option("xe",  "XE",           function() { mode = Doz.XE;  }),
	//new Option("zel", "Z\u0190",      function() { mode = "Z\u0190;"; }),
	//new Option("ze",  "ZE",           function() { mode = Doz.ZE;  }),
	new Option("ab",  "AB",           function() { mode = Doz.AB;  }),
	new Option("zel", "\u218A\u218B", function() { mode = Doz.ZEU; })
]);

let sDark = new Setting("dark", [
	new Option("false", "light", function() { $("body").removeClass("dark"); }),
	new Option("true",  "dark",  function() { $("body").addClass("dark"); })
]);

let mode = Doz.XEL;
let base;
let face = fStandard;
let utc = false;

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
				.attr("id", s.id)
				.attr("type", "submit")
				.attr("value", s.o[s.s].str)
				.click(function() {
					s.s++;
					s.s %= s.o.length;
					$("#" + s.id).attr("value", s.o[s.s].str);
					s.o[s.s].f();
				})
		);
	}
	for (let i = 0; i < settings.length; i++) {
		let s = settings[i];
		s.o[s.s].f();
	}
	if ((now.getHours() + 6) % 24 <= 12) {
		$("#" + sDark.id).click();
	}
	setFace(face);
	setInterval(loopTime, timeout);
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

function loopTime() {
	now = new Date();
	for (let i = 0; i < face.m.length; i++) {
		let m = face.m[i];
		set(m.id, m.get());
	}
}

function set(id, val) {
	let obj = $("#" + id);
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
		let max = 1;
	}
	let v = Doz(n, base);
	if (base == 12) v = Doz.toMode(v, mode);
	while (v.length < Doz(max, base).length) {
		v = "0" + v;
	}
	return v;
}

function getBiqua() {
	return Math.floor(getHours() / 2);
}
function getMsThisBiqua() {
	let ms = getMilliseconds();
	ms += getSeconds() * 1000;
	ms += getMinutes() * 60 * 1000;
	ms += (getHours() % 2) * 60 * 60 * 1000;
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
