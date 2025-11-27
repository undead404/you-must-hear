SELECT "place", "name", "tagName"
FROM "Album"
INNER JOIN "TagListItem"
ON "Album"."artist" = "TagListItem"."albumArtist"
AND "Album"."name" = "TagListItem"."albumName"
WHERE "Album"."artist" = 'Slipknot'
ORDER BY "TagListItem"."place" ASC,
"Album"."name" ASC