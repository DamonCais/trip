<template>
  <div>
    <div class="van-hairline--top"></div>

    <div class="yacht-item">
      <div class="yacht-thumb">
        <div class="img" style="background-image: url('http://mp.jycais.cn/uploadDir/upload_aae4bd6840b83a14ce909ebc34031487.jpg');">
        </div>
      </div>
      <div class="yacht-content">
        <div class="title">
          杰鹏游艇
          <van-tag mark type="danger">评分5.0</van-tag>

        </div>
        <div class="sub">
          <span>46尺</span>
          <span>3小时起</span>
          <span>核载12人</span>
        </div>

        <div class="price">
          <span>评价99+</span>
          <span>￥468起</span>

        </div>
      </div>

    </div>
  </div>

</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.yacht-item {
  display: flex;
  background: #fff;
  .yacht-thumb {
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
  .yacht-content {
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
      justify-content: space-between;
    }
  }
}
</style>
