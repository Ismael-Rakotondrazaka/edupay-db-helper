import { Level, PrismaClient } from "@prisma/client";

export type LevelName =
  | "Licence 1"
  | "Licence 2"
  | "Licence 3"
  | "Master 1"
  | "Master 2";

const levelsData: LevelName[] = [
  "Licence 1",
  "Licence 2",
  "Licence 3",
  "Master 1",
  "Master 2",
];

export const createLevels = async (arg: {
  prisma: PrismaClient;
}): Promise<Level[]> => {
  const { prisma } = arg;

  const levels = await prisma.level.createManyAndReturn({
    data: levelsData.map((name) => ({ name })),
  });

  return levels;
};
