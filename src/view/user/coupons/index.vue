<template>
	<div class="coupons">
		<van-nav-bar class="nav" title="我的优惠券" left-text="返回" left-arrow @click-left="goBack" />
		<div @click="couponsShow(coupon[0].store._id)" class="store" v-for="(coupon,i) in storeList" :key="i">
			<span>{{coupon[0].store.name}}</span>
			<img :src="_(coupon[0].store,'logo.url')" alt="">
			<span class="icon">
				<van-icon name="arrow" />
			</span>
		</div>

		<van-popup v-model="showList" position="bottom">
			<van-coupon-list :coupons="showCoupons" :show-exchange-bar="false" :show-close-button="false" :chosen-coupon="chosenCoupon" @change="onChange" @exchange="onExchange" />
		</van-popup>

	</div>
</template>

<script>

import { doPost } from '@/api/api2'
export default {
	mounted() {
		this.userCouponsGet().then(() => {
			this.$forceUpdate();
		})
	},

	data() {
		return {
			chosenCoupon: -1,
			coupons: [],
			disabledCoupons: [],
			showList: false,
			showCoupons: [],
			storeList: {},
		}
	},

	methods: {
		couponsShow(id) {
			// this.showCoupons = this.coupons.filter(coupon => coupon.store._id === id);
			this.showCoupons = this.storeList[id]
			this.showList = true;
		},
		userCouponsGet() {
			return doPost('/UserDiscount.find').then(res => {
				let a = [];
				res.forEach(element => {
					a.push(this.CouponGetById(element.discount._id))
				});
				return Promise.all(a);
			})
		},
		CouponGetById(id) {
			return doPost('/Discount.get', { discountId: id }).then(res => {
				let coupon = this.couponMaker(res);
				this.coupons.push(coupon)
				if (!this.storeList[res.store._id]) {
					this.storeList[res.store._id] = [];
				}
				this.storeList[res.store._id].push(coupon);
			})
		},
		couponMaker(res) {
			let coupon = {
				available: 1,
				discount: 50,
				denominations: 0,
				origin_condition: res.conditions[0].minPurchase,
				reason: '',
				// value: 150,
				name: res.name,
				start_at: Date.parse(new Date(res.onlineAt)) / 1000,
				end_at: Date.parse(new Date(res.offlineAt)) / 1000,
				store: res.store
			}
			return coupon
		},
		onChange(index) {
			this.showList = false;
			this.chosenCoupon = index;
		},
		onExchange(code) {
			this.exchangedCoupons.push({
				...this.coupon,
				id: this.randomId()
			});
		},
		randomId(max = 999999) {
			return Math.floor(Math.random() * max) + 1;
		},
	}
}
</script>

<style lang="scss" scoped>
.store {
  padding: 10px 18px 10px 68px;
  margin: 1px 0;
  background: #fff;
  box-sizing: border-box;
  height: 70px;
  position: relative;
  display: flex;
  justify-content: center;
  line-height: 20px;
  flex-direction: column;
  img {
    position: absolute;
    left: 9px;
    top: 10px;
    width: 50px;
    height: 50px;
  }
  .icon {
    position: absolute;
    right: 5px;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
  }
}
</style>