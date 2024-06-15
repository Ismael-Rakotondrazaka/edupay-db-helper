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
  const payments = await prisma.student.findMany({
    where: {
      academicSessionId: 1,
      NOT: {
        payments: {
          some: {
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

  console.log(payments);
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
