import { apiClient } from "@/lib/api/client";
import { CreateProjectInput } from "../schemas/CreateProjectSchema";
import { IProject, IProjectMember } from "../types/project.type";

type CreateProjectResponse = {
    project: IProject;
    members: IProjectMember[];
};

type ProjectListResponse = {
    projects: IProject[];
    total_count: number;
};

type ProjectResponse = {
    project: IProject;
};

const getProjects = (
    orgId: string, //
) => apiClient.get<ProjectListResponse>(`/organizations/${orgId}/projects`);

const createProject = (
    orgId: string, // organization id
    data: CreateProjectInput,
) => apiClient.post<CreateProjectResponse>(`/organizations/${orgId}/projects`, data);

const getProject = (
    orgId: string, // organization id
    projectId: string, // project id
) => apiClient.get<ProjectResponse>(`/organizations/${orgId}/projects/${projectId}`);

const updateProject = (
    orgId: string, // organization id
    projectId: string, // project id
    data: Partial<CreateProjectInput>, // project data
) => apiClient.patch(`/organizations/${orgId}/projects/${projectId}`, data);

const deleteProject = (
    orgId: string, // organization id
    projectId: string, // project id
) => apiClient.delete(`/organizations/${orgId}/projects/${projectId}`);

export const projectApi = {
    list: getProjects,
    create: createProject,
    getById: getProject,
    update: updateProject,
    delete: deleteProject,
};
