<template>
	<div>
		<van-nav-bar title="创建订单" left-text="" left-arrow @click-left="goBack" />

		<div>
			<!-- 用户信息 -->
			<van-cell-group class="info">
				<van-cell @click="onAddressSel=true" icon="location" isLink :title="addTitle" :label="addLabel" />

				<van-cell class="daodian">
					<van-checkbox v-model="isDaoDian" slot="icon" label="浙江省 杭州市 西湖区 创新创业园">
						<span class="van-cell__text">到店自提</span>
						<span class="text-desc">可免邮费哦~</span>
					</van-checkbox>
					<div class="text-desc shop_address" slot="title">门店地址: 浙江省 杭州市 西湖区 创新创业园</div>
				</van-cell>
			</van-cell-group>

			<!-- 订单详情 -->
			<div class="order-goods">
				<van-card v-for="item in orderEntity" :key="item.id" :title="item.title" :desc="item.desc" :num="item.num" :price="(item.price / 100).toFixed(2)" :thumb="item.thumb">
				</van-card>
				<!-- 优惠券单元格 -->
				<van-coupon-cell v-show="coupons.length" :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />

				<!-- 优惠券列表 -->
				<van-popup v-model="showList" position="bottom">
					<van-coupon-list :coupons="coupons" :show-exchange-bar="false" :show-close-button="true" :chosen-coupon="chosenCoupon" @change="onChange" @exchange="onExchange" />
				</van-popup>
				<!-- 备注 -->
				<van-cell-group>
					<van-field type="textarea" rows="1" autosize class="remark" :maxlength="50" v-model="remark" placeholder="请输入备注" label="订单备注">
						<template slot="icon">
							{{remark.length}}/50
						</template>
					</van-field>

					<van-cell title="商品金额">
						<span class="red">{{orderPrice | yuan}}</span>
					</van-cell>
					<van-cell v-show="!isDaoDian" title="邮费" :value="shippingCost|yuan"></van-cell>
				</van-cell-group>
			</div>

			<!-- 提交按钮 -->
			<van-submit-bar class="orderSubmit" :price="totalCost" label="总计：" buttonText="提交订单" :loading="isSubmit" :disabled="isDisabled" @submit="onSubmit" />
		</div>
		<transition :name="onAddressSel?'transleft':'transright'">
			<address-sel @onSel="onSel" v-show="onAddressSel"></address-sel>
		</transition>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import addressSel from './order-address'
