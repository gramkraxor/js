/* JS by Gramkraxor */

var name = "DEVX Console";
var version = 0x1;
var author = "Gramkraxor";
var logName = name + " v" + elong(version.toString(0x10).toUpperCase(), 4);
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
function $entry() { return $("#entry"); }
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
	val = repl(val, "\n", "<br/>");
	var v = $devx().text();
	//$devx().html(v + val);
	
	$devx().append(val);
	$("#entry").appendTo($devx());
	
	return $devx();
}

function entry(s) {
	/*if (!und(s)) $devx().val($devx().val().substring(0, cmdAt) + s);
	return $devx().val().substring(cmdAt);*/
	return $entry().text(s).text();
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
	setTimeout(function() {
		var obj = $devx();
		var v = obj.val();
		if (v.charAt(v.length - 1) == " ") return;
		v = v.substring(0, v.length - 1);
		obj.val(v);
	}, 0);
	cmdAt = $devx().text().length;
	enteredx = entered.length;
	$devx().focus();
}

function clear() {
	$devx().val("");
	cmdAt = 12 ** 4;
}

function enterInput() {
	var v = repl(repl(entry(), "\n", " "), "  ", " ").trim();
	entered.push(v);
	addVal(v);
	entry("");
	cmdInput(v);
}

function onKey(e) {
	// Down 40
	// Up   38
	var k = function(key) { return e.which == key; }
	if (k(13)) {
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
	var len = $devx().text().length;
	if ((e.ctrlKey && e.which == 65) && !(selStart() == cmdAt && selEnd() == len)) setTimeout(function() { sel(cmdAt, len); });
	if (selStart() <= cmdAt && (e.which == 8 || e.which == 46)) e.preventDefault();
	if (selStart() < cmdAt && !((e.ctrlKey && k(67)) || k(17) || k(16) || k(18) || k(37) || k(38) || k(39) || k(40))) sel(len);
}

$(function() {
	$body()
		.prop("spellcheck", false)
		.append($("<code/>")
			.attr("id", "console")
			.append($("<span/>")
				.attr("id", "entry")
				.prop("contenteditable", true)
				.prop("autofocus", true)
				.append("hi")
			)
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


/* JS by Gramkraxor */////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var cmdList = [];

function Cmd(path, run, finishes) {
	if (typeof path == "string") {
		path = [path.toLowerCase()];
	} else {
		for (let i = 0; i < path.length; i++) path[i] = path[i].toLowerCase();
	}
	this.path = path;
	this.run = run;
	this.finishes = finishes;
	cmdList.push(this);
}

new Cmd("echo", function(cmd) { log(cmd); });
new Cmd("user", function(cmd) { user(cmd); });
new Cmd("su", function(cmd) { user(cmd); });
new Cmd("host", function(cmd) { host(cmd); });
new Cmd("cd", function(cmd) { cd(cmd); });
new Cmd(["cd", "-r"], function(cmd) { cd((location.hostname == "")? location.pathname.substring(1) : location.hostname + location.pathname); });
new Cmd("cls", function(cmd) { cls(true); clear(); });
new Cmd(["dev", "x"], function(cmd) { clear(); intro(); });
new Cmd("bg", function(cmd) { $devx().css("background", cmd); });
new Cmd("fg", function(cmd) { $devx().css("color", cmd); });
new Cmd("chntpw", function(cmd) { if (eq(cmd, "-u Administrator SAM")) log("Local administrator password reset.");});
new Cmd("visit", function(cmd) { loc(cmd); });
new Cmd("crack", function(cmd) {
	var x = 0;
	var max = parseInt(cmd);
	var f;
	(f = function() {
		if (x++ < max) {
			log("[" + timestamp(":") + "] User " + getRandomInt(50000, 200000) + "'s password reset!");
			setTimeout(f, 10);
		} else {
			finish();
		}
	})();
}, true);

function cmdInput(cmd) {
	cmd = cmd.trim();
	cmdRunArray = cmd.split(" ");
	var path = cmdRunArray.slice();
	find: {
		for (let i = cmdRunArray.length - 1; i >= 0; i--) {
			for (let j = 0; j < cmdList.length; j++) {
				var c = cmdList[j]
				if (eq(c.path.join(" "), path.join(" "))) {
					addVal("\n");
					c.run(cmdRunArray.slice(i + 1, cmdRunArray.length).join(" "));
					if (!c.finishes) finish();
					return;
				}
			}
			path.pop(i);
		}
	}
	finish();
}
