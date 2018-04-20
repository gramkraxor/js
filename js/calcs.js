/*
 * Calculator Supreme
 * © 2018 Gramkraxor
 */

const NAME = "Calculator Supreme"
const AUTHORS = [ "Gramkraxor" ];
const YEAR = 2018;

function get(id) {
	return $("#" + id);
}

function setScreen(id) {
	$(".scr").hide();
	get(id).show();
}

function dark(b) {
	let $body = $("body");
	let d = "dark";
	if (typeof b != "boolean") b = !$body.hasClass(d);
	if (b) {
		$body.addClass(d);
	} else {
		$body.removeClass(d);
	}
}

$(function() {

	$("body")
		.append($("<div/>", {id: "phone"}))
		.append($("<div/>", {id: "footer"})
			.text(["\u00A9", YEAR, AUTHORS[0]].join(" "))
			.click(dark)
			.click()
		)
	;

	function item(parent, tag, id) {
		let i = $("<" + tag + "/>");
		if (id)  i.attr("id", id);
		get(parent).append(i);
		return i;
	}

	function scr(id) {
		i = $("<div/>").addClass("scr").attr("id", id);
		$("#phone")
			//.append(id)
			.append(i)
		;
		return i;
	}

	function div(parent, id) {
		let i = item(parent, "div", id);
		return i;
	}

	function btn(parent, id, fn, val) {
		let i = item(parent, "input", id).attr("type", "button");
		if (val) i.val(val);
		i.on("click", fn);
		return i;
	}

	scr("scr-home");
	div("scr-home", "lbl-home-title-1").addClass("lbl-title").text("Calculator");
	div("scr-home", "lbl-home-title-2").addClass("lbl-title").text("Supreme").append($("<span/>").text("Supreme"));
	btn("scr-home", "btn-home-goto-calc",  gotoCalc,  "Calculator");
	btn("scr-home", "btn-home-goto-hex",   gotoHex,   "Programmer");
	btn("scr-home", "btn-home-goto-roman", gotoRoman, "Roman Numeral");
	btn("scr-home", "btn-home-goto-set",   gotoSet);

	scr("scr-calc");
	div("scr-calc", "div-calc-field").addClass("div-field");
	div("div-calc-field", "lbl-calc-entry");
	div("div-calc-field", "lbl-calc-answer");
	div("scr-calc", "div-calc-row-1").addClass("div-row");
	div("scr-calc", "div-calc-row-2").addClass("div-row");
	div("scr-calc", "div-calc-row-3").addClass("div-row");
	div("scr-calc", "div-calc-row-4").addClass("div-row");
	div("scr-calc", "div-calc-row-5").addClass("div-row");
	div("scr-calc", "div-calc-row-6").addClass("div-row");
	div("scr-calc", "div-calc-row-7").addClass("div-row");
	btn("div-calc-row-1", "btn-calc-e",     function() { onOp(opE    ); }, "e");
	btn("div-calc-row-1", "btn-calc-sin",   function() { onOp(opSin  ); }, "sin");
	btn("div-calc-row-1", "btn-calc-cos",   function() { onOp(opCos  ); }, "cos");
	btn("div-calc-row-1", "btn-calc-tan",   function() { onOp(opTan  ); }, "tan");
	btn("div-calc-row-1", "btn-calc-pi",    function() { onOp(opPi   ); }, "\u03C0");
	btn("div-calc-row-1", "btn-calc-tau",   function() { onOp(opTau  ); }, "\u03C4");
	btn("div-calc-row-2", "btn-calc-ln",    function() { onOp(opLn   ); }, "ln");
	btn("div-calc-row-2", "btn-calc-log",   function() { onOp(opLog  ); }, "log");
	btn("div-calc-row-2", "btn-calc-lp",    function() { onOp(opLp   ); }, "(");
	btn("div-calc-row-2", "btn-calc-rp",    function() { onOp(opRp   ); }, ")");
	btn("div-calc-row-2", "btn-calc-div",   function() { onOp(opDiv  ); }, "\u00F7");
	btn("div-calc-row-3", "btn-calc-sqrt",  function() { onOp(opSqrt ); }, "\u221A");
	btn("div-calc-row-3", "btn-calc-7",     function() { onOp(op7    ); }, "7");
	btn("div-calc-row-3", "btn-calc-8",     function() { onOp(op8    ); }, "8");
	btn("div-calc-row-3", "btn-calc-9",     function() { onOp(op9    ); }, "9");
	btn("div-calc-row-3", "btn-calc-mlt",   function() { onOp(opMlt  ); }, "\u00D7");
	btn("div-calc-row-4", "btn-calc-sqr",   function() { onOp(opSqr  ); }, "\u00B2");
	btn("div-calc-row-4", "btn-calc-4",     function() { onOp(op4    ); }, "4");
	btn("div-calc-row-4", "btn-calc-5",     function() { onOp(op5    ); }, "5");
	btn("div-calc-row-4", "btn-calc-6",     function() { onOp(op6    ); }, "6");
	btn("div-calc-row-4", "btn-calc-sub",   function() { onOp(opSub  ); }, "\u2212");
	btn("div-calc-row-5", "btn-calc-rcp",   function() { onOp(opRcp  ); }, "\u207B\u00B9");
	btn("div-calc-row-5", "btn-calc-1",     function() { onOp(op1    ); }, "1");
	btn("div-calc-row-5", "btn-calc-2",     function() { onOp(op2    ); }, "2");
	btn("div-calc-row-5", "btn-calc-3",     function() { onOp(op3    ); }, "3");
	btn("div-calc-row-5", "btn-calc-add",   function() { onOp(opAdd  ); }, "+");
	btn("div-calc-row-6", "btn-calc-pow",   function() { onOp(opPow  ); }, "^");
	btn("div-calc-row-6", "btn-calc-point", function() { onOp(opPoint); }, ".");
	btn("div-calc-row-6", "btn-calc-0",     function() { onOp(op0    ); }, "0");
	btn("div-calc-row-6", "btn-calc-ans",   function() { onOp(opAns  ); }, "ans");
	btn("div-calc-row-7", "btn-calc-clear", onCalcClear, "clear");
	btn("div-calc-row-7", "btn-calc-del",   onCalcDel, "del");
	btn("div-calc-row-7", "btn-calc-enter", onCalcEnter,   "enter");

	scr("scr-hex");
	div("scr-hex", "div-hex-field").addClass("div-field");
	div("div-hex-field", "scr-hex-bin");
	div("div-hex-field", "scr-hex-oct");
	div("div-hex-field", "scr-hex-dec");
	div("div-hex-field", "scr-hex-hex");
	btn("scr-hex-bin", BIN.btn, function() { setBase(BIN); }, "BIN");
	btn("scr-hex-oct", OCT.btn, function() { setBase(OCT); }, "OCT");
	btn("scr-hex-dec", DEC.btn, function() { setBase(DEC); }, "DEC");
	btn("scr-hex-hex", HEX.btn, function() { setBase(HEX); }, "HEX");
	div("scr-hex-bin", "lbl-hex-bin");
	div("scr-hex-oct", "lbl-hex-oct");
	div("scr-hex-dec", "lbl-hex-dec");
	div("scr-hex-hex", "lbl-hex-hex");
	div("scr-hex", "div-hex-row-1").addClass("div-row");
	div("scr-hex", "div-hex-row-2").addClass("div-row");
	div("scr-hex", "div-hex-row-3").addClass("div-row");
	div("scr-hex", "div-hex-row-4").addClass("div-row");
	div("scr-hex", "div-hex-row-5").addClass("div-row");
	btn("div-hex-row-1", "btn-hex-0", function() { onHex(0x0); }, "0");
	btn("div-hex-row-1", "btn-hex-1", function() { onHex(0x1); }, "1");
	btn("div-hex-row-1", "btn-hex-2", function() { onHex(0x2); }, "2");
	btn("div-hex-row-1", "btn-hex-3", function() { onHex(0x3); }, "3");
	btn("div-hex-row-2", "btn-hex-4", function() { onHex(0x4); }, "4");
	btn("div-hex-row-2", "btn-hex-5", function() { onHex(0x5); }, "5");
	btn("div-hex-row-2", "btn-hex-6", function() { onHex(0x6); }, "6");
	btn("div-hex-row-2", "btn-hex-7", function() { onHex(0x7); }, "7");
	btn("div-hex-row-3", "btn-hex-8", function() { onHex(0x8); }, "8");
	btn("div-hex-row-3", "btn-hex-9", function() { onHex(0x9); }, "9");
	btn("div-hex-row-3", "btn-hex-a", function() { onHex(0xA); }, "A");
	btn("div-hex-row-3", "btn-hex-b", function() { onHex(0xB); }, "B");
	btn("div-hex-row-4", "btn-hex-c", function() { onHex(0xC); }, "C");
	btn("div-hex-row-4", "btn-hex-d", function() { onHex(0xD); }, "D");
	btn("div-hex-row-4", "btn-hex-e", function() { onHex(0xE); }, "E");
	btn("div-hex-row-4", "btn-hex-f", function() { onHex(0xF); }, "F");
	btn("div-hex-row-5", "btn-hex-clear", onHexClear, "clear");

	scr("scr-roman");
	div("scr-roman", "div-roman-field").addClass("div-field");
	div("div-roman-field", "lbl-roman-dec");
	div("div-roman-field", "lbl-roman-converts");
	div("div-roman-field", "lbl-roman-rom");
	div("scr-roman", "div-roman-row-1").addClass("div-row");
	div("scr-roman", "div-roman-row-2").addClass("div-row");
	div("scr-roman", "div-roman-row-3").addClass("div-row");
	div("scr-roman", "div-roman-row-4").addClass("div-row");
	div("scr-roman", "div-roman-row-5").addClass("div-row");
	div("scr-roman", "div-roman-row-6").addClass("div-row");
	btn("div-roman-row-1", "btn-roman-0", function() { onRomanDigit("0"); }, "0");
	btn("div-roman-row-1", "btn-roman-1", function() { onRomanDigit("1"); }, "1");
	btn("div-roman-row-2", "btn-roman-2", function() { onRomanDigit("2"); }, "2");
	btn("div-roman-row-2", "btn-roman-3", function() { onRomanDigit("3"); }, "3");
	btn("div-roman-row-3", "btn-roman-4", function() { onRomanDigit("4"); }, "4");
	btn("div-roman-row-3", "btn-roman-5", function() { onRomanDigit("5"); }, "5");
	btn("div-roman-row-4", "btn-roman-6", function() { onRomanDigit("6"); }, "6");
	btn("div-roman-row-4", "btn-roman-7", function() { onRomanDigit("7"); }, "7");
	btn("div-roman-row-5", "btn-roman-8", function() { onRomanDigit("8"); }, "8");
	btn("div-roman-row-5", "btn-roman-9", function() { onRomanDigit("9"); }, "9");
	btn("div-roman-row-1", "btn-roman-i", function() { onRomanNumeral("I"); }, "I");
	btn("div-roman-row-1", "btn-roman-v", function() { onRomanNumeral("V"); }, "V");
	btn("div-roman-row-2", "btn-roman-x", function() { onRomanNumeral("X"); }, "X");
	btn("div-roman-row-2", "btn-roman-l", function() { onRomanNumeral("L"); }, "L");
	btn("div-roman-row-3", "btn-roman-c", function() { onRomanNumeral("C"); }, "C");
	btn("div-roman-row-3", "btn-roman-d", function() { onRomanNumeral("D"); }, "D");
	btn("div-roman-row-4", "btn-roman-m", function() { onRomanNumeral("M"); }, "M");
	btn("div-roman-row-4", "btn-roman-n", function() { onRomanNumeral("N"); }, "N");
	btn("div-roman-row-5", "btn-roman-s", function() { onRomanNumeral("S"); }, "S");
	btn("div-roman-row-5", "btn-roman-uncia", function() { onRomanNumeral("\u2022"); }, "\u2022");
	btn("div-roman-row-6", "btn-roman-point", function() { onRomanDigit("."); }, ".");
	btn("div-roman-row-6", "btn-roman-clear", onRomanClear, "clear");

	scr("scr-set");
	div("scr-set", "lbl-set-title").addClass("lbl-title").text("Settings");
	div("scr-set", "div-set-rgb").addClass("div-set");
	div("scr-set", "div-set-au").addClass("div-set");
	div("scr-set", "div-set-cc").addClass("div-set");
	div("div-set-rgb", "lbl-set-rgb").text("Accent Color");
	div("div-set-au", "lbl-set-au").text("Angular Unit");
	div("div-set-cc", "lbl-set-cc").text("Circle Constant");
	item("div-set-rgb", "input", "inp-set-rgb").attr("type", "text");
	get("inp-set-rgb").on("change", function() {
	  setAccentColor(get("inp-set-rgb").val());
	});
	btn("div-set-au", "btn-set-au-turn", function() { setAU(TURN); }, "turn");
	btn("div-set-au", "btn-set-au-deg",  function() { setAU(DEG);  }, "deg");
	btn("div-set-au", "btn-set-au-rad",  function() { setAU(RAD);  }, "rad");
	btn("div-set-cc", "btn-set-cc-pi",   function() { setCC(PI);   }, "\u03C0");
	btn("div-set-cc", "btn-set-cc-tau",  function() { setCC(TAU);  }, "\u03C4");

	btn("phone", "btn-phone-home", gotoHome);

	begin();
});

