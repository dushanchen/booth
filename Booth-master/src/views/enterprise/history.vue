<template>
  <div class="history">
    <div class="historyNav">
      <div class="historyList">
        <div class="historyItem" @click="toEnterprise">发现</div>
        <div class="historyItem ItemAct" @click="toHistory">历史记录</div>
        <div class="historyItem" @click="toCollection">收藏</div>
      </div>
    </div>
    <div class="historyBox">
      <div class="HBoxOne">
        <div class="historyItemName">企业</div>
        <div class="historyItem">
          <p v-if=" dataList.users.length === 0">暂无数据</p>
          <div class="historyItemA">
            <div class="historyItemAItem" v-for="(item, index) in dataList.users" :key="index">
              <div class="historyItemHead" @click="toOthercore(item.userId)">
                <img :src="`${item.logoUrl}`" alt>
              </div>
              <div class="historyItemLeftTitle">
                <p>{{item.name}}</p>
                <p>{{item.fansNumber}} 位关注者</p>
                <p>{{item.industryName}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="HBoxTwo">
        <div class="historyItemName">产品册</div>
        <div class="historyItem">
          <p v-if=" dataList.products.length === 0">暂无数据</p>
          <div class="historyItemB">
            <div class="historyItemBItem" v-for="(item, index) in dataList.products" :key="index">
              <div class="brochureItemImg" @click="pdfUrlUrL(item.pdfUrl, item.id)">
                <img :src="`${item.coverUrl}`" alt>
              </div>
              <div class="brochureItemText">
                <div class="brochureItemHead">
                  <div class="brochureItemName">
                    <div class="brochureItemLogo" @click="toOthercore(item.userId)">
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
        </div>
      </div>
      <div class="HBoxThree">
        <div class="historyItemName">图片</div>
        <div class="historyItem">
          <p v-if=" dataList.pictures.length === 0">暂无数据</p>
          <div class="historyItemImg" v-for="(item, index) in dataList.pictures" :key="index">
            <img :src="item.url" alt>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistoryRecord, getProductById, ERR_OK } from "@/api/api.js";

export default {
  name: "history",
  data() {
    return {
      dataList: {
        pictures: [],
        products: [],
        users: []
      }
    };
  },
  created() {
    if (!this.$store.state.user.UserID) {
      this.$router.push({
        name: `loginList`,
      });
      return
    }
    window.scrollTo(0, 0);
    this._getHistoryRecord();
  },
  methods: {
    _getHistoryRecord() {
      getHistoryRecord(this.$store.state.user.UserID).then(res => {
        if (res.data.code === 0) {
          console.log(res.data.data);
          this.dataList = res.data.data;
        }
      });
    },
    toOthercore(id) {
      this.$router.push({
        path: `/othercore`,
        query: { id: id }
      });
    },
    pdfUrlUrL(url, id) {
      getProductById(id, this.$store.state.user.UserID).then(res => {
        if (res.data.code === 0) {
          console.log("查看成功");
        }
      });
      window.open(url, "_blank");
    },
    toEnterprise() {
      this.$router.push({
        path: `/enterprise`
      });
    },
    toHistory() {
      this.$router.push({
        path: `/history`
      });
    },
    toCollection() {
      this.$router.push({
        path: `/collection`
      });
    }
  }
};
</script>

<style lang="scss">
.history {
  padding: 20px;
  height: calc(100vh - 218px);
  min-height: 585px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .historyNav {
    width: 140px;
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    border-right: 1px dashed #707070;
    display: flex;
    align-items: flex-end;
    .historyList {
      margin-top: 80px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .historyItem {
        width: 80px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
      }
      .ItemAct {
        font-weight: bold;
      }
    }
  }
  .historyBox {
    width: calc(100% - 140px);
    height: 100%;
    display: flex;
    .historyItemName {
      font-size: 18px;
      font-weight: bold;
      padding: 0 10px;
      margin-bottom: 20px;
    }
    .historyItem {
      width: 100%;
      .historyItemA {
        width: 100%;
        height: 100%;
        .historyItemAItem {
          display: flex;
          height: 100%;
          margin-bottom: 10px;
          .historyItemHead {
            width: 66px;
            cursor: pointer;
          }
          .historyItemLeftTitle {
            width: calc(100% - 66px);
            height: 100%;
            margin-left: 10px;
            p:nth-child(1) {
              font-size: 18px;
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
      }
      .historyItemB {
        width: 100%;
        height: 100%;
        margin-bottom: 10px;
        .historyItemBItem {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .brochureItemImg {
          width: 162px;
          background: #fff;
          cursor: pointer;
        }
        .brochureItemText {
          width: calc(100% - 172px);
          margin-left: 10px;
          // background: #f2f2f2;
          .brochureItemName {
            display: flex;
            .brochureItemLogo {
              width: 88px;
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
              margin-top: 5px;
              vertical-align: super;
            }
          }
          .brochureItemmanual {
            p {
              font-size: 16px;
              margin: 6px 0;
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
              width: 100%;
              height: 64px;
              background: rgba($color: #000000, $alpha: 0.2);
              margin-top: 10px;
              padding: 10px;
              box-sizing: border-box;
            }
          }
        }
      }
      .historyItemImg {
        width: 80px;
        height: 80px;
        background: #fff;
        margin: 0 10px 10px 0;
        float: left;
      }
    }
    .HBoxOne {
      width: 20%;
      height: 100%;
      padding: 0 10px;
      overflow: auto;
      box-sizing: border-box;
    }
    .HBoxTwo {
      width: 50%;
      height: 100%;
      padding: 0 10px;
      overflow: auto;
      box-sizing: border-box;
      border-right: 1px dashed #707070;
      border-left: 1px dashed #707070;
    }
    .HBoxThree {
      width: 30%;
      height: 100%;
      padding: 0 10px;
      overflow: auto;
      box-sizing: border-box;
    }
  }
}
</style>
