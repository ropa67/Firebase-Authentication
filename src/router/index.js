import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/register',
            component: () => import('../views/Register.vue')
        },
        {
            path: '/sign-in',
            component: () => import('../views/Login.vue')
        },
        {
            path: '/feed',
            component: () => import('../views/Feed.vue'),
        }
    ]
})

export default router