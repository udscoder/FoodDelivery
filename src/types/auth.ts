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
    password: string
}

export interface AuthResponse {
    access_token: string
    refresh_token: string
    user: {
        id: number
        name: string
        email: string
        role: 'CUSTOMER' | 'ADMIN'
    }
}