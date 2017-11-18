/* JS by Owen Graham */

var SET = "set";
var PREFIX = "prefix";

var pathSetPrefix = [ SET, PREFIX ];

var cmdList = [];

var xx = new Cmd("xx", function(cmdRun) { log("CMD=" + cmdRun); });

function cmdInput(cmdRun) {
	log(prefix + " " + cmdRun);
	cmdRun = cmdRun.trim();
	cmdRunArray = cmdRun.split(" ");
	xx.run(cmdRun);
	log("Arguments entered: " + cmdRunArray.length);
}

function Cmd(path, run) {
	
	this.path = path;
	
	this.run = run;
	
	cmdList.push(this);
	
}