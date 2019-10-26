<template>
  <div class="productList">
    <div class="productListHeard" v-if="this.$route.query.id">
      <div class="productListHeardLogo">
        <img :src="datalist.user.logoUrl" alt>
        <img src="../../assets/images/home/head2.png" alt v-if="datalist.user.logoUrl == null">
      </div>
      <div class="productListHeardName">
        <div class="productListHeardNameTop">
          <div class="productListName">
            <p>{{datalist.user.name}}</p>
            <p>{{datalist.user.fansNumber}}位关注者</p>
            <p>{{datalist.user.industryName}}</p>
          </div>
        </div>
        <div class="productListHeardNameBottom">
          <!-- <div class="follow">关注</div> -->
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
      </div>
    </div>
    <div class="productListHeard" v-if="!this.$route.query.id">
      <div class="productListHeardLogo">
        <img
          src="../../assets/images/home/head2.png"
          alt
          v-if="this.$store.state.userData.logoPicUrl == null"
        >
        <img :src="this.$store.state.userData.logoPicUrl" alt>
      </div>
      <div class="productListHeardName">
        <div class="productListHeardNameTop">
          <div class="productListName">
            <p>{{this.$store.state.userData.name}}</p>
            <p>{{this.$store.state.userData.fansNumber}}位关注者</p>
            <p>{{this.$store.state.userData.oneIndustryname}}</p>
          </div>
        </div>
        <!-- <div class="productListHeardNameBottom">
          <div class="follow">关注</div>
        </div>-->
      </div>
    </div>
    <div class="productListTitle">
      产品册
      <div class="productListTitleBtn" v-if="!this.$route.query.id">
        <span @click="toInfofour">更多</span>
      </div>
    </div>
    <div class="productListMain">
      <p v-if="AllProducts.length === 0">暂无数据</p>
      <div
        class="aboutTopItem"
        v-for="(item, index) in AllProducts"
        :key="index"
        :style="{width: Widthpx}"
      >
        <div class="brochureItemImg" @click="looKcoverUrl(item.pdfUrl, item.id)">
          <img :src="item.coverUrl" alt>
        </div>
        <div class="brochureItemText">
          <div class="brochureItemmanual">
            <div class="brochureItemmanualHead">
              <p>{{item.title}}</p>
              <div class="label">
                <span v-for="(item, num) in item.label.split(',')" :key="num" v-show="item">{{item}}</span>
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
            <span @click="_cancelCollection(item.id)" v-if="item.isCollected == 1">已收藏</span>
            <span @click="_collection(item.id)" v-if="item.isCollected == 2">收藏</span>
          </div>
          <div class="brochureReadLsit">
            <p v-if=" item.users.length === 0">暂无数据</p>
            <div v-for="(item, index) in item.users" :key="index" :style="{width: imgWidth}">
              <img :src="`${item.logoUrl}`" alt>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAllProducts,
  getCompanyInfo,
  getProductById,
  focus,
  cancelFocus,
  collection,
  cancelCollection,
  ERR_OK
} from "@/api/api.js";
export default {
  name: "productList",
  data() {
    return {
      AllProducts: [],
      datalist: {
        isConcerned: "",
        user: {
          id: "",
          industryName: "",
          logoUrl: "",
          fansNumber: "",
          name: ""
        }
      },
      followData: {
        userId: "",
        concernedId: ""
      },
      collectionData: {
        otherId: "",
        type: 1,
        userId: this.$store.state.user.UserID
      },
      Widthpx: "48%",
      imgWidth: ''
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
    if (this.$route.query.id) {
      this._getAllProducts(this.$route.query.id, this.$store.state.user.UserID);
      this._getCompanyInfo();
    } else {
      this._getAllProducts(
        this.$store.state.user.UserID,
        this.$store.state.user.UserID
      );
    }
  },
  methods: {
    _collection(id) {
      this.collectionData.otherId = id;
      collection(this.collectionData).then(res => {
        this._getAllProducts(
          this.$route.query.id,
          this.$store.state.user.UserID
        );
      });
    },
    _cancelCollection(id) {
      this.collectionData.otherId = id;
      cancelCollection(this.collectionData).then(res => {
        this._getAllProducts(
          this.$route.query.id,
          this.$store.state.user.UserID
        );
      });
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
    _getCompanyInfo() {
      getCompanyInfo(this.$store.state.user.UserID, this.$route.query.id).then(
        res => {
          if (res.status === ERR_OK) {
            this.datalist = res.data.data;
          }
        }
      );
    },
    _getAllProducts(id, userID) {
      getAllProducts(id, userID).then(res => {
        if (res.data.code === 0) {
          console.log(res.data.data);
          this.AllProducts = res.data.data;
          if (this.AllProducts.length == 1) {
            this.Widthpx = "68%";
            this.imgWidth = '8%'
          } else if (
            this.AllProducts.length == 2 ||
            this.AllProducts.length == 4
          ) {
            this.Widthpx = "48%";
            this.imgWidth = '18%'
          } else if (this.AllProducts.length == 3) {
            this.Widthpx = "31%";
            this.imgWidth = '18%'
          } else {
            this.Widthpx = "31%";
            this.imgWidth = '18%'
          }
        }
      });
    },
    looKcoverUrl(url, id) {
      getProductById(id, this.$store.state.user.UserID).then(res => {
        if (res.data.code === 0) {
          console.log("查看成功");
        }
      });
      window.open(url, "_blank");
    },
    toInfofour() {
      this.$router.push({
        path: `/infofour`
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
  }
};
</script>

<style lang="scss" scoped>
.productList {
  // height: calc(100vh - 218px);
  min-height: 582px;
  box-sizing: border-box;
  .productListTitle {
    text-align: center;
    margin: 20px 0 50px;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    font-weight: bold;
    position: relative;
    .productListTitleBtn {
      position: absolute;
      right: 0;
      top: 6px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      span {
        display: block;
        width: 60px;
        height: 20px;
        background: #000;
        color: #fff;
        text-align: center;
        line-height: 20px;
        font-size: 10px;
        margin-left: 4px;
        cursor: pointer;
      }
    }
  }
  .productListHeard {
    padding: 30px 20px;
    display: flex;
    .productListHeardLogo {
      width: 100px;
      height: 100px;
      background: #fff;
      img {
        width: 100%;
      }
    }
    .productListHeardName {
      width: calc(100% - 66px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .productListHeardNameTop {
        display: flex;
        width: 100%;
        .productListName {
          padding-left: 30px;
          box-sizing: border-box;
          color: #fff;
          p:nth-child(1) {
            font-size: 28px;
            color: #fff;
            margin-bottom: 6px;
          }
          p:nth-child(3) {
            margin-top: 10px;
            color: #648aa2;
          }
        }
      }
      .productListHeardNameBottom {
        padding-left: 30px;
        box-sizing: border-box;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: flex-end;
        .follow {
          padding: 6px 10px;
          text-align: center;
          background: #fff;
          color: #000;
          cursor: pointer;
          font-size: 10px;
        }
      }
    }
  }
  .productListMain > p {
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }
  .productListMain {
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-between;
    box-sizing: border-box;
    overflow: hidden;
    margin: 30px;
    .aboutTopItem {
      float: left;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 10px;
      box-sizing: border-box;
      .brochureItemImg {
        width: 140px;
        text-align: center;
      }
      .brochureItemText {
        width: calc(100% - 140px);
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
            text-align: right;
            p {
              font-size: 10px;
              text-align: right;
            }
          }
        }
        .brochuremover {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          margin: 10px 0;
          span:nth-child(2) {
            cursor: pointer;
            background: #000;
            color: #fff;
            font-size: 10px;
            padding: 4px 10px;
          }
        }
        .brochureReadLsit {
          font-size: 10px;
          div {
            float: left;
            text-align: center;
            margin: 0 1% 10px;
            overflow: hidden;
            img {
              border-radius: 10px;
              height: 60px;
              width: 60px;
            }
          }
        }
      }
    }
  }
}
</style>
