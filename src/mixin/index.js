import Vue from 'vue';
import { mapGetters } from 'vuex';
// import { formatTime } from '@/utils/index';

Vue.mixin({
  methods: {
    _(value, path) {
      return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path).reduce((o, k) => (o || {})[k], value) || undefined;
    },
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.push({ path: '/pages' });
    },
    toPageByLink(item) {
      if (!item.linkType) {
        return;
      }
      this.$router.push({ path: `/${item.linkType === 'category' ? 'categories' : item.linkType + 's'}/${item[item.linkType]}` });
    }
  },
  filters: {
    deepGet(value, path) {
      return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path).reduce((o, k) => (o || {})[k], value) || undefined;
    },
    _formatTime(val) {
      return formatTime(val);
    },
    yuan(value) {
      return !isNaN(value) ? '¥' + (value / 100).toFixed(2) : value;
    }
  },
  computed: {
    ...mapGetters(['language', 'shoppingmallId', 'shoppingCart', 'username', 'token', 'offTime'])
  },
  components: {

  }
});

function formatTime(time, option) {
  // time = +time * 1000
  const d = new Date(time);
  console.log(d);
  const now = Date.now();

  // const diff = (now - d) / 1000;

  // if (diff < 30) {
  //   return '刚刚';
  // } else if (diff < 3600) { // less 1 hour
  //   return Math.ceil(diff / 60) + '分钟前';
  // } else if (diff < 3600 * 24) {
  //   return Math.ceil(diff / 3600) + '小时前';
  // } else if (diff < 3600 * 24 * 2) {
  //   return '1天前';
  // }
  // if (option) {
  //   return parseTime(time, option);
  // } else {
  //   return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';
  // }
  return d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate();
}
