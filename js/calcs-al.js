/*
 * Calculator Supreme (App Lab port)
 * (c) 2018 Gramkraxor
 */



// APP LAB FUNCTIONS //
function get(id) {
	return $("#" + id);
}
function onEvent(id, e, fn) {
	get(id).on(e, fn);
}
function setProperty(id, prop, val) {
	if (prop == "text-color") prop = "color";
	get(id).css(prop, val);
}
function setText(id, txt) {
	get(id).val(txt).text(txt);
}
function getText(id) {
	return get(id).val();
}
function hideElement(id) {
	get(id).hide();
}
function showElement(id) {
	get(id).show();
}
function setScreen(id) {
	$(".scr").hide();
	get(id).show();
}



// APP LAB/DESIGN //
$(function() {

	function item(parent, tag, id) {
		var i = $("<" + tag + ">");
		if (id)  i.attr("id", id);
		get(parent).append(i);
		return i;
	}

	function scr(id) {
		i = $("<div>").addClass("scr").attr("id", id);
		$("body")
			//.append(id)
			.append(i)
		;
		return i;
	}

	function button(parent, id, val) {
		var i = item(parent, "input", id).attr("type", "button");
		if (val) i.val(val);
		return i;
	}

	function div(parent, id) {
		var i = item(parent, "div", id);
		return i;
	}

	scr("scr-home");
	div("scr-home", "lbl-home-title-1").addClass("lbl-title").text("Calculator");
	div("scr-home", "lbl-home-title-2").addClass("lbl-title").text("Supreme");
	button("scr-home", "btn-home-goto-calc", "Calculator");
	button("scr-home", "btn-home-goto-hex", "Programmer");
	button("scr-home", "btn-home-goto-roman", "Roman Numeral");
	button("scr-home", "btn-home-goto-set");

	scr("scr-calc");
	div("scr-calc", "div-calc-field").addClass("div-field");
	div("div-calc-field", "lbl-calc-entry");
	div("div-calc-field", "lbl-calc-answer");
	div("scr-calc", "lbl-calc-accent-1").addClass("accent-stripe");
	div("scr-calc", "div-calc-row-1").addClass("div-row");
	div("scr-calc", "div-calc-row-2").addClass("div-row");
	div("scr-calc", "div-calc-row-3").addClass("div-row");
	div("scr-calc", "div-calc-row-4").addClass("div-row");
	div("scr-calc", "div-calc-row-5").addClass("div-row");
	div("scr-calc", "div-calc-row-6").addClass("div-row");
	div("scr-calc", "div-calc-row-7").addClass("div-row");
	button("div-calc-row-1", "btn-calc-e",     "e");
	button("div-calc-row-1", "btn-calc-sin",   "sin(");
	button("div-calc-row-1", "btn-calc-cos",   "cos(");
	button("div-calc-row-1", "btn-calc-tan",   "tan(");
	button("div-calc-row-1", "btn-calc-pi",    "\u03C0");
	button("div-calc-row-1", "btn-calc-tau",   "\u03C4");
	button("div-calc-row-2", "btn-calc-ln",    "ln(");
	button("div-calc-row-2", "btn-calc-log",   "log(");
	button("div-calc-row-2", "btn-calc-lp",    "(");
	button("div-calc-row-2", "btn-calc-rp",    ")");
	button("div-calc-row-2", "btn-calc-div",   "\u00F7");
	button("div-calc-row-3", "btn-calc-sqrt",  "\u221A(");
	button("div-calc-row-3", "btn-calc-7",     "7");
	button("div-calc-row-3", "btn-calc-8",     "8");
	button("div-calc-row-3", "btn-calc-9",     "9");
	button("div-calc-row-3", "btn-calc-mlt",   "\u00D7");
	button("div-calc-row-4", "btn-calc-sqr",   "\u00B2");
	button("div-calc-row-4", "btn-calc-4",     "4");
	button("div-calc-row-4", "btn-calc-5",     "5");
	button("div-calc-row-4", "btn-calc-6",     "6");
	button("div-calc-row-4", "btn-calc-sub",   "\u2212");
	button("div-calc-row-5", "btn-calc-rcp",   "\u207B\u00B9");
	button("div-calc-row-5", "btn-calc-1",     "1");
	button("div-calc-row-5", "btn-calc-2",     "2");
	button("div-calc-row-5", "btn-calc-3",     "3");
	button("div-calc-row-5", "btn-calc-add",   "+");
	button("div-calc-row-6", "btn-calc-pow",   "^");
	button("div-calc-row-6", "btn-calc-point", ".");
	button("div-calc-row-6", "btn-calc-0",     "0");
	button("div-calc-row-6", "btn-calc-ans",   "ans");
	button("div-calc-row-7", "btn-calc-clear", "clear");
	button("div-calc-row-7", "btn-calc-del",   "del");
	button("div-calc-row-7", "btn-calc-home");
	button("div-calc-row-7", "btn-calc-enter", "enter");

	scr("scr-set");
	div("scr-set", "lbl-set-title").addClass("lbl-title").text("Settings");
	div("scr-set", "div-set-rgb").addClass("div-set");
	div("scr-set", "div-set-au").addClass("div-set");
	div("scr-set", "div-set-cc").addClass("div-set");
	div("div-set-rgb", "lbl-set-rgb").text("Accent Color");
	div("div-set-au", "lbl-set-au").text("Angular Unit");
	div("div-set-cc", "lbl-set-cc").text("Circle Constant");
	item("div-set-rgb", "input", "inp-set-rgb").attr("type", "text");
	button("div-set-au", "btn-set-au-rad", "rad");
	button("div-set-au", "btn-set-au-deg", "deg");
	button("div-set-au", "btn-set-au-turn", "turn");
	button("div-set-cc", "btn-set-cc-pi", "\u03C0");
	button("div-set-cc", "btn-set-cc-tau", "\u03C4");
	button("scr-set", "btn-set-home");

	scr("scr-hex");
	div("scr-hex", "div-hex-field").addClass("div-field");
	div("div-hex-field", "scr-hex-bin");
	div("div-hex-field", "scr-hex-oct");
	div("div-hex-field", "scr-hex-dec");
	div("div-hex-field", "scr-hex-hex");
	button("scr-hex-bin", "btn-hex-bin", "BIN");
	button("scr-hex-oct", "btn-hex-oct", "OCT");
	button("scr-hex-dec", "btn-hex-dec", "DEC");
	button("scr-hex-hex", "btn-hex-hex", "HEX");
	div("scr-hex-bin", "lbl-hex-bin");
	div("scr-hex-oct", "lbl-hex-oct");
	div("scr-hex-dec", "lbl-hex-dec");
	div("scr-hex-hex", "lbl-hex-hex");
	div("scr-hex", "lbl-hex-accent-1").addClass("accent-stripe");
	div("scr-hex", "div-hex-row-1").addClass("div-row");
	div("scr-hex", "div-hex-row-2").addClass("div-row");
	div("scr-hex", "div-hex-row-3").addClass("div-row");
	div("scr-hex", "div-hex-row-4").addClass("div-row");
	div("scr-hex", "div-hex-row-5").addClass("div-row");
	button("div-hex-row-1", "btn-hex-0", "0");
	button("div-hex-row-1", "btn-hex-1", "1");
	button("div-hex-row-1", "btn-hex-2", "2");
	button("div-hex-row-1", "btn-hex-3", "3");
	button("div-hex-row-2", "btn-hex-4", "4");
	button("div-hex-row-2", "btn-hex-5", "5");
	button("div-hex-row-2", "btn-hex-6", "6");
	button("div-hex-row-2", "btn-hex-7", "7");
	button("div-hex-row-3", "btn-hex-8", "8");
	button("div-hex-row-3", "btn-hex-9", "9");
	button("div-hex-row-3", "btn-hex-a", "A");
	button("div-hex-row-3", "btn-hex-b", "B");
	button("div-hex-row-4", "btn-hex-c", "C");
	button("div-hex-row-4", "btn-hex-d", "D");
	button("div-hex-row-4", "btn-hex-e", "E");
	button("div-hex-row-4", "btn-hex-f", "F");
	button("div-hex-row-5", "btn-hex-home");
	button("div-hex-row-5", "btn-hex-clear", "clear");

	scr("scr-roman");
	div("scr-roman", "div-roman-field").addClass("div-field");
	div("div-roman-field", "lbl-roman-dec");
	div("div-roman-field", "lbl-roman-converts");
	div("div-roman-field", "lbl-roman-rom");
	div("scr-roman", "lbl-roman-accent-1").addClass("accent-stripe");
	div("scr-roman", "div-roman-row-1").addClass("div-row");;
	div("scr-roman", "div-roman-row-2").addClass("div-row");;
	div("scr-roman", "div-roman-row-3").addClass("div-row");;
	div("scr-roman", "div-roman-row-4").addClass("div-row");;
	div("scr-roman", "div-roman-row-5").addClass("div-row");;
	div("scr-roman", "div-roman-row-6").addClass("div-row");;
	button("div-roman-row-1", "btn-roman-0", "0");
	button("div-roman-row-1", "btn-roman-1", "1");
	button("div-roman-row-2", "btn-roman-2", "2");
	button("div-roman-row-2", "btn-roman-3", "3");
	button("div-roman-row-3", "btn-roman-4", "4");
	button("div-roman-row-3", "btn-roman-5", "5");
	button("div-roman-row-4", "btn-roman-6", "6");
	button("div-roman-row-4", "btn-roman-7", "7");
	button("div-roman-row-5", "btn-roman-8", "8");
	button("div-roman-row-5", "btn-roman-9", "9");
	button("div-roman-row-1", "btn-roman-i", "I");
	button("div-roman-row-1", "btn-roman-v", "V");
	button("div-roman-row-2", "btn-roman-x", "X");
	button("div-roman-row-2", "btn-roman-l", "L");
	button("div-roman-row-3", "btn-roman-c", "C");
	button("div-roman-row-3", "btn-roman-d", "D");
	button("div-roman-row-4", "btn-roman-m", "M");
	button("div-roman-row-4", "btn-roman-n", "N");
	button("div-roman-row-5", "btn-roman-s", "S");
	button("div-roman-row-5", "btn-roman-uncia", "\u2022");
	button("div-roman-row-6", "btn-roman-point", ".");
	button("div-roman-row-6", "btn-roman-home");
	button("div-roman-row-6", "btn-roman-clear", "clear");


	// BUTTONS //

	btn("btn-home-goto-calc",  gotoCalc);
	btn("btn-home-goto-hex",   gotoHex);
	btn("btn-home-goto-roman", gotoRoman);
	btn("btn-home-goto-set",   gotoSet);

	btn("btn-set-au-deg",  function() {setAU(DEG);});
	btn("btn-set-au-rad",  function() {setAU(RAD);});
	btn("btn-set-au-turn", function() {setAU(TURN);});
	btn("btn-set-cc-pi",  function() {setCC(PI);});
	btn("btn-set-cc-tau", function() {setCC(TAU);});
	btn("btn-set-home", gotoHome);
	onEvent("inp-set-rgb", "change", function() {
	  setAccentColor(getText("inp-set-rgb"));
	});

	btn("btn-calc-e",     function() {onOp(opE    );});
	btn("btn-calc-sin",   function() {onOp(opSin  );});
	btn("btn-calc-cos",   function() {onOp(opCos  );});
	btn("btn-calc-tan",   function() {onOp(opTan  );});
	btn("btn-calc-pi",    function() {onOp(opPi   );});
	btn("btn-calc-tau",   function() {onOp(opTau  );});
	btn("btn-calc-ln",    function() {onOp(opLn   );});
	btn("btn-calc-log",   function() {onOp(opLog  );});
	btn("btn-calc-lp",    function() {onOp(opLp   );});
	btn("btn-calc-rp",    function() {onOp(opRp   );});
	btn("btn-calc-div",   function() {onOp(opDiv  );});
	btn("btn-calc-sqrt",  function() {onOp(opSqrt );});
	btn("btn-calc-7",     function() {onOp(op7    );});
	btn("btn-calc-8",     function() {onOp(op8    );});
	btn("btn-calc-9",     function() {onOp(op9    );});
	btn("btn-calc-mlt",   function() {onOp(opMlt  );});
	btn("btn-calc-sqr",   function() {onOp(opSqr  );});
	btn("btn-calc-4",     function() {onOp(op4    );});
	btn("btn-calc-5",     function() {onOp(op5    );});
	btn("btn-calc-6",     function() {onOp(op6    );});
	btn("btn-calc-sub",   function() {onOp(opSub  );});
	btn("btn-calc-rcp",   function() {onOp(opRcp  );});
	btn("btn-calc-1",     function() {onOp(op1    );});
	btn("btn-calc-2",     function() {onOp(op2    );});
	btn("btn-calc-3",     function() {onOp(op3    );});
	btn("btn-calc-add",   function() {onOp(opAdd  );});
	btn("btn-calc-pow",   function() {onOp(opPow  );});
	btn("btn-calc-point", function() {onOp(opPoint);});
	btn("btn-calc-0",     function() {onOp(op0    );});
	btn("btn-calc-ans",   function() {onOp(opAns  );});
	btn("btn-calc-enter", onCalcEnter);
	btn("btn-calc-clear", onCalcClear);
	btn("btn-calc-del",   onCalcDel);
	btn("btn-calc-home",  gotoHome);

	btn(BIN.btn, function() {setBase(BIN)});
	btn(OCT.btn, function() {setBase(OCT)});
	btn(HEX.btn, function() {setBase(HEX)});
	btn(DEC.btn, function() {setBase(DEC)});
	btn("btn-hex-0", function() {onHex(0x0);});
	btn("btn-hex-1", function() {onHex(0x1);});
	btn("btn-hex-2", function() {onHex(0x2);});
	btn("btn-hex-3", function() {onHex(0x3);});
	btn("btn-hex-4", function() {onHex(0x4);});
	btn("btn-hex-5", function() {onHex(0x5);});
	btn("btn-hex-6", function() {onHex(0x6);});
	btn("btn-hex-7", function() {onHex(0x7);});
	btn("btn-hex-8", function() {onHex(0x8);});
	btn("btn-hex-9", function() {onHex(0x9);});
	btn("btn-hex-a", function() {onHex(0xA);});
	btn("btn-hex-b", function() {onHex(0xB);});
	btn("btn-hex-c", function() {onHex(0xC);});
	btn("btn-hex-d", function() {onHex(0xD);});
	btn("btn-hex-e", function() {onHex(0xE);});
	btn("btn-hex-f", function() {onHex(0xF);});
	btn("btn-hex-clear", onHexClear);
	btn("btn-hex-home", gotoHome);

	btn("btn-roman-0", function() {onRomanDigit("0");});
	btn("btn-roman-1", function() {onRomanDigit("1");});
	btn("btn-roman-2", function() {onRomanDigit("2");});
	btn("btn-roman-3", function() {onRomanDigit("3");});
	btn("btn-roman-4", function() {onRomanDigit("4");});
	btn("btn-roman-5", function() {onRomanDigit("5");});
	btn("btn-roman-6", function() {onRomanDigit("6");});
	btn("btn-roman-7", function() {onRomanDigit("7");});
	btn("btn-roman-8", function() {onRomanDigit("8");});
	btn("btn-roman-9", function() {onRomanDigit("9");});
	btn("btn-roman-point", function() {onRomanDigit(".");});
	btn("btn-roman-i", function() {onRomanNumeral("I");}); // 1
	btn("btn-roman-v", function() {onRomanNumeral("V");}); // 5
	btn("btn-roman-x", function() {onRomanNumeral("X");}); // 10
	btn("btn-roman-l", function() {onRomanNumeral("L");}); // 50
	btn("btn-roman-c", function() {onRomanNumeral("C");}); // 100
	btn("btn-roman-d", function() {onRomanNumeral("D");}); // 500
	btn("btn-roman-m", function() {onRomanNumeral("M");}); // 1000
	btn("btn-roman-n", function() {onRomanNumeral("N");}); // 0
	btn("btn-roman-s", function() {onRomanNumeral("S");}); // 0.5
	btn("btn-roman-uncia", function() {onRomanNumeral("\u2022");}); // 1/12
	btn("btn-roman-clear", onRomanClear);
	btn("btn-roman-home", gotoHome);

	begin();
});



