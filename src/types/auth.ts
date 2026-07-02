export type Role = 'ADMIN' | 'CUSTOMER' | 'COURIER' | 'RESTAURANT_OWNER'

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister extends ILogin {
    name: string;
    role_id?: number;
    otpToken?: string;
}

export interface RegisterDto {
    name: string
    email: string
    password: string,
    role_id?: number,
    otpToken: string
}

export interface AuthResponse {
    access_token: string
    refresh_token: string
    email: string,
    permissions: string[],
    name: string,
    phone_number: string,
    user_id: number
    role: Role,
    role_id: number,
}

export interface IUser {
    name: string
    role: Role,
    id?: number
    permissions: string[]
    email: string
    phone_number: string,
    role_id: number
}