// accuracy in decimal places, optional
let accuracy = 12;

// go home from any other screen
function gotoHome() {
	setScreen("scr-home");
}



// SETTINGS SCREEN //

function gotoSet() {
	setScreen("scr-set");
}

let accentColor;

function setAccentColor(color, setTxt) {
	if (setTxt) get("inp-set-rgb").val(color);
	accentColor = color;

	let b = function(s) { $(s).css(    "border-color", color); };
	let t = function(s) { $(s).css(           "color", color); };

	b("#phone");
	b(".div-field");
	t("#lbl-home-title-2");
	t("#btn-hex-bin");
	t("#btn-hex-oct");
	t("#btn-hex-hex");
	t("#btn-hex-dec");
	t("#lbl-set-rgb");
	if (currentBase) colorBases();

	setAU(currentAU);
	setCC(currentCC);
}

let DEG  = { btn: "btn-set-au-deg",  v: 2 * Math.PI / 360 };
let RAD  = { btn: "btn-set-au-rad",  v: 1 };
let TURN = { btn: "btn-set-au-turn", v: 2 * Math.PI };
let AUs = [ DEG, RAD, TURN ];

let PI   = { v: Math.PI,     btnCalc: "btn-calc-pi",  btnSet: "btn-set-cc-pi"  };
let TAU  = { v: 2 * Math.PI, btnCalc: "btn-calc-tau", btnSet: "btn-set-cc-tau" };
let CCs = [ PI, TAU ];

