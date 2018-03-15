/*
 * Calculator Supreme (App Lab)
 * © 2018 Owen Graham
 */


// accuracy in decimal places
var accuracy = 8;

// add a button with click event fn()
function btn(id, fn) {
	onEvent(id, "click", fn);
}

// go home from any other screen
function gotoHome() {
	setScreen("scrHome");
}



// HOME SCREEN //

btn("btnHomeGotoCalc",  gotoCalc);
btn("btnHomeGotoHex",   gotoHex);
btn("btnHomeGotoRoman", gotoRoman);
btn("btnHomeGotoSet",   gotoSet);



// SETTINGS SCREEN //

function gotoSet() {
	setScreen("scrSet");
}

var accentColor;

function setAccentColor(color, setTxt) {
	if (setTxt) setText("inpSetRGB", color);
	accentColor = color;

	var b = function(id) {setProperty(id, "background-color", color);};
	var t = function(id) {setProperty(id, "text-color", color);};

	b("lblCalcAccent1");
	t("lblHomeTitle2");
	b("lblHexAccent1");
	t("btnHexBin");
	t("btnHexOct");
	t("btnHexHex");
	t("btnHexDec");
	b("lblRomanAccent1");
	t("lblSetRGB");
	if (currentBase) colorBases();

	setAU(currentAU);
	setCC(currentCC);
}

// psuedo-ena
var DEG  = { btn: "btnSetAUDeg",  v: 2 * Math.PI / 360 };
var RAD  = { btn: "btnSetAURad",  v: 1 };
var TURN = { btn: "btnSetAUTurn", v: 2 * Math.PI };
var AUs = [ DEG, RAD, TURN ];

var PI   = { v: Math.PI,     btnCalc: "btnCalcPi",  btnSet: "btnSetCCPi"  };
var TAU  = { v: 2 * Math.PI, btnCalc: "btnCalcTau", btnSet: "btnSetCCTau" };
var CCs = [ PI, TAU ];

var currentAU;
var currentCC;

onEvent("inpSetRGB", "change", function() {
	setAccentColor(getText("inpSetRGB"));
});
btn("btnSetAUDeg",  function() {setAU(DEG);});
btn("btnSetAURad",  function() {setAU(RAD);});
btn("btnSetAUTurn", function() {setAU(TURN);});
btn("btnSetCCPi",  function() {setCC(PI);});
btn("btnSetCCTau", function() {setCC(TAU);});
btn("btnSetHome", gotoHome);

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
	setScreen("scrCalc");
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
	setText("lblCalcEntry", "");
	setText("lblCalcAnswer", "");
}

function onCalcEnter() {
	calcAns = tryToAnswer();
	entry = [];
	setText("lblCalcEntry", "");
	setText("lblCalcAnswer", calcAns);
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
	setText("lblCalcEntry", s);
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
	setText("lblCalcAnswer", "Error");
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
	setText("lblCalcAnswer", theAnswer);
	return theAnswer;

}


btn("btnCalcE",     function() {onOp(opE    );});
btn("btnCalcSin",   function() {onOp(opSin  );});
btn("btnCalcCos",   function() {onOp(opCos  );});
btn("btnCalcTan",   function() {onOp(opTan  );});
btn("btnCalcPi",    function() {onOp(opPi   );});
btn("btnCalcTau",   function() {onOp(opTau  );});
btn("btnCalcLn",    function() {onOp(opLn   );});
btn("btnCalcLog",   function() {onOp(opLog  );});
btn("btnCalcLp",    function() {onOp(opLp   );});
btn("btnCalcRp",    function() {onOp(opRp   );});
btn("btnCalcDiv",   function() {onOp(opDiv  );});
btn("btnCalcSqrt",  function() {onOp(opSqrt );});
btn("btnCalc7",     function() {onOp(op7    );});
btn("btnCalc8",     function() {onOp(op8    );});
btn("btnCalc9",     function() {onOp(op9    );});
btn("btnCalcMlt",   function() {onOp(opMlt  );});
btn("btnCalcSqr",   function() {onOp(opSqr  );});
btn("btnCalc4",     function() {onOp(op4    );});
btn("btnCalc5",     function() {onOp(op5    );});
btn("btnCalc6",     function() {onOp(op6    );});
btn("btnCalcSub",   function() {onOp(opSub  );});
btn("btnCalcRcp",   function() {onOp(opRcp  );});
btn("btnCalc1",     function() {onOp(op1    );});
btn("btnCalc2",     function() {onOp(op2    );});
btn("btnCalc3",     function() {onOp(op3    );});
btn("btnCalcAdd",   function() {onOp(opAdd  );});
btn("btnCalcPow",   function() {onOp(opPow  );});
btn("btnCalcPoint", function() {onOp(opPoint);});
btn("btnCalc0",     function() {onOp(op0    );});
btn("btnCalcAns",   function() {onOp(opAns  );});

btn("btnCalcEnter", onCalcEnter);
btn("btnCalcClear", onCalcClear);
btn("btnCalcDel", onCalcDel);
btn("btnCalcHome", gotoHome);



// PROGRAMMER SCREEN //

function gotoHex() {
	setBase(DEC);
	setScreen("scrHex");
}

