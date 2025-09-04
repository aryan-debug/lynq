import {
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import { produce } from "immer";
import { create } from "zustand";

export interface Timeline {
  type: "timeline";
  id: string;
  name: string;
  events: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  detail: string;
}

export type FlowData = {
  type: "flow";
  id: string;
  name: string;
  nodes: any[];
  edges: any[];
};

export type ProjectItem = FlowData | Timeline;

export type Project = {
  id: string;
  name: string;
  items: ProjectItem[];
};

interface ProjectState {
  projects: Project[];
  activeProjectId: string;
  activeItemId: string;

  setActiveProjectId: (projectId: string) => void;
  setActiveItemId: (flowId: string) => void;

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

  updateProjectName: (projectId: string, name: string) => void;
  updateFlowName: (projectId: string, flowId: string, name: string) => void;

  addProject: () => void;
  addFlow: (projectId: string) => void;
  addTimeline: (projectId: string) => void;
  addEvent: (projectId: string, timelineId: string) => void;

  removeEvent: (projectId: string, timelineId: string, eventId: string) => void;

  onEventEdit: (
    projectId: string,
    timelineId: string,
    eventId: string,
    field: keyof TimelineEvent,
    value: string,
  ) => void;

  setEvents: (
    projectId: string,
    timelineId: string,
    events: TimelineEvent[],
  ) => void;
}
export const useProjectStore = create<ProjectState>((set) => ({
  projects: [
    {
      id: "project1",
      name: "Project 1",
      items: [
        { type: "flow", id: "flow1", name: "People", nodes: [], edges: [] },
        {
          type: "timeline",
          id: "timeline1",
          name: "Timeline",
          events: [
            {
              id: Date.now().toString(),
              date: new Date().toISOString().split("T")[0],
              title: "New Event",
              subtitle: "Event subtitle",
              detail: "Event details go here...",
            },
          ],
        },
      ],
    },
    {
      id: "project2",
      name: "Project 2",
      items: [
        { type: "flow", id: "flow1", name: "People", nodes: [], edges: [] },
        { type: "flow", id: "flow2", name: "Events", nodes: [], edges: [] },
      ],
    },
  ],
  activeProjectId: "project1",
  activeItemId: "timeline1",

  setActiveProjectId: (projectId) =>
    set(() => ({ activeProjectId: projectId })),

  setActiveItemId: (flowId) => set(() => ({ activeItemId: flowId })),

  onNodesChange: (projectId, flowId, changes) => {
    set(
      produce((state: ProjectState) => {
        const project = state.projects.find((p: Project) => p.id === projectId);
        const flow = project?.items.find(
          (f: ProjectItem) => f.id === flowId,
        ) as FlowData;
        flow.nodes = applyNodeChanges(changes, flow.nodes);
      }),
    );
  },

  onEdgesChange: (projectId, flowId, changes) => {
    set(
      produce((state: ProjectState) => {
        const project = state.projects.find((p: Project) => p.id === projectId);
        const flow = project?.items.find(
          (f: ProjectItem) => f.id === flowId,
        ) as FlowData;
        flow.edges = applyEdgeChanges(changes, flow.edges);
      }),
    );
  },

  onConnect: (projectId, flowId, connection) => {
    set(
      produce((state: ProjectState) => {
        const project = state.projects.find((p: Project) => p.id === projectId);
        const flow = project?.items.find(
          (f: ProjectItem) => f.id === flowId,
        ) as FlowData;
        flow.edges = addEdge(connection, flow.edges);
      }),
    );
  },

  updateProjectName: (projectId, name) =>
    set(
      produce((state: ProjectState) => {
        const project = state.projects.find(
          (project: Project) => project.id === projectId,
        );
        if (project) {
          project.name = name;
        }
      }),
    ),

  updateFlowName: (projectId, flowId, name) =>
    set(
      produce((state: ProjectState) => {
        const project = state.projects.find(
          (project: Project) => project.id === projectId,
        );
        const flow = project?.items.find(
          (flow: ProjectItem) => flow.id === flowId,
        ) as FlowData;
        flow.name = name;
      }),
    ),

  addProject: () =>
    set(
      produce((state: ProjectState) => {
        state.projects.push({
          id: `project${state.projects.length + 1}`,
          name: `Project ${state.projects.length + 1}`,
          items: [
            { type: "flow", id: "flow1", name: "1", nodes: [], edges: [] },
          ],
        });
      }),
    ),

  addFlow: (projectId) =>
    set(
      produce((state: ProjectState) => {
        const project = state.projects.find(
          (project: Project) => project.id === projectId,
        );
        const flow = {
          type: "flow",
          id: `flow${project?.items.length! + 1}`,
          name: `${project?.items.length! + 1}`,
          nodes: [],
          edges: [],
        } as FlowData;
        project?.items.push(flow);
      }),
    ),

  addTimeline: (projectId) =>
    set(
      produce((state: ProjectState) => {
        const project = state.projects.find(
          (project: Project) => project.id === projectId,
        );
        const timeline = {
          type: "timeline",
          id: `timeline${project?.items.length! + 1}`,
          name: `${project?.items.length! + 1}`,
        } as Timeline;
        project?.items.push(timeline);
      }),
    ),

  addEvent: (projectId, timelineId) =>
    set(
      produce((state: ProjectState) => {
        const project = state.projects.find(
          (project: Project) => project.id === projectId,
        );
        const timeline = project?.items.find(
          (item) => item.id === timelineId,
        ) as Timeline;
        timeline.events.push({
          id: Date.now().toString(),
          date: new Date().toISOString().split("T")[0],
          title: "New Event",
          subtitle: "Event subtitle",
          detail: "Event details go here...",
        });
      }),
    ),

  removeEvent: (projectId, timelineId, eventId) =>
    set(
      produce((state: ProjectState) => {
        const project = state.projects.find(
          (project: Project) => project.id === projectId,
        );
        const timeline = project?.items.find(
          (item) => item.id === timelineId,
        ) as Timeline;
        timeline.events.splice(
          timeline.events.findIndex(
            (event: TimelineEvent) => event.id === eventId,
          ),
        );
      }),
    ),

  onEventEdit: (
    projectId: string,
    timelineId: string,
    eventId: string,
    field: keyof TimelineEvent,
    value: string,
  ) =>
    set(
      produce((state) => {
        const project = state.projects.find(
          (project: Project) => project.id === projectId,
        );
        const timeline = project?.items.find(
          (item: ProjectItem) => item.id === timelineId,
        ) as Timeline;

        const event = timeline.events.find((event) => event.id === eventId);
        if (event) {
          event[field] = value;
        }
      }),
    ),

  setEvents: (projectId, timelineId, events) =>
    set(
      produce((state) => {
        const project = state.projects.find(
          (project: Project) => project.id === projectId,
        );
        const timeline = project?.items.find(
          (item: ProjectItem) => item.id === timelineId,
        ) as Timeline;
        timeline.events = events;
      }),
    ),
}));