let currentAU;
let currentCC;

function setAU(o) {
	currentAU = o;
	if (!accentColor) return;
	for (let i = 0; i < AUs.length; i++) {
	  let au = AUs[i];
	  if (au.btn == o.btn) {
	    get(au.btn).css("color", accentColor);
	  } else {
	    get(au.btn).css("color", "#FFFFFF");
	  }
	}
}

function setCC(o) {
	currentCC = o;
	if (!accentColor) return;
	for (let i = 0; i < CCs.length; i++) {
	  let cc = CCs[i];
	  if (cc.btnSet == o.btnSet) {
	    get(cc.btnSet).css("color", accentColor);
	    get(cc.btnCalc).show();
	  } else {
	    get(cc.btnSet).css("color", "#FFFFFF");
	    get(cc.btnCalc).hide();
	  }
	}
}



// CALCULATOR SCREEN //

function gotoCalc() {
	setScreen("scr-calc");
	onCalcClear();
}

let entry = []; // array of operations

// answer last time the enter button was pressed
let calcAns = 0;

// a function that returns a function that returns r
function rFn(r) {
	return function() {return r};
}

// operation functions
// missing arctrig functions
let fnSin = function(a) {return Math.sin(a * currentAU.v);};
let fnCos = function(a) {return Math.cos(a * currentAU.v);};
let fnTan = function(a) {return Math.tan(a * currentAU.v);};
let fnLn  = Math.log;
let fnLog = Math.log10;
let fnLp = function(a) {return a;};                  // (

