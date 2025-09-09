import React, { useState } from "react";
import { Panel } from "@xyflow/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Lato } from "next/font/google";
import ItemsPanel from "./ItemsPanel";
import ProjectsPanel from "./ProjectsPanel";
import styles from "@/styles/sidebar.module.css";
import { useAuthenticator } from "@aws-amplify/ui-react-core";
import { signInWithRedirect, signOut } from "@aws-amplify/auth";

const lato = Lato({ weight: "400" });

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProjectView, setIsProjectView] = useState(false);
  const { user } = useAuthenticator();
  return (
    <Panel className={lato.className}>
      <div className={styles.sidebarContainer}>
        <button
          onClick={() => setIsOpen((v) => !v)}
          className={styles.hamburgerButton}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={faBars} size="2xl" />
        </button>

        {isOpen && (
          <div
            className={styles.menuOverlay}
            onClick={() => setIsOpen(false)}
          />
        )}

        <div
          className={`${styles.menuPanel} ${isOpen ? styles.open : styles.closed}`}
        >
          <div className={styles.menuHeader}>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeButton}
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </button>
            {user !== undefined ? (
              <button onClick={() => signOut()}>Sign out</button>
            ) : (
              <button
                onClick={() => signInWithRedirect({ provider: "Google" })}
              >
                Sign in with Google
              </button>
            )}
          </div>

          <div className={styles.menuContent}>
            <ItemsPanel
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
