import React, { useState, useEffect, useMemo, useRef } from "react";
import { Panel } from "@xyflow/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Lato } from "next/font/google";
import { Project } from "@/app/page";
import FlowsPanel from "./FlowsPanel";
import ProjectsPanel from "./ProjectsPanel";
import "./styles/sidebar.css";

const lato = Lato({ weight: "400" });

interface SidebarProps {
  projects: Project[];
  activeProject: Project;
  setActiveProjectId: (projectId: string) => void;
  activeFlowId: string;
  onSelectFlow: (id: string) => void;
  onAddFlow: (projectId: string) => void;
  onChangeFlowName: (projectId: string, flowId: string, name: string) => void;
  nodeTypes?: any;
}

function Sidebar({
  projects,
  activeProject,
  setActiveProjectId,
  activeFlowId,
  onSelectFlow,
  onAddFlow,
  onChangeFlowName,
  nodeTypes = {},
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProjectView, setIsProjectView] = useState(false);

  return (
    <Panel className={`${lato.className}`}>
      <div className="sidebar-container">
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="hamburger-button"
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={faBars} size="2xl" />
        </button>

        {isOpen && (
          <div className="menu-overlay" onClick={() => setIsOpen(false)} />
        )}

        <div className={`menu-panel ${isOpen ? "open" : "closed"}`}>
          <div className="menu-header">
            <button
              onClick={() => setIsOpen(false)}
              className="close-button"
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </button>
          </div>

          <div className="menu-content">
            <FlowsPanel
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              activeProject={activeProject}
              activeFlowId={activeFlowId}
              onSelectFlow={onSelectFlow}
              onAddFlow={onAddFlow}
              onChangeFlowName={onChangeFlowName}
              nodeTypes={nodeTypes}
              setIsProjectView={setIsProjectView}
              isProjectView={isProjectView}
            />
            <ProjectsPanel
              projects={projects}
              activeProject={activeProject}
              setActiveProjectId={setActiveProjectId}
              setIsProjectView={setIsProjectView}
              isProjectView={isProjectView}
            />
          </div>
        </div>
      </div>
    </Panel>
  );
}

export default Sidebar;
