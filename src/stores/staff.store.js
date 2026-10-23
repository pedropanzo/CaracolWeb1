import { create } from "zustand";
import { persist } from "zustand/middleware";
import { employeesMock, usersMock } from "../data/staff";

const initialEmployees = employeesMock.map((employee) => ({ ...employee }));
const initialUsers = usersMock.map((user) => ({ ...user }));

export const useStaffStore = create(
  persist(
    (set) => ({
      employees: initialEmployees,
      users: initialUsers,
      saveEmployee: (employee) =>
        set((state) => ({
          employees: employee.id
            ? state.employees.map((item) =>
                item.id === employee.id ? employee : item,
              )
            : [
                {
                  ...employee,
                  id: Math.max(0, ...state.employees.map((item) => item.id)) + 1,
                },
                ...state.employees,
              ],
        })),
      saveUser: (user) =>
        set((state) => ({
          users: user.id
            ? state.users.map((item) => (item.id === user.id ? user : item))
            : [
                {
                  ...user,
                  id: Math.max(0, ...state.users.map((item) => item.id)) + 1,
                },
                ...state.users,
              ],
        })),
    }),
    { name: "caracol-staff-data" },
  ),
);
