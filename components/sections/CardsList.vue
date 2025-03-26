<template>
  <section class="cards-list">
    <SectionCardGame
        v-for="(card, index) in cards"
        :key="index"
        :name="card.name"
        :images="card.images"
        :badge="card.badge"
        :faq="card.faq"
        :excerpt="card.excerpt"
        :options="card.options"
    />

    <button class="btn light-sm">
      Show more ({{ cards.length }})
      <span class="ico">
        <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M6.00011 4.97668L10.1251 0.851685L11.3034 2.03002L6.00011 7.33335L0.696777 2.03002L1.87511 0.851685L6.00011 4.97668Z"
              fill="black"
          />
        </svg>
      </span>
    </button>
  </section>
</template>

<script setup>
import SectionCardGame from './CardGame.vue';

const props = defineProps({
  cards: {
    type: Array,
    default: () => []
  }
});
</script>