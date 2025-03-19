<template>
  <article class="item-card">
    <swiper
        :modules="[SwiperNavigation]"
        :slides-per-view="1"
        :space-between="10"
        :navigation="true"
        class="image-slider"
    >
      <swiper-slide v-for="(image, index) in images" :key="index">
        <figure class="thumb-wrap">
          <img :src="image" alt="Game Image" />
        </figure>

      </swiper-slide>
    </swiper>
    <div class="name">Cleopatra</div>
    <div class="excerpt">Explore the mystique of ancient Egypt with wild multipliers and free spins.</div>
    <a href="" class="btn primary">Play with Real Money</a>
  </article>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation as SwiperNavigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "/images/slot-1.png",
  "/images/slot-1.png",
  "/images/slot-1.png",
];
</script>