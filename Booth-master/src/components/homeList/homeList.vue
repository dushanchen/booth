<template>
  <div class="homeList">
    <div class="homleListItem" v-for="(item, index) in dataList" :key="index">
      <div class="homeListHead">
        <div class="homeListImg">
          <div @click="toOthercoreList(item.user.id)">
            <img :src="`${item.user.logoUrl}`" alt>
          </div>
          <div class="follow" v-if="item.isConcerned === 2" @click="followId(item.user.id)">+ 关注</div>
          <div
            class="follow"
            v-if="item.isConcerned === 1"
            @click="cancelfollowId(item.user.id)"
          >已关注</div>
        </div>
        <div class="homeListTitle">
          <div class="name" @click="toOthercoreList(item.user.id)">{{item.user.name}}</div>
          <div class="nameEN">{{item.user.fansNumber}}关注者</div>
          <p
            class="industry"
            @click="toSeach(item.user.oneIndustryid, item.user.twoIndustryid)"
          >{{item.user.industryName}}</p>
          <div
            class="exhibition"
            v-if="item.participation !== null"
            @click="toExt(item.participation.id)"
          >
            <div class="exhibitionItem">
              <div class="exhibitionCan">
                <span>已参与</span>
                <div class="exhibitionName">
                  {{item.participation.dateEng}}
                  <br>
                  {{item.participation.nameEng}}
                  <br>
                  {{item.participation.name}}
                </div>
              </div>
              <div class="exhibitionTime">
                <div class="exhibitionDetali">
                  <i class="icon iconTo"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="enterpriseItemRight">
          <div class="InterestListshare" @click="copyUrl(item.user.id)">分享</div>
          <div class="InterestListSee" @click="toMover(item.user.id)">查看产品手册</div>
        </div>
      </div>
      <div class="hometext" ref="heightlist">{{item.user.summary}}</div>
      <div class="moveBtn" @click="toOthercore(index)" ref="moveBtn">更多</div>
      <div class="homeItemImg">
        <img :src="`${item.user.introductionUrl}`" alt>
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
import { getRecommendCompany, focus, cancelFocus, ERR_OK } from "@/api/api.js";

export default {
  name: "homeList",
  data() {
    return {
      showBox: false,
      followData: {
        userId: "",
        concernedId: ""
      },
      upList: {
        firstIndustryId: "",
        secondIndustryId: "",
        id: ""
      },
      dataList: []
    };
  },
  created() {
    // console.log(this.$store.state.userData);
    if (this.$store.state.user.UserID) {
      this.upList.secondIndustryId = this.$store.state.userData.twoIndustry;
      this.upList.id = this.$store.state.user.UserID;
      this._getRecommendCompany();
    } else {
      this.upList.firstIndustryId = this.$store.state.userData.oneIndustry;
      this._getRecommendCompany();
    }
  },
  methods: {
    _getRecommendCompany() {
      getRecommendCompany(this.upList).then(res => {
        if (res.status === ERR_OK) {
          this.dataList = res.data.data;
        }
      });
    },
    _focus() {
      focus(this.followData).then(res => {
        if (res.status === ERR_OK) {
          this._getRecommendCompany();
        }
      });
    },
    _cancelFocus() {
      cancelFocus(this.followData).then(res => {
        if (res.status === ERR_OK) {
          this._getRecommendCompany();
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
    toSeach(one, two) {
      this.$router.push({
        path: `/enterprise`,
        query: {
          Oneid: one,
          Twoid: two
        }
      });
    },
    toOthercoreList(id) {
      if (!this.$store.state.user.UserID) {
        this.showBox = true;
      } else {
        this.$router.push({
          path: `/othercore`,
          query: { id: id }
        });
      }
    },
    toOthercore(index) {
      this.$refs.heightlist[index].style.height = "auto";
      this.$refs.heightlist[index].style.overflow = "";
      this.$refs.moveBtn[index].innerHTML = "";
    },
    toExt(id) {
      this.$router.push({
        path: `/exhibitionDetails`,
        query: { id: id }
      });
    },
    followId(id) {
      if (this.$store.state.user.UserID) {
        this.followData.userId = this.$store.state.user.UserID;
        this.followData.concernedId = id;
        this._focus();
      } else {
        this.showBox = true;
      }
    },
    cancelfollowId(id) {
      if (this.$store.state.user.UserID) {
        this.followData.userId = this.$store.state.user.UserID;
        this.followData.concernedId = id;
        this._cancelFocus();
      } else {
        this.showBox = true;
      }
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
.homeList {
  width: 100%;
  .homleListItem {
    width: 100%;
    margin-bottom: 20px;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    .homeListHead {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #707070;
      padding-bottom: 30px;
      .homeListImg {
        width: 50px;
        text-align: center;
        img {
          width: 100%;
          cursor: pointer;
        }
        .follow {
          width: 50px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          background: #000;
          color: #fff;
          font-size: 10px;
          margin-top: 10px;
          cursor: pointer;
        }
      }
      .homeListTitle {
        width: calc(100% - 160px);
        margin: 0 10px;
        .name {
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
        }
        .nameEN {
          margin: 4px 0;
        }
        .industry {
          color: #326b90;
          font-weight: bold;
          font-size: 12px;
          cursor: pointer;
        }
        .exhibition {
          width: 100%;
          min-width: 356px;
          // height: 52px;
          background: #fff;
          margin-top: 20px;
          cursor: pointer;
          .exhibitionItem {
            width: 100%;
            height: 100%;
            background: rgba($color: #c8d3db, $alpha: 0.32);
            display: flex;
            justify-content: space-between;
            position: relative;
            .exhibitionCan {
              display: flex;
              align-items: center;
              width: calc(100% - 36px);
              span {
                display: flex;
                width: 60px;
                height: 100%;
                // height: 52px;
                background: #326b90;
                color: #fff;
                text-align: center;
                justify-content: center;
                align-items: center;
                // line-height: 52px;
              }
              .exhibitionName {
                width: calc(100% - 64px);
                margin-top: 4px;
                margin-left: 10px;
                line-height: 20px;
                font-size: 12px;
              }
            }
            .exhibitionTime {
              height: 26px;
              width: 26px;
              position: absolute;
              top: 0;
              right: 10px;
              bottom: 0px;
              margin: auto;
              span {
                display: flex;
                text-align: right;
                align-items: center;
                // width: 90px;
                height: 52px;
                font-weight: bold;
                font-size: 12px;
                margin-right: 4px;
              }
              .exhibitionDetali {
                width: 26px;
                height: 26px;
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                background: #fff;
                border: 2px solid #707070;
                border-radius: 50%;
              }
            }
          }
        }
      }
      .enterpriseItemRight {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 90px;
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
          margin-top: 5px;
          cursor: pointer;
        }
      }
    }
    .hometext {
      margin: 10px 0;
      font-size: 14px;
      line-height: 24px;
      height: 120px;
      overflow: hidden;
      letter-spacing: 1px;
    }
    .moveBtn {
      font-weight: bold;
      font-size: 16px;
      letter-spacing: 1px;
      cursor: pointer;
    }
    .homeItemImg {
      width: 100%;
      margin-top: 10px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
