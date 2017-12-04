// DEVX

const
trm  = {},
user = {},
author = "Gramkraxor",
year = new Date().getFullYear(),
desc = "I've always wanted to make my own shell...";

trm.name = "DEVX"
user.name = "user";

function getPrompt() {
	//return user.name + "@" + trm.name.toLowerCase() + " # ";
	return "<b>d/</b>";
}

$(function() {
	
	// Get the document set up
	$(document.body).append($("<div/>")
		.attr("id", "container")
		.append($("<output/>"))
		.append($("<div/>")
			.attr("id", "input-line")
			.attr("class", "input-line")
			.append($("<div/>")
				.attr("class", "prompt") 
			)
			.append($("<div/>")
				.append($("<input/>")
					.attr("class", "cmdline")
					.prop("autofocus", true)
				)
			)
		)
	);
	
	// set the command-line prompt to include the user's IP address
	$(".prompt").html(getPrompt());

	// initialize a new terminal object
	new Terminal("#input-line .cmdline", "#container output").init();
	
});

var Terminal = function(cmdLineContainer, outputContainer) {

	var $cmdLine = document.querySelector(cmdLineContainer);
	var $output = document.querySelector(outputContainer);
	
	// array of command objects
	var Cmds = [];
	
	var PushCmd = function(name, run) {
		Cmds.push({
			name: name.toLowerCase(),
			run: run
		});
	}
	
	PushCmd("cat", function(args) {
		cmd = "cat";
		var url = args.join(" ");
		if (!url) {
			output("Usage: " + cmd + " http://...");
			output("Example: " + cmd + " https://gramkraxor.github.io/js/js/devx.js");
			return;
		}
		$.get(url, function(data) {
			var encodedStr = data.replace(/[\u00A0-\uFFFF<>\&]/gim, function(i) {
				 return "&#"+i.charCodeAt(0)+";";
			});
			output("<pre>" + encodedStr + "</pre>");
		});
	});
	
	PushCmd("clear", function(args) {
		$output.innerHTML = "";
	});
	
	PushCmd("date", function(args) {
		output(new Date());
	});
	
	PushCmd("echo", function(args) {
		output(args.join(" "));
	});
	
	PushCmd("help", function(args) {
		var cmds = [];
		for (let i = 0; i < Cmds.length; i++) cmds.push(Cmds[i].name);
		cmds.sort();
		output("<div class='ls-files'>" + cmds.join("<br>") + "</div>");
	});
	
	PushCmd("uname", function(args) {
		output(navigator.appVersion);
	});
	
	PushCmd("su", function(args) {
		user.name = args[0];
	});
	
	PushCmd("info", function(args) {
		output(["(c)", year, author].join(" "));
		output(desc);
	});
	
	var history = [];
	var histpos = 0;
	var histtemp = 0;

	window.addEventListener("click", function(e) {
		$cmdLine.focus();
	}, false);
	
	/* I don't want this!
	// Click handler
	$cmdLine.addEventListener("click", function(e) {
		this.value = this.value;
		this.selectionStart = this.value.length;
	}, false);
	*/

	// history handler
	$cmdLine.addEventListener("keydown", function(e) {
		if (history.length) {
			if (e.keyCode == 38 || e.keyCode == 40) {
				if (history[histpos]) {
					history[histpos] = this.value;
				} else {
					histtemp = this.value;
				}
			}

			if (e.keyCode == 38) { // up
				histpos--;
				if (histpos < 0) {
					histpos = 0;
				}
			} else if (e.keyCode == 40) { // down
				histpos++;
				if (histpos > history.length) {
					histpos = history.length;
				}
			}

			if (e.keyCode == 38 || e.keyCode == 40) {
				e.preventDefault();
				this.value = history[histpos] ? history[histpos] : histtemp;
				this.value = this.value; // set cursor to end of input
			}
		}
	}, false);

	// command entry handler
	$cmdLine.addEventListener("keydown", function(e) {

		if (e.keyCode == 9) { // tab
			e.preventDefault();
			// implement tab suggest
		} else if (e.keyCode == 13) { // enter
			// save shell history
			if (this.value) {
				history[history.length] = this.value;
				histpos = history.length;
			}

			// duplicate current input and append to output section
			var line = this.parentNode.parentNode.cloneNode(true);
			line.removeAttribute("id")
			line.classList.add("line");
			var input = line.querySelector("input.cmdline");
			input.autofocus = false;
			input.readOnly = true;
			$output.appendChild(line);

			if (this.value && this.value.trim()) {
				var args = this.value.split(" ").filter(function(val, i) {
					return val;
				});
				var cmd = args[0].toLowerCase();
				args = args.splice(1); // remove cmd from arg list
			}
			
			for (let i = 0; i <= Cmds.length; i++) {
				if (i == Cmds.length) {
					if (cmd) {
						output(cmd + ": command not found");
					}
					continue;
				}
				if (Cmds[i].name == cmd) {
					Cmds[i].run(args);
					break;
				}
			}

			window.scrollTo(0, getDocHeight());
			this.value = ""; // clear/setup line for next input
			
			// Update the terminal prompt
			var prompt = this.parentNode.parentNode.querySelector("div.prompt");
			prompt.innerHTML = getPrompt();
		}
	}, false);

	//
	function output(html) {
		$output.insertAdjacentHTML("beforeEnd", "<p>" + html + "</p>");
	}

	// cross-browser impl to get document"s height
	function getDocHeight() {
		var d = document;
		return Math.max(
				Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
				Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
				Math.max(d.body.clientHeight, d.documentElement.clientHeight)
		);
	}

	//
	return {
		init: function() {
			//output("<img align='left' src='http://www.w3.org/html/logo/downloads/HTML5_Badge_128.png' width='100' height='100' style='padding: 0px 10px 20px 0px'><h2 style='letter-spacing: 4px'>HTML5 Web Terminal</h2><p>" + new Date() + "</p><p>Enter 'help' for more information.</p>");
			var d = new Date();
			function c(i) {
					return (i < 10) ? "0" + i : i;
			}
			var date =
				d.getFullYear()    +"-" +
				(d.getMonth() + 1) +"-" +
				d.getDate()        +" " +
				c(d.getHours())    +":" +
				c(d.getMinutes())  +":" +
				c(d.getSeconds())  + " " +
				(
					(d.getTimezoneOffset() <= 0)? "+" : "-") +
					(c(Math.floor(Math.abs(d.getTimezoneOffset() / 60)))
				) +
				c(Math.floor(Math.abs(d.getTimezoneOffset())) % 60);
			
			output("<img align='left' src='assets/devx.svg' width='100' height='100' style='padding: 0px 10px 20px 0px'><h2 style='letter-spacing: 4px'>DEVX Terminal</h2><p>" + date + "</p><p>Enter 'help' for more information.</p><br/>");
		},
		//output: output
	}
};