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
      <div class="signBgMainFive">
        <div class="signBgMainFiveLeft">
          <div class="signBgMainFiveList" @click="toOne">基础信息</div>
          <div class="signBgMainFiveList" @click="toTwo">行业及商业伙伴</div>
          <div class="signBgMainFiveList" @click="toThree">核心竞争力</div>
          <div class="signBgMainFiveList" @click="toFour">形象展示</div>
          <div class="signBgMainFiveList ListAct" @click="toFive">信息核对</div>
        </div>
        <div class="signBgMainFiveRight">
          <div class="top">
            <div class="basic">
              <div class="basicTop">
                <div class="basicTopItem">
                  <p>企业中文全称</p>
                  <input disabled :value="userData.name">
                </div>
                <div class="basicTopItem">
                  <p>企业英文全称</p>
                  <input disabled :value="userData.nameEng">
                </div>
                <div class="basicTopItem">
                  <p>人数规模</p>
                  <div>
                    <span v-if="userData.member == 1">10-50</span>
                    <span v-if=" userData.member == 2">50-100</span>
                    <span v-if="userData.member == 3">100-200</span>
                    <span v-if="userData.member == 4">200-500</span>
                    <span v-if="userData.member == 5">500以上</span>
                  </div>
                </div>
                <div class="basicTopItem">
                  <p>企业所在地</p>
                  <input disabled :value="userData.address">
                </div>
              </div>
              <div class="basicTop">
                <div class="basicTopItem">
                  <p>联系人手机号码</p>
                  <input disabled :value="userData.mobile">
                </div>
                <div class="basicTopItem">
                  <p>联系人邮件</p>
                  <input disabled :value="userData.linkmanEmail">
                </div>
                <div class="basicTopItem">
                  <p>联系人</p>
                  <input disabled :value="userData.linkman">
                </div>
                <div class="basicTopItem">
                  <p>联系人职位</p>
                  <input type="text" v-model="userData.linkmanEmail">
                </div>
              </div>
            </div>
            <div class="Exhibition">
              <div class="ExhibitionHead">你所感兴趣的展会</div>
              <div v-if="userData.exhibitions">
                <div
                  class="ExhibitionList"
                  v-for="(item, index) in JSON.parse(userData.exhibitions)"
                  :key="index"
                >
                  <p>展会名称</p>
                  <input disabled :value="item.name">
                </div>
              </div>
              <div v-if="!userData.exhibitions">
                <div class="ExhibitionList">
                  <p>展会名称</p>
                  <input disabled :value="item.name">
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="industry">
              <div class="signBgMainListRight">
                <div class="signBgMainTRightItem">
                  <p>行业类型</p>
                  <input type="text" disabled :value="userData.oneIndustryname">
                </div>
                <div class="signBgMainTRightItem">
                  <p>主要竞争对手</p>
                  <div class="ItemText" v-if="userData.competitor">
                    <span
                      v-for="(item, index) in JSON.parse(userData.competitor)"
                      :key="index"
                      v-show="item.key != '点击输入'"
                    >{{item.key}}</span>
                  </div>
                  <div class="ItemText" v-if="!userData.competitor">无</div>
                </div>
                <div class="signBgMainTRightItem">
                  <p>行业关键词录</p>
                  <div class="ItemText" v-if="userData.keywords">
                    <span
                      v-for="(item, index) in JSON.parse(userData.keywords)"
                      :key="index"
                      v-show="item.key != '点击输入'"
                    >{{item.key}}</span>
                  </div>
                  <div class="ItemText" v-if="!userData.keywords">无</div>
                </div>
                <div class="signBgMainTRightItem">
                  <p>主要供应商</p>
                  <div class="ItemText" v-if="userData.supplier">
                    <span
                      v-for="(item, index) in JSON.parse(userData.supplier)"
                      :key="index"
                      v-show="item.key != '点击输入'"
                    >{{item.key}}</span>
                  </div>
                  <div class="ItemText" v-if="!userData.supplier">无</div>
                </div>
                <div class="signBgMainTRightItem">
                  <p>主要工艺</p>
                  <div class="ItemText" v-if="userData.mainProcess">
                    <span
                      v-for="(item, index) in JSON.parse(userData.mainProcess)"
                      :key="index"
                      v-show="item.key != '点击输入'"
                    >{{item.key}}</span>
                  </div>
                  <div class="ItemText" v-if="!userData.mainProcess">无</div>
                </div>
                <div class="signBgMainTRightItem">
                  <p>主要客户</p>
                  <div class="ItemText" v-if="userData.customer">
                    <span
                      v-for="(item, index) in JSON.parse(userData.customer)"
                      :key="index"
                      v-show="item.key != '点击输入'"
                    >{{item.key}}</span>
                  </div>
                  <div class="ItemText" v-if="!userData.customer">无</div>
                </div>
                <div class="signBgMainTRightItem">
                  <p>第三方服务商</p>
                  <div class="ItemText" v-if="userData.facilitator">
                    <span
                      v-for="(item, index) in JSON.parse(userData.facilitator)"
                      :key="index"
                      v-show="item.key != '点击输入'"
                    >{{item.key}}</span>
                  </div>
                  <div class="ItemText" v-if="!userData.facilitator">无</div>
                </div>
                <div class="signBgMainTRightItem">
                  <p>简介（最多200字）</p>
                  <textarea class="ItemText" :value="userData.summary"></textarea>
                </div>
              </div>
            </div>
            <div class="Other">
              <div>
                <div class="OtherHead">其他信息</div>
                <div class="OtherList" v-if="userData.imgListUrlArr.length">
                  <img
                    :src="item.picture.url"
                    alt
                    v-for="(item, index) in userData.imgListUrlArr"
                    :key="index"
                  >
                </div>
                <div class="OtherList" v-if="!userData.imgListUrlArr.length">无</div>
              </div>
              <div>
                <div class="OtherHead">形象展示</div>
                <div class="OtherList">
                  <img :src="userData.logoPicUrl">
                  <img :src="userData.introductionPicUrl">
                </div>
              </div>
            </div>
          </div>
          <div class="signBgMainFootTwo">
            <span @click="toBack">上一页</span>
            <div>
              <span @click="preservation">确认提交</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addUserInfo } from "@/api/api.js";
