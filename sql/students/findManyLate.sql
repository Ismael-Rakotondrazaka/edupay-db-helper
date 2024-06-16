SELECT "public"."Student"."id",
    "public"."Student"."name",
    "public"."Student"."gender"::text,
    "public"."Student"."birthDate",
    "public"."Student"."email",
    "public"."Student"."facultyId",
    "public"."Student"."levelId",
    "public"."Student"."academicSessionId",
    "public"."Student"."createdAt",
    "public"."Student"."updatedAt"
FROM "public"."Student"
WHERE ("public"."Student"."id") NOT IN (
        SELECT "t1"."studentId"
        FROM "public"."Payment" AS "t1"
        WHERE (
                "t1"."academicSessionId" = $1
                AND ("t1"."id") IN (
                    SELECT "t2"."paymentId"
                    FROM "public"."PaymentItem" AS "t2"
                    WHERE (
                            "t2"."period" = CAST($2::text AS "public"."PaymentPeriod")
                            AND "t2"."paymentId" IS NOT NULL
                        )
                )
                AND "t1"."studentId" IS NOT NULL
            )
    )
ORDER BY "public"."Student"."name" ASC,
    "public"."Student"."facultyId" ASC OFFSET $3;
-- [3,"EQUIPMENT",0]