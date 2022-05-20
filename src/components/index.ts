import Calender from "./Calender/Calender.vue";

const components = [Calender];

const install = (app, options) => {
  components.forEach((cp) => {
    app.components(cp.name, cp);
  });
};

export default install;
