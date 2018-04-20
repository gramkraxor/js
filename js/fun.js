
var classy = new (class extends Function {
	say(msg) {
		console.log(msg);
	}
	sayHi() {
		this.say("Classy hi!");
	}
	constructor() {
		super("msg", "return classy.say(msg);");
	}
})();


var funny = function(msg) {
	return funny.say(msg);
}

funny.say = function(msg) {
	console.log(msg);
}

funny.sayHi = function() {
	funny.say("Funny hi!")
}


classy("Meet Classy!");
classy.sayHi();

funny("Meet Funny!");
funny.sayHi();
