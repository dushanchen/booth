<template>
  <div class="othercore">
    <div class="othercoreHeard">
      <div class="othercoreHeardLogo">
        <img :src="`${datalist.user.logoUrl}`" alt>
      </div>
      <p class="name">{{datalist.user.name}}</p>
      <p class="fans">{{datalist.user.fansNumber}}关注者</p>
      <p class="industryName">{{datalist.user.industryName}}</p>
      <div class="btn" v-if="datalist.isConcerned === 2" @click="followId(datalist.user.id)">+ 关注</div>
      <div
        class="btn"
        v-if="datalist.isConcerned === 1"
        @click="cancelfollowId(datalist.user.id)"
      >已关注</div>
      <p style="margin-top:10px; text-align:center;" v-if="datalist.user.isRegister == 1">
        这是我公司页面，我需要添加/修改内容，
        <br>如需协助请致电400-9018-021
      </p>
    </div>
    <div class="othercoreMain">
      <div class="othercoreAbout">
        <div class="coreAbouMover" :style="{height:Height}">
          <div class="coreAbouMoverTitle">
            <div class="coreAbouMoverTitleTop">
              <p>主要</p>
              <p>合作伙伴</p>
            </div>
            <div class="coreAbouMoverTitleBottom" @click="Close">关闭展开内容</div>
          </div>
          <div class="coreAbouMoverList">
            <p v-if="AllPartnerData.length  == 0">暂无数据</p>
            <div class="coreAbouMoverItem" v-for="(item, index) in AllPartnerData" :key="index">
              <div class="coreAbouMoverItemImg" @click="toOthercore(item.id)">
                <img v-if="item.url" :src="item.url" alt>
                <img src="../../assets/images/home/foodlogo.png" alt v-else>
              </div>
              <p>{{item.name}}</p>
            </div>
            <div class="coreAbouMoverItem" v-if="Height == '100px'&& AllPartnerData.length  > 5">
              <div class="coreAbouMoverItemBtn" @click="Open">展开</div>
            </div>
          </div>
        </div>
        <div class="othercoreAboutTop">
          <div class="othercoreAboutintroduction">
            <div class="othercoreAboutHead">关于我们</div>
            <div class="othercoreAboutText">{{datalist.user.summary}}</div>
            <div class="othercoreAboutHead">公司详情</div>
            <div class="othercoreAboutTtile">公司总部</div>
            <div class="othercoreAboutlist">{{datalist.user.address}}</div>
            <div class="othercoreAboutTtile">公司规模</div>
            <div class="othercoreAboutlist">
              <span v-if="datalist.user.member == 1">1-20</span>
              <span v-if="datalist.user.member == 2">21-100</span>
              <span v-if="datalist.user.member == 3">101-1000</span>
              <span v-if="datalist.user.member == 4">1000+</span>
              <span v-if="datalist.user.member == 5">10000+</span>
            </div>
            <div class="othercoreAboutTtile">专注领域</div>
            <div class="othercoreAboutlist">
              <span
                v-for="(item, index) in datalist.user.mainProcess"
                :key="index"
                v-show="item.key != '点击输入'"
              >{{item.key}}</span>
            </div>
            <div class="othercoreAboutTtile">联系人</div>
            <div class="othercoreAboutlist">{{datalist.user.linkman}}</div>
            <div class="othercoreAboutTtile">职位</div>
            <div class="othercoreAboutlist">
              <span v-if="datalist.user.member == 1">市场及销售</span>
              <span v-if="datalist.user.member == 2">采购</span>
              <span v-if="datalist.user.member == 3">管理</span>
              <span v-if="datalist.user.member == 4">技术</span>
              <span v-if="datalist.user.member == 5">生产及运营</span>
              <span v-if="datalist.user.member == 6">其他</span>
            </div>
            <div class="othercoreAboutTtile">联系电话</div>
            <div class="othercoreAboutlist">{{datalist.user.linkmanMobile}}</div>
            <div class="othercoreAboutTtile">联系邮箱</div>
            <div class="othercoreAboutlist">{{datalist.user.linkmanEmail}}</div>
          </div>
          <div class="othercoreAboutintroductionImg">
            <div class="othercoreAboutHead">核心竞争力</div>

            <div
              class="ItemImg"
              v-for="(item, index) in datalist.pictures"
              :key="index"
              @click="lookImg(index, item.picture.id, item.isCollected)"
            >
              <img :src="`${item.picture.url}`" alt>
            </div>
          </div>
        </div>
        <div class="othercoreAboutBottom">
          <div class="othercoreAboutBottomItem">
            <div class="homeListHead">
              <div class="homeListImg">
                <div>
                  <img :src="`${datalist.user.logoUrl}`" alt>
                </div>
                <div
                  class="follow"
                  v-if="datalist.isConcerned === 2"
                  @click="followId(datalist.user.id)"
                >+ 关注</div>
                <div
                  class="follow"
                  v-if="datalist.isConcerned === 1"
                  @click="cancelfollowId(datalist.user.id)"
                >已关注</div>
              </div>
              <div class="homeListTitle">
                <div class="name">{{datalist.user.name}}</div>
                <div class="nameEN">{{datalist.user.fansNumber}}位关注者</div>
                <p class="industry">{{datalist.user.industryName}}</p>
                <div
                  class="exhibition"
                  v-if="datalist.exhibition !== null"
                  @click="toExt(datalist.exhibition.id)"
                >
                  <div class="exhibitionItem">
                    <div class="exhibitionCan">
                      <span>已参与</span>
                      <div class="exhibitionName">
                        {{datalist.exhibition.nameEng}}
                        <br>
                        {{datalist.exhibition.name}}
                      </div>
                    </div>
                    <div class="exhibitionTime">
                      <span>{{datalist.exhibition.date}}</span>
                      <div class="exhibitionDetali">
                        <i class="icon iconTo"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="enterpriseItemRight">
                <div class="InterestListshare" @click="copyUrl(datalist.user.id)">分享</div>
                <div class="InterestListSee" @click="toMover(datalist.user.id)">查看产品手册</div>
              </div>
            </div>
            <div class="hometext">{{datalist.user.summary}}</div>
            <!-- <div class="moveBtn">更多</div> -->
            <div class="homeItemImg">
              <img :src="`${datalist.user.introductionUrl}`" alt>
            </div>
          </div>
        </div>
      </div>
      <div class="othercoreAboutLeft">
        <AboutItem
          :products="datalist.products"
          :id="this.$route.query.id"
          :interestedExhibitions="Exhibitions"
        ></AboutItem>
      </div>
    </div>
    <div class="ImgBox" v-if="imgBoxShow" @click="quxiao">
      <div class="ImgBoxImg ImgBoxImgLeft" @click.stop="lookImgLeft()">
        <img src="../../assets/images/left.png" alt>
      </div>
      <!-- <img :src="imgList" alt> -->
      <p>{{datalist.pictures[imgIndex].picture.description}}</p>
      <img :src="datalist.pictures[imgIndex].picture.url" alt>
      <div class="ImgBoxImg ImgBoxImgRight" @click.stop="lookImgRight()">
        <img src="../../assets/images/right.png" alt>
      </div>
      <div v-if="isCollected == 1" @click.stop="_cancelCollection()">已收藏</div>
      <div v-if="isCollected == 2" @click.stop="_collection()">收藏</div>
    </div>
  </div>
