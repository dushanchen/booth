<template>
  <div class="searchPag">
    <div class="searchNav">
      <div class="searchList">
        <div class="searchItem" @click="toCompany">
          <div>
            <span>企业</span>
            <span>{{searchList.companyNum}}个</span>
          </div>
        </div>
        <div class="searchItem" @click="toExhibition">
          <div>
            <span>展会</span>
            <span>{{searchList.exhibitionNum}}个</span>
          </div>
        </div>
        <div class="searchItem" @click="toEvent">
          <div>
            <span>企业动态</span>
            <span>{{searchList.eventNum}}个</span>
          </div>
        </div>
        <div class="searchItem" @click="toBrochure">
          <div>
            <span>产品手册</span>
            <span>{{searchList.brochureNum}}个</span>
          </div>
        </div>
        <div class="searchItem" @click="toImages">
          <div>
            <span>产品图片</span>
            <span>{{searchList.imageNum}}个</span>
          </div>
        </div>
      </div>
      <div class="searchText">
        <p>{{center}}</p>
        <p>相关搜索结果</p>
      </div>
    </div>
    <div class="searchAll">
      <div class="searchMine">
        <div class="searchMineTop">
          <div class="searchTitle">
            <span>展会 exhibition</span>
            <div class="mover" @click="toExhibition">
              <i class="icon iconTo1"></i>
            </div>
          </div>
          <div class="exhibitionList" v-if="searchList.exhibitionNum === 0">暂无数据</div>
          <div class="exhibitionList">
            <div
              class="exhibitionItem"
              v-for="(item, index) in searchList.exhibitions"
              :key="index"
              @click="toDetailsOne(item.id)"
            >
              <div class="exhibitionItemImg">
                <img :src="`${item.bannerUrl.split(',')[0]}`" alt />
              </div>
              <div class="exhibitionItemName">{{item.nameEng}} {{item.name}}</div>
            </div>
          </div>
        </div>
        <div class="searchMineBottom">
          <div class="searchTitle">
            <span>产品手册 brochure</span>
            <div class="mover" @click="toBrochure">
              <i class="icon iconTo1"></i>
            </div>
          </div>
          <div class="brochureList" v-if="searchList.brochureNum === 0">暂无数据</div>
          <div class="brochureList">
            <div class="brochureItem" v-for="(item, index) in searchList.brochures" :key="index">
              <div class="brochureItemImg" @click="lookbrochure(item.pdfUrl, item.id)">
                <img :src="`${item.coverUrl}`" alt />
              </div>
              <div class="brochureItemText">
                <div class="brochureItemHead">
                  <div class="brochureItemName">
                    <div class="brochureItemLogo" @click="toOthercore(item.id)" v-if="item.logoUrl">
                      <img :src="`${item.logoUrl}`" alt />
                    </div>
                    <div class="brochureLogoName">
                      <p @click="toOthercore(item.id)">{{item.name}}</p>
                      <p>{{item.fansNumber}}关注者</p>
                      <p>{{item.industryName}}</p>
                    </div>
                  </div>
                  <div class="brochureItemNum">阅读量 {{item.readVolume}}</div>
                </div>
                <div class="brochureItemmanual">
                  <p>{{item.title}}</p>
                  <div class="label">
                    <span
                      v-for="(item, num) in item.label.split(',')"
                      :key="num"
                      v-show="item"
                    >{{item}}</span>
                  </div>
                  <div class="brochureintroduce">{{item.summary}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="searchRight">
        <div class="searchRightTop">
          <div class="searchTitle">
            <span>企业 company</span>
            <div class="mover" @click="toCompany">
              <i class="icon iconTo1"></i>
            </div>
          </div>
          <div class="companyList" v-if="searchList.companyNum === 0">暂无数据</div>
          <div class="companyList">
            <div class="companyItem" v-for="(item, index) in searchList.companies" :key="index">
              <div class="enterpriseItemLeft">
                <div class="enterpriseItemHead" @click="toOthercore(item.id)">
                  <img :src="`${item.logoUrl}`" alt />
                </div>
                <div class="enterpriseItemLeftTitle">
                  <p @click="toOthercore(item.id)">{{item.name}}</p>
                  <p>{{item.fansNumber}}位关注者</p>
                  <p>{{item.industryName}}</p>
                </div>
              </div>
              <div class="enterpriseItemRight">
                <div class="InterestListshare" @click="copyUrl(item.id)">分享</div>
                <div class="InterestListSee" @click="toBrochureList(item.id)">查看产品手册</div>
              </div>
            </div>
          </div>
        </div>
        <div class="searchRightmian">
          <div class="searchTitle">
            <span>产品图片 images</span>
            <div class="mover" @click="toImages">
              <i class="icon iconTo1"></i>
            </div>
          </div>
          <div class="searchimagesList" v-if="searchList.imageNum === 0">暂无数据</div>
          <div class="searchimagesList">
            <div
              class="searchimagesItem"
              v-for="(item, index) in searchList.images"
              :key="index"
              @click="showboxBigImg(index)"
            >
              <img :src="`${item.url}`" alt />
            </div>
          </div>
        </div>
        <div class="searchRightBottom">
          <div class="searchTitle">
            <span>企业动态 event</span>
            <div class="mover" @click="toEvent">
              <i class="icon iconTo1"></i>
            </div>
          </div>
          <div class="eventList" v-if="searchList.eventNum === 0">暂无数据</div>
          <div class="eventList">
            <div class="eventItem" v-for="(item, index) in searchList.events" :key="index">
              <div class="homeListHead">
                <div class="homeListImg">
                  <div @click="toOthercore(item.id)">
                    <img :src="`${item.logoUrl}`" alt />
                  </div>
                </div>
                <div class="homeListTitle">
                  <div class="name" @click="toOthercore(item.id)">{{item.name}}</div>
                  <div class="nameEN">{{item.fansNumber}}关注者</div>
                  <p class="industry">{{item.industryName}}</p>
                </div>
                <div class="enterpriseItemRight">
                  <div class="InterestListshare" @click="copyUrl(item.id)">分享</div>
                  <div class="InterestListSee" @click="toBrochureList(item.id)">查看产品手册</div>
                </div>
              </div>
              <div class="hometext">{{item.summary}}</div>
              <!-- <div class="moveBtn" @click="toOthercore(item.id)">更多</div> -->
              <div class="homeItemImg">
                <img :src="`${item.introductionUrl}`" alt />
              </div>
            </div>
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
    <div class="boxLoing" v-if="showBoxTwo">
      <p>抱歉您所搜索的内容尚未入住Booth商博，</p>
      <p>请尝试通过行业搜索类似内容</p>
      <div>
        <span @click="quxiao">关闭</span>
      </div>
    </div>
    <div class="ImgBox" v-if="imgBoxShow" @click="showboxBigImg() ">
      <div class="ImgBoxImg ImgBoxImgLeft" @click.stop="lookImgLeft()">
        <img src="../../assets/images/left.png" alt />
      </div>
      <p>{{searchList.images[imgIndex].description}}</p>
      <img :src="searchList.images[imgIndex].url" alt style="height:80vh"/>
      <div class="ImgBoxImg ImgBoxImgRight" @click.stop="lookImgRight()">
        <img src="../../assets/images/right.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
import { search, getProductById } from "@/api/api.js";
export default {
  name: "searchPag",
  data() {
    return {
      showBox: false,
      showBoxTwo: false,
      imgBoxShow: false,

      center: "",
      searchList: {
        brochureNum: "", // 册子
        companyNum: "", // 公司
        eventNum: "", // 动态
        exhibitionNum: "", // 展会
        imageNum: "", // 图片
        brochures: [],
        companies: [],
        events: [],
        exhibitions: [],
        images: []
      },
      imgIndex:'' 
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.center = this.$route.query.center;
    console.log(this.$route.query.center);
    this._search();
  },
  methods: {
    _search(val) {
      if (val) {
        console.log(val);
        this.center = val;
      }
      search(this.center).then(res => {
        if (res.data.code === 0) {
          this.searchList = res.data.data;
          if (
            this.searchList.companyNum === 0 &&
            this.searchList.exhibitionNum === 0 &&
            this.searchList.eventNum === 0 &&
            this.searchList.brochureNum === 0 &&
            this.searchList.imageNum === 0
          ) {
            console.log("213");
            this.showBoxTwo = true;
          }
        }
      });
    },
    showboxBigImg(index, id) {
      this.imgIndex = index;
      console.log(this.imgIndex);
      this.imgBoxShow = !this.imgBoxShow;
      // viewPicture(id, this.$store.state.user.UserID).then(res => {
      //   if (res.data.code === 0) {
      //     console.log("查看成功");
      //   }
      // });
    },
    lookImgLeft() {
      if (this.imgIndex === 0) {
        return;
      }
      this.imgIndex = this.imgIndex - 1;
    },
    lookImgRight() {
      if (this.imgIndex > this.searchList.images.length - 1) {
        return;
      }
      this.imgIndex = this.imgIndex + 1;
    },
    lookbrochure(url, id) {
      if (!this.$store.state.user.UserID) {
        this.showBox = true;
      } else {
        getProductById(id, this.$store.state.user.UserID).then(res => {
          if (res.data.code === 0) {
            console.log("查看成功");
          }
        });
      }
      window.open(url, "_blank");
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
    toDetailsOne(id) {
      if (!this.$store.state.user.UserID) {
        this.showBox = true;
      } else {
        this.$router.push({
          path: `/exhibitionDetails`,
          query: { id: id }
        });
      }
    },
    toBrochureList(id) {
      if (!this.$store.state.user.UserID) {
        this.showBox = true;
      } else {
        this.$router.push({
          name: `productList`,
          query: { id: id }
        });
      }
    },
    toExhibition() {
      // if (!this.$store.state.user.UserID) {
      //   this.showBox = true;
      // } else {
      this.$router.push({
        name: `searchExhibition`,
        query: {
          center: this.center
        }
      });
      // }
    },
    toBrochure() {
      if (!this.$store.state.user.UserID) {
        this.showBox = true;
      } else {
        this.$router.push({
          name: `searchBrochure`,
          query: {
            center: this.center
          }
        });
      }
    },
    toCompany() {
      if (!this.$store.state.user.UserID) {
        this.showBox = true;
      } else {
        this.$router.push({
          name: `searchCompaby`,
          query: {
            center: this.center
          }
        });
      }
    },
    toImages() {
      if (!this.$store.state.user.UserID) {
        this.showBox = true;
      } else {
        this.$router.push({
          name: `searchImages`,
          query: {
            center: this.center
          }
        });
      }
    },
    toEvent() {
      if (!this.$store.state.user.UserID) {
        this.showBox = true;
      } else {
        this.$router.push({
          name: `searchEvent`,
          query: {
            center: this.center
          }
        });
      }
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
    tologinList() {
      this.$router.push({
        name: `loginList`
      });
    },
    quxiao() {
      this.showBox = false;
      this.showBoxTwo = false;
    }
  }
};
</script>

<style lang="scss">
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
.searchPag {
  width: 100%;
  height: calc(100vh - 218px);
  min-height: 585px;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  .searchNav {
    width: 184px;
    height: 100%;
    .searchItem {
      width: 100%;
      height: 54px;
      background: #fff;
      margin-bottom: 6px;
      cursor: pointer;
      div {
        width: 100%;
        height: 100%;
        background: rgba($color: #326b90, $alpha: 0.2);
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
      }
    }
    .searchText {
      margin-top: 140px;
      text-align: center;
    }
  }
  .searchAll {
    width: calc(100% - 184px);
    height: 100%;
    display: flex;
    .searchTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      span {
        font-size: 18px;
        font-weight: bold;
      }
      .mover {
        width: 24px;
        height: 24px;
        background: #326b90;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
    .searchMine {
      width: calc(50% - 10px);
      height: 100%;
      margin-left: 10px;
      .searchMineTop {
        width: 100%;
        height: calc(45% - 10px);
        background: #f2f2f2;
        margin-bottom: 10px;
        padding: 16px 24px 0;
        box-sizing: border-box;
        overflow: auto;
        .exhibitionItem {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          cursor: pointer;
          .exhibitionItemImg {
            width: 45%;
            img {
              width: 100%;
            }
          }
          .exhibitionItemName {
            width: 35%;
            line-height: 26px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
          }
        }
      }
      .searchMineBottom {
        width: 100%;
        height: 55%;
        background: #f2f2f2;
        padding: 16px 24px 0;
        box-sizing: border-box;
        overflow: auto;
        .brochureItem {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          .brochureItemImg {
            width: 162px;
            height: 210px;
            background: #fff;
            img {
              height: 100%;
            }
          }
          .brochureItemText {
            width: calc(100% - 182px);
            margin-left: 20px;
            background: #f2f2f2;
            .brochureItemName {
              display: flex;
              .brochureItemLogo {
                width: 88px;
                cursor: pointer;
              }
              .brochureLogoName {
                margin-left: 10px;
                p:nth-child(1) {
                  margin-top: 4px;
                  font-weight: bold;
                }
                p:nth-child(2) {
                  margin-top: 6px;
                }
                p:nth-child(3) {
                  color: #326b90;
                  font-weight: bold;
                  font-size: 12px;
                  margin-top: 6px;
                }
              }
            }
            .brochureItemHead {
              display: flex;
              justify-content: space-between;
              .brochureItemNum {
                font-weight: bold;
                font-size: 10px;
              }
            }
            .brochureItemmanual {
              p {
                font-size: 16px;
                margin: 6px 0;
              }
              .label {
                span {
                  display: inline-block;
                  font-size: 10px;
                  padding: 4px;
                  text-align: center;
                  margin-right: 4px;
                  background: rgba($color: #000000, $alpha: 0.2);
                  color: #fff;
                }
              }
              .brochureintroduce {
                width: 100%;
                height: 80px;
                line-height: 20px;
                background: rgba($color: #000000, $alpha: 0.2);
                margin-top: 10px;
                padding: 0 4px;
                box-sizing: border-box;
                font-size: 14px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 4;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
    .searchRight {
      width: calc(50% - 10px);
      height: 100%;
      margin-left: 10px;
      .searchRightTop {
        width: 100%;
        height: calc(35% - 10px);
        background: #f2f2f2;
        margin-bottom: 10px;
        padding: 16px 24px 0;
        box-sizing: border-box;
        overflow: auto;
        .companyList {
          display: flex;
          flex-wrap: wrap;
          .companyItem {
            width: 49%;
            margin-right: 1%;
            height: 66px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            .enterpriseItemLeft {
              display: flex;
              height: 100%;
              .enterpriseItemHead {
                width: 66px;
                cursor: pointer;
              }
              .enterpriseItemLeftTitle {
                height: 100%;
                margin-left: 10px;
                p:nth-child(1) {
                  font-weight: bold;
                }
                p:nth-child(2) {
                  font-size: 14px;
                  margin-top: 10px;
                }
                p:nth-child(3) {
                  font-size: 10px;
                  margin-top: 6px;
                  color: #326b90;
                }
              }
            }
            .enterpriseItemRight {
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
              }
              .InterestListSee {
                width: 80px;
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
      }
      .searchRightmian {
        width: 100%;
        height: calc(40% - 10px);
        background: #f2f2f2;
        margin-bottom: 10px;
        padding: 16px 24px 0;
        box-sizing: border-box;
        overflow: auto;
        .searchimagesList {
          display: flex;
          flex-wrap: wrap;
          .searchimagesItem {
            width: 90px;
            height: 90px;
            background: #fff;
            margin-right: 10px;
            margin-bottom: 10px;
            cursor: pointer;
          }
        }
      }
      .searchRightBottom {
        width: 100%;
        height: 25%;
        background: #f2f2f2;
        padding: 16px 24px 0;
        box-sizing: border-box;
        overflow: auto;
        .eventList {
          .eventItem {
            width: 100%;
            margin-bottom: 20px;
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
                  height: 52px;
                  background: #fff;
                  margin-top: 20px;
                  .exhibitionItem {
                    width: 100%;
                    height: 100%;
                    background: rgba($color: #c8d3db, $alpha: 0.32);
                    display: flex;
                    justify-content: space-between;
                    // cursor: pointer;
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
                        width: 130px;
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
      }
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
