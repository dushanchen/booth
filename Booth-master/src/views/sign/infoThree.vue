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
          <div class="signBgMainList ListAct" @click="toThree">核心竞争力</div>
          <div class="signBgMainList" @click="toFour">形象展示</div>
          <div class="signBgMainList" @click="toFive">信息核对</div>
        </div>
        <div class="signBgMainRight">
          <div class="signBgThreeMainList">
            <p>您可以上传相关素材支撑您的企业资质</p>
            <p>例如：主要产品、专利证书、制造车间、企业文化相关照片、视频等</p>
            <div class="upImgBox">
              <div class="UpImg">
                <div class="UpImgBottom">
                  <div class="UpimgList">
                    <label for="upTop">+</label>
                    <input @change="upImg" type="file" id="upTop" value="图片上传预览" multiple>
                  </div>
                  <div class="imgList">
                    <div class="imgListItem" v-for="(item, index) in imgListArr" :key="index">
                      <img :src="item.picture.url" alt>
                      <div class="UpImgTop">
                        <input
                          type="text"
                          placeholder="请输入图片说明"
                          v-model="item.picture.description"
                          @change="setData(item)"
                        >
                      </div>
                      <div
                        class="UpImgButton"
                        @click="removeButton(item.picture.ossId,item.picture.id,index)"
                      >删除</div>
                    </div>
                  </div>
                </div>
              </div>
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
  </div>
</template>

<script>
import {
  addUserInfo,
  upload,
  savePicture,
  updatePicture,
  deletePicture,
  ERR_OK
} from "@/api/api.js";
import { setUser } from "@/utils/auth.js";
// import OSS from "ali-oss";

// import OSS = require('ali-oss');
export default {
  name: "sign",
  data() {
    return {
      imgListArr: [], // 服务器图片展示地址
      client: "",
      formData: new FormData(),

      imgType: {
        type: "image/jpeg, image/png, image/jpg"
      }
    };
  },
  created() {
    if (this.$store.state.userData.imgListUrlArr) {
      this.imgListArr = this.$store.state.userData.imgListUrlArr;
    }
  },
  methods: {
    _addUserInfo() {
      addUserInfo(this.formData).then(res => {
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
    yanzheng() {
      let emli = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (
        this.$store.state.userData.name &&
        this.$store.state.userData.nameShort &&
        this.$store.state.userData.nameEng &&
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
    preservation() {
      this.$store.commit("SET_imgListUrlArr", this.imgListArr);
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
        path: `/infoFour`
      });
      this.$store.commit("SET_imgListUrlArr", this.imgListArr);
    },
    setData(item) {
      let formData = new FormData();
      formData.append("ossId", item.picture.ossId);
      formData.append("description", item.picture.description);
      formData.append("url", item.picture.url);
      formData.append("userId", item.picture.userId);
      formData.append("id", item.picture.id);
      updatePicture(formData).then(res => {
        if (res.data.code === 0) {
        }
      });
    },
    removeButton(ossid, id, index) {
      console.log(id);
      deletePicture(ossid, id).then(res => {
        if (res.data.code === 0) {
          this.imgListArr.splice(index, 1);
        }
      });
    },
    upImg(e) {
      let formData = new FormData();
      let file = e.target.files[0];
      formData.append("file", file);
      upload(formData).then(res => {
        var _this = this;
        if (res.data.code === 0) {
          let formDataTwo = new FormData();
          formDataTwo.append("ossId", res.data.data);
          formDataTwo.append("description", "");
          formDataTwo.append(
            "url",
            `http://booth1.oss-cn-shanghai.aliyuncs.com/${
              res.data.data
            }?x-oss-process=image/format,png`
          );
          formDataTwo.append("userId", this.$store.state.user.UserID);
          savePicture(formDataTwo).then(res => {
            if (res.data.code === 0) {
              _this.imgListArr.push({
                isCollected: null,
                picture: {
                  createDate: "",
                  ossId: res.data.data.ossId,
                  url: `http://booth1.oss-cn-shanghai.aliyuncs.com/${
                    res.data.data.ossId
                  }?x-oss-process=image/format,png`,
                  id: "",
                  userId: this.$store.state.user.UserID,
                  description: ""
                }
              });
            }
          });
        }
      });
    },
    toBack() {
      this.$store.commit("SET_imgListUrlArr", this.imgListArr);
      this.$router.push({
        path: `/infoTwo`
      });
    },
    tohome() {
      this.$router.push({
        path: `/home`
      });
    },
    toOne() {
      this.$store.commit("SET_imgListUrlArr", this.imgListArr);
      this.$router.push({
        path: `/infoOne`
      });
    },
    toTwo() {
      this.$store.commit("SET_imgListUrlArr", this.imgListArr);
      this.$router.push({
        path: `/infoTwo`
      });
    },
    toThree() {
      this.$store.commit("SET_imgListUrlArr", this.imgListArr);
      this.$router.push({
        path: `/infoThree`
      });
    },
    toFour() {
      this.$store.commit("SET_imgListUrlArr", this.imgListArr);
      this.$router.push({
        path: `/infoFour`
      });
    },
    toFive() {
      // this.$store.commit("SET_imgList", this.upImgList);
      // this.$store.commit("SET_imgListUrl", this.imgList);
      this.$store.commit("SET_imgListUrlArr", this.imgListArr);
      this.$router.push({
        path: `/infoFive`
      });
    }
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
        .signBgThreeMainList {
          width: 100%;
          padding: 0 20px;
          box-sizing: border-box;
          p {
            font-size: 16px;
            color: #fff;
          }
          .upImgBox {
            height: 400px;
            .UpImg {
              margin: 10px 0 10px;
              // .UpImgTop {
              //   margin-bottom: 10px;
              //   input {
              //     background: rgba(255, 255, 255, 0.36);
              //     outline: none;
              //     padding: 0 10px;
              //     height: 20px;
              //     color: #fff;
              //   }
              // }
              .UpImgBottom {
                display: flex;
              }
              .UpimgList {
                width: 120px;
                height: 120px;
                background: #fff;
                overflow: hidden;
                position: relative;
                margin-right: 20px;
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
            .imgList {
              width: 608px;
              height: 400px;
              overflow: auto;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              .imgListItem {
                width: 120px;
                height: 160px;
                margin-right: 14px;
                margin-bottom: 14px;
                img {
                  width: 120px;
                  height: 120px;
                }
                .UpImgTop {
                  width: 100%;
                  height: 30px;
                  margin-top: 10px;
                  input {
                    width: 100%;
                    display: block;
                    background: rgba(255, 255, 255, 0.36);
                    outline: none;
                    padding: 0 10px;
                    height: 20px;
                    box-sizing: border-box;
                    color: #fff;
                    &::-webkit-input-placeholder {
                      color: #fff;
                      font-size: 10px;
                    }
                  }
                }
                .UpImgButton {
                  width: 80px;
                  height: 20px;
                  line-height: 20px;
                  text-align: center;
                  margin: 0 auto;
                  cursor: pointer;
                  background: rgba(255, 255, 255, 0.36);
                  color: #fff;
                  border-radius: 4px;
                }
              }
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
}
</style>
