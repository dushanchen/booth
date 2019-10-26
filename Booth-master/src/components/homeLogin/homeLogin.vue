<template>
  <div class="homeLogin">
    <div class="LoginMen">
      <!-- 无用户 -->
      <div class="LoginItem" v-if="!this.$store.state.user.UserID">
        <div class="sign">
          <img src="../../assets/images/home/signUp.png" alt>
          <div class="signIcon">
            <img src="../../assets/images/icon/man.png" alt>
          </div>
        </div>
        <div class="signBtn" @click="toSign">加入booth</div>
      </div>
      <!-- 有用户 -->
      <div class="LoginItem" v-else>
        <div class="LoginItemLogo">
          <img :src="`${this.$store.state.userData.logoPicUrl}`" alt>
        </div>
        <div class="LoginItemTitle">
          <p>{{this.$store.state.userData.name}}</p>
          <p>
            <span
              v-if="this.$store.state.userData.fansNumber"
            >{{this.$store.state.userData.fansNumber}}</span>
            <span v-else>0</span>位关注者
          </p>
          <p>{{this.$store.state.userData.oneIndustryname}}</p>
        </div>
        <div class="LoginItemUser" v-if="attentionUserList.attentionMe.length !== 0">
          <p>谁看过我</p>
          <div class="LoginItemUserList">
            <div
              class="LoginItemUserImg"
              v-for="(item, index) in attentionUserList.attentionMe"
              :key="index"
              @click="toOthercore(item.id)"
            >
              <img :src="`${item.logoUrl}`" alt>
            </div>
          </div>
        </div>
        <div class="LoginItemUser" v-if="attentionUserList.attentionTo.length !== 0">
          <p>我看过谁</p>
          <div class="LoginItemUserList">
            <div
              class="LoginItemUserImg"
              v-for="(item, index) in attentionUserList.attentionTo"
              :key="index"
              @click="toOthercore(item.id)"
            >
              <img :src="`${item.logoUrl}`" alt>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="Interest">
      <div class="InterestItem">
        <div class="InterestHead">
          <span>你可能感兴趣的</span>
          <span @click="toenterprise">了解更多</span>
        </div>
        <div class="InterestList" v-for="(item, index) in dataList" :key="index">
          <div class="enterpriseItem">
            <div class="enterpriseItemLeft">
              <div class="enterpriseItemHead" @click="toOthercore(item.user.id)">
                <!-- <div class="enterpriseItemHeadBg" v-if="item.user.logoUrl == null">
                  <img src="../../assets/images/icon/man.png" alt>
                </div>-->
                <img :src="`${item.user.logoUrl}`" alt>
              </div>
              <div class="enterpriseItemLeftTitle">
                <p @click="toOthercore(item.user.id)" v-if="item.user.nameShort">{{item.user.nameShort}}</p>
                <p @click="toOthercore(item.user.id)" v-else>{{item.user.name}}</p>
                <p>{{item.user.fansNumber}}位关注者</p>
                <p
                  @click="toSeach(item.user.oneIndustryid, item.user.twoIndustryid)"
                >{{item.user.industryName}}</p>
              </div>
            </div>
            <div class="enterpriseItemRight">
              <div class="InterestListshare" @click="copyUrl(item.user.id)">分享</div>

              <div class="InterestListSee" @click="toMover(item.user.id)">查看产品手册</div>
            </div>
          </div>
          <div class="already" v-if="item.exhibition">
            <div class="alreadyHead">
              <span>已参加</span>
              <p>
                {{item.exhibition.nameEng}}
                <br>
                {{item.exhibition.name}}
              </p>
            </div>
            <div class="alreadyTime">{{item.exhibition.dateEng}}</div>
          </div>
        </div>
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
import { mayBeInterestedCompany, getAttention, ERR_OK } from "@/api/api.js";

