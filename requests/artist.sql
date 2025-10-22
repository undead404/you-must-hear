SELECT "date","artist", "name", "hidden", "numberOfTracks",
      (COALESCE("Album"."playcount", 0)::FLOAT / COALESCE("Album"."numberOfTracks", (
        SELECT AVG("numberOfTracks") FROM "Album" WHERE "numberOfTracks" IS NOT NULL
      )) *
      COALESCE("Album"."listeners", 0) / COALESCE("Album"."numberOfTracks", (
        SELECT AVG("numberOfTracks") FROM "Album" WHERE "numberOfTracks" IS NOT NULL
      )))::BIGINT
      AS "weight"
    FROM "Album"
    WHERE "Album"."hidden" <> true
	AND "artist" ILIKE '%Battle of Mice%'
    ORDER BY "weight" DESC
	