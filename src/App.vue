<template>
  <Calender v-model="date" :remarks="remarks" />
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import Calender from "./components/Calender.vue";

export default defineComponent({
  name: "App",
  components: {
    Calender,
  },
  setup() {
    const remarks = reactive([
      {
        date: "2022-5-9",
        infos: ["message text 01", "today i am so sad"],
      },
    ]);
    let date = ref(new Date());
    return { remarks, date };
  },
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
