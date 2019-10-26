<template>
  <div class="login">
    <div class="LoginBox">
      <div class="close" @click="closeLogin">
        <i class="icon iconClose"></i>
      </div>
      <div class="LoginImg">
        <div>
          <p>login</p>
          <p>登录</p>
        </div>
        <div class="LoginIcon">
          <img src="../../assets/images/icon/man.png" alt />
        </div>
      </div>
      <div class="LoginInput">
        <div class="inpList">
          <input type="text" placeholder="邮箱/手机号/企业简称" v-model="UserData.username" />
          <p class="Err">{{usernameERR}}</p>
        </div>
        <div class="inpList">
          <input type="password" placeholder="密码" v-model="UserData.password" />
          <p class="Err">{{passwordERR}}</p>
        </div>
        <div class="inpList">
          <!-- <p class="inpText">验证码已发送您注册的邮箱中</p> -->
          <input type="text" placeholder="验证码" v-model="UserData.code" />
          <div class="Listbtn" @click="_sendCode">
            <SIdentify :identifyCode="identifyCode"></SIdentify>
          </div>
          <p class="Err">{{codeERR}}</p>
        </div>
        <div class="forgetPass">
          <span @click="Toforget">忘记密码？</span>
        </div>
        <div class="LoginBtn">
          <span @click="_login">确认</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, sendCode, ERR_OK } from "@/api/api.js";
import { setUser, setOne, setTwo } from "@/utils/auth.js";
import SIdentify from "@/base/SIdentify/SIdentify";

export default {
  name: "login",
  data() {
    return {
      identifyCodes: "1234567890",
      identifyCode: "",
      close: false,
      usernameERR: "",
      passwordERR: "",
      codeERR: "",
      UserData: {
        username: "",
        password: "",
        code: ""
      }
    };
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    _login() {
      if (!this.UserData.username) {
        this.usernameERR = "请输入用户名";
      } else {
        this.usernameERR = "";
      }
      if (!this.UserData.password) {
        this.passwordERR = "请输入密码";
      } else {
        this.passwordERR = "";
      }
      if (!this.UserData.code) {
        this.codeERR = "请输入验证码";
        this._sendCode();
      } else if (this.UserData.code != this.identifyCode) {
        this.codeERR = "验证码错误";
        this._sendCode();
      } else {
        this.codeERR = "";
      }
      if (
        this.UserData.username &&
        this.UserData.password &&
        this.UserData.code &&
        this.codeERR === ""
      ) {
        login(this.UserData).then(res => {
          if (res.data.code === 500505) {
            this.codeERR = res.data.msg;
          }
          if (res.data.code === 500506) {
            this.codeERR = res.data.msg;
          }
          if (res.data.code === 500500) {
            this.passwordERR = res.data.msg;
          }
          if (res.data.code === 0) {
            this.closeLogin();
            if (res.data.data.isRegister === 2) {
              window.location.reload();
              setUser(res.data.data.id);
              setOne(res.data.data.oneIndustryid);
              setTwo(res.data.data.twoIndustryid);
            } else {
              this.$router.push({
                name: `infoOne`,
                params: { id: res.data.data.id }
              });
            }
          }
        });
      }
    },
    _sendCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    Toforget() {
      this.$router.push({
        path: `/forgetPass`
      });
    },
    closeLogin() {
      this.$emit("closeLogin", this.close);
    }
  },
  components: {
    SIdentify
  }
};
</script>

<style lang="scss">
.login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #000, $alpha: 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  .LoginBox {
    width: 400px;
    background: #2c73a1;
    padding: 24px 36px;
    box-sizing: border-box;
    position: relative;
    .close {
      position: absolute;
      left: -15px;
      top: -15px;
      width: 30px;
      height: 30px;
      background: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      cursor: pointer;
    }
    .LoginImg {
      width: 100%;
      height: 78px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 30px;
      p {
        margin-bottom: 6px;
      }
      .LoginIcon {
        width: 78px;
        height: 78px;
        background: #fff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .LoginInput {
      width: 100%;
      margin-top: 26px;
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
          height: 36px;
          line-height: 36px;
          width: 112px;
          text-align: center;
          background: #000;
          // padding: 6px 35px;
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
        text-align: right;
        font-size: 12px;
        font-weight: bold;
        margin-top: 4px;
        span {
          cursor: pointer;
        }
      }
      .LoginBtn {
        text-align: center;
        span {
          background: #000;
          padding: 6px 35px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
