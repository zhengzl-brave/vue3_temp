import { createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import { useUser } from '@/store'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        redirect: "/manageModel",
        component: () => import('@/views/index/index.vue'),
        meta: {
            title: 'index',
            requiresAuth: true
        },
        children: [
            {
                path: '/todolist',
                name: 'todolist',
                component: () => import('@/views/components/TodoList/index.vue'),
                meta: {
                    title: 'todolist-pages',
                    requiresAuth: true,
                    keepAlive: true
                }
            },
            {
                path: '/manageModel',
                name: 'manageModel',
                component: () => import('@/views/components/ManageModel/index.vue'),
                meta: {
                    title: 'manageModel',
                    requiresAuth: true
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: 'login'
        }
    },
    // 配置404页面
    {
        path: '/:pathMatch(.*)*',
        name: 'NoFound',
        component: () => import('@/views/noFound/index.vue'),
        meta: {
            title: 'noFound'
        }
    }
    
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from) => {
    if(to.meta.requiresAuth && !useUser().token) {
        return {
            path: '/login',
            query: {
                redirect: to.fullPath
            }
        }
    }
})

export default router