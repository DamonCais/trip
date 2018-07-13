<template>
	<div class="payment">
		<van-nav-bar title="付款" left-text="" left-arrow @click-left="goBack" />

		<!-- <div class="time_down payment_group">
			剩余付款时间:
			<span class="red">59分59秒</span>
		</div> -->

		<van-cell-group class="payment_group">
			<van-cell title="订单编号" :value="refId" />
			<van-cell title="实付金额">
				<span class="red">{{totalPrice | yuan}}</span>
			</van-cell>
		</van-cell-group>

		<div class="pay_way_group">
			<div class="pay_way_title">选择支付方式</div>
			<van-radio-group v-model="payWay">
				<van-cell-group>
					<van-cell>
						<van-radio name="alipay">
							<img src="@/assets/images/ali_pay.png" alt="支付宝" width="82" height="29">
						</van-radio>
					</van-cell>

					<van-cell>
						<van-radio name="wxpay">
							<img src="@/assets/images/wx_pay.png" alt="微信支付" width="113" height="23">
						</van-radio>
					</van-cell>
				</van-cell-group>
			</van-radio-group>
		</div>

		<van-button class="pay_submit" @click="paySubmit" :loading="isSubmit" type="primary" bottomAction>去支付</van-button>
	</div>
</template>

<script>
import { doPost } from '@/api/api2'
export default {
	name: "payment",

	data() {
		return {
			isSubmit: false,
			payWay: "alipay",
			totalPrice: 0,
			orderId: '',
			refId: '',
			storeSlug: '',
		}
	},

	methods: {
		paySubmit() {
			window.location.replace(`https://pay-dev.guzzu.cn/${this.payWay}/${this.storeSlug}?orderId=${this.orderId}&lang=zh`)
			// this.$router.push({ path: '/pages' })
		},
		orderGet() {
			doPost('/Order.get', { orderId: this.$route.params.id }).then(res => {
				console.log(res);
				this.orderId = res._id;
				this.refId = res.refId;
				this.storeSlug = res.store.slug;
				this.totalPrice = res.totalCost
			})
		}
	},
	mounted() {
		this.orderGet();
	}


}

</script>

<style lang="scss" scoped>
.payment_group {
  margin-bottom: 10px;
}

.time_down {
  background-color: #fffeec;
  padding: 10px 15px;
}

.pay_submit {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.pay_way_group img {
  vertical-align: middle;
}

.pay_way_title {
  padding: 15px;
  background-color: #fff;
}
</style>
