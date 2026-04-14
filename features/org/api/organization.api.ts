import { apiClient } from "@/lib/api/client";
import { CreateOrganizationInput } from "../schemas/CreateOrganizationSchema";
import { IOrganization } from "../types/organization.types";
import { IOrganizationMember } from "../types/member.types";
import { DeleteOrganizationInput } from "../schemas/DeleteOrganizationSchema";
import { ArchiveOrganizationInput } from "../schemas/ArchiveOrganizationSchema";

export type GetOrganizationsResponse = {
    organizations: IOrganization[];
    total_count: number;
    next_page_token?: string;
};

export type GetOrganizationResponse = {
    organization: IOrganization;
    members: IOrganizationMember[];
};

const createOrganization = (
    data: CreateOrganizationInput, // CreateOrganizationInput
) => apiClient.post("/organizations", data);

const getOrganizations = () => apiClient.get<GetOrganizationsResponse>("/organizations");

const getOrganization = (
    id: string, // organization id
) => apiClient.get<GetOrganizationResponse>(`/organizations/${id}`);

const getOrganizationBySlug = (
    slug: string, // organization slug
) => apiClient.get<GetOrganizationResponse>(`/organizations/slug/${slug}`);

const updateOrganization = (
    id: string, // organization id
    data: Partial<CreateOrganizationInput>,
) => apiClient.patch(`/organizations/${id}`, data);

const deleteOrganization = (
    id: string, // organization id
    data: DeleteOrganizationInput,
) => apiClient.delete(`/organizations/${id}`, data);

const archiveOrganization = (
    id: string, // organization id
    data: ArchiveOrganizationInput,
) => apiClient.post(`/organizations/${id}/archive`, data);

const unarchiveOrganization = (
    id: string, // organization id
) => apiClient.post(`/organizations/${id}/restore`);

export const organizationApi = {
    create: createOrganization,
    list: getOrganizations,
    getById: getOrganization,
    getBySlug: getOrganizationBySlug,
    update: updateOrganization,
    delete: deleteOrganization,
    archive: archiveOrganization,
    unarchive: unarchiveOrganization,
};
