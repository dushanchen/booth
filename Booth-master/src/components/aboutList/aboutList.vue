<template>
  <div class="aboutList">
    <div class="aboutListTop">
      <div class="aboutListHead">产品册</div>
      <div class="aboutTopList">
        <p v-if="products.length == 0" style="text-align: center;">暂无数据</p>
        <div class="aboutTopItem" v-for="(item, index) in products" :key="index">
          <div class="brochureItemImg" @click="looKcoverUrl(item.pdfUrl, item.id)">
            <img :src="item.coverUrl" alt>
          </div>
          <div class="brochureItemText">
            <div class="brochureItemmanual">
              <div class="brochureItemmanualHead">
                <p>{{item.title}}</p>
                <div class="label">
                  <span
                    v-for="(item, num) in item.label.split(',')"
                    :key="num"
                    v-show="item"
                  >{{item}}</span>
                </div>
              </div>
              <div class="brochureintroduce">
                <p style="font-weight: bold;">阅读量&nbsp;&nbsp;{{item.readVolume}}</p>
                <p
                  style="font-weight: bold;"
                >{{`${new Date(item.createDate).getFullYear()}/${ 10 > (new Date(item.createDate).getMonth() + 1) ? '0' + (new Date(item.createDate).getMonth()+ 1) : new Date(item.createDate).getMonth()}/${ 10 > new Date(item.createDate).getDate() ? '0' + new Date(item.createDate).getDate() : new Date(item.createDate).getDate()}`}}</p>
              </div>
            </div>
            <div class="brochuremover">
              <span>谁读过</span>
              <span @click="toHistory()">了解更多</span>
            </div>
            <div class="brochureReadLsit">
              <p v-if=" item.users.length === 0">暂无数据</p>
              <div v-for="(item, index) in item.users" :key="index" @click="toOthercore(item.id)">
                <img :src="`${item.logoUrl}`" alt>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Seemover" @click="toMover()">查看所有产品册</div>
    </div>
    <div class="aboutListMiddle">
      <div class="aboutListHead">
        <span>合作伙伴</span>
        <!-- <span>更多</span> -->
      </div>
      <div class="aboutListMiddleNav">
        <span :class="{act: indexType === 1}" @click="_getPartner(1)">主要顾客</span>
        <span :class="{act: indexType === 2}" @click="_getPartner(2)">主要供应商</span>
        <span :class="{act: indexType === 3}" @click="_getPartner(3)">主要第三方服务</span>
      </div>
      <div class="aboutListMiddlelist" :style="`height:${heiline}`">
        <div v-for="(item, index) in cooperationData" :key="index">
          <div class="enterpriseItem" v-if="item.isRegister">
            <div class="enterpriseItemLeft">
              <div class="enterpriseItemHead">
                <img src="../../assets/images/home/head2.png" alt v-if="item.isRegister == 1">
                <img :src="`${item.user.logoUrl}`" alt v-else @click="toOthercore(item.user.id)">
              </div>
              <div class="enterpriseItemLeftTitle">
                <p v-if="item.user" @click="toOthercore(item.user.id)">
                  {{item.user.name}}
                  <span
                    v-if="item.user && item.isRegister != 1 && item.isAuth == 0 "
                  >未认证</span>
                  <span v-if="item.user && item.isRegister != 1 && item.isAuth == 2 ">未认证</span>
                  <span
                    v-if="item.user && item.isRegister != 1 && item.isAuth == 1 "
                    class="act"
                  >已认证</span>
                </p>
                <p v-if="item.user && item.isRegister != 1">{{item.user.fansNumber}}位关注者</p>
                <p v-if="item.user && item.isRegister != 1">{{item.user.industryName}}</p>
              </div>
            </div>
            <div class="enterpriseItemRight">
              <div class="enterpriseItemRightTop">
                <div
                  class="InterestListshareTrue"
                  v-if="item.user && item.isRegister != 1 && item.isAuth == 0 "
                >认证中</div>
                <div
                  class="InterestListshareTrue"
                  v-if="item.user && item.isRegister != 1 && item.isAuth == 2 "
                  @click="_sendRelationMsg(item.user.id)"
                >认证</div>
                <div
                  class="InterestListshare"
                  v-if="item.user && item.isRegister != 1"
                  @click="copyUrl(item.user.id)"
                >分享</div>
                <div
                  class="InterestListshare"
                  v-if="item.user && item.isRegister == 1"
                  @click="Invitation( item.user.name)"
                >邀请</div>
              </div>
              <div
                class="InterestListSee"
                v-if="item.user && item.isRegister != 1"
                @click="toMover(item.user.id)"
              >查看产品手册</div>
            </div>
          </div>
          <div class="already" v-if="item.exhibition">
            <div class="alreadyHead">
              <span>已参加</span>
              <p>
                {{item.exhibition.nameEng}}
                <br>
                {{item.exhibition.name}}
              </p>
            </div>
            <div class="alreadyTime">{{item.exhibition.dateEng}}</div>
          </div>
        </div>
        <div v-if="ind == 5">暂无数据</div>
      </div>
    </div>
    <div class="aboutListBootm">
      <div class="aboutListHead">
        <span>相似企业</span>
        <span @click="_getSimilarityCompany()">换一批</span>
      </div>
      <div class="aboutListMiddlelist" v-if="SimilarityCompanyData">
        <div v-for="(item, index) in SimilarityCompanyData" :key="index">
          <div class="enterpriseItem">
            <div class="enterpriseItemLeft">
              <div class="enterpriseItemHead">
                <img :src="`${item.user.logoUrl}`" alt>
              </div>
              <div class="enterpriseItemLeftTitle">
                <p>{{item.user.name}}</p>
                <p>{{item.user.fansNumber}}位关注者</p>
                <p>{{item.user.industryName}}</p>
              </div>
            </div>
            <div class="enterpriseItemRight">
              <div class="InterestListshare" @click="copyUrl(item.user.id)">分享</div>
              <div class="InterestListSee" @click="toMover(item.user.id)">查看产品手册</div>
            </div>
          </div>
          <div class="already" v-if="item.exhibition">
            <div class="alreadyHead">
              <span>已参加</span>
              <p>
                {{item.exhibition.nameEng}}
                <br>
                {{item.exhibition.name}}
              </p>
            </div>
            <div class="alreadyTime">{{item.exhibition.dateEng}}</div>
          </div>
        </div>
      </div>
      <div class="aboutListMiddlelist" v-else style="text-align: center;">暂无相似企业</div>
    </div>
    <div class="aboutListBootm" style="background: #C1CCD4;">
      <div class="aboutListHead">
        <span>感兴趣的展会</span>
      </div>
      <div class="aboutListMiddlelist" v-if="interestedExhibitions.length > 0">
        <div
          class="InterestItem"
          v-for="(item, index) in interestedExhibitions"
          :key="index"
          @click="toDetails(item.id)"
        >{{item.name}}</div>
      </div>
      <div class="aboutListMiddlelist" style="text-align: center;" v-else>暂无感兴趣的展会</div>
    </div>
  </div>
