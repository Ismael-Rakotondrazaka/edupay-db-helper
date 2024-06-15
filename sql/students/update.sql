UPDATE "public"."Student"
SET "gender" = CAST($1::text AS "public"."Gender"),
    "updatedAt" = $2
WHERE (
        "public"."Student"."id" = $3
        AND 1 = 1
    )
RETURNING "public"."Student"."id",
    "public"."Student"."name",
    "public"."Student"."gender"::text,
    "public"."Student"."birthDate",
    "public"."Student"."email",
    "public"."Student"."facultyId",
    "public"."Student"."levelId",
    "public"."Student"."academicSessionId",
    "public"."Student"."createdAt",
    "public"."Student"."updatedAt";
-- Params: ["MALE","2024-06-15 06:54:11.778 UTC","6u8vr"]