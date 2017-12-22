---
layout: project
title: JS Projects &middot; Gramkraxor
css: index
---

<div>
{% for project in site.projects %}
<p class="{{ project.url | remove: '/' }}" style="order: -{{ project.rank }};"><a href="{{ project.url | relative_url }}">{{ project.url | remove: '/' }}</a></p>
{% endfor %}
</div>
