import { faker } from "@faker-js/faker";
import {
  EquipmentAmount,
  MonthAmount,
  Payment,
  PaymentPeriod,
  Prisma,
  PrismaClient,
  Student,
} from "@prisma/client";

const createPaymentItems = (arg: {
  student: Student;
  levelIdEquipmentAmountMap: Map<number, number>;
  levelIdMonthAmountMap: Map<number, number>;
}): Prisma.PaymentItemCreateManyPaymentInput[] => {
  const { student, levelIdEquipmentAmountMap, levelIdMonthAmountMap } = arg;

  const allPeriods: PaymentPeriod[] = [
    "EQUIPMENT",
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const periods = allPeriods.slice(
    0,
    faker.number.int({
      min: 0,
      max: Math.floor(allPeriods.length / 2),
    }),
  );

  return periods.reduce(
    (prev, period): Prisma.PaymentItemCreateManyPaymentInput[] => {
      if (period === "EQUIPMENT") {
        if (levelIdEquipmentAmountMap.has(student.levelId)) {
          return [
            ...prev,
            {
              amount: levelIdEquipmentAmountMap.get(student.levelId)!,
              period,
            },
          ];
        }
      } else if (levelIdMonthAmountMap.has(student.levelId)) {
        return [
          ...prev,
          {
            amount: levelIdMonthAmountMap.get(student.levelId)!,
            period,
          },
        ];
      }

      return prev;
    },
    [] as Prisma.PaymentItemCreateManyPaymentInput[],
  );
};

export const createPayments = async (arg: {
  prisma: PrismaClient;
  students: Student[];
  monthAmounts: MonthAmount[];
  equipmentAmounts: EquipmentAmount[];
}): Promise<Payment[]> => {
  const { prisma, students, monthAmounts, equipmentAmounts } = arg;

  const levelIdEquipmentAmountMap: Map<number, number> = new Map();
  equipmentAmounts.forEach((amount) => {
    levelIdEquipmentAmountMap.set(amount.levelId, amount.value);
  });

  const levelIdMonthAmountMap: Map<number, number> = new Map();
  monthAmounts.forEach((amount) => {
    levelIdMonthAmountMap.set(amount.levelId, amount.value);
  });

  const data: Prisma.PaymentCreateInput[] = students.map(
    (student): Prisma.PaymentCreateInput => {
      return {
        id: faker.string.alphanumeric({
          casing: "lower",
          length: 5,
        }),
        level: {
          connect: {
            id: student.levelId,
          },
        },
        academicSession: {
          connect: {
            id: student.academicSessionId,
          },
        },
        student: {
          connect: {
            id: student.id,
          },
        },
        paymentItems: {
          createMany: {
            data: createPaymentItems({
              student,
              levelIdEquipmentAmountMap,
              levelIdMonthAmountMap,
            }),
          },
        },
        createdAt: faker.date.past(),
      };
    },
  );

  const payments = await Promise.all(
    data.map((dataInput) =>
      prisma.payment.create({
        data: dataInput,
      }),
    ),
  );

  return payments;
};
