<template>
	<div class="order_card">

		<van-cell :to="'/stores/'+order.store._id" :value="$t(showStatus)">
			<span slot="title">{{order.store.name}}
				<van-icon style="font-size:12px;" name="arrow" />
			</span>
		</van-cell>
		<van-card class="card" v-for="(item,i) in order.items" :key="i" :desc="pDesc(item)" :title="item.name" :num="item.quantity" :price="formatPrice(item.price)" :thumb="pThumb(item)">
		</van-card>
		<van-cell title="　" :value="showValue()" />
		<van-cell title="　">

			<van-button v-show="order.paymentStatus==='pending'" @click="orderPay" size="small">前往付款</van-button>
			<van-button v-show="order.paymentStatus!=='pending'&&order.shippingStatus==='unshipped'" size="small">提醒卖家发货</van-button>
			<van-button v-show="order.paymentStatus!=='pending'&&order.shippingStatus==='shipped'" size="small">查看物流</van-button>
			<van-button v-show="order.paymentStatus!=='pending'&&order.shippingStatus==='shipped'" size="small">确认收货</van-button>
			<van-button v-show="order.paymentStatus!=='pending'&&order.shippingStatus==='received'" size="small">评价</van-button>
			<van-button size="small" @click="orderDetail">订单详情</van-button>

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
				case 'pending': return 'ORDERS_PENDING';
			};
			switch (this.order.shippingStatus) {
				case 'unshipped': return 'ORDERS_UNSHIPPED';
				case 'shipped': return 'ORDERS_SHIPPED';
				case 'received': return 'ORDERS_RECEIVED';
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
</style>

