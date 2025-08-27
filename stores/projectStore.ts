import { create } from "zustand";
export type FlowData = {
  id: string;
  name: string;
  nodes: any[];
  edges: any[];
};
export type Project = {
  id: string;
  name: string;
  flows: FlowData[];
};

interface ProjectState {
  projects: Project[];
}

const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [
    {
      id: "project1",
      name: "Project 1",
      flows: [
        { id: "flow1", name: "People", nodes: [], edges: [] },
        { id: "flow2", name: "Events", nodes: [], edges: [] },
      ],
    },
  ],
  activeProjectId: () => get().projects[0].id,
}));
