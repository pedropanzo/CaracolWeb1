import { create } from "zustand";
import { studentRecords } from "../data/students";

export const useStudentStore = create((set) => ({
  students: studentRecords,
  addStudent: (student) => set((state) => ({
    students: [...state.students, { ...student, id: Math.max(0, ...state.students.map((item) => item.id)) + 1 }],
  })),
  confirmStudent: (id, academicData) => set((state) => ({
    students: state.students.map((student) => student.id === id
      ? { ...student, ...academicData, estado: "Activo" }
      : student),
  })),
  suspendStudent: (id, suspension) => set((state) => ({
    students: state.students.map((student) => student.id === id
      ? { ...student, estadoAnterior: student.estado, estado: "Suspenso", suspension }
      : student),
  })),
  reinstateStudent: (id) => set((state) => ({
    students: state.students.map((student) => student.id === id
      ? { ...student, estado: student.estadoAnterior || "Activo", estadoAnterior: undefined, suspension: undefined }
      : student),
  })),
}));
