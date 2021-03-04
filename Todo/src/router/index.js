import Vue from 'vue';
import VueRouter from 'vue-router';

import App from '@/App.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    name: '404',
    component: App.vue
  },
  {
    path: '/page/:id',
    name: 'page',
    component: App.vue
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name === "404") {
    next({ name: "page", params: { id: 1 } });
  } else {
    next();
  }
});

export default router;
