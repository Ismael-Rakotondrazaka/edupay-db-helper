Query:
INSERT INTO "public"."MonthAmount" ("value", "levelId", "createdAt", "updatedAt")
VALUES ($1, $2, $3, $4)
RETURNING "public"."MonthAmount"."id",
    "public"."MonthAmount"."value",
    "public"."MonthAmount"."levelId",
    "public"."MonthAmount"."createdAt",
    "public"."MonthAmount"."updatedAt" Params: [40000,4,"2024-06-16 07:27:01.914 UTC","2024-06-16 07:27:01.914 UTC"]