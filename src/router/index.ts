import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import SingleChat from '@/views/chat/SingleChat.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        redirect: '/main',
      },
      {
        path: 'main',
        component: import('@/views/Main.vue'),
      },
      {
        path: 'chats',
        component: import('@/views/Chats.vue'),
      },
      {
        path: 'profile',
        component: import('@/views/Profile.vue'),
      },
    ],
  },
  {
    path: '/chats/:id',
    component: SingleChat,
  },
]

// https://vitejs.dev/guide/env-and-mode.html
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
