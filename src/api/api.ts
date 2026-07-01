import axios from 'axios'
import useAuthStore from '@/stores/auth'
import router from '@/router'

const api = axios.create()


const RESTAURANT_URL = import.meta.env.VITE_RESTAURANT_URL as string

const PUBLIC_URLS = [RESTAURANT_URL]

api.interceptors.request.use((config) => {
    const auth = useAuthStore()
    const isPublicUrl = PUBLIC_URLS.some((url) => config.url?.startsWith(url))

    if (!isPublicUrl && auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`
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
