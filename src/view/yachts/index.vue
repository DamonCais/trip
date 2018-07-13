<template>
  <div>
    <!-- 顶部popup -->
    <van-popup v-model="addressShow" position="top">
      <van-cell>
        <template slot="title">
          <span>当前城市</span>
          <span style="color:#1ABC9C;padding-left:20px;">三亚</span>
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <span>热门区域</span>
          <van-tag style="margin-left:20px;" type="danger">HOT</van-tag>
        </template>
      </van-cell>
      <div class="yacht-ports">
        <div v-for="i in 6" :key="i" class="yacht-port">
          <van-button size="small">陈独秀码头</van-button>
        </div>
        <div class="yacht-port">
          <van-button size="small">真爱你码头</van-button>
        </div>
      </div>
    </van-popup>
    <div class="yacht-tabbar">
      <span class="yacht-tab">
        重新定位
        <van-icon name="location" />
      </span>
      <span @click="addressShow=true" class="yacht-tab">三亚市
        <van-icon name="wap-nav" />
      </span>
      <span @click="toUrl('/calender')" class="yacht-tab"> {{offTime|_formatTime('mmdd')}}
        <span style="color:#aaa;">{{offTime|getDayByTime}}</span>
        <van-icon name="gift" />
      </span>
    </div>
    <div class="yacht-list">
      <div v-for="i in 7" :key="i" @click="toUrl('/yachts/'+i)">
        <yachts-card />

      </div>

    </div>
    <div class="yacht-footbar">
      <span @click="suggestShow=true">推荐排序
        <van-icon name="arrow arrow-down" />
      </span>
      <span @click="filterShow=true">特色筛选
        <van-icon name="arrow arrow-down" />
      </span>
    </div>
    <van-popup v-model="suggestShow" position="bottom">
      <van-cell @click="setSuggest(i)" v-for="(l,i) in suggestList" :key="i">
        <template slot="title">
          <div :style="{color: l.active?'red':'#333'}">
            <van-icon :style="{opacity: l.active?1:0}" name="success" />
            <span>{{l.text}}</span>
          </div>
        </template>
      </van-cell>
    </van-popup>
    <van-popup v-model="filterShow" position="bottom">
      <van-cell style="background:#eee;">
        <template slot="title">
          <span>清空</span>
        </template>
        <template>
          <span style="color:red;">完成</span>
        </template>
      </van-cell>
      <div class="yacht-filter">
        <p>尺寸筛选</p>
        <div>
          <van-button class="yacht-btn" size="small">36尺以下(小型)</van-button>
          <van-button class="yacht-btn" size="small">30尺-60尺(中型)</van-button>
        </div>
        <p>尺寸价格</p>
        <div>
          <van-button size="small">1500以下</van-button>
          <van-button size="small">1500-3000</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import yachtsCard from "./yachtsCard";
export default {
  data() {
    return {
      tabList: [
        { text: "重新定位", active: true },
        { text: "三亚市", active: false },
        { text: "05.22 周二", active: false }
      ],
      suggestShow: false,
      filterShow: false,
      addressShow: false,
      suggestList: [
        { text: "推荐排序", active: true },
        { text: "好评优先", active: false },
        { text: "低价优先", active: false },
        { text: "距离优先", active: false },
        { text: "高价优先", active: false }
      ]
    };
  },
  components: {
    yachtsCard
  },
  methods: {
    setSuggest(i) {
      this.suggestList.forEach(element => {
        element.active = false;
      });
      this.suggestList[i].active = true;
    },
    setTab(i) {
      this.tabList.forEach(element => {
        element.active = false;
      });
      this.tabList[i].active = true;
    }
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
.yacht-tabbar {
  position: fixed;
  z-index: 2000;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  color: #999;
  align-items: center;
  .yacht-tab {
    // flex: 1;
    // border-right: 1px solid #eee;
    // text-align: center;
    line-height: 27px;
    position: relative;
    i {
      top: 2px;
    }
  }

  &:last-child {
    border: none;
  }

  // .yacht-active {
  //   background: rgba(26, 188, 156, 1);
  //   color: #fff;
  // }
}
.yacht-footbar {
  position: fixed;
  z-index: 2000;
  bottom: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  background: #fff;
  line-height: 31px;
  align-items: center;

  span {
    flex: 1;
    border-right: 1px solid #eee;
    text-align: center;
    line-height: 37px;
    &:last-child {
      border: none;
    }
    .arrow-down {
      transform: rotate(90deg);
    }
  }
}
.yacht-list {
  margin: 50px 0 80px;
}
.yacht-filter {
  padding: 0 10px;
  p {
    margin: 5px;
  }
  .yacht-btn {
    // width: 80px;
  }
}
.yacht-ports {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  .yacht-port {
    flex-basis: 33%;
    padding: 5px 10px;
    box-sizing: border-box;
  }
}
</style>
