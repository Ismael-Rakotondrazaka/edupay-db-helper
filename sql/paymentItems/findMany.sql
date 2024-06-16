SELECT "public"."PaymentItem"."id",
    "public"."PaymentItem"."paymentId",
    "public"."PaymentItem"."amount",
    "public"."PaymentItem"."period"::text
FROM "public"."PaymentItem"