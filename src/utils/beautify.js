export function OrderFilter(params) {
  const { dateType, fromDate, toDate, keyWord, orderStatus, paymentStatus, shippingStatus, selectType } = params;
  const obj = {};
  if (dateType !== 'All') {
    obj[dateType] = {
      $gte: fromDate.toISOString(),
      $lt: toDate.toISOString()
    };
  };
  if (orderStatus !== 'All') {
    obj.status = orderStatus;
  };
  if (paymentStatus !== 'All') {
    obj.paymentStatus = paymentStatus;
  };
  if (shippingStatus !== 'All') {
    obj.shippingStatus = shippingStatus;
  }
  if (keyWord) {
    obj[selectType] = keyWord;
  }
  return obj;
}
