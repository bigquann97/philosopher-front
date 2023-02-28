<template>
  <div class="app">
    <v-app>
      <Header />
      <div class="divider"></div>
      <router-view />
      <Footer />
    </v-app>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';

export default {
  name: 'DefaultLayout',
  components: {
    Footer,
    Header,
  },
};
</script>

<style>
@import './css/reset.css';
@import './css/common.css';
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css');
@import url('https://cdn.rawgit.com/hiun/NanumSquare/master/nanumsquare.css');
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

 {
  font-size: 1em;
  font-family: 'Nanum Square';
}

.bold {
  font-weight: bold;
}
</style>