// ORIGINAL, MOSTLY //

// accuracy in decimal places
var accuracy = 8;

// add a button with click event fn()
function btn(id, fn) {
	onEvent(id, "click", fn);
}

// go home from any other screen
function gotoHome() {
	setScreen("scr-home");
}



// SETTINGS SCREEN //

function gotoSet() {
	setScreen("scr-set");
}

var accentColor;

function setAccentColor(color, setTxt) {
	if (setTxt) setText("inp-set-rgb", color);
	accentColor = color;

	var b = function(id) {setProperty(id, "background-color", color);};
	var t = function(id) {setProperty(id, "text-color", color);};

	b("lbl-calc-accent-1");
	t("lbl-home-title-2");
	b("lbl-hex-accent-1");
	t("btn-hex-bin");
	t("btn-hex-oct");
	t("btn-hex-hex");
	t("btn-hex-dec");
	b("lbl-roman-accent-1");
	t("lbl-set-rgb");
	if (currentBase) colorBases();

	setAU(currentAU);
	setCC(currentCC);
}

// psuedo-ena
var DEG  = { btn: "btn-set-au-deg",  v: 2 * Math.PI / 360 };
var RAD  = { btn: "btn-set-au-rad",  v: 1 };
var TURN = { btn: "btn-set-au-turn", v: 2 * Math.PI };
var AUs = [ DEG, RAD, TURN ];

