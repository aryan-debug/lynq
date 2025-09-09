"use client";
import React, { useEffect } from "react";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useProjectStore } from "@/stores/projectStore";
import { loadProjects, saveProjects } from "@/utils/storage";

interface AutoSaveProviderProps {
  children: React.ReactNode;
  intervalMs?: number;
}

export const AutoSaveProvider: React.FC<AutoSaveProviderProps> = ({
  children,
  intervalMs = 60000,
}) => {
  const setProjects = useProjectStore((state) => state.setProjects);

  useAutoSave(intervalMs);

  useEffect(() => {
    const loadData = async () => {
      const projects = await loadProjects();
      if (projects.length > 0) {
        setProjects(projects);
      }
    };

    loadData();
  }, [setProjects]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const projects = useProjectStore.getState().projects;
      if (projects.length) {
        saveProjects(projects);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return <>{children}</>;
};
