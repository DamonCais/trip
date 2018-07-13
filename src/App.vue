<template>
  <div id="app">
    <!-- <Header v-if="!$route.meta.noHeader" /> -->
    <div class="section">

      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>

    <Footer v-if="!$route.meta.noFooter"></Footer>
  </div>
</template>

<script>
import Footer from "@/component/footer";
import Header from "@/component/header";
export default {
  components: {
    Footer,
    Header
  },
  mounted() {
    this.$i18n.locale = this.language;
  }
};
</script>


<style>
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}
</style>
<style lang="scss" scoped>
.section {
  // margin-bottom: 50px;
  max-width: 600px;
  margin: 0 auto 50px;
}
</style>

