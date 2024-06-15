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
  const payments = await prisma.student.findMany({
    where: {
      academicSessionId: 1,
      NOT: {
        payments: {
          every: {
            paymentItems: {
              some: {
                period: "FEBRUARY",
              },
            },
          },
        },
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

  console.info(payments);
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
