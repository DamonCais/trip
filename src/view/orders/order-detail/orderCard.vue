<template>
	<div class="order_card">
		<van-cell :title="order.store.name+' >'" :to="'/stores/'+order.store._id" :value="showStatus" />

		<van-card class="card" v-for="(item,i) in order.items" :key="i" :desc="pDesc(item)" :title="item.name" :num="item.quantity" :price="formatPrice(item.price)" :thumb="pThumb(item)">
		</van-card>
		<van-cell title="　" :value="showValue()" />
		<van-cell class="btn" title="　">

			<van-button size="small">查看物流</van-button>
			<van-button size="small">延长收货</van-button>
			<van-button style="color:orange;" size="small">确认收货</van-button>

		</van-cell>
	</div>
</template>

<script>
import { doPost, doGet } from '@/api/api'

import { Toast } from "vant";
export default {
	mounted() {
		// this.storeGet();
	},
	props: {
		order: {
			type: Object,
			required: true
		},

	},
	data() {
		return {
			checkedGoods: [],
			storeName: ''
		};
	},

	computed: {
		showStatus() {
			switch (this.order.paymentStatus) {
				case 'pending': return this.$t('ORDERS_PENDING');
				default: return this.order.shippingStatus === 'unshipped' ? this.$t('ORDERS_UNSHIPPED') : this.$t('ORDERS_SHIPPED')
			}
		},
	},
	methods: {
		pDesc(item) {
			if (item.productOptionId) {
				return item.productOption.name
			} else {
				return item.name
			}
		},
		pThumb(item) {
			if (item.productOptionId) {
				return this._(item, 'productOption.image.url') || item.product.image.url
			} else {
				return item.product.image.url
			}
		},
		showValue() {
			return `共${this.order.items.length}件商品 合计:￥${(this.order.totalCost / 100).toFixed(2)} (含运费:￥${(this.order.shippingCost / 100).toFixed(2)} )`
		},
		formatPrice(price) {
			return (price / 100).toFixed(2);
		},
		orderPay() {
			this.$router.push({ path: '/orders/' + this.order._id + '/pay' })
		},
		orderDetail() {
			this.$router.push({ path: '/orders/' + this.order._id })

		}
	}
};
</script>

<style lang="scss" scoped>
.order_card {
  .card {
    // background: #fff;
    margin-top: 1px;
  }
  margin-bottom: 10px;
}

.btn {
  position: fixed;
  bottom: 0;
  max-width: 600px;
  margin: 0 auto;
}
</style>

