import axios from 'axios';
import store from '../store';
import { Toast } from 'vant';
// 创建axios实例
// axios.defaults.withCredentials = true;
const service = axios.create({
  // baseURL: 'https://master-dev.guzzu.cn/suapi/2',
  baseURL: 'https://mp-dev.guzzu.cn/api/2/',
  timeout: 15000 // 请求超时时间
  // withCredentials: true

});

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['x-guzzu-sessionid'] = store.getters.token; // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
    const res = response.data;
    // if (res.code !== 200) {
    //   Toast.fail({
    //     message: res.message
    //   });
    //   return Promise.reject('error');
    // } else {
    //   return response.data;
    // }
    return res;
  },
  error => {
    if (error.response.data.error === 'ERR_INVALID_AUTH') {
      window.location.replace('https://id-dev.guzzu.cn/shoppingmall1/shopping-mall-login');
    }
    Toast.fail(error.message);
    return Promise.reject(error);
  }
);

export default service;
