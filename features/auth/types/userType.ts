export interface IUser {
    id: string;
    email: string;
    full_name: string;
    status: string;
    is_email_verified: boolean;
    joined_at: string;
    avatar: IAvatar;
}

export interface IAvatar {
    url: string;
    fallback_color: string;
    fallback_char: string;
}
