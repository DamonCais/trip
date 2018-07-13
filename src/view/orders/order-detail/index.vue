<template>
	<div>
		<van-nav-bar title="订单详情" left-text="" left-arrow @click-left="goBack" />
		<div class="status">
			<h3>{{$t(showStatus)}}</h3>
			<h4 v-if="showStatus==='ORDERS_UNSHIPPED'">请耐心等待发货</h4>
			<h4 v-if="showStatus==='ORDERS_SHIPPED'">还剩{{order.autoReceiveAt|remainTime}}自动确认</h4>
			<h4 v-if="showStatus==='ORDERS_PENDING'">请在{{order.closedAt|remainTime}}前付款</h4>
			<h4 v-if="showStatus==='ORDERS_RECEIVED'">交易已完成</h4>
		</div>
		<van-cell icon="location" v-if="shippingAddress.name" :title="shippingAddress.name" :value="shippingAddress.mobilePhone" :label="shippingAddress|fullAddress" />
		<order-card v-if="order._id" :order="order" />
		<div class="orderInfo">
			<h4>订单编号: {{order.refId}}</h4>
			<h4>创建时间: {{order.createdAt|parseTime}}</h4>
			<h4>付款时间:{{order.paidAt|parseTime}}</h4>
			<h4>发货时间:{{order.shippedAt|parseTime}}</h4>
			<span class="copy">复制</span>

		</div>
	</div>
</template>

<script>
import { doPost } from '@/api/api2'
import orderCard from './orderCard'

export default {
	mounted() {
		console.log(this.$route.params.id);
		this.orderGet();
	},
	data() {
		return {
			order: {},
			shippingAddress: {},
			status: '卖家已发货',
			refId: '',
			createdAt: '',
			autoReceiveAt: '',
		}
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
		orderGet() {
			doPost('/Order.get', { orderId: this.$route.params.id }).then(res => {
				this.order = res;
				this.shippingAddress = res.shippingAddress;
				this.refId = res.refId;
				this.createdAt = res.createdAt;
				this.autoReceiveAt = res.autoReceiveAt;
			})
		}
	},
	components: {
		orderCard,
	},
	filters: {
		fullAddress(item) {
			return `${item.province.split('/')[1]} ${item.city.split('/')[1]} ${item.district.split('/')[1] || ''} ${item.street.split('/')[1] || ''}`;
		}
	}
}
</script>

<style lang="scss" scoped>
.status {
  // height: 60px;
  background: orange;
  padding: 20px;

  h3 {
    margin-bottom: 5px;
    font-size: 18px;
  }
  h4 {
    font-size: 14px;
  }
}
.orderInfo {
  background: #fff;
  padding: 5px;
  font-size: 12px;
  color: #999;
  position: relative;
  line-height: 16px;
  .copy {
    position: absolute;
    right: 10px;
    top: 5px;
    border: 1px solid #aaa;
    border-radius: 3px;
    padding: 2px 6px;
    cursor: pointer;
  }
}
</style>
