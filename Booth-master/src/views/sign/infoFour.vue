<template>
  <div class="signDetails">
    <div class="signBgTwo">
      <div class="signBgInfoLog">
        <div class="infoLog" @click="tohome">
          <img src="../../assets/images/home/logo.png" alt>
        </div>
        <div class="infoLog">
          <p>入驻booth</p>
          <p>目前只开放企业用户注册</p>
        </div>
      </div>
      <div class="signBgMain">
        <div class="signBgMainLeft">
          <div class="signBgMainList" @click="toOne">基础信息</div>
          <div class="signBgMainList" @click="toTwo">行业及商业伙伴</div>
          <div class="signBgMainList" @click="toThree">核心竞争力</div>
          <div class="signBgMainList ListAct" @click="toFour">形象展示</div>
          <div class="signBgMainList" @click="toFive">信息核对</div>
        </div>
        <div class="signBgMainRight">
          <div class="signBgFourMainList">
            <div class="signBgFourLogo">
              <div class="signBgFourLogoP">企业Logo</div>
              <div class="signBgFourLogoImg">
                <label for="upOneTop">
                  <span v-if="!logoImg">+</span>
                  <img :src="logoImg" alt v-else>
                </label>
                <input @change="upOneImg" type="file" id="upOneTop" value="图片上传预览" multiple>
              </div>
              <div class="signBgFourLogoP">公司介绍页</div>
              <div class="signBgFourLogoImg">
                <label for="upTwoTop">
                  <span v-if="!introduceImg">+</span>
                  <img :src="introduceImg" alt v-else>
                </label>
                <input @change="upTwoImg" type="file" id="upTwoTop" value="图片上传预览" multiple>
              </div>
            </div>
            <div class="signBgFourproduct">
              <div class="signBgFourHeard">
                产品手册展示
                <span @click="show">+</span>
              </div>
              <div class="signBgFourproductList">
                <div class="brochureItem" v-for="(item, index) in AllProducts" :key="index">
                  <div class="brochureItemImg" @click="topreview(item.pdfUrl)">
                    <img :src="item.coverUrl" alt>
                  </div>
                  <div class="brochureItemText">
                    <div class="brochureItemmanual">
                      <div class="brochureItemmanualHead">
                        <span>{{item.title}}</span>
                        <div class="icon iconDel" @click="delList(item.id)"></div>
                      </div>
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
              <div class="brochureItemBtn" @click="Design(1)">我要设计</div>
            </div>
          </div>
          <div class="signBgMainFootTwo">
            <span @click="toBack">上一页</span>
            <div>
              <span @click="preservation">保存并返回到首页</span>
              <span @click="toNext">下一页</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="UpproductBox" v-if="showUp">
      <UpProduct v-on:clicehide="clicehide"></UpProduct>
    </div>
    <div class="SubmissionBox" v-if="SubmissionBox" @click="Design">您的设计需求已提交，我们的品牌架构师会主动与您取得联系！</div>
  </div>
</template>

<script>
import {
  addUserInfo,
  getAllProducts,
  deleteProduct,
  needDesign,
  ERR_OK
} from "@/api/api.js";
import UpProduct from "@/base/upproduct/upproduct.vue";
import { setUser } from "@/utils/auth.js";

