SELECT "public"."PaymentItem"."id" AS "PaymentItem.id",
    "public"."PaymentItem"."paymentId" AS "PaymentItem.paymentId",
    "public"."PaymentItem"."amount" AS "PaymentItem.amount",
    "public"."PaymentItem"."period"::text AS "PaymentItem.period",
    "public"."Payment"."studentId"
FROM "public"."PaymentItem"
    INNER JOIN "public"."Payment" ON "public"."PaymentItem"."paymentId" = "public"."Payment"."id"
WHERE (
        "public"."Payment"."academicSessionId" = 3
        AND "public"."Payment"."studentId" = 'gac6j'
    );