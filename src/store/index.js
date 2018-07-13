import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import orders from './modules/orders';
import cart from './modules/cart';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    orders,
    user,
    cart
  },
  getters
});

export default store;
