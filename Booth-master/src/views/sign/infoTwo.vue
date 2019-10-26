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
      <div class="signBgMain">
        <div class="signBgMainLeft">
          <div class="signBgMainList" @click="toOne">基础信息</div>
          <div class="signBgMainList ListAct" @click="toTwo">行业及商业伙伴</div>
          <div class="signBgMainList" @click="toThree">核心竞争力</div>
          <div class="signBgMainList" @click="toFour">形象展示</div>
          <div class="signBgMainList" @click="toFive">信息核对</div>
        </div>
        <div class="signBgMainRightTwo">
          <div class="signBgMainListRight">
            <div class="signBgMainTRightItem" @click.stop="showBoxList">
              <p>行业类型</p>
              <input type="text" disabled="true" v-model="name">
              <p class="Err">{{IndustryERR}}</p>
              <div class="Industry" v-if="stateBox">
                <div class="IndustryLeft">
                  <div
                    class="choiceItem"
                    v-for="(items, index) in industryData"
                    :key="index"
                    :class="{ choiceItemHover: index == typeindex }"
                    @mouseenter="mouseOver(index, items)"
                  >{{ items.industryName }}</div>
                </div>
                <div class="IndustryRight">
                  <div
                    class="choiceItem"
                    @click.stop="toBooth(items.industryName, items.id)"
                    v-for="(items, index) in items"
                    :key="index"
                  >{{items.industryName}}</div>
                </div>
              </div>
            </div>
            <div class="signBgMainTRightItem">
              <p>主要竞争对手（上限5个）</p>
              <div class="ItemText">
                <span
                  v-for="(item, index) in competitorArr"
                  :key="index"
                  @click="selOne(index)"
                >{{item.key}}</span>
              </div>
              <div class="SearchIndustry" v-if="one">
                <div class="SearchIndustryIn">
                  <input
                    type="text"
                    placeholder="请输入竞争对手"
                    v-on:input="inputFunc"
                    v-model="serachCenter"
                  >
                  <button @click="hideone()">确定</button>
                </div>
                <div
                  class="SearchIndustryList"
                  v-for="(item, index) in serachList"
                  :key="index"
                  @click="tureBoxOne(item.screenName)"
                >{{item.screenName}}</div>
              </div>
            </div>
            <div class="signBgMainTRightItem">
              <p>行业关键词录入（上限5个）</p>
              <div class="ItemText">
                <span
                  v-for="(item, index) in keywordsArr"
                  :key="index"
                  @click="selTwo(index)"
                >{{item.key}}</span>
              </div>
              <div class="SearchIndustry" v-if="two">
                <div class="SearchIndustryIn">
                  <input
                    type="text"
                    placeholder="请输入行业关键词"
                    v-on:input="inputFuncTwo"
                    v-model="serachCenter"
                  >
                  <button @click="hideTwo()">确定</button>
                </div>
              </div>
            </div>
            <div class="signBgMainTRightItem">
              <p>主要供应商（上限5个）</p>
              <div class="ItemText">
                <span
                  v-for="(item, index) in supplierArr"
                  :key="index"
                  @click="selThree(index)"
                >{{item.key}}</span>
              </div>
              <div class="SearchIndustry" v-if="Three">
                <div class="SearchIndustryIn">
                  <input
                    type="text"
                    placeholder="请输入主要供应商"
                    v-on:input="inputFuncThree"
                    v-model="serachCenter"
                  >
                  <button @click="hideThree()">确定</button>
                </div>
                <div
                  class="SearchIndustryList"
                  v-for="(item, index) in serachList"
                  :key="index"
                  @click="tureBoxThree(item.screenName)"
                >{{item.screenName}}</div>
              </div>
            </div>
            <div class="signBgMainTRightItem">
              <p>主要工艺（上限5个）</p>
              <div class="ItemText">
                <span
                  v-for="(item, index) in mainProcess"
                  :key="index"
                  @click="selFore(index)"
                >{{item.key}}</span>
              </div>
              <div class="SearchIndustry" v-if="Fore">
                <div class="SearchIndustryIn">
                  <input
                    type="text"
                    placeholder="请输入主要工艺"
                    v-on:input="inputFuncFore"
                    v-model="serachCenter"
                  >
                  <button @click="hideFore()">确定</button>
                </div>
              </div>
            </div>
            <div class="signBgMainTRightItem">
              <p>主要客户（上限5个）</p>
              <div class="ItemText">
                <span
                  v-for="(item, index) in customerArr"
                  :key="index"
                  @click="selFive(index)"
                >{{item.key}}</span>
              </div>
              <div class="SearchIndustry" v-if="Five">
                <div class="SearchIndustryIn">
                  <input
                    type="text"
                    placeholder="请输入主要客户"
                    v-on:input="inputFuncFive"
                    v-model="serachCenter"
                  >
                  <button @click="hideFive()">确定</button>
                </div>
                <div
                  class="SearchIndustryList"
                  v-for="(item, index) in serachList"
                  :key="index"
                  @click="tureBoxFive(item.screenName)"
                >{{item.screenName}}</div>
              </div>
            </div>
            <div class="signBgMainTRightItem">
              <p>第三方服务商（上限5个）</p>
              <div class="ItemText">
                <span
                  v-for="(item, index) in facilitatorArr"
                  :key="index"
                  @click="selSix(index)"
                >{{item.key}}</span>
              </div>
              <div class="SearchIndustry" v-if="Six">
                <div class="SearchIndustryIn">
                  <input
                    type="text"
                    placeholder="请输入第三方服务商"
                    v-on:input="inputFuncSix"
                    v-model="serachCenter"
                  >
                  <button @click="hideSix()">确定</button>
                </div>
                <div
                  class="SearchIndustryList"
                  v-for="(item, index) in serachList"
                  :key="index"
                  @click="tureBoxSix(item.screenName)"
                >{{item.screenName}}</div>
              </div>
            </div>
            <div class="signBgMainTRightItem">
              <p>简介（最多200字）</p>
              <textarea class="ItemText" v-model="userData.summary"></textarea>
            </div>
          </div>
          <div class="signExhibition">
            <div class="headsignExhibition">
              <span>你所感兴趣的展会</span>
              <span @click="addEx">+</span>
            </div>
            <div>
              <div class="ExhibitionallList" v-for="(item, index) in exhibitionArr" :key="index">
                <div class="ExhibitionallLeft">
                  <p>展会名称</p>
                  <input
                    type="text"
                    v-model="item.name"
                    v-on:input="inputFuncServer(item.name, index)"
                  >
                  <div class="ExhibitionallLeftBox" v-if="index == Exhibitionindex">
                    <div
                      class="ExhibitionallLeftBoxList"
                      v-for="(item, index) in searchExh"
                      :key="index"
                      @click="trueExhibitionall(item)"
                    >{{item.name}}</div>
                  </div>
                </div>
                <div class="Exhibitionallmind">
                  <p>是否参加</p>
                  <select v-model="item.state">
                    <option value="1">是</option>
                    <option value="2">否</option>
                  </select>
                </div>
                <div class="Exhibitionallright">
                  <p>展位</p>
                  <input type="text" v-model="item.numID">
                </div>
                <div class="icon iconDel" @click="delList(index)"></div>
              </div>
            </div>
          </div>
          <div class="signBgMainFootTwo">
            <span @click="toBack">上一页</span>
            <div>
              <span @click="preservation">保存并返回到首页</span>
              <span @click="toNext">下一页</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getIndustry,
  searchCompany,
  addUserInfo,
  searchExhibition,
  ERR_OK
} from "@/api/api.js";
import { setUser } from "@/utils/auth.js";
import { mapGetters } from "vuex";

