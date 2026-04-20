import { apiClient } from "@/lib/api/client";
import { IProjectManifestService } from "../types/projectService.type";

const getServices = async (
    projectId: string, // project id
) => apiClient.get<IProjectManifestService[]>(`/console/projects/${projectId}/services`);

const getService = async (
    projectId: string, // project id
    serviceKey: string, // service key
) =>
    apiClient.get<IProjectManifestService>(`/console/projects/${projectId}/services/${serviceKey}`);

export const projectServiceApi = {
    list: getServices,
    get: getService,
};
