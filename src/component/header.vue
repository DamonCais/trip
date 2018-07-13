<template>
	<div class="header">
		<van-search v-model="value" show-action @search="onSearch">
			<div slot="action" @click="onSearch">搜索</div>
		</van-search>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: '',
		}
	},
	methods: {
		onSearch() {

		}
	}
}
</script>
<style lang="scss">
.header {
  .van-search__action {
    padding: 5px;
  }
  .van-search--show-action {
    padding-right: 5px;
  }
}
</style>
<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #aaa;
  max-width: 600px;
  margin: 0 auto;
}
</style>
