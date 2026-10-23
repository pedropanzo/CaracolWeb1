import { studentRecords, courses, classes, turmas } from "../../../data/students";

export const student = studentRecords;
export const studentInfo = studentRecords.find((item) => item.estado === "Pendente") ?? studentRecords[0];
export const history = studentInfo.history;
export { courses, classes, turmas };
