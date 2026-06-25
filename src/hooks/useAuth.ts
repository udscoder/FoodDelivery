import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { authService } from '@/api/auth'
import useAuthStore from '@/stores/auth'
import type { ILogin, RegisterDto } from '@/types/auth'

export function useLogin() {
    const auth = useAuthStore()
    const router = useRouter()

    return useMutation({
        mutationFn: (dto: ILogin) => authService.login(dto),
        onSuccess: (data) => {
            auth.setToken(data.access_token)
            // auth.setUser(data.user)
            router.push('/restaurants')
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