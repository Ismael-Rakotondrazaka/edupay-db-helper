SELECT "public"."Student"."id" as "Student.id",
    "public"."Student"."name" as "Student.name",
    "public"."Student"."gender"::text as "Student.gender",
    "public"."Student"."birthDate" as "Student.birthDate",
    "public"."Student"."email" as "Student.email",
    "public"."Student"."facultyId" as "Student.facultyId",
    "public"."Student"."levelId" as "Student.levelId",
    "public"."Student"."academicSessionId" as "Student.academicSessionId",
    "public"."Student"."createdAt" as "Student.createdAt",
    "public"."Student"."updatedAt" as "Student.updatedAt",
    "public"."Level"."id" as "Level.id",
    "public"."Level"."name" as "Level.name",
    "public"."AcademicSession"."id" as "AcademicSession.id",
    "public"."AcademicSession"."year" as "AcademicSession.year",
    "public"."Faculty"."id" as "Faculty.id",
    "public"."Faculty"."name" as "Faculty.name"
FROM "public"."Student"
    INNER JOIN "public"."Level" ON "public"."Student"."levelId" = "public"."Level"."id"
    INNER JOIN "public"."AcademicSession" ON "public"."Student"."academicSessionId" = "public"."AcademicSession"."id"
    INNER JOIN "public"."Faculty" ON "public"."Student"."facultyId" = "public"."Faculty"."id"
WHERE DATE_PART('year', AGE("public"."Student"."birthDate")) >= 18
ORDER BY "public"."Student"."name" ASC,
    "public"."Level"."id" ASC,
    "public"."Faculty"."name" ASC;