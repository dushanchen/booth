<template>
  <div class="success">
    <p v-if="success">激活成功</p>
    <p v-if="!success">激活{{text}}</p>
    <p v-if="success">3秒后自动返回首页...</p>
  </div>
</template>

<script>
import { activate, ERR_OK } from "@/api/api.js";

export default {
  data() {
    return {
      success: "",
      timer: "",
      text: '中...',
      url: window.location.href.split("?")[1]
    };
  },
  created() {
    let splictStr = this.url.split("&");
    let urlObj = {};
    for (var i = 0; i < splictStr.length; i++) {
      urlObj[splictStr[i].split("=")[0]] = splictStr[i].split("=")[1];
    }
    activate(urlObj.key).then(res => {
      if (res.data.code === 0) {
        this.success = res.data;
        this.timer = setTimeout(() => {
          window.opener = null;
          window.open(" ", "_self", " ");
          window.close();
        }, 3000);
      } else {
        this.text = '失败'
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.success {
  margin-top: 30px;
}
.success p {
  width: 100%;
  text-align: center;
  font-size: 18px;
}
</style>
