import {defineStore} from 'pinia'
import {ref, computed} from 'vue'


const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '');
  const user = ref(null);

  const isLoggedIn = computed(() => !!token.value);

    let setToken: (t: string) => void = (t: string) => {
        token.value = t;
        localStorage.setItem('token', t);
    };

    function logOut () {
      token.value = null;
      user.value = null;
      localStorage.removeItem('token');
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
