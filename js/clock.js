/* JS by Owen Graham */

var now = new Date();

function Meter(id, get) {
	this.id = id;
	this.get = get;
}

var year       = new Meter("year",     function() { set($("#" + this.id), fix(now.getFullYear(),  2047)); });
var month      = new Meter("month",    function() { set($("#" + this.id), fix(now.getMonth() + 1, 11)); });
var day        = new Meter("day",      function() { set($("#" + this.id), fix(now.getDate(), 31)); });
var mHours     = new Meter("hour",     function() { set($("#" + this.id), fix(now.getHours(), 23)); });
var mMinutes   = new Meter("minute",   function() { set($("#" + this.id), fix(now.getMinutes(), 59)); });
var mSeconds   = new Meter("second",   function() { set($("#" + this.id), fix(now.getSeconds(), 59)); });
var mMeridian  = new Meter("meridian", function() { set($("#" + this.id), now.getHours() > 11 ? "PM" : "AM"); });
var mMeridian2 = new Meter("meridian", function() { set($("#" + this.id), now.getHours() > 11 ? "P" : "A"); });
var mMeridian3 = new Meter("meridian", function() { set($("#" + this.id), now.getHours() > 11 ? "*" : "\u00A0"); });
var mHours12   = new Meter("hour",     function() {
	let h = now.getHours();
	if (h > 12) h -= 12;
	if (h == 0) h = 12;
	let v = fix(h);
	if (v.length < 2) v = "\u00A0" + v;
	set($("#" + this.id), v);
});

var faces = [];

function Face(m) {
	this.m = m;
	faces.push(this);
}

var face1 = new Face([ mHours, mMinutes, mSeconds ]);
var face2 = new Face([ mMeridian, mHours12, mMinutes, mSeconds ]);
var face3 = new Face([ mHours12, mMinutes, mMeridian2, mSeconds ]);
var face4 = new Face([ mHours12, mMinutes ]);

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

var sBase = new Setting("base", [
	new Option("decimal",     function() { base = 10; }),
	new Option("dozenal",     function() { base = 12; }),
	new Option("hexadecimal", function() { base = 16; })
]);

var sMode = new Setting("mode", [
	new Option("X\u0190",      function() { mode = xel; }),
	new Option("XE",           function() { mode = xe;  }),
	new Option("Z\u0190",      function() { mode = zel; }),
	new Option("ZE",           function() { mode = ze;  }),
	new Option("AB",           function() { mode = ab;  }),
	new Option("\u218A\u218B", function() { mode = xeu; })
]);

var xel = new Doz.Mode([ "X", "\u0190" ]);
var xe  = new Doz.Mode([ "X", "E" ]);
var zel = new Doz.Mode([ "Z", "\u0190" ]);
var ze  = new Doz.Mode([ "Z", "E" ]);
var ab  = new Doz.Mode([ "A", "B" ]);
var zeu = new Doz.Mode([ "\u218A", "\u218B" ]);

var mode = xel;

var base = 9;

var face = face1;

var timeout = 216;

$(document).ready(function() {
	$("body")
		.append(
			$("<div/>", {id: "clock"})
				.append(
					$("<div/>", {id: "face"})
				)
		)
		.append(
			$("<div/>", {id: "foot"})
		);
	for (let i = 0; i < settings.length; i++) {
		let s = settings[i];
		$("#foot").append($("<input/>")
				.attr("id", s.n)
				.attr("type", "submit")
				.attr("value", s.o[s.s].n)
				.click(function() {
					s.s++;
					if (s.s == s.o.length) s.s = 0;
					$("#" + s.n).attr("value", s.o[s.s].n);
					s.o[s.s].f();
				})
		);
		s.o[s.s].f();
	}
	for (let i = 0; i < face.m.length; i++) {
		$("#face").append(
			$("<span/>", {id: face.m[i].id})
		);
	}
	startTime();
});

function startTime() {
	now = new Date();
	for (let i = 0; i < face.m.length; i++) face.m[i].get();
	
	setTimeout(startTime, timeout);
}

function set(obj, val) {
	if (obj.html().trim() != val.trim()) {
		obj.html(val + " ");
	}
}

function fix(n, max) {
	if (typeof n != "number") {
		if (typeof n != "string") {
			return;
		}
		n = $d(n, base);
	}
	if (typeof max == "undefined") {
		var max = 1;
	}
	var v = $Doz(n, base, mode);
	while (v.length < $Doz(max, base).length) {
		v = "0" + v;
	}
	return v;
}
