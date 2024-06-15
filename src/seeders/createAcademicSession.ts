import { AcademicSession, PrismaClient } from "@prisma/client";

const academicSessionsCount = 3;

const academicSessionsData = Array.from(
  { length: academicSessionsCount },
  (_, i) => {
    const year = new Date().getFullYear() - i;
    return {
      year,
    };
  },
);

export const createAcademicSessions = async (arg: {
  prisma: PrismaClient;
}): Promise<AcademicSession[]> => {
  const { prisma } = arg;

  const academicSessions = await prisma.academicSession.createManyAndReturn({
    data: academicSessionsData,
  });

  return academicSessions;
};
