export interface IOrganizationInvitation {
    id: string;
    organization_id: string;
    email: string;
    invited_by: string;
    invited_at: Date;
    expired_at: Date;
    is_pending: boolean;
}
