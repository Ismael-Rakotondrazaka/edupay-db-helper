Query:
INSERT INTO "public"."EquipmentAmount" ("value", "levelId", "createdAt", "updatedAt")
VALUES ($1, $2, $3, $4)
RETURNING "public"."EquipmentAmount"."id",
    "public"."EquipmentAmount"."value",
    "public"."EquipmentAmount"."levelId",
    "public"."EquipmentAmount"."createdAt",
    "public"."EquipmentAmount"."updatedAt" Params: [40000,4,"2024-06-16 07:27:01.914 UTC","2024-06-16 07:27:01.914 UTC"]