SELECT "public"."MonthAmount"."id" AS "MonthAmount.id",
    "public"."MonthAmount"."value" AS "MonthAmount.value",
    "public"."MonthAmount"."levelId" AS "MonthAmount.levelId",
    "public"."MonthAmount"."createdAt" AS "MonthAmount.createdAt",
    "public"."MonthAmount"."updatedAt" AS "MonthAmount.updatedAt",
    "public"."Level"."id" AS "Level.id",
    "public"."Level"."name" AS "Level.name"
FROM "public"."MonthAmount"
    INNER JOIN "public"."Level" ON "public"."MonthAmount"."id" = "public"."Level"."id"
WHERE "public"."MonthAmount"."id" = 1
ORDER BY "public"."MonthAmount"."levelId" ASC
LIMIT 1