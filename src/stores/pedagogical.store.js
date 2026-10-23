import { create } from "zustand";
import { persist } from "zustand/middleware";
import { pedagogicalStudents } from "../data/pedagogical";

const initialStudents = pedagogicalStudents.map((student) => ({
  ...student,
  notes: student.notes ? { ...student.notes } : null,
}));

export const usePedagogicalStore = create(
  persist(
    (set) => ({
      students: initialStudents,
      updateStudent: (id, changes) =>
        set((state) => ({
          students: state.students.map((student) =>
            student.id === id ? { ...student, ...changes } : student,
          ),
        })),
    }),
    { name: "caracol-pedagogical-data" },
  ),
);
