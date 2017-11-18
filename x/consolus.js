/* JS by Owen Graham */

var name = "Consolus";
var version = "1";
var versionName = "Quis";
var title = name + " " + versionName + " " + version;
var copy = "&copy; 2017 Owen Graham";
var prefix = "&gt;";
var enter = "\u2324";
var log1 = name + " " + version + ". Copyright " + copy + ". All rights reserved.";

function ent(s) {
	return s.replace("<", "&lt;").replace(">", "&gt;");
}

function unent(s) {
	return s.replace("&lt;", "<").replace("&gt;", ">");
}

function log(s) {
	console.log(unent(s));
	$("#log").append("<span>" + ent(s) + "<br/></span>");
	$("#console").scrollTop($("#console")[0].scrollHeight);
}

function onStart() {
	$("#title").html(title);
	$("#footer").html(copy);
	$("#prefix").html(prefix);
	
	log(log1);
}

function enterInput() {
	var v = $("#input").val();
	while (v.includes("  ")) {
		v = v.replace("  ", " ");
	}
	cmdInput(v);
	$("#input").val("");
}

function onKey(e) {
	if (e.keyCode == 13) {
		enterInput();
	}
}