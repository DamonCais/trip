<template lang="html">
    <section class="guide-info" >
        <h4>{{ title }}</h4>
        <slot/>
    </section>
</template>


<script>
export default {
  props: {
    title: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.guide-info {
  background: white;
  padding: 10px;
  h4 {
    margin: 0;
    font-weight: 400;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: #333;
    font-size: 14px;
  }
}
</style>
