/*
 * Query, an interface for URL query strings
 * (c) 2018 Gramkraxor
 */

function Query(id, defaultVal, fromString, toString) {
	this.id = id;
	this.defaultVal = defaultVal;
	this.val = defaultVal;
	this.fromString = fromString;
	if (toString) this.toString = toString;
	Query.queries.push(this);
}

Query.prototype.toString = function() { return this.val.toString(); };

Query.queries = [];
Query.hasLoaded = false;

Query.getQueryString = function() {
	let r = "";
	for (let i = 0; i < Query.queries.length; i++) {
		let q = Query.queries[i];
		if (q.val === q.defaultVal) continue;
		r += "&" + q.id + "=" + q.toString();
	}
	if (r.length) r = "?" + r.substr(1);
	return r;
};

Query.updateQueryString = function() {
	if (!Query.hasLoaded) return;
	history.replaceState(
		{ id: "homepage" },
		document.title,
		location.origin + location.pathname + Query.getQueryString()
	);
};

Query.getUrlParameter = function(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	var results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

Query.load = function() {
	for (let i = 0; i < Query.queries.length; i++) {
		let q = Query.queries[i];
		q.fromString(Query.getUrlParameter(q.id));
	}
	Query.hasLoaded = true;
};
