<template>
  <div class="core">
    <div class="coreHeard">
      <div class="coreHeardLogo">
        <img :src="`${datalist.user.logoUrl}`" alt>
      </div>
      <div class="coreHeardName">
        <div class="coreHeardNameTop">
          <div class="coreName">
            <div class="coreNamehead">
              <span>{{datalist.user.name}}</span>
              <div>
                <p>普通会员</p>
                <p @click="toInfo">修改资料</p>
              </div>
            </div>
            <p>{{datalist.user.fansNumber}}位关注者</p>
            <p class="Industry">{{datalist.user.industryName}}</p>
          </div>
        </div>
        <div class="coreHeardNameBottom">
          <div class="follow"></div>
          <div class="over">
            <p>企业资料完成度{{this.$store.state.userData.Percent}}%</p>
            <div class="overBox">
              <div class="overBoxItem" :style="`width:${this.$store.state.userData.Percent}%;`"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="coreMain">
      <div class="coreAbout">
        <div class="coreAbouMover" :style="{height:Height}">
          <div class="coreAbouMoverTitle">
            <div class="coreAbouMoverTitleTop">
              <p>主要</p>
              <p>合作伙伴</p>
            </div>
            <div class="coreAbouMoverTitleBottom" @click="Close">关闭展开内容</div>
          </div>
          <div class="coreAbouMoverList">
            <p v-if="AllPartnerData.length == 0">暂无数据</p>
            <div class="coreAbouMoverItem" v-for="(item, index) in AllPartnerData" :key="index">
              <div class="coreAbouMoverItemImg" @click="toOthercore(item.id)">
                <img v-if="item.url" :src="item.url" alt>
                <img src="../../assets/images/home/foodlogo.png" alt v-else>
              </div>
              <p>{{item.name}}</p>
            </div>
            <div class="coreAbouMoverItem" v-if="Height == '100px'&& AllPartnerData.length > 5">
              <div class="coreAbouMoverItemBtn" @click="Open">展开</div>
            </div>
          </div>
        </div>
        <div class="coreAboutTop">
          <div class="coreAboutintroduction">
            <div class="coreAboutHead">关于我们</div>
            <div class="coreAboutText">{{datalist.user.summary}}</div>
            <div class="coreAboutHead">公司详情</div>
            <div class="coreAboutTtile">公司总部</div>
            <div class="coreAboutlist">{{datalist.user.address}}</div>
            <div class="coreAboutTtile">公司规模</div>
            <div class="coreAboutlist">
              <span v-if="datalist.user.member == 1">1-20</span>
              <span v-if="datalist.user.member == 2">21-100</span>
              <span v-if="datalist.user.member == 3">101-1000</span>
              <span v-if="datalist.user.member == 4">1000+</span>
              <span v-if="datalist.user.member == 5">10000+</span>
            </div>
            <div class="coreAboutTtile">专注领域</div>
            <div class="coreAboutlist">
              <span
                v-for="(item, index) in datalist.user.mainProcess"
                :key="index"
                v-show="item.key != '点击输入'"
              >{{item.key}}</span>
            </div>
            <div class="coreAboutTtile">联系人</div>
            <div class="coreAboutlist">{{datalist.user.linkman}}</div>
            <div class="coreAboutTtile">职位</div>
            <div class="coreAboutlist">
              <span v-if="datalist.user.member == 1">市场及销售</span>
              <span v-if="datalist.user.member == 2">采购</span>
              <span v-if="datalist.user.member == 3">管理</span>
              <span v-if="datalist.user.member == 4">技术</span>
              <span v-if="datalist.user.member == 5">生产及运营</span>
              <span v-if="datalist.user.member == 6">其他</span>
            </div>
            <div class="coreAboutTtile">联系电话</div>
            <div class="coreAboutlist">{{datalist.user.linkmanMobile}}</div>
            <div class="coreAboutTtile">联系邮箱</div>
            <div class="coreAboutlist">{{datalist.user.linkmanEmail}}</div>
          </div>
          <div class="coreAboutintroductionImg">
            <div class="coreAboutHead">核心竞争力</div>
            <div
              class="ItemImg"
              v-for="(item, index) in datalist.pictures"
              :key="index"
              @click="lookImg(index, item.id)"
            >
              <img :src="`${item.picture.url}`" alt>
            </div>
          </div>
        </div>
        <div class="coreAboutBottom">
          <div class="coreAboutBottomItem">
            <div class="homeListHead">
              <div class="homeListImg">
                <div>
                  <img :src="`${datalist.user.logoUrl}`" alt>
                </div>
              </div>
              <div class="homeListTitle">
                <div class="name">{{datalist.user.name}}</div>
                <div class="nameEN">{{datalist.user.fansNumber}}位关注者</div>
                <p class="industry">{{datalist.user.industryName}}</p>
                <div
                  class="exhibition"
                  v-if="datalist.exhibition"
                  @click="toExt(datalist.exhibition.id)"
                >
                  <div class="exhibitionItem">
                    <div class="exhibitionCan">
                      <span>已参与</span>
                      <div class="exhibitionName">
                        {{datalist.exhibition.nameEng}}
                        <br>
                        {{this.$store.state.userData.exhibitionOne.name}}
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
      <div class="coreAboutLeft">
        <AboutList :products="datalist.products" :interestedExhibitions="Exhibitions"></AboutList>
      </div>
    </div>
    <div class="ImgBox" v-if="imgBoxShow" @click="lookImg() ">
      <div class="ImgBoxImg ImgBoxImgLeft" @click.stop="lookImgLeft()">
        <img src="../../assets/images/left.png" alt>
      </div>
      <p>{{datalist.pictures[imgIndex].picture.description}}</p>
      <img :src="datalist.pictures[imgIndex].picture.url" alt>
      <div class="ImgBoxImg ImgBoxImgRight" @click.stop="lookImgRight()">
        <img src="../../assets/images/right.png" alt>
      </div>
    </div>
  </div>
