/* JS by Owen Graham */

var pages = [];

var html = ".html";

function Page(file, name) {
	this.file = (file.toLowerCase().endsWith(".html"))? file.substring(file.length - html.length) : file;
	this.name = (typeof name != "undefined")? name : this.file;
	pages.push(this);
}

new Page("dozer");
new Page("clock");
new Page("devx");
new Page("scripter");

$(function() {
	for (let i = 0; i < pages.length; i++) {
		$("body").append($("<a>")
			.attr("href", pages[i].file + html)
			.text(pages[i].name)
		);
		console.log(pages[i].file);
		console.log(pages[i].name);
	}
	$("a").wrap($("<p>"));
});
