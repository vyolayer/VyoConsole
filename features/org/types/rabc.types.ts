export interface IOrganizationRole {
    id: string;
    name: string;
    description: string;
    is_system_role: boolean;
}

export interface IOrganizationPermission {
    id: string;
    resource: string;
    action: string;
    code: string;
    group: string;
    is_system: boolean;
}
