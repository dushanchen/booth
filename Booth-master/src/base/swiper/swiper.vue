<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="../../assets/images/home/banner.png" alt>
      </div>
      <div class="swiper-slide">
        <img src="../../assets/images/home/banner3.png" alt>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  // props: ["listImg", "height"],
  mounted() {
    var swiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
  }
};
</script>

<style>
.swiper-container {
  width: 100%;
  height: 472px;
  margin-left: auto;
  margin-right: auto;
}
.swiper-slide {
  width: 100%;
  height: 100%;
}
.swiper-slide > img {
  width: 100%;
  height: 100%;
}
</style>
