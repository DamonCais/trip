<template>
  <div>
    <div class="guide-tabbar">
      <span @click="setTab(i)" v-for="(l,i) in tabList" :key="i" class="guide-tab" :class="{'guide-active':l.active}">{{l.text}}</span>
      <!-- <span class="guide-tab">景区管家</span>
      <span class="guide-tab">游艇管家</span>
      <span class="guide-tab guide-active">全部</span> -->
    </div>
    <div class="guide-list">
      <div v-for="i in 7" :key="i" @click="toUrl('/guides/'+i)">
        <guide-card />

      </div>
    </div>
    <div class="guide-footbar">
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
          <span>重置</span>
        </template>
        <template>
          <span style="color:red;">完成</span>
        </template>
      </van-cell>
      <div class="guide-filter">
        <p>性别</p>
        <div>
          <van-button class="guide-btn" size="small">女</van-button>
          <van-button class="guide-btn" size="small">男</van-button>
        </div>
        <p>语言</p>
        <div>
          <van-button size="small">中文</van-button>
          <van-button size="small">英文</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import guideCard from "./guideCard";
export default {
  data() {
    return {
      tabList: [
        { text: "游艇管家", active: true },
        { text: "景区管家", active: false },
        { text: "全部", active: false }
      ],
      suggestShow: false,
      filterShow: false,
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
    guideCard
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
  }
};
</script>

<style lang="scss" scoped>
.guide-tabbar {
  position: fixed;
  z-index: 2000;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  background: #fff;
  .guide-tab {
    flex: 1;
    border-right: 1px solid #eee;
    text-align: center;
    line-height: 37px;
    color: rgba(26, 188, 156, 1);
    &:last-child {
      border: none;
    }
  }

  .guide-active {
    background: rgba(26, 188, 156, 1);
    color: #fff;
  }
}
.guide-footbar {
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
.guide-list {
  margin: 50px 0 80px;
}
.guide-filter {
  padding: 0 10px;
  p {
    margin: 5px;
  }
  .guide-btn {
    width: 80px;
  }
}
</style>
