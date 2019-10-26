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
      <div class="signBgMain" @click="inputFun">
        <div class="signBgMainLeft">
          <div class="signBgMainList ListAct" @click="toOne">基础信息</div>
          <div class="signBgMainList" @click="toTwo">行业及商业伙伴</div>
          <div class="signBgMainList" @click="toThree">核心竞争力</div>
          <div class="signBgMainList" @click="toFour">形象展示</div>
          <div class="signBgMainList" @click="toFive">信息核对</div>
        </div>
        <div class="signBgMainRight">
          <div class="signBgMainList">
            <div class="signBgMainRightItem">
              <p>企业中文全称</p>
              <input type="text" v-model="userData.name" v-on:input="inputFunc">
              <p class="Err">{{nameERR}}</p>
              <div class="SearchIndustry">
                <div
                  class="SearchIndustryList"
                  v-for="(item, index) in serachList"
                  :key="index"
                  @click.stop="tureBoxOne(item)"
                >{{item.screenName}}</div>
              </div>
            </div>
            <div class="signBgMainRightItem">
              <p>企业英文全称</p>
              <p class="Err">{{nameEngERR}}</p>
              <input type="text" v-model="userData.nameEng">
            </div>
            <div class="signBgMainRightItem">
              <p>企业中文简称</p>
              <p class="Err">{{nameShortEngERR}}</p>
              <input type="text" v-model="userData.nameShort">
            </div>
            <div class="signBgMainRightItem">
              <!-- <p>企业中文简称</p>
              <p class="Err">{{nameEngERR}}</p>
              <input type="text" v-model="userData.nameEng">-->
            </div>
            <div class="signBgMainRightItem">
              <p>人数规模</p>
              <select v-model="userData.member">
                <option value="1">1-20</option>
                <option value="2">21-100</option>
                <option value="3">101-1000</option>
                <option value="4">1000+</option>
                <option value="5">10000+</option>
              </select>
            </div>
            <div class="signBgMainRightItem">
              <p>企业所在地</p>
              <input type="text" v-model="userData.address">
              <p class="Err">{{addressERR}}</p>
            </div>
            <div class="signBgMainRightItem">
              <p>联系人</p>
              <p class="Err">{{linkmanERR}}</p>
              <input type="text" v-model="userData.linkman">
            </div>
            <div class="signBgMainRightItem">
              <p>联系人职责</p>
              <select v-model="userData.position">
                <option value="1">市场及销售</option>
                <option value="2">采购</option>
                <option value="3">管理</option>
                <option value="4">技术</option>
                <option value="5">生产及运营</option>
                <option value="6">其他</option>
              </select>
            </div>
            <div class="signBgMainRightItem">
              <p>联系人手机号码</p>
              <p class="Err">{{mobileERR}}</p>
              <input type="text" v-model="userData.mobile">
            </div>
            <div class="signBgMainRightItem">
              <p>联系人邮件</p>
              <p class="Err">{{linkmanEmailERR}}</p>
              <input type="text" v-model="userData.linkmanEmail">
            </div>
          </div>
          <div class="signBgMainFoot">
            <span @click="preservation">保存并返回到主页</span>
            <span @click="toNext">下一页</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addUserInfo, searchCompany, ERR_OK } from "@/api/api.js";
import { setUser } from "@/utils/auth.js";
import { mapGetters } from "vuex";

