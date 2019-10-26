<template>
  <div class="exhibitionDetails">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, index) in detailsData.bannerUrl.split(',')"
          :key="index"
        >
          <img :src="`${item}`" alt>
        </div>
      </div>
    </div>
    <div class="signUp" @click="showBox">参加报名</div>
    <div class="exhibitionTitle" id="exhibitionTitle">
      <div class="exhibitionLeft">
        <p>{{detailsData.nameEng}}</p>
        <p>{{detailsData.name}}</p>
        <div>
          <strong>主题：</strong>
          {{detailsData.title}}
        </div>
        <div>
          <strong>时间：</strong>
          {{detailsData.date}}
        </div>
        <div>
          <strong>地点：</strong>
          {{detailsData.location}}
        </div>
        <div>
          <strong>简述：</strong>
          {{detailsData.summary}}
        </div>
      </div>
      <div class="exhibitionRight" @click="lookImg(detailsData.summaryPicture)">
        <img :src="`${detailsData.summaryPicture}`" alt>
      </div>
    </div>
    <div class="TitleHead" id="TitleHead">展会地图</div>
    <div class="Map" @click="lookImg(detailsData.mapUrl)">
      <img :src="`${detailsData.mapUrl}`" alt>
    </div>
    <div class="exhibitionDetailsList" id="exhibitionDetailsList">
      <div class="TitleHead TitleHeadOne">
        <span :class="{act: indexType}" @click="TabNav(1)">参展商</span>
        <span :class="{act: !indexType}" @click="TabNav(2)">到访商</span>
        <div class="inputBox">
          <input type="text" placeholder="搜索展位/展商" v-model="content">
          <i class="icon iconSearch1" @click="search()"></i>
        </div>
      </div>
      <div class="DetailsListBox" v-if="indexType">
        <p v-if="ExhList.length === 0">暂无数据</p>
        <div class="companyItem" v-for="(item, index) in ExhList" :key="index">
          <!-- <p>{{item.stand}}</p> -->
          <div class="enterpriseItemLeft">
            <div class="enterpriseItemHead" @click="toOthercore(item.id)">
              <img :src="item.logoUrl" alt>
            </div>
            <div class="enterpriseItemLeftTitle">
              <p @click="toOthercore(item.id)">{{item.name}}</p>
              <p>{{item.fansNumber}}位关注者</p>
              <p class="enterpriseItemLeftTitle-Num">
                <span>{{item.industryName}}</span>
                <span class="button" v-if="item.stand">{{item.stand}}</span>
              </p>
            </div>
          </div>
          <div class="enterpriseItemRight" v-if="item.isRegister != 1">
            <div class="InterestListshare" @click="copyUrl(item.id)">分享</div>
            <div class="InterestListSee" @click="toMover(item.id)">查看产品手册</div>
          </div>
        </div>
      </div>
      <div class="DetailsListBox" v-if="!indexType">
        <p v-if="VisList.length === 0">暂无数据</p>
        <div class="companyItemTwo" v-for="(item, index) in VisList" :key="index">
          <div class="companyItemTwoLeft">
            <div class="companyItemTwoLeftImg" @click="toOthercore(item.id)">
              <img :src="item.logoUrl" alt>
            </div>
            <div class="companyItemTwoLeftname">
              <p @click="toOthercore(item.id)">{{item.name}}</p>
              <p>{{item.fansNumber}}关注者</p>
              <p>{{item.industryName}}</p>
            </div>
            <div class="companyItemTwoLeftshare" v-if="item.isRegister != 1">
              <div class="InterestListshare" @click="copyUrl(item.id)">分享</div>
              <div class="InterestListSee" @click="toMover(item.id)">查看产品手册</div>
            </div>
          </div>
          <div class="companyItemTwoRight">
            <div v-if="item.precentDate" class="companyItemTwoRightList">
              <p>已确认到场</p>
              <p>{{`${new Date(item.precentDate).getFullYear()}/${ 10 > (new Date(item.precentDate).getMonth() + 1) ? '0' + (new Date(item.precentDate).getMonth()+ 1) : new Date(item.precentDate).getMonth()}/${ 10 > new Date(item.precentDate).getDate() ? '0' + new Date(item.precentDate).getDate() : new Date(item.precentDate).getDate()}`}}</p>
            </div>
            <span v-if="!item.precentDate" @click="Invitation(item.id)">邀请</span>
          </div>
        </div>
      </div>
    </div>
    <div class="timebox" id="timebox">
      <P>{{detailsData.date}}</P>
      <p>{{detailsData.dateEng}}</p>
    </div>
    <div class="Map1" @click="lookImg(detailsData.trafficUrl)" id="Map1">
      <img :src="`${detailsData.trafficUrl}`" alt>
    </div>
    <div class="signUpBox" v-if="show">
      <div class="signUpBoxItem">
        <div class="signUpBoxhead">参加报名</div>
        <div class="signUpBoxMove">
          <p @click="showBox">取消</p>
          <div @click="addMan" v-if="addHide">添加人员</div>
        </div>
        <div class="signUpBoxList">
          <div class="signUpBoxListItem" v-for="(item, index) in signUp" :key="index">
            <div class="signUpBoxListItemOne">
              <p>
                姓名
                <!-- <span v-if="!item.name" class="Err">未输入</span> -->
              </p>
              <input type="text" v-model="item.name" placeholder="请输入姓名">
            </div>
            <div class="signUpBoxListItemOne">
              <p>职务</p>
              <select v-model="item.position">
                <option value="1">市场及销售</option>
                <option value="2">采购</option>
                <option value="3">管理</option>
                <option value="4">技术</option>
                <option value="5">生产及运营</option>
                <option value="6">其他</option>
              </select>
            </div>
            <div class="signUpBoxListItemTwo">
              <p>
                联系方式
                <!-- <span v-if="!item.mobile" class="Err">未输入</span> -->
              </p>
              <input type="text" v-model="item.mobile" placeholder="请输入邮箱或者电话">
            </div>
            <div class="signUpBoxListItemTwo" style="width: 50%">
              <p>到场时间</p>
              <datepicker :value="item.precentDate" format="YYYY-MM-DD" name="date2"></datepicker>
            </div>
            <div class="signUpBoxListItemTwo" style="width: 50%">
              <p>离场时间</p>
              <datepicker :value="precentDate" format="YYYY-MM-DD" name="date2"></datepicker>
            </div>
          </div>
        </div>
        <div class="signUpBoxBtn" @click="UpList">确认报名</div>
      </div>
    </div>
    <div class="suspensionBox">
      <div
        class="suspensionBoxList"
        :class="{BoxListact: typeIndex == '1'}"
        @click="TabNavBox('1')"
      >展会概念</div>
      <div
        class="suspensionBoxList"
        :class="{BoxListact: typeIndex == '2'}"
        @click="TabNavBox('2')"
      >展会地图</div>
      <div
        class="suspensionBoxList"
        :class="{BoxListact: typeIndex == '3'}"
        @click="TabNavBox('3')"
      >参展列表</div>
      <div
        class="suspensionBoxList"
        :class="{BoxListact: typeIndex == '4'}"
        @click="TabNavBox('4')"
      >展会日期</div>
      <div
        class="suspensionBoxList"
        :class="{BoxListact: typeIndex == '5'}"
        @click="TabNavBox('5')"
      >展会交通</div>
    </div>
    <div class="sessceBox" v-if="SuccessBox" @click="hideSuccess">恭喜，报名成功！</div>
    <div class="sessceBox" v-if="SuccessBoxImg" @click="hideSuccess">
      <img :src="SuccessImg" alt>
    </div>
    <div class="boxLoing" v-if="showBox2">
      <p>您还未登录，是否去登录？</p>
      <div>
        <span @click="quxiao2">取消</span>
        <span @click="tologinList">去登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import datepicker from "vue-date-picker";
