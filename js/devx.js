/*
 * DEVX Console
 * (c) 2018 Gramkraxor
 */

const
trm  = {},
user = {},
author = "Gramkraxor",
year = 2018,
desc = "I've always wanted to make my own shell...";

trm.name = "DEVX"
user.name = "";

function getPrompt() {
	if (user.name != "") {
		return user.name + "@" + trm.name.toLowerCase() + " # ";
	}
	return "d/";
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

	// set the command-line prompt
	$(".prompt").html(getPrompt());

	// initialize a new terminal object
	new Terminal("#input-line .cmdline", "#container output").init();

});

let Terminal = function(cmdLineContainer, outputContainer) {

	let $cmdLine = document.querySelector(cmdLineContainer);
	let $output = document.querySelector(outputContainer);

	// array of command objects
	let cmds = [];

	function Cmd(name, run, push) {
		this.name = name;
		this.run  = run;
		if (push !== false) cmds.push(this);
	}

	/*
	let cmdCat = new Cmd("cat", function(args) {
		cmd = "cat";
		let url = args[0];
		if (!url) {
			output("Usage: " + cmd + " http://...");
			output("Example: " + cmd + " https://gramkraxor.github.io/js/js/devx.js");
			return;
		}

		$.get(url, function(data) {
			let encodedStr = data.replace(/[\u00A0-\uFFFF<>\&]/gim, function(i) {
				 return "&#"+i.charCodeAt(0)+";";
			});
			output("<pre>" + encodedStr + "</pre>");
		});
	});
	*/

	let cmdClear = new Cmd("clear", function(args) {
		$output.innerHTML = "";
	});

	let cmdDate = new Cmd("date", function(args) {
		output(new Date());
	});

	let cmdEcho = new Cmd("echo", function(args) {
		output(args.join(" "));
	});

	let cmdHelp = new Cmd("help", function(args) {
		let cmdsList = [];
		for (let i = 0; i < cmds.length; i++) cmdsList.push(cmds[i].name);
		cmdsList.sort();
		output("<div class='ls-files'>" + cmdsList.join("<br>") + "</div>");
	});

	let cmdUname = new Cmd("uname", function(args) {
		output(navigator.appVersion);
	});

	let cmdSu = new Cmd("su", function(args) {
		user.name = args[0] ? args[0] : "";
	});

	let cmdInfo = new Cmd("info", function(args) {
		output(["(c)", year, author].join(" "));
		output(desc);
	});

	let history = [];
	let histpos = 0;
	let histtemp = 0;

	window.addEventListener("click", function(e) {
		$cmdLine.focus();
	}, false);

	/*
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
			let line = this.parentNode.parentNode.cloneNode(true);
			line.removeAttribute("id")
			line.classList.add("line");
			let input = line.querySelector("input.cmdline");
			input.autofocus = false;
			input.readOnly = true;
			$output.appendChild(line);

			let cmd, args;
			if (this.value && this.value.trim()) {
				args = this.value.split(" ").filter(function(val, i) {
					return val;
				});
				cmd = args[0].toLowerCase();
				args = args.splice(1); // remove cmd from arg list
			}

			for (let i = 0; i <= cmds.length; i++) {
				if (i == cmds.length) {
					if (cmd) {
						output(cmd + ": command not found");
					}
					continue;
				}
				if (cmds[i].name == cmd) {
					cmds[i].run(args);
					break;
				}
			}

			window.scrollTo(0, getDocHeight());
			this.value = ""; // clear/setup line for next input

			// Update the terminal prompt
			let prompt = this.parentNode.parentNode.querySelector("div.prompt");
			prompt.innerHTML = getPrompt();
		}
	}, false);

	//
	function output(html) {
		$output.insertAdjacentHTML("beforeEnd", "<p>" + html + "</p>");
	}

	// cross-browser impl to get document"s height
	function getDocHeight() {
		let d = document;
		return Math.max(
				Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
				Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
				Math.max(d.body.clientHeight, d.documentElement.clientHeight)
		);
	}

	//
	return {
		init: function() {
			let d = new Date();
			function c(i) {
					return (i < 10) ? "0" + i : i;
			}
			let date =
				d.toISOString().slice(0, 10) +
				" " +
				c(d.getHours())    + ":" +
				c(d.getMinutes())  + ":" +
				c(d.getSeconds())  + " " +
				((d.getTimezoneOffset() <= 0)? "+" : "-") +
				c(Math.floor(Math.abs(d.getTimezoneOffset() / 60))) +
				c(Math.abs(d.getTimezoneOffset()) % 60);

			let imgSrc = "assets/devx.svg";
			if (location.protocol == "file:") imgSrc = "../" + imgSrc;
			output("<img align='left' src='" + imgSrc + "' width='100' height='100' style='padding: 0px 10px 20px 0px'><h2 style='letter-spacing: 4px'>DEVX Terminal</h2><p>" + date + "</p><p>Enter 'help' for more information.</p><br/>");
		},
		//output: output
	}
};