let fnSqrt = function(a) {return Math.pow(a, 1/2);}; // √(, \u221A
let fnSqr = function(a) {return Math.pow(a, 2);};    // ², \u00B2
let fnRcp = function(a) {return Math.pow(a, -1);};   // ⁻¹, \u207B\u00B9
let fnPow = Math.pow;                                // ^

let fnDiv = function(a, b) {return a / b;}; // ÷, \u00F7
let fnMlt = function(a, b) {return a * b;}; // ×, \u00D7
let fnSub = function(a, b) {return a - b;};
let fnAdd = function(a, b) {return a + b;};

let fnAns = function() {return calcAns;};

// operations
function Op(str, name, fn) {
	this.str  = str;
	this.name = name;
	this.fn   = fn;
}

let opSin   = new Op("sin(",         "sin",   fnSin      ); // sin(
let opCos   = new Op("cos(",         "cos",   fnCos      ); // cos(
let opTan   = new Op("tan(",         "tan",   fnTan      ); // tan(
let opLn    = new Op("ln(",          "ln",    fnLn       ); // ln(
let opLog   = new Op("log(",         "log",   fnLog      ); // log(
let opLp    = new Op("(",            "lp",    fnLp       ); // (
let opSqrt  = new Op("\u221A(",      "sqrt",  fnSqrt     ); // √(, \u221A(

let opRp    = new Op(")",            "rp",    rFn(")")   ); // )

let opSqr   = new Op("\u00B2",       "sqr",   fnSqr      ); // ², \u00B2
let opRcp   = new Op("\u207B\u00B9", "rcp",   fnRcp      ); // ⁻¹, \u207B\u00B9

let opDiv   = new Op("/",            "div",   fnDiv      ); // /  // ÷, \u00F7
let opMlt   = new Op("\u00D7",       "mlt",   fnMlt      ); // ×, \u00D7
let opSub   = new Op("\u2212",       "sub",   fnSub      ); // −, \u2212
let opAdd   = new Op("+",            "add",   fnAdd      ); // +
let opPow   = new Op("^",            "pow",   fnPow      ); // ^