export default {
  name: "homeLogin",
  data() {
    return {
      showBox: false,
      userData: {
        firstIndustryId: this.$store.state.userData.oneIndustry,
        secondIndustryId: this.$store.state.userData.twoIndustry,
        id: this.$store.state.user.UserID
      },
      dataList: [],
      attentionUserList: {
        attentionMe: [],
        attentionTo: []
      }
    };
  },
  created() {
    if (this.$store.state.user.UserID) {
      this._mayBeInterestedCompany();
      this._getAttention();
    } else {
      this.userData.secondIndustryId = "";
      this._mayBeInterestedCompany();
    }
  },
  methods: {
    _mayBeInterestedCompany() {
      mayBeInterestedCompany(this.userData).then(res => {
        if (res.status === ERR_OK) {
          this.dataList = res.data.data;
          console.log(res.data.data);
        }
      });
    },
    _getAttention() {
      getAttention(this.$store.state.user.UserID).then(res => {
        if (res.data.code === 0) {
          this.attentionUserList = res.data.data;
        }
      });
    },
    toSeach(one, two) {
      this.$router.push({
        path: `/enterprise`,
        query: {
          Oneid: one,
          Twoid: two
        }
      });
    },
    copyUrl(id) {
      let url = `http://47.101.165.134/#/othercore?id=${id}`;
      let textArea = document.createElement("textarea");
      textArea.style.position = "fixed";
      textArea.style.top = 0;
      textArea.style.left = 0;
      textArea.style.width = "2em";
      textArea.style.height = "2em";
      textArea.style.padding = 0;
      textArea.style.border = "none";
      textArea.style.outline = "none";
      textArea.style.boxShadow = "none";
      textArea.style.background = "transparent";
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        this.throwError("不能使用这种方法复制内容" + err.toString());
      }
      document.body.removeChild(textArea);
      alert("企业连接已复制!");
    },
    toOthercore(id) {
      // if (!this.$store.state.user.UserID) {
      //   this.showBox = true;
      // } else {
      this.$router.push({
        path: `/othercore`,
        query: { id: id }
      });
      // }
    },
    toenterprise() {
      if (this.$store.state.user.UserID) {
        this.$router.push({
          path: "/enterprise"
        });
      } else {
        this.showBox = true;
      }
    },
    toSign() {
      this.$router.push({
        path: `/sign`
      });
    },
    toMover(id) {
      if (!this.$store.state.user.UserID) {
        this.showBox = true;
      } else {
        this.$router.push({
          name: `productList`,
          query: { id: id }
        });
      }
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
.he40 {
  height: 40px;
}
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
.homeLogin {
  width: 100%;
  .LoginMen {
    width: 100%;
    // height: 260px;
    background: #ebebeb;
    .LoginItem {
      width: 100%;
      height: 100%;
      padding: 30px 46px;
      box-sizing: border-box;
      background: rgba($color: #2c73a1, $alpha: 0.3);
      .sign {
        width: 100%;
        height: 78px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        >img {
          width: 90px;
        }
        .signIcon {
          width: 78px;
          height: 78px;
          background: #fff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .signBtn {
        width: 146px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background: #000;
        color: #ffffff;
        font-size: 18px;
        margin: 70px auto 0;
        cursor: pointer;
      }
      .LoginItemLogo {
        width: 66px;
        height: 66px;
        margin: 0 auto 10px;
      }
      .LoginItemTitle {
        text-align: center;
        p:nth-child(1) {
          font-size: 24px;
        }
        p:nth-child(2) {
          // font-size: 24px;
          margin: 10px 0 4px;
        }
        p:nth-child(3) {
          font-size: 10px;
          color: #2c73a1;
        }
      }
      .LoginItemUser {
        margin: 20px 0;
        p {
          font-size: 10px;
          height: 24px;
          line-height: 24px;
        }
        .LoginItemUserList {
          display: flex;
          flex-wrap: wrap;
          p {
            font-size: 10px;
          }
          .LoginItemUserImg {
            width: 18%;
            height: 50px;
            margin-right: 2%;
            // background: #fff;
            margin-bottom: 10px;
            overflow: hidden;
            cursor: pointer;
          }
          .LoginItemUserImg > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .Interest {
    width: 100%;
    margin-top: 12px;
    background: #ebebeb;
    .InterestItem {
      width: 100%;
      height: 100%;
      padding: 15px;
      box-sizing: border-box;
      background: rgba($color: #2c73a1, $alpha: 0.3);
      .InterestHead {
        width: 100%;
        display: flex;
        justify-content: space-between;
        span:nth-child(1) {
          font-size: 18px;
        }
        span:nth-child(2) {
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
    .InterestList {
      margin-top: 30px;
      .boothNum {
        font-size: 14px;
        font-weight: bold;
        height: 30px;
        line-height: 30px;
      }
      .InterestListMove {
        margin: 20px 0;
        display: flex;
        justify-content: center;
      }
      .enterpriseItem {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        .enterpriseItemLeft {
          display: flex;
          width: 100%;
          height: 100%;
          .enterpriseItemHead {
            width: 50px;
            height: 50px;
            text-align: center;
            img {
              width: 100%;
              cursor: pointer;
            }
          }
          .enterpriseItemLeftTitle {
            height: 100%;
            width: calc(100% - 50px);
            margin-left: 10px;
            p:nth-child(1) {
              font-size: 14px;
              font-weight: bold;
              cursor: pointer;
            }
            p:nth-child(2) {
              font-size: 14px;
              margin-top: 10px;
            }
            p:nth-child(3) {
              font-size: 12px;
              margin-top: 6px;
              color: #326b90;
              cursor: pointer;
            }
          }
        }
        .enterpriseItemRight {
          height: 66px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-between;
          .InterestListshare {
            width: 50px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            color: #fff;
            background: #326b90;
            font-size: 10px;
            cursor: pointer;
          }
          .InterestListSee {
            width: 90px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            color: #fff;
            background: #326b90;
            font-size: 10px;
            cursor: pointer;
          }
        }
      }
    }
    .already {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border-top: 2px solid #707070;
      .alreadyHead {
        width: 250px;
        display: flex;
        align-items: center;
        span {
          display: block;
          width: 60px;
          height: 28px;
          text-align: center;
          line-height: 28px;
          background: #000;
          color: #fff;
          font-size: 10px;
        }
        p {
          width: 160px;
          font-size: 10px;
          margin-left: 8px;
          // margin-top: 5px;
        }
      }
      .alreadyTime {
        font-size: 10px;
        color: #fff;
        // width: 150px;
        text-align: right;
      }
    }
  }
}
</style>
