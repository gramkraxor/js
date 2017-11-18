/* JS by Gramkraxor */

var name = "DEVX Console";
var version = 0x1;
var author = "Gramkraxor";
var logName = name + " v" + elong($x(version), 4);
var logCopy = "(c) " + new Date().getFullYear() + " " + author + ". All rights reserved.";
var userx = "root";
var hostx = "DEVX";
var cdx = "~";
var cmdAt = 0;
var margin = 288;
var clsx = false;
var entered = [];
var enteredx = 0;

function caret() {
	//return user() + "@" + host() + ":" + cd() + " $ ";
	return "devx> ";
}

function user(v) {
	if (!und(v)) userx = v;
	return userx;
}

function host(v) {
	if (!und(v)) hostx = v;
	return hostx;
}

function cd(v) {
	if (!und(v)) cdx = v;
	return cdx;
}

function cls(b) {
	var r = clsx;
	clsx = (und(b))? false : b;
	return r;
}

function $devx() { return $("#console"); }
function $body() { return $(document.body); }

function und(v) {
	return typeof v == "undefined";
}

function repl(s, o, n) {
	if (und(n) || o == n) return s;
	while (s.includes(o)) s = s.replace(o, n);
	return s;
}

function eq(s1, s2) {
	return s1.toLowerCase() == s2.toLowerCase();
}

String.prototype.repl = function(o, n) {
	var s = this.toString();
	if (!und(n) && o != n) while (s.includes(o)) s = s.replace(o, n);
	return s;
}

String.prototype.eq = function(s2) {
	return this.toLowerCase() == s2.toLowerCase();
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function elong(n, l) {
	n = n.toString();
	if (und(l)) l = 2;
	if (n.length > l) while (n.startsWith("0")) n = n.substring(1);
	while (n.length < l) n = "0" + n;
	return n;
}


function timestamp(join, ms, year, month, date) {
	var f = elong;
	var d = new Date();
	var r = [];
	if (year)  r.push(d.getFullYear());
	if (month) r.push(f(d.getMonth()));
	if (date)  r.push(f(d.getDate()));
	r.push(f(d.getHours()));
	r.push(f(d.getMinutes()));
	r.push(f(d.getSeconds()));
	if (ms || und(ms)) r.push(f(d.getMilliseconds(), 3));
	if (und(join)) join = "";
	return r.join(join);
}

function loc(url) {
	return location.assign(url);
}

function addVal(val) {
	var v = $devx().val();
	$devx().val(v + val);
	return $devx();
}

function entry(s) {
	if (!und(s)) $devx().val($devx().val().substring(0, cmdAt) + s);
	return $devx().val().substring(cmdAt);
}

function selStart(n) {
	if (!und(n)) $devx()[0].selectionStart = n;
	return $devx()[0].selectionStart;
}

function selEnd(n) {
	if (!und(n)) $devx()[0].selectionEnd = n;
	return $devx()[0].selectionEnd;
}

function sel(n, m) {
	if (!und(m)) return $devx()[0].setSelectionRange(n, m);
	return $devx()[0].setSelectionRange(n, n);
}

function log(s) {
	addVal(s + "\n");
	//$devx().scrollTop($devx()[0].scrollHeight);
}

function finish() {
	if (!cls()) addVal("\n");
	addVal(caret());
	$devx().focus();
	setTimeout(function() {
		var obj = $devx();
		var v = obj.val();
		if (v.charAt(v.length - 1) == " ") return;
		v = v.substring(0, v.length - 1);
		obj.val(v);
	}, 0);
	cmdAt = $devx().val().length;
	enteredx = entered.length;
}

function clear() {
	$devx().val("");
	cmdAt = 12 ** 4;
}

function enterInput() {
	var v = repl(repl(entry(), "\n", " "), "  ", " ").trim();
	entered.push(v);
	cmdInput(v);
}

function onKey(e) {
	// Down 40
	// Up   38
	var k = function(key) { return e.which == key; }
	if (e.which == 13) {
		e.preventDefault();
		if (e.shiftKey || e.ctrlKey || e.altKey) {
			addVal("\n");
		} else {
			enterInput();
		}
		return;
	}
	if ((k(38) || k(40)) && selStart() >= cmdAt) {
		var n = k(38) ? -1 : 1;
		n += enteredx;
		if (!(n < 0)) e.preventDefault();
		if (n == entered.length) {
			entry("");
			enteredx = n;
		} else if (n < entered.length && n >= 0) {
			entry(entered[n]);
			enteredx = n;
		}
		return;
	}
	if ((e.ctrlKey && e.which == 65) && !(selStart() == cmdAt && selEnd() == $devx().val().length)) setTimeout(function() { sel(cmdAt, $devx().val().length); });
	if (selStart() <= cmdAt && (e.which == 8 || e.which == 46)) e.preventDefault();
	if (selStart() < cmdAt && !((e.ctrlKey && k(67)) || k(17) || k(16) || k(18) || k(37) || k(38) || k(39) || k(40))) sel($devx().val().length);
}

$(function() {
	$("body")
		.prop("spellcheck", false)
		.append($("<textarea/>")
			.attr("id", "console")
			//.keypress(function(e) { onKey(e); })
			.on("keydown", function(e) { onKey(e); })
		)
		.append($("<code/>")
			.prop("contenteditable", true)
			//.attr("id", "console")
			.on("keydown", function(e) { onKey(e); })
		);
	
	intro();
	finish();
});

function intro() {
	user("root");
	host((location.hostname == "")? "DEVX" : location.hostname);
	cd(location.pathname);
	log(logName);
	log(logCopy);
	enteredx = 0;
}
