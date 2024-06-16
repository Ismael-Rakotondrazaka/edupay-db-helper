DELETE FROM "public"."MonthAmount"
WHERE (
        "public"."MonthAmount"."id" = $1
        AND 1 = 1
    )