import './common/rem';
import Vue from 'vue';
import App from './App.vue';
import { router } from './router/index.js';

import store from './store';

import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

import '@/css/reset.scss';
import '@/css/animation.scss';

Vue.use(Vant);

import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    'zh': require('@/lang/zh'),
    'en': require('@/lang/en')
  }
});
import '@/mixin';

import * as filters from './filters';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

new Vue({
  store,
  router,
  i18n,
  el: '#app',
  render: h => h(App)
});
