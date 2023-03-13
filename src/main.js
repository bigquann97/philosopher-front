import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import store from '@/store/index';
import vuetify from './plugins/vuetify';
import VueDOMPurifyHTML from 'vue-dompurify-html';

Vue.config.productionTip = false;
Vue.use(VueDOMPurifyHTML);

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store,
}).$mount('#app');
