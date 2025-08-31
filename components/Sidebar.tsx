import React, { useState } from "react";
import { Panel } from "@xyflow/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Lato } from "next/font/google";
import { Project } from "@/app/page";
import FlowsPanel from "./FlowsPanel";
import ProjectsPanel from "./ProjectsPanel";
import "./styles/sidebar.css";

const lato = Lato({ weight: "400" });

function Sidebar() {
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
              setIsProjectView={setIsProjectView}
              isProjectView={isProjectView}
            />
            <ProjectsPanel
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
