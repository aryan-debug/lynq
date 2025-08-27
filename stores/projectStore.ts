import {
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import { produce } from "immer";
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
  activeProjectId: string;
  activeFlowId: string;

  setActiveProjectId: (projectId: string) => void;
  setActiveFlowId: (flowId: string) => void;
  onNodesChange: (
    projectId: string,
    flowId: string,
    changes: Parameters<OnNodesChange>[0],
  ) => void;
  onEdgesChange: (
    projectId: string,
    flowId: string,
    changes: Parameters<OnEdgesChange>[0],
  ) => void;
  onConnect: (
    projectId: string,
    flowId: string,
    connection: Parameters<OnConnect>[0],
  ) => void;
  updateFlowName: (projectId: string, flowId: string, name: string) => void;

  addFlow: (projectId: string) => void;
}
export const useProjectStore = create<ProjectState>((set) => ({
  projects: [
    {
      id: "project1",
      name: "Project 1",
      flows: [
        { id: "flow1", name: "People", nodes: [], edges: [] },
        { id: "flow2", name: "Events", nodes: [], edges: [] },
      ],
    },
    {
      id: "project2",
      name: "Project 2",
      flows: [
        { id: "flow1", name: "People", nodes: [], edges: [] },
        { id: "flow2", name: "Events", nodes: [], edges: [] },
      ],
    },
  ],
  activeProjectId: "project1",
  activeFlowId: "flow1",

  setActiveProjectId: (projectId) =>
    set(() => ({ activeProjectId: projectId })),
  setActiveFlowId: (flowId) => set(() => ({ activeFlowId: flowId })),

  onNodesChange: (projectId, flowId, changes) => {
    set(
      produce((state) => {
        const project = state.projects.find((p: Project) => p.id === projectId);
        const flow = project.flows.find((f: FlowData) => f.id === flowId);
        flow.nodes = applyNodeChanges(changes, flow.nodes);
      }),
    );
  },

  onEdgesChange: (projectId, flowId, changes) => {
    set(
      produce((state) => {
        const project = state.projects.find((p: Project) => p.id === projectId);
        const flow = project.flows.find((f: FlowData) => f.id === flowId);
        flow.edges = applyEdgeChanges(changes, flow.edges);
      }),
    );
  },

  onConnect: (projectId, flowId, connection) => {
    set(
      produce((state) => {
        const project = state.projects.find((p: Project) => p.id === projectId);
        const flow = project.flows.find((f: FlowData) => f.id === flowId);
        flow.edges = addEdge(connection, flow.edges);
      }),
    );
  },

  updateFlowName: (projectId, flowId, name) =>
    set(
      produce((state) => {
        const project = state.projects.find(
          (project: Project) => project.id === projectId,
        );
        const flow = project.flows.find((flow: FlowData) => flow.id === flowId);
        flow.name = name;
      }),
    ),

  addFlow: (projectId) =>
    set(
      produce((state) => {
        const project = state.projects.find(
          (project: Project) => project.id === projectId,
        );
        project.flows.push({
          id: `flow${project.flows.length + 1}`,
          name: `${project.flows.length + 1}`,
          nodes: [],
          edges: [],
        });
      }),
    ),
}));
