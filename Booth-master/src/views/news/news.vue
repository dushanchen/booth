<template>
  <div class="news">
    <div class="newsList">
      <div class="newLogo">
        <img src="../../assets/images/new/logo.png" alt>
        <p>最新消息推送！</p>
      </div>
      <div
        class="newsItem"
        @click="showDetails(item.id)"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <span>{{item.title}}</span>
        <span v-if="item.isRead === 1">未读</span>
        <span v-if="item.isRead === 2">已读</span>
      </div>
    </div>
    <div class="newsDetailsBox" v-if="showBox" @click="hidebox">
      <div class="newBox">
        <div class="newBoxHead">
          <div>
            <img src="../../assets/images/new/logo.png" alt>
          </div>
          <div>
            <p>
              Basics contains components and complex blocks which can easily be
              integrated
            </p>
            <p>into almost any design.</p>
          </div>
        </div>
        <div class="newBoxTitle">
          <span>{{detailes.title}}</span>
        </div>
        <div class="newBoxMian" v-html="detailes.message"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllMessage, setMessageRead } from "@/api/api.js";
export default {
  name: "news",
  data() {
    return {
      showBox: false,
      dataList: [],
      detailes: {
        message: "",
        title: ""
      }
    };
  },
  created() {
    if (!this.$store.state.user.UserID) {
      this.$router.push({
        name: `loginList`
      });
      return;
    }
    window.scrollTo(0, 0);
    this._getAllMessage();
  },
  methods: {
    _getAllMessage() {
      getAllMessage(this.$store.state.user.UserID).then(res => {
        if (res.data.code === 0) {
          console.log(res.data.data);
          this.dataList = res.data.data;
        }
      });
    },
    _setMessageRead(id) {
      setMessageRead(id).then(res => {
        if (res.data.code === 0) {
          console.log(res.data.data);
          this.detailes = res.data.data;
        }
      });
    },
    showDetails(id) {
      this.showBox = true;
      this._setMessageRead(id);
    },
    hidebox() {
      this.showBox = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.news {
  width: 100%;
  height: calc(100vh - 218px);
  padding: 26px;
  box-sizing: border-box;
  display: flex;
  .newsList {
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #fff;
    padding-bottom: 20px;
    box-sizing: border-box;
    .newLogo {
      text-align: center;
      margin: 40px 0 10px;
      p {
        font-size: 24px;
        color: #326b90;
        margin-top: 20px;
      }
    }
    .newsItem {
      margin: 0 50px;
      border-bottom: 1px dashed #707070;
      height: 80px;
      line-height: 80px;
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      cursor: pointer;
    }
  }
  .newsDetailsBox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .newBox {
      width: 50%;
      height: 66%;
      background: #fff;
      padding: 30px;
      box-sizing: border-box;
      overflow: auto;
      .newBoxHead {
        display: flex;
        justify-content: space-between;
        p {
          text-align: right;
          height: 24px;
          line-height: 24px;
          color: #326b90;
          font-size: 10px;
        }
      }
      .newBoxTitle {
        margin-top: 80px;
        font-size: 18px;
        span {
          font-weight: bold;
        }
      }
      .newBoxMian {
        font-size: 16px;
        line-height: 22px;
        margin-top: 50px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
