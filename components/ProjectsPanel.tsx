import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./styles/projectsPanel.css";
import { useProjectStore } from "@/stores/projectStore";
import EditableHeading from "./EditableHeading";

interface ProjectsPanelProps {
  setIsProjectView: (v: boolean) => void;
  isProjectView: boolean;
}

function ProjectsPanel({
  setIsProjectView,
  isProjectView,
}: ProjectsPanelProps) {
  const {
    projects,
    activeProjectId,
    setActiveProjectId,
    addProject,
    updateProjectName,
  } = useProjectStore();

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
            <EditableHeading
              value={project.name}
              onChange={(newName) => updateProjectName(project.id, newName)}
              className="minimap-title"
              style={{ marginBottom: "5px", textAlign: "center" }}
              tag="h4"
            />
          </div>
        ))}
        <button
          className="add-button"
          role="button"
          onClick={() => addProject()}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
}

export default ProjectsPanel;
