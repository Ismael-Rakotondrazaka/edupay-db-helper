import {
  AcademicSession,
  EquipmentAmount,
  Faculty,
  Level,
  MonthAmount,
  PrismaClient,
  Student,
} from "@prisma/client";
import {
  createAcademicSessions,
  createEquipmentAmounts,
  createFaculties,
  createLevels,
  createPayments,
  createStudents,
} from "./seeders";
import { createMonthAmounts } from "./seeders/createMonthAmount";

const prisma = new PrismaClient();

const main = async () => {
  console.time("=> Total seed duration");

  /* ---------------------------------- Levels ---------------------------------- */
  console.time("Level seed duration");

  const levels: Level[] = await createLevels({
    prisma,
  });

  console.timeEnd("Level seed duration");

  /* --------------------------------- Faculty -------------------------------- */
  console.time("Faculty seed duration");

  const faculties: Faculty[] = await createFaculties({
    prisma,
  });

  console.timeEnd("Faculty seed duration");

  /* --------------------------------- AcademicSession -------------------------------- */
  console.time("AcademicSession seed duration");

  const academicSessions: AcademicSession[] = await createAcademicSessions({
    prisma,
  });

  console.timeEnd("AcademicSession seed duration");

  /* --------------------------------- Student -------------------------------- */
  console.time("Student seed duration");

  const students: Student[] = await createStudents({
    prisma,
    faculties,
    levels,
    academicSession: academicSessions.at(-1)!,
  });

  console.timeEnd("Student seed duration");

  /* --------------------------------- EquipmentAmount -------------------------------- */
  console.time("EquipmentAmount seed duration");

  const equipmentAmounts: EquipmentAmount[] = await createEquipmentAmounts({
    prisma,
    levels: levels.slice(0, 3),
  });

  console.timeEnd("EquipmentAmount seed duration");

  /* --------------------------------- MonthAmount -------------------------------- */
  console.time("MonthAmount seed duration");

  const monthAmounts: MonthAmount[] = await createMonthAmounts({
    prisma,
    levels: levels.slice(0, 3),
  });

  console.timeEnd("MonthAmount seed duration");

  /* --------------------------------- Payment -------------------------------- */
  console.time("Payment seed duration");

  await createPayments({
    prisma,
    equipmentAmounts,
    monthAmounts,
    students,
  });

  console.timeEnd("Payment seed duration");

  console.timeEnd("=> Total seed duration");
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
