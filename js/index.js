/* JS by Owen Graham */

var pages = [];

var html = ".html";

function Page(file, name) {
	var r = {};
	r.file = (file.toLowerCase().endsWith(".html"))? file.substring(file.length - html.length) : file;
	r.name = (typeof name != "undefined")? name : r.file;
	pages.push(r);
}

Page("dozer");
Page("clock");
Page("devx");
Page("scripter");
Page("dozagon");
Page("connect4");
Page("phi");
Page("ttt");

$(function() {
	for (let i = 0; i < pages.length; i++) {
		$("body").append($("<a>")
			.attr("href", pages[i].file + html)
			.text(pages[i].name)
		);
	}
	$("a").wrap($("<p>"));
});
