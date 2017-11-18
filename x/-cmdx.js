/* JS by Gramkraxor */

var cmdList = [];

function arg(a) {
	return a.split(" ");
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