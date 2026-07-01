import type { ILogin, RegisterDto, AuthResponse } from '@/types/auth'
import api from "@/api/api.ts";

const BASE = import.meta.env.VITE_AUTH_URL as string

export const authService = {
    sendOtp: async (email: string) => {
        const { data } = await api.post(`${BASE}/auth/sent-otp`, { email })
        return data
    },

    verifyOtp: async (email: string, code: string): Promise<{ otpToken: string }> => {
        const { data } = await api.post(`${BASE}/auth/verify-otp`, { email, code })
        return data
    },

    login: async (dto: ILogin): Promise<AuthResponse> => {
        const { data } = await api.post<AuthResponse>(`${BASE}/auth/login`, dto)
        return data
    },

    register: async (dto: RegisterDto): Promise<AuthResponse> => {
        const { data } = await api.post<AuthResponse>(`${BASE}/auth/register`, dto)
        return data
    },

    refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
        const { data } = await api.post<AuthResponse>(`${BASE}/auth/refresh`, { refreshToken })
        return data
    },

    getMe: async (): Promise<AuthResponse['user']> => {
        const { data } = await api.get(`${BASE}/auth/me`,)
        return data
    },
}