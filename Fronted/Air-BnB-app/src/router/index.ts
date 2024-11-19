import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterView.vue'), // Ruta para RegisterView
    },
    {
      path: '/reserva',
      name: 'Reserva',
      component: () => import('../views/ReservaView.vue'), // Ruta para ReservaView
    },
    {
      path: '/apartamento/:id/:username',
      name: 'ApartamentoDetail',
      component: () => import('@/views/ApartamentoDetailView.vue'),
      props: true, // Habilita el paso de parámetros como props al componente
    },
    {
      path: '/apartamento',
      name: 'Apartamento',
      component: () => import('../views/ApartamentoView.vue'), // Componente de lista de apartamentos
    },
    {
      path: '/chat/:userId',
      name: 'Chat',
      component: () => import('../views/ChatView.vue'), // Componente de chat
    },
  ],
})

// Aquí puedes agregar lógica adicional si es necesario, como guardas de navegación

export default router
