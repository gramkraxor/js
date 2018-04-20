/*
 * Eanto, la HTML-interfaco por eo.js
 * © 2018 Gramkraksoro
 */

Eo.log();

let
name = Eo.NAME,
version = Eo.VERSION,
copyYear = Eo.YEAR,
copy = Eo.AUTHORS[0];

$(function() {

	$("body").append($("<div/>")
		.attr("id", "bod")
		.prop("spellcheck", false)
		.append($("<div/>")
			.attr("id", "title")
			.text(name + " v" + version)
		)
		.append($("<div/>")
			.attr("id", "doz")
			.append($("<input/>")
				.attr("id", "konvertu")
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
		.append("<br/>")
		.append($("<div/>")
			.attr("id", "footer")
			.text(["\u00A9", copyYear, copy].join(" "))
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
