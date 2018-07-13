<template>
	<div>
		<van-nav-bar :title="$t('ORDERS_TITLE')" left-text="" left-arrow @click-left="goUser" />
		<van-tabs @click="toPage" :active="active">
			<van-tab v-for="(tab,i) in tabs" :title="tab[language]" :key="i">
			</van-tab>
		</van-tabs>
		<order-card v-for="(order,i) in orderList" :order="order" :key="i" />
	</div>
</template>

<script>
import { doPost } from '@/api/api2'
import orderCard from './orderCard'
export default {
	mounted() {
		this.filterMaker();

		this.orderFind();
	},
	computed: {
		active: {
			get() {
				return this.tabs.findIndex(tab => tab.en === this.$route.query.tab);
			},
		}
	},
	data() {
		return {
			tabs: [{ zh: '全部', en: 'all' }, { zh: '待付款', en: 'pending' }, { zh: '待发货', en: 'unshipped' }, { zh: '待收货', en: 'shipped' }, { zh: '待评论', en: 'received' }],
			transName: 'transleft',
			// active: 0,
			orderList: [],
			filters: { paymentStatus: { $ne: 'expired' } }
		}
	},
	methods: {
		toPage(index) {
			this.$router.push({ path: '/orders/order-list', query: { tab: this.tabs[index].en } })
		},
		orderFind() {
			this.orderList = [];
			doPost('/Order.findAllByStatus', this.filters).then(res => {
				this.orderList = res;
			})
		},
		goUser() {
			this.$router.push({ path: '/me' })
		},
		filterMaker() {
			switch (this.$route.query.tab) {
				case 'pending': this.filters.paymentStatus = 'pending'; break;
				case 'unshipped': this.filters.paymentStatus = 'paid'; this.filters.shippingStatus = 'unshipped'; break;
				case 'shipped': this.filters.paymentStatus = 'paid'; this.filters.shippingStatus = 'shipped'; break;
				case 'received': this.filters.paymentStatus = 'paid'; this.filters.shippingStatus = 'received'; break;
				default: this.filters = { paymentStatus: { $ne: 'expired' } }
			}
		}
	},
	watch: {
		$route() {
			this.filterMaker();
			this.orderFind();
		}
	},
	components: {
		orderCard,
	}
}
</script>

<style>

</style>
