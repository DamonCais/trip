<template>
	<div>
		<van-cell @click="toPageByLink(block.items[0])" :title="block.items[0].title" :is-link="block.items[0].linkType&&true" :label="block.items[0].subtitle" />
	</div>

</template>

<script>
export default {
	props: {
		block: {
			type: Object,
		},
	},
	computed: {
	},
	methods: {
		toPage(item) {
			if (!item.linkType) {
				return;
			}
			this.$router.push({ path: `/${item.linkType === 'category' ? 'categories' : item.linkType + 's'}/${item[item.linkType]}` })
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./breakword.scss";
.title {
  padding: 10px 20px 10px 10px;
  min-height: 30px;
  position: relative;
  h4 {
    font-weight: 500;
    line-height: 18px;
    height: 18px;
    @include breakword($line:1);
  }
  h5 {
    color: #aaa;
    font-size: 14px;
    line-height: 18px;
    min-height: 18px;
    max-height: 36px;
    @include breakword($line:2);
  }
  .link {
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    right: 10px;
    display: flex; /*Flex布局*/
    align-items: center; /*指定垂直居中*/
  }
}
</style>
