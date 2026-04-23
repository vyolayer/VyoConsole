export interface IApiKey {
    created_by: string;
    description: string;
    environment: string;
    expires_at: string;
    id: string;
    last_used_at: string;
    last_used_ip: string;
    last_used_ua: string;
    name: string;
    organization_id: string;
    prefix: string;
    project_id: string;
    revoked_at: string;
    revoked_by: string;
    scopes: string[];
    status: string;
}