// pseudo-enum
var BIN = {r: 0x02, s: "BIN", btn: "btnHexBin", lbl: "lblHexBin"};
var OCT = {r: 0x08, s: "OCT", btn: "btnHexOct", lbl: "lblHexOct"};
var HEX = {r: 0x10, s: "HEX", btn: "btnHexHex", lbl: "lblHexHex"};
var DEC = {r: 0x0A, s: "DEC", btn: "btnHexDec", lbl: "lblHexDec"};
var bases = [BIN, OCT, HEX, DEC];

var bL = "[ ";
var bR = " ]";
var currentBase;

// click listeners
btn(BIN.btn, function() {setBase(BIN)});
btn(OCT.btn, function() {setBase(OCT)});
btn(HEX.btn, function() {setBase(HEX)});
btn(DEC.btn, function() {setBase(DEC)});
btn("btnHex0", function() {onHex(0x0);});
btn("btnHex1", function() {onHex(0x1);});
btn("btnHex2", function() {onHex(0x2);});
btn("btnHex3", function() {onHex(0x3);});
btn("btnHex4", function() {onHex(0x4);});
btn("btnHex5", function() {onHex(0x5);});
btn("btnHex6", function() {onHex(0x6);});
btn("btnHex7", function() {onHex(0x7);});
btn("btnHex8", function() {onHex(0x8);});
btn("btnHex9", function() {onHex(0x9);});
btn("btnHexA", function() {onHex(0xA);});
btn("btnHexB", function() {onHex(0xB);});
btn("btnHexC", function() {onHex(0xC);});
btn("btnHexD", function() {onHex(0xD);});
btn("btnHexE", function() {onHex(0xE);});
btn("btnHexF", function() {onHex(0xF);});
btn("btnHexClear", onHexClear);
btn("btnHexHome", gotoHome);

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
	setScreen("scrRoman");
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

// click listeners
btn("btnRoman0", function() {onRomanDigit("0");});
btn("btnRoman1", function() {onRomanDigit("1");});
btn("btnRoman2", function() {onRomanDigit("2");});
btn("btnRoman3", function() {onRomanDigit("3");});
btn("btnRoman4", function() {onRomanDigit("4");});
btn("btnRoman5", function() {onRomanDigit("5");});
btn("btnRoman6", function() {onRomanDigit("6");});
btn("btnRoman7", function() {onRomanDigit("7");});
btn("btnRoman8", function() {onRomanDigit("8");});
btn("btnRoman9", function() {onRomanDigit("9");});
btn("btnRomanPoint", function() {onRomanDigit(".");});
btn("btnRomanI", function() {onRomanNumeral("I");}); // 1
btn("btnRomanV", function() {onRomanNumeral("V");}); // 5
btn("btnRomanX", function() {onRomanNumeral("X");}); // 10
btn("btnRomanL", function() {onRomanNumeral("L");}); // 50
btn("btnRomanC", function() {onRomanNumeral("C");}); // 100
btn("btnRomanD", function() {onRomanNumeral("D");}); // 500
btn("btnRomanM", function() {onRomanNumeral("M");}); // 1000
btn("btnRomanN", function() {onRomanNumeral("N");}); // 0
btn("btnRomanS", function() {onRomanNumeral("S");}); // 0.5
btn("btnRomanUncia", function() {onRomanNumeral("\u2022");}); // 1/12
btn("btnRomanClear", onRomanClear);
btn("btnRomanHome", gotoHome);

// when you press a Hindu-Arabic button
function onRomanDigit(n) {
	lastFieldWasRoman = false;
	if (n !== undefined && !(n == "." && getText("lblRomanDec").includes("."))) {
	  setText("lblRomanDec", getText("lblRomanDec") + n);
	}
	// convert dec to rom
	var dec = getText("lblRomanDec");
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
	  setText("lblRomanRom", rom);
	} else {
	  setText("lblRomanRom", "");
	}
	romanCheckSizes();
}

// when you click a Roman button
function onRomanNumeral(s) {
	lastFieldWasRoman = true;
	if (s) {
	  setText("lblRomanRom", getText("lblRomanRom") + s);
	}
	// convert rom to dec
	var rom = getText("lblRomanRom");
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
	  setText("lblRomanDec", Math.round(100 * dec) / 100);
	} else if (isN) {
	  setText("lblRomanDec", 0);
	} else {
	  setText("lblRomanDec", "");
	}
	romanCheckSizes();
}

// clear fields
function onRomanClear() {
	setText("lblRomanDec", "");
	setText("lblRomanRom", "");
}

// adjust field sise
function romanCheckSizes() {
	var dec = getText("lblRomanDec");
	var rom = getText("lblRomanRom");
	if (dec.length > 6) {
	  setProperty("lblRomanDec", "font-size", fontSizeSmall);
	} else {
	  setProperty("lblRomanDec", "font-size", fontSizeNormal);
	}
	if (rom.length > 5) {
	  setProperty("lblRomanRom", "font-size", fontSizeSmall);
	} else {
	  setProperty("lblRomanRom", "font-size", fontSizeNormal);
	}
	// fix resizing bug
	setPosition("lblRomanDec", 10, 30, 140, 40);
	setPosition("lblRomanRom", 170, 30, 140, 40);
}



// BEGIN! //

setAU(RAD);
setCC(TAU);
setAccentColor("#C00000", true);
setBase(DEC);

gotoHome();
