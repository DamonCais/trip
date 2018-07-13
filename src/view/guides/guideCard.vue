<template>
    <div>
        <div class="van-hairline--top"></div>

        <div class="guide-item">
            <div class="guide-thumb">
                <div class="img" style="background-image: url('http://mp.jycais.cn/uploadDir/upload_aee0f15a1505803903e5e6b4a39a0e19.jpg');">
                </div>
            </div>
            <div class="guide-content">
                <div class="title">
                    管家姓名
                    <van-tag type="primary">游艇</van-tag>

                </div>
                <div class="sub">
                    <span>三亚市</span>
                    <span>评价99+</span>
                    <span>200单</span>
                </div>
                <div class="tag">
                    <van-tag plain type="danger">开朗</van-tag>
                    <van-tag plain type="danger">爱好摄影</van-tag>

                </div>
                <div class="desc">
                    自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍
                </div>
                <div class="price">
                    ￥468/3小时
                </div>
            </div>

        </div>
    </div>

</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.guide-item {
  display: flex;
  background: #fff;
  .guide-thumb {
    flex: 3;
    padding: 6px;

    .img {
      border-radius: 6px;
      // flex-basis: 50%;
      position: relative;
      //   height: 0;
      //   padding-bottom: 100%;
      height: 100%;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      img {
        width: 100%;
      }
    }
  }
  .guide-content {
    font-size: 14px;
    padding: 10px;
    flex: 5;
    div {
      padding: 2px;
    }
    .title {
      font-size: 18px;
      margin: 0;
    }
    .sub {
      display: flex;
      span {
        flex: 1;
        // text-align: center;
      }
    }
    .price {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
