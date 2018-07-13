<template>
	<div>

		<van-cell :title="storeName" is-link :to="'/stores/'+storeCart[0].store" />
		<van-checkbox-group class="card-goods" v-model="checkedGoods">
			<van-checkbox class="card-goods__item" v-for="item in storeCart" :key="item.id" :name="item.id">
				<van-card :title="item.title" :desc="item.desc" :num="item.num" :price="formatPrice(item.price)" :thumb="item.thumb">
					<div v-show="onEdit" slot="footer">
						<div class="tabs">
							<span @click.stop="itemMinus(item)">-</span>
							<span class="num">{{item.num}}</span>
							<span @click.stop="itemPlus(item)">+</span>
						</div>
						<!-- <van-button @click.stop="itemDel(item)" size="mini">删除</van-button> -->
					</div>
				</van-card>
				<transition :name="onEdit?'transleft':'transright'">
					<div v-show="onEdit" @click.stop="itemDel(item)" class="cart_del">{{$t('CARTS_DELETE')}}</div>
				</transition>
			</van-checkbox>
		</van-checkbox-group>
		<van-submit-bar class="submit" :price="totalPrice(storeCart)" :disabled="!checkedGoods.length" :button-text="submitBarText" @submit="onSubmit">
			<van-checkbox v-model="checkAll" style="padding: 0 10px;">{{$t('CARTS_CHECK_ALL')}}</van-checkbox>
		</van-submit-bar>
	</div>
</template>

<script>
import { doPost, doGet } from '@/api/api'
import { Dialog } from 'vant';

import { Toast } from "vant";
export default {
	mounted() {
		this.storeGet();
	},
	props: {
		storeCart: {
			type: Array,
		},
		onEdit: {
			type: Boolean,
		}
	},
	data() {
		return {
			checkedGoods: [],
			storeName: ''
		};
	},

	computed: {
		submitBarText() {

			const count = this.checkedGoods.length;
			if (this.onEdit) {
				return this.$t('CARTS_DELETE') + (count ? `(${count})` : '');
			}
			return this.$t('CARTS_SETTLEMENT') + (count ? `(${count})` : '');
		},


		checkAll: {
			set(val) {
				let arr = [];
				if (val) {
					this.storeCart.forEach(element => {
						arr.push(element.id);
					});
				}
				this.checkedGoods = arr;
			},
			get() { return this.storeCart.length === this.checkedGoods.length && this.storeCart.length > 0 }
		}
	},

	methods: {
		storeGet() {
			doGet(`stores/${this.storeCart[0].store}`).then(res => {
				this.storeName = res.name;
			})
		},
		totalPrice(storeCart) {
			return storeCart.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price * item.num : 0), 0);
		},
		setEdit() {
			this.onEdit = !this.onEdit;
			if (this.onEdit) {
				this.$store.dispatch('setStoreCart', this.storeCart);
			}

		},

		itemMinus(item) {
			if (item.num === 1) {
				this.itemDel(item);
				return;
			}
			let index = this.storeCart.findIndex(cart => cart.id === item.id);
			this.storeCart[index].num--;
			this.$store.dispatch('updateCartByItem', this.storeCart[index]);
			this.$forceUpdate();

		},
		itemDel(item) {
			Dialog.confirm({
				title: '是否删除',
				message: ''
			}).then(() => {
				this.$store.dispatch('delItemFromCart', item).then(() => {
					let index = this.checkedGoods.findIndex(id => id === item.id)
					if (index === -1) { return; }
					this.checkedGoods.splice(index, 1);
				})
				this.$forceUpdate();
			}).catch(() => {
				// on cancel
			});
		},

		itemPlus(item) {
			let index = this.storeCart.findIndex(cart => cart.id === item.id);
			this.storeCart[index].num++;
			this.$store.dispatch('updateCartByItem', this.storeCart[index]);
			this.$forceUpdate();
		},
		formatPrice(price) {
			return (price / 100).toFixed(2);
		},

		onSubmit() {
			if (this.onEdit) {
				Dialog.confirm({
					title: '是否删除',
					message: ''
				}).then(() => {
					this.updateStoreCart();
				}).catch(() => {
					// on cancel
				});
			} else {
				let orders = this.storeCart.filter(item => this.checkedGoods.indexOf(item.id) !== -1);
				if (this.token) {
					this.$store.dispatch('setOrderEntity', orders).then(() => {
						// this.updateStoreCart();
						this.$router.push({ path: '/checkout' })
					}).catch(error => {
						console.log(error.response)
						Toast(error.response.data.detail.message)
					})
				} else {
					window.location.replace("https://id-dev.guzzu.cn/shoppingmall1/shopping-mall-login")
				}

			}
		},
		updateStoreCart() {
			let storeCart = this.storeCart.filter(item => this.checkedGoods.indexOf(item.id) === -1);
			if (storeCart.length) {
				this.$store.dispatch('setStoreCart', storeCart);
			} else {
				this.$store.dispatch('delStoreCart', this.storeCart[0].store);
			}
			this.checkedGoods = [];

		}
	}
};
</script>

<style lang="scss">
.navheader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000 !important;
  background: #fff;
  max-width: 600px;
  margin: 0 auto;
}
.checkall {
  padding: 10px;
  position: relative;
  .del {
    position: absolute;
    right: 10px;
    top: 10px;
    border-radius: 3px;
    padding: 0 3px;
    border: 1px solid #aaa;
  }
}
.card-goods {
  // padding: 10px 0;
  // margin-top: 52px;
  // margin-bottom: 105px;
  background-color: #eee;

  &__item {
    position: relative;
    background-color: #fff;
    margin-bottom: 1px;
    .van-checkbox__label {
      width: 100%;

      padding: 0 10px 0 15px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      .cart_del {
        // flex-basis: 50px;
        flex: 0 1 40px;
        line-height: 100px;
        text-align: center;
        color: #fff;
        background-color: #f44;
      }
      .van-card {
        background-color: #fff;
        flex: 1 0 0;
        .van-card__content {
          .van-card__row {
            .van-card__desc {
              white-space: normal;
            }
          }
        }
      }
    }

    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }

    .van-card__price {
      color: #f44;
    }
    .van-card__footer {
      .tabs {
        float: left;
        border: 1px solid #aaa;
        border-radius: 3px;
        span {
          float: left;
          text-align: center;
          width: 20px;
        }
        .num {
          width: 28px;
          border-left: 1px solid #aaa;
          border-right: 1px solid #aaa;
        }
      }
    }
  }
}
.submit {
  position: relative;
}
</style>