// numbers and point won't actually use their callback function
// they will be parsed as strings with parseFloat()
let opPoint = new Op(".",            "point", rFn(".")   ); // .
let op0     = new Op("0",            "0",     rFn(0)     ); // 0
let op1     = new Op("1",            "1",     rFn(1)     ); // 1
let op2     = new Op("2",            "2",     rFn(2)     ); // 2
let op3     = new Op("3",            "3",     rFn(3)     ); // 3
let op4     = new Op("4",            "4",     rFn(4)     ); // 4
let op5     = new Op("5",            "5",     rFn(5)     ); // 5
let op6     = new Op("6",            "6",     rFn(6)     ); // 6
let op7     = new Op("7",            "7",     rFn(7)     ); // 7
let op8     = new Op("8",            "8",     rFn(8)     ); // 8
let op9     = new Op("9",            "9",     rFn(9)     ); // 9

let opE     = new Op("e",            "e",     rFn(Math.E)); // e
let opPi    = new Op("\u03C0",       "pi",    rFn(PI.v)  ); // π, \u03C0
let opTau   = new Op("\u03C4",       "tau",   rFn(TAU.v) ); // τ, \u03C4
let opAns   = new Op("ans",          "ans",   fnAns      ); // ans

// operations that begin a grouping
let lps = [ opSin, opCos, opTan, opLn, opLog, opLp, opSqrt ];

// unary operations
let uns = [ opSqr, opRcp ];

// binary operations
let bins = [ opDiv, opMlt, opSub, opAdd, opPow ];

// digits
let digs = [ opPoint, op0, op1, op2, op3, op4, op5, op6, op7, op8, op9 ];

// constants
let consts = [ opE, opPi, opTau, opAns ];


// math button pressed
function onOp(op) {
	entry.push(op);
	displayEntry();
}

function onCalcClear() {
	entry = [];
	get("lbl-calc-entry").text("");
	get("lbl-calc-answer").text("");
}

function onCalcEnter() {
	calcAns = tryToAnswer();
	entry = [];
	get("lbl-calc-entry").text("");
	get("lbl-calc-answer").text(calcAns);

}

function onCalcDel() {
	entry.pop();
	if (entry.length === 0) {
	  onCalcClear();
	} else {
	  displayEntry();
	}
}

function displayEntry() {
	let s = "";
	for (let i = 0; i < entry.length; i++) {
	  s += entry[i].str;
	}
	get("lbl-calc-entry").text(s);
	tryToAnswer();
}

// Array.prototype.includes() isn't working
function hasOp(arr, op) {
	for (let i = 0; i < arr.length; i++) {
	  if (arr[i].name === op.name) return true;
	}
	return false;
}

// allow answer() to not worry about errors
function tryToAnswer() {
	let r;
	try {
	  r = answer();
	} catch (e) {
	  error();
	  r = 0;
	}
	if (isNaN(r)) {
	  error();
	  r = 0;
	}
	return r;
}

function error() {
	//console.log("Error");
	get("lbl-calc-answer").text("Error");
}

