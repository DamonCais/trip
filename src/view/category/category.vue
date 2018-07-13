<template>
	<div>
		<div v-if="showProduct" class="contain">
			<div class="img" :style="'background-image:url('+_(category,'image.url')+')'"></div>
			<h4>{{_(category,'name')}}</h4>
			<div v-if="showProduct" class="list">
				<div class="item" v-for="(item,index) in category.products" :key="index">
					<router-link tag="div" :to="'/products/'+item._id">
						<div class="box">
							<div class="img" :style="'background-image:url('+_(item,'image.url')+')'"></div>
						</div>
						<div class="info">
							<h5 class="title">{{_(item,'name')}}</h5>
							<h6 class="price">￥{{item.price/100}}</h6>
						</div>
					</router-link>
				</div>
			</div>
		</div>
		<div v-else class="contain">
			<div class="img" :style="'background-image:url('+_(stores,'image')+')'"></div>
			<h4>{{_(stores,'name')}}</h4>
			<div class="list">
				<div class="item" v-for="(item,index) in stores.store" :key="index">
					<router-link tag="div" :to="'/stores/'+item._id">
						<div class="box">
							<div class="img" :style="'background-image:url('+_(item,'logo.url')+')'"></div>
						</div>
						<div class="info">
							<h5 class="title">{{_(item,'name')}}</h5>
						</div>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { doPost, doGet } from '@/api/api'

export default {
	mounted() {
		if (this.$route.params.id === 'stores') {
			this.storesGet();
			return;
		}
		this.categoryGet();
	},
	data() {
		return {
			category: {},
			products: [],
			showProduct: true,
			stores: {
				image: 'https://s3.cn-north-1.amazonaws.com.cn/guzzu-cn-assets-1/images/7a5654e9-4222-4c7d-b68a-970bee938376-medium.jpg',
				name: 'GUZZU STORES',
				store: [],
			}
		}
	},
	methods: {
		categoryGet() {
			this.showProduct = true;
			doGet(`shopping-malls/${this.shoppingmallId}/categories/${this.$route.params.id}`).then(res => {
				this.category = res;
			})
		},
		storesGet() {
			this.showProduct = false;
			doGet(`shopping-malls/${this.shoppingmallId}/stores`).then(res => {
				this.stores.store = res;
			})
		},
		onclick() {
			console.log('----')
		}
	},
	components: {
	},

}
</script>

<style lang="scss" scoped>
.contain {
  text-align: center;
  min-height: 100%;
  .img {
    height: 180px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
  h4 {
    margin: 10px 0;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      flex-basis: 33%;
      box-sizing: border-box;
      .box {
        padding: 5px;
      }
      .img {
        height: 0;
        padding-bottom: 100%;

        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
      .info {
        font-size: 14px;
        .title {
          line-height: 15px;
          min-height: 30px;
          max-height: 30px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          // overflow: hidden;
          word-wrap: break-word;
        }
        .price {
          margin-top: 5px;
          color: red;
        }
      }
    }
  }
}
</style>
