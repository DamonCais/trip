<template>
	<div>
		<van-swipe :autoplay="3000">
			<van-swipe-item v-for="(item, index) in block.items" :key="index">
				<div @click="toPageByLink(item)" class="img" :style="'background-image:url('+_(item,'image.url')+')'">
					<img :src="block.items[0].image.url" alt="" style="opacity: 0;">
				</div>
			</van-swipe-item>
		</van-swipe>
	</div>
</template>

<script>
export default {
	props: {
		block: {
			type: Object,
		}
	},
	methods: {
		toPage(item) {
			this.$router.push({ path: `/${item.linkType === 'category' ? 'categories' : item.linkType + 's'}/${item[item.linkType]}` })
		}
	}
}
</script>

<style lang="scss" scoped>
.img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  img {
    width: 100%;
  }
}
</style>

