<template>
	<div>
		<van-nav-bar class="navheader" :title="$t('CARTS_TITLE')" :left-text="$t('NAV_BACK')" :right-text="onEdit?$t('CARTS_FINISH'):$t('CARTS_EDIT')" left-arrow @click-left="goBack" @click-right="setEdit" />

		<div style="margin-top:50px;" v-if="cartNum">
			<div style="margin-bottom:10px;" v-for="(storeCart,i) in shoppingCart" :key="i">
				<store-cart v-if="storeCart.length" :storeCart="storeCart" :onEdit="onEdit" />
			</div>
		</div>
		<div v-else style="margin:80px 30px;text-align:center;font-size:18px;">
			购物车空空如也~
		</div>
	</div>
</template>

<script>
import { Toast } from "vant";
import storeCart from './storeCart'
export default {
	components: {
		storeCart
	},

	data() {
		return {
			checkedGoods: [],
			onEdit: false,
		};
	},

	computed: {
		submitBarText() {

			const count = this.checkedGoods.length;
			if (this.onEdit) {
				return '删除' + (count ? `(${count})` : '');
			}
			return '结算' + (count ? `(${count})` : '');
		},
		cartNum() {
			let total = 0;
			for (var key in this.shoppingCart) {
				total += this.shoppingCart[key].length;
			}
			return total
		},

		checkAll: {
			set(val) {
				let arr = [];
				if (val) {
					this.shoppingCart.forEach(element => {
						arr.push(element.id);
					});
				}
				this.checkedGoods = arr;
			},
			get() { return this.shoppingCart.length === this.checkedGoods.length && this.shoppingCart.length > 0 }
		}
	},

	methods: {

		setEdit() {
			this.onEdit = !this.onEdit;
			if (this.onEdit) {
				this.$store.dispatch('setShoppingCart', this.shoppingCart);
			}
		},
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
    margin-bottom: 3px;
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
