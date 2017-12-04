/* JS by Gramkraxor */

var pages = [];

var HTML = ".html";

function Page(file, name) {
	var r = {};
	r.file = (file.toLowerCase().endsWith(HTML))? file.substring(file.length - HTML.length) : file;
	r.name = (typeof name != "undefined")? name : r.file;
	pages.push(r);
}

Page("dozer");
Page("clock");
Page("ttt");
Page("connect4");
Page("devx");
Page("scripter");
Page("dozagon");
Page("phi");

$(function() {
	for (let i = 0; i < pages.length; i++) {
		$("body").append($("<a>")
			.attr("href", pages[i].file + ((location.protocol == "file:")? HTML : ""))
			.text(pages[i].name)
		);
	}
	$("a").wrap($("<p>"));
});
