import axios from 'axios';
import store from '../store';
import { getToken } from '@/utils/auth';
import { Toast } from 'vant';
// 创建axios实例
// axios.defaults.withCredentials = true;
const service = axios.create({
  // baseURL: 'https://master-dev.guzzu.cn/suapi/2',
  baseURL: 'https://mp-dev.guzzu.cn/v3/frontapi/',
  timeout: 15000 // 请求超时时间
  // withCredentials: true

});

// request拦截器
service.interceptors.request.use(config => {
  config.headers['Accept-Language'] = store.getters.language || 'en';
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
    console.log(error);
    Toast.fail(error.message);
    return Promise.reject(error);
  }
);

export default service;
