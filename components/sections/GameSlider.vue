<template>
  <swiper
      :modules="[SwiperNavigation, SwiperPagination]"
      :slides-per-view="1"
      :space-between="10"
      :navigation="true"
      :pagination="{ clickable: true }"
      class="image-slider"
  >
    <swiper-slide v-for="(image, index) in images" :key="index">
      <img :src="image" alt="Game Image" class="slider-image" />
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation as SwiperNavigation, Pagination as SwiperPagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "/images/slot-1.png",
  "/images/slot-1.png",
  "/images/slot-1.png",
];
</script>

<style scoped>
.image-slider {
  width: 100%;
  max-width: 400px;
}

.slider-image {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
}
</style>