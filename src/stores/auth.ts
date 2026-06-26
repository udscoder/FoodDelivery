import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import {useRouter} from "vue-router";


const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '');
  const user = ref(null);
  const router = useRouter()

  const isLoggedIn = computed(() => !!token.value);

    let setToken: (t: string) => void = (t: string) => {
        token.value = t;
        localStorage.setItem('token', t);
    };

    function logOut () {
      token.value = '';
      user.value = null;
      localStorage.removeItem('token');
      router.push('/login')
  }

  return {
      token,
      user,
      isLoggedIn,
      setToken,
      logOut
  }
})
export default useAuthStore
