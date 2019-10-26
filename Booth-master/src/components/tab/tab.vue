<template>
  <div class="tab">
    <div class="tabLogo">
      <img src="../../assets/images/home/logo.png" alt @click="toHome" />
      <div class="tabSearch">
        <input
          type="text"
          placeholder="搜索你感兴趣的企业/展会"
          v-model="searchData"
          @keyup.enter="toSearch"
          @focus="searchstate= true"
          @blur="searchstate= false"
        />
        <!--  -->
        <i class="icon iconSearch" @click="toSearch"></i>
        <div class="Searchbox tabSearchleft" v-if="searchstate">
          <div class="tabSearchboxleft">
            <div
              v-for="(items, index) in industryData"
              :key="index"
              :class="{ act: index == typeindex }"
              @mouseenter="mouseOver(index, items)"
              @click.stop="TabClick()"
            >{{items.industryName}}</div>
          </div>
        </div>
        <div class="Searchbox tabSearchright" v-if="searchstate">
          <div class="tabSearchbox">
            <div
              v-for="(items, index) in items"
              :class="{ actTwo: index == typeindexTwo }"
              :key="index"
              @click.stop="TabClick()"
              @mouseenter="mouseOverTwo(index,items)"
            >{{items.industryName}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tabLoging">
      <router-link tag="a" :to="{path:'/home'}">首页</router-link>
      <!-- <router-link tag="a"  @click="toHome"  :to="{path:'/home',query:{id:'1'}}">首页</router-link> -->
      <router-link tag="a" :to="{path:'/exhibition'}">展会</router-link>
      <router-link tag="a" :to="{path:'/enterprise'}">企业</router-link>
      <router-link tag="a" :to="{path:'/News'}">消息</router-link>
      <!-- <div @click="toEnterprise">企业</div>
      <div @click="toNews">消息</div>-->
      <div @click="toSign" v-if="!this.$store.state.user.UserID">注册</div>
      <div @click="ShowLogin" v-if="!this.$store.state.user.UserID">登录</div>
      <div class="HeadImg HeadImgLogo" v-if="!this.$store.state.user.UserID" @click="ShowLogin">
        <img src="../../assets/images/icon/man.png" alt />
      </div>
      <div @click="Cancellation" v-if="this.$store.state.user.UserID">注销</div>
      <router-link
        class="HeadImg"
        tag="a"
        :to="{path:'/core'}"
        v-if="this.$store.state.user.UserID"
      >
        <img :src="`${this.$store.state.userData.logoPicUrl}`" alt />
      </router-link>
      <!-- <div class="HeadImg" @click="toCore" v-if="this.$store.state.user.UserID">
        <img :src="`${this.$store.state.userData.logoPicUrl}`" alt>
      </div>-->
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
import { getIndustry, ERR_OK } from "@/api/api.js";
import {
  setOne,
  setTwo,
  getOne,
  getTwo,
  removeUser,
  removeOne,
  removeTwo
} from "@/utils/auth.js";

export default {
  name: "tab",
  data() {
    return {
      showBox: false,
      LoginState: true,
      SignState: true,
      industryData: [],
      typeindex: 0,
      typeindexTwo: 0,
      items: [],
      searchData: "",
      One: getOne(),
      Two: getTwo(),
      searchstate: false
    };
  },
  created() {
    this.searchData = this.$route.query.center;
    this._getIndustry();
    console.log(this.One, this.Two);
  },
  methods: {
    _getIndustry() {
      getIndustry().then(res => {
        if (res.status === ERR_OK) {
          this.industryData = res.data.data;
          this.items = this.industryData[this.One - 1].secondIndustries;
        }
      });
    },
    focusfun() {
      this.searchstate = true;
    },
    mouseOver(index, data) {
      this.typeindex = index;
      this.items = data.secondIndustries;
      this.One = data.id;
      this.Two = data.secondIndustries[0].id;
      this.typeindexTwo = 0;
    },
    mouseOverTwo(index, data) {
      this.typeindexTwo = index;
      this.Two = data.id;
    },
    TabClick() {
      this.searchstate = false;
      window.location.reload();
      setOne(this.One);
      setTwo(this.Two);
    },
    // toExhibition() {
    //   let routeUrl = this.$router.resolve({
    //     path: "/exhibition"
    //   });
    //   window.open(routeUrl.href, "_blank");
    // },
    toHome() {
      this.$router.push({
        path: `/home`
      });
      // let routeUrl = this.$router.resolve({
      //   path: "/home"
      // });
      // window.open(routeUrl.href, "_blank");
    },
    toSign() {
      this.$emit("ShowSign", this.SignState);
    },
    Cancellation() {
      let con;
      con = confirm("确定要退出该账户么？");
      if (!con) return;
      removeUser();
      removeOne();
      removeTwo();
      window.location.reload();
    },
    ShowLogin() {
      this.$emit("ShowLogin", this.LoginState);
    },
    toSearch() {
      this.searchstate = false;
      this.$router.push({
        path: `/search`,
        query: { center: this.searchData }
      });
      this.$emit("toSearch", this.searchData);
    },
    toNews() {
      if (!this.$store.state.user.UserID) {
        this.$emit("ShowLogin", this.LoginState);
      } else {
        // this.$router.push({
        //   path: `/News`
        // });
        let routeUrl = this.$router.resolve({
          path: "/News"
        });
        window.open(routeUrl.href, "_blank");
      }
    },
    toEnterprise() {
      if (!this.$store.state.user.UserID) {
        this.$emit("ShowLogin", this.LoginState);
      } else {
        // this.$router.push({
        //   path: `/enterprise`
        // });
        let routeUrl = this.$router.resolve({
          path: "/enterprise"
        });
        window.open(routeUrl.href, "_blank");
      }
    },
    toCore() {
      // this.$router.push({
      //   path: `/core`
      // });
      let routeUrl = this.$router.resolve({
        path: "/core"
      });
      window.open(routeUrl.href, "_blank");
    },
    tologinList() {
      this.$router.push({
        name: `loginList`
      });
    },
    quxiao() {
      this.showBox = false;
    }
  }
};
</script>

<style lang="scss">
.tab {
  width: 100%;
  height: 60px;
  background: #326b90;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  .boxLoing {
    position: fixed;
    width: 350px;
    height: 100px;
    background: #fff;
    top: 100px;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 9999999999;
    box-shadow: 2px 0px 10px #333333;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div {
      margin-top: 20px;
      span {
        padding: 4px 10px;
        background: #000;
        color: #fff;
        font-size: 10px;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
  .tabLogo {
    display: flex;
    align-items: center;
    img {
      width: 75px;
    }
    select {
      width: 100px;
      height: 32px;
      border: 1px solid #fff;
      background: initial;
      outline: none;
      margin-left: 10px;
    }
    .TabBtn {
      margin-left: 10px;
      padding: 4px 10px;
      background: #000;
      color: #fff;
      font-size: 10px;
      cursor: pointer;
    }
    img {
      cursor: pointer;
    }
    .tabSearch {
      width: 246px;
      height: 30px;
      border: 1px solid #fff;
      padding: 0 16px;
      margin-left: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .Searchbox {
        position: absolute;
        top: 30px;
        width: 50%;
        z-index: 9999;
        height: 170px;
        background: #fff;
        > div {
          height: 100%;
          width: 100%;
          overflow: auto;
          &.tabSearchbox {
            background: rgba($color: #326b90, $alpha: 0.2);
          }
          > div {
            padding: 4px 10px;
            cursor: pointer;
            font-size: 10px;
          }
        }
      }
      .tabSearchleft {
        left: 0;
        .tabSearchboxleft {
          > div {
            &.act {
              background: rgba($color: #326b90, $alpha: 0.2);
            }
          }
        }
      }
      .tabSearchright {
        right: 0;
        .tabSearchbox {
          background: rgba($color: #326b90, $alpha: 0.2);
          > div {
            padding: 4px 0;
            margin: 4px 10px;
            border-bottom: 1px solid #707070;
            &:last-child {
              border-bottom: none;
            }
            &.actTwo {
              color: #fff;
            }
          }
        }
      }
      .iconSearch {
        cursor: pointer;
      }
      input {
        background: initial;
        outline: none;
        color: #fff;
        width: 200px;
        font-size: 12px;
        &::-webkit-input-placeholder {
          color: #fff;
          font-size: 12px;
        }
      }
    }
  }
  .tabLoging {
    display: flex;
    align-items: center;
    a {
      cursor: pointer;
      margin-left: 36px;
      color: #fff;
      &.HeadImg {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    div {
      cursor: pointer;
      margin-left: 36px;
      color: #fff;
      &.HeadImg {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        border-radius: 50%;
        overflow: hidden;
      }
      &.HeadImgLogo img {
        width: 20px;
      }
    }
  }
}
</style>
