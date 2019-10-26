<template>
  <div class="all">
    <Tab
      v-on:ShowLogin="ShowLogin"
      v-on:ShowSign="ShowSign"
    ></Tab>
    <router-view></router-view>
    <Food></Food>
    <Login
      v-if="loginState"
      v-on:closeLogin="closeLogin"
    ></Login>
    <Sign v-if="signState" v-on:closeSign="closeSign"></Sign>
  </div>
</template>

<script>
import Tab from "@/components/tab/tab.vue";
import Food from "@/components/food/food.vue";
import Login from "@/components/login/login.vue";
import Sign from "@/components/sign/sign.vue";

export default {
  name: "all",
  data() {
    return {
      loginState: false,
      signState: false,
      userList: {}
    };
  },
  methods: {
    ShowLogin(LoginState) {
      this.loginState = LoginState;
    },
    ShowSign(SignState) {
      this.signState = SignState;
    },
    closeLogin(closeLogin) {
      this.loginState = closeLogin;
    },
    closeSign(closeSign) {
      this.signState = closeSign;
    }
  },
  components: {
    Tab,
    Food,
    Login,
    Sign
  }
};
</script>
