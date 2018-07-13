<template>
  <div class="calender">
    <div class="calender-wraper" v-show="showCalender">
      <div class="calender-mask" @click.stop.prevent="toggle"></div>
      <div class="calender-content">
        <ul class="weekday">
          <li class="weekend">日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li class="weekend">六</li>
        </ul>
        <div class="area" ref="scroll">
          <ul class="date">
            <li class="date-item" v-for="(item, index) in date" :key="index" :data-date="item.month">
              <h6>{{item.month}}</h6>
              <ol class="date-day">
                <li v-for="(dateItem, dateIndex) in item.dateList" :data-time="dateItem.time" :data-disabled="dateItem.disabled" :key="dateIndex" :class="{
                    weekend: dateIndex % 7 === 0 || dateIndex % 7 === 6,
                    past: dateItem.disabled === 'disabled',
                    start: startTime === dateItem.time,
                    end: endTime === dateItem.time,
                    between: dateItem.time > startTime && dateItem.time < endTime
                  }" @click="handleClick">{{dateItem.text}}</li>
              </ol>
            </li>
          </ul>
          <div style="height:80px;"></div>
          <h6 class="fixed-title" v-show="showFixedTitle" ref="fixed">{{fixedTitle}}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const h = 28;
export default {
  data() {
    return {
      showCalender: true,
      startTime: -1,
      endTime: -1,
      maxDay: 12,
      date: [],
      heightArr: [],
      showFixedTitle: false,
      curIndex: 0,
      diff: -1,
      scroll: null,
      fixed: null
    };
  },
  mounted() {
    this.getAllDay();
    this.fixed = this.$refs.fixed;
  },
  watch: {},
  computed: {
    fixedTitle() {
      return this.date[this.curIndex] ? this.date[this.curIndex].month : "";
    }
  },
  methods: {
    initScroll() {
      if (!this.$refs.scroll) {
        return;
      }
      this.$nextTick(() => {
        this.scroll && this.scroll.refresh();
        // 存每个li的offsetTop 到数组
        this.heightArr = [];
        const aLi = document.querySelectorAll(".date-item");
        for (let i = 0; i < aLi.length; i++) {
          const offsetTop = aLi[i].offsetTop;
          this.heightArr.push(offsetTop);
        }
        this.handleScroll();
      });
    },
    handleScroll() {},
    handleClick(e) {
      // 空白和过期的不能点击
      const dataset = e.target.dataset;
      if (dataset.disabled === "disabled") {
        return;
      }
      const time = dataset.time * 1;
      this.startTime = time;
      console.log(time);
      console.log(new Date(time));
      this.$store.dispatch("setOffTime", time);
    },
    toggle() {
      this.showCalender = !this.showCalender;
    },
    // 创建一个月的日历
    getDay(j) {
      let oDate = new Date();

      oDate.setMonth(oDate.getMonth() + j);
      const year = oDate.getFullYear();
      const month = oDate.getMonth();
      // 设置到下个月第一天会自动跑到上个月的最后一天
      oDate.setMonth(month + 1, 0);
      // 当月总共有多少天
      const totalDay = oDate.getDate();
      // 当月最后一天是星期几
      const endDay = oDate.getDay();
      // 设置到当月的第一天求第一天是星期几
      oDate.setDate(1);
      // 第一天是星期几
      const startDay = oDate.getDay();
      let dateList = [];
      // 日期
      for (let i = 1; i <= totalDay; i++) {
        let time = new Date();
        time.setFullYear(year, month, i);
        if (time.getTime() < new Date().getTime()) {
          dateList.push({
            text: i,
            time: time.getTime(),
            disabled: "disabled"
          });
        } else {
          dateList.push({
            text: i,
            time: time.getTime(),
            disabled: "undisabled"
          });
        }
      }
      // 补前面空白
      for (let i = 0; i < startDay; i++) {
        dateList.unshift({ text: "", time: 0, disabled: "disabled" });
      }
      // 补后面空白
      for (let i = 1; i < 7 - endDay; i++) {
        dateList.push({ text: "", time: 0, disabled: "disabled" });
      }
      this.date.push({
        month: `${year}-${this.toDub(month + 1)}`,
        dateList: dateList
      });
    },
    // 创建一年的日历
    getAllDay() {
      for (let i = 0; i < 12; i++) {
        this.getDay(i);
      }
      let arr = this.date[0].dateList.filter(
        time => time.disabled === "undisabled"
      );
      arr[0].text = "今天";
      if (arr.length >= 2) {
        this.startTime = arr[1].time;
      } else {
        this.startTime = this.date[0].dateList.filter(
          time => time.disabled === "undisabled"
        )[0];
      }
      console.log(this.date);
    },
    toDub(n) {
      return n >= 10 ? "" + n : "0" + n;
    }
  }
};
</script>

<style lang="less">
@bg-color: #f9f9f9;
@bg-title-color: #f5f5f5;
@base-color: #ff9b38;
@border-color: #e3e3e3;
@past-color: #cbcbcb;
@between-color: #ffe8d2;
.fade-enter-active,
.fade-leave-active {
  transition: 0.4s all ease;
  .calender-content,
  .calender-mask {
    transition: 0.4s all ease;
  }
}
.fade-enter,
.fade-leave-to {
  .calender-content {
    transform: translate3d(0, 100%, 0);
  }
  .calender-mask {
    background: rgba(0, 0, 0, 0);
  }
}
.fade-enter-to {
  .calender-content {
    transform: translate3d(0, 0, 0);
  }
  .calender-mask {
    background: rgba(0, 0, 0, 0.5);
  }
}
.calender {
  @diff: 2rem;
  width: 100vw;
  // height: calc(~"100vh - @{diff}");
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .btn {
    height: 2.5rem;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.7rem;
    padding: 0 0.7rem;
    &:after {
      display: block;
      content: "";
      width: 0.5rem;
      height: 0.5rem;
      border-top: 1px solid #ccc;
      border-right: 1px solid #ccc;
      transform: rotate(45deg);
    }
  }
  &-wraper {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
  }
  &-mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  &-content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    // height: 20rem;
    background: #fff;
  }
  .weekday {
    background: @bg-color;
    display: flex;
    > li {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2rem;
      font-size: 0.6rem;
      color: #333;
      &.weekend {
        color: @base-color;
      }
    }
  }
  .area {
    @diff: 2rem;
    position: relative;
    // height: 18rem;
    height: 100%;
    overflow-y: auto;

    -webkit-overflow-scrolling: touch;
    .fixed-title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 28px;
      background: @bg-title-color;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.6rem;
      border-bottom: 1px solid @border-color;
    }
  }
  .date {
    &-item {
      h6 {
        height: 28px;
        background: @bg-title-color;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.6rem;
        border-bottom: 1px solid @border-color;
        margin: 0;
      }
    }
    &-day {
      width: 100vw;
      display: flex;
      flex-wrap: wrap;
      > li {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2rem;
        width: calc(100vw / 7);
        font-size: 0.9rem;
        border-bottom: 1px solid @border-color;
        &.weekend {
          color: @base-color;
        }
        &.past {
          color: @past-color;
        }
        &.start,
        &.end {
          background: @base-color;
          color: #fff;
        }
        &.start {
          // border-radius: 2rem 0 0 2rem;
        }
        &.end {
          border-radius: 0 2rem 2rem 0;
        }
        &.between {
          background: @between-color;
          color: @base-color;
        }
      }
    }
  }
}
</style>
