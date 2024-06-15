import {
  AcademicSession,
  Faculty,
  Gender,
  Level,
  Prisma,
  PrismaClient,
  Student,
} from "@prisma/client";
import { faker } from "@faker-js/faker/locale/fr";
import { SexType } from "@faker-js/faker";

export const createStudents = async (arg: {
  prisma: PrismaClient;
  levels: Level[];
  faculties: Faculty[];
  academicSession: AcademicSession;
}): Promise<Student[]> => {
  const { prisma, levels, faculties, academicSession } = arg;

  const studentsData: {
    levelId: number;
    firstName: string;
    lastName: string;
    email: string;
  }[] = [];

  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    const studentsCount = 10;
    for (let j = 0; j < studentsCount; j++) {
      const studentNumber = i * studentsCount + j + 1;
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
      studentsData.push({ levelId: level.id, firstName, lastName, email });
    }
  }

  const students = await prisma.student.createManyAndReturn({
    data: faker.helpers.multiple(
      (): Prisma.StudentCreateManyInput => {
        const sexType = faker.person.sexType();
        const firstName = faker.person.firstName(sexType);
        const lastName = faker.person.lastName(sexType);
        const genderMap: Record<SexType, Gender> = {
          female: "FEMALE",
          male: "MALE",
        };
        const gender = genderMap[sexType];

        return {
          levelId: faker.helpers.arrayElement(levels).id,
          name: `${firstName} ${lastName}`,
          email: faker.internet.email({
            firstName,
            lastName,
          }),
          academicSessionId: academicSession.id,
          birthDate: faker.date.past({
            years: 30,
          }),
          facultyId: faker.helpers.arrayElement(faculties).id,
          gender,
          id: faker.string.alphanumeric({
            casing: "lower",
            length: 5,
          }),
        };
      },
      {
        count: {
          max: 30,
          min: 20,
        },
      }
    ),
  });

  return students;
};
