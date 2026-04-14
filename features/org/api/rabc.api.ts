import { apiClient } from "@/lib/api/client";
import { IOrganizationPermission, IOrganizationRole } from "../types/rabc.types";

type GetOrganizationRolesResponse = IOrganizationRole[];

type GetOrganizationPermissionsResponse = IOrganizationPermission[];

const getRolesApi = (
    id: string, // organization id
) => apiClient.get<GetOrganizationRolesResponse>(`/organizations/${id}/roles`);

const getPermissionsApi = (
    id: string, // organization id
) => apiClient.get<GetOrganizationPermissionsResponse>(`/organizations/${id}/permissions`);

export const rabcApi = {
    listOfRoles: getRolesApi,
    listOfPermissions: getPermissionsApi,
};
