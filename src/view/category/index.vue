<template>
	<div class="category">

		<!-- <van-list class="nav">
			<van-cell @click="toCategory(c._id)" :class="{'active':c._id===$route.params.id}" v-for="c in categorys" :key="c._id" :title="c.name" />
		</van-list> -->
		<ul class="nav">
			<li @click="toCategory(index)" :class="{'active':c._id===$route.params.id}" v-for="(c,index) in categorys" :key="c._id" :title="c.name">
				{{c.name}}
			</li>
		</ul>
		<div class="list">
			<transition :name="transName">
				<router-view :key="$route.params.id"></router-view>
			</transition>
		</div>
	</div>
</template>

<script>
import { doPost, doGet } from '@/api/api'
export default {
	mounted() {
		this.categorysGet();

	},
	data() {
		return {
			categorys: [],
			currentIndex: 0,
			transName: 'transTop'
		}
	},
	methods: {
		categorysGet() {
			doGet(`shopping-malls/${this.shoppingmallId}/categories`).then(res => {
				this.categorys = res;
				let stores = {
					name: 'stores',
					_id: 'stores',
				};
				this.categorys.push(stores);
				if (!this.$route.params.id) {
					this.toCategory(0)
				}
			})
		},
		toCategory(index) {
			this.transName = this.currentIndex > index ? 'transTop' : 'transBottom';
			this.currentIndex = index;
			this.$router.push({ path: '/categories/' + this.categorys[index]._id })
		}
	}
}
</script>

<style lang="scss" scoped>
.category {
  position: fixed;
  top: 50px;
  bottom: 50px;
  left: 0;
  right: 0;
  background: #fff;
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  .nav {
    flex-basis: 100px;
    height: 100%;
    overflow-y: scroll;
    cursor: pointer;
    border-right: 1px solid #eee;
    li {
      height: 30px;
      padding: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .active {
      background: #ddd;
    }
  }
  .list {
    flex: 1;
    height: 100%;
    overflow-y: scroll;
    position: relative;
    div {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      min-height: 100%;
    }
  }
}
</style>