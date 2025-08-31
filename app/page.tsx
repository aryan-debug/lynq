"use client";

import { ReactFlowProvider } from "@xyflow/react";
import Flow from "@/components/Flow";
import Sidebar from "@/components/Sidebar";
import "@xyflow/react/dist/style.css";
import { useProjectStore } from "@/stores/projectStore";

export type Project = {
  id: string;
  name: string;
  flows: FlowData[];
};

export type FlowData = {
  id: string;
  name: string;
  nodes: any[];
  edges: any[];
};

function MainApp() {
  const projects = useProjectStore((state) => state.projects);
  const activeProjectId = useProjectStore((state) => state.activeProjectId);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {projects.map(
        (project) =>
          project.id === activeProjectId &&
          project.flows.map((flow) => (
            <ReactFlowProvider key={flow.id}>
              <Flow project={project} flowId={flow.id} flowData={flow} />
            </ReactFlowProvider>
          )),
      )}

      <Sidebar />
    </div>
  );
}

export default MainApp;