export default {
  name: "sign",
  data() {
    return {
      IndustryERR: "",
      one: false,
      two: false,
      Three: false,
      Fore: false,
      Five: false,
      Six: false,
      name: "",
      timer: "",
      index: "",
      serachCenter: "",
      serachList: [],
      searchcenter: "",
      searchExh: [],
      timer2: "",
      industryData: [],
      items: [],
      typeindex: 0,
      stateBox: false,
      exhibitionArr: [{ name: "", state: 1, numID: "", id: 0 }],
      competitorArr: [
        { key: "点击输入" },
        { key: "点击输入" },
        { key: "点击输入" },
        { key: "点击输入" },
        { key: "点击输入" }
      ],
      keywordsArr: [
        { key: "点击输入" },
        { key: "点击输入" },
        { key: "点击输入" },
        { key: "点击输入" },
        { key: "点击输入" }
      ],
      supplierArr: [
        { key: "点击输入" },
        { key: "点击输入" },
        { key: "点击输入" },
        { key: "点击输入" },
        { key: "点击输入" }
      ],
      mainProcess: [
        { key: "点击输入" },
        { key: "点击输入" },
        { key: "点击输入" },
        { key: "点击输入" },
        { key: "点击输入" }
      ],
      customerArr: [
        { key: "点击输入" },
        { key: "点击输入" },
        { key: "点击输入" },
        { key: "点击输入" },
        { key: "点击输入" }
      ],
      facilitatorArr: [
        { key: "点击输入" },
        { key: "点击输入" },
        { key: "点击输入" },
        { key: "点击输入" },
        { key: "点击输入" }
      ],
      formData: new FormData(),
      userData: {
        oneIndustry: "", // 一级
        twoIndustry: "", // 二级
        summary: "" // 简介
      },
      Exhibitionindex: 0
    };
  },
  created() {
    this.name = this.$store.state.userData.oneIndustryname;
    this.userData.oneIndustry = this.$store.state.userData.oneIndustry;
    this.userData.twoIndustry = this.$store.state.userData.twoIndustry;
    this.userData.summary = this.$store.state.userData.summary;
    if (this.$store.state.userData.exhibitions) {
      this.exhibitionArr = JSON.parse(this.$store.state.userData.exhibitions);
    }
    if (this.$store.state.userData.competitor) {
      this.competitorArr = JSON.parse(this.$store.state.userData.competitor);
    }
    if (this.$store.state.userData.keywords) {
      this.keywordsArr = JSON.parse(this.$store.state.userData.keywords);
    }
    if (this.$store.state.userData.supplier) {
      this.supplierArr = JSON.parse(this.$store.state.userData.supplier);
    }
    if (this.$store.state.userData.mainProcess) {
      this.mainProcess = JSON.parse(this.$store.state.userData.mainProcess);
    }
    if (this.$store.state.userData.customer) {
      this.customerArr = JSON.parse(this.$store.state.userData.customer);
    }
    if (this.$store.state.userData.facilitator) {
      this.facilitatorArr = JSON.parse(this.$store.state.userData.facilitator);
    }
    getIndustry().then(res => {
      if (res.status === ERR_OK) {
        this.industryData = res.data.data;
        this.userData.oneIndustry = this.industryData[0].id;
        this.items = this.industryData[0].secondIndustries;
      }
    });
  },
  methods: {
    _addUserInfo() {
      addUserInfo(this.formData).then(res => {
        if (res.data.code === 0) {
          setUser(this.$store.state.user.UserID);
          this.$router.push({
            path: `/home`
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
          this.IndustryERR = "请选择行业";
        }
      } else {
        alert("基本信息有错！");
        this.$router.push({
          path: `/infoOne`
        });
      }
    },
    preservation() {
      this.$store.commit("SET_oneIndustryname", this.name);
      this.$store.commit("SET_oneIndustry", this.userData.oneIndustry);
      this.$store.commit("SET_twoIndustry", this.userData.twoIndustry);
      this.$store.commit("SET_competitor", JSON.stringify(this.competitorArr));
      this.$store.commit("SET_keywords", JSON.stringify(this.keywordsArr));
      this.$store.commit("SET_supplier", JSON.stringify(this.supplierArr));
      this.$store.commit("SET_mainProcess", JSON.stringify(this.mainProcess));
      this.$store.commit(
        "SET_facilitator",
        JSON.stringify(this.facilitatorArr)
      );
      this.$store.commit("SET_summary", this.userData.summary);
      this.$store.commit("SET_exhibitions", JSON.stringify(this.exhibitionArr));
      this.$store.commit("SET_customer", JSON.stringify(this.customerArr));

      let arr = [];
      for (
        let i = 0;
        i < this.$store.state.userData.imgListUrlArr.length;
        i++
      ) {
        arr.push(this.$store.state.userData.imgListUrlArr[i].picture);
      }
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
    _searchCompany(center) {
      searchCompany(center).then(res => {
        if (res.status === ERR_OK) {
          this.serachList = res.data.data;
        }
      });
    },
    _searchExhibition(name) {
      searchExhibition(name).then(res => {
        if (res.status === ERR_OK) {
          console.log(res.data);
          this.searchExh = res.data.data;
        }
      });
    },
    addEx() {
      // 增加会展
      let arr = { name: "", state: 1, numID: "", id: 0 };
      this.exhibitionArr.push(arr);
    },
    delList(index) {
      // 删除会展
      if (this.exhibitionArr.length > 1) {
        this.exhibitionArr.splice(index, 1);
      }
    },
    trueExhibitionall(item) {
      this.exhibitionArr[this.Exhibitionindex].id = item.id;
      this.exhibitionArr[this.Exhibitionindex].name = item.name;
      this.searchExh = [];
    },
    setTime2() {
      this.timer2 = setTimeout(() => {
        this._searchExhibition(this.searchcenter);
      }, 500);
    },
    inputFuncServer(name, index) {
      this.searchExh = [];
      this.searchcenter = name;
      this.setTime2();
      this.Exhibitionindex = index;
    },
    mouseOver(index, data) {
      // 切换
      this.typeindex = index;
      this.items = data.secondIndustries;
      this.userData.oneIndustry = data.id;
    },
    toBooth(name, id) {
      this.stateBox = !this.stateBox;
      this.name = name;
      this.userData.twoIndustry = id;
    },
    showBoxList() {
      this.stateBox = !this.stateBox;
    },
    setTime() {
      this.timer = setTimeout(() => {
        this._searchCompany(this.serachCenter);
      }, 500);
    },
    selOne(index) {
      this.serachList = [];
      this.one = true;
      this.two = false;
      this.Three = false;
      this.Fore = false;
      this.Five = false;
      this.Six = false;
      this.index = index;
      if (this.competitorArr[this.index].key == "点击输入") {
        this.serachCenter = "";
      } else {
        this.serachCenter = this.competitorArr[this.index].key;
      }
    },
    hideone() {
      this.one = false;
    },
    inputFunc() {
      // 搜索 1
      clearInterval(this.timer);
      this.competitorArr[this.index].key = this.serachCenter;
      if (this.serachCenter == "") {
        this.competitorArr[this.index].key = "点击输入";
      }
      this.setTime();
    },
    tureBoxOne(val) {
      // 选中
      this.one = false;
      this.serachCenter = val;
      this.competitorArr[this.index].key = val;
    },
    selTwo(index) {
      this.two = true;
      this.one = false;
      this.Three = false;
      this.Fore = false;
      this.Five = false;
      this.Six = false;
      this.index = index;
      if (this.keywordsArr[this.index].key == "点击输入") {
        this.serachCenter = "";
      } else {
        this.serachCenter = this.keywordsArr[this.index].key;
      }
    },
    inputFuncTwo() {
      if (this.serachCenter == "") {
        console.log(this.serachCenter);
        this.keywordsArr[this.index].key = "点击输入";
      }
      this.keywordsArr[this.index].key = this.serachCenter;
    },
    hideTwo() {
      this.two = false;
      this.serachCenter = val;
    },
    selThree(index) {
      this.serachList = [];
      this.Three = true;
      this.two = false;
      this.one = false;
      this.Fore = false;
      this.Five = false;
      this.Six = false;
      this.index = index;
      if (this.supplierArr[this.index].key == "点击输入") {
        this.serachCenter = "";
      } else {
        this.serachCenter = this.supplierArr[this.index].key;
      }
    },
    hideThree() {
      this.Three = false;
    },
    inputFuncThree() {
      // 搜索 1
      clearInterval(this.timer);
      this.supplierArr[this.index].key = this.serachCenter;
      if (this.serachCenter == "") {
        this.supplierArr[this.index].key = "点击输入";
      }
      this.setTime();
    },
    tureBoxThree(val) {
      // 选中
      this.Three = false;
      this.serachCenter = val;
      this.supplierArr[this.index].key = val;
    },
    selFore(index) {
      this.Fore = true;
      this.Three = false;
      this.two = false;
      this.one = false;
      this.Five = false;
      this.Six = false;
      this.index = index;
      if (this.mainProcess[this.index].key == "点击输入") {
        this.serachCenter = "";
      } else {
        this.serachCenter = this.mainProcess[this.index].key;
      }
    },
    inputFuncFore() {
      if (this.serachCenter == "") {
        this.mainProcess[this.index].key = "点击输入";
      }
      this.mainProcess[this.index].key = this.serachCenter;
    },
    hideFore() {
      this.Fore = false;
      this.serachCenter = val;
    },
    selFive(index) {
      this.serachList = [];
      this.Five = true;
      this.Fore = false;
      this.Three = false;
      this.two = false;
      this.one = false;
      this.Six = false;
      this.index = index;
      if (this.customerArr[this.index].key == "点击输入") {
        this.serachCenter = "";
      } else {
        this.serachCenter = this.customerArr[this.index].key;
      }
    },
    hideFive() {
      this.Five = false;
    },
    inputFuncFive() {
      // 搜索 1
      clearInterval(this.timer);
      this.customerArr[this.index].key = this.serachCenter;
      if (this.serachCenter == "") {
        this.customerArr[this.index].key = "点击输入";
      }
      this.setTime();
    },
    tureBoxFive(val) {
      // 选中
      this.Five = false;
      this.serachCenter = val;
      this.customerArr[this.index].key = val;
    },
    selSix(index) {
      this.serachList = [];
      this.Six = true;
      this.Five = false;
      this.Fore = false;
      this.Three = false;
      this.two = false;
      this.one = false;
      this.index = index;
      if (this.facilitatorArr[this.index].key == "点击输入") {
        this.serachCenter = "";
      } else {
        this.serachCenter = this.facilitatorArr[this.index].key;
      }
    },
    hideSix() {
      this.Six = false;
    },
    inputFuncSix() {
      // 搜索 1
      clearInterval(this.timer);
      this.facilitatorArr[this.index].key = this.serachCenter;
      if (this.serachCenter == "") {
        this.facilitatorArr[this.index].key = "点击输入";
      }
      this.setTime();
    },
    tureBoxSix(val) {
      // 选中
      this.Six = false;
      this.serachCenter = val;
      this.facilitatorArr[this.index].key = val;
    },
    toNext() {
      this.$store.commit("SET_oneIndustryname", this.name);
      this.$store.commit("SET_oneIndustry", this.userData.oneIndustry);
      this.$store.commit("SET_twoIndustry", this.userData.twoIndustry);
      this.$store.commit("SET_competitor", JSON.stringify(this.competitorArr));
      this.$store.commit("SET_keywords", JSON.stringify(this.keywordsArr));
      this.$store.commit("SET_supplier", JSON.stringify(this.supplierArr));
      this.$store.commit("SET_mainProcess", JSON.stringify(this.mainProcess));
      this.$store.commit(
        "SET_facilitator",
        JSON.stringify(this.facilitatorArr)
      );
      this.$store.commit("SET_summary", this.userData.summary);
      this.$store.commit("SET_exhibitions", JSON.stringify(this.exhibitionArr));
      this.$store.commit("SET_customer", JSON.stringify(this.customerArr));
      this.$router.push({
        path: `/infoThree`
      });
    },

    toBack() {
      this.$store.commit("SET_oneIndustryname", this.name);
      this.$store.commit("SET_oneIndustry", this.userData.oneIndustry);
      this.$store.commit("SET_twoIndustry", this.userData.twoIndustry);
      this.$store.commit("SET_competitor", JSON.stringify(this.competitorArr));
      this.$store.commit("SET_keywords", JSON.stringify(this.keywordsArr));
      this.$store.commit("SET_supplier", JSON.stringify(this.supplierArr));
      this.$store.commit("SET_mainProcess", JSON.stringify(this.mainProcess));
      this.$store.commit(
        "SET_facilitator",
        JSON.stringify(this.facilitatorArr)
      );
      this.$store.commit("SET_summary", this.userData.summary);
      this.$store.commit("SET_exhibitions", JSON.stringify(this.exhibitionArr));
      this.$store.commit("SET_customer", JSON.stringify(this.customerArr));
      this.$router.push({
        path: `/infoOne`
      });
    },
    tohome() {
      this.$router.push({
        path: `/home`
      });
    },
    toOne() {
      this.$store.commit("SET_oneIndustryname", this.name);
      this.$store.commit("SET_oneIndustry", this.userData.oneIndustry);
      this.$store.commit("SET_twoIndustry", this.userData.twoIndustry);
      this.$store.commit("SET_competitor", JSON.stringify(this.competitorArr));
      this.$store.commit("SET_keywords", JSON.stringify(this.keywordsArr));
      this.$store.commit("SET_supplier", JSON.stringify(this.supplierArr));
      this.$store.commit("SET_mainProcess", JSON.stringify(this.mainProcess));
      this.$store.commit(
        "SET_facilitator",
        JSON.stringify(this.facilitatorArr)
      );
      this.$store.commit("SET_summary", this.userData.summary);
      this.$store.commit("SET_exhibitions", JSON.stringify(this.exhibitionArr));
      this.$store.commit("SET_customer", JSON.stringify(this.customerArr));
      this.$router.push({
        path: `/infoOne`
      });
    },
    toTwo() {
      this.$store.commit("SET_oneIndustryname", this.name);
      this.$store.commit("SET_oneIndustry", this.userData.oneIndustry);
      this.$store.commit("SET_twoIndustry", this.userData.twoIndustry);
      this.$store.commit("SET_competitor", JSON.stringify(this.competitorArr));
      this.$store.commit("SET_keywords", JSON.stringify(this.keywordsArr));
      this.$store.commit("SET_supplier", JSON.stringify(this.supplierArr));
      this.$store.commit("SET_mainProcess", JSON.stringify(this.mainProcess));
      this.$store.commit(
        "SET_facilitator",
        JSON.stringify(this.facilitatorArr)
      );
      this.$store.commit("SET_summary", this.userData.summary);
      this.$store.commit("SET_exhibitions", JSON.stringify(this.exhibitionArr));
      this.$store.commit("SET_customer", JSON.stringify(this.customerArr));
      this.$router.push({
        path: `/infoTwo`
      });
    },
    toThree() {
      this.$store.commit("SET_oneIndustryname", this.name);
      this.$store.commit("SET_oneIndustry", this.userData.oneIndustry);
      this.$store.commit("SET_twoIndustry", this.userData.twoIndustry);
      this.$store.commit("SET_competitor", JSON.stringify(this.competitorArr));
      this.$store.commit("SET_keywords", JSON.stringify(this.keywordsArr));
      this.$store.commit("SET_supplier", JSON.stringify(this.supplierArr));
      this.$store.commit("SET_mainProcess", JSON.stringify(this.mainProcess));
      this.$store.commit(
        "SET_facilitator",
        JSON.stringify(this.facilitatorArr)
      );
      this.$store.commit("SET_summary", this.userData.summary);
      this.$store.commit("SET_exhibitions", JSON.stringify(this.exhibitionArr));
      this.$store.commit("SET_customer", JSON.stringify(this.customerArr));
      this.$router.push({
        path: `/infoThree`
      });
    },
    toFour() {
      this.$store.commit("SET_oneIndustryname", this.name);
      this.$store.commit("SET_oneIndustry", this.userData.oneIndustry);
      this.$store.commit("SET_twoIndustry", this.userData.twoIndustry);
      this.$store.commit("SET_competitor", JSON.stringify(this.competitorArr));
      this.$store.commit("SET_keywords", JSON.stringify(this.keywordsArr));
      this.$store.commit("SET_supplier", JSON.stringify(this.supplierArr));
      this.$store.commit("SET_mainProcess", JSON.stringify(this.mainProcess));
      this.$store.commit(
        "SET_facilitator",
        JSON.stringify(this.facilitatorArr)
      );
      this.$store.commit("SET_summary", this.userData.summary);
      this.$store.commit("SET_exhibitions", JSON.stringify(this.exhibitionArr));
      this.$store.commit("SET_customer", JSON.stringify(this.customerArr));
      this.$router.push({
        path: `/infoFour`
      });
    },
    toFive() {
      this.$store.commit("SET_oneIndustryname", this.name);
      this.$store.commit("SET_oneIndustry", this.userData.oneIndustry);
      this.$store.commit("SET_twoIndustry", this.userData.twoIndustry);
      this.$store.commit("SET_competitor", JSON.stringify(this.competitorArr));
      this.$store.commit("SET_keywords", JSON.stringify(this.keywordsArr));
      this.$store.commit("SET_supplier", JSON.stringify(this.supplierArr));
      this.$store.commit("SET_mainProcess", JSON.stringify(this.mainProcess));
      this.$store.commit(
        "SET_facilitator",
        JSON.stringify(this.facilitatorArr)
      );
      this.$store.commit("SET_summary", this.userData.summary);
      this.$store.commit("SET_exhibitions", JSON.stringify(this.exhibitionArr));
      this.$store.commit("SET_customer", JSON.stringify(this.customerArr));
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
      .signBgMainRightTwo {
        height: 496px;
        width: calc(100% - 200px);
        padding: 0 80px;
        box-sizing: border-box;
        overflow: auto;
        .signBgMainListRight {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          // overflow: hidden;
        }
        .signExhibition {
          padding: 0 20px;
          .headsignExhibition {
            display: flex;
            font-size: 24px;
            color: #fff;
            margin-top: 20px;
            justify-content: space-between;
            span:nth-child(2) {
              cursor: pointer;
            }
          }
          .ExhibitionallList {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin: 20px 0;
            p {
              font-size: 16px;
              color: #fff;
              margin: 6px 0;
              width: 100%;
            }
            select {
              width: 100%;
              padding: 0 10px;
              box-sizing: border-box;
              width: 100%;
              height: 32px;
              outline: none;
              background: rgba($color: #fff, $alpha: 0.5);
            }
            input {
              width: 100%;
              padding: 0 10px;
              box-sizing: border-box;
              width: 100%;
              height: 32px;
              outline: none;
              background: rgba($color: #fff, $alpha: 0.5);
            }
            .iconDel {
              cursor: pointer;
              margin-bottom: 10px;
            }
            .ExhibitionallLeft {
              width: 40%;
              position: relative;
              .ExhibitionallLeftBox {
                position: absolute;
                width: 100%;
                background: #fff;
                max-height: 150px;
                bottom: 36px;
                overflow: auto;
                .ExhibitionallLeftBoxList {
                  box-sizing: border-box;
                  padding: 10px;
                  width: 100%;
                }
              }
            }
            .Exhibitionallmind {
              width: 15%;
            }
            .Exhibitionallright {
              width: 20%;
            }
          }
        }
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
          .Err {
            position: absolute;
            top: 60px;
            left: 20px;
            color: red;
            font-size: 12px;
          }
          .SearchIndustry {
            position: absolute;
            top: 104px;
            left: 20px;
            width: calc(100% - 40px);
            max-height: 200px;
            background: #fff;
            z-index: 999999;
            overflow: auto;
            .SearchIndustryIn {
              display: flex;
              align-items: center;
              height: 40px;
              width: 100%;
              padding: 0 20px;
              box-sizing: border-box;
              input {
                width: 80%;
                height: 40px;
                border-bottom: 1px solid #000;
              }
              button {
                width: 20%;
                height: 30px;
              }
            }
            .SearchIndustryList {
              width: 100%;
              padding: 0 20px;
              margin: 10px 0;
              box-sizing: border-box;
              cursor: pointer;
            }
          }
          .Industry {
            position: absolute;
            top: 68px;
            left: 20px;
            width: calc(100% - 40px);
            height: 200px;
            background: #fff;
            z-index: 999999;
            display: flex;
            justify-content: space-between;
            .choiceItem {
              text-align: left;
              width: 100%;
              height: 24px;
              line-height: 24px;
              padding: 0 15px;
              box-sizing: border-box;
              color: #000;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              &:nth-child(1) {
                margin-top: 10px;
              }
              &:last-child {
                margin-bottom: 10px;
              }
            }
            .IndustryLeft {
              width: 50%;
              height: 100%;
              overflow: auto;
              .choiceItemHover {
                background: rgba($color: #326b90, $alpha: 0.2);
              }
            }
            .IndustryRight {
              width: 50%;
              height: 100%;
              overflow: auto;
              background: rgba($color: #326b90, $alpha: 0.2);
              .choiceItem {
                border-bottom: 1px solid #707070;
                &:hover {
                  color: #fff;
                }
              }
            }
          }
          p {
            font-size: 16px;
            color: #fff;
            margin: 6px 0;
            width: 100%;
          }
          input {
            padding: 0 10px;
            box-sizing: border-box;
            width: 100%;
            height: 32px;
            outline: none;
            background: rgba($color: #fff, $alpha: 0.5);
          }
          .ItemText {
            padding: 0 10px;
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
              margin: 10px;
              cursor: pointer;
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
