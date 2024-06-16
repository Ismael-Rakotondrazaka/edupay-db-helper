UPDATE "public"."MonthAmount"
SET "value" = $1,
    "updatedAt" = $2
WHERE (
        "public"."MonthAmount"."id" = $3
        AND 1 = 1
    )
RETURNING "public"."MonthAmount"."id",
    "public"."MonthAmount"."value",
    "public"."MonthAmount"."levelId",
    "public"."MonthAmount"."createdAt",
    "public"."MonthAmount"."updatedAt" Params: [1310,"2024-06-16 07:32:04.273 UTC",1]