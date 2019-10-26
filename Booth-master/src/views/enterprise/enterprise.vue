<template>
  <div class="enterprise">
    <div class="enterpriseNav">
      <div class="enterpriseNavSeach">
        <span>筛选器/行业分类列表</span>
        <input type="text" placeholder="搜索企业" v-model="infoData.name" v-on:input="inputFunc">
      </div>
      <div class="enterpriseNavBottom">
        <div class="enterpriseMian">
          <div class="enterpriseMianOne">一级分类</div>
          <div class="enterpriseMianOneAll">
            <div
              class="enterpriseMianOne"
              :class="{ Oneact: index == typeindex }"
              v-for="(items, index) in industryData"
              @click="mouseOver(index, items)"
              :key="index"
            >{{ items.industryName }}</div>
          </div>
          <div class="enterpriseMianTwo">二级分类</div>
          <div class="enterpriseMianTwoAll">
            <div
              class="enterpriseMianTwo"
              v-for="(items, index) in items"
              :class="{ Oneact: index == typeTwoindex }"
              @click="mouseOverTwo(index, items.id)"
              :key="index"
            >{{ items.industryName }}</div>
          </div>
        </div>
        <div class="enterpriseList">
          <div class="enterpriseItem ItemAct" @click="toEnterprise">发现</div>
          <div class="enterpriseItem" @click="toHistory">历史记录</div>
          <div class="enterpriseItem" @click="toCollection">收藏</div>
        </div>
      </div>
    </div>
    <div class="enterpriseBox">
      <div class="enterpriseBoxList">
        <p v-if="dataList.length === 0">暂无数据</p>
        <div class="enterpriseBoxItem" v-for="(item, index) in dataList" :key="index">
          <div class="homeListHead">
            <div class="homeListImg">
              <div @click="toOthercore(item.user.id)">
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
              <div class="name">{{item.user.name}}</div>
              <div class="nameEN">{{item.user.fansNumber}}关注者</div>
              <p class="industry">{{item.user.industryName}}</p>
              <div
                class="exhibition"
                v-if="item.participation !== null"
                @click="toparticipation(item.participation.id)"
              >
                <div class="exhibitionItem">
                  <div class="exhibitionCan">
                    <span>已参与</span>
                    <div class="exhibitionName">
                      {{item.participation.nameEng}}
                      <br>
                      {{item.participation.name}}
                    </div>
                  </div>
                  <div class="exhibitionTime">
                    <span>{{item.participation.date}}</span>
                    <div class="exhibitionDetali">
                      <i class="icon iconTo"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="enterpriseItemRight">
              <div class="InterestListshare" @click="copyUrl(item.user.id)">分享</div>
              <div class="InterestListSee" @click="toBrochureList(item.user.id)">查看产品手册</div>
            </div>
          </div>
          <div class="hometext">{{item.user.summary}}</div>
          <div class="moveBtn" @click="toOthercore(item.user.id)">更多</div>
          <div class="homeItemImg">
            <img :src="`${item.user.introductionUrl}`" alt>
          </div>
        </div>
      </div>
      <div class="enterpriseBoxBaner">
        <div class="homeRight">
          <img :src="`${dataAll.areaA.url}`" alt v-if="dataAll.areaA">
          <div class="homeTitle">
            <img src="../../assets/images/home/logo.png" alt>
            <img src="../../assets/images/home/logoText.png" alt>
          </div>
          <img :src="`${dataAll.areaB.url}`" alt v-if="dataAll.areaB">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  discoverOtherCompanyByCondition,
  getAdvert,
  getIndustry,
  focus,
  cancelFocus,
  ERR_OK
} from "@/api/api.js";

