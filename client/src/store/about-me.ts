import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AboutMe {
  id: string | null;
  name: string | null;
  email: string | null;

  role: string[] | null;
  teams: string[] | null;
  soloTasks: string[] | null;
  assignedTasks: string[] | null;

  setMyInfo: (data: {
    id: string;
    name: string;
    email: string;
    role: string[];
    teams: string[];
    soloTasks: string[];
    assignedTasks: string[];
  }) => void;

  reset: () => void;
}

export const useAboutMeStore = create<AboutMe>()(
  persist(
    (set) => ({
      id: null,
      name: null,
      email: null,
      role: null,
      teams: null,
      soloTasks: null,
      assignedTasks: null,

      setMyInfo: (data) => set(data),

      reset: () =>
        set({
          id: null,
          name: null,
          email: null,
          role: null,
          teams: null,
          soloTasks: null,
          assignedTasks: null,
        }),
    }),

    {
      name: "aboutme",
      partialize: (state) => ({
        id: state.id,
        name: state.name,
        email: state.email,
        role: state.role,
        teams: state.teams,
        soloTasks: state.soloTasks,
        assignedTasks: state.assignedTasks,
      }),
    }
  )
);
