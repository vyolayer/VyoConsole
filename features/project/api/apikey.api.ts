import { apiClient } from "@/lib/api/client";
import { CreateApiKeyInput } from "../schemas/CreateApikeySchema";
import { IApiKey } from "../types/apiKey.type";

export interface CreateApiKeyResponse {
    api_key: IApiKey;
    secret: string;
}

export interface ListApiKeysResponse {
    api_keys: IApiKey[];
}

export interface GetApiKeyResponse {
    api_key: IApiKey;
}

const create = (
    orgId: string, // organization id
    projectId: string,
    data: CreateApiKeyInput,
) =>
    apiClient.post<CreateApiKeyResponse>(`/api-keys?org-id=${orgId}&project-id=${projectId}`, data);

const list = (
    orgId: string, // organization id
    projectId: string,
) => apiClient.get<ListApiKeysResponse>(`/api-keys?org-id=${orgId}&project-id=${projectId}`);

const get = (
    orgId: string, // organization id
    projectId: string,
    id: string,
) => apiClient.get<GetApiKeyResponse>(`/api-keys/${id}?org-id=${orgId}&project-id=${projectId}`);

const revoke = (
    orgId: string, // organization id
    projectId: string,
    id: string,
) => apiClient.delete(`/api-keys/${id}/revoke?org-id=${orgId}&project-id=${projectId}`);

const rotate = (
    orgId: string, // organization id
    projectId: string,
    id: string,
) =>
    apiClient.patch<CreateApiKeyResponse>(
        `/api-keys/${id}/rotate?org-id=${orgId}&project-id=${projectId}`,
    );

export const apikeyApi = {
    create,
    list,
    get,
    revoke,
    rotate,
};