// parse and solve the entry
function answer() {

	// if the entry doesn't end with something that makes sense, call off the solving then and there
	let last = entry[entry.length - 1];
	if (hasOp(lps, last) || hasOp(bins, last)) {
	  error();
	  return;
	}

	// test new array
	function logParsed() {
	  let log = "";
	  for (i = 0; i < entered.length; i++) {
	    let op = entered[i];
	    if (op.str) {
	      log += op.str;
	    } else {
	      log += op;
	    }
	  }
	  log = log.split(opSqr.str).join("sqr(").split(opRcp.str).join("rcp(").split(opDiv.str).join("/");
	  console.log(log);
	}

	// PROCEDURE
	// 1 convert unary operations to grouping operations ("x²" to "sqr(x)") in a copy of entry[]
	// 2 add in multiplication where necessary
	// 3 convert constants and digits to numbers
	// 4 repeat: find and execute the bottom operation


	// STEP 1
	// convert unary operations to grouping operations ("x²" to "sqr(x)") in a copy of entry[]

	// copy of entry[] for parsing
	let entered = entry.slice();

	// number of unary operations, for conversion
	let unCount = 0;
	for (let i = 0; i < entered.length; i++) {
	  listUns: for (let j = 0; j < uns.length; j++) {
	    if (entry[i].name === uns[j].name) {
	      unCount++;
	      break listUns;
	    }
	  }
	}

	// splice something into entered[]
	function spliceOp(index, op) {
	  entered.splice(index, 0, op);
	}

	// now convert all uns to more lps
	for (i = 0; i < unCount; i++) {

	  // find the index of the operation

	  let undex;
	  let unsFound = 0;
	  for (let k = 0; k < entered.length; k++) {
	    if (hasOp(uns, entered[k])) {
	      unsFound++;
	      if (unsFound === i + 1) {
	        undex = k;
	      }
	    }
	  }

	  let un = entered[undex];


	  // find where the lp should be placed on the left of the function

	  // switch the un to an rp
	  // this has to go before the rest of entered[] in modified
	  entered[undex] = opRp;

	  // if the un is applied to a constant, put the lp right before the constant
	  if (hasOp(consts, entered[undex - 1])) {
	    spliceOp(undex - 1, un);

	  // if the un is applied to a number, find the start of the number and put it there
	  } else if (hasOp(digs, entered[undex - 1])) {
	    let foundIt = false;
	    findIt: for (k = undex - 2; k >= 0; k--) {
	      if (!hasOp(digs, entered[k])) {
	        spliceOp(k + 1, un);
	        foundIt = true;
	        break findIt;
	      }
	    }
	    if (!foundIt) {
	      spliceOp(0, un);
	    }

	  // if the un is applied to a group, find the left grouper and splice there
	  } else if (entered[undex - 1].name === opRp.name) {
	    let foundLp = false;
	    let depth = 1;
	    findLp: for (k = undex - 2; k >= 0; k--) {
	      if (hasOp(lps, entered[k]) || hasOp(uns, entered[k])) {
	        depth--;
	        if (depth === 0) {
	          spliceOp(k, un);
	          foundLp = true;
	          break findLp;
	        }
	      } else if (entered[k].name === opRp.name) {
	        depth++;
	      }
	    }
	    if (!foundLp) {
	      spliceOp(0, un);
	    }

	  }
	}


	// STEP 2
	// add in multiplication where necessary
	// remember, all uns are lps now

	for (i = 1; i < entered.length; i++) {

	  // compare a pair of operations to see if they need to multiply
	  let first = entered[i - 1];
	  let second = entered[i];

	  let spliceAtI = false;

	  // if the first is [], then splice if the second is []
	  if (hasOp(digs, first)) {
	    spliceAtI = hasOp(lps, second) || hasOp(uns, second) || hasOp(consts, second);
	  } else if (hasOp(consts, first) || opRp.name === first.name) {
	    spliceAtI = hasOp(lps, second) || hasOp(uns, second) || hasOp(consts, second) || hasOp(digs, second);
	  }

	  if (spliceAtI) spliceOp(i, opMlt);

	}


	// STEP 3
	// convert constants and digits to numbers

	// array of pairs of indexes, of start and end points of digit strings
	// if entered is "(23)", digIndexes is [[1,3]]
	let digIndexes = [];
	// if last item was a digit
	let wasOnDig = false;
	// beginnig index of last index pair
	let beginning = 0;

	// find digits and convert constants
	for (i = 0; i < entered.length; i++) {
	  let op = entered[i];

	  if (hasOp(digs, op)) {
	    if (!wasOnDig) {
	      beginning = i;
	    }
	    wasOnDig = true;
	  } else {
	    if (wasOnDig) {
	      digIndexes.push([beginning, i]);
	    }
	    wasOnDig = false;
	  }

	  if (hasOp(consts, op)) entered[i] = op.fn();
	}
	if (wasOnDig) {
	  digIndexes.push([beginning, entered.length]);
	}

	// convert digits
	for (i = digIndexes.length - 1; i >= 0; i--) {
	  let is = digIndexes[i];
	  let toParse = "";
	  for (let l = is[0]; l < is[1]; l++) {
	    toParse += entered[l].str;
	  }
	  let parsed = parseFloat(toParse);
	  entered.splice(is[0], is[1] - is[0], parsed);
	}


	// STEP 4
	// repeat: find and execute the bottom operation
	// beware: not all members of entered[] are objects anymore; some are numbers

	// find (first) most deeply grouped indexes in entered[]
	// if array is "(3+2)", function will return [1,4]
	function deepestPlace() {
	  let deepest = 0;
	  let depth = 0;
	  let prevDepth = 0;
	  let deepestIndexStart = 0;
	  let deepestIndexEnd = entered.length;
	  let inPlace = true;
	  for (let i = 0; i < entered.length; i++) {
	    let op = entered[i];

	    if (op.name) {
	      if (hasOp(lps, op) || hasOp(uns, op)) depth++;
	      if (opRp.name === op.name)            depth--;
	    }

	    if (depth > deepest) {
	      deepest = depth;
	      deepestIndexStart = i + 1;
	      inPlace = true;
	    } else if (prevDepth === deepest && depth === deepest - 1 && inPlace) {
	      deepestIndexEnd = i;
	      inPlace = false;
	    }

	    prevDepth = depth;
	  }
	  return [deepestIndexStart, deepestIndexEnd];
	}

	// evaluate
	let dontBeInfinite = 0;

	evaluate: while(entered.length > 1) {
	  let place = deepestPlace();

	  // if the place is one item long , evaluate the grouping function
	  if (place[0] > 0 && place[1] - place[0] <= 1) {
	    let y = entered[place[0] - 1].fn(entered[place[0]]);
	    entered.splice(place[0] - 1, 3, y);
	    continue evaluate;
	  }

	  // if the place has any unary minus signs, get 'em
	  let changedArray = false;
	  for (i = place[1] - 1; i >= place[0]; i--) {
	    if (entered[i].name === opSub.name) {
	      //console.log("minus at " + i);
	      if (i === 0 || hasOp(lps, entered[i - 1]) || hasOp(uns, entered[i - 1]) || hasOp(bins, entered[i - 1])) {
	        changedArray = true;
	        entered.splice(i, 2, entered[i + 1] * -1);
	      }
	    }
	  }
	  if (changedArray) continue evaluate;

	  // if the place uses binary operations, evaluate them with (G)EMA

	  // M in GEMA
	  let oopM = [ opMlt, opDiv ];

	  // A in GEMA
	  let oopA = [ opAdd, opSub ];

	  // first, opPow
	  // remember: opPow is right associative (a^b^c = a^(b^c))
	  for (i = place[1] - 2; i > place[0]; i--) {
	    if (entered[i].name === opPow.name) {
	      entered.splice(i - 1, 3, opPow.fn(entered[i - 1], entered[i + 1]));
	      changedArray = true;
	    }
	  }
	  if (changedArray) continue evaluate;

	  // second, multiplication/division
	  for (i = place[0] + 1; i < place[1] - 1; i++) {
	    for (let o = 0; o < oopM.length; o++) {
	      if (entered[i].name === oopM[o].name) {
	        entered.splice(i - 1, 3, oopM[o].fn(entered[i - 1], entered[i + 1]));
	        continue evaluate;
	      }
	    }
	  }

	  // third, addition/subtraction
	  for (i = place[0] + 1; i < place[1] - 1; i++) {
	    for (let p = 0; p < oopA.length; p++) {
	      if (entered[i].name === oopA[p].name) {
	        entered.splice(i - 1, 3, oopA[p].fn(entered[i - 1], entered[i + 1]));
	        continue evaluate;
	      }
	    }
	  }

	  if (dontBeInfinite++ > 1024) {
	    console.warn("Prevented infinite loop!");
	    break evaluate;
	  }
	}

	let theAnswer;
	if (accuracy) {
		let a = Math.pow(10, accuracy);
		theAnswer = Math.round(a * entered[0]) / a;
	} else {
		theAnswer = entered[0];
	}

	// finally, display answer
	get("lbl-calc-answer").text(theAnswer);

	if (theAnswer == 5318008 || theAnswer == 8008135) {
		get("lbl-calc-answer").text(("\uD83C\uDF48").repeat(2));
	}

	return theAnswer;

}



