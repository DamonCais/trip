<template>
    <div>
        <div class="yacht-img">
            <img width="100%" src="http://mp.jycais.cn/uploadDir/upload_77573ce4866f80ffbb0338097d2f0bc1.jpg" alt="">
            <span class="title"></span>
            <span class="sub"></span>
        </div>
        <van-cell-group>
            <van-cell is-link>
                <template slot="title">
                    <span style="color:red;font-size:20px;padding-right:15px;">5.0分</span>
                    <span style="padding-right:15px;">好评999条</span>
                    <span>差评0条</span>
                </template>
            </van-cell>
            <van-cell>
                <template slot="title">
                    <span style="padding-right:15px;">游艇位置</span>
                    <span style="color:#aaa;">海南省</span>
                </template>
            </van-cell>
        </van-cell-group>
        <div style="margin-top:20px;">
            <van-cell to="/calender" is-link>
                <template slot="title">
                    <span style="padding-right:15px;">出游时间</span>
                    <span>{{offTime|_formatTime('mmdd')}}{{offTime|getDayByTime}}</span>
                </template>
            </van-cell>
        </div>
        <div>
            <div @click="expand=!expand">
                <yacht-info :isExpand="expand" :isSub="false" />

            </div>
            <transition name="van-slide-bottom">
                <div v-show="expand">
                    <yacht-info />
                    <yacht-info />
                </div>

            </transition>

        </div>
        <van-collapse v-model="activeNames">
            <van-collapse-item name="1">
                <div slot="title">船上设施
                </div>
                <span v-for="i in 10" :key="i" class="yacht-facility ">设施{{i}}</span>
            </van-collapse-item>

        </van-collapse>

    </div>
</template>

<script>
import yachtInfo from "./yachtInfo";
export default {
  components: {
    yachtInfo
  },
  data() {
    return {
      activeNames: ["1"],
      expand: false
    };
  },
  filters: {
    getDayByTime(time) {
      var str = "周" + "日一二三四五六".charAt(new Date(time).getDay());
      return str;
    }
  }
};
</script>

<style lang="scss" scoped>
.yacht-facility {
  padding: 5px;
  color: #aaa;
  font-size: 12px;
}
</style>
