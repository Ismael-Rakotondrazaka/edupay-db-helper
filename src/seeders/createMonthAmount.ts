import { MonthAmount, Level, PrismaClient } from "@prisma/client";

export const createMonthAmounts = async (arg: {
  prisma: PrismaClient;
  levels: Level[];
}): Promise<MonthAmount[]> => {
  const { prisma, levels } = arg;

  const monthAmountsData: {
    levelId: number;
    value: number;
  }[] = [];

  let startAmount = 10_000;
  let startAmountIncrement = 5_000;

  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    const amount = startAmount + startAmountIncrement * i;
    monthAmountsData.push({ levelId: level.id, value: amount });
  }

  const monthAmounts = await prisma.monthAmount.createManyAndReturn({
    data: monthAmountsData,
  });

  return monthAmounts;
};
