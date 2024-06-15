import { faker } from "@faker-js/faker";
import {
  AcademicSession,
  EquipmentAmount,
  Faculty,
  Level,
  MonthAmount,
  Payment,
  PrismaClient,
  Student,
} from "@prisma/client";

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
  const student = await prisma.student.update({
    where: {
      id: "6u8vr",
    },
    data: {
      gender: faker.helpers.arrayElement(["FEMALE", "MALE"]),
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
