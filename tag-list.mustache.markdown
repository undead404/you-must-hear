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

<table>
  <thead>
    <tr>
      <th>Place</th>
      <th>Cover</th>
      <th>Date</th>
      <th>Artist</th>
      <th>Album</th>
      <th>Tags</th>
      <th>Other places</th>
    </tr>
  </thead>
  <tbody>
    <%#releases%>
    <tr>
      <td><%place%></td>
      <td>
        <%#cover%>
          <img src="<%{cover}%>" alt="Cover for <%name%>" style="max-width:120px; height:auto;" />
        <%/cover%>
      </td>
      <td><%date%></td>
      <td><%artist%></td>
      <td><%name%></td>
      <td>
        <ul>
          <%#tags%>
            <li style="font-size: calc(1rem * <% count %> / 100)"> <a href="{{ "/tags/<% linkName %>" | relative_url }}"><% tagName %></a></li>
          <%/tags%>
        </ul>
      </td>
      <td>
        <ul>
          <%#places%>
            <li> <a href="{{ "/tags/<% linkName %>" | relative_url }}"><% tagName %></a> # <% otherPlace %></li>
          <%/places%>
        </ul>
      </td>
    </tr>
    <%/releases%>
  </tbody>
</table>

<%#relatedGenres.length%>
### Related genres

<%#relatedGenres%>
- [<% name %>]({{ "/tags/<% linkName %>" | relative_url }})
<%/relatedGenres%>
<%/relatedGenres.length%>