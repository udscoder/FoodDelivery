import {createRouter, createWebHistory} from 'vue-router'
import useAuthStore from "@/stores/auth.ts";

const routes = [
    {
        path: '/login',
        component: () => import('@/pages/AuthPage.vue')
    },
    {
        path: '/restaurants',
        component: () => import('@/pages/RestaurantsPage.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/restaurants/:id',
        component: () => import('@/pages/RestaurantInnerPage.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/cart',
        component: () => import('@/pages/CartPage.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/',
        redirect: '/restaurants',
        meta: {requiresAuth: true}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to) => {
    const auth = useAuthStore()
    if (to.meta.requiresAuth && !auth.isLoggedIn) return '/login'
})

export default router