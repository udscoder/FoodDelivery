import {useMutation} from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { authService } from '@/api/auth'
import useAuthStore from '@/stores/auth'
import type {ILogin, RegisterDto, Role} from '@/types/auth'


export function useSendOtp() {
    return useMutation({
        mutationFn: (email: string) => authService.sendOtp(email),
    })
}

export function useVerifyOtp() {
    return useMutation({
        mutationFn: ({ email, code }: { email: string; code: string }) =>
            authService.verifyOtp(email, code),
    })
}


export function useLogin() {
    const auth = useAuthStore()
    const router = useRouter()

    return useMutation({
        mutationFn: (dto: ILogin) => authService.login(dto),
        onSuccess: (data) => {
            auth.setToken(data.access_token)
            auth.setUser({
                name: data.name,
                role: data.role,
                id: data.user_id,
                permissions: data.permissions,
                email: data.email,
                phone_number: data.phone_number,
                role_id: data.role_id,
            })

            const redirectMap: Record<Role, string> = {
                ADMIN: '/admin',
                CUSTOMER: '/restaurants',
                COURIER: '/deliveries',
                RESTAURANT_OWNER: '/dashboard',
            }

            router.push(redirectMap[data.role])
        },
    })
}

export function useRegister() {
    const auth = useAuthStore()
    const router = useRouter()

    return useMutation({
        mutationFn: (dto: RegisterDto) => authService.register(dto),
        onSuccess: (data) => {
            auth.setToken(data.access_token)
            // auth.setUser(data.user)
            router.push('/restaurants')
        },
    })
}
