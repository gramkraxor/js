/*
 * Eanto, la HTML-interfaco por eo.js
 * © 2018 Gramkraksoro
 */

Eo.log();

let
NAME = "Eanto",
AUTHORS = [ "Gramkraksoro" ],
YEAR = 2018;

$(function() {

	$("body").append($("<div/>")
		.attr("id", "bod")
		.prop("spellcheck", false)
		.append($("<div/>")
			.attr("id", "title")
			.text(NAME)
		)
		.append($("<div/>")
			.attr("id", "eo")
			.append($("<input/>")
				.attr("id", "konverti")
				.attr("value", "gx \u2194 \u011D")
				.attr("type", "button")
				.attr("tabindex", -1)
				.click(function() {enter(true)})
			)
			.append($("<input/>")
				.attr("id", "esperanto")
				.attr("type", "text")
				.attr("placeholder", "teksto por konverti...")
				.keypress(function(e) {
					/*if (e.which == 13)*/ setTimeout(enter, 50);
				})
			)
			.append($("<input/>")
				.attr("id", "kopii")
				.attr("value", "kopii")
				.attr("type", "button")
				.click(function() { kopii(); })
			)
		)
		.append($("<div/>")
			.attr("id", "footer")
			.text(["\u00A9", YEAR, AUTHORS[0]].join(" "))
			.click(function() { dark(); })
		)
	);

});

function enter(toX) {
	let v = $("#esperanto").val();
	v = toX ? Eo.convert(v) : Eo.fromX(v);
	$("#esperanto").val(v);
}

function kopii() {
	let inp = $("#esperanto")[0];
	inp.select();
	document.execCommand("Copy");
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
