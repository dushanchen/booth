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
          展会 exhibition
          <span>{{searchList.exhibitionNum}}个</span>
        </span>
        <div class="Back" @click="toBack">返回搜索页</div>
      </div>
      <div class="ExDetailsList" v-if="searchList.exhibitionNum === 0">暂无数据</div>
      <div class="ExDetailsList">
        <div
          class="ExDetailsItem"
          v-for="(item, index) in searchList.exhibitions"
          :key="index"
          @click="toDetailsOne(item.id)"
        >
          <div class="ExDetailsItemImg">
            <img :src="`${item.bannerUrl.split(',')[0]}`" alt>
          </div>
          <div class="ExDetailsItemName">
            <p>{{item.nameEng}} {{item.name}}</p>
            <div class="ExBtn">分享</div>
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
    toBack() {
      console.log("123");
      this.$router.push({
        name: `search`,
        query: { center: this.center }
      });
    },
    toDetailsOne(id) {
      this.$router.push({
        path: `/exhibitionDetails`,
        query: { id: id }
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
    .ExDetailsItem {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      cursor: pointer;
      .ExDetailsItemImg {
        width: 80%;
        img {
          width: 100%;
        }
      }
      .ExDetailsItemName {
        width: 18%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          font-size: 20px;
        }
        .ExBtn {
          background: #326b90;
          color: #fff;
          width: 50px;
          height: 30px;
          text-align: center;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
