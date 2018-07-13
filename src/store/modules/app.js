const app = {
  state: {
    language: localStorage.getItem('language') || 'en',
    shoppingmallId: '5adedc43de3c90022eb25d3b'
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language;
      localStorage.setItem('language', language);
    }

  },
  actions: {

    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language);
    }

  }
};

export default app;
