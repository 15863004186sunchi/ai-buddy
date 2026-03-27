<template>
  <MobileViewport scroll-test-id="journal-detail-scroll">
    <section class="journal-detail-page" data-testid="journal-detail-page">
      <header class="journal-detail-page__header">
        <button type="button" class="journal-detail-page__icon-button" data-testid="journal-detail-back" @click="goBack">
          ←
        </button>
        <h1>SoulEcho</h1>
        <div class="journal-detail-page__actions">
          <button type="button" class="journal-detail-page__icon-button">↗</button>
          <button type="button" class="journal-detail-page__icon-button">⋯</button>
        </div>
      </header>

      <section class="journal-detail-page__hero" data-testid="journal-detail-hero">
        <img :src="detail.image" :alt="detail.title" />
      </section>

      <section class="journal-detail-page__content">
        <div class="journal-detail-page__meta">
          <p>{{ detail.date }}</p>
          <span>{{ detail.typeLabel }}</span>
        </div>
        <h2>{{ detail.title }}</h2>
        <div class="journal-detail-page__paragraphs">
          <p v-for="paragraph in detail.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </div>
        <div class="journal-detail-page__tags" data-testid="journal-detail-tags">
          <span v-for="tag in detail.tags" :key="tag">#{{ tag }}</span>
        </div>
      </section>

      <section class="journal-detail-page__feedback" data-testid="journal-detail-feedback">
        <div class="journal-detail-page__feedback-header">
          <div class="journal-detail-page__feedback-icon">✦</div>
          <h3>{{ detail.feedbackTitle }}</h3>
        </div>
        <p>{{ detail.feedbackBody }}</p>
        <button
          type="button"
          class="journal-detail-page__companion"
          data-testid="journal-detail-companion"
          @click="goCompanion"
        >
          继续对话
        </button>
      </section>

      <section class="journal-detail-page__bottom-actions">
        <button
          type="button"
          class="journal-detail-page__action"
          :data-state="favoriteState"
          data-testid="journal-detail-favorite"
          @click="toggleFavorite"
        >
          <span>{{ favoriteState === 'active' ? '♥' : '♡' }}</span>
          <strong>收藏</strong>
        </button>
        <button type="button" class="journal-detail-page__action">
          <span>✎</span>
          <strong>编辑</strong>
        </button>
        <button type="button" class="journal-detail-page__action">
          <span>⌫</span>
          <strong>删除</strong>
        </button>
      </section>
    </section>
  </MobileViewport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getJournalDetail } from '@/data/journal';
import MobileViewport from '@/layouts/MobileViewport.vue';

const route = useRoute();
const router = useRouter();
const isFavorite = ref(false);

const detail = computed(() => getJournalDetail(String(route.params.id ?? 'journal-1')));
const favoriteState = computed(() => (isFavorite.value ? 'active' : 'inactive'));

async function goBack() {
  await router.replace('/app/journal');
}

async function goCompanion() {
  await router.push('/app/companion');
}

function toggleFavorite() {
  isFavorite.value = !isFavorite.value;
}
</script>

<style scoped>
.journal-detail-page {
  min-height: 100%;
  display: grid;
  align-content: start;
  gap: 1rem;
  padding-bottom: 1.5rem;
  background: var(--color-surface, #faf7fb);
}

.journal-detail-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem 0;
}

.journal-detail-page__header h1,
.journal-detail-page__content h2,
.journal-detail-page__feedback h3 {
  margin: 0;
  font-family: var(--font-display);
}

.journal-detail-page__actions {
  display: flex;
  gap: 0.5rem;
}

.journal-detail-page__icon-button {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.88);
  color: var(--color-text);
}

.journal-detail-page__hero {
  margin: 0 1rem;
  min-height: 20rem;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: var(--shadow-soft);
}

.journal-detail-page__hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.journal-detail-page__content {
  display: grid;
  gap: 1rem;
  padding: 0 1.5rem;
}

.journal-detail-page__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  color: var(--color-primary);
  font-weight: 700;
}

.journal-detail-page__meta p,
.journal-detail-page__paragraphs p,
.journal-detail-page__feedback p {
  margin: 0;
}

.journal-detail-page__meta span {
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  background: rgba(238, 238, 234, 0.95);
  color: var(--color-text-muted);
  font-weight: 600;
}

.journal-detail-page__content h2 {
  font-size: 2rem;
}

.journal-detail-page__paragraphs {
  display: grid;
  gap: 1rem;
  color: var(--color-text);
  line-height: 1.75;
}

.journal-detail-page__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.journal-detail-page__tags span {
  padding: 0.55rem 0.95rem;
  border-radius: 999px;
  background: rgba(244, 244, 240, 0.95);
  color: var(--color-text-muted);
  border: 1px solid rgba(176, 179, 174, 0.28);
}

.journal-detail-page__feedback {
  margin: 0 1rem;
  padding: 1.4rem;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(161, 144, 245, 0.12), rgba(161, 144, 245, 0.04));
  border: 1px solid rgba(161, 144, 245, 0.18);
  display: grid;
  gap: 1rem;
}

.journal-detail-page__feedback-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.journal-detail-page__feedback-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-soft));
  color: white;
}

.journal-detail-page__companion {
  justify-self: end;
  border: none;
  background: none;
  color: var(--color-primary);
  font-weight: 700;
}

.journal-detail-page__bottom-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 0 1rem;
}

.journal-detail-page__action {
  border: none;
  background: none;
  display: grid;
  justify-items: center;
  gap: 0.45rem;
  color: var(--color-text-muted);
}

.journal-detail-page__action span {
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(244, 244, 240, 0.95);
  color: var(--color-text);
}

.journal-detail-page__action[data-state='active'] span {
  background: rgba(255, 219, 204, 0.95);
  color: #c55b61;
}
</style>