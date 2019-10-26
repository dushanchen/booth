<template>
  <div class="login">
    <div class="LoginBox">
      <div class="close" @click="closeSign">
        <i class="icon iconClose"></i>
      </div>
      <div class="LoginImg">
        <img src="../../assets/images/home/signUp.png" alt>
        <div class="LoginIcon">
          <img src="../../assets/images/icon/man.png" alt>
        </div>
      </div>
      <div class="LoginInput">
        <div class="inpList">
          <input type="text" placeholder="企业简称" v-model="user.nameShort">
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
          <span>加入booth</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register, checkEmail, isActivate, ERR_OK } from "@/api/api.js";
export default {
  name: "signBox",
  data() {
    return {
      close: false,
      emlErr: "",
      usernameErr: "",
      passwordErr: "",
      user: {
        nameShort: "",
        email: "",
        password: "",
        username: '',
      },
      userID: ""
    };
  },
  methods: {
    _register() {
      // this.user.nameShort = this.user.username
      this.user.username = this.user.nameShort
      register(this.user).then(res => {
        if (res.data.code === 500502) {
          this.emlErr = res.data.msg;
        }
        if (res.data.code === 500503) {
          this.usernameErr = res.data.msg;
        }
        if (res.data.code === 0) {
          this.userID = res.data.data;
          this.$router.push({
            name: `sign`,
            params: { id: this.userID, email: this.user.email }
          });
        }
      });
    },
    toSign() {
      let emli = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (!this.user.nameShort) {
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
        this.user.nameShort &&
        this.user.password &&
        this.user.email &&
        emli.test(this.user.email)
      ) {
        this._register();
      }
    },
    closeSign() {
      this.$emit("closeSign", this.close);
    }
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
