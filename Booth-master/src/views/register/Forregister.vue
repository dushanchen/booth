<template>
  <div class="signDetails">
    <div class="signBgTwo">
      <div class="signBgInfoLog">
        <div class="infoLog" @click="tohome">
          <img src="../../assets/images/home/logo.png" alt>
        </div>
        <div class="infoLog">
          <p>申请认证</p>
          <p>目前只开放企业用户注册</p>
        </div>
      </div>
      <div class="Forregister">
        <p v-if="!overBoxone">对方企业未注册Booth</p>
        <p v-if="overBoxone">您的认证申请已发送，请耐心等待对方企业验证！</p>
        <div class="InvitationBoxItemBtn" v-if="overBoxone" style="margin-top:30px;">
          <span class="true" @click="tocore">返回上一级</span>
        </div>
        <div class="ForregisterBox" v-if="!overBoxone">
          <p>该企业尚未在Booth注册，请您输入企业联系人和联系方式，</p>
          <p>Booth会为您放送认证申请邮件</p>
          <div class="ForregisterBoxItem">
            <div class="BoxItemList">
              <p>联系人</p>
              <input type="text" placeholder="请输入联系人姓名" v-model="UpdataList.name">
            </div>
            <div class="BoxItemList">
              <p>合作类型</p>
              <select v-model="UpdataList.type" disabled>
                <option value="1">主要顾客</option>
                <option value="2">供应商</option>
                <option value="3">第三方服务</option>
              </select>
            </div>
            <div class="BoxItemList">
              <p>公司名称</p>
              <input type="text" placeholder="请输入公司名称" v-model="UpdataList.companyName" disabled>
            </div>
            <div class="BoxItemList">
              <p>公司邮箱</p>
              <input type="text" placeholder="请输入企业邮箱" v-model="UpdataList.email">
            </div>
          </div>
          <div class="InvitationBoxItemBtn">
            <span class="true" @click="queding">确认发送</span>
            <span class="true" @click="tocore">取消</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendAuthEmail, ERR_OK } from "@/api/api.js";
import { setUser } from "@/utils/auth.js";
import { mapGetters } from "vuex";

export default {
  name: "sign",
  data() {
    return {
      overBoxone: false,
      UpdataList: {
        email: "",
        companyName: this.$route.query.name,
        id: this.$store.state.user.UserID,
        name: "",
        type: this.$route.query.id
      }
    };
  },
  created() {
    window.scrollTo(0, 0);

    if (this.$route.query.id && this.$route.query.name) {
      this.overBoxone = false;
    } else {
      this.overBoxone = true;
    }
  },
  methods: {
    queding() {
      sendAuthEmail(this.UpdataList).then(res => {
        console.log(res);
        if (res.data.data.msg === "成功") {
          this.overBoxone = true;
        }
      });
    },
    tocore() {
      this.$router.push({
        path: `/core`
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
  .InvitationBoxItemBtn {
    width: 100%;
    display: flex;
    justify-content: center;
    span {
      display: block;
      width: 85px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      box-sizing: border-box;
      background: #000;
      color: #fff;
      margin-right: 10px;
    }
  }
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
    .Forregister {
      height: calc(100% - 90px);
      margin: 0 auto;
      max-width: 1200px;
      width: 100%;
      padding: 0 30px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      p {
        color: #fff;
        font-size: 24px;
        margin-bottom: 10px;
      }
      .ForregisterBox {
        width: 876px;
        padding: 38px;
        box-sizing: border-box;
        background: rgba($color: #ffffff, $alpha: 0.5);
        p {
          font-size: 20px;
          color: #000;
        }
        .ForregisterBoxItem {
          width: 572px;
          padding: 34px;
          display: flex;
          flex-wrap: wrap;
          box-sizing: border-box;
          margin: 30px auto;
          background: rgba($color: #ffffff, $alpha: 1);
          .BoxItemList {
            width: 50%;
            padding: 0 10px;
            box-sizing: border-box;
            margin-bottom: 10px;
            p {
              color: #000000;
              font-size: 14px;
            }
            select,
            input {
              height: 24px;
              width: 100%;
              background: #cfdae2;
              outline: none;
              padding: 0 10px;
              box-sizing: border-box;
            }
          }
        }
      }
    }
  }
}
</style>
