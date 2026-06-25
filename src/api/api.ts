import axios from 'axios'
import useAuthStore from '@/stores/auth'
import router from '@/router'

const api = axios.create()

const AUTH_BASE = import.meta.env.VITE_AUTH_BASE

const PROTECTED_URLS = [AUTH_BASE]

api.interceptors.request.use((config) => {
    const auth = useAuthStore()
    const requiresAuth = PROTECTED_URLS.some((url) => config.url?.startsWith(url))

    if (requiresAuth) {
        if (auth.token) {
            config.headers.Authorization = `Bearer ${auth.token}`
        }
    }

    return config
})

api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401) {
            const auth = useAuthStore()
            auth.logOut()
            router.push('/login')
        }
        return Promise.reject(error)
    }
)

export default api