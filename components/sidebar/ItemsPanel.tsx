import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faPlus,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/flowsPanel.module.css";
import { useProjectStore } from "@/stores/projectStore";
import FlowContainer from "./FlowContainer";
import TimelineContainer from "./TimelineContainer";

interface ItemsPanelProps {
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
  setIsProjectView: (v: boolean) => void;
  isProjectView: boolean;
}

function ItemsPanel({
  isOpen,
  setIsOpen,
  setIsProjectView,
  isProjectView,
}: ItemsPanelProps) {
  const { projects, activeProjectId, addFlow, addTimeline } = useProjectStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const activeProject =
    projects.find((project) => project.id === activeProjectId) || projects[0];

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

  const handleAddFlow = () => {
    addFlow(activeProject.id);
    setShowDropdown(false);
  };

  const handleAddTimeline = () => {
    addTimeline(activeProject.id);
    setShowDropdown(false);
  };

  return (
    <>
      <div
        className={`${styles.backButtonColumn} ${isProjectView ? styles.closed : ""}`}
        onClick={() => setIsProjectView(true)}
      >
        <div className={styles.backButtonInner}>
          <FontAwesomeIcon icon={faChevronLeft} size="xl" />
          <h3 style={{ transform: "rotate(-90deg)" }}>Projects</h3>
          <FontAwesomeIcon icon={faChevronLeft} size="xl" />
        </div>
      </div>
      <div
        className={`${styles.flowsPanel} ${isProjectView ? styles.slideOut : styles.slideIn}`}
      >
        <div className={styles.sidebarContent}>
          <div>
            {activeProject.items.map((item) => {
              if (item.type === "flow") {
                return <FlowContainer key={item.id} item={item} />;
              }
              if (item.type === "timeline") {
                return <TimelineContainer key={item.id} item={item} />;
              }
            })}
            <div className={styles.addButtonContainer}>
              <button
                className={styles.addButton}
                role="button"
                onClick={handleAddFlow}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <div className={styles.dropdownWrapper}>
                <button
                  className={styles.dropdownButton}
                  role="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>
                <div
                  className={`${styles.dropdownMenu} ${showDropdown ? styles.show : ""}`}
                >
                  <button onClick={handleAddFlow}>Add Flow</button>
                  <button onClick={handleAddTimeline}>Add Timeline</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemsPanel;
