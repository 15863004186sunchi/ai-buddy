<template>
  <section class="journal-tab">
    <header class="journal-tab__header">
      <p class="journal-tab__eyebrow">{{ journalHero.eyebrow }}</p>
      <h1 class="page-title journal-tab__title">心情日记</h1>
      <p class="page-copy">{{ journalHero.title }}</p>
    </header>

    <div class="journal-tab__search">搜索那一刻的情感...</div>

    <section class="journal-tab__new-entry glass-panel">
      <div class="journal-tab__new-icon">+</div>
      <div>
        <h2>{{ journalHero.ctaTitle }}</h2>
        <p>{{ journalHero.ctaText }}</p>
      </div>
    </section>

    <section class="journal-tab__list" data-testid="journal-list">
      <article v-for="entry in journalEntries" :key="entry.id" class="journal-tab__entry glass-panel">
        <img :src="entry.image" :alt="entry.title" />
        <div>
          <span>{{ entry.date }}</span>
          <h3>{{ entry.title }}</h3>
          <p>{{ entry.summary }}</p>
        </div>
      </article>
    </section>
  </section>
</template>

<script setup lang="ts">
import { journalEntries, journalHero } from '@/data/journal';
</script>

<style scoped>
.journal-tab {
  display: grid;
  gap: 1rem;
  padding: 1.4rem 1.4rem 1rem;
  align-content: start;
}

.journal-tab__header {
  display: grid;
  gap: 0.45rem;
}

.journal-tab__eyebrow {
  margin: 0;
  color: var(--color-primary);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.journal-tab__title {
  margin: 0;
}

.journal-tab__search {
  padding: 0.95rem 1rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: var(--color-text-muted);
}

.journal-tab__new-entry {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: center;
  padding: 1.2rem;
}

.journal-tab__new-entry h2,
.journal-tab__entry h3 {
  margin: 0;
  font-family: var(--font-display);
}

.journal-tab__new-entry p,
.journal-tab__entry p,
.journal-tab__entry span {
  margin: 0.25rem 0 0;
  color: var(--color-text-muted);
}

.journal-tab__new-icon {
  width: 3rem;
  height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(97, 80, 176, 0.12);
  color: var(--color-primary);
  font-size: 1.6rem;
  font-weight: 700;
}

.journal-tab__list {
  display: grid;
  gap: 1rem;
}

.journal-tab__entry {
  display: grid;
  grid-template-columns: 7rem 1fr;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
}

.journal-tab__entry img {
  width: 100%;
  height: 6.5rem;
  object-fit: cover;
  border-radius: 18px;
}
</style>