var PI   = { v: Math.PI,     btnCalc: "btn-calc-pi",  btnSet: "btn-set-cc-pi"  };
var TAU  = { v: 2 * Math.PI, btnCalc: "btn-calc-tau", btnSet: "btn-set-cc-tau" };
var CCs = [ PI, TAU ];

var currentAU;
var currentCC;

function setAU(o) {
	currentAU = o;
	if (!accentColor) return;
	for (var i = 0; i < AUs.length; i++) {
	  var au = AUs[i];
	  if (au.btn == o.btn) {
	    setProperty(au.btn, "text-color", accentColor);
	  } else {
	    setProperty(au.btn, "text-color", "#FFFFFF");
	  }
	}
}

function setCC(o) {
	currentCC = o;
	if (!accentColor) return;
	for (var i = 0; i < CCs.length; i++) {
	  var cc = CCs[i];
	  if (cc.btnSet == o.btnSet) {
	    setProperty(cc.btnSet, "text-color", accentColor);
	    showElement(cc.btnCalc);
	  } else {
	    setProperty(cc.btnSet, "text-color", "#FFFFFF");
	    hideElement(cc.btnCalc);
	  }
	}
}



// CALCULATOR SCREEN //

function gotoCalc() {
	setScreen("scr-calc");
	onCalcClear();
}