</template>

<script>
import AboutList from "@/components/aboutList/aboutList.vue";
import {
  getCompanyInfo,
  viewPicture,
  getInfoPercent,
  getPartner,
  getAllPartner,
  ERR_OK
} from "@/api/api.js";

export default {
  name: "core",
  data() {
    return {
      imgBoxShow: false,
      imgList: "",
      mian: [],
      listMain: this.$store.state.userData.mainProcess,
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
          mainProcess: "",
          interestedExhibitions: ""
        }
      },
      Exhibitions: [],
      cooperationData: [],
      ind: 0,
      Height: "170px;",
      AllPartnerData: [],
      imgIndex: ""
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
    this._getCompanyInfo();
    getInfoPercent(this.$store.state.user.UserID).then(res => {
      if (res.status === ERR_OK) {
        this.$store.commit("SET_Percent", res.data.data);
      }
    });
    // this._getPartner(0);
    this._getAllPartner();
  },
  methods: {
    _getAllPartner() {
      getAllPartner(this.$store.state.user.UserID).then(res => {
        if (res.status === ERR_OK) {
          console.log("获取头像");
          this.AllPartnerData = res.data.data;
        }
      });
    },
    _getCompanyInfo() {
      getCompanyInfo(
        this.$store.state.user.UserID,
        this.$store.state.user.UserID
      ).then(res => {
        if (res.status === ERR_OK) {
          this.datalist = res.data.data;
          this.datalist.user.mainProcess = JSON.parse(
            this.datalist.user.mainProcess
          );
          this.Exhibitions = JSON.parse(
            this.datalist.user.interestedExhibitions
          );
        }
      });
    },
    // _getPartner(type) {
    //   getPartner(this.$store.state.user.UserID, type).then(res => {
    //     if (res.data.code === 0) {
    //       this.cooperationData = res.data.data;
    //       this.ind = 0;
    //       for (let i = 0; i < this.cooperationData.length; i++) {
    //         if (!this.cooperationData[i].user) {
    //           this.ind++;
    //         }
    //       }
    //     }
    //   });
    // },
    toMover(id) {
      this.$router.push({
        path: `/productList`,
        query: { id: id }
      });
    },
    toOthercore(id) {
      console.log(id);
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
    lookImg(index, id) {
      this.imgIndex = index;
      console.log(this.imgIndex);
      this.imgBoxShow = !this.imgBoxShow;
      viewPicture(id, this.$store.state.user.UserID).then(res => {
        if (res.data.code === 0) {
          console.log("查看成功");
        }
      });
    },
    lookImgLeft() {
      if (this.imgIndex === 0) {
        return;
      }
      this.imgIndex = this.imgIndex - 1;
      console.log(this.imgIndex);
    },
    lookImgRight() {
      if (this.imgIndex > this.datalist.pictures.length - 1) {
        return;
      }
      this.imgIndex = this.imgIndex + 1;
      console.log(this.imgIndex);
      console.log(this.datalist.pictures[this.imgIndex].picture.url);
    },
    toExt(id) {
      this.$router.push({
        path: `/exhibitionDetails`,
        query: { id: id }
      });
    },
    toInfo() {
      this.$router.push({
        name: `infoOne`,
        params: { id: this.$store.state.user.UserID }
      });
    }
  },
  components: {
    AboutList
  }
};
</script>

