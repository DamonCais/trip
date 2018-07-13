<template>
	<div>
		<component :block="block" v-bind:is="block.type|titlefilter"></component>
	</div>
</template>

<script>
import cell from './cell'
import swiper from './swiper'
import spacer from './spacer'
import navgroup from './navgroup'
import celltitle from './title'
import product from './product'


export default {
	mounted() {
	},
	props: {
		block: {
			type: Object,
		}
	},
	components: {
		cell,
		banner: swiper,
		spacer,
		navgroup,
		celltitle,
		productgroup: product
	},
	filters: {
		titlefilter(val) {
			if (val === 'title') {
				return 'celltitle'
			}
			return val;
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