// PROGRAMMER SCREEN //

function gotoHex() {
	setBase(DEC);
	setScreen("scr-hex");
}

// pseudo-enum
let BIN = {r: 0x02, s: "BIN", btn: "btn-hex-bin", lbl: "lbl-hex-bin"};
let OCT = {r: 0x08, s: "OCT", btn: "btn-hex-oct", lbl: "lbl-hex-oct"};
let DEC = {r: 0x0A, s: "DEC", btn: "btn-hex-dec", lbl: "lbl-hex-dec"};
let HEX = {r: 0x10, s: "HEX", btn: "btn-hex-hex", lbl: "lbl-hex-hex"};
let bases = [BIN, OCT, HEX, DEC];

let bL = "[ ";
let bR = " ]";
let currentBase;

function colorBases() {
	for (let i = 0; i < bases.length; i++) {
	  let base = bases[i];
	  if (base.r === currentBase.r) {
	    get(base.btn).css("color", accentColor);
	  } else {
	    get(base.btn).css("color", "");
	  }
	}

	// highlight digit buttons
	for (let i = 0; i < 0x10; i++) {
		let b = get("btn-hex-" + i.toString(0x10).toLowerCase());
		if (i < currentBase.r) {
			b.removeClass("hex-unused");
		} else {
			b.addClass("hex-unused");
		}
	}
}

function onHex(n) {
	if (n >= currentBase.r) return;
	if (currentBase.r === 2) {
	  let bin = get(BIN.lbl).text().split(" ").join("");
	  if (bin === "") bin = "0000";
	  bin = parseInt(bin, 2).toString(2);
	  bin = formatBin(bin + n.toString(2));
	  get(BIN.lbl).text(bin);
	} else {
	  get(currentBase.lbl).text(get(currentBase.lbl).text() + n.toString(currentBase.r).toUpperCase());
	}
	convertFrom(currentBase);
}

function setBase(o) {
	onHexClear();
	currentBase = o;
	for (let i = 0; i < bases.length; i++) {
	  let base = bases[i];
	  get(base.btn).val(base.s);
	}
	get(o.btn).val(bL + o.s + bR);
	colorBases();
}

