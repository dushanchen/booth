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
        <p>{{this.center}}</p>
        <p>相关搜索结果</p>
      </div>
    </div>
    <div class="searchDetails">
      <div class="searchTitle">
        <span>
          产品手册 brochure
          <span>{{searchList.brochureNum}}个</span>
        </span>
        <div class="Back" @click="toBack">返回搜索页</div>
      </div>
      <div class="BrDetailsList" v-if="searchList.brochureNum === 0">暂无数据</div>
      <div class="BrDetailsList">
        <div class="BrDetailsItem" v-for="(item, index) in searchList.brochures" :key="index">
          <div class="brochureItemImg" @click="lookbrochure(item.pdfUrl, item.id)">
            <img :src="`${item.coverUrl}`" alt>
          </div>
          <div class="brochureItemText">
            <div class="brochureItemHead">
              <div class="brochureItemName">
                <div class="brochureItemLogo" @click="toOthercore(item.id)">
                  <img :src="`${item.logoUrl}`" alt>
                </div>
                <div class="brochureLogoName">
                  <p>{{item.name}}</p>
                  <p>{{item.fansNumber}}关注者</p>
                  <p>{{item.industryName}}</p>
                </div>
              </div>
              <div class="brochureItemNum">阅读量 {{item.readVolume}}</div>
            </div>
            <div class="brochureItemmanual">
              <p>{{item.title}}</p>
              <div class="label">
                <span v-for="(item, num) in item.label.split(',')" :key="num" v-show="item">{{item}}</span>
              </div>
              <div class="brochureintroduce">{{item.summary}}</div>
            </div>
          </div>
        </div>
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
      center: this.$route.query.center,
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
      }
    };
  },
  created() {
    window.scrollTo(0, 0);

    this._search();
  },
  methods: {
    _search() {
      search(this.center).then(res => {
        if (res.data.code === 0) {
          this.searchList = res.data.data;
          console.log(res.data.data);
        }
      });
    },
    lookbrochure(url, id) {
      getProductById(id, this.$store.state.user.UserID).then(res => {
        if (res.data.code === 0) {
          console.log("查看成功");
        }
      });
      window.open(url, "_blank");
    },
    toOthercore(id) {
      this.$router.push({
        path: `/othercore`,
        query: { id: id }
      });
    },
    toBack() {
      console.log("123");
      this.$router.push({
        name: `search`,
        query: { center: this.center }
      });
    },
    toExhibition() {
      this.$router.push({
        name: `searchExhibition`,
        query: {
          center: this.center
        }
      });
    },
    toBrochure() {
      this.$router.push({
        name: `searchBrochure`,
        query: {
          center: this.center
        }
      });
    },
    toCompany() {
      this.$router.push({
        name: `searchCompaby`,
        query: {
          center: this.center
        }
      });
    },
    toImages() {
      this.$router.push({
        name: `searchImages`,
        query: {
          center: this.center
        }
      });
    },
    toEvent() {
      this.$router.push({
        name: `searchEvent`,
        query: {
          center: this.center
        }
      });
    }
  }
};
</script>

<style lang="scss">
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
  .searchDetails {
    width: calc(100% - 194px);
    height: 100%;
    margin-left: 10px;
    background: #f2f2f2;
    padding: 14px 14px 0;
    box-sizing: border-box;
    overflow: auto;
    .searchTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      span {
        font-size: 18px;
        font-weight: bold;
        span {
          font-weight: normal;
          margin-left: 20px;
          font-size: 24px;
        }
      }
      .Back {
        cursor: pointer;
      }
    }
    .BrDetailsList {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .BrDetailsItem {
        width: 48%;
        display: flex;
        margin: 0 auto;
        margin: 0 1% 20px;
        .brochureItemImg {
          width: 162px;
          background: #fff;
          cursor: pointer;
        }
        .brochureItemText {
          width: calc(100% - 182px);
          margin-left: 20px;
          background: #f2f2f2;
          .brochureItemName {
            display: flex;
            .brochureItemLogo {
              width: 66px;
              cursor: pointer;
            }
            .brochureLogoName {
              margin-left: 10px;
              p:nth-child(1) {
                margin-top: 4px;
                font-size: 14px;
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
              height: 64px;
              background: rgba($color: #000000, $alpha: 0.2);
              margin-top: 10px;
              padding: 6px;
              box-sizing: border-box;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
