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
    },
    {
      path: '/comments/thread/:id',
      name: 'Thread',
      component: () => import('@/components/post/Thread.vue'),
      props: true,
    },
    {
      path: '/threads/archived',
      name: 'ArchiveList',
      component: () => import('@/components/post/ArchiveList.vue'),
    },
    {
      path: '/comments/archive/:id',
      name: 'Archive',
      component: () => import('@/components/post/Archive.vue'),
      props: true,
    },
    {
      path: '/posts',
      name: 'PostList',
      component: () => import('@/components/post/PostList.vue'),
      props: true,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/components/admin/AdminHeader.vue'),
    },
    {
      path: '/admin/accounts',
      name: 'AccountList',
      component: () => import('@/components/admin/AccountList.vue'),
    },
    {
      path: '/admin/reports/posts',
      name: 'reportPostList',
      component: () => import('@/components/admin/PostReportList.vue'),
    },
    {
      path: '/admin/reports/threads',
      name: 'reportThreadList',
      component: () => import('@/components/admin/ThreadReportList.vue'),
    },
    {
      path: '/admin/reports/comments',
      name: 'reportCommentList',
      component: () => import('@/components/admin/CommentReportList.vue'),
    },
    {
      path: '/admin/thread',
      name: 'ThreadListManage',
      component: () => import('@/components/admin/ThreadList.vue'),
    },
    {
      path: '/posts/:id',
      name: 'Post',
      component: () => import('@/components/post/Post.vue'),
      props: true,
    },
    {
      path: '/post',
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
      path: '/myPosts',
      name: 'MyPosts',
      component: () => import('@/components/account/MyPosts.vue'),
    },
    {
      path: '/myComments',
      name: 'MyComments',
      component: () => import('@/components/account/MyComment.vue'),
    },
    {
      path: '/recommendedPosts',
      name: 'RecommendedPosts',
      component: () => import('@/components/account/RecommendedPosts.vue'),
    },
    {
      path: '/recommendedComments',
      name: 'RecommendedComments',
      component: () => import('@/components/account/RecommendedComments.vue'),
    },
    {
      path: '/recommendedThreads',
      name: 'RecommendedThreads',
      component: () => import('@/components/account/RecommendedThreads.vue'),
    },
    {
      path: '/updateNickname',
      name: 'UpdateNickname',
      component: () => import('@/components/account/UpdateNickname.vue'),
      props: true,
    },
    {
      path: '/updatePassword',
      name: 'UpdatePassword',
      component: () => import('@/components/account/UpdatePassword.vue'),
    },
    {
      path: '/myNotification',
      name: 'MyNotification',
      component: () => import('@/components/account/MyNotification.vue'),
    },
    {
      path: '*',
      component: () => import('@/components/common/NotFoundPage.vue'),
    },
    {
      path: '/terms',
      component: () => import('@/components/common/Terms.vue'),
    },
    {
      path: '/privacy',
      component: () => import('@/components/common/Privacy.vue'),
    },
    {
      path: '/rank',
      component: () => import('@/components/rank/Rank.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    console.log('????????? ???????????????');
    alert('???????????? ???????????????.');
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
      alert('????????? ???????????? ????????? ??? ????????????.');
      next('/main');
      return;
    }
  }
  next();
});

export default router;
