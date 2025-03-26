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

    <div class="badge" v-if="badge">{{ badge }}</div>
    <div class="name">{{ name }}</div>

    <div v-if="excerpt" class="excerpt">
      {{ excerpt }}
    </div>
    <div v-else class="list-options">
      <div
          v-for="(option, index) in options || defaultOptions"
          :key="index"
          class="item-option"
      >
        <div class="label-option">
          <div class="name-option">{{ option.label }}</div>
        </div>
        <div class="label-value">
          <img v-if="isImage(option.value)" :src="option.value" alt="" />
          <span v-else>{{ option.value }}</span>
        </div>
      </div>
    </div>

    <section class="list-actions">
      <a href="" class="btn primary">Play with Real Money</a>
      <div v-if="!excerpt">
        <a href="" class="btn light">Play for Free</a>
      </div>
    </section>


    <SectionTabGroup v-if="faq && faq.length > 0" :items="faq" />
  </article>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation as SwiperNavigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function isImage(val) {
  return typeof val === 'string' && val.startsWith('/images/');
}

const props = defineProps({
  name: String,
  images: Array,
  badge: String,
  faq: Array,
  excerpt: String,
  options: Array
});

const defaultOptions = [
  { label: 'Win rate', value: '97.50%' },
  { label: 'Payout', value: '1-2 days' },
  { label: 'Min deposit', value: '$20' },
  { label: 'Jackpot', value: '11.01 m' },
  { label: 'Software', value: 'NetEnt' },
  { label: 'Casino', value: 'Spin Casino' }
];
</script>