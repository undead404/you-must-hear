---
category: list
date: <% date %>
permalink: tags
title: All music tags ever known
---

## All music tags ever known

Last updated: <time datetime="<% date %>"><% prettyDate %></time>

### In update order, from most recent to oldest

| Tag | Updated at |
|---|---|
<%#tags%>
| [<%name%>]({{ "tags/<%linkName%>" | relative_url }}) | <time datetime="<% date %>"><% prettyDate %></time> |
<%/tags%>
