import { EquipmentAmount, Level, PrismaClient } from "@prisma/client";

export const createEquipmentAmounts = async (arg: {
  prisma: PrismaClient;
  levels: Level[];
}): Promise<EquipmentAmount[]> => {
  const { prisma, levels } = arg;

  const equipmentAmountsData: {
    levelId: number;
    value: number;
  }[] = [];

  let startAmount = 100_000;
  let startAmountIncrement = 50_000;

  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    const amount = startAmount + startAmountIncrement * i;
    equipmentAmountsData.push({ levelId: level.id, value: amount });
  }

  const equipmentAmounts = await prisma.equipmentAmount.createManyAndReturn({
    data: equipmentAmountsData,
  });

  return equipmentAmounts;
};
