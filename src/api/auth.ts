// services/auth.service.ts
import axios from 'axios'
import type { ILogin, RegisterDto, AuthResponse } from '@/types/auth'

const BASE = import.meta.env.VITE_AUTH_URL as string

export const authService = {
    sendOtp: async (email: string) => {
        const { data } = await axios.post(`${BASE}/auth/sent-otp`, { email })
        return data
    },

    verifyOtp: async (email: string, code: string): Promise<{ otpToken: string }> => {
        const { data } = await axios.post(`${BASE}/auth/verify-otp`, { email, code })
        return data
    },

    login: async (dto: ILogin): Promise<AuthResponse> => {
        const { data } = await axios.post<AuthResponse>(`${BASE}/auth/login`, dto)
        return data
    },

    register: async (dto: RegisterDto): Promise<AuthResponse> => {
        const { data } = await axios.post<AuthResponse>(`${BASE}/auth/register`, dto)
        return data
    },

    refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
        const { data } = await axios.post<AuthResponse>(`${BASE}/auth/refresh`, { refreshToken })
        return data
    },

    getMe: async (token: string): Promise<AuthResponse['user']> => {
        const { data } = await axios.get(`${BASE}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return data
    },
}