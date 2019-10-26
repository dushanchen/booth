<template>
  <div class="homeRight">
    <img :src="`${dataAll.areaA.url}`" alt v-if="dataAll.areaA">
    <div class="homeTitle">
      <img src="../../assets/images/home/logo.png" alt>
      <img src="../../assets/images/home/logoText.png" alt>
    </div>
    <img :src="`${dataAll.areaB.url}`" alt v-if="dataAll.areaB">
  </div>
</template>

<script>
import { getAdvert, ERR_OK } from "@/api/api.js";

export default {
  name: "homeRight",
  data() {
    return {
      dataAll: {
        areaA: { id: 2, url: "" },
        areaB: { id: 2, url: "" }
      }
    };
  },
  created() {
    if (!this.$store.state.user.UserID) {
      getAdvert(this.$store.state.userData.oneIndustry).then(res => {
        if (res.status === ERR_OK) {
          console.log(res.data.data)
          this.dataAll = res.data.data;
        }
      });
    } else {
      getAdvert(this.$store.state.userData.twoIndustry).then(res => {
        if (res.status === ERR_OK) {
          this.dataAll = res.data.data;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.homeRight {
  background: #2c73a1;
  padding: 14px 14px 24px;
  box-sizing: border-box;
  .homeTitle {
    margin: 14px 34px 24px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    border-bottom: 2px solid #fff;
    padding-bottom: 10px;
    img:nth-child(2) {
      margin: 0 0 10px 10px;
    }
  }
}
</style>