function convertFrom(o) {
	for (let i = 0; i < bases.length; i++) {
	  let base = bases[i];
	  if (base.r === o.r) continue;
	  let n = 0;
	  let str = get(o.lbl).text().split(" ").join("");
	  n = parseInt(str, o.r).toString(base.r).toUpperCase();
	  if (base.r === 2) {
	    n = formatBin(n);
	  }
	  get(base.lbl).text(n);
	}
}

function formatBin(n) {
	if (n === "") return n;
	while (n.length % 4 !== 0) n = "0" + n;
	return n.match(/.{1,4}/g).join(" ");
}

function onHexClear() {
	for (let i = 0; i < bases.length; i++) {
	  get(bases[i].lbl).text("");
	}
}



// ROMAN SCREEN //

function gotoRoman() {
	onRomanClear();
	setScreen("scr-roman");
}

let fontSizeSmall = 20;
let fontSizeNormal = 32;
let romanMaxLength = 8;
let lastFieldWasRoman = false; // true if the previous number button pressed was on the Roman side

// Roman numeral character sets
let UNCIAE    = [];
for (let i = 0; i < 12; i++) UNCIAE.push(((i >= 6)? "S" : "") + "\u2022".repeat(i % 6));
let ONES      = [ "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX" ];
let TENS      = [ "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC" ];
let HUNDREDS  = [ "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM" ];
let THOUSANDS = [ "", "M", "MM", "MMM"];

// when you press a Hindu-Arabic button
function onRomanDigit(n) {
	lastFieldWasRoman = false;
	if (n !== undefined && !(n == "." && get("lbl-roman-dec").text().includes("."))) {
	  get("lbl-roman-dec").text(get("lbl-roman-dec").text() + n);
	}
	// convert dec to rom
	let dec = get("lbl-roman-dec").text();
	let rom = ""; // output string
	if (parseFloat(dec) < 4000) {
	  let whole = parseInt(dec).toString();
	  if (whole > 0) {
	    while (whole.length < 4) whole = "0" + whole;
	    rom += THOUSANDS[whole.charAt(0)];
	    rom += HUNDREDS[whole.charAt(1)];
	    rom += TENS[whole.charAt(2)];
	    rom += ONES[whole.charAt(3)];
	  }
	  let fraction = parseFloat(dec) % 1;
	  if (fraction) {
	    let uncia = Math.round(fraction * 12);
	    if (uncia >= 12) uncia--;
	    rom += UNCIAE[uncia];
	  }
	  get("lbl-roman-rom").text(rom);
	} else {
	  get("lbl-roman-rom").text("");
	}
	romanCheckSizes();
}

// when you click a Roman button
function onRomanNumeral(s) {
	lastFieldWasRoman = true;
	if (s) {
	  get("lbl-roman-rom").text(get("lbl-roman-rom").text() + s);
	}
	// convert rom to dec
	let rom = get("lbl-roman-rom").text();
	let isANumber = true;
	let isN;
	let dec = 0;
	if (rom == "N") {
	  isN = true;
	  isANumber = false;
	}
	let places = [
	  {num: THOUSANDS, val: 1000},
	  {num: HUNDREDS,  val: 100},
	  {num: TENS,      val: 10},
	  {num: ONES,      val: 1},
	  {num: UNCIAE,    val: 1/12}
	];
	for (let p = 0; p < places.length; p++) {
	  let place = places[p];
	  num: for (let i = place.num.length - 1; i >= 0; i--) {
	    if (rom.substring(0, place.num[i].length) == place.num[i]) {
	      dec += place.val * i;
	      rom = rom.substring(place.num[i].length);
	      break num;
	    }
	  }
	}
	if (rom !== "") isANumber = false;
	if (isANumber) {
	  get("lbl-roman-dec").text(Math.round(100 * dec) / 100);
	} else if (isN) {
	  get("lbl-roman-dec").text(0);
	} else {
	  get("lbl-roman-dec").text("");
	}
	romanCheckSizes();
}

// clear fields
function onRomanClear() {
	get("lbl-roman-dec").text("");
	get("lbl-roman-rom").text("");
}

// adjust field sise
function romanCheckSizes() {
	let dec = get("lbl-roman-dec").text();
	let rom = get("lbl-roman-rom").text();
	if (dec.length > romanMaxLength) {
	  get("lbl-roman-dec").css("font-size", fontSizeSmall);
	} else {
	  get("lbl-roman-dec").css("font-size", fontSizeNormal);
	}
	if (rom.length > romanMaxLength) {
	  get("lbl-roman-rom").css("font-size", fontSizeSmall);
	} else {
	  get("lbl-roman-rom").css("font-size", fontSizeNormal);
	}
}



// BEGIN! //

function begin() {
	setAU(RAD);
	setCC(TAU);
	setAccentColor("#C00000", true);
	setBase(DEC);

	gotoHome();
}
