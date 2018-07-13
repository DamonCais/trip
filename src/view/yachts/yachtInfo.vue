<template>
    <div class="yacht-info" :style="{background:isSub?'':'#fff'}">
        <div v-show="!isSub" class="logo">
            <img src="http://mp.jycais.cn/uploadDir/upload_77573ce4866f80ffbb0338097d2f0bc1.jpg" alt="">
        </div>
        <div :style="{'flex-grow':(isSub?2:1)}" class="store">
            <p>蓝骑士游艇</p>
            <p>62尺 市区接送</p>
        </div>
        <div class="price">
            ￥468起
        </div>
        <div v-if="isSub" class="order">
            <p>在线</p>
            <p>预定</p>
        </div>
        <div v-else class="icon">
            <van-icon name="upgrade" :class="{'collapse':!isExpand}" />
        </div>
    </div>
</template>

<script>
export default {
  props: {
    isSub: {
      type: Boolean,
      default: true
    },
    isExpand: {
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
.yacht-info {
  display: flex;
  align-items: center;
  font-size: 14px;

  padding: 0 10px;
  .logo {
    flex: 1;

    img {
      width: 100%;
      height: 70px;
    }
  }
  .store {
    p {
      margin: 0;
      padding: 5px;
      box-sizing: border-box;
      &:first-child {
        font-size: 18px;
      }
    }
  }
  .price {
    flex: 1;
    color: red;
    font-size: 14px;
  }
  .order {
    flex-basis: 40px;
    background: red;
    border-radius: 10px;
    color: #fff;
    height: 40px;
    p {
      margin: 0;
      line-height: 20px;
      text-align: center;
    }
  }
  .icon {
    flex-basis: 40px;

    font-size: 20px;
    color: red;
    .collapse {
      transform: rotate(180deg);
      transition: all 1s;
    }
  }
}
</style>
