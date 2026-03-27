<template>
  <section class="healing-tab">
    <header class="healing-tab__header">
      <div>
        <p class="healing-tab__eyebrow">SoulEcho</p>
        <h1 class="page-title">疗愈空间</h1>
      </div>
      <button type="button" class="healing-tab__settings">设置</button>
    </header>

    <button
      type="button"
      class="healing-tab__hero"
      data-testid="healing-hero-entry"
      @click="openPlayer(healingHero.targetId)"
    >
      <img :src="healingHero.image" :alt="healingHero.title" />
      <div class="healing-tab__hero-overlay">
        <span>{{ healingHero.badge }}</span>
        <h2>{{ healingHero.title }}</h2>
        <p>{{ healingHero.description }}</p>
        <strong>{{ healingHero.meta }}</strong>
      </div>
    </button>

    <section class="healing-tab__moods">
      <button v-for="mood in healingMoods" :key="mood" type="button">{{ mood }}</button>
    </section>

    <section class="healing-tab__categories" data-testid="healing-categories">
      <button
        v-for="category in healingCategories"
        :key="category.id"
        type="button"
        class="healing-tab__category glass-panel"
        :data-testid="`healing-category-${category.id}`"
        @click="openPlayer(category.targetId)"
      >
        <div class="healing-tab__category-icon">{{ category.icon }}</div>
        <div>
          <h3>{{ category.title }}</h3>
          <p>{{ category.meta }}</p>
        </div>
      </button>
    </section>

    <section class="healing-tab__recent">
      <div class="healing-tab__section-header">
        <h2>最近播放</h2>
      </div>
      <button
        v-for="track in recentHealingTracks"
        :key="track.id"
        type="button"
        class="healing-tab__track glass-panel"
        :data-testid="`healing-track-${track.id}`"
        @click="openPlayer(track.id)"
      >
        <img :src="track.image" :alt="track.title" />
        <div>
          <h3>{{ track.title }}</h3>
          <p>{{ track.meta }}</p>
        </div>
      </button>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { healingCategories, healingHero, healingMoods, recentHealingTracks } from '@/data/healing';

const router = useRouter();

function openPlayer(id: string) {
  void router.push(`/healing/${id}`);
}
</script>

<style scoped>
.healing-tab {
  display: grid;
  gap: 1rem;
  padding: 1.4rem 1.4rem 1rem;
  align-content: start;
}

.healing-tab__header,
.healing-tab__section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.healing-tab__eyebrow {
  margin: 0;
  color: var(--color-primary);
  font-weight: 700;
}

.healing-tab__settings {
  border: none;
  border-radius: 999px;
  padding: 0.65rem 0.95rem;
  background: rgba(255, 255, 255, 0.72);
  color: var(--color-text-muted);
}

.healing-tab__hero,
.healing-tab__category,
.healing-tab__track {
  width: 100%;
  border: none;
  text-align: left;
  cursor: pointer;
}

.healing-tab__hero {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  min-height: 21rem;
  padding: 0;
  background: transparent;
}

.healing-tab__hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.healing-tab__hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.65rem;
  padding: 1.5rem;
  color: white;
  background: linear-gradient(180deg, rgba(18, 18, 18, 0.12), rgba(97, 80, 176, 0.82));
}

.healing-tab__hero-overlay span {
  width: fit-content;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  font-size: 0.78rem;
}

.healing-tab__hero-overlay h2,
.healing-tab__category h3,
.healing-tab__track h3 {
  margin: 0;
  font-family: var(--font-display);
}

.healing-tab__hero-overlay p,
.healing-tab__category p,
.healing-tab__track p {
  margin: 0;
}

.healing-tab__moods {
  display: flex;
  gap: 0.6rem;
  overflow-x: auto;
  padding-bottom: 0.2rem;
}

.healing-tab__moods button {
  border: none;
  flex: none;
  border-radius: 999px;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.78);
  color: var(--color-text-muted);
  font-weight: 700;
}

.healing-tab__categories {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem;
}

.healing-tab__category {
  display: grid;
  gap: 0.6rem;
  padding: 1rem;
}

.healing-tab__category-icon {
  width: 3rem;
  height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(97, 80, 176, 0.12);
  color: var(--color-primary);
  font-size: 0.75rem;
  font-weight: 700;
}

.healing-tab__recent {
  display: grid;
  gap: 0.85rem;
}

.healing-tab__track {
  display: grid;
  grid-template-columns: 4.5rem 1fr;
  gap: 0.85rem;
  align-items: center;
  padding: 0.9rem;
}

.healing-tab__track img {
  width: 100%;
  height: 4.5rem;
  object-fit: cover;
  border-radius: 16px;
}
</style>
