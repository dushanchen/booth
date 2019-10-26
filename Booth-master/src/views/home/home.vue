<template>
  <div class="home">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in listImg" :key="index">
          <img :src="`${item.bannerUrl.split(',')[0]}`" alt>
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <div class="Percentage" v-if="this.$store.state.user.UserID">
      <div class="PercentageHend">
        <span>企业资料完成度{{this.$store.state.userData.Percent}}%</span>
        <div>
          <p>普通会员</p>
          <p @click="toSing">编辑企业资料</p>
        </div>
      </div>
      <div class="PercentageBox">
        <div class="PercentageBoxList" :style="`width:${this.$store.state.userData.Percent}%;`"></div>
      </div>
    </div>
    <div class="mian">
      <div class="mianLeft">
        <HomeLogin></HomeLogin>
      </div>
      <div class="mianList">
        <HomeList></HomeList>
      </div>
      <div class="mianRight">
        <HomeRight></HomeRight>
      </div>
    </div>
    <div class="boxLoing" v-if="showBox">
      <p>您还未登录，是否去登录？</p>
      <div>
        <span @click="quxiao">取消</span>
        <span @click="tologinList">去登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import HomeLogin from "@/components/homeLogin/homeLogin.vue";
import HomeList from "@/components/homeList/homeList.vue";
import HomeRight from "@/components/homeRight/homeRight.vue";
import {
  getIndexBanner,
  getInfoPercent,
  getCompanyInfo,
  ERR_OK
} from "@/api/api.js";
import { getUser } from "@/utils/auth.js";

export default {
  name: "home",
  data() {
    return {
      showBox: false,
      listImg: [],
      dataList: {}
    };
  },
  created() {
    window.scrollTo(0, 0);
    getIndexBanner().then(res => {
      if (res.status === ERR_OK) {
        this.listImg = res.data.data;
      }
    });
    if (this.$store.state.user.UserID) {
      getInfoPercent(this.$store.state.user.UserID).then(res => {
        if (res.status === ERR_OK) {
          this.$store.commit("SET_Percent", res.data.data);
        }
      });
    }
  },
  updated() {
    let _this = this;
    var swiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      preventClicks: false,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      preventLinksPropagation: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      on: {
        click: function(event, handler) {
          if (event.target.src) {
            const realIndex = this.realIndex;
            _this.toDetails(realIndex);
          }
        }
      }
    });
  },
  methods: {
    toDetails(id) {
      this.$router.push({
        path: `/exhibitionDetails`,
        query: { id: this.listImg[id].id }
      });
    },
    toSing() {
      this.$router.push({
        name: `infoOne`
      });
    },
    tologinList() {
      this.$router.push({
        name: `loginList`
      });
    },
    quxiao() {
      this.showBox = false;
    }
  },
  components: {
    HomeLogin,
    HomeList,
    HomeRight
  },
  beforeRouteEnter(to, from, next) {
    next();
    if ( from.name === 'loginList') {
       window.location.reload();
    }
  }
};
</script>

<style lang="scss">
.home {
  .swiper-container {
    width: 100%;
    height: 472px;
    margin-left: auto;
    margin-right: auto;
  }
  .swiper-slide {
    width: 100%;
    height: 100%;
  }
  .swiper-slide > img {
    width: 100%;
    height: 100%;
  }
  .Percentage {
    margin: 30px 0 10px;
    padding: 0 40px;
    box-sizing: border-box;
    width: 100%;
    .PercentageHend {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-content: center;
      color: #2c73a1;
      span {
        font-size: 30px;
      }
      p {
        font-size: 12px;
        text-align: right;
        height: 20px;
        line-height: 20px;
        cursor: pointer;
      }
    }
    .PercentageBox {
      width: 100%;
      height: 10px;
      border: 1px solid #fff;
      .PercentageBoxList {
        height: 10px;
        background: #326b90;
      }
    }
  }
  .mian {
    padding: 30px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    padding-left: 426px;
    padding-right: 347px;
    position: relative;
    .mianLeft {
      position: absolute;
      top: 30px;
      left: 30px;
      width: 396px;
    }
    .mianList {
      width: 100%;
      margin: 0 12px;
    }
    .mianRight {
      position: absolute;
      top: 30px;
      right: 30px;
      width: 307px;
    }
  }
}
</style>