</template>
<script>
import {
  getPartner,
  getSimilarityCompany,
  getProductById,
  sendRelationMsg,
  sendAuthEmail
} from "@/api/api.js";

export default {
  name: "aboutList",
  props: ["products", "interestedExhibitions"],
  data() {
    return {
      aboutTopData: this.$store.state.userData.products,
      cooperationData: [],
      ind: 0,
      SimilarityCompanyData: [],
      indexType: 1,
      id: "",
      heiline: "auto",
      Updata: {
        relationId: 0,
        relationType: 0,
        userId: this.$store.state.user.UserID
      },
      UpdataList: {
        email: "",
        companyName: "",
        id: this.$store.state.user.UserID,
        name: "",
        type: 1
      }
    };
  },
  created() {
    this._getPartner(1);
    this._getSimilarityCompany();
    console.log(this.interestedExhibitions, "感兴趣展会");
  },
  methods: {
    _sendRelationMsg(id) {
      this.Updata.relationType = this.indexType;
      this.Updata.relationId = id;
      sendRelationMsg(this.Updata).then(res => {
        if (res.data.code === 0) {
          this.$router.push({
            path: `/register`
          });
        }
      });
    },
    toDetails(id) {
      if (id == "0") {
        return;
      }
      this.$router.push({
        path: `/exhibitionDetails`,
        query: { id: id }
      });
    },
    _getSimilarityCompany() {
      getSimilarityCompany(this.$store.state.user.UserID).then(res => {
        if (res.data.code === 0) {
          this.SimilarityCompanyData = res.data.data;
        }
      });
    },
    _getPartner(type) {
      this.indexType = type;
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
    looKcoverUrl(url, id) {
      getProductById(id, this.$store.state.user.UserID).then(res => {
        if (res.data.code === 0) {
        }
      });
      window.open(url, "_blank");
    },
    toHistory() {
      this.$router.push({
        path: `/history`
      });
    },
    toOthercore(id) {
      // if (!this.$store.state.user.UserID) {
      //   this.showBox = true;
      // } else {
      if (id) {
        this.$router.push({
          path: `/othercore`,
          query: { id: id }
        });
      }

      // }
    },
    Invitation(name) {
      this.$router.push({
        path: `/register`,
        query: { id: this.indexType, name: name }
      });
    },
    toMover(id) {
      this.$router.push({
        path: `/productList`,
        query: { id: id }
      });
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
    }
  }
};
</script>

<style lang="scss">
.aboutList {
  width: 100%;
  .InvitationBox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000, $alpha: 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .InvitationBoxItem {
      width: 400px;
      background: #2c73a1;
      padding: 24px 36px;
      box-sizing: border-box;
      position: relative;

      .InvitationBoxItemInput {
        width: 100%;
        display: flex;
        align-items: center;
        height: 40px;
        border: 2px solid #000;
        margin-bottom: 20px;
        position: relative;
        box-sizing: border-box;
        padding: 0 10px;
        box-sizing: border-box;
        label {
          display: block;
          width: 70px;
          text-align: center;
        }
        select,
        input {
          display: block;
          width: 200px;
          background: rgba($color: #000, $alpha: 0);
          outline: none;
          color: #000;
          &::-webkit-input-placeholder {
            color: #000;
          }
        }
      }
      .InvitationBoxItemBtn {
        width: 100%;
        display: flex;
        justify-content: center;
        span {
          display: block;
          width: 100px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
          box-sizing: border-box;
          &.qu {
            border: 1px solid #000;
            margin-right: 20px;
          }
          &.true {
            background: #000;
            color: #fff;
          }
        }
      }
    }
  }
  // 标题 统一
  .aboutListHead {
    font-size: 18px;
    font-weight: bold;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    span {
      font-size: 18px;
      font-weight: bold;
      display: inline-block;
    }
    span:nth-child(2) {
      background: #000;
      color: #fff;
      width: 50px;
      height: 20px;
      font-size: 10px;
      text-align: center;
      line-height: 20px;
      cursor: pointer;
    }
  }
  .aboutListTop {
    padding: 10px;
    box-sizing: border-box;
    background: rgba($color: #d6d6d6, $alpha: 0.5);
    margin-bottom: 10px;
    .aboutTopList {
      width: 100%;
      box-sizing: border-box;
      .aboutTopItem {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        .brochureItemImg {
          width: 120px;
          background: #fff;
        }
        .brochureItemText {
          width: calc(100% - 120px);
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
            display: flex;
            justify-content: space-between;
            align-items: center;
            .brochureItemmanualHead {
              width: 70%;
            }
            p {
              font-size: 16px;
              margin: 6px 0;
              text-align: left;
            }
            .label {
              display: flex;
              flex-wrap: wrap;
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
              width: 30%;
              p {
                font-size: 10px;
                text-align: right;
              }
            }
          }
          .brochuremover {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            margin: 10px 0;
            span:nth-child(2) {
              cursor: pointer;
            }
          }
          .brochureReadLsit {
            display: flex;
            flex-wrap: wrap;
            font-size: 10px;
            height: 60px;
            overflow: hidden;
            div {
              margin: 0 1%;
              height: 60px;
              cursor: pointer;
              img {
                height: 100%;
              }
            }
          }
        }
      }
    }
    .Seemover {
      width: 85%;
      height: 42px;
      text-align: center;
      line-height: 42px;
      background: rgba($color: #648aa2, $alpha: 0.5);
      margin: 20px auto 0;
      cursor: pointer;
    }
  }
  .aboutListMiddle {
    padding: 10px;
    box-sizing: border-box;
    background: rgba($color: #d6d6d6, $alpha: 0.5);
    margin-bottom: 10px;
    .aboutListMiddleNav {
      display: flex;
      padding: 10px;
      justify-content: space-between;
      margin-bottom: 20px;
      span {
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        padding: 6px 0;
        &.act {
          border-bottom: 2px solid #000;
        }
      }
    }
  }
  .aboutListBootm {
    padding: 10px;
    box-sizing: border-box;
    background: rgba($color: #d6d6d6, $alpha: 0.5);
    margin-bottom: 10px;
    .InterestItem {
      padding: 10px;
      font-size: 16px;
      font-weight: bold;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
  .enterpriseItem {
    margin-bottom: 10px;
    display: flex;
    .enterpriseItemLeft {
      display: flex;
      width: 75%;
      // justify-content: space-between;
      .enterpriseItemHead {
        width: 66px;
        cursor: pointer;
      }
      .enterpriseItemLeftTitle {
        width: calc(100% - 66px);
        margin-left: 10px;
        p:nth-child(1) {
          font-size: 20px;
          font-weight: bold;
          line-height: 22px;
          cursor: pointer;
          span {
            font-size: 10px;
            display: inline-block;
            vertical-align: super;
            color: #969696;
            &.act {
              color: #af8c1a;
            }
          }
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
    }
    .enterpriseItemRight {
      height: 66px;
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      .enterpriseItemRightTop {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding-left: 10px;
        box-sizing: border-box;
        .InterestListshareTrue {
          background: #000;
          color: #fff;
          width: 50px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          font-size: 10px;
          cursor: pointer;
          margin-right: 10px;
        }
      }
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
        cursor: pointer;
      }
    }
  }
  .already {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-top: 2px solid #707070;
    margin: 20px 0;
    .alreadyHead {
      width: 250px;
      display: flex;
      align-items: center;
      span {
        display: block;
        width: 66px;
        height: 34px;
        text-align: center;
        line-height: 34px;
        background: #000;
        color: #fff;
      }
      p {
        width: 160px;
        font-size: 10px;
        margin-left: 8px;
        // margin-top: 5px;
      }
    }
    .alreadyTime {
      font-size: 14px;
      color: #000;
      // width: 100px;
      text-align: right;
    }
  }
}
</style>
