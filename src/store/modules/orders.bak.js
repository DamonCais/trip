import { doGet } from '@/api/api';

const orders = {

  state: {
    shoppingCart: JSON.parse(localStorage.getItem('shoppingCart')) || [],
    orderEntity: JSON.parse(localStorage.getItem('orderEntity')) || [],
    orderAddressId: JSON.parse(localStorage.getItem('orderAddressId')) || -1
  },
  mutations: {
    ADD_ITEM_TO_CART: (state, item) => {
      const index = state.shoppingCart.findIndex(cart => cart.id === item.id);
      if (index === -1) {
        state.shoppingCart.push(item);
      } else {
        state.shoppingCart[index].num = item.num + state.shoppingCart[index].num;
      }
      localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart));
    },
    DEL_ITEM_FROM_CART: (state, item) => {
      state.shoppingCart = state.shoppingCart.filter(cart => cart.id !== item.id);
      localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart));
    },
    UPDATE_CART_BY_ITEM: (state, item) => {
      const index = state.shoppingCart.findIndex(cart => cart.id === item.id);
      state.shoppingCart.splice(index, 1, item);
      localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart));
    },
    SET_CART: (state, cart) => {
      state.shoppingCart = cart;
      localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart));
    },
    DEL_THE_CART: (state) => {
      state.shoppingCart = [];
      localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart));
    },
    SET_ORDERENTITY: (state, orders) => {
      state.orderEntity = orders;
      localStorage.setItem('orderEntity', JSON.stringify(state.orderEntity));
    },
    SET_ORDER_ADDRESS_ID: (state, addressId) => {
      state.orderAddressId = addressId;
      localStorage.setItem('orderAddressId', JSON.stringify(state.orderAddressId));
    }
  },
  actions: {
    addItemToCart({ commit }, item) {
      let good;
      return new Promise((resolve, reject) => {
        doGet(`/products/${item.goodsId}`).then(response => {
          const data = response;
          if (item.selectedSkuComb.goods_id) {
            const options = data.productOptions.filter(p => p._id === item.selectedSkuComb.id);
            good = {
              id: item.selectedSkuComb.id,
              title: data.name,
              desc: options[0].name,
              price: item.selectedSkuComb.price,
              num: item.selectedNum,
              thumb: _(options[0], 'image.url') || _(data, 'image.url')
            };
          } else {
            good = {
              id: item.selectedSkuComb.id,
              title: data.name,
              desc: data.name,
              price: item.selectedSkuComb.price,
              num: item.selectedNum,
              thumb: _(data, 'image.url')
            };
          }
          commit('ADD_ITEM_TO_CART', good);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    delItemFromCart({ commit }, item) {
      commit('DEL_ITEM_FROM_CART', item);
    },
    setCart({ commit }, cart) {
      commit('SET_CART', cart);
    },
    updateCartByItem({ commit }, item) {
      commit('UPDATE_CART_BY_ITEM', item);
    },
    delTheCart({ commit }) {
      commit('DEL_THE_CART');
    },
    setOrderEntity({ commit }, orders) {
      commit('SET_ORDERENTITY', orders);
    }
  }
};

function _(value, path) {
  return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path).reduce((o, k) => (o || {})[k], value) || undefined;
}
export default orders;
