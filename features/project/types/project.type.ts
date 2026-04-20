export interface IProject {
    id: string;
    organization_id: string;
    name: string;
    slug: string;
    description: string;
    is_active: boolean;
    created_by: string;
    max_api_keys: number;
    max_members: number;
    created_at: Date;
}

export interface IProjectMember {
    id: string;
    user_id: string;
    role: string;
    is_active: boolean;
    joined_at: Date;
}
