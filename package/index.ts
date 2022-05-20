import Calender from "./Calender/Calender.vue";

const components = [Calender];

const install = (app) => {
  components.forEach((cp) => {
    app.component(cp.name, cp);
  });
};

export default { install };
