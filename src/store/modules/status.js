const status = {
  state: {
    orders: {
      filters: {},
      page: 1,
      pageSize: 10,
      sort: '-createdAt'
    },
    stores: {
      filters: {},
      page: 1,
      pageSize: 10,
      sort: '-createdAt'
    },
    users: {
      filters: {},
      page: 1,
      pageSize: 10,
      sort: '-createdAt'
    },
    products: {
      filters: {},
      page: 1,
      pageSize: 10,
      sort: '-createdAt'
    },
    withdrawal: {
      filters: {},
      page: 1,
      pageSize: 10,
      sort: '-createdAt'
    },
    annocuements: {
      filters: {},
      page: 1,
      pageSize: 10,
      sort: '-createdAt'
    }

  },
  mutations: {
    SET_ORDERS: (state, status) => {
      state.orders = status;
    },
    SET_STORES: (state, status) => {
      state.stores = status;
    },
    SET_USERS: (state, status) => {
      state.users = status;
    },
    SET_PRODUCTS: (state, status) => {
      state.products = status;
    },
    SET_WITHDRAWAL: (state, status) => {
      state.withdrawal = status;
    },
    SET_ANNOUCEMENTS: (state, status) => {
      state.annocuements = status;
    }
  },
  actions: {
    setstatus({ commit }, status) {
      commit('SET_ORDERS', status);
    },
    setStores({ commit }, status) {
      commit('SET_STORES', status);
    },
    setUsers({ commit }, status) {
      commit('SET_USERS', status);
    },
    setProducts({ commit }, status) {
      commit('SET_PRODUCTS', status);
    },
    setWithdrawal({ commit }, status) {
      commit('SET_WITHDRAWAL', status);
    },
    setAnnoucements({ commit }, status) {
      commit('SET_ANNOUCEMENTS', status);
    }
  }
};

export default status;
