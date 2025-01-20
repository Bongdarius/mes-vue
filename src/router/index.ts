import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/flexGrid',
      name: 'flexGrid',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FlexGrid.vue'),
    },
    {
      path: '/trackChanges',
      name: 'trackChanges',
      component: () => import('../views/TrackChanges.vue'),
    },
    {
      path: '/columnPicker',
      name: 'columnPicker',
      component: () => import('../views/ColumnPicker.vue'),
    },
    {
      path: '/customerMngPage',
      name: 'customerMngPage',
      component: () => import('../views/CustomerMngPage.vue'),
    },
    {
      path: '/commonFlexGrid',
      name: 'commonFlexGrid',
      component: () => import('../views/CommonFlexGrid.vue'),
    },
  ],
});

export default router;
