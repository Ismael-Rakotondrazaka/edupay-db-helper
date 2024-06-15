import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

prisma.$on("query", (event) => {
  console.info(
    "/* -------------------------------------------------------------------------- */",
  );
  console.info("Query: " + event.query);
  console.info("Params: " + event.params);
  console.info(
    "/* -------------------------------------------------------------------------- */",
  );
});

const main = async () => {
  await prisma.student.findMany({
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
