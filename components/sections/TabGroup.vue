<template>
  <section class="faq-tab-group">
    <details
        class="faq-item"
        v-for="(item, index) in items"
        :key="index"
        :open="openIndex === index"
        @toggle="handleToggle(index)"
    >
      <summary class="faq-summary">
        <span>{{ item.question }}</span>
        <svg
            :class="{ rotated: openIndex === index }"
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </summary>
      <article class="faq-content">
        <p>{{ item.answer }}</p>
      </article>
    </details>
  </section>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
})
</script>