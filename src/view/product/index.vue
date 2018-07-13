<template>
	<div>
		<van-nav-bar :class="{'offheader':!offTop}" class="header" :title="!offTop?'':'商品详情'" left-arrow @click-left="goBack" @click-right="goHome">
			<van-icon name="home" slot="right" />
		</van-nav-bar>
		<div class="img" :style="'background-image:url('+_(product,'image.url')+')'">
		</div>
		<div class="info">
			<h5>{{product.name}}</h5>
			<h5>{{product.tagline}}</h5>
			<!-- <h4>￥{{product.price/100}}</h4> -->
			<h4>￥{{product|minPriceGet}}</h4>
		</div>
		<div class="store">
			<router-link :to="`/stores/${store._id}`" tag="div">
				<span>{{store.name}}</span>
				<span> </span>
				<img :src="_(store,'logo.url')" alt="">
			</router-link>
		</div>
		<van-cell :title="'已选:'+selTitle" @click="showSku">
			<template>
				<span style="color:#aaa;font-size:16px;font-weight:1000;">. . .</span>
			</template>
		</van-cell>
		<h4 :class="{'offTop':offTop}" ref="desc" class="cell">详情</h4>
		<!-- <div class="description" :class="{'offDesc':offTop}" v-html="_(product,'description.en')"></div> -->
		<div class="description" :class="{'offDesc':offTop}" v-html="_(product,'description')"></div>

		<!-- sku -->
		<guzzu-sku @addToCart="skuAddToCart" @buyNow="skuBuyNow" ref="sku" v-if="product._id" :product="product" />

		<van-goods-action class="action">
			<van-goods-action-mini-btn icon="chat" text="收藏" @click="addCollection" />
			<van-goods-action-mini-btn icon="cart" text="购物车" @click="goCart" />
			<van-goods-action-big-btn text="加入购物车" @click="showSku" />
			<van-goods-action-big-btn text="立即购买" @click="showSku" primary />
		</van-goods-action>
	</div>
</template>

<script>
import { doPost, doGet } from '@/api/api'
import guzzuSku from '@/component/guzzuSku'

export default {
	mounted() {
		window.addEventListener("scroll", this.handleFun);
		this.productGet();
		this.$nextTick(() => {
			this.descTop = this.$refs.desc.offsetTop
		})
	},

	beforeDestroy() {
		window.removeEventListener("scroll", this.handleFun)
	},
	computed: {
	},
	data() {
		return {
			product: {},
			store: {},
			offTop: false,
			descTop: 0,
			selTitle: ''
		}
	},
	methods: {

		showSku() {
			this.$refs.sku.showSku();
		},
		addCollection() {

		},
		goCart() {
			this.$router.push({ path: '/carts' })
		},
		addToCart() {

		},
		buyNow() {

		},
		skuAddToCart(data) {
			if (data.goodsId !== data.id) {
				this.selTitle = this.product.productOptions.filter(o => o._id === data.id)[0].name + '  ' + data.num;
			} else {
				this.selTitle = this.product.title + '  ' + data.num;
			}
		},
		skuBuyNow(data) {
			console.log(data);
		},
		productGet() {
			doGet(`/products/${this.$route.params.id}`).then(res => {
				this.product = res;
				this.store._id = res.store;
				this.storeGet();
			})
		},
		storeGet() {
			doGet(`/stores/${this.store._id}`).then(res => {
				this.store = res;
			})
		},
		handleFun() {

			let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
			if (this.descTop - 23 < scrollTop) {
				this.offTop = true;
			} else {
				this.offTop = false;
			}
		},
	},
	filters: {
		minPriceGet(product) {
			if (product.productOptions && product.productOptions.length) {
				let min = product.productOptions[0].price
				product.productOptions.forEach(element => {
					min = element.price < min ? element.price : min;
				});
				return min / 100 + ' 起';
			} else {
				return product.price / 100;
			}

		},
	},
	watch: {

	},
	components: {
		guzzuSku,
	}
}
</script>
<style lang="scss">
.offheader {
  background: none;
  .van-nav-bar__left {
    i {
      color: #fff;
      background: #aaa;
      border-radius: 50%;
      padding: 5px;
    }
  }
  .van-nav-bar__right {
    i {
      color: #fff;
      background: #aaa;
      border-radius: 50%;
      padding: 5px;
    }
  }
  &:after {
    border: none;
  }
  // opacity: 0.1;
}
</style>

<style lang="scss" scoped>
.description {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-weight: normal;
    font-style: normal;
    font-size: 100%;
    font-family: inherit;
    vertical-align: baseline;
  }
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 600px;
  margin: 0 auto;
}
.img {
  position: relative;
  height: 0;
  padding-bottom: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.info {
  padding: 10px;
  background: #fff;
  margin: 1px 0;
  h5 {
    font-family: "Helvetica Neue", STHeiTi, sans-serif;
    font-size: 16px;
    color: rgb(51, 51, 51);
    line-height: 22px;
  }
  h4 {
    word-wrap: break-word;
    font-family: Avenir-Roman;
    font-size: 20px;
    color: rgb(204, 54, 60);
    line-height: 28.8px;
  }
}
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
}
.cell {
  text-align: center;
  line-height: 40px;
  margin: 1px 0;
  background: #fff;
}
.offTop {
  position: fixed;
  top: 45px;
  left: 0;
  right: 0;
  max-width: 600px;
  margin: 0 auto;
}

.offDesc {
  margin-top: 40px;
}
.action {
  max-width: 600px;
  margin: 0 auto;
}
</style>
<style lang="scss">
.description {
  width: 100%;
  padding: 1px;
  overflow: hidden;
  box-sizing: border-box;
  background: #fff;
  margin: 1px 0 51px;

  p {
    img {
      max-width: 100%;
    }
  }
}
</style>

