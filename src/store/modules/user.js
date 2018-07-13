// import { login, logout, guzzuLogin } from '@/api/login';
// import { getToken, setToken, removeToken } from '@/utils/auth';

const user = {
  state: {
    name: JSON.parse(localStorage.getItem('username')) || '',
    token: JSON.parse(localStorage.getItem('token')) || ''
  },

  mutations: {

    SET_NAME: (state, name) => {
      state.name = name;
      localStorage.setItem('username', JSON.stringify(state.name));
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
      localStorage.setItem('token', JSON.stringify(state.token));
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('SET_TOKEN', token);
    }
  }

};

export default user;
