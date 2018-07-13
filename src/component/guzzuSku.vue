<template>
	<div>
		<!-- 购物车底部弹出 -->
		<!-- 底部导航 -->
		<!-- <van-goods-action class="footer">
			<van-goods-action-mini-btn icon="cart" @click="toCart" text="购物车" :info="storeCart.length|toStr" />
			<van-goods-action-mini-btn icon="shop" text="店铺" />
			<van-goods-action-big-btn @click="addToCart" text="加入购物车" />
			<van-goods-action-big-btn @click="clickToBuy" text="立即购买" primary />
		</van-goods-action> -->
		<!-- 商品sku -->
		<van-sku class="sku" v-model="showStepper" :sku="data.sku" :goods="data.goods_info" :goods-id="data.goods_id" :hide-stock="data.sku.hide_stock" :quota="data.quota" :quota-used="data.quota_used" :custom-stepper-config="customStepperConfig" :message-config="messageConfig" :initial-sku="initialSku" @buy-clicked="onBuyClicked" @add-cart="onAddCartClicked" />
	</div>
</template>

<script>
// import axios from "axios";
import { mapState } from "vuex";
import data from "./sku.js";
import { Toast } from "vant";
import Cookies from "js-cookie";
import { doPost } from "@/api/api";
import { LIMIT_TYPE } from "./constants";
export default {
	props: {
		product: {
			type: Object
		}
	},
	data() {
		return {
			showCart: false,
			showStepper: false,
			data: data,
			initialSku: {
				s1: "30349"
			},
			customStepperConfig: {
				// quotaText: "单次限购100件",
				handleOverLimit: data => {
					const { action, limitType, quota } = data;
					if (action === "minus") {
						Toast("至少选择一件商品");
					} else if (action === "plus") {
						if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
							Toast(`限购${quota}件`);
						} else {
							Toast("库存不够了~~");
						}
					}
				}
			},
			messageConfig: {
				uploadImg: (file, img) => {
					return new Promise(resolve => {
						setTimeout(() => resolve(img), 1000);
					});
				},
				uploadMaxSize: 3
			}
		};
	},
	mounted() {
		let {
      name,
			price,
			maxQuantity,
			_id,
			inventoryPolicy,
			image,
			productOptions
    } = this.product;
		this.data.sku.price = price / 100;
		this.data.sku.stock_num =
			inventoryPolicy === "unlimited" ? 999 : maxQuantity;
		this.data.goods_id = _id;
		this.data.sku.collection_id = _id;
		this.data.goods_info = {
			title: name,
			picture: this._(image, "url")
		};
		let tree = {
			k: "选项",
			k_id: "1",
			v: [],
			k_s: "s1",
			count: 2
		};
		let list = [];
		productOptions.forEach(element => {
			tree.v.push({
				id: element._id,
				name: element.name,
				imgUrl: this._(element, "image.url")
			});
			list.push({
				id: element._id, // skuId，下单时后端需要
				price: element.price, // 价格（单位分）
				s1: element._id, // 规格类目 k_s 为 s1 的对应规格值 id
				stock_num: element.inventoryPolicy === 'unlimited' ? 999 : element.maxQuantity, // 当前 sku 组合对应的库存
				goods_id: _id
			});
		});
		if (tree.v.length === 0) {
			tree.v = [
				{
					id: _id,
					name: name,
				}
			];

			this.data.sku.none_sku = true; //是否无规格
		} else {
			tree.count = tree.v.length;
			this.initialSku.s1 = tree.v[0].id;
			this.data.sku.none_sku = false;
		}
		this.data.sku.tree = [tree];
		this.data.sku.list = list;
	},
	methods: {
		storeCartGet() {

		},
		toCart() {
			console.log('toCart');
		},
		clickToBuy() {
			console.log(this.storeCart);
		},
		addToCart() {
			console.log('addToCart');
		},
		onBuyClicked(data) {
			this.onAddCartClicked(data).then(() => {
				this.$router.push({ path: '/carts' })
			})
		},
		showSku() {
			this.showStepper = true;
		},
		onAddCartClicked(data) {
			let good;
			if (data.selectedSkuComb.goods_id) {
				const options = this.product.productOptions.filter(p => p._id === data.selectedSkuComb.id);
				good = {
					id: data.selectedSkuComb.id,
					goodsId: data.goodsId,
					store: this.product.store,
					title: this.product.name,
					desc: options[0].name,
					price: data.selectedSkuComb.price,
					num: data.selectedNum,
					thumb: this._(options[0], 'image.url') || this._(this.product, 'image.url')
				};
			} else {
				good = {
					id: data.selectedSkuComb.id,
					goodsId: data.goodsId,
					store: this.product.store,
					title: this.product.name,
					desc: this.product.name,
					price: data.selectedSkuComb.price,
					num: data.selectedNum,
					thumb: this._(this.product, 'image.url')
				};
			}
			this.showStepper = false;
			this.$emit('addToCart', good);
			return this.$store.dispatch('addItemToCart', good).then(() => {
				Toast({
					message: '添加成功',
					duration: 500
				});

			})

			// 
		},
	},
	computed: {
	},
	filters: {
		toStr(val) {
			if (val === 0) return '';
			return '' + val;
		}
	}
};
</script>

<style lang="scss" scoped>
.sku {
  max-width: 700px;
  margin: 0 auto;
}
.footer {
  max-width: 700px;
  margin: 0 auto;
}
</style>
<style lang="scss">
.popUp {
  max-height: 50%;
  .van-tabs {
    .van-tabs__content {
      height: 156px;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }
}
</style>
