<template>
    <div class="guide-card">
        <div class="img" style="background-image: url('http://mp.jycais.cn/uploadDir/upload_aee0f15a1505803903e5e6b4a39a0e19.jpg');">
        </div>
        <div>
            <span class="info-name">徐梦圆</span>
            <span style="float:right;vertical-align middle;">
                <van-tag plain type="success">爱好摄影</van-tag>
                <van-tag plain type="success">开朗</van-tag>
            </span>
        </div>
        <div class="info">
            <span>订单208</span>
            <span>评价26</span>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.guide-card {
  background: #eee;
  width: 100%;
  font-size: 14px;
  //   padding: 3px;
  box-sizing: border-box;
  padding: 3px;
  .img {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    // flex-basis: 50%;
    position: relative;
    height: 0;
    padding-bottom: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    img {
      width: 100%;
    }
  }
  .info-name {
    line-height: 20px;
    // padding: 0 5px;
  }
  .info {
    display: flex;
    justify-content: space-around;
    clear: both;
    margin-top: 10px;
    span {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
