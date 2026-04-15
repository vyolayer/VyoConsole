export type IOrganization = {
    id: string;
    name: string;
    slug: string;
    description: string;
    is_active: boolean;
    owner_id: string;
    max_members: number;
    member_count: number;
    max_projects: number;
    project_count: number;
    created_at: Date;
    updated_at: Date;
};
