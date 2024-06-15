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
  const student = await prisma.student.findFirst({
    where: {
      name: {
        contains: "ol",
        mode: "insensitive",
      },
    },
    include: {
      level: true,
      academicSession: true,
      faculty: true,
    },
    orderBy: [
      {
        name: "asc",
      },
      {
        facultyId: "asc",
      },
    ],
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
