<template>
    <div>
        <div class="guide-img">
            <img width="100%" src="http://mp.jycais.cn/uploadDir/upload_77573ce4866f80ffbb0338097d2f0bc1.jpg" alt="">
            <span class="title"></span>
            <span class="sub"></span>
        </div>
        <van-cell-group>
            <van-cell is-link>
                <template slot="title">
                    <span style="color:red;font-size:20px;padding-right:15px;">5.0分</span>
                    <span style="padding-right:15px;">好评999条</span>
                    <span>差评200条</span>
                </template>
            </van-cell>

        </van-cell-group>
        <guide-info title="我的相册">
            <div class="guide-imgs">
                <div v-for="i in 10" :key="i" style="width:120px;display:inline-block;">
                    <card />
                </div>
            </div>
        </guide-info>
        <div style="  clear: both;">

        </div>

        <guide-info title="服务内容">
            <p style="font-size:12px;color:#999;margin:5px 0;">我是三亚学院的学生</p>
        </guide-info>
        <guide-info title="特别提醒">
            <p style="font-size:12px;color:#999;margin:5px 0;">我是三亚学院的学生</p>
        </guide-info>
        <guide-info title="费用明细">
            <p style="font-size:12px;color:#999;margin:5px 0;">我是三亚学院的学生</p>
        </guide-info>
    </div>
</template>

<script>
import guideInfo from "./guideInfo";
import card from "./card";
export default {
  components: {
    guideInfo,
    card
  }
};
</script>

<style lang="scss" scoped>
.guide-imgs {
  width: 100%;
  display: inline;
  white-space: nowrap; /*规定段落中的文本不进行换行*/
  overflow-x: scroll; /*水平方向，超出部分添加滚动机制*/
  float: left; /*一定要设置左侧浮动*/
  overflow-y: hidden; /*竖直方向，超出部分隐藏*/
}
</style>
