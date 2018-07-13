import { doPost } from '@/api/api2';

const orders = {

  state: {
    orderEntity: JSON.parse(localStorage.getItem('orderEntity')) || []
  },
  mutations: {
    SET_ORDERENTITY: (state, orders) => {
      state.orderEntity = orders;
      localStorage.setItem('orderEntity', JSON.stringify(state.orderEntity));
    },
    DEL_ORDERENTITY: (state) => {
      state.orderEntity = [];
      localStorage.setItem('orderEntity', JSON.stringify(state.orderEntity));
    }
  },
  actions: {
    setOrderEntity({ commit }, orders) {
      return new Promise((resolve, reject) => {
        const storeId = orders[0].store;
        return doPost('StoreCart.clear', { storeId }).then(() => {
          const a = [];
          for (var element of orders) {
            const item = {
              storeId: element.store,
              productId: element.goodsId,
              quantity: element.num
            };
            if (element.id !== element.goodsId) {
              item.productOptionId = element.id;
            }
            a.push(doPost('StoreCart.addItem', item));
          }
          return Promise.all(a);
        }).then(() => {
          return doPost('StoreCart.preview', { storeId }).then(() => {
            commit('SET_ORDERENTITY', orders);
            resolve();
          });
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default orders;
