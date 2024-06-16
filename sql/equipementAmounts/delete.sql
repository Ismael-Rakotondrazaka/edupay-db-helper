DELETE FROM "public"."EquipmentAmount"
WHERE (
        "public"."EquipmentAmount"."id" = $1
        AND 1 = 1
    )