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
      <div class="info">
        <div class="infoRight">
          <div class="infoList">
            <div class="infoRightItem">
              <p>企业中文全称</p>
              <input type="text" v-model="userData.name" disabled>
            </div>
            <div class="signBgMainTRightItem" @click.stop="showBoxList">
              <p>行业类型（勾选）</p>
              <input type="text" disabled="true" v-model="name">
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
            <div class="infoRightItem">
              <p>人数规模（勾选）</p>
              <select v-model="userData.member">
                <option value="1">10-50</option>
                <option value="2">50-100</option>
                <option value="3">100-200</option>
                <option value="4">200-500</option>
                <option value="5">500以上</option>
              </select>
            </div>
            <div class="infoRightItem">
              <p>企业所在地</p>
              <input type="text" v-model="userData.address">
            </div>
            <div class="infoRightItem">
              <p>联系人</p>
              <input type="text" v-model="userData.linkman">
            </div>
            <div class="infoRightItem">
              <p>联系人职位（勾选）</p>
              <select v-model="userData.position">
                <option value="1">市场及销售</option>
                <option value="2">采购</option>
                <option value="3">管理</option>
                <option value="4">技术</option>
                <option value="5">生产及运营</option>
                <option value="6">其他</option>
              </select>
            </div>
            <div class="infoRightItem">
              <p>联系人手机号码</p>
              <input type="text" v-model="userData.mobile">
            </div>
            <div class="infoRightItem">
              <p>联系人邮件</p>
              <input type="text" v-model="userData.linkmanEmail">
            </div>
          </div>
          <div class="infoFoot">
            <span @click="_addUserInfoByEmail">保存并返回认证</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getIndustry, addUserInfoByEmail, ERR_OK } from "@/api/api.js";
import { getname, setUser } from "@/utils/auth.js";

export default {
  name: "sign",
  data() {
    return {
      timer: "",
      stateBox: false,
      industryData: [],
      items: [],
      typeindex: 0,
      name: "",
      userData: {
        id: this.$route.params.id,
        name: getname(),
        member: "1",
        address: "",
        linkman: "",
        position: "1",
        mobile: "",
        linkmanEmail: "",
        oneIndustry: 1, // 一级
        twoIndustry: "" // 二级
      }
    };
  },
  created() {
        window.scrollTo(0, 0);

    getIndustry().then(res => {
      if (res.status === ERR_OK) {
        this.industryData = res.data.data;
        this.items = this.industryData[0].secondIndustries;
      }
    });
  },
  methods: {
    showBoxList() {
      this.stateBox = !this.stateBox;
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
    _addUserInfoByEmail() {
      addUserInfoByEmail(this.userData).then(res => {
        if (res.data.code === 0) {
          setUser(this.$route.params.id);
          this.$router.push({
            path: `/Authentication`,
            query: { id: this.$route.params.id }
          });
        }
      });
    },
    tohome() {
      this.$router.push({
        path: `/home`
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
    .info {
      height: calc(100% - 90px);
      margin: 0 auto;
      max-width: 1200px;
      width: 100%;
      padding: 0 30px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      .infoRight {
        width: calc(100% - 200px);
        padding: 0 80px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .infoList {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }
        .infoRightItem {
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
        .signBgMainTRightItem {
          width: 50%;
          padding: 0 20px;
          margin-bottom: 30px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          box-sizing: border-box;
          position: relative;
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
        .infoFoot {
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
