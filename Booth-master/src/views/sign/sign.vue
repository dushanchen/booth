<template>
  <div class="signDetails">
    <div class="signBg">
      <div class="signBgName">
        <p>入驻booth</p>
        <p>目前只开放企业用户注册</p>
      </div>
      <div class="signBgList" v-if="!userID">
        <div class="LoginInput">
          <div class="inpList">
            <input type="text" placeholder="企业简称" v-model="user.username">
            <p class="Err">{{usernameErr}}</p>
          </div>
          <div class="inpList">
            <input type="password" placeholder="密码" v-model="user.password">
            <p class="Err">{{passwordErr}}</p>
          </div>
          <div class="inpList">
            <input type="text" placeholder="邮箱" v-model="user.email">
            <p class="Err">{{emlErr}}</p>
          </div>
          <div class="LoginBtn" @click="toSign">
            <span>立即注册</span>
          </div>
        </div>
      </div>
      <div class="signBgList" v-if="userID">
        <p>注册成功</p>
        <div class="btnEmial" @click="verification">邮箱验证并完善资料</div>
        <div class="EmialText">
          <p>验证邮件已发送至您的邮箱</p>
          <p>{{user.email}}</p>
          <p>请点击邮件中的链接完成邮箱验证</p>
        </div>
      </div>
      <div class="signBgLogo">
        <img src="../../assets/images/home/logo.png" alt>
        <p>博商供应链</p>
        <div class="foot">上海麦屿信息科技有限公司</div>
      </div>
    </div>
    <div class="signBox" v-if="successbox">
      <div class="signBoxTrue" @click="tureFlase">验证成功</div>
      <div class="signBoxTrue" @click="flaseFlase">验证失败，重新验证</div>
      <div class="signBoxTrue" @click="flaseFlase">未收到邮箱</div>
    </div>
  </div>
</template>

<script>
import { register, checkEmail, isActivate, ERR_OK } from "@/api/api.js";
import { getway } from "@/utils/auth.js";
export default {
  name: "sign",
  data() {
    return {
      successbox: false,
      userID: "",
      emlErr: "",
      usernameErr: "",
      passwordErr: "",
      user: {
        username: "",
        email: "",
        password: "",
        nameShort: ''
      }
    };
  },
  created() {
    if (this.$route.params.id) {
      this.userID = this.$route.params.id;
      this.user.email = this.$route.params.email;
    }
  },
  methods: {
    _isActivate() {
      isActivate(this.userID).then(res => {
        if (res.data.code === 0) {
          if (getway() == "1") {
            this.$router.push({
              name: `info`,
              params: { id: this.userID }
            });
          } else {
            this.$router.push({
              name: `infoOne`,
              params: { id: this.userID }
            });
          }
        }
      });
    },
    _register() {
      this.user.nameShort = this.user.username
      register(this.user).then(res => {
        if (res.data.code === 500502) {
          this.emlErr = res.data.msg;
        }
        if (res.data.code === 500503) {
          this.usernameErr = res.data.msg;
        }
        if (res.data.code === 0) {
          this.userID = res.data.data;
        }
      });
    },
    _checkEmail() {
      checkEmail(this.userID).then(res => {
        if (res.data.code === 0) {
          this.successbox = !this.successbox;
        }
      });
    },
    tureFlase() {
      this._isActivate();
    },
    flaseFlase() {
      this.successbox = false;
    },
    toSign() {
      let emli = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (!this.user.username) {
        this.usernameErr = "请输入用户名";
      } else {
        this.usernameErr = "";
      }
      if (!this.user.password) {
        this.passwordErr = "请输入密码";
      } else {
        this.passwordErr = "";
      }
      if (this.user.email) {
        if (!emli.test(this.user.email)) {
          this.emlErr = "格式不正确";
        } else {
          this.emlErr = "";
        }
      } else {
        this.emlErr = "请输入邮箱";
      }
      if (
        this.user.username &&
        this.user.password &&
        this.user.email &&
        emli.test(this.user.email)
      ) {
        this._register();
      }
    },
    verification() {
      this._checkEmail();
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
    .signBgList {
      width: 300px;
      height: 300px;
      margin-top: 50px;
      .LoginInput {
        width: 100%;
        margin-top: 26px;
        .inpList {
          width: 100%;
          height: 40px;
          border: 1px solid #000;
          margin-bottom: 20px;
          position: relative;
          box-sizing: border-box;
          .Err {
            position: absolute;
            top: -10px;
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
          margin-top: 50px;
          span {
            background: #000;
            padding: 6px 26px;
            color: #fff;
            cursor: pointer;
          }
        }
      }
      p {
        text-align: center;
        font-size: 40px;
        color: #fff;
        margin-top: 50px;
      }
      .btnEmial {
        background: #000;
        color: #fff;
        width: 124px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        font-size: 12px;
        margin: 40px auto 0;
        cursor: pointer;
      }
      .EmialText {
        margin-top: 10px;
        p {
          font-size: 12px;
          height: 20px;
          line-height: 20px;
          margin: 0;
        }
      }
    }
    .signBgLogo {
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
