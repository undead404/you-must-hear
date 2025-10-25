---
category: genre
date: <% date %>
permalink: tags/<% linkName %>
title: <% title %>
---

## <% title %>

Last updated: <time datetime="<% date %>"><% prettyDate %></time>

<%#description%>
### Description

<% description %>

<%/description%>
### 100 chronological releases

| Place | Cover | Date | Artist | Album |
|---|---|---|---|---|
<%#releases%>
| <%place%> | <%#cover%>![Cover](<%{cover}%>)<%/cover%> | <%date%> | <%artist%> | <%name%> |
<%/releases%>

<%#relatedGenres.length%>
### Related genres

<%#relatedGenres%>
- [<% name %>]({{ "/tags/<% linkName %>" | relative_url }})
<%/relatedGenres%>
<%/relatedGenres.length%>