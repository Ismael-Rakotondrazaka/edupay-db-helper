SELECT DISTINCT "public"."Payment"."id" AS "Payment.id",
    "public"."Payment"."studentId" AS "Payment.studentId",
    "public"."Payment"."levelId" AS "Payment.levelId",
    "public"."Payment"."academicSessionId" AS "Payment.academicSessionId",
    "public"."Payment"."createdAt" AS "Payment.createdAt",
    "public"."Payment"."updatedAt" AS "Payment.updatedAt",
    "public"."Level"."id" AS "Level.id",
    "public"."Level"."name" AS "Level.name",
    "public"."AcademicSession"."id" AS "AcademicSession.id",
    "public"."AcademicSession"."year" AS "AcademicSession.year",
    "public"."Student"."id" as "Student.id",
    "public"."Student"."name" as "Student.name",
    "public"."Student"."gender"::text as "Student.gender",
    "public"."Student"."birthDate" as "Student.birthDate",
    "public"."Student"."email" as "Student.email",
    "public"."Student"."facultyId" as "Student.facultyId",
    "public"."Student"."levelId" as "Student.levelId",
    "public"."Student"."academicSessionId" as "Student.academicSessionId",
    "public"."Student"."createdAt" as "Student.createdAt",
    "public"."Student"."updatedAt" as "Student.updatedAt",
    "Student.Level"."id" as "Student.Level.id",
    "Student.Level"."name" as "Student.Level.name",
    "Student.AcademicSession"."id" as "Student.AcademicSession.id",
    "Student.AcademicSession"."year" as "Student.AcademicSession.year",
    "Student.Faculty"."id" as "Student.Faculty.id",
    "Student.Faculty"."name" as "Student.Faculty.name",
    "public"."PaymentItem"."id" AS "PaymentItem.id",
    "public"."PaymentItem"."paymentId" AS "PaymentItem.paymentId",
    "public"."PaymentItem"."amount" AS "PaymentItem.amount",
    "public"."PaymentItem"."period"::text AS "PaymentItem.period"
FROM "public"."Payment"
    INNER JOIN "public"."Level" ON "public"."Payment"."levelId" = "public"."Level"."id"
    INNER JOIN "public"."AcademicSession" ON "public"."Payment"."academicSessionId" = "public"."AcademicSession"."id"
    INNER JOIN "public"."Student" ON "public"."Payment"."studentId" = "public"."Student"."id"
    INNER JOIN "public"."Level" "Student.Level" ON "public"."Student"."levelId" = "Student.Level"."id"
    INNER JOIN "public"."AcademicSession" "Student.AcademicSession" ON "public"."Student"."academicSessionId" = "Student.AcademicSession"."id"
    INNER JOIN "public"."Faculty" "Student.Faculty" ON "public"."Student"."facultyId" = "Student.Faculty"."id"
    INNER JOIN "public"."PaymentItem" ON "public"."Payment"."id" = "public"."PaymentItem"."paymentId"
WHERE "public"."Payment"."id" = 'elrpm'
ORDER BY "public"."Payment"."updatedAt" DESC,
    "public"."PaymentItem"."id" ASC;