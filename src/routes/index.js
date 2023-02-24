import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/main',
      component: () => import('@/components/common/Main.vue'),
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: () => import('@/components/account/Signup.vue'),
    },
    {
      path: '/sign-in',
      name: 'signin',
      component: () => import('@/components/account/Signin.vue'),
    },
    {
      path: '/threads',
      name: 'ThreadList',
      component: () => import('@/components/post/ThreadList.vue'),
      meta: { auth: true },
    },
    {
      path: '/comments/thread/:id',
      name: 'Tread',
      component: () => import('@/components/post/Thread.vue'),
      props: true,
    },
    {
      path: '/posts',
      name: 'PostWrite',
      component: () => import('@/components/post/PostWrite.vue'),
      props: true,
    },
    {
      path: '/accountInfo',
      name: 'accountInfo',
      component: () => import('@/components/account/AccountInfo.vue'),
      props: true,
    },
    {
      path: '*',
      component: () => import('@/components/common/NotFoundPage.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    console.log('인증이 필요합니다');
    alert('로그인이 필요합니다.');
    next('/sign-in');
    return;
  }
  next();
});

router.beforeEach((to, from, next) => {
  if (to.path == '/sign-in' || to.path == '/sign-up') {
    if (store.getters.isLogin) {
      console.log(to.path);
      console.log(to.meta.auth);
      alert('로그인 상태에서 접근할 수 없습니다.');
      next('/main');
      return;
    }
  }
  next();
});

export default router;