import { setUser } from "@/utils/auth.js";

export default {
  name: "sign",
  data() {
    return {
      userData: this.$store.state.userData,
      formData: new FormData()
    };
  },
  methods: {
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
    tohome() {
      this.$router.push({
        path: `/home`
      });
    },
    toBack() {
      this.$router.push({
        path: `/infofour`
      });
    },
    toOne() {
      this.$router.push({
        path: `/infoOne`
      });
    },
    toTwo() {
      this.$router.push({
        path: `/infoTwo`
      });
    },
    toThree() {
      this.$router.push({
        path: `/infoThree`
      });
    },
    toFour() {
      this.$router.push({
        path: `/infoFour`
      });
    },
    toFive() {
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
    .signBgMainFive {
      height: calc(100% - 90px);
      margin: 0 auto;
      max-width: 1300px;
      width: 100%;
      display: flex;
      align-items: center;
      .signBgMainFiveLeft {
        height: 496px;
        width: 200px;
        padding: 0 20px;
        border-right: 1px dashed #fff;
        .signBgMainFiveList {
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
      .signBgMainFiveRight {
        height: 496px;
        width: calc(100% - 200px);
        padding: 0 20px;
        box-sizing: border-box;
        overflow: auto;
        .top {
          display: flex;
          .basic {
            width: 80%;
            .basicTop {
              display: flex;
              .basicTopItem {
                width: 25%;
                margin-bottom: 10px;
                padding: 0 20px;
                box-sizing: border-box;
                color: #fff;
                p {
                  font-size: 16px;
                  color: #fff;
                  margin-bottom: 10px;
                }
                input {
                  color: #fff;
                  padding: 0 5px;
                  height: 30px;
                  line-height: 30px;
                  font-size: 10px;
                  background: rgba($color: #ffffff, $alpha: 0.5);
                }
                div {
                  color: #fff;
                  height: 30px;
                  line-height: 30px;
                  padding: 0 5px;
                  font-size: 10px;
                  background: rgba($color: #ffffff, $alpha: 0.5);
                }
              }
            }
          }
          .Exhibition {
            width: 20%;
            .ExhibitionHead {
              font-size: 16px;
              color: #fff;
              margin-bottom: 10px;
            }
            .ExhibitionList {
              margin-bottom: 10px;
              p {
                font-size: 10px;
                color: #fff;
                margin-bottom: 10px;
              }
              input {
                color: #fff;
                padding: 0 5px;
                height: 30px;
                line-height: 30px;
                font-size: 10px;
                background: rgba($color: #ffffff, $alpha: 0.5);
              }
            }
          }
        }
        .bottom {
          display: flex;
          .industry {
            width: 50%;
            .signBgMainListRight {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              align-items: center;
              .signBgMainTRightItem {
                width: 50%;
                padding: 0 20px;
                height: 98px;
                margin-bottom: 10px;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                box-sizing: border-box;
                position: relative;
                p {
                  font-size: 16px;
                  color: #fff;
                  margin: 6px 0;
                  width: 100%;
                }
                input {
                  box-sizing: border-box;
                  width: 100%;
                  color: #fff;
                  padding: 0 5px;
                  height: 30px;
                  line-height: 30px;
                  font-size: 10px;
                  background: rgba($color: #ffffff, $alpha: 0.5);
                }
                .ItemText {
                  box-sizing: border-box;
                  width: 100%;
                  height: 70px;
                  outline: none;
                  background: rgba($color: #fff, $alpha: 0.5);
                  overflow: auto;
                  span {
                    display: inline-block;
                    padding: 4px 10px;
                    background: rgba($color: #000, $alpha: 0.15);
                    margin: 6px;
                    font-size: 10px;
                    cursor: pointer;
                  }
                }
              }
            }
          }
          .Other {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 10px 0;
            .OtherHead {
              font-size: 16px;
              color: #fff;
              margin-bottom: 10px;
            }
            .OtherList {
              width: 100%;
              height: 120px;
              overflow: auto;
              background: rgba($color: #ffffff, $alpha: 0.5);
              padding: 10px;
              box-sizing: border-box;
              img {
                height: 100%;
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
