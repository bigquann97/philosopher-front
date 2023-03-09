import Vue from 'vue';
import Vuex from 'vuex';
import {
  getAuthFromCookie,
  getUserFromCookie,
  getUserRoleFromCookie,
  saveAuthToCookie,
  saveUserRoleToCookie,
  saveUserToCookie,
} from '@/utils/cookies';

import { loginUser } from '@/api/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: getUserFromCookie() || '',
    token: getAuthFromCookie() || '',
    userRole: getUserRoleFromCookie() || '',
  },
  getters: {
    isLogin(state) {
      return state.username !== '';
    },
    isAdmin(state) {
      return state.userRole === 'ROLE_ADMIN';
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
    setUserRole(state, userRole) {
      state.userRole = userRole;
    },
    clearUserRole(state) {
      state.userRole = '';
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      console.log(data);
      commit('setToken', data.accessToken);
      commit('setUsername', data.nickname);
      commit('setUserRole', data.userRole);
      saveAuthToCookie(data.accessToken);
      saveUserToCookie(data.nickname);
      saveUserRoleToCookie(data.userRole);
      return data;
    },
    async UPDATENICKNAME({ commit }, newNickname) {
      commit('setUsername', newNickname);
      saveUserToCookie(newNickname);
    },
  },
});
