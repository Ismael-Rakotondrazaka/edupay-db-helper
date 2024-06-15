import { SexType, faker } from "@faker-js/faker";
import { Gender, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

prisma.$on("query", (event) => {
  console.log(
    "/* -------------------------------------------------------------------------- */"
  );
  console.log("Query: " + event.query);
  console.log("Params: " + event.params);
  console.log(
    "/* -------------------------------------------------------------------------- */"
  );
});

const main = async () => {
  const sexType = faker.person.sexType();
  const firstName = faker.person.firstName(sexType);
  const lastName = faker.person.lastName(sexType);
  const genderMap: Record<SexType, Gender> = {
    female: "FEMALE",
    male: "MALE",
  };
  const gender = genderMap[sexType];

  const student = await prisma.student.create({
    data: {
      levelId: 2,
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({
        firstName,
        lastName,
      }),
      academicSessionId: 2,
      birthDate: faker.date.past({
        years: 30,
      }),
      facultyId: 2,
      gender,
      id: faker.string.alphanumeric({
        casing: "lower",
        length: 5,
      }),
    },
    include: {
      level: true,
      academicSession: true,
      faculty: true,
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
