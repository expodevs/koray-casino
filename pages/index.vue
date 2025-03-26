<template>
  <div>
    <LayoutHeader />
    <SectionNavTabs />
    <main class="container">
      <h1 class="title-page">Best Online <span>Casino Games</span></h1>
      <p class="text">
        Discover the best selection of online casino games, from thrilling slots
        to timeless board and card games.
      </p>
      <SectionCategoryList />
      <section class="text">
        Explore a variety of slot games with exciting themes and features:
      </section>
      <section class="date-update">
        Last update <time datetime="2025-02-07">07.02.2025</time>
      </section>
      <SectionCardsList :cards="cardsExcerpt" />

      <h2 class="title-section">Slot Games with Advanced Filters</h2>
      <section class="text-sm">
        Filter slot games based on their unique attributes and features.
      </section>

      <SectionFilterGame />
      <SectionCardsList :cards="cardsExcerpt" />

      <h2 class="title-section">Free Online Slot Games</h2>
      <section class="text-sm">
        Filter free online slot games based on their unique attributes and features.
      </section>

      <SectionFilterGame />
      <SectionCardsList :cards="cardsWithOptions" />

      <h2 class="title-section">Online Card Games</h2>
      <section class="text-sm">
        Filter card games based on their unique attributes and features.
      </section>

      <SectionFilterGame />
      <SectionCardsList :cards="cardsExcerpt" />

      <h2 class="title-section">Best Card Games with Real Money</h2>
      <section class="text-sm">
        Discover the best selection of online casino games, from thrilling slots to timeless board and card games.
      </section>
      <section class="list-actions">
        <a href="" class="btn primary-sm">Free Best Card Games</a>
        <a href="" class="btn light-sm">Free Best Card Game that Pay Money</a>
        <a href="" class="btn light-sm">Online Card Games with Best Odds</a>
      </section>

      <SectionCardsList :cards="cardsWithOptions" />

      <h2 class="title-section">Free Online Card Games</h2>
      <section class="text-sm">
        Discover the best selection of online casino games, from thrilling slots to timeless board and card games.
      </section>

      <SectionCardsList :cards="cardsWithOptions" />

      <h2 class="title-section">Online Roulette Games</h2>
      <section class="text-sm">
        Filter roulette games based on their unique attributes and features.
      </section>

      <SectionFilterGame />
      <SectionCardsList :cards="cardsExcerpt" />

      <section class="tile-section">
        <h2 class="title-section">Best Online Casino Game Providers</h2>
        <section class="text-sm">
          Discover the best selection of online casino games, from thrilling slots to timeless board and card games.
        </section>
        <section class="search-row">
          <input type="text" class="input-style" placeholder="Search">
        </section>
      </section>

    </main>
  </div>
</template>

<script setup>
import "@/assets/scss/home.scss";

const cardsExcerpt = [
  {
    name: 'Pyramid Riches',
    images: ['/images/slot-1.png','/images/slot-1.png'],
    badge: 'Top 1',
    excerpt: 'Explore ancient Egypt with wild multipliers and free spins.',
  },
  {
    name: 'Pyramid Riches',
    images: ['/images/slot-1.png','/images/slot-1.png'],
    badge: 'Top',
    excerpt: 'Classic slot action with a lucky twist.',
  },
  {
    name: 'Pyramid Riches',
    images: ['/images/slot-1.png','/images/slot-1.png'],
    badge: 'Hot',
    excerpt: 'Uncover treasures in ancient Aztec temples.',
  }
]

const cardsWithOptions = [
  {
    name: 'Pyramid Riches',
    images: ['/images/slot-1.png','/images/slot-1.png'],
    badge: 'Top',
    options: [
      { label: 'Win rate', value: '96.3%' },
      { label: 'Min deposit', value: '$10' }
    ],
    faq: [
      { question: 'What is the RTP of Book of Ra?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
      { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' },
      { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' }
    ]
  },
  {
    name: 'Starburst',
    images: ['/images/slot-1.png','/images/slot-1.png'],
    badge: 'Top',
    options: [
      { label: 'Win rate', value: '97.50%' },
      { label: 'Payout', value: '1-2 days' },
      { label: 'Min deposit', value: '$20' },
      { label: 'Jackpot', value: '11.01 m' },
      { label: 'Software:', value: '/images/software-card-game.png' },
      { label: 'Casino:', value: '/images/casino-card-game.png' }
    ],
    faq: [
      { question: 'What is the RTP of Book of Ra?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
      { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' },
      { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' }
    ]
  },
  {
    name: 'Mega Moolah',
    images: ['/images/slot-1.png','/images/slot-1.png'],
    badge: 'Top',
    options: [
      { label: 'Win rate', value: '97.50%' },
      { label: 'Payout', value: '1-2 days' },
      { label: 'Min deposit', value: '$20' },
      { label: 'Jackpot', value: '11.01 m' },
      { label: 'Software:', value: '/images/software-card-game.png' },
      { label: 'Casino:', value: '/images/casino-card-game.png' }
    ],
    faq: [
      { question: 'What is the RTP of Book of Ra?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
      { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' },
      { question: 'Are there free spins in Book of Ra?', answer: 'Lorem ipsum dolor sit amet' }
    ]
  }
]
</script>