export default {
  name: "sign",
  data() {
    return {
      showUp: false,
      SubmissionBox: false,
      logoImg: "",
      uplogoImg: "",
      introduceImg: "",
      upintroduceImg: "",
      formData: new FormData(),
      AllProducts: [],
      imgType: {
        type: "image/jpeg, image/png, image/jpg"
      }
    };
  },
  created() {
    this.logoImg = this.$store.state.userData.logoPicUrl;
    this.introduceImg = this.$store.state.userData.introductionPicUrl;
    console.log(
      this.$store.state.userData.introductionPic,
      this.$store.state.userData.logoPic
    );
    this._getAllProducts();
  },
  methods: {
    _deleteProduct(id) {
      deleteProduct(id).then(res => {
        if (res.data.code === 0) {
          this._getAllProducts();
        }
      });
    },
    _getAllProducts() {
      getAllProducts(
        this.$store.state.user.UserID,
        this.$store.state.user.UserID
      ).then(res => {
        if (res.data.code === 0) {
          console.log("获取全部产品手册---------------------");
          this.AllProducts = res.data.data;
        }
      });
    },
    _addUserInfo() {
      addUserInfo(this.formData).then(res => {
        console.log(res.data);
        if (res.data.code === 0) {
          setUser(this.$store.state.user.UserID);
          this.$router.push({
            path: `/core`
          });
        } else if (res.data.code === 500511) {
          alert(
            "不好意思,该企业中文名称已被注册,请更改企业名称或者致电400-901-8021申述此名称"
          );
          this.$router.push({
            path: `/infoOne`
          });
        } else if (res.data.code === 500512) {
          alert(
            "不好意思,该企业英文名称已被注册,请更改企业名称或者致电400-901-8021申述此名称"
          );
          this.$router.push({
            path: `/infoOne`
          });
        }
      });
    },
    _needDesign() {
      needDesign(this.$store.state.user.UserID).then(res => {
        if (res.data.code === 0) {
          console.log("提交成功");
          this.SubmissionBox = !this.SubmissionBox;
        }
      });
    },
    yanzheng() {
      let emli = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (
        this.$store.state.userData.name &&
        this.$store.state.userData.nameEng &&
        this.$store.state.userData.nameShort &&
        this.$store.state.userData.linkman &&
        this.$store.state.userData.mobile &&
        this.$store.state.userData.linkmanEmail &&
        this.$store.state.userData.address &&
        emli.test(this.$store.state.userData.linkmanEmail)
      ) {
        if (this.$store.state.userData.twoIndustry) {
          this._addUserInfo();
        } else {
          alert("请选择行业！");
          this.$router.push({
            path: `/infoTwo`
          });
        }
      } else {
        alert("基本信息有错！");
        this.$router.push({
          path: `/infoOne`
        });
      }
    },
    delList(id) {
      console.log(id);
      this._deleteProduct(id);
    },
    Design(id) {
      if (id) {
        this._needDesign();
      } else {
        this.SubmissionBox = !this.SubmissionBox;
      }
    },
    clicehide(hideState) {
      this.showUp = hideState;
      this._getAllProducts();
    },
    topreview(url) {
      console.log(url);
      window.open(url, "_blank");
    },
    show() {
      this.showUp = true;
    },
    preservation() {
      this.$store.commit("SET_logoPic", this.uplogoImg);
      this.$store.commit("SET_introductionPic", this.upintroduceImg);
      this.$store.commit("SET_logoPicUrl", this.logoImg);
      this.$store.commit("SET_introductionPicUrl", this.introduceImg);

      let arr = [];
      for (
        let i = 0;
        i < this.$store.state.userData.imgListUrlArr.length;
        i++
      ) {
        arr.push(this.$store.state.userData.imgListUrlArr[i].picture);
      }
      this.formData = new FormData();
      this.formData.append("id", this.$store.state.user.UserID);
      this.formData.append("name", this.$store.state.userData.name);
      this.formData.append("nameShort", this.$store.state.userData.nameShort);

      this.formData.append("engName", this.$store.state.userData.nameEng);
      this.formData.append("member", this.$store.state.userData.member);
      this.formData.append("address", this.$store.state.userData.address);
      this.formData.append("linkman", this.$store.state.userData.linkman);
      this.formData.append("position", this.$store.state.userData.position);
      this.formData.append("mobile", this.$store.state.userData.mobile);
      this.formData.append(
        "linkmanEmail",
        this.$store.state.userData.linkmanEmail
      );
      this.formData.append(
        "oneIndustry",
        this.$store.state.userData.oneIndustry
      );
      this.formData.append(
        "twoIndustry",
        this.$store.state.userData.twoIndustry
      );
      this.formData.append("competitor", this.$store.state.userData.competitor);
      this.formData.append("keywords", this.$store.state.userData.keywords);
      this.formData.append(
        "mainProcess",
        this.$store.state.userData.mainProcess
      );
      this.formData.append(
        "facilitator",
        this.$store.state.userData.facilitator
      );
      this.formData.append("summary", this.$store.state.userData.summary);
      this.formData.append(
        "exhibitions",
        this.$store.state.userData.exhibitions
      );
      this.formData.append("titles", this.$store.state.userData.titles);
      this.formData.append("customer", this.$store.state.userData.customer);
      this.formData.append("params", JSON.stringify(arr));

      // for (let i = 0; i <= this.$store.state.userData.imgList.length; i++) {
      //   this.formData.append(
      //     "companyPics",
      //     this.$store.state.userData.imgList[i]
      //   );
      // }
      this.formData.append("logoPic", this.$store.state.userData.logoPic);
      this.formData.append(
        "introductionPic",
        this.$store.state.userData.introductionPic
      );
      this.formData.append("supplier", this.$store.state.userData.supplier);
      this.yanzheng();
    },
    toNext() {
      this.$router.push({
        path: `/infoFive`
      });
      this.$store.commit("SET_logoPicUrl", this.logoImg);
      this.$store.commit("SET_introductionPicUrl", this.introduceImg);
      this.$store.commit("SET_logoPic", this.uplogoImg);
      this.$store.commit("SET_introductionPic", this.upintroduceImg);
      console.log(this.$store.state.userData);
    },
    One(file) {
      if (!file) {
        return;
      }
      const _this = this;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        _this.logoImg = e.target.result;
      };
    },
    Two(file) {
      if (!file) {
        return;
      }
      const _this = this;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        _this.introduceImg = e.target.result;
      };
    },
    upOneImg(e) {
      var avatarImg = e.target.files;
      for (var i = 0; i < avatarImg.length; i++) {
        var Img = e.target.files[i];
        var avatarImgsize = Img.size;
        var avatarImgtype = Img.type;
        if (this.imgType.type.indexOf(avatarImgtype) === -1) {
          this.$message.error("格式不正确");
          return false;
        } else {
          const _this = this;
          if (!e || !window.FileReader) return;
          const reader = new FileReader();
          reader.readAsDataURL(Img);
          reader.onload = function(e) {
            _this.logoImg = e.target.result;
          };
          this.uplogoImg = Img;
        }
      }
    },
    upTwoImg(e) {
      console.log("123");
      var avatarImg = e.target.files;
      for (var i = 0; i < avatarImg.length; i++) {
        var Img = e.target.files[i];
        var avatarImgsize = Img.size;
        var avatarImgtype = Img.type;
        if (this.imgType.type.indexOf(avatarImgtype) === -1) {
          return false;
        } else {
          const _this = this;
          if (!e || !window.FileReader) return;
          const reader = new FileReader();
          reader.readAsDataURL(Img);
          reader.onload = function(e) {
            _this.introduceImg = e.target.result;
          };
          this.upintroduceImg = Img;
        }
      }
    },
    toBack() {
      this.$store.commit("SET_logoPicUrl", this.logoImg);
      this.$store.commit("SET_introductionPicUrl", this.introduceImg);
      this.$store.commit("SET_logoPic", this.uplogoImg);
      this.$store.commit("SET_introductionPic", this.upintroduceImg);
      this.$router.push({
        path: `/infoThree`
      });
    },
    tohome() {
      this.$router.push({
        path: `/home`
      });
    },
    toOne() {
      this.$store.commit("SET_logoPicUrl", this.logoImg);
      this.$store.commit("SET_introductionPicUrl", this.introduceImg);
      this.$store.commit("SET_logoPic", this.uplogoImg);
      this.$store.commit("SET_introductionPic", this.upintroduceImg);
      this.$router.push({
        path: `/infoOne`
      });
    },
    toTwo() {
      this.$store.commit("SET_logoPicUrl", this.logoImg);
      this.$store.commit("SET_introductionPicUrl", this.introduceImg);
      this.$store.commit("SET_logoPic", this.uplogoImg);
      this.$store.commit("SET_introductionPic", this.upintroduceImg);
      this.$router.push({
        path: `/infoTwo`
      });
    },
    toThree() {
      this.$store.commit("SET_logoPicUrl", this.logoImg);
      this.$store.commit("SET_introductionPicUrl", this.introduceImg);
      this.$store.commit("SET_logoPic", this.uplogoImg);
      this.$store.commit("SET_introductionPic", this.upintroduceImg);
      this.$router.push({
        path: `/infoThree`
      });
    },
    toFour() {
      this.$store.commit("SET_logoPicUrl", this.logoImg);
      this.$store.commit("SET_introductionPicUrl", this.introduceImg);
      this.$store.commit("SET_logoPic", this.uplogoImg);
      this.$store.commit("SET_introductionPic", this.upintroduceImg);
      this.$router.push({
        path: `/infoFour`
      });
    },
    toFive() {
      this.$store.commit("SET_logoPicUrl", this.logoImg);
      this.$store.commit("SET_introductionPicUrl", this.introduceImg);
      this.$store.commit("SET_logoPic", this.uplogoImg);
      this.$store.commit("SET_introductionPic", this.upintroduceImg);
      this.$router.push({
        path: `/infoFive`
      });
    }
  },
  components: {
    UpProduct
  }
};
</script>

