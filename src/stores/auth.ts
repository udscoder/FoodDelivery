import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import {useRouter} from "vue-router";
import type {IUser} from "@/types/auth.ts";
import {authService} from "@/api/auth.ts";


const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '');
  const user = ref();
  const router = useRouter()

  const isLoggedIn = computed(() => !!token.value);

    async function initialize() {
        if (!token.value) return

        if (!user.value) {

            try {
                const data = await authService.getMe()
                setUser(
                    {
                        name: data.name,
                        role: data.role,
                        id: data.id,
                        permissions: data.permissions,
                        email: data.email,
                        phone_number: data.phone_number,
                        role_id: data.role_id
                    }
                )
            } catch {

            }
        }
    }

    let setToken: (t: string) => void = (t: string) => {
        token.value = t;
        localStorage.setItem('token', t);
    };

    let setUser: (u: IUser) => void = (u: IUser) => {
        user.value = u;
        localStorage.setItem('user', JSON.stringify(u));
    }

    function logOut () {
      token.value = '';
      user.value = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('selectedMenus');
      router.push('/login')
  }

  return {
      token,
      user,
      isLoggedIn,
      initialize,
      setToken,
      setUser,
      logOut
  }
})
export default useAuthStore
