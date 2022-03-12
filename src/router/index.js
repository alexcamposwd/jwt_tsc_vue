import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../components/LoginComponent.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/HomeComponent.vue'),
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/RegisterComponent.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    if (localStorage.getItem('jwt') === null) {
      next({
        path: '/',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

// Lógica NProgress
router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

// Lógica realizar o 'Log out' remover o token no local Storage:
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
