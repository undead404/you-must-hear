---
permalink: /tags/history/
title: History of tags
---

<ul>
  {% for post in site.posts %}
    <li>
      <time datetime="{{ post.date }}">{{ post.date }}</time> <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>