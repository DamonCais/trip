<template>
	<div>
		<van-tabbar class="footer" v-model="active">
			<van-tabbar-item icon="wap-home">主页</van-tabbar-item>
			<van-tabbar-item icon="shop">游艇</van-tabbar-item>
			<van-tabbar-item icon="cart">管家</van-tabbar-item>
			<van-tabbar-item icon="contact">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
  data() {
    return {
      tabs: ["home", "yachts", "guides", "me"]
    };
  },
  computed: {
    active: {
      get() {
        let tab = this.$route.path.replace(/\//g, " ").split(" ")[1];
        for (var index = 0; index < this.tabs.length; index++) {
          if (this.tabs[index] === tab) {
            return index;
          } else if (tab === "stores") {
            return 1;
          }
        }
        return 0;
      },
      set(index) {
        if (this.active === index) {
          return;
        }
        this.$router.push({ path: "/" + this.tabs[index] });
      }
    },
    cartNum() {
      let total = 0;
      for (var key in this.shoppingCart) {
        total += this.shoppingCart[key].length;
      }
      return total;
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;

  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  background: #fff;
  z-index: 1000;
  max-width: 600px;
  margin: 0 auto;
  .nav {
    flex: 1;
    text-align: center;
  }
}
</style>
