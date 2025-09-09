import { uploadData, downloadData } from "aws-amplify/storage";
import { getCurrentUser } from "aws-amplify/auth";
import type { Project } from "@/types/project";

export const saveProjects = async (projects: Project[]): Promise<void> => {
  try {
    const user = await getCurrentUser();
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
    localStorage.setItem("projects", JSON.stringify(projects));
  }
};

export const loadProjects = async (): Promise<Project[]> => {
  try {
    const user = await getCurrentUser();
    const result = await downloadData({
      path: ({ identityId }) => `projects/${identityId}/projects.json`,
    }).result;
    const projectData = await result.body.text();

    return JSON.parse(projectData);
  } catch (error) {
    const projects = localStorage.getItem("projects");
    if (projects) {
      return JSON.parse(projects);
    }
    return [
      {
        id: "project1",
        name: "Project 1",
        items: [
          { type: "flow", id: "flow1", name: "People", nodes: [], edges: [] },
          {
            type: "timeline",
            id: "timeline1",
            name: "Timeline",
            events: [
              {
                id: Date.now().toString(),
                date: new Date().toISOString().split("T")[0],
                title: "New Event",
                subtitle: "Event subtitle",
                detail: "Event details go here...",
              },
            ],
          },
        ],
      },
    ];
  }
};