export default {
  name: "sign",
  data() {
    return {
      formData: new FormData(),
      timer: "",
      serachList: [],
      nameERR: "",
      nameShortEngERR: "",
      nameEngERR: "",
      linkmanERR: "",
      mobileERR: "",
      linkmanEmailERR: "",
      addressERR: "",
      userData: {
        name: "",
        nameEng: "",
        nameShort: "",
        member: "1",
        address: "", // 地点
        linkman: "",
        position: "1",
        mobile: "",
        linkmanEmail: ""
      }
    };
  },
  computed: {
    ...mapGetters(["UserID"]),
    pokerHistory() {
      return this.userData.name;
    }
  },
  watch: {
    pokerHistory(newValue, oldValue) {
      if (!newValue) {
        this.userData.address = "";
      }
    }
  },
  created() {
    console.log(this.$route.params.id);
    if (this.$route.params.id) {
      this.$store.commit("SET_USERID", this.$route.params.id);
    }
    this.userData = this.$store.state.userData;
  },
  methods: {
    _searchCompany() {
      searchCompany(this.userData.name).then(res => {
        if (res.status === ERR_OK) {
          this.serachList = res.data.data;
        }
        console.log(res.data.data);
      });
    },
    _addUserInfo() {
      addUserInfo(this.formData).then(res => {
        if (res.data.code === 0) {
          setUser(this.$store.state.user.UserID);
          this.$router.push({
            path: `/core`
          });
        } else if (res.data.code === 500511) {
          alert('不好意思,该企业中文名称已被注册,请更改企业名称或者致电400-901-8021申述此名称')
        } else if(res.data.code === 500512)  {
          alert('不好意思,该企业英文名称已被注册,请更改企业名称或者致电400-901-8021申述此名称')
        }
      });
    },
    yanzheng() {
      let emli = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (!this.$store.state.userData.name) {
        this.nameERR = "请输入中文名称";
      } else {
        this.nameERR = "";
      }
      if (!this.$store.state.userData.nameShort) {
        this.nameShortEngERR = "请输入公司简称";
      } else {
        this.nameShortEngERR = "";
      }
      if (!this.$store.state.userData.nameEng) {
        this.nameEngERR = "请输入英文名称";
      } else {
        this.nameEngERR = "";
      }
      if (!this.$store.state.userData.linkman) {
        this.linkmanERR = "请输入联系人";
      } else {
        this.linkmanERR = "";
      }
      if (!this.$store.state.userData.mobile) {
        this.mobileERR = "请输入联系方式";
      } else {
        this.mobileERR = "";
      }
      if (!this.$store.state.userData.address) {
        this.addressERR = "请输入企业地址";
      } else {
        this.addressERR = "";
      }
      if (!this.$store.state.userData.linkmanEmail) {
        this.linkmanEmailERR = "请输入联系邮箱";
      } else {
        if (!emli.test(this.$store.state.userData.linkmanEmail)) {
          this.linkmanEmailERR = "格式不正确";
        } else {
          this.linkmanEmailERR = "";
        }
      }
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
      }
    },
    setTime() {
      this.timer = setTimeout(() => {
        this._searchCompany();
      }, 1000);
    },
    tureBoxOne(item) {
      console.log();
      if (item) {
        this.userData.name = item.screenName;
        this.userData.address = item.address;
      }
      this.serachList = [];
    },
    inputFunc() {
      // 搜索 1
      // this.$store.commit("SET_NAME", this.userData.name);
      clearInterval(this.timer);
      this.setTime();
    },
    inputFun() {
      this.serachList = [];
    },
    preservation() {
      console.log(this.userData.name)
       this.$store.commit("SET_NAME", this.userData.name);
       console.log(this.$store.state.userData.name)     
      this.$store.commit("SET_NAMEENG", this.userData.nameEng);
      this.$store.commit("SET_NAMESHORT", this.userData.nameShort);
      this.$store.commit("SET_MEMBER", this.userData.member);
      this.$store.commit("SET_ADDRESS", this.userData.address);
      this.$store.commit("SET_LINKMAN", this.userData.linkman);
      this.$store.commit("SET_POSITION", this.userData.position);
      this.$store.commit("SET_MOBILE", this.userData.mobile);
      this.$store.commit("SET_LINKMANEMAIL", this.userData.linkmanEmail);


      let arr = []
      for (let i = 0; i < this.$store.state.userData.imgListUrlArr.length; i++) {
         arr.push(this.$store.state.userData.imgListUrlArr[i].picture)
      }
      this.formData = new FormData();
      this.formData.append("id", this.$store.state.user.UserID);
      this.formData.append("name", this.$store.state.userData.name);
      this.formData.append("engName", this.$store.state.userData.nameEng);
      this.formData.append("nameShort", this.$store.state.userData.nameShort);
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
      this.$store.commit("SET_NAME", this.userData.name);
      this.$store.commit("SET_NAMEENG", this.userData.nameEng);
      this.$store.commit("SET_MEMBER", this.userData.member);
      this.$store.commit("SET_ADDRESS", this.userData.address);
      this.$store.commit("SET_LINKMAN", this.userData.linkman);
      this.$store.commit("SET_POSITION", this.userData.position);
      this.$store.commit("SET_MOBILE", this.userData.mobile);
      this.$store.commit("SET_LINKMANEMAIL", this.userData.linkmanEmail);

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
      this.$store.commit("SET_NAME", this.userData.name);
      this.$store.commit("SET_NAMEENG", this.userData.nameEng);
      this.$store.commit("SET_MEMBER", this.userData.member);
      this.$store.commit("SET_ADDRESS", this.userData.address);
      this.$store.commit("SET_LINKMAN", this.userData.linkman);
      this.$store.commit("SET_POSITION", this.userData.position);
      this.$store.commit("SET_MOBILE", this.userData.mobile);
      this.$store.commit("SET_LINKMANEMAIL", this.userData.linkmanEmail);
      this.$router.push({
        path: `/infoOne`
      });
    },
    toTwo() {
      this.$store.commit("SET_NAME", this.userData.name);
      this.$store.commit("SET_NAMEENG", this.userData.nameEng);
      this.$store.commit("SET_MEMBER", this.userData.member);
      this.$store.commit("SET_ADDRESS", this.userData.address);
      this.$store.commit("SET_LINKMAN", this.userData.linkman);
      this.$store.commit("SET_POSITION", this.userData.position);
      this.$store.commit("SET_MOBILE", this.userData.mobile);
      this.$store.commit("SET_LINKMANEMAIL", this.userData.linkmanEmail);
      this.$router.push({
        path: `/infoTwo`
      });
    },
    toThree() {
      this.$store.commit("SET_NAME", this.userData.name);
      this.$store.commit("SET_NAMEENG", this.userData.nameEng);
      this.$store.commit("SET_MEMBER", this.userData.member);
      this.$store.commit("SET_ADDRESS", this.userData.address);
      this.$store.commit("SET_LINKMAN", this.userData.linkman);
      this.$store.commit("SET_POSITION", this.userData.position);
      this.$store.commit("SET_MOBILE", this.userData.mobile);
      this.$store.commit("SET_LINKMANEMAIL", this.userData.linkmanEmail);
      this.$router.push({
        path: `/infoThree`
      });
    },
    toFour() {
      this.$store.commit("SET_NAME", this.userData.name);
      this.$store.commit("SET_NAMEENG", this.userData.nameEng);
      this.$store.commit("SET_MEMBER", this.userData.member);
      this.$store.commit("SET_ADDRESS", this.userData.address);
      this.$store.commit("SET_LINKMAN", this.userData.linkman);
      this.$store.commit("SET_POSITION", this.userData.position);
      this.$store.commit("SET_MOBILE", this.userData.mobile);
      this.$store.commit("SET_LINKMANEMAIL", this.userData.linkmanEmail);
      this.$router.push({
        path: `/infoFour`
      });
    },
    toFive() {
      this.$store.commit("SET_NAME", this.userData.name);
      this.$store.commit("SET_NAMEENG", this.userData.nameEng);
      this.$store.commit("SET_MEMBER", this.userData.member);
      this.$store.commit("SET_ADDRESS", this.userData.address);
      this.$store.commit("SET_LINKMAN", this.userData.linkman);
      this.$store.commit("SET_POSITION", this.userData.position);
      this.$store.commit("SET_MOBILE", this.userData.mobile);
      this.$store.commit("SET_LINKMANEMAIL", this.userData.linkmanEmail);
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
        .signBgMainList {
          display: flex;
          flex-wrap: wrap;
          // justify-content: center;
          // align-items: center;
        }
        .signBgMainRightItem {
          width: 50%;
          padding: 0 20px;
          margin-bottom: 30px;
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
          .Err {
            position: absolute;
            top: 60px;
            left: 20px;
            color: red;
            font-size: 12px;
          }
          input {
            padding: 0 10px;
            box-sizing: border-box;
            width: 100%;
            height: 32px;
            outline: none;
            background: rgba($color: #fff, $alpha: 0.5);
          }
          select {
            padding: 0 10px;
            box-sizing: border-box;
            width: 100%;
            height: 32px;
            outline: none;
            background: rgba($color: #fff, $alpha: 0.5);
          }
          .SearchIndustry {
            position: absolute;
            top: 64px;
            left: 20px;
            width: calc(100% - 40px);
            max-height: 200px;
            background: #fff;
            z-index: 999999;
            overflow: auto;
            .SearchIndustryList {
              width: 100%;
              padding: 0 20px;
              margin: 10px 0;
              box-sizing: border-box;
              cursor: pointer;
            }
          }
        }
        .signBgMainFoot {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          padding: 0 20px;
          box-sizing: border-box;
          span:nth-child(1) {
            display: inline-block;
            width: 110px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            background: #000;
            color: #fff;
            font-size: 10px;
            cursor: pointer;
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
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
