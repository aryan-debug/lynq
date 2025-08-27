"use client";

import { useCallback, useState } from "react";
import { ReactFlowProvider, Node, Edge } from "@xyflow/react";
import Flow from "@/components/Flow";
import Sidebar from "@/components/Sidebar";
import "@xyflow/react/dist/style.css";

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
  const [projects, setProjects] = useState<Project[]>([
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
  ]);
  const [activeProjectId, setActiveProjectId] = useState("project1");
  const [activeFlowId, setActiveFlowId] = useState("flow1");
  const activeProject =
    projects.find((p) => p.id === activeProjectId) || projects[0];

  const handleFlowChange = useCallback(
    (projectId: string, flowId: string, nodes: Node[], edges: Edge[]) => {
      setProjects((prevProjects) => {
        return prevProjects.map((project) => {
          if (project.id === projectId) {
            return {
              ...project,
              flows: project.flows.map((flow) => {
                if (flow.id === flowId) {
                  return {
                    ...flow,
                    nodes,
                    edges,
                  };
                }
                return flow;
              }),
            };
          }
          return project;
        });
      });
    },
    [],
  );

  const handleFlowSelect = useCallback((id: string) => {
    setActiveFlowId(id);
  }, []);

  const addFlow = useCallback((projectId: string) => {
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.id === projectId) {
          const newFlowId = `flow${project.flows.length + 1}`;
          return {
            ...project,
            flows: [
              ...project.flows,
              {
                id: newFlowId,
                name: `${project.flows.length + 1}`,
                nodes: [] as Node[],
                edges: [] as Edge[],
              },
            ],
          };
        }
        return project;
      });
    });
  }, []);

  const changeFlowName = useCallback(
    (projectId: string, flowId: string, newName: string) => {
      setProjects((prevProjects) => {
        return prevProjects.map((project) => {
          if (project.id === projectId) {
            return {
              ...project,
              flows: project.flows.map((flow) =>
                flow.id === flowId ? { ...flow, name: newName } : flow,
              ),
            };
          }
          return project;
        });
      });
    },
    [],
  );

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {projects.map(
        (project) =>
          project.id === activeProjectId &&
          project.flows.map((flow) => (
            <ReactFlowProvider key={flow.id}>
              <Flow
                project={project}
                flowId={flow.id}
                flowData={flow}
                onFlowChange={handleFlowChange}
                isActive={activeFlowId === flow.id}
              />
            </ReactFlowProvider>
          )),
      )}

      <Sidebar
        projects={projects}
        activeProject={activeProject}
        setActiveProjectId={setActiveProjectId}
        activeFlowId={activeFlowId}
        onSelectFlow={handleFlowSelect}
        onAddFlow={addFlow}
        onChangeFlowName={changeFlowName}
      />
    </div>
  );
}

export default MainApp;
