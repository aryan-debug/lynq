import { useEffect, useRef } from "react";
import { useProjectStore } from "@/stores/projectStore";
import { saveProjects } from "@/utils/storage";

export const useAutoSave = (intervalMs: number = 60000) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSaveRef = useRef<string>("");

  const projects = useProjectStore((state) => state.projects);

  useEffect(() => {
    const autoSave = async () => {
      if (!projects.length) return;

      const projectData = JSON.stringify(projects);

      if (projectData === lastSaveRef.current) return;

      await saveProjects(projects);
      lastSaveRef.current = projectData;
    };

    intervalRef.current = setInterval(autoSave, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [projects, intervalMs]);

  useEffect(() => {
    return () => {
      if (projects.length) {
        saveProjects(projects);
      }
    };
  }, [projects]);
};
