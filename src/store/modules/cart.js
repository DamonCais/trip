import { doGet } from '@/api/api';

const cart = {

  state: {
    shoppingCart: JSON.parse(localStorage.getItem('shoppingCart')) || {}
  },
  mutations: {
    ADD_ITEM_TO_CART: (state, item) => {
      if (!state.shoppingCart[item.store]) {
        state.shoppingCart[item.store] = [];
      }
      console.log(state.shoppingCart);

      const index = state.shoppingCart[item.store].findIndex(cart => cart.id === item.id);
      if (index === -1) {
        state.shoppingCart[item.store].push(item);
      } else {
        state.shoppingCart[item.store][index].num = item.num + state.shoppingCart[item.store][index].num;
      }
      console.log(state.shoppingCart);
      localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart));
    },
    DEL_ITEM_FROM_CART: (state, item) => {
      state.shoppingCart[item.store] = state.shoppingCart[item.store].filter(cart => cart.id !== item.id);
      state.shoppingCart = Object.assign({}, state.shoppingCart);
      localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart));
    },
    UPDATE_CART_BY_ITEM: (state, item) => {
      const index = state.shoppingCart[item.store].findIndex(cart => cart.id === item.id);
      state.shoppingCart[item.store].splice(index, 1, item);
      state.shoppingCart = Object.assign({}, state.shoppingCart);

      localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart));
    },
    SET_SHOPPING_CART: (state, cart) => {
      state.shoppingCart = cart;
      localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart));
    },
    SET_STORE_CART: (state, cart) => {
      state.shoppingCart[cart[0].store] = cart;
      localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart));
    },
    DEL_STORE_CART: (state, key) => {
      delete state.shoppingCart[key];
      state.shoppingCart = Object.assign({}, state.shoppingCart);
      localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart));
    },
    DEL_CART_BY_ORDER: (state, order) => {
      const ids = [];
      order.forEach(element => {
        ids.push(element.id);
      });
      state.shoppingCart[order[0].store] = state.shoppingCart[order[0].store].filter(good => ids.indexOf(good.id) === -1);
      localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart));
    }
  },
  actions: {
    // addItemToCart({ commit }, item) {
    //   let good;
    //   return new Promise((resolve, reject) => {
    //     doGet(`/products/${item.goodsId}`).then(response => {
    //       const data = response;
    //       if (item.selectedSkuComb.goods_id) {
    //         const options = data.productOptions.filter(p => p._id === item.selectedSkuComb.id);
    //         good = {
    //           id: item.selectedSkuComb.id,
    //           goodsId: item.goodsId,
    //           store: data.store,
    //           title: data.name,
    //           desc: options[0].name,
    //           price: item.selectedSkuComb.price,
    //           num: item.selectedNum,
    //           thumb: _(options[0], 'image.url') || _(data, 'image.url')
    //         };
    //       } else {
    //         good = {
    //           id: item.selectedSkuComb.id,
    //           goodsId: item.goodsId,
    //           store: data.store,
    //           title: data.name,
    //           desc: data.name,
    //           price: item.selectedSkuComb.price,
    //           num: item.selectedNum,
    //           thumb: _(data, 'image.url')
    //         };
    //       }
    //       commit('ADD_ITEM_TO_CART', good);
    //       resolve();
    //     }).catch(error => {
    //       reject(error);
    //     });
    //   });
    // },
    addItemToCart({ commit }, item) {
      commit('ADD_ITEM_TO_CART', item);
    },
    delItemFromCart({ commit }, item) {
      commit('DEL_ITEM_FROM_CART', item);
    },
    setShoppingCart({ commit }, cart) {
      commit('SET_SHOPPING_CART', cart);
    },
    setStoreCart({ commit }, cart) {
      commit('SET_STORE_CART', cart);
    },
    updateCartByItem({ commit }, item) {
      commit('UPDATE_CART_BY_ITEM', item);
    },
    delStoreCart({ commit }, key) {
      commit('DEL_STORE_CART', key);
    },
    delCartByOrder({ commit }, order) {
      commit('DEL_CART_BY_ORDER', order);
    }
  }
};

function _(value, path) {
  return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path).reduce((o, k) => (o || {})[k], value) || undefined;
}
export default cart;
