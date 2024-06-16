SELECT "public"."EquipmentAmount"."id" AS "EquipmentAmount.id",
    "public"."EquipmentAmount"."value" AS "EquipmentAmount.value",
    "public"."EquipmentAmount"."levelId" AS "EquipmentAmount.levelId",
    "public"."EquipmentAmount"."createdAt" AS "EquipmentAmount.createdAt",
    "public"."EquipmentAmount"."updatedAt" AS "EquipmentAmount.updatedAt",
    "public"."Level"."id" AS "Level.id",
    "public"."Level"."name" AS "Level.name"
FROM "public"."EquipmentAmount"
    INNER JOIN "public"."Level" ON "public"."EquipmentAmount"."id" = "public"."Level"."id"
WHERE "public"."EquipmentAmount"."id" = 1
ORDER BY "public"."EquipmentAmount"."levelId" ASC
LIMIT 1