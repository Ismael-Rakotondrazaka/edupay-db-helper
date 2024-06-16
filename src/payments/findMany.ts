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
  const payments = await prisma.payment.findMany({
    include: {
      level: true,
      academicSession: true,
      student: {
        include: {
          academicSession: true,
          faculty: true,
          level: true,
        },
      },
      paymentItems: true,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });

  console.info(payments.length);
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
