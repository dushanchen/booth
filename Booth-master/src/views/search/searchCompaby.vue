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
          企业 company
          <span>{{searchList.companyNum}}个</span>
        </span>
        <div class="Back" @click="toBack">返回搜索页</div>
      </div>
      <div class="CoDetailsList" v-if="searchList.companyNum === 0">
        暂无数据
      </div>
      <div class="CoDetailsList">
        <div class="CoDetailsItem" v-for="(item, index) in searchList.companies" :key="index">
          <div class="enterpriseItemLeft">
            <div class="enterpriseItemHead" @click="toOthercore(item.id)">
              <img :src="`${item.logoUrl}`" alt>
            </div>
            <div class="enterpriseItemLeftTitle">
              <p>{{item.name}}</p>
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
  </div>
</template>

<script>
import { search } from "@/api/api.js";

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
    toOthercore(id) {
      this.$router.push({
        path: `/othercore`,
        query: { id: id }
      });
    },
    toBrochureList(id) {
      this.$router.push({
        name: `productList`,
        query: { id: id }
      });
    },
    toBack() {
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
    .CoDetailsList {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .CoDetailsItem {
        width: 31%;
        margin: 0 1% 20px;

        height: 66px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        .enterpriseItemLeft {
          display: flex;
          height: 100%;
          .enterpriseItemHead {
            width: 88px;
            cursor: pointer;
          }
          .enterpriseItemLeftTitle {
            height: 100%;
            margin-left: 10px;
            p:nth-child(1) {
              font-size: 16px;
              font-weight: bold;
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
    }
  }
}
</style>
