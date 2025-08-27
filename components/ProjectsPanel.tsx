import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Project } from "@/app/page";
import "./styles/projectsPanel.css";
import { useProjectStore } from "@/stores/projectStore";

interface ProjectsPanelProps {
  setIsProjectView: (v: boolean) => void;
  isProjectView: boolean;
}

function ProjectsPanel({
  setIsProjectView,
  isProjectView,
}: ProjectsPanelProps) {
  const { projects, activeProjectId, setActiveProjectId } = useProjectStore();

  const activeProject =
    projects.find((project) => project.id === activeProjectId) || projects[0];

  return (
    <div className={`project-panel ${isProjectView ? "show" : ""}`}>
      <button
        className="close-button"
        onClick={() => setIsProjectView(false)}
        aria-label="Back to flows"
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="xs"
          style={{ width: "auto" }}
        />{" "}
        Back
      </button>
      <h1>Projects</h1>
      <div className="project-list">
        {projects.map((project) => (
          <div
            className={`project-item ${project.id === activeProject.id ? "active" : ""}`}
            key={project.id}
            onClick={() => {
              setActiveProjectId(project.id);
              setIsProjectView(false);
            }}
          >
            <h3>{project.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPanel;
