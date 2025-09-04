"use client";

import { ReactFlowProvider } from "@xyflow/react";
import Flow from "@/components/Flow";
import Sidebar from "@/components/sidebar/Sidebar";
import "@xyflow/react/dist/style.css";
import { useProjectStore } from "@/stores/projectStore";
import Timeline from "@/components/Timeline";

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
          project.items.map((item) => {
            if (item.type === "flow") {
              return (
                <ReactFlowProvider key={item.id}>
                  <Flow project={project} flowId={item.id} flowData={item} />
                </ReactFlowProvider>
              );
            }
            if (item.type === "timeline") {
              return <Timeline key={item.id} timelineId={item.id} />;
            }
            return null;
          }),
      )}
      <Sidebar />
    </div>
  );
}

export default MainApp;
