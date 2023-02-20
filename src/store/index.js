import Vue from 'vue';
import Vuex from 'vuex';
import {
  getAuthFromCookie,
  getUserFromCookie,
  saveAuthToCookie,
  saveUserToCookie,
} from '@/utils/cookies';
import { loginUser } from '@/api/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: getUserFromCookie() || '',
    token: getAuthFromCookie() || '',
  },
  getters: {
    isLogin(state) {
      return state.username !== '';
    },
  },
  mutations: {
    setUsername(state, nickname) {
      state.username = nickname;
    },
    clearUsername(state) {
      state.username = '';
    },
    setToken(state, accessToken) {
      state.token = accessToken;
    },
    clearToken(state) {
      state.token = '';
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      console.log(data);
      commit('setToken', data.accessToken);
      commit('setUsername', data.nickname);
      saveAuthToCookie(data.accessToken);
      saveUserToCookie(data.nickname);
      return data;
    },
  },
});
