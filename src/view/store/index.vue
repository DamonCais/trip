<template>
	<div class="store">
		<van-nav-bar class="offheader" title="" left-arrow @click-left="goBack">
		</van-nav-bar>
		<img :src="storeLogo" alt="">
		<h4>{{storeName}}</h4>
		<van-list :immediate-check="false" v-model="loading" @load="onLoad" :finished="finished">
			<product :items="items" />
		</van-list>

	</div>
</template>

<script>
import { doPost, doGet } from '@/api/api'
import product from './product'
export default {
	mounted() {
		this.storeGet();
		this.productsGet();
	},
	data() {
		return {
			items: [],
			storeName: '',
			storeLogo: '',
			loading: false,
			finished: false,
			p: 0,
			onRefresh: true,
		}
	},
	methods: {
		storeGet() {
			doGet(`stores/${this.$route.params.id}`).then(res => {
				this.storeName = res.name;
				this.storeLogo = this._(res, 'logo.url') || 'https://s3.cn-north-1.amazonaws.com.cn/guzzu-cn-assets-1/images/29f8068f-f9e5-4c7e-934c-7c076e34a413-medium.jpg'
			})
		},
		productsGet() {
			console.log(this.p + '页面请求')
			doGet(`stores/${this.$route.params.id}/products`, { p: this.p }).then(res => {
				// this.items.push(...res);
				this.items = this.items.concat(res);
				if (!res.length) {
					this.finished = true;
				}
				this.loading = false;
			})
		},
		onLoad() {

			setTimeout(() => {
				this.p++;
				this.productsGet();

			}, 500);
		}
	},
	components: {
		product,
	}
}
</script>
<style lang="scss">
.offheader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: none;
  max-width: 600px;
  margin: 0 auto;
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
.store {
  text-align: center;
  margin-top: 50px;
  img {
    width: 50px;
    height: 50px;
  }
  h4 {
    margin: 10px 0;
  }
}
</style>