import {
  getExhibitionInfoById,
  enrollExhibition,
  getAllExhibitiors,
  getAllVisitors,
  inviteToExhibition,
  ERR_OK
} from "@/api/api.js";
import { getUser } from "@/utils/auth.js";

export default {
  data() {
    return {
      content: "",
      show: false,
      showBox2: false,
      SuccessBox: false,
      SuccessBoxImg: false,
      SuccessImg: "",
      indexType: true,
      typeIndex: "1",
      addHide: true,
      precentDate: "2019-08-01",
      signUp: [
        {
          exhibitionId: this.$route.query.id,
          userId: getUser(),
          name: null,
          mobile: null,
          precentDate: "2019-01-01",
          outDate: "2019-01-01",
          position: "1"
        }
      ],
      detailsData: {
        bannerUrl: "", //
        date: "", //
        dateEng: "", //
        id: "", //
        isUpper: "", //
        mapUrl: "", //
        summary: "", //
        summaryPicture: "", //
        titleEng: "", //
        trafficUrl: "", //,
        nameEng: "",
        name: "",
        location: ""
      },
      AllExh: {
        exhibitionId: this.$route.query.id,
        userId: this.$store.state.user.UserID,
        content: ""
      },
      AllVis: {
        exhibitionId: this.$route.query.id,
        userId: this.$store.state.user.UserID,
        content: ""
      },
      ExhList: [],
      VisList: [],
      inviteTo: {
        exhibitionId: this.$route.query.id,
        relationId: "",
        userId: this.$store.state.user.UserID
      }
    };
  },
  created() {
    // if (!this.$store.state.user.UserID) {
    //   this.$router.push({
    //     name: `loginList`
    //   });
    //   return;
    // }
    window.scrollTo(0, 0);
    this._getExhibitionInfoById(this.$route.query.id);
    this._getAllExhibitiors();
    this._getAllVisitors();
  },
  components: {
    datepicker
  },
  updated() {
    // let _this = this;
    // var swiper = new Swiper(".swiper-container", {
    //   slidesPerView: 1,
    //   spaceBetween: 30,
    //   loop: true,
    //   autoplay: {
    //     delay: 3000,
    //     disableOnInteraction: false
    //   },
    //   pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true
    //   },
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev"
    //   }
    // });
  },
  methods: {
    _getAllExhibitiors() {
      getAllExhibitiors(this.AllExh).then(res => {
        if (res.data.code === 0) {
          this.ExhList = res.data.data;
        }
      });
    },
    _getAllVisitors() {
      getAllVisitors(this.AllVis).then(res => {
        if (res.data.code === 0) {
          this.VisList = res.data.data;
        }
      });
    },
    _enrollExhibition() {
      enrollExhibition(this.signUp).then(res => {
        if (res.data.code === 0) {
          this.show = false;
          this.SuccessBox = true;
          this.addHide = true;
        }
      });
    },
    _getExhibitionInfoById(id) {
      getExhibitionInfoById(id).then(res => {
        if (res.data.code === 0) {
          this.detailsData = res.data.data;
        }
      });
    },
    TabNavBox(ind) {
      this.typeIndex = ind;
      if (this.typeIndex == "1") {
        var anchor = document.getElementById("exhibitionTitle");
        window.scrollTo(0, anchor.offsetTop);
      } else if (this.typeIndex == "2") {
        var anchor = document.getElementById("TitleHead");
        window.scrollTo(0, anchor.offsetTop);
      } else if (this.typeIndex == "3") {
        var anchor = document.getElementById("exhibitionDetailsList");
        window.scrollTo(0, anchor.offsetTop);
      } else if (this.typeIndex == "4") {
        var anchor = document.getElementById("timebox");
        window.scrollTo(0, anchor.offsetTop);
      } else {
        var anchor = document.getElementById("Map1");
        window.scrollTo(0, anchor.offsetTop);
      }
    },
    Invitation(id) {
      this.inviteTo.relationId = id;
      inviteToExhibition(this.inviteTo).then(res => {
        if (res.data.code === 0) {
          alert("邀请成功");
        }
      });
    },
    lookImg(url) {
      this.SuccessImg = url;
      this.SuccessBoxImg = true;
    },
    hideSuccess() {
      this.SuccessBox = false;
      this.SuccessBoxImg = false;
    },
    toOthercore(id) {
      this.$router.push({
        path: `/othercore`,
        query: { id: id }
      });
    },
    toMover(id) {
      console.log(id);
      this.$router.push({
        name: `productList`,
        query: { id: id }
      });
    },
    TabNav(num) {
      this.AllExh.content = "";
      this.AllVis.content = "";
      if (num === 1) {
        this.indexType = true;
        this._getAllExhibitiors();
      } else {
        this.indexType = false;
        this._getAllVisitors();
      }
    },
    search() {
      if (this.indexType) {
        this.AllExh.content = this.content;
        this._getAllExhibitiors();
      } else {
        this.AllVis.content = this.content;
        this._getAllVisitors();
      }
    },
    UpList() {
      console.log("123");
      console.log(this.signUp);
      console.log(JSON.stringify(this.signUp).indexOf("null") != -1);
      if (JSON.stringify(this.signUp).indexOf("null") != -1) {
        console.log("123");
        return;
      } else {
        this._enrollExhibition();
      }
    },
    addMan() {
      let arr = {
        exhibitionId: this.$route.query.id,
        userId: getUser(),
        name: null,
        mobile: null,
        precentDate: "2019-01-01",
        outDate: "2019-01-01",
        position: "1"
      };
      this.signUp.push(arr);
      if (this.signUp.length >= 4) {
        this.addHide = false;
      }
    },
    showBox() {
      if (!this.$store.state.user.UserID) {
        this.showBox2 = true;
        this.addHide = true;
      } else {
        this.show = !this.show;
        this.addHide = true;
        this.signUp = [
          {
            exhibitionId: this.$route.query.id,
            userId: getUser(),
            name: null,
            mobile: null,
            precentDate: "2019-01-01",
            outDate: "2019-01-01",
            position: "1"
          }
        ];
      }
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
    tologinList() {
      this.$router.push({
        name: `loginList`
      });
    },
    quxiao2() {
      this.showBox2 = false;
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
.sessceBox {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba($color: #000000, $alpha: 0.4);
  color: #fff;
  font-size: 40px;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.exhibitionDetails {
  background: #fff;
  .swiper-container {
    width: 100%;
    height: 472px;
    margin-left: auto;
    margin-right: auto;
  }
  .swiper-slide {
    width: 100%;
    height: 100%;
  }
  .swiper-slide > img {
    width: 100%;
    height: 100%;
  }
}
.signUpBox {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba($color: #000000, $alpha: 0.2);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999999;
  .signUpBoxItem {
    max-width: 638px;
    max-height: 90vh;
    background: #fff;
    padding: 0 20px;
    box-sizing: border-box;
    // overflow: auto;
    .signUpBoxhead {
      text-align: center;
      font-size: 24px;
      margin: 10px 0;
    }
    .signUpBoxMove {
      width: 100%;
      text-align: right;
      overflow: hidden;
      font-size: 10px;
      margin: -20px 0 0px;
      p {
        margin-bottom: 10px;
        height: 18px;
        line-height: 18px;
        cursor: pointer;
      }
      div {
        width: 56px;
        height: 22px;
        background: #000;
        color: #fff;
        text-align: center;
        line-height: 22px;
        float: right;
        cursor: pointer;
      }
    }
    .signUpBoxList {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      .signUpBoxListItem {
        width: 268px;
        height: 178px;
        background: #e0e8ec;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin: 10px;
        p {
          font-size: 10px;
          margin: 6px 0;
        }
        input,
        select {
          width: 100%;
          height: 20px;
        }

        .signUpBoxListItemOne {
          width: 50%;
          padding: 0 20px;
          box-sizing: border-box;
          .Err {
            color: red;
            font-size: 10px;
            margin-left: 10px;
          }
        }
        .signUpBoxListItemTwo {
          width: 100%;
          padding: 0 20px;
          box-sizing: border-box;
          .picker-wrap {
            bottom: 20px;
          }
          .Err {
            color: red;
            font-size: 10px;
            margin-left: 10px;
          }
        }
      }
    }
    .signUpBoxBtn {
      width: 56px;
      height: 22px;
      background: #326b90;
      color: #fff;
      text-align: center;
      line-height: 22px;
      margin: 20px auto;
      font-size: 10px;
      cursor: pointer;
    }
  }
}
.suspensionBox {
  position: fixed;
  top: 10vh;
  right: 0;
  height: 80vh;
  width: 200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  z-index: 99;
  .suspensionBoxList {
    width: 170px;
    height: 50px;
    margin: 10px 0;
    text-align: center;
    line-height: 50px;
    background: #c4d4df;
    font-size: 20px;
    cursor: pointer;
  }
  .BoxListact {
    background: #326b90;
    color: #fff;
  }
}
.signUp {
  height: 100px;
  line-height: 100px;
  width: 100%;
  text-align: center;
  font-size: 30px;
  cursor: pointer;
  background: rgba($color: #326b90, $alpha: 0.3);
}
.exhibitionTitle {
  display: flex;
  align-items: center;
  background: #eaeaea;
  padding: 80px;
  box-sizing: border-box;
  .exhibitionLeft {
    width: 50%;
    padding: 0 40px;
    box-sizing: border-box;
    font-size: 22px;
    p:nth-child(2) {
      margin-bottom: 20px;
    }
    div {
      margin-bottom: 10px;
      line-height: 30px;
      font-size: 22px;
      strong {
        font-weight: bold;
      }
    }
  }
  .exhibitionRight {
    width: 50%;
    height: 326px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.TitleHead {
  padding: 70px 70px 30px;
  font-size: 30px;
}
.TitleHeadOne {
  display: flex;
  span {
    margin-right: 30px;
    cursor: pointer;
  }
  .act {
    font-weight: bold;
  }
  .inputBox {
    width: 320px;
    height: 34px;
    // background: #fff;
    border: 1px solid #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    input {
      background: initial;
      outline: none;
      color: #000;
      width: 100%;
      height: 34px;
      font-size: 16px;
      padding: 0 10px;
      box-sizing: border-box;
      &::-webkit-input-placeholder {
        color: #000;
        font-size: 16px;
      }
    }
  }
}
.Map {
  margin-top: 30px;
  text-align: center;
}
.Map1 img {
  width: 100%;
}
.exhibitionDetailsList {
  margin-top: 80px;
  background: #eaeaea;
  padding-bottom: 50px;
  .DetailsListBox {
    width: 100%;
    padding: 0 70px;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    .companyItem {
      width: 33.33%;
      padding: 0 10px;
      box-sizing: border-box;
      margin-bottom: 20px;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      justify-content: space-between;
      .enterpriseItemLeft {
        display: flex;
        height: 100%;
        width: 77%;
        .enterpriseItemHead {
          width: 66px;
          margin-left: 10px;
          cursor: pointer;
        }
        .enterpriseItemLeftTitle {
          height: 100%;
          width: calc(100% - 66px);
          margin-left: 10px;
          p:nth-child(1) {
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
          }
          p:nth-child(2) {
            font-size: 14px;
            margin-top: 10px;
          }
          p:nth-child(3) {
            width: 100%;
            font-size: 12px;
            margin-top: 6px;
            color: #326b90;
            display: flex;
            justify-content: space-between;
            .button {
              display: inline-block;
              //  width: 50px;
              height: 30px;
              text-align: center;
              line-height: 30px;
              color: #000;
              background: #ffe76b;
              padding: 0 4px;
              font-size: 10px;
              margin-top: -10px;
              margin-right: 4px;
            }
          }
        }
      }
      .enterpriseItemRight {
        width: 20%;
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
          margin-bottom: 4px;
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
    .companyItemTwo {
      width: 48%;
      margin: 0 1%;
      box-sizing: border-box;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
      .companyItemTwoLeft {
        width: 70%;
        margin: 20px 0;
        display: flex;
        align-items: center;
        .companyItemTwoLeftImg {
          width: 66px;
          cursor: pointer;
        }
        .companyItemTwoLeftname {
          width: calc(80% - 100px);
          margin-left: 10px;
          p:nth-child(1) {
            font-size: 16px;
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
          }
        }
        .companyItemTwoLeftshare {
          width: 20%;
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
            margin-bottom: 4px;
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
      .companyItemTwoRight {
        width: 30%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #000;
        .companyItemTwoRightList {
          width: 100%;
          height: 100%;
          background: rgba($color: #648aa2, $alpha: 0.3);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p:nth-child(1) {
            font-size: 18px;
          }
          p:nth-child(2) {
            font-size: 14px;
            font-weight: bold;
            margin-top: 6px;
          }
        }
        span {
          display: block;
          width: 94px;
          height: 30px;
          background: #fff;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
        }
      }
    }
  }
  .moverBtn {
    width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 30px auto;
    i {
      margin-top: 6px;
    }
  }
}
.timebox {
  padding: 86px 0 60px;
  text-align: center;
  font-size: 24px;
  line-height: 30px;
}
</style>