</template>

<script>
import AboutItem from "@/components/aboutList/aboutItem.vue";
import {
  getCompanyInfo,
  focus,
  cancelFocus,
  viewPicture,
  collection,
  cancelCollection,
  getPartner,
  getAllPartner,
  ERR_OK
} from "@/api/api.js";

export default {
  name: "othercore",
  data() {
    return {
      imgBoxShow: false,
      imgList: "",
      isCollected: "",
      mian: [],
      followData: {
        userId: "",
        concernedId: ""
      },
      datalist: {
        exhibition: {
          id: "",
          name: "",
          nameEng: "",
          date: ""
        },
        isConcerned: "",
        pictures: [],
        products: [],
        user: {
          address: "",
          id: "",
          industryName: "",
          logoUrl: "",
          summary: "",
          introductionUrl: "",
          fansNumber: "",
          name: "",
          isRegister: "",
          mainProcess: [],
          interestedExhibitions: ""
        }
      },
      Exhibitions: [],
      collectionData: {
        otherId: "",
        type: 2,
        userId: this.$store.state.user.UserID
      },
      cooperationData: [],
      ind: 0,
      Height: "100px;",
      AllPartnerData: [],
      imgIndex: 0
    };
  },
  created() {
    // if (!this.$store.state.user.UserID) {
    //   this.$router.push({
    //     name: `loginList`,
    //   });
    //   return
    // }
    window.scrollTo(0, 0);
    this._getCompanyInfo();
    this._getPartner(0);
    this._getAllPartner();
  },
  methods: {
    _getAllPartner() {
      getAllPartner(this.$route.query.id).then(res => {
        if (res.status === ERR_OK) {
          this.AllPartnerData = res.data.data;
        }
      });
    },
    _collection() {
      collection(this.collectionData).then(res => {
        if (res.status === ERR_OK) {
          this.isCollected = 1;
          this._getCompanyInfo();
        }
      });
    },
    _getPartner(type) {
      getPartner(this.$store.state.user.UserID, type).then(res => {
        if (res.data.code === 0) {
          this.cooperationData = res.data.data;
          this.ind = 0;
          for (let i = 0; i < this.cooperationData.length; i++) {
            if (!this.cooperationData[i].user) {
              this.ind++;
            }
          }
        }
      });
    },
    _cancelCollection() {
      console.log(this.collectionData);
      cancelCollection(this.collectionData).then(res => {
        if (res.status === ERR_OK) {
          this.isCollected = 2;
          this._getCompanyInfo();
        }
      });
    },
    _getCompanyInfo() {
      getCompanyInfo(this.$store.state.user.UserID, this.$route.query.id).then(
        res => {
          if (res.status === ERR_OK) {
            this.datalist = res.data.data;
            this.Exhibitions = JSON.parse(
              this.datalist.user.interestedExhibitions
            );
            this.datalist.user.mainProcess = JSON.parse(
              this.datalist.user.mainProcess
            );
          }
        }
      );
    },
    _focus() {
      focus(this.followData).then(res => {
        if (res.status === ERR_OK) {
          this._getCompanyInfo();
        }
      });
    },
    _cancelFocus() {
      cancelFocus(this.followData).then(res => {
        if (res.status === ERR_OK) {
          this._getCompanyInfo();
        }
      });
    },
    toOthercore(id) {
      if (id) {
        this.$router.push({
          path: `/othercore`,
          query: { id: id }
        });
      }
    },
    Open() {
      this.Height = "680px";
    },
    Close() {
      this.Height = "170px";
    },
    quxiao() {
      this.imgBoxShow = false;
    },
    copyUrl(id) {
      // var clipBoardContent = "";
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
    lookImg(index, id, isCollected) {
      this.imgBoxShow = !this.imgBoxShow;
      this.imgIndex = index;
      this.isCollected = isCollected;
      this.collectionData.otherId = id;
      viewPicture(id, this.$store.state.user.UserID).then(res => {
        if (res.data.code === 0) {
        }
      });
    },
    lookImgLeft() {
      if (this.imgIndex === 0) {
        return;
      }
      this.imgIndex = this.imgIndex - 1;
      this.isCollected = this.datalist.pictures[this.imgIndex].isCollected;
      this.collectionData.otherId = this.datalist.pictures[
        this.imgIndex
      ].picture.id;
      viewPicture(
        this.collectionData.otherId,
        this.$store.state.user.UserID
      ).then(res => {
        if (res.data.code === 0) {
        }
      });
    },
    lookImgRight() {
      this.imgIndex = this.imgIndex + 1;
      if (this.imgIndex > this.datalist.pictures.length - 1) {
        return;
      }
      this.isCollected = this.datalist.pictures[this.imgIndex].isCollected;
      this.collectionData.otherId = this.datalist.pictures[
        this.imgIndex
      ].picture.id;
      viewPicture(
        this.collectionData.otherId,
        this.$store.state.user.UserID
      ).then(res => {
        if (res.data.code === 0) {
        }
      });
    },
    toExt(id) {
      this.$router.push({
        path: `/exhibitionDetails`,
        query: { id: id }
      });
    },
    toMover(id) {
      this.$router.push({
        path: `/productList`,
        query: { id: id }
      });
    },
    followId(id) {
      if (this.$store.state.user.UserID) {
        this.followData.userId = this.$store.state.user.UserID;
        this.followData.concernedId = id;
        this._focus();
      } else {
        alert("请登录");
      }
    },
    cancelfollowId(id) {
      if (this.$store.state.user.UserID) {
        this.followData.userId = this.$store.state.user.UserID;
        this.followData.concernedId = id;
        this._cancelFocus();
      } else {
        alert("请登录");
      }
    }
  },
  components: {
    AboutItem
  }
};
</script>

<style lang="scss" scoped>
.othercore {
  .ImgBox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba($color: #000000, $alpha: 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .ImgBoxImg {
      width: 30px;
      height: 70px;
      margin: 0 100px;
      position: absolute;
      border: none;
      cursor: pointer;
      img {
        width: 100%;
      }
      // position: absolute;
    }
    .ImgBoxImgLeft {
      position: absolute;
      border: none;
      left: 0;
    }
    .ImgBoxImgRight {
      position: absolute;
      border: none;
      right: 0;
    }
    div {
      border: 1px solid red;
      color: red;
      margin-top: 30px;
      padding: 6px 30px;
      cursor: pointer;
    }
    img {
      width: 40%;
    }
    p {
      font-size: 16px;
      margin-bottom: 20px;
      color: #fff;
    }
  }
  .othercoreHeard {
    width: 100%;
    height: 256px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    .othercoreHeardLogo {
      width: 66px;
    }
    .name {
      font-size: 24px;
      font-weight: bold;
      margin: 20px 0 4px;
    }
    .fans {
      font-size: 12px;
      margin-bottom: 10px;
    }
    .industryName {
      font-size: 10px;
      margin-bottom: 10px;
    }
    .btn {
      width: 80px;
      height: 24px;
      background: #fff;
      color: #000;
      text-align: center;
      line-height: 24px;
      cursor: pointer;
    }
  }
  .othercoreMain {
    padding: 30px 20px;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    margin-top: 80px;
    .othercoreAbout {
      width: 60%;
      .othercoreAboutTop {
        width: 100%;
        height: 762px;
        box-sizing: border-box;
        display: flex;
      }
      .othercoreAboutBottom {
        width: 100%;
        .othercoreAboutBottomItem {
          width: 100%;
          background: #fff;
          padding: 20px;
          margin: 10px 0;
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
                width: 90%;
                min-width: 356px;
                height: 52px;
                background: #fff;
                margin-top: 20px;
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
            height: auto;
            img {
              width: 100%;
            }
          }
        }
      }
      .othercoreAboutintroduction {
        width: 59%;
        height: 100%;
        overflow: auto;
        padding: 30px 20px;
        box-sizing: border-box;
        background: rgba($color: #648aa2, $alpha: 0.3);
        margin-right: 1%;
      }
      .othercoreAboutintroductionImg {
        padding: 30px 20px;
        width: 40%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        background: rgba($color: #326b90, $alpha: 0.6);
        .ItemImg {
          width: 32%;
          margin-right: 1%;
          float: left;
          height: 100px;
          overflow: hidden;
          box-sizing: border-box;
          margin-bottom: 5px;
        }
      }
      .othercoreAboutHead {
        font-size: 26px;
        margin: 20px 0 30px;
      }
      .othercoreAboutText {
        font-size: 16px;
        line-height: 26px;
        margin: 10px 0;
      }
      .othercoreAboutTtile {
        font-size: 16px;
        line-height: 26px;
        font-weight: bold;
      }
      .othercoreAboutlist {
        font-size: 16px;
        line-height: 26px;
        margin: 4px 0;
        span {
          margin-right: 20px;
        }
      }
      .coreAbouMover {
        width: 100%;
        height: 170px;
        // height: 100px;
        overflow: hidden;
        display: flex;
        border-radius: 20px;
        border: 2px solid #fff;
        margin-bottom: 20px;
        .coreAbouMoverTitle {
          width: 150px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .coreAbouMoverTitleTop {
            padding: 20px;
            width: 150px;
            font-size: 26px;
            box-sizing: border-box;
            p {
              font-weight: bold;
            }
          }
          .coreAbouMoverTitleBottom {
            width: 85px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            margin-left: 20px;
            margin-bottom: 20px;
            font-size: 10px;
            font-weight: bold;
            box-sizing: border-box;
            background: rgba(100, 138, 162, 1);
            cursor: pointer;
            margin-top: 120px;
          }
        }
        .coreAbouMoverList {
          height: 100%;
          overflow: auto;
          width: calc(100% - 130px);
          p {
            height: 100px;
            line-height: 100px;
          }
          .coreAbouMoverItem {
            width: 16%;
            float: left;
            .coreAbouMoverItemImg {
              width: 80px;
              height: 80px;
              padding: 20px;
              box-sizing: border-box;
              // margin: 10px;
              margin: 10px auto;
              border-radius: 50px;
              border: 1px solid #326b90;
              background: #326b90;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                width: 50%;
              }
            }
            p {
              height: auto;
              width: 100%;
              line-height: 20px;
              padding: 0 10px;
              box-sizing: border-box;
              text-align: center;
            }
          }

          .coreAbouMoverItemBtn {
            width: 80px;
            height: 80px;
            line-height: 80px;
            text-align: center;
            // padding: 20px;
            font-size: 18px;
            font-weight: bold;
            box-sizing: border-box;
            margin: 10px auto;
            border-radius: 50px;
            background: #326b90;
            cursor: pointer;
          }
        }
      }
    }
    .othercoreAboutLeft {
      width: 40%;
      min-width: 463px;
      padding-left: 30px;
      box-sizing: border-box;
    }
  }
}
</style>
