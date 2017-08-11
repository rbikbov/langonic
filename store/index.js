/* eslint-disable */
import axios from 'axios';
import cookieValueByName from '~/plugins/cookieValueByName';

export const state = {
  authUser: null,
  authToken: null,
  lang: 'en'
};

export const mutations = {
  SET_USER: (state, user) => {
    state.authUser = user;
  },
  SET_TOKEN: (state, token) => {
    state.authToken = token;
  },
  SET_LANG: (state, lang) => {
    state.lang = lang;
    if (window) {
      if (window.localStorage) window.localStorage.setItem('lang', lang);
    }
  }
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req && req.user && req.headers.cookie) {
      commit('SET_USER', req.user);
      commit('SET_TOKEN', cookieValueByName(req.headers.cookie, 'authToken'));
    }
  },
  logout({ commit }) {
    return axios.post('/api/v1/auth/logout').then(() => {
      window.localStorage.removeItem('authToken');
      commit('SET_USER', null);
      commit('SET_TOKEN', null);
      this.$router.push('/');
    });
  }
};
