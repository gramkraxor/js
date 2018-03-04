---
title_override: JS Projects by Gramkraxor
desc: "Tools, games, and concept pieces built with simple JavaScript and CSS."

layout: project
css: index
---

<div id="list">
{% for project in site.projects %}
<p class="{{ project.url | remove: '/' }}" style="order: -{{ project.rank }};">
	<a href="{{ project.url | relative_url }}">{{ project.url }}</a>
</p>
{% endfor %}
</div>
