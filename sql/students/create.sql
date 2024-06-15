INSERT INTO "public"."Student" (
        "id",
        "name",
        "gender",
        "birthDate",
        "email",
        "facultyId",
        "levelId",
        "academicSessionId",
        "createdAt",
        "updatedAt"
    )
VALUES (
        $1,
        $2,
        CAST($3::text AS "public"."Gender"),
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10
    )
RETURNING "public"."Student"."id" AS "Student.id";
-- ["1qp2d","Melanie Welch","FEMALE","2006-07-12 12:20:43.080 UTC","Melanie.Welch46@gmail.com",2,2,2,"2024-06-15 06:37:21.902 UTC","2024-06-15 06:37:21.902 UTC"]