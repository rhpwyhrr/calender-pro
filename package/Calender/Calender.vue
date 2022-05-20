<template>
  <div class="calender">
    <div class="c-header">
      <i class="ibtn" @click="prevYear">&lt;</i>
      <i class="ibtn" @click="prevMonth">&lt;&lt;</i>
      <span class="txt">{{ time.year }}</span>
      年
      <span class="txt">{{ time.month + 1 }}</span>
      月
      <i class="ibtn" @click="nextMonth">&gt;&gt;</i>
      <i class="ibtn" @click="nextYear">&gt;</i>
    </div>
    <div class="c-content">
      <div class="weeks">
        <div class="cell" v-for="w in weeks" :key="w">{{ w }}</div>
      </div>
      <div class="days">
        <div class="row" v-for="m in 6" :key="m">
          <div
            class="cell"
            v-for="n in 7"
            :key="n"
            :class="{
              gray: isNotCurMonth(
                visibleDateData[(m - 1) * 7 + n - 1].getMonth()
              ),
            }"
          >
            <div class="num">
              {{ visibleDateData[(m - 1) * 7 + n - 1].getDate() }}
            </div>
            <ul
              class="remarks"
              v-if="checkRemarks(visibleDateData[(m - 1) * 7 + n - 1])"
            >
              <li
                v-for="(r, index) in checkRemarks(
                  visibleDateData[(m - 1) * 7 + n - 1]
                )"
                :key="index"
              >
                {{ index + 1 }}、{{ r }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="c-footer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, PropType } from "vue";
import * as Utils from "@/utils/utils";
interface Remark {
  date: Date;
  infos: string[];
}
export default defineComponent({
  name: "calender",
  props: {
    modelValue: {
      type: String, //不能写出Date类型
      default: () => new Date(),
    },
    remarks: {
      type: Array as PropType<Remark[]>,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    // 保留props的响应性
    const { modelValue, remarks } = toRefs(props);
    const weeks = ["日", "一", "二", "三", "四", "五", "六"];

    const time = computed(() => {
      return Utils.getYearMonthDay(modelValue.value);
    });
    const visibleDateData = computed(() => {
      const dateArr: Date[] = [];
      const { year, month } = Utils.getYearMonthDay(modelValue.value);
      const curFirstDay = Utils.getDate(year, month, 1);
      const curFirstWeek = curFirstDay.getDay();
      const startDay =
        curFirstDay.getTime() - curFirstWeek * 1000 * 60 * 60 * 24;
      for (let i = 0; i < 42; i++) {
        const curDate = new Date(startDay + i * 1000 * 60 * 60 * 24);
        dateArr.push(curDate);
      }
      return dateArr;
    });

    const checkRemarks = (date: Date) => {
      const remks = remarks.value.filter((item: Remark) =>
        Utils.compareDate(new Date(item.date), date)
      );
      return remks.length > 0 ? remks[0].infos : [];
    };

    const prevMonth = () => {
      const date = new Date(modelValue.value);
      date.setMonth(date.getMonth() - 1);
      emit("update:modelValue", date);
    };
    const prevYear = () => {
      const date = new Date(modelValue.value);
      date.setFullYear(date.getFullYear() - 1);
      emit("update:modelValue", date);
    };
    const nextMonth = () => {
      const date = new Date(modelValue.value);
      date.setMonth(date.getMonth() + 1);
      emit("update:modelValue", date);
    };
    const nextYear = () => {
      const date = new Date(modelValue.value);
      date.setFullYear(date.getFullYear() + 1);
      emit("update:modelValue", date);
    };

    const isNotCurMonth = (m: number) => {
      return m !== time.value.month;
    };
    return {
      time,
      visibleDateData,
      weeks,
      checkRemarks,
      prevMonth,
      prevYear,
      nextMonth,
      nextYear,
      isNotCurMonth,
    };
  },
});
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.calender {
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px #ccc;
  .c-header {
    flex: 1;
    background: #ececec;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .ibtn {
      width: 10%;
      text-align: center;
      font-size: 20px;
      font-family: "Microsoft yahei";
      cursor: pointer;
    }
    .txt {
      font-weight: 700;
    }
  }
  .c-content {
    flex: 9;
    display: flex;
    flex-direction: column;
    .weeks {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-bottom: 1px solid #ccc;
    }
    .days {
      flex: 6;
      display: flex;
      flex-direction: column;
      .row {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .cell {
          display: block;
          flex: 1;
          height: 100%;
          background: #ececec;
          padding: 10px;
          width: 0;
          flex-shrink: 0;
          &.gray {
            opacity: 0.5;
          }
          .num {
            font-weight: 700;
            text-align: center;
          }
          .remarks {
            margin-top: 10px;
            li {
              white-space: nowrap;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              display: block;
              color: #ccc;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  .c-footer {
  }
}
</style>