<style lang="scss" scoped>
.core {
  // padding: 30px 20px;
  // box-sizing: border-box;
  .coreHeard {
    padding: 30px 20px;
    box-sizing: border-box;
    display: flex;
    .coreHeardLogo {
      width: 170px;
      height: 170px;
      background: #fff;
      img {
        width: 100%;
      }
    }
    .coreHeardName {
      width: calc(100% - 170px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .coreHeardNameTop {
        display: flex;
        width: 100%;
        .coreName {
          width: 100%;
          padding-left: 30px;
          box-sizing: border-box;
          color: #fff;
          .coreNamehead {
            width: 100%;
            display: flex;
            justify-content: space-between;
            color: #fff;
            div {
              p {
                margin-top: 4px;
                color: #326b90;
              }
              p:nth-child(2) {
                cursor: pointer;
              }
            }
            span {
              font-size: 28px;
              font-weight: bold;
            }
          }
          .Industry {
            margin-top: 10px;
            color: #326b90;
          }
        }
      }
      .coreHeardNameBottom {
        padding-left: 30px;
        box-sizing: border-box;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: flex-end;
        .follow {
          height: 30px;
          width: 60px;
          // line-height: 30px;
          // text-align: center;
          // background: #000;
          // color: #fff;
          // cursor: pointer;
        }
        .over {
          p {
            width: 100%;
            text-align: right;
            font-size: 28px;
            color: #326b90;
            margin-bottom: 20px;
          }
          .overBox {
            width: 500px;
            height: 12px;
            background: #fff;
            .overBoxItem {
              height: 12px;
              background: #326b90;
            }
          }
        }
      }
    }
  }
  .coreMain {
    padding: 30px 20px;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    margin-top: 80px;
    .coreAbout {
      width: 60%;
      .coreAboutTop {
        width: 100%;
        height: 762px;
        box-sizing: border-box;
        display: flex;
      }
      .coreAboutBottom {
        width: 100%;
        .coreAboutBottomItem {
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
                font-size: 10px;
                margin-top: 10px;
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
      .coreAboutintroduction {
        width: 59%;
        height: 100%;
        overflow: auto;
        padding: 30px 20px;
        box-sizing: border-box;
        background: rgba($color: #648aa2, $alpha: 0.3);
        margin-right: 1%;
      }
      .coreAboutintroductionImg {
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
      .coreAboutHead {
        font-size: 26px;
        margin: 20px 0 30px;
      }
      .coreAboutText {
        font-size: 16px;
        line-height: 26px;
        margin: 10px 0;
      }
      .coreAboutTtile {
        font-size: 16px;
        line-height: 26px;
        font-weight: bold;
      }
      .coreAboutlist {
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
    .coreAboutLeft {
      width: 40%;
      min-width: 463px;
      padding-left: 30px;
      box-sizing: border-box;
    }
  }
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
    img {
      width: 45%;
    }
    p {
      font-size: 16px;
      margin-bottom: 20px;
      color: #fff;
    }
  }
}
</style>
