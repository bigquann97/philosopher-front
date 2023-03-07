<template>
  <div style="margin-bottom: 69px;">
    <header>
      <div class="company-name">
        <a href="/main">
          <img src="@/image/logo.png" alt="logo" />
          <span>우리 모두 철학자</span>
        </a>
      </div>
      <div class="menu">
        <ul>
          <li>
            <a href="#" class="menu-icon">메뉴</a>
            <ul class="dropdown">
              <li>
                <a
                  href="/posts"
                  v-bind:style="{
                    'border-right': '1px solid rgb(211, 211, 211)',
                  }"
                  >게시물</a
                >
              </li>
              <li>
                <a
                  href="/threads"
                  v-bind:style="{
                    'border-right': '1px solid rgb(211, 211, 211)',
                  }"
                  >쓰레드</a
                >
              </li>
              <li>
                <a
                  href="/threads/archived"
                  v-bind:style="{
                    'border-right': '1px solid rgb(211, 211, 211)',
                  }"
                  >아카이브</a
                >
              </li>
              <li><a href="#">신고</a></li>
            </ul>
          </li>
          <li v-if="isAdmin">
            <router-link
              to="/admin/accounts"
              style="border-right: 1px solid rgb(211, 211, 211)"
              >어드민 페이지</router-link
            >
          </li>
        </ul>
      </div>
      <div class="navbar">
        <ul>
          <li v-if="isUserLogin" style="color: black;">
            <span style="font-size: 15px"
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
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  methods: {
    logoutUser() {
      this.$store.commit('clearUsername');
      this.$store.commit('clearToken');
      this.$store.commit('clearUserRole');
      deleteCookie('token');
      deleteCookie('user');
      deleteCookie('userRole');
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
  width: 30%;
  display: flex;
  align-items: center;
  margin-right: 3px;
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

header .company-name span {
  width: 100%;
}

header .company-name a img {
  width: 50px;
  border-radius: 50%;
}

header .menu {
  width: 30%;
  margin-right: 50px;
  margin-left: 50px;
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

@media (max-width: 1640px) {
  .navbar ul li span {
    display: none;
  }
}

@media (max-width: 1390px) {
  body {
    width: 90%;
  }
  header {
    width: 90%;
  }
  .menu li a {
    padding: 0 10px;
  }
  .navbar li a {
    font-size: 1.1rem;
    margin-right: 10px;
    padding: 6px 6px;
  }
}

@media (min-width: 931px) {
  .menu ul li a.menu-icon {
    display: none;
  }
  .dropdown li:not(:last-child) {
    border-right: 1px solid rgb(211, 211, 211);
  }
}

@media (max-width: 930px) {
  .company-name a span {
    display: none;
  }
  .first-row {
    flex-direction: column;
  }
  .second-row {
    flex-direction: column;
  }
  .board1 {
    margin-bottom: 50px;
  }
  .board1,
  .board2 {
    padding: 0;
  }
  .menu ul li.dropdown li {
    display: block;
  }
  .menu ul li ul.dropdown {
    background-color: white;
    position: absolute;
    z-index: 999;
    display: none;
    padding: 0;
    margin: 0;
  }
  .menu ul li a:hover {
    background-color: white;
    color: dodgerblue;
  }
  .menu ul li:hover ul.dropdown {
    display: block;
  }
}

@media (max-width: 420px) {
  .menu ul {
    margin-right: 100px;
    width: 20%;
  }
}
</style>
