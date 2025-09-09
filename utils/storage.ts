import { uploadData, downloadData } from "aws-amplify/storage";
import { getCurrentUser } from "aws-amplify/auth";
import type { Project } from "@/types/project";

export const saveProjects = async (projects: Project[]): Promise<void> => {
  try {
    const user = await getCurrentUser();
    const userId = user.userId;

    const projectData = JSON.stringify(projects, null, 2);

    uploadData({
      path: ({ identityId }) => `projects/${identityId}/projects.json`,
      data: projectData,
      options: {
        contentType: "application/json",
      },
    });

    console.log("Projects saved successfully");
  } catch (error) {
    console.error("Save failed:", error);
  }
};

export const loadProjects = async (): Promise<Project[]> => {
  try {
    const user = await getCurrentUser();
    const userId = user.userId;
    const key = `projects/${userId}/projects.json`;

    const result = await downloadData({
      path: ({ identityId }) => `projects/${identityId}/projects.json`,
    }).result;
    const projectData = await result.body.text();

    return JSON.parse(projectData);
  } catch (error) {
    console.error("Load failed:", error);
    return [];
  }
};
