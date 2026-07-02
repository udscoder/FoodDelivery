export interface IUsers {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    email: string;
    hashed_password: string;
    is_active: boolean;
    role_id: number;
    role: UserRole;
    SUPERADMIN: SuperAdmin;
}

export interface SuperAdmin {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    name: string;
    phone_number: string | null;
    user_id: number;
}

export type UserRole = "SUPERADMIN";