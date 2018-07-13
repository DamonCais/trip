<template>
	<div class="contain">
		<div v-for="(b,i) in page.blocks" :key="i">
			<preview :block="b" />
		</div>
	</div>
</template>

<script>
import preview from '@/preview/index'
import { doPost, doGet } from '@/api/api'
export default {
	mounted() {
		this.pageGet();
	},
	data() {
		return {
			value: '',
			tabs: [],
			active: 0,
			page: {},
			shoppingMallPageId: '',
		}
	},
	methods: {
		pageGet() {
			this.page = {};

			doGet(`shopping-malls/${this.shoppingmallId}/pages/${this.$route.params.id}`).then(res => {
				this.page = res;
			})
		}
	},
	components: {
		preview
	},
	watch: {
	}
}
</script>

<style lang="scss" scoped>
.contain {
  position: absolute;
  top: 50px;
  right: 0;
  left: 0;
  margin-bottom: 50px;
}
</style>
