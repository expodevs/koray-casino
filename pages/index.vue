<template>
  <div>
    <LayoutHeader />
    <SectionNavTabs />
    <main class="container">
      <h1 class="title-page">Best Online <span>Casino Games</span></h1>
      <p class="text">
        Discover the best selection of online casino games, from thrilling slots to timeless board and card games.
      </p>
      <SectionCategoryList />
      <div class="text">Explore a variety of slot games with exciting themes and features:</div>
      <div class="date-update">
        Last update <time datetime="2025-02-07">07.02.2025</time>
      </div>
      <SectionCardsList />

      <h2 class="title-section">Slot Games with Advanced Filters</h2>
      <div class="text-sm">Filter slot games based on their unique attributes and features.</div>

      <SectionFilterGame />
      <SectionCardsList />
    </main>
  </div>
</template>

<script setup>
import "@/assets/scss/home.scss";
</script>