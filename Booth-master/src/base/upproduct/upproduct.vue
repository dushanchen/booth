<template>
  <div class="upproduct">
    <div class="upproductHead">
      <span>产品册上传</span>
      <span @click="hide">取消</span>
    </div>
    <div class="upproductList">
      <div class="upproductItem">
        <p>产品册标题</p>
        <input type="text" v-model="dataList.title">
      </div>
      <div class="upproductItem">
        <p>本地上传</p>
        <div>
          <input type="file" @change="upPdf">
        </div>
      </div>
      <div class="upproductItem">
        <p>简介（最多200字）</p>
        <textarea v-model="dataList.summary"></textarea>
      </div>
      <div class="upproductItem">
        <p>添加标签（上限五个）</p>
        <div class="upproductLabel">
          <input
            v-for="(item, index) in dataList.label"
            :key="index"
            v-model="dataList.label[index]"
            placeholder="点击输入"
          >
        </div>
      </div>
      <div class="upproductItem">
        <p>上传封面</p>
        <div class="upproductimg">
          <label for="upImg">
            <span v-if="!UpImg">+</span>
            <img :src="UpImg" alt v-else>
          </label>
          <input @change="upImg" type="file" id="upImg" value="图片上传预览" multiple>
        </div>
      </div>
      <div class="upproductBtn">
        <span @click="UpConfirm">确认发布</span>
      </div>
    </div>
  </div>
</template>

<script>
import { saveProduct, ERR_OK } from "@/api/api.js";
export default {
  data() {
    return {
      hideState: false,
      formData: new FormData(),
      UpImg: "",
      dataList: {
        title: "",
        summary: "",
        label: ["", "", "", "", ""],
        pdfFile: "",
        coverPic: ""
      }
    };
  },
  methods: {
    _saveProduct() {
      saveProduct(this.formData).then(res => {
        if (res.data.code === 0) {
          console.log("上传成功");
          this.hide();
        }
      });
    },
    UpConfirm() {
      this.formData.append("userId", this.$store.state.user.UserID);
      this.formData.append("title", this.dataList.title);
      this.formData.append("summary", this.dataList.summary);
      this.formData.append("label", this.dataList.label);
      this.formData.append("pdfFile", this.dataList.pdfFile);
      this.formData.append("coverPic", this.dataList.coverPic);
      this._saveProduct();
    },
    hide() {
      this.$emit("clicehide", this.hideState);
    },
    upPdf(e) {
      this.dataList.pdfFile = e.target.files[0];
      // this.pdfFile = pdf;
      console.log(this.dataList.pdfFile);
    },
    upImg(e) {
      this.dataList.coverPic = e.target.files[0];
      const reader = new FileReader();
      let _this = this;
      reader.readAsDataURL(this.dataList.coverPic);
      reader.onload = function(e) {
        _this.UpImg = e.target.result;
      };
      // this.UpImg =
    }
  }
};
</script>

<style lang="scss">
.upproduct {
  height: 90vh;
  max-height: 616px;
  width: 428px;
  background: #fff;
  overflow: auto;
  padding: 20px;
  box-sizing: border-box;
  .upproductHead {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    span:nth-child(1) {
      font-size: 24px;
      font-weight: bold;
    }
  }
  .upproductList {
    width: 100%;
    .upproductItem {
      margin-bottom: 20px;
      p {
        font-size: 12px;
        margin: 4px 0;
      }
      input {
        height: 24px;
        width: 100%;
        background: #cfdae2;
        outline: none;
        // padding: 0 10px;
        box-sizing: border-box;
      }
      textarea {
        width: 100%;
        height: 78px;
        background: #cfdae2;
        outline: none;
        padding: 0 10px;
        box-sizing: border-box;
      }
      .upproductimg {
        width: 106px;
        height: 134px;
        margin: 0 auto;
        position: relative;
        label {
          position: absolute;
          width: 100%;
          height: 100%;
          background: #cfdae2;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 30px;
        }
      }
      .upproductLabel {
        width: 100%;
        height: 100px;
        background: #cfdae2;
        overflow: auto;
        input {
          display: inline-block;
          width: 100px;
          height: 30px;
          text-align: center;
          background: rgba($color: #000, $alpha: 0.3);
          margin: 10px;
          cursor: pointer;
        }
      }
    }
    .upproductBtn {
      width: 100%;
      span {
        float: right;
        width: 66px;
        text-align: center;
        line-height: 24px;
        color: #fff;
        height: 24px;
        background: #2c73a1;
        font-size: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