export default {
  name: "enterprise",
  data() {
    return {
      timer: "",
      typeindex: "",
      typeTwoindex: "",
      infoData: {
        id: this.$store.state.user.UserID,
        name: "",
        firstIndustryId: "",
        secondIndustryId: ""
      },
      dataList: [],
      followData: {
        userId: "",
        concernedId: ""
      },
      dataAll: {
        areaA: { id: 2, url: "" },
        areaB: { id: 2, url: "" }
      },
      industryData: [],
      items: []
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
    if (this.$route.query.Oneid) {
      this.infoData.firstIndustryId = this.$route.query.Oneid;
    }
    if (this.$route.query.Twoid) {
      this.infoData.secondIndustryId = this.$route.query.Twoid;
    }
    getAdvert(this.$store.state.userData.twoIndustry).then(res => {
      if (res.status === 200) {
        this.dataAll = res.data.data;
      }
    });
    this._discoverOtherCompanyByCondition();
    this._getIndustry();
  },
  methods: {
    _getIndustry() {
      getIndustry().then(res => {
        if (res.status === ERR_OK) {
          this.typeindex = null;
          this.typeTwoindex = null;
          this.industryData = res.data.data;
          this.items = this.industryData[0].secondIndustries;
        }
      });
    },
    _focus() {
      focus(this.followData).then(res => {
        if (res.status === ERR_OK) {
          this._discoverOtherCompanyByCondition();
        }
      });
    },
    _cancelFocus() {
      cancelFocus(this.followData).then(res => {
        if (res.status === ERR_OK) {
          this._discoverOtherCompanyByCondition();
        }
      });
    },
    _discoverOtherCompanyByCondition() {
      discoverOtherCompanyByCondition(this.infoData).then(res => {
        if (res.data.code === 0) {
          console.log("发现--------------------------------------");
          console.log(res.data.data);
          this.dataList = res.data.data;
        }
      });
    },
    
    copyUrl(id) {
      // var clipBoardContent = "";
      let url = `http://www.booth.vip/#/othercore?id=${id}`;
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
      this.$router.push({
        path: `/othercore`,
        query: { id: id }
      });
    },
    toBrochureList(id) {
      this.$router.push({
        name: `productList`,
        query: { id: id }
      });
    },
    toparticipation(id) {
      this.$router.push({
        path: `/exhibitionDetails`,
        query: { id: id }
      });
    },
    mouseOver(index, data) {
      this.typeindex = index;
      this.typeTwoindex = 0;
      this.items = data.secondIndustries;
      this.infoData.firstIndustryId = data.id;
      this.infoData.secondIndustryId = data.secondIndustries[0].id;
      this._discoverOtherCompanyByCondition();
    },
    mouseOverTwo(index, id) {
      this.typeTwoindex = index;
      this.infoData.secondIndustryId = id;
      this._discoverOtherCompanyByCondition();
    },
    setTime() {
      this.timer = setTimeout(() => {
        this._discoverOtherCompanyByCondition();
      }, 1000);
    },
    followId(id) {
      if (this.$store.state.user.UserID) {
        this.followData.userId = this.$store.state.user.UserID;
        this.followData.concernedId = id;
        this._focus();
      }
    },
    cancelfollowId(id) {
      if (this.$store.state.user.UserID) {
        this.followData.userId = this.$store.state.user.UserID;
        this.followData.concernedId = id;
        this._cancelFocus();
      }
    },
    inputFunc() {
      clearInterval(this.timer);
      this.setTime();
    },
    toEnterprise() {
      this.$router.push({
        path: `/enterprise`
      });
    },
    toHistory() {
      this.$router.push({
        path: `/history`
      });
    },
    toCollection() {
      this.$router.push({
        path: `/collection`
      });
    }
  }
};
</script>

<style lang="scss">
.enterprise {
  min-height: 585px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .enterpriseNav {
    width: 240px;
    height: calc(100vh - 218px);
    min-height: 585px;
    padding: 0 10px;
    box-sizing: border-box;
    border-right: 1px dashed #707070;
    .enterpriseNavSeach {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      height: 30px;
      span {
        height: 20px;
        line-height: 20px;
      }
      input {
        width: 100px;
        height: 20px;
        line-height: 20px;
        padding: 0 10px;
        box-sizing: border-box;
        border: 1px solid #707070;
      }
    }
    .enterpriseNavBottom {
      height: calc(100% - 30px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .enterpriseMian {
      height: 360px;
      width: 100%;
      margin-top: 20px;
      background: rgba($color: #326b90, $alpha: 0.1);
      .enterpriseMianOne {
        width: 100%;
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
        box-sizing: border-box;
        background: #326b90;
        font-size: 10px;
      }
      .enterpriseMianTwo {
        width: 100%;
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
        box-sizing: border-box;
        background: rgba($color: #326b90, $alpha: 0.6);
        font-size: 10px;
      }
      .enterpriseMianOneAll,
      .enterpriseMianTwoAll {
        height: 144px;
        line-height: 16px;
        overflow: auto;
        .Oneact {
          background: rgba($color: #326b90, $alpha: 0);
        }
        .enterpriseMianOne,
        .enterpriseMianTwo {
          padding: 0 16px;
          width: 100%;
          height: 20px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
        }
      }
      .enterpriseMianthree {
        width: 100%;
        height: 36px;
        line-height: 36px;
        padding: 0 42px;
        box-sizing: border-box;
        font-size: 10px;
      }
    }
    .enterpriseList {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .enterpriseItem {
        width: 100px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
      }
      .ItemAct {
        font-weight: bold;
      }
    }
  }
  .enterpriseBox {
    width: calc(100% - 240px);
    display: flex;
    .enterpriseBoxList {
      width: calc(100% - 306px);
      padding: 0 30px;
      box-sizing: border-box;
      .enterpriseBoxItem {
        width: 100%;
        background: #fff;
        padding: 30px;
        box-sizing: border-box;
        .homeListHead {
          display: flex;
          justify-content: space-between;
          border-bottom: 2px solid #707070;
          padding-bottom: 30px;
          .homeListImg {
            width: 66px;
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
            width: calc(100% - 186px);
            margin: 0 10px;
            .name {
              font-size: 24px;
            }
            .nameEN {
              margin: 4px 0;
            }
            .industry {
              color: #326b90;
              font-weight: bold;
              font-size: 12px;
            }
            .exhibition {
              width: 100%;
              min-width: 356px;
              height: 52px;
              background: #fff;
              margin-top: 20px;
              cursor: pointer;
              .exhibitionItem {
                width: 100%;
                height: 100%;
                background: rgba($color: #c8d3db, $alpha: 0.32);
                display: flex;
                justify-content: space-between;
                .exhibitionCan {
                  display: flex;
                  span {
                    display: block;
                    width: 60px;
                    height: 52px;
                    background: #326b90;
                    color: #fff;
                    text-align: center;
                    line-height: 52px;
                  }
                  .exhibitionName {
                    margin-top: 4px;
                    margin-left: 10px;
                    line-height: 20px;
                    font-size: 12px;
                  }
                }
                .exhibitionTime {
                  display: flex;
                  height: 56px;
                  align-items: center;
                  margin-right: 10px;
                  span {
                    display: flex;
                    text-align: right;
                    align-items: center;
                    width: 90px;
                    height: 52px;
                    font-weight: bold;
                    font-size: 12px;
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
            width: 100px;
            .InterestListshare {
              width: 50px;
              height: 30px;
              text-align: center;
              line-height: 30px;
              color: #fff;
              background: #326b90;
              font-size: 10px;
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
          font-size: 16px;
          line-height: 24px;
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
    .enterpriseBoxBaner {
      width: 100%;
      max-width: 306px;
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
    }
  }
}
</style>