var entry = []; // array of operations

// answer last time the enter button was pressed
var calcAns = 0;

// function that returns a function that returns r
function rFn(r) {
	return function() {return r};
}

// operation functions
// I feel like I'm missing arctrig functions
var fnSin = function(a) {return Math.sin(a * currentAU.v);};
var fnCos = function(a) {return Math.cos(a * currentAU.v);};
var fnTan = function(a) {return Math.tan(a * currentAU.v);};
var fnLn = Math.log;
// Math.log10 isn't working...
//var fnLog = Math.log10;
var fnLog = function(a) {return Math.log(a)/Math.log(10);};
var fnLp = function(a) {return a;};                  // (

var fnSqrt = function(a) {return Math.pow(a, 1/2);}; // √(, \u221A
var fnSqr = function(a) {return Math.pow(a, 2);};    // ², \u00B2
var fnRcp = function(a) {return Math.pow(a, -1);};   // ⁻¹, \u207B\u00B9
var fnPow = Math.pow;                                // ^

var fnDiv = function(a, b) {return a / b;}; // ÷, \u00F7
var fnMlt = function(a, b) {return a * b;}; // ×, \u00D7
var fnSub = function(a, b) {return a - b;};
var fnAdd = function(a, b) {return a + b;};

var fnAns = function() {return calcAns;};

