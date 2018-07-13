const getters = {
  language: state => state.app.language,
  offTime: state => state.app.offTime,
  shoppingmallId: state => state.app.shoppingmallId,
  shoppingCart: state => state.cart.shoppingCart,
  orderEntity: state => state.orders.orderEntity,
  orderAddressId: state => state.orders.orderAddressId,
  username: state => state.user.name,
  token: state => state.user.token,
  userAddress: state => state.user.address
};
export default getters;
