import {createRouter, createWebHistory} from 'vue-router'
import useAuthStore from "@/stores/auth.ts";
import type {Role} from "@/types/auth.ts";

declare module 'vue-router' {
    interface RouteMeta {
        requiresAuth?: boolean
        roles?: Role[]
    }
}

const routes = [
    {
        path: '/login',
        component: () => import('@/pages/Auth/AuthPage.vue')
    },
    {
        path: '/restaurants',
        component: () => import('@/pages/Restaurants/RestaurantsPage.vue'),
        meta: {requiresAuth: true, }
    },
    {
        path: '/restaurants/filter/:category',
        component: () => import('@/pages/Restaurants/RestaurantsFilterPage.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/restaurants/:id',
        component: () => import('@/pages/Restaurants/RestaurantInnerPage.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/cart',
        component: () => import('@/pages/Cart/CartPage.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/orders',
        component: () => import('@/pages/Orders/OrdersPage.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/orders/:id',
        component: () => import('@/pages/Orders/OrdersStatusPage.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/profile',
        component: () => import('@/pages/Profile/ProfilePage.vue'),
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

    if (to.meta.requiresAuth && !auth.isLoggedIn) {
        return '/login'
    }

    if (to.meta.roles && !to.meta.roles.includes(auth.user?.role as Role)) {
        const redirectMap: Record<Role, string> = {
            ADMIN: '/admin',
            CUSTOMER: '/restaurants',
            COURIER: '/deliveries',
            RESTAURANT_OWNER: '/dashboard',
        }
        return '/unathorized'
    }
})

export default router