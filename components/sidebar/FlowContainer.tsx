import { FlowData, ProjectItem, useProjectStore } from "@/stores/projectStore";
import { ReactFlow, MiniMap } from "@xyflow/react";
import EditableHeading from "../EditableHeading";
import { nodeTypes } from "../Flow";
import { useEffect, useMemo, useRef, useState } from "react";

interface FlowContainerProps {
  item: FlowData;
}

function FlowContainer({ item }: FlowContainerProps) {
  const {
    projects,
    setActiveItemId: setActiveFlowId,
    updateFlowName,
    activeProjectId,
    activeItemId: activeFlowId,
  } = useProjectStore();
  const [isClient, setIsClient] = useState(false);
  const activeProject =
    projects.find((project) => project.id === activeProjectId) || projects[0];

  useEffect(() => setIsClient(true), []);

  const huesCacheRef = useRef<Record<string, number>>({});

  const flowIds = activeProject.items.map((f) => f.id);

  const flowHues = useMemo(() => {
    if (!isClient) return {};
    const newHues = { ...huesCacheRef.current };
    activeProject.items.forEach((item: ProjectItem) => {
      if (!(item.id in newHues))
        newHues[item.id] = Math.floor(Math.random() * 361);
    });
    const currentFlowIds = new Set(activeProject.items.map((f) => f.id));
    Object.keys(newHues).forEach((id) => {
      if (!currentFlowIds.has(id)) delete newHues[id];
    });
    huesCacheRef.current = newHues;
    return newHues;
  }, [flowIds, isClient, activeProject.items]);

  return (
    <div
      key={item.id}
      className={`minimap-container ${activeFlowId === item.id ? "active" : ""}`}
      onClick={() => setActiveFlowId(item.id)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <EditableHeading
          value={item.name}
          onChange={(newName) =>
            updateFlowName(activeProject.id, item.id, newName)
          }
          className="minimap-title"
          style={{ marginBottom: "5px", textAlign: "center" }}
          tag="h4"
        />
      </div>
      <div className="minimap-wrapper">
        <ReactFlow
          nodes={item.nodes}
          edges={item.edges}
          nodeTypes={nodeTypes}
          fitView
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          panOnDrag={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          panOnScroll={false}
        >
          <MiniMap
            pannable={true}
            zoomable={true}
            position="bottom-left"
            style={{
              margin: 0,
              background: isClient
                ? `hsla(${flowHues[item.id]}, 72%, 70%, 1)`
                : "hsla(0, 72%, 70%, 1)",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          />
        </ReactFlow>
      </div>
    </div>
  );
}

export default FlowContainer;
