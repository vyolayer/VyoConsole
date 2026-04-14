export interface IOrganizationMember {
    id: string;
    user_id: string;
    full_name: string;
    email: string;
    roles: string[];
    status: string;
    joined_at: Date;
}

export interface IOrganizationMemberWithRABC extends IOrganizationMember {
    perms: string[];
}