import { doPost } from '@/api/api2'
export default {
	computed: {
		...mapGetters(['orderEntity']),
		orderPrice() {
			if (JSON.stringify(this.orderEntity) === '{}') {
				return 0;
			}
			return this.orderEntity.reduce((total, item) => total + item.price * item.num, 0);
		},
		totalPrice() {
			return (this.isDaoDian ? this.orderPrice : this.orderPrice + this.shippingCost) - (this._(this.coupons[this.chosenCoupon], 'value') || 0);
		},
	},
	data() {
		return {
			isDaoDian: false,
			isSubmit: false,
			isDisabled: false,
			shippingCost: 893,
			remark: "",
			addTitle: '编辑您的收获地址',
			addLabel: '',
			onAddressSel: false,
			address: {},
			// 优惠券
			chosenCoupon: -1,
			coupons: [],
			showList: false,
			discountId: '',
			totalCost: 0
		}
	},
	mounted() {
		if (this.orderEntity.length === 0) {
			this.$router.push({ path: '/orders/order-list' })
			return;
		}
		this.lastUsedGet().then(() => {
			if (JSON.stringify(this.address) !== '{}') {
				this.orderPreview().then(res => {
					this.shippingCost = res.order.shippingCost;
					this.totalCost = res.order.totalCost
				})
			}
		})
		this.discountGet();
	},
	beforeDestroy() {
	},

	methods: {
		lastUsedGet() {
			return doPost('/UserAddress.getLastUsed').then(res => {
				if (!res) { return; }
				this.address = res;
				this.addLabel = this.fullAddress(res);
				this.addTitle = `${res.name} ${res.mobilePhone}`
			})
		},
		orderMaker() {
			let items = this.orderEntity.map(function (obj) {
				var newObj = {
					productId: obj.goodsId,
					quantity: obj.num,
				};
				if (obj.goodsId !== obj.id) {
					newObj.productOptionId = obj.id;
				}
				return newObj;
			});
			let storeId = this.orderEntity[0].store;
			let order = {
				clientType: 'web',
				// discountId: '',
				items,
				nonce: '' + (new Date()).valueOf(),
				note: '',
				shippingAddress: this.address,
				shippingType: 'regular',
				storeId,
				type: 'default',
				shoppingMall: this.shoppingmallId
			}
			if (this.discountId) {
				order.discountId = this.discountId;
			}
			return order;
		},
		orderPreview() {
			let order = this.orderMaker();
			return doPost('/Order.preview', order)
		},
		orderCreate() {
			let order = this.orderMaker();
			return doPost('/Order.create', order)
		},
		onSubmit() {
			// this.isSubmit = true;
			this.orderCreate().then(res => {
				this.$store.dispatch('delCartByOrder', this.orderEntity).then(() => {
					this.$store.commit('DEL_ORDERENTITY');
					this.$router.push({ path: '/orders/' + res._id + '/pay' })
				})
			})
		},
		onSel(address) {
			this.onAddressSel = false;
			if (!address) { return; }
			this.address = address;
			this.addLabel = this.fullAddress(address);
			this.addTitle = `${address.name} ${address.mobilePhone}`
			this.orderPreview().then(res => {
				this.shippingCost = res.order.shippingCost;
				this.totalCost = res.order.totalCost
			})
		},
		fullAddress(item) {
			if (JSON.stringify(item) !== '{}' && item) {
				return `${item.province.split('/')[1]} ${item.city.split('/')[1]} ${item.district.split('/')[1] || ''} ${item.street.split('/')[1] || ''}`;
			} else {
				return ``;

			}
		},
		discountGet() {
			let order = this.orderMaker();
			doPost('/Discount.findAvailable', { storeId: order.storeId, items: order.items }).then(res => {

				if (!res.length) { return; }
				doPost('/Discount.get', { discountId: res[0].discountId }).then(res => {
					let coupon = this.couponMaker(res);
					this.coupons.push(coupon)
				})
			})
		},
		couponMaker(res) {
			let coupon = {
				id: res._id,
				available: 1,
				discount: 100 - res.conditions[0].percentage,
				denominations: 0,
				origin_condition: res.conditions[0].minPurchase,
				reason: '',
				value: this.orderPrice * res.conditions[0].percentage / 100,
				name: res.name,
				start_at: Date.parse(new Date(res.onlineAt)) / 1000,
				end_at: Date.parse(new Date(res.offlineAt)) / 1000
			}
			return coupon
		},
		onChange(index) {
			this.showList = false;
			this.chosenCoupon = index;
			if (index === -1) {
				this.discountId = 0;
			} else {
				this.discountId = this.coupons[index].id;

			}
			this.orderPreview().then(res => {
				this.shippingCost = res.order.shippingCost;
				this.totalCost = res.order.totalCost
			})

		},
		onExchange(code) {
			this.exchangedCoupons.push({
				...this.coupon,
				id: this.randomId()
			});
		},
		randomId(max = 999999) {
			return Math.floor(Math.random() * max) + 1;
		}
	},
	components: {
		addressSel,
	}
}
</script>

<style lang="scss" scoped>
.daodian {
  .van-checkbox .van-icon-success {
    height: 16px;
    width: 16px;
    font-size: 14px;
    &::before {
      line-height: 16px;
    }
  }
  .van-checkbox__input {
    height: 16px;
  }
  .van-checkbox__label {
    margin-left: 0;
  }
  .shop_address {
    padding-left: 30px;
    box-sizing: border-box;
  }
  .text-desc {
    font-size: 12px;
    color: #999;
  }
}
.order-goods {
  background-color: #fafafa;
  .van-card {
    background-color: #fff;
  }
}
</style>

<style lang="scss">
.info {
  .van-cell {
    .van-cell__title {
      .van-cell__label {
        box-sizing: border-box;
        padding-left: 25px;
      }
    }
  }
}
.remark {
  .van-cell__value {
    .van-field__control {
      padding-right: 47px;
    }
  }
}
.orderSubmit {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 600px;
  margin: 0 auto;
}
</style>