// operations
function Op(str, name, fn) {
	return {str: str, name: name, fn: fn};
}

var opSin   = Op("sin(",         "sin",   fnSin      ); // sin(
var opCos   = Op("cos(",         "cos",   fnCos      ); // cos(
var opTan   = Op("tan(",         "tan",   fnTan      ); // tan(
var opLn    = Op("ln(",          "ln",    fnLn       ); // ln(
var opLog   = Op("log(",         "log",   fnLog      ); // log(
var opLp    = Op("(",            "lp",    fnLp       ); // (
var opSqrt  = Op("\u221A(",      "sqrt",  fnSqrt     ); // √(, \u221A(

var opRp    = Op(")",            "rp",    rFn(")")   ); // )

var opSqr   = Op("\u00B2",       "sqr",   fnSqr      ); // ², \u00B2
var opRcp   = Op("\u207B\u00B9", "rcp",   fnRcp      ); // ⁻¹, \u207B\u00B9

var opDiv   = Op("\u00F7",       "div",   fnDiv      ); // ÷, \u00F7
var opMlt   = Op("\u00D7",       "mlt",   fnMlt      ); // ×, \u00D7
var opSub   = Op("\u2212",       "sub",   fnSub      ); // −, \u2212
var opAdd   = Op("+",            "add",   fnAdd      ); // +
var opPow   = Op("^",            "pow",   fnPow      ); // ^

// numbers and point won't actaully use their callback function
// they will be parsed as numbers with parseFloat()
var opPoint = Op(".",            "point", rFn(".")   ); // .
var op0     = Op("0",            "0",     rFn(0)     ); // 0
var op1     = Op("1",            "1",     rFn(1)     ); // 1
var op2     = Op("2",            "2",     rFn(2)     ); // 2
var op3     = Op("3",            "3",     rFn(3)     ); // 3
var op4     = Op("4",            "4",     rFn(4)     ); // 4
var op5     = Op("5",            "5",     rFn(5)     ); // 5
var op6     = Op("6",            "6",     rFn(6)     ); // 6
var op7     = Op("7",            "7",     rFn(7)     ); // 7
var op8     = Op("8",            "8",     rFn(8)     ); // 8
var op9     = Op("9",            "9",     rFn(9)     ); // 9

var opE     = Op("e",            "e",     rFn(Math.E)); // e
var opPi    = Op("\u03C0",       "pi",    rFn(PI.v)  ); // π, \u03C0
var opTau   = Op("\u03C4",       "tau",   rFn(TAU.v) ); // τ, \u03C4
var opAns   = Op("ans",          "ans",   fnAns      ); // ans

// operations that begin a grouping
var lps = [ opSin, opCos, opTan, opLn, opLog, opLp, opSqrt ];

// unary operations
var uns = [ opSqr, opRcp ];

// binary operations
var bins = [ opDiv, opMlt, opSub, opAdd, opPow ];

// digits
var digs = [ opPoint, op0, op1, op2, op3, op4, op5, op6, op7, op8, op9 ];

// constants
var consts = [ opE, opPi, opTau, opAns ]; // also opAns, if I add that in


// math button pressed
function onOp(op) {
	entry.push(op);
	displayEntry();
}

function onCalcClear() {
	entry = [];
	setText("lbl-calc-entry", "");
	setText("lbl-calc-answer", "");
}