<style lang="scss">
.signDetails {
  width: 100vw;
  height: 100vh;
  background: #2c73a1;
  overflow: auto;
  .signBgTwo {
    height: 100%;
    width: 100%;
    .signBgInfoLog {
      height: 90px;
      padding: 10px;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .infoLog {
        color: #fff;
        text-align: center;
        img {
          cursor: pointer;
        }
        p:nth-child(1) {
          font-size: 50px;
        }
        p:nth-child(2) {
          font-size: 20px;
        }
      }
    }
    .signBgMain {
      height: calc(100% - 90px);
      margin: 0 auto;
      max-width: 1200px;
      width: 100%;
      padding: 0 30px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .signBgMainLeft {
        height: 496px;
        width: 200px;
        padding: 0 20px;
        border-right: 1px dashed #fff;
        .signBgMainList {
          width: 100%;
          text-align: right;
          font-size: 16px;
          color: #ddd;
          margin-bottom: 20px;
          cursor: pointer;
        }
        .ListAct {
          color: #fff;
          font-weight: bold;
        }
      }
      .signBgMainRight {
        width: calc(100% - 200px);
        padding: 0 80px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: auto;
        .signBgFourMainList {
          display: flex;
          justify-content: space-between;
          width: 100%;
          .signBgFourLogo {
            width: 20%;
            .signBgFourLogoP {
              font-size: 16px;
              color: #fff;
              margin: 10px 0;
            }
            .signBgFourLogoImg {
              width: 132px;
              height: 132px;
              background: #fff;
              overflow: hidden;
              position: relative;
              margin-right: 20px;
              margin-bottom: 40px;
              label {
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: 100%;
                height: 100%;
                // text-align: center;
                z-index: 999;
                font-size: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              input {
                opacity: 0;
              }
            }
          }
          .signBgFourproduct {
            width: calc(80% - 40px);
            height: 410px;
            overflow: auto;
            background: rgba($color: #fff, $alpha: 0.5);
            margin: 0 20px 20px;
            box-sizing: border-box;
            .signBgFourHeard {
              font-size: 20px;
              color: #fff;
              padding: 0 20px;
              box-sizing: border-box;
              margin: 20px 0;
              display: flex;
              align-items: center;
              span {
                font-size: 30px;
                cursor: pointer;
                margin-left: 20px;
              }
            }
            .signBgFourproductList {
              width: 100%;
              padding: 0 20px;
              box-sizing: border-box;
              height: 250px;
              overflow: auto;
              .brochureItem {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                .brochureItemImg {
                  width: 162px;
                  background: #fff;
                  cursor: pointer;
                  img {
                    height: 150px;
                  }
                }
                .brochureItemText {
                  width: calc(100% - 182px);
                  margin-left: 20px;
                  .brochureItemHead {
                    display: flex;
                    justify-content: space-between;
                    .brochureItemNum {
                      font-weight: bold;
                      margin-top: 30px;
                    }
                  }
                  .brochureItemmanual {
                    .brochureItemmanualHead {
                      display: flex;
                      justify-content: space-between;
                      font-size: 16px;
                      margin: 6px 0;
                      div {
                        cursor: pointer;
                      }
                    }
                    .label {
                      span {
                        display: inline-block;
                        width: 60px;
                        height: 24px;
                        text-align: center;
                        line-height: 24px;
                        margin-right: 4px;
                        background: rgba($color: #000000, $alpha: 0.2);
                        color: #fff;
                      }
                    }
                    .brochureintroduce {
                      width: 100%;
                      height: 65px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 4;
                      -webkit-box-orient: vertical;
                      padding: 4px 10px;
                      box-sizing: border-box;
                      line-height: 15px;
                      overflow: hidden;
                      background: rgba($color: #000000, $alpha: 0.2);
                      margin-top: 10px;
                    }
                  }
                }
              }
            }
            .brochureItemBtn {
              width: 136px;
              height: 40px;
              background: #fff;
              margin: 20px 0 0 20px;
              line-height: 40px;
              text-align: center;
              font-size: 16px;
              cursor: pointer;
            }
          }
        }
        .signBgMainFootTwo {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 0 20px;
          box-sizing: border-box;
          span {
            display: inline-block;
            width: 85px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            background: #000;
            color: #fff;
            cursor: pointer;
          }
          div {
            span:nth-child(1) {
              display: inline-block;
              width: 110px;
              height: 32px;
              line-height: 32px;
              text-align: center;
              background: #000;
              color: #fff;
              font-size: 10px;
            }
            span:nth-child(2) {
              display: inline-block;
              width: 85px;
              height: 32px;
              line-height: 32px;
              text-align: center;
              background: #000;
              color: #fff;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
  .UpproductBox {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba($color: #000000, $alpha: 0.2);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999999999999999999;
  }
  .SubmissionBox {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba($color: #000000, $alpha: 0.4);
    color: #fff;
    text-align: center;
    line-height: 100vh;
    font-size: 40px;
  }
}
</style>
