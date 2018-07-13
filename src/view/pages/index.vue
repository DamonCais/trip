<template>
	<div class="page">

		<van-tabs @click="toPage" :active="active">
			<van-tab v-for="(tab,i) in tabs" :key="i" :title="tab.pageTitle">
			</van-tab>
		</van-tabs>
		<transition :name="transName">
			<router-view :key="$route.params.id"></router-view>
		</transition>

	</div>
</template>

<script>
import preview from '@/preview/index'
import { doPost, doGet } from '@/api/api'
export default {
	mounted() {
		this.tabsGet();
	},
	computed: {
		active() {
			let id = this.$route.path.replace(/\//g, " ").split(" ")[2];
			for (var index = 0; index < this.tabs.length; index++) {
				if (this.tabs[index]['_id'] === id) {
					return index;
				}
			}
			return 0;
		}
	},
	data() {
		return {
			value: '',
			tabs: [],
			// active: 0,
			page: {},
			shoppingMallPageId: '',
			transName: 'transleft'
		}
	},
	methods: {
		onSearch() {

		},
		tabsGet() {
			doGet(`shopping-malls/${this.shoppingmallId}/pages`).then(res => {
				this.tabs = res;
				// this.shoppingMallPageId = this.tabs[0]['_id']
				// this.$router.push({ path: '/home/' + this.shoppingMallPageId })
			})
		},
		toPage(index) {
			this.transName = this.active - index > 0 ? 'transright' : 'transleft';
			this.shoppingMallPageId = this.tabs[index]['_id'];
			this.page = [];
			this.$router.push({ path: '/pages/' + this.shoppingMallPageId })

		},
	},
	components: {
		preview
	}
}
</script>


<style lang="scss" scoped>
.page {
  position: relative;
  margin-top: 50px;
}
</style>
