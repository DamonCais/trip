import Vue from 'vue';
import { mapGetters } from 'vuex';
import { formatTime } from '@/utils/index';

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
    ...mapGetters(['language', 'shoppingmallId', 'shoppingCart', 'username', 'token'])
  },
  components: {

  }
});
