import React, { useEffect, useMemo, useRef, useState } from "react";
import { ReactFlow, MiniMap } from "@xyflow/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import EditableHeading from "./EditableHeading";
import "./styles/flowsPanel.css";
import { useProjectStore } from "@/stores/projectStore";
import { nodeTypes } from "./Flow";

interface FlowsPanelProps {
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
  setIsProjectView: (v: boolean) => void;
  isProjectView: boolean;
}

function FlowsPanel({
  isOpen,
  setIsOpen,
  setIsProjectView,
  isProjectView,
}: FlowsPanelProps) {
  const [isClient, setIsClient] = useState(false);
  const {
    projects,
    activeProjectId,
    activeFlowId,
    setActiveFlowId,
    updateFlowName,
    addFlow,
  } = useProjectStore();

  const activeProject =
    projects.find((project) => project.id === activeProjectId) || projects[0];

  const huesCacheRef = useRef<Record<string, number>>({});

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const flowIds = activeProject.flows.map((f) => f.id);

  const flowHues = useMemo(() => {
    if (!isClient) return {};
    const newHues = { ...huesCacheRef.current };
    activeProject.flows.forEach((flow) => {
      if (!(flow.id in newHues))
        newHues[flow.id] = Math.floor(Math.random() * 361);
    });
    const currentFlowIds = new Set(activeProject.flows.map((f) => f.id));
    Object.keys(newHues).forEach((id) => {
      if (!currentFlowIds.has(id)) delete newHues[id];
    });
    huesCacheRef.current = newHues;
    return newHues;
  }, [flowIds, isClient, activeProject.flows]);

  return (
    <>
      <div
        className={`back-button-column${isProjectView ? " closed" : ""}`}
        onClick={() => setIsProjectView(true)}
      >
        <div className="back-button-inner">
          <FontAwesomeIcon icon={faChevronLeft} size="xl" />
          <h3 style={{ transform: "rotate(-90deg)" }}>Projects</h3>
          <FontAwesomeIcon icon={faChevronLeft} size="xl" />
        </div>
      </div>

      <div
        className={`flows-panel ${isProjectView ? "slide-out" : "slide-in"}`}
      >
        <div className="sidebar-content">
          <div>
            {activeProject.flows.map((flow) => (
              <div
                key={flow.id}
                className={`minimap-container ${
                  activeFlowId === flow.id ? "active" : ""
                }`}
                onClick={() => setActiveFlowId(flow.id)}
              >
                <div onClick={(e) => e.stopPropagation()}>
                  <EditableHeading
                    value={flow.name}
                    onChange={(newName) =>
                      updateFlowName(activeProject.id, flow.id, newName)
                    }
                    className="minimap-title"
                    style={{ marginBottom: "5px", textAlign: "center" }}
                    tag="h4"
                  />
                </div>
                <div className="minimap-wrapper">
                  <ReactFlow
                    nodes={flow.nodes}
                    edges={flow.edges}
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
                          ? `hsla(${flowHues[flow.id]}, 72%, 70%, 1)`
                          : "hsla(0, 72%, 70%, 1)",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    />
                  </ReactFlow>
                </div>
              </div>
            ))}
            <button
              className="add-button"
              role="button"
              onClick={() => addFlow(activeProject.id)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FlowsPanel;
