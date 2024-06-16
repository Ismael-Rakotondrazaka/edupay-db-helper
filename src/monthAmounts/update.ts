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
  const monthAmount = await prisma.monthAmount.update({
    where: {
      id: 1,
    },
    data: {
      value: Math.floor(Math.random() * 20000),
    },
    include: {
      level: true,
    },
  });

  console.info(monthAmount);
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
