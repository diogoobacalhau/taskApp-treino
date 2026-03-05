import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/login/LoginPage.vue'
import HomePage from '@/pages/home/HomePage.vue'
import RegisterPage from '@/pages/login/RegisterPage.vue'
import WebSocketTestPage from '@/pages/tests/WebSocketTestPage.vue'
import TarefasPage from '@/pages/TarefasPage.vue'
import AtividadesPage from '@/pages/AtividadesPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/login',
      component: LoginPage,
    },
    {
      path: '/websocket-test',
      component: WebSocketTestPage,
    },
    {
      path: '/register',
      name: 'register',
      component: () => RegisterPage,
    },
    {
      path: '/tarefas',
      name: 'tarefas',
      component: () => TarefasPage,
    },
    {
      path: '/atividades',
      name: 'atividades',
      component: () => AtividadesPage,
    },
    {
      path: '/atividades/:id/editar',
      name: 'atividades.editar',
      component: () => import('@/pages/AtividadeEditPage.vue'),
      props: true // Permite receber o :id como uma prop no componente
    }
  ],
})

export default router