function onCalcEnter() {
	calcAns = tryToAnswer();
	entry = [];
	setText("lbl-calc-entry", "");
	setText("lbl-calc-answer", calcAns);
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
	var s = "";
	for (var i = 0; i < entry.length; i++) {
	  s += entry[i].str;
	}
	setText("lbl-calc-entry", s);
	tryToAnswer();
}

// Array.prototype.includes() isn't working
function hasOp(arr, op) {
	for (var i = 0; i < arr.length; i++) {
	  if (arr[i].name === op.name) return true;
	}
	return false;
}

// allow answer() to not worry about errors
function tryToAnswer() {
	var r;
	try {
	  r = answer();
	} catch (e) {
	  error();
	  r = 0;
	}
	return r;
}

function error() {
	//console.log("Error");
	setText("lbl-calc-answer", "Error");
}

// parse and solve the entry
function answer() {

	// if the entry doesn't end with something that makes sense, call off the solving then and there
	var last = entry[entry.length - 1];
	if (hasOp(lps, last) || hasOp(bins, last)) {
	  error();
	  return;
	}

	// test new array
	function logParsed() {
	  var log = "";
	  for (i = 0; i < entered.length; i++) {
	    var op = entered[i];
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
	var entered = entry.slice();

	// locations of unary operations, for conversion
	//var unIndexes = [];
	// number of unary operations, for conversion
	var unCount = 0;
	for (var i = 0; i < entered.length; i++) {
	  listUns: for (var j = 0; j < uns.length; j++) {
	    if (entry[i].name === uns[j].name) {
	      //unIndexes.push(i);
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

	  var undex;
	  var unsFound = 0;
	  for (var k = 0; k < entered.length; k++) {
	    if (hasOp(uns, entered[k])) {
	      unsFound++;
	      if (unsFound === i + 1) {
	        undex = k;
	      }
	    }
	  }

	  var un = entered[undex];


	  // find where the lp should be placed on the left of the function

	  // switch the un to an rp
	  // this has to go before the rest of entered[] in modified
	  entered[undex] = opRp;

	  // if the un is applied to a constant, put the lp right before the constant
	  if (hasOp(consts, entered[undex - 1])) {
	    spliceOp(undex - 1, un);

	  // if the un is applied to a number, find the start of the number and put it there
	  } else if (hasOp(digs, entered[undex - 1])) {
	    var foundIt = false;
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
	    var foundLp = false;
	    var depth = 1;
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

	//console.log();
	//logParsed();


	// STEP 2
	// add in multiplication where necessary
	// remember, all uns are lps now

	for (i = 1; i < entered.length; i++) {

	  // compare a pair of operations to see if they need to multiply
	  var first = entered[i - 1];
	  var second = entered[i];

	  var spliceAtI = false;

	  // if the first is [], then splice if the second is []
	  if (hasOp(digs, first)) {
	    spliceAtI = hasOp(lps, second) || hasOp(uns, second) || hasOp(consts, second);
	  } else if (hasOp(consts, first) || opRp.name === first.name) {
	    spliceAtI = hasOp(lps, second) || hasOp(uns, second) || hasOp(consts, second) || hasOp(digs, second);
	  }

	  if (spliceAtI) spliceOp(i, opMlt);

	}

	//logParsed();


	// STEP 3
	// convert constants and digits to numbers

	/*
	// convert constants
	for (i = 0; i < entered.length; i++) {
	  var op = entered[i];
	  if (hasOp(consts, op)) entered[i] = op.fn();
	}
	*/

	// array of pairs of indexes, of start and end points of digit strings
	// if entered is "(23)", digIndexes is [[1,3]]
	var digIndexes = [];
	// if last item was a digit
	var wasOnDig = false;
	// beginnig index of last index pair
	var beginning = 0;

	// find digits and convert constants
	for (i = 0; i < entered.length; i++) {
	  var op = entered[i];

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
	  var is = digIndexes[i];
	  var toParse = "";
	  for (var l = is[0]; l < is[1]; l++) {
	    toParse += entered[l].str;
	  }
	  var parsed = parseFloat(toParse);
	  entered.splice(is[0], is[1] - is[0], parsed);
	}

	//logParsed();


	// STEP 4
	// repeat: find and execute the bottom operation
	// beware: not all members of entered[] are objects anymore; some are numbers

	// find (first) most deeply grouped indexes in entered[]
	// if array is "(3+2)", function will return [1,4]
	function deepestPlace() {
	  var deepest = 0;
	  var depth = 0;
	  var prevDepth = 0;
	  var deepestIndexStart = 0;
	  var deepestIndexEnd = entered.length;
	  var inPlace = true;
	  for (var i = 0; i < entered.length; i++) {
	    var op = entered[i];

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

	//console.log("deepest place: " + deepestPlace());

	// evaluate
	var dontBeInfinite = 0;

	evaluate: while(entered.length > 1) {
	  var place = deepestPlace();

	  // if the place is one item long , evaluate the grouping function
	  if (place[0] > 0 && place[1] - place[0] <= 1) {
	    var y = entered[place[0] - 1].fn(entered[place[0]]);
	    entered.splice(place[0] - 1, 3, y);
	    continue evaluate;
	  }

	  // if the place has any unary minus signs, get 'em
	  //for (i = place[0] + 1; i < place[1]; i++) {
	  var changedArray = false;
	  for (i = place[1] - 1; i >= place[0]; i--) {
	    if (entered[i].name === opSub.name) {
	      //console.log("minus at " + i);
	      if (i === 0 || hasOp(lps, entered[i - 1]) || hasOp(uns, entered[i - 1]) || hasOp(bins, entered[i - 1])) {
	        changedArray = true;
	        //console.log("it\'s unary!");
	        //console.log(entered);
	        entered.splice(i, 2, entered[i + 1] * -1);
	        //console.log(entered);
	      }
	    }
	  }
	  if (changedArray) continue evaluate;

	  // if the place uses binary operations, evaluate them with (G)EMA

	  // M in GEMA
	  var oopM = [ opMlt, opDiv ];

	  // A in GEMA
	  var oopA = [ opAdd, opSub ];

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
	    for (var o = 0; o < oopM.length; o++) {
	      if (entered[i].name === oopM[o].name) {
	        entered.splice(i - 1, 3, oopM[o].fn(entered[i - 1], entered[i + 1]));
	        continue evaluate;
	      }
	    }
	  }

	  // third, addition/subtraction
	  for (i = place[0] + 1; i < place[1] - 1; i++) {
	    for (var p = 0; p < oopA.length; p++) {
	      if (entered[i].name === oopA[p].name) {
	        entered.splice(i - 1, 3, oopA[p].fn(entered[i - 1], entered[i + 1]));
	        continue evaluate;
	      }
	    }
	  }

	  if (dontBeInfinite++ > 1024) {
	    console.log("prevented infinite loop!");
	    break evaluate;
	  }
	}

	//console.log(entered);
	var a = Math.pow(10, accuracy);
	var theAnswer = Math.round(a * entered[0]) / a;
	//console.log(theAnswer);

	// finally, display answer
	setText("lbl-calc-answer", theAnswer);
	return theAnswer;

}



// PROGRAMMER SCREEN //

function gotoHex() {
	setBase(DEC);
	setScreen("scr-hex");
}

// pseudo-enum
var BIN = {r: 0x02, s: "BIN", btn: "btn-hex-bin", lbl: "lbl-hex-bin"};
var OCT = {r: 0x08, s: "OCT", btn: "btn-hex-oct", lbl: "lbl-hex-oct"};
var HEX = {r: 0x10, s: "HEX", btn: "btn-hex-hex", lbl: "lbl-hex-hex"};
var DEC = {r: 0x0A, s: "DEC", btn: "btn-hex-dec", lbl: "lbl-hex-dec"};
var bases = [BIN, OCT, HEX, DEC];

var bL = "[ ";
var bR = " ]";
var currentBase;

function colorBases() {
	for (var i = 0; i < bases.length; i++) {
	  var base = bases[i];
	  if (base.r === currentBase.r) {
	    setProperty(base.btn, "text-color", accentColor);
	  } else {
	    setProperty(base.btn, "text-color", "#C0C0C0");
	  }
	}
}

function onHex(n) {
	if (n >= currentBase.r) return;
	if (currentBase.r === 2) {
	  var bin = getText(BIN.lbl).split(" ").join("");
	  if (bin === "") bin = "0000";
	  bin = parseInt(bin, 2).toString(2);
	  bin = formatBin(bin + n.toString(2));
	  setText(BIN.lbl, bin);
	} else {
	  setText(currentBase.lbl, getText(currentBase.lbl) + n.toString(currentBase.r).toUpperCase());
	}
	convertFrom(currentBase);
}

function setBase(o) {
	onHexClear();
	currentBase = o;
	for (var i = 0; i < bases.length; i++) {
	  var base = bases[i];
	  setText(base.btn, base.s);
	}
	setText(o.btn, bL + o.s + bR);
	colorBases();
}

function convertFrom(o) {
	for (var i = 0; i < bases.length; i++) {
	  var base = bases[i];
	  if (base.r === o.r) continue;
	  var n = 0;
	  var str = getText(o.lbl).split(" ").join("");
	  n = parseInt(str, o.r).toString(base.r).toUpperCase();
	  if (base.r === 2) {
	    n = formatBin(n);
	  }
	  setText(base.lbl, n);
	}
}

function formatBin(n) {
	if (n === "") return n;
	while (n.length % 4 !== 0) n = "0" + n;
	return n.match(/.{1,4}/g).join(" ");
}

function onHexClear() {
	for (var i = 0; i < bases.length; i++) {
	  setText(bases[i].lbl, "");
	}
}



// ROMAN SCREEN //

function gotoRoman() {
	onRomanClear();
	setScreen("scr-roman");
}

var fontSizeSmall = 18;
var fontSizeNormal = 32;
var lastFieldWasRoman = false; // true if the previous number button pressed was on the Roman side

// Roman numeral character sets
var UNCIAE    = [
	"",
	"\u2022",
	"\u2022\u2022",
	"\u2022\u2022\u2022",
	"\u2022\u2022\u2022\u2022",
	"\u2022\u2022\u2022\u2022\u2022",
	"S",
	"S\u2022",
	"S\u2022\u2022",
	"S\u2022\u2022\u2022",
	"S\u2022\u2022\u2022\u2022",
	"S\u2022\u2022\u2022\u2022\u2022"
];
var ONES      = [ "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX" ];
var TENS      = [ "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC" ];
var HUNDREDS  = [ "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM" ];
var THOUSANDS = [ "", "M", "MM", "MMM"];

// when you press a Hindu-Arabic button
function onRomanDigit(n) {
	lastFieldWasRoman = false;
	if (n !== undefined && !(n == "." && getText("lbl-roman-dec").includes("."))) {
	  setText("lbl-roman-dec", getText("lbl-roman-dec") + n);
	}
	// convert dec to rom
	var dec = getText("lbl-roman-dec");
	var rom = ""; // output string
	if (parseFloat(dec) < 4000) {
	  var whole = parseInt(dec).toString();
	  if (whole > 0) {
	    while (whole.length < 4) whole = "0" + whole;
	    rom += THOUSANDS[whole.charAt(0)];
	    rom += HUNDREDS[whole.charAt(1)];
	    rom += TENS[whole.charAt(2)];
	    rom += ONES[whole.charAt(3)];
	  }
	  var fraction = parseFloat(dec) % 1;
	  if (fraction) {
	    var uncia = Math.round(fraction * 12);
	    if (uncia >= 12) uncia--;
	    rom += UNCIAE[uncia];
	  }
	  setText("lbl-roman-rom", rom);
	} else {
	  setText("lbl-roman-rom", "");
	}
	romanCheckSizes();
}

// when you click a Roman button
function onRomanNumeral(s) {
	lastFieldWasRoman = true;
	if (s) {
	  setText("lbl-roman-rom", getText("lbl-roman-rom") + s);
	}
	// convert rom to dec
	var rom = getText("lbl-roman-rom");
	var isANumber = true;
	var isN;
	var dec = 0;
	if (rom == "N") {
	  isN = true;
	  isANumber = false;
	}
	var places = [
	  {num: THOUSANDS, val: 1000},
	  {num: HUNDREDS,  val: 100},
	  {num: TENS,      val: 10},
	  {num: ONES,      val: 1},
	  {num: UNCIAE,    val: 1/12}
	];
	for (var p = 0; p < places.length; p++) {
	  var place = places[p];
	  num: for (var i = place.num.length - 1; i >= 0; i--) {
	    if (rom.substring(0, place.num[i].length) == place.num[i]) {
	      dec += place.val * i;
	      rom = rom.substring(place.num[i].length);
	      break num;
	    }
	  }
	}
	if (rom !== "") isANumber = false;
	if (isANumber) {
	  setText("lbl-roman-dec", Math.round(100 * dec) / 100);
	} else if (isN) {
	  setText("lbl-roman-dec", 0);
	} else {
	  setText("lbl-roman-dec", "");
	}
	romanCheckSizes();
}

// clear fields
function onRomanClear() {
	setText("lbl-roman-dec", "");
	setText("lbl-roman-rom", "");
}

// adjust field sise
function romanCheckSizes() {
	var dec = getText("lbl-roman-dec");
	var rom = getText("lbl-roman-rom");
	if (dec.length > 6) {
	  setProperty("lbl-roman-dec", "font-size", fontSizeSmall);
	} else {
	  setProperty("lbl-roman-dec", "font-size", fontSizeNormal);
	}
	if (rom.length > 5) {
	  setProperty("lbl-roman-rom", "font-size", fontSizeSmall);
	} else {
	  setProperty("lbl-roman-rom", "font-size", fontSizeNormal);
	}

	/* * *
	// fix resizing bug
	setPosition("lbl-roman-dec", 10, 30, 140, 40);
	setPosition("lbl-roman-rom", 170, 30, 140, 40);
	*/
}



// BEGIN! //

function begin() {
	setAU(RAD);
	setCC(TAU);
	setAccentColor("#C00000", true);
	setBase(DEC);

	gotoHome();
}
