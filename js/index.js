/* JS by Gramkraxor */

var pages = [];

var HTML = ".html";

function Page(file, name) {
	var r = {};
	r.file = (file.toLowerCase().endsWith(HTML))? file.substring(file.length - HTML.length) : file;
	r.name = (typeof name != "undefined")? name : r.file;
	pages.push(r);
}

Page("ttt");
Page("dozer");
Page("clock");
Page("connect4");
Page("devx");
Page("dozagon");
Page("phi");

$(function() {
	for (let i = 0; i < pages.length; i++) {
		let link = pages[i].file;
		if (location.protocol == "file:" || !location.hostname.includes("gramkraxor.com")) link += HTML;
		$("body").append($("<a>")
			.attr("href", link)
			.text(pages[i].name)
		);
	}
	$("a").wrap($("<p>"));
});
