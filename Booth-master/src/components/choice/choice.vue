<template>
  <div class="choice">
    <div class="searchBox">
      <input type="text" placeholder="搜索你感兴趣的企业/展会" v-model="searchData" @keyup.enter="toSearch">
      <i class="icon iconSearch" @click="toSearch"></i>
    </div>
    <p style="color:#fff;  text-align: center;margin: 6px 0;font-size:10px;">或</p>
    <div class="choiceBox" @click="choiceShow()">
      选择您的所属行业 Select your industry
      <div class="choiceList" v-if="choiceBoxshow" style="height: 189px;">
        <div
          class="choiceItem"
          v-for="(items, index) in industryData"
          :key="index"
          :class="{ choiceItemHover: index == typeindex }"
          @mouseenter="mouseOver(index, items)"
          @click.stop="toBooth(items.industryName)"
        >{{ items.industryName }}</div>
      </div>
      <div class="choiceList" style="left:270px;max-height: 189px;" v-if="choiceBoxshow">
        <div class="choiceListChildren">
          <div
            class="choiceItem"
            @click.stop="toBooth(items.industryName, items.id)"
            v-for="(items, index) in items"
            :key="index"
          >{{items.industryName}}</div>
        </div>
      </div>
    </div>
    <div class="choiceBtn">
      <span @click="tosing">去注册</span>/
      <span @click="toLogin">去登陆</span>
    </div>
  </div>
</template>

<script>
import { getIndustry, ERR_OK } from "@/api/api.js";
import { setOne, setTwo, getOne } from "@/utils/auth.js";

export default {
  name: "choice",
  data() {
    return {
      choiceBoxshow: false,
      typeindex: 0,
      searchData: "",
      industryData: [],
      items: [],
      ToBooth: ""
    };
  },
  created() {
    setOne(1);
    this._getIndustry();
  },
  methods: {
    _getIndustry() {
      getIndustry().then(res => {
        if (res.status === ERR_OK) {
          this.industryData = res.data.data;
          this.items = this.industryData[0].secondIndustries;
        }
      });
    },
    tosing() {
      this.$router.push({
        path: `/sign`
      });
    },
    toLogin() {
      console.log('13')
      this.$router.push({
        name: `loginList`
      });
    },
    choiceShow() {
      this.choiceBoxshow = !this.choiceBoxshow;
      this.typeindex = 0;
    },
    mouseOver(index, data) {
      this.typeindex = index;
      this.items = data.secondIndustries;
      setOne(data.id);
      this.$store.commit("SET_oneIndustry", data.id);
    },
    toBooth(name, id) {
      this.choiceBoxshow = !this.choiceBoxshow;
      this.ToBooth = name;
      if (id) {
        setTwo(id);
        this.$store.commit("SET_twoIndustry", id);
      }
      this.$emit("cliceToBooth", this.ToBooth);
    },
    toSearch() {
      console.log(this.searchData);
      this.$router.push({
        path: `/search`,
        query: { center: this.searchData }
      });
    }
  }
};
</script>

<style lang="scss">
.choice {
  margin-bottom: 50px;
  .searchBox {
    width: 246px;
    height: 30px;
    border: 1px dashed #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconSearch {
      cursor: pointer;
    }
    input {
      background: initial;
      outline: none;
      color: #fff;
      width: 190px;
      margin-right: 10px;
      font-size: 12px;
      &::-webkit-input-placeholder {
        color: #fff;
        font-size: 12px;
      }
    }
  }
  .choiceBox {
    width: 248px;
    height: 40px;
    line-height: 40px;
    background: #fff;
    text-align: center;
    font-size: 10px;
    color: #326b90;
    cursor: pointer;
    position: relative;
    .choiceList {
      position: absolute;
      top: 45px;
      left: 0;
      width: 274px;
      // height: 189px;
      background: #fff;
      box-sizing: border-box;
      overflow: auto;
      .choiceItemHover {
        background: rgba($color: #326b90, $alpha: 0.2);
      }
      .choiceItem {
        text-align: left;
        width: 100%;
        // height: 24px;
        line-height: 24px;
        padding: 0 15px;
        box-sizing: border-box;
        color: #000;
        &:nth-child(1) {
          margin-top: 10px;
        }
        &:last-child {
          margin-bottom: 10px;
        }
      }
      .choiceListChildren {
        width: 100%;
        box-sizing: border-box;
        background: rgba($color: #326b90, $alpha: 0.2);
        div:last-child {
          border-bottom: none;
        }
        .choiceItem {
          margin: 0 10px;
          width: 90%;
          box-sizing: border-box;
          padding: 0;
          border-bottom: 1px solid #707070;
          &:nth-child(1) {
            margin-top: 0px;
          }
          &:last-child {
            margin-bottom: 0px;
          }
          &:hover {
            color: #fff;
          }
        }
      }
    }
  }
  .choiceBtn {
    width: 120px;
    height: 40px;
    background: #326b90;
    line-height: 40px;
    text-align: center;
    color: #fff;
    margin: 20px auto;
    cursor: pointer;
    span:hover {
      text-decoration: underline;
    }
  }
}
</style>
