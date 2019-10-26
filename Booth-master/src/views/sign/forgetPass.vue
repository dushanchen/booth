<template>
  <div class="signDetails">
    <div class="signBg">
      <div class="signBgName">
        <p>修改密码</p>
      </div>
      <div class="LoginInput" v-if="showemilbox">
        <div class="inpList">
          <input type="text" placeholder="请输入邮箱地址" v-model="UserData.username">
          <p class="Err">{{usernameERR}}</p>
        </div>
        <div class="inpList">
          <p class="inpText" v-if="showemil">验证码已发送您注册的邮箱中</p>
          <input type="text" placeholder="验证码" v-model="UserData.code">
          <div class="Listbtn" @click="_sendCode">发送</div>
          <p class="Err">{{codeERR}}</p>
        </div>
        <!-- <div class="forgetPass">
          <span @click="ToLogin">去登录</span>
          <span @click="ToSign">去注册</span>
        </div> -->
        <div class="LoginBtn">
          <span @click="_login">确认</span>
        </div>
      </div>
      <div class="LoginInput" v-if="showemilbox1">
        <div class="inpList">
          <input type="password" placeholder="请输入新密码" v-model="password">
          <p class="Err">{{passworderr}}</p>
        </div>
        <div class="inpList">
          <input type="password" placeholder="请重新输入新密码" v-model="newpassword">
          <p class="Err">{{newpassworderr}}</p>
        </div>
        <!-- <div class="forgetPass">
          <span @click="ToLogin">去登录</span>
          <span @click="ToSign">去注册</span>
        </div> -->
        <div class="LoginBtn">
          <span @click="_loginlist">确认修改</span>
        </div>
      </div>
      <div class="LoginInput" v-if="showtrue">
        <p>密码修改成功</p>
        <div class="LoginBtn">
          <span @click="ToLogin">去登录</span>
        </div>
      </div>
      <div class="signBgLogo">
        <img src="../../assets/images/home/logo.png" alt>
        <p>博商供应链</p>
        <div class="foot">上海麦屿信息科技有限公司</div>
      </div>
    </div>
  </div>
</template>

<script>
import { matchCode, sendCode, changePassword, ERR_OK } from "@/api/api.js";
import { setUser, setOne, setTwo } from "@/utils/auth.js";
export default {
  name: "sign",
  data() {
    return {
      showemil: false,
      showtrue: false,
      showemilbox: true,
      showemilbox1: false,
      close: false,
      usernameERR: "",
      passwordERR: "",
      codeERR: "",
      passworderr: "",
      newpassworderr: "",
      password: "",
      newpassword: "",
      UserData: {
        username: "",
        code: "",
        password: ""
      }
    };
  },
  created() {},
  methods: {
    _login() {
      if (!this.UserData.username) {
        this.usernameERR = "请输入用户名";
      } else {
        this.usernameERR = "";
      }
      if (!this.UserData.code) {
        this.codeERR = "请输入验证码";
      } else {
        this.codeERR = "";
      }
      if (this.UserData.username && this.UserData.code) {
        matchCode(this.UserData).then(res => {
          if (res.data.code === 0 && res.data.data) {
            this.showemilbox = false;
            this.showemilbox1 = true;
            this.showtrue = false;
          }
        });
      }
    },
    _loginlist() {
      if (!this.password) {
        this.passworderr = "请输入新密码";
        return;
      }
      if (this.password != this.newpassword) {
        this.newpassworderr = "两次密码输入不一致";
        return;
      } else {
        this.UserData.password = this.newpassword;
      }
      changePassword(this.UserData).then(res => {
        if (res.data.code === 0 && res.data.data) {
          this.showemilbox = false;
          this.showemilbox1 = false;
          this.showtrue = true;
        }
      });
    },
    // 修改密码
    _sendCode() {
      this.showemil = false;
      if (!this.UserData.username) {
        this.usernameERR = "请输入邮箱";
        return;
      } else {
        this.usernameERR = "";
      }
      sendCode(this.UserData.username).then(res => {
        if (res.data.code === 500504) {
          this.usernameERR = res.data.msg;
        } else {
          this.showemil = true;
        }
      });
    },
    ToLogin() {
      this.$router.push({
        path: `/loginList`
      });
    },
    ToSign() {
      this.$router.push({
        path: `/sign`
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
  .signBg {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .signBgName {
      color: #fff;
      text-align: center;
      p:nth-child(1) {
        font-size: 50px;
      }
      p:nth-child(2) {
        font-size: 20px;
      }
    }
    .LoginInput {
      width: 300px;
      margin: 26px 0;
      > p {
        font-size: 16px;
        color: #fff;
        text-align: center;
      }
      .inpList {
        width: 100%;
        height: 40px;
        border: 2px solid #000;
        margin-bottom: 20px;
        position: relative;
        box-sizing: border-box;
        .Listbtn {
          position: absolute;
          top: 0px;
          right: 0px;
          height: 24px;
          line-height: 24px;
          width: 30px;
          text-align: center;
          background: #000;
          padding: 6px 35px;
          color: #fff;
          cursor: pointer;
        }
        .Err {
          position: absolute;
          top: 44px;
          right: 0;
          color: red;
          font-size: 12px;
        }
        .inpText {
          position: absolute;
          bottom: 40px;
          left: 0;
          font-size: 10px;
        }
        input {
          width: 100%;
          height: 100%;
          background: initial;
          outline: none;
          padding: 0 10px;
          box-sizing: border-box;
          &::-webkit-input-placeholder {
            color: #000;
          }
        }
      }
      .forgetPass {
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        margin-top: -10px;
        span {
          cursor: pointer;
          margin: 0 10px;
        }
      }
      .LoginBtn {
        text-align: center;
        margin-top: 50px;
        span {
          background: #000;
          padding: 6px 35px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .signBgLogo {
      margin-top: 20px;
      text-align: center;
      p {
        color: #fff;
        letter-spacing: 6px;
      }
      .foot {
        margin-top: 50px;
      }
    }
  }
  .signBox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 330px;
    height: 200px;
    margin: auto;
    background: rgba($color: #000000, $alpha: 0.5);
    padding: 20px;
    box-sizing: border-box;
    .signBoxTrue {
      height: 54px;
      line-height: 54px;
      width: 100%;
      color: #fff;
      text-align: center;
      font-size: 20px;
      border-bottom: 1px solid #fff;
      cursor: pointer;
    }
    div:nth-child(3) {
      border: none;
    }
  }
}
</style>
