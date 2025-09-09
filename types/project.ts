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
