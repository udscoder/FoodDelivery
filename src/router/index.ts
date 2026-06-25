import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        component: () => import('@/pages/AuthPage.vue')
    },
    {
        path: '/restaurants',
        component: () => import('@/pages/RestaurantsPage.vue'),
    },
    {
        path: '/restaurants/:id',
        component: () => import('@/pages/RestaurantInnerPage.vue'),
    },
    { path: '/', redirect: '/restaurants' }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router