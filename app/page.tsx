"use client";
import { ReactFlowProvider } from "@xyflow/react";
import Flow from "@/components/Flow";
import Sidebar from "@/components/sidebar/Sidebar";
import Timeline from "@/components/Timeline";
import { AutoSaveProvider } from "@/components/AutoSaveProvider";
import { useProjectStore } from "@/stores/projectStore";
import "@xyflow/react/dist/style.css";

function MainApp() {
  const projects = useProjectStore((state) => state.projects);
  const activeProjectId = useProjectStore((state) => state.activeProjectId);

  return (
    <AutoSaveProvider intervalMs={60000}>
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
    </AutoSaveProvider>
  );
}

export default MainApp;
