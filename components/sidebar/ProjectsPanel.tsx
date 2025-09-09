import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/projectsPanel.module.css";
import { useProjectStore } from "@/stores/projectStore";
import EditableHeading from "../EditableHeading";

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
    <div
      className={`${styles.projectPanel} ${isProjectView ? styles.show : ""}`}
    >
      <button
        className={styles.closeButton}
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
      <div className={styles.projectList}>
        {projects.map((project) => (
          <div
            className={`${styles.projectItem} ${project.id === activeProject.id ? styles.active : ""}`}
            key={project.id}
            onClick={() => {
              setActiveProjectId(project.id);
              setIsProjectView(false);
            }}
          >
            <EditableHeading
              value={project.name}
              onChange={(newName) => updateProjectName(project.id, newName)}
              className={styles.minimapTitle}
              style={{ marginBottom: "5px", textAlign: "center" }}
              tag="h4"
            />
          </div>
        ))}
        <button
          className={styles.addButton}
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
