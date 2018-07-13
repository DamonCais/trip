const right = {
  state: {
    accessRights: []
  },
  mutations: {
    SET_RIGHT: (state, right) => {
      state.right = right;
    }
  },
  actions: {
    setRight({ commit }, right) {
      commit('SET_RIGHT', right);
    }
  }
};

export default right;
