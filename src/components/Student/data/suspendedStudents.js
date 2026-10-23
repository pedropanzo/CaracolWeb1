import { studentRecords } from "../../../data/students";

export const suspendedStudents = studentRecords
  .filter((student) => student.estado === "Suspenso")
  .map((student) => ({
    id: student.id,
    name: student.name,
    reason: student.suspension?.reason ?? "",
  }));