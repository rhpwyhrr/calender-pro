<template>
  <div class="calender">
    <div class="c-headerr">
      <i class="ibtn">&lt;</i>
      <i class="ibtn">&lt;&lt;</i>
      <span class="txt">{{ year }}</span>
      年
      <span class="txt">{{ month }}</span>
      月
      <i class="ibtn">&gt;&gt;</i>
      <i class="ibtn">&gt;</i>
    </div>
    <div class="c-content">
      <div class="weeks">
        <span class="cell" v-for="w in weeks" :key="w">{{ w }}</span>
      </div>
      <div class="days">
        <div v-for="m in 6" :key="m">
          <span class="cell" v-for="n in 7" :key="n">
            {{ visibleDateData[(m - 1) * 7 + n - 1].getDate() }}
          </span>
        </div>
      </div>
    </div>
    <div class="c-footer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from "vue";
import * as Utils from "@/utils/utils";
export default defineComponent({
  name: "calender",
  props: {
    value: {
      type: Date,
      default: () => new Date(),
    },
  },
  setup(props) {
    const time = reactive(Utils.getYearMonthDay(props.value));
    const weeks = reactive(["日", "一", "二", "三", "四", "五", "六"]);

    const visibleDateData = computed(() => {
      const dateArr: Date[] = [];
      const { year, month } = Utils.getYearMonthDay(props.value);
      const curFirstDay = Utils.getDate(year, month, 1);
      const curFirstWeek = curFirstDay.getDay();
      const startDay = curFirstDay.getTime() - curFirstWeek * 1000 * 60 * 60 * 24;
      for (let i = 0; i < 42; i++) {
        const curDate = new Date(startDay + i * 1000 * 60 * 60 * 24);
        dateArr.push(curDate);
      }
      return dateArr;
    });
    return {
      ...toRefs(time),
      visibleDateData,
      weeks,
    };
  },
});
</script>

<style lang="less" scoped>
.calender {
  width: 100%;
  height: 100%;
}
</style>
