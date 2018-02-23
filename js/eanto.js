/* JS by Gramkraxor */

Eo.log();

var
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
			.append($("<p/>")
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
					.attr("id", "kopiu")
					.attr("value", "kopiu")
					.attr("type", "button")
					.click(kopiu)
				)
			)
		)
		.append("<br/>")
		.append($("<div/>")
			.attr("id", "footer")
			.text(["\u00A9", copyYear, copy].join(" "))
		)
	);
	
});

function enter(toX) {
	let v = $("#esperanto").val();
	v = toX ? Eo.convert(v) : Eo.fromX(v);
	$("#esperanto").val(v);
}

function kopiu() {
	let inp = $("#esperanto")[0];
	inp.select();
	document.execCommand("Copy");
}
