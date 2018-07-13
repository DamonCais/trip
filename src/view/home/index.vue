<template>
    <div>
        <div class="home-search">
            <div class="home-input">
                <!-- <van-search placeholder="请输入商品名称" v-model="value" /> -->
                <input type="search">
            </div>
            <div class="home-icon">
                <van-icon name="wap-nav" />
            </div>
            <div class="home-icon">
                <van-icon name="contact" />
            </div>
        </div>
        <div class="home-tabbar">
            <div class="home-tab">
                <div>预定游艇</div>
                <div>预定管家</div>
            </div>
            <van-cell-group>
                <van-cell title="选择目的地" isLink>
                    <template>
                        <van-icon name="location" />
                        <span>三亚市</span>
                    </template>
                </van-cell>
                <van-cell title="请选择出游日期" to="/calender" is-link>
                    <template>
                        {{offTime|_formatTime}}
                        <span style="color:#aaa;">{{offTime|getDayByTime}}</span>
                    </template>
                </van-cell>
                <van-cell @click="show=true" title="请选择出游日期" is-link>
                    <template>
                        成人 {{adultNum}}
                        <span style="color:#aaa;">儿童 {{childrenNum}}</span>
                    </template>
                </van-cell>
            </van-cell-group>
            <div class="home-search">
                <van-button size="large">搜索</van-button>
            </div>
        </div>
        <div>
            <van-cell title="游艇管家" is-link value="更多" />
            <div class="home-guide">
                <div v-for="i in 10" :key="i" style="width:160px;display:inline-block;">
                    <card />
                </div>
            </div>
        </div>
        <div>
            <van-cell title="景区管家" is-link value="更多" />
            <div class="home-guide">
                <div v-for="i in 10" :key="i" style="width:160px;display:inline-block;">
                    <card />
                </div>
            </div>
        </div>
        <div style="clear:both;"></div>
        <van-popup v-model="show" position="bottom">
            <van-cell style="background:#eee;">
                <template slot="title">
                    <span>取消</span>
                </template>
                <template>
                    <span style="color:red;">完成</span>
                </template>
            </van-cell>
            <van-cell title="成人">
                <template>
                    <van-stepper :disable-input="true" v-model="adultNum" />
                </template>
            </van-cell>
            <van-cell title="儿童">
                <template>
                    <van-stepper :disable-input="true" :default-value="0" :min="0" v-model="childrenNum" />
                </template>
            </van-cell>
        </van-popup>
    </div>
</template>

<script>
import card from "./card";
export default {
  components: {
    card
  },
  data() {
    return {
      active: 0,
      show: false,
      adultNum: 1,
      childrenNum: 0
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
.home-search {
  height: 61px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .home-input {
    flex-grow: 1;
    padding: 0 10px;
    input {
      width: 100%;
      height: 30px;
      background-color: #f0f0f0;
      border: none;
      border-radius: 30px;
      background-image: url("http://m.dilidili.wang/dist/18may/images/search.png");
      background-repeat: no-repeat;
      background-position: left;
      background-size: 16px;
      padding-left: 32px;
      background-position: 12px;
      font-size: 16px;
    }
  }
  .home-icon {
    flex-basis: 50px;
    text-align: center;
    font-size: 16px;
  }
}
.home-tabbar {
  margin: 8px;
  border-radius: 5px;
  background: #eee;
  .home-tab {
    display: flex;
    // background: #eee;
    div {
      flex: 1;
      text-align: center;
      line-height: 45px;
    }
  }
}
.home-search {
  padding: 0 5px;
  .van-button--default {
    background: rgba(26, 188, 156, 1);
    color: #fff;
  }
}
.home-guide {
  width: 100%;
  display: inline;
  white-space: nowrap; /*规定段落中的文本不进行换行*/
  overflow-x: scroll; /*水平方向，超出部分添加滚动机制*/
  float: left; /*一定要设置左侧浮动*/
  overflow-y: hidden; /*竖直方向，超出部分隐藏*/
}
</style>
