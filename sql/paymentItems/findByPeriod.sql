SELECT "public"."PaymentItem"."id",
    "public"."PaymentItem"."paymentId",
    "public"."PaymentItem"."amount",
    "public"."PaymentItem"."period"::text
FROM "public"."PaymentItem"
WHERE "public"."PaymentItem"."period" = CAST('JANUARY'::text AS "public"."PaymentPeriod");