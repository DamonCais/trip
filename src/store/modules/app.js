const app = {
  state: {
    language: localStorage.getItem('language') || 'en',
    shoppingmallId: '5adedc43de3c90022eb25d3b',
    offTime: new Date().getTime() + 24 * 60 * 60 * 1000
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language;
      localStorage.setItem('language', language);
    },
    SET_OFF_TIME: (state, time) => {
      state.offTime = time;
      localStorage.setItem('offTime', time);
    }

  },
  actions: {

    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language);
    },
    setOffTime({ commit }, time) {
      commit('SET_OFF_TIME', time);
    }
  }
};

export default app;
