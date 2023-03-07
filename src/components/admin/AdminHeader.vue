<template>
  <div style="margin-bottom: 69px;">
    <header>
      <div class="menu">
        <ul>
          <li>
            <a
              href="/admin/accounts"
              v-bind:style="{ 'border-right': '1px solid rgb(211, 211, 211)' }"
              >회원관리</a
            >
          </li>
          <li>
            <a
              href="/admin/reports/posts"
              v-bind:style="{ 'border-right': '1px solid rgb(211, 211, 211)' }"
              >게시물 신고</a
            >
          </li>
          <li>
            <router-link
              to="/admin/reports/threads"
              style="border-right: 1px solid rgb(211, 211, 211)"
              >쓰레드 신고</router-link
            >
          </li>
          <li>
            <router-link
              to="/admin/reports/comments"
              style="border-right: 1px solid rgb(211, 211, 211)"
              >댓글 신고</router-link
            >
          </li>
          <li>
            <router-link
              to="/admin/thread"
              style="border-right: 1px solid rgb(211, 211, 211)"
              >쓰레드 관리</router-link
            >
          </li>
          <li>
            <router-link
              to="/admin/thread/archived"
              style="border-right: 1px solid rgb(211, 211, 211)"
              >아카이브 관리</router-link
            >
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
import { deleteCookie } from '@/utils/cookies';

export default {
  name: 'AppBar',
  components: {},
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    logoutUser() {
      this.$store.commit('clearUsername');
      this.$store.commit('clearToken');
      deleteCookie('token');
      deleteCookie('user');
      this.$router.push('/main');
    },
  },
};
</script>

<style>
@import '/css/reset.css';
@import '/css/common.css';
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

header *,
header *:before,
header *:after {
  box-sizing: inherit;
  font-family: 'pretendard', Arial, Helvetica, sans-serif;
}

header {
  height: 70px;
  border-bottom: 1px solid #f1f1f1;
  background-color: white;
  display: flex !important;
  align-items: center;
  position: fixed;
  width: 60%;
}

header .company-name {
  width: 21%;
  display: flex;
  align-items: center;
}

header .company-name a {
  text-decoration: none;
  font-size: 21px;
  font-weight: bold;
  color: #111111 !important;
  display: flex;
  align-items: center;
  margin-right: 3px;
}

header .company-name a img {
  width: 50px;
  border-radius: 50%;
}

header .menu {
  width: 40%;
}

header .menu ul {
  display: flex;
  justify-content: center;
  list-style-type: none;
}

header .menu li a {
  white-space: nowrap;
  font-size: 16px;
  text-decoration: none;
  color: #111111;
  padding: 0 20px;
}

header .menu li a:hover {
  color: dodgerblue;
}

header .navbar {
  width: 40%;
}

header .navbar ul {
  display: flex;
  float: right;
  list-style-type: none;
}

header .navbar li a {
  white-space: nowrap;
  font-size: 16px;
  margin-right: 10px;
  text-decoration: none;
  color: dodgerblue;
  padding: 6px 12px;
}

header .navbar li a:hover {
  color: rgb(0, 17, 168);
}
</style>
