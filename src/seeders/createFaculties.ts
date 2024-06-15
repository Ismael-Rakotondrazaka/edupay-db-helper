import { Faculty, PrismaClient } from "@prisma/client";

export const facultiesData: string[] = [
  "Faculté des Sciences et de la Technologie",
  "Faculté des Lettres et des Sciences Humaines",
  "Faculté de Droit et des Sciences Politiques",
  "Faculté de Médecine et des Sciences de la Santé",
  "Faculté des Sciences Économiques et de Gestion",
  "Faculté des Arts et des Sciences Sociales",
  "Faculté d'Ingénierie et d'Informatique",
  "Faculté d'Éducation et de Pédagogie",
  "Faculté d'Agriculture et des Sciences de l'Environnement",
  "Faculté de Langues et de Communication",
];

export const createFaculties = async (arg: {
  prisma: PrismaClient;
}): Promise<Faculty[]> => {
  const { prisma } = arg;

  const faculties = await prisma.faculty.createManyAndReturn({
    data: facultiesData.map((name) => ({ name })),
  });

  return faculties;
};
