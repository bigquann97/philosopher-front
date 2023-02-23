<template>
  <nav class="white" style="box-shadow: none">
    <div class="container">
      <a style="float:left">
        <a href="/main">
          <img src="@/image/logo.png" alt="logo" />
        </a>
      </a>
      <ul class="hide-on-med-and-down">
        <li>
          <a>게시물</a>
        </li>
        <li>
          <a href="/threads">쓰레드</a>
        </li>
        <li>
          <router-link to="/">아카이브</router-link>
        </li>
        <li><a>신고</a></li>
      </ul>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li v-if="isUserLogin" style="color: black; margin-right: 20px;">
          <span style="font-size: 17px"
            >{{ $store.state.username }} 님 반갑습니다.
          </span>
        </li>
        <li v-if="!isUserLogin">
          <router-link to="/sign-up">회원 가입</router-link>
        </li>
        <li v-if="!isUserLogin">
          <router-link to="/sign-in">로그인</router-link>
        </li>
        <li v-if="isUserLogin">
          <router-link to="/accountInfo">정보수정</router-link>
        </li>
        <li v-if="isUserLogin"><a @click="logoutUser">로그아웃</a></li>
      </ul>
    </div>
  </nav>
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
span {
  font-size: 14px;
  font-weight: normal;
}
</style>
