<template>
	<div>
		<div class="user-header">
			<div class="user-avator">
				<img src="http://mp.jycais.cn/uploadDir/upload_77573ce4866f80ffbb0338097d2f0bc1.jpg" alt="">
				<span>用户123456</span>
			</div>
		</div>
		<van-cell-group class="user-group">
			<van-cell to="/orders/order-list?tab=all" title="我的订单" is-link>
				<template>
					<span style="color:#aaa;">全部订单</span>
				</template>
			</van-cell>
			<div class="user-tab">
				<van-tabbar>
					<van-tabbar-item icon="pending-payment" info="+1">待付款</van-tabbar-item>
					<van-tabbar-item icon="logistics">处理中</van-tabbar-item>
					<van-tabbar-item icon="pending-deliver">待出行</van-tabbar-item>
					<van-tabbar-item icon="pending-orders" info="+99">待评价</van-tabbar-item>
					<van-tabbar-item icon="gold-coin">退款/售后</van-tabbar-item>
				</van-tabbar>
			</div>

			<!-- <van-row class="user-links">
				<van-col span="6">
				</van-col>
				<van-col span="6">
					<van-icon @click="toOrder('unshipped')" name="logistics" /> {{$t('ME_PAID')}}
				</van-col>
				<van-col span="6">
					<van-icon @click="toOrder('shipped')" name="pending-deliver" /> {{$t('ME_SHIPPED')}}
				</van-col>
				<van-col span="6">
					<van-icon @click="toOrder('received')" name="pending-orders" /> {{$t('ME_RECEIVED')}}
				</van-col>
			</van-row> -->
			<!-- <div class="user-tabbar">
				<div class="user-tab">
					<van-icon info="+1" name="pending-payment" /> 待付款
				</div>
				<div class="user-tab">
					<van-icon name="logistics" /> 处理中
				</div>
				<div class="user-tab">
					<van-icon name="pending-deliver" /> 待出行
				</div>
				<div class="user-tab">
					<van-icon info="+99" name="pending-orders" /> 待评价
				</div>
				<div class="user-tab">
					<van-icon name="pending-payment" /> 退款/售后
				</div>
			</div> -->
		</van-cell-group>

		<van-cell-group>
			<van-cell title="我的资料" to="/me/addresses" isLink />
			<van-cell title="我的收藏" to="/me/coupons" is-link />
			<van-cell title="常见问题" to="/me/coupons" is-link />

		</van-cell-group>
		<div class="user-logout">
			<van-button @click="logout" size="large">登出</van-button>
		</div>
		<div class="user-phone">
			客服电话：400-800-8820

		</div>
	</div>
</template>

<script>
export default {
  components: {},
  methods: {
    toOrder(tab) {
      this.$router.push({ path: "/orders/order-list?tab=" + tab });
    }
  },
  computed: {
    lang: {
      get() {
        return this.language;
      },
      set(lang) {
        this.$i18n.locale = lang;
        this.$store.dispatch("setLanguage", lang);
      }
    }
  }
};
</script>

<style lang="less">
.user {
  &-poster {
    width: 7.5rem;
    height: 4rem;
    display: block;
  }

  &-group {
    margin-bottom: 0.3rem;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
<style lang="scss" scoped>
.user-header {
  height: 132px;
  background-color: rgba(242, 242, 242, 1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
  img {
    width: 69px;
    height: 69px;
    vertical-align: middle;
    border-radius: 50%;
  }
  .user-avator {
    line-height: 69px;
  }
}
.user-tab {
  padding: 5px 0;
  .van-tabbar--fixed {
    position: relative;
  }

  .van-hairline--top-bottom::after {
    border-width: 0 !important;
  }
}
.user-logout {
  padding: 10px;
}
.user-phone {
  color: rgba(51, 153, 255, 1);
  text-align: center;
  margin-top: 50px;
  font-size: 14px;
}
</style>
