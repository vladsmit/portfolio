import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/payments',
    name: 'validateForm',
    component: () => import('@/components/ValidateForm.vue')
  },
  {
    path: '/history',
    name: 'paymentHistory',
    component: () => import('@/components/PaymentHistory.vue')
  },
  {
    path: '/success',
    name: 'successfulPayment',
    component: () => import('@/components/SuccessfulPayment.vue')
  },
  {
    path: '/404',
    name: 'error',
    component: () => import('@/components/Error.vue')
  },
  {
    path: '/',
    redirect: '/payments'
  },
  {
    path: '*',
    redirect: '/404'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "successfulPayment" && !store.state.validationPassed) {
    next({ name: "validateForm" });
  } else {
    next();
  }
});

export default router;
