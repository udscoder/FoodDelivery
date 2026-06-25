import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import router from "@/router";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 2,   // data stays fresh for 2 minutes
            retry: 2,                    // retry failed requests twice
        },
    },
})

createApp(App).use(createPinia()).use(router).use(VueQueryPlugin, {queryClient}).mount('#app')
