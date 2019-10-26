import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user.js";
import userData from "./modules/userData.js";
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    userData
  },
  getters
});

export default store;
