<template>
  <section class="journal-tab">
    <header class="journal-tab__header">
      <p class="journal-tab__eyebrow">{{ journalHeader.eyebrow }}</p>
      <h1 class="page-title journal-tab__title">{{ journalHeader.title }}</h1>
      <p class="page-copy journal-tab__subtitle">{{ journalHeader.subtitle }}</p>
    </header>

    <section v-if="isEmptyState" class="journal-tab__empty" data-testid="journal-empty-state">
      <div class="journal-tab__orb" aria-hidden="true"></div>
      <div class="journal-tab__illustration" aria-hidden="true">
        <div class="journal-tab__sheet journal-tab__sheet--back"></div>
        <div class="journal-tab__sheet journal-tab__sheet--front">
          <div class="journal-tab__icon">✦</div>
          <div class="journal-tab__lines">
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="journal-tab__badge">✎</div>
      </div>
      <div class="journal-tab__empty-copy">
        <h2>{{ journalEmptyState.title }}</h2>
        <p>{{ journalEmptyState.description }}</p>
      </div>
      <AppButton block data-testid="journal-empty-cta" @click="showHint = true">
        {{ journalEmptyState.ctaLabel }}
      </AppButton>
      <p v-if="showHint" class="journal-tab__hint">{{ journalEmptyState.ctaHint }}</p>
      <div class="journal-tab__footer-label">
        <span></span>
        <strong>{{ journalEmptyState.footerLabel }}</strong>
        <span></span>
      </div>
    </section>

    <template v-else>
      <div class="journal-tab__search">搜索那一刻的情感...</div>

      <section class="journal-tab__new-entry glass-panel">
        <div class="journal-tab__new-icon">+</div>
        <div>
          <h2>开启新篇章</h2>
          <p>今天的你，有什么想要留给未来的吗？</p>
        </div>
      </section>

      <section class="journal-tab__list" data-testid="journal-list">
        <button
          v-for="entry in journalEntries"
          :key="entry.id"
          type="button"
          class="journal-tab__entry glass-panel"
          @click="openDetail(entry.id)"
        >
          <img :src="entry.image" :alt="entry.title" />
          <div>
            <span>{{ entry.date }}</span>
            <h3>{{ entry.title }}</h3>
            <p>{{ entry.summary }}</p>
          </div>
        </button>
      </section>
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import AppButton from '@/components/ui/AppButton.vue';
import { journalDefaultView, journalEmptyState, journalEntries, journalHeader } from '@/data/journal';

const router = useRouter();
const showHint = ref(false);
const isEmptyState = computed(() => journalDefaultView === 'empty');

function openDetail(id: string) {
  void router.push(`/journal/${id}`);
}
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
  text-align: center;
}

.journal-tab__eyebrow {
  margin: 0;
  color: var(--color-primary);
  font-weight: 700;
  letter-spacing: 0.08em;
}

.journal-tab__title,
.journal-tab__subtitle {
  margin: 0;
}

.journal-tab__empty {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 1.1rem;
  padding: 2rem 1rem 1rem;
  text-align: center;
  overflow: hidden;
}

.journal-tab__orb {
  position: absolute;
  inset: 2rem auto auto 50%;
  width: 16rem;
  height: 16rem;
  border-radius: 999px;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(161, 144, 245, 0.3), rgba(255, 219, 204, 0.18), transparent 72%);
  filter: blur(16px);
}

.journal-tab__illustration,
.journal-tab__empty-copy,
.journal-tab__hint,
.journal-tab__footer-label,
.journal-tab :deep(.app-button) {
  position: relative;
  z-index: 1;
}

.journal-tab__illustration {
  position: relative;
  width: min(100%, 17rem);
  aspect-ratio: 1;
}

.journal-tab__sheet {
  position: absolute;
  inset: 0;
  border-radius: 28px;
}

.journal-tab__sheet--back {
  background: rgba(244, 244, 240, 0.92);
  transform: rotate(4deg);
}

.journal-tab__sheet--front {
  display: grid;
  place-items: center;
  gap: 1rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(176, 179, 174, 0.3);
  box-shadow: var(--shadow-soft);
  transform: rotate(-3deg);
}

.journal-tab__icon,
.journal-tab__badge {
  width: 4.5rem;
  height: 4.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-size: 1.6rem;
}

.journal-tab__icon {
  background: rgba(161, 144, 245, 0.18);
  color: var(--color-primary);
}

.journal-tab__badge {
  position: absolute;
  top: -0.35rem;
  right: -0.35rem;
  width: 3rem;
  height: 3rem;
  background: rgba(255, 219, 204, 0.95);
  color: var(--color-secondary);
  box-shadow: 0 12px 24px rgba(124, 86, 69, 0.18);
}

.journal-tab__lines {
  width: 100%;
  display: grid;
  gap: 0.6rem;
}

.journal-tab__lines span {
  display: block;
  height: 0.5rem;
  margin: 0 auto;
  border-radius: 999px;
  background: rgba(225, 227, 222, 0.95);
}

.journal-tab__lines span:first-child {
  width: 72%;
}

.journal-tab__lines span:last-child {
  width: 48%;
}

.journal-tab__empty-copy h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.75rem;
}

.journal-tab__empty-copy p,
.journal-tab__hint {
  margin: 0.5rem 0 0;
  color: var(--color-text-muted);
}

.journal-tab__hint {
  font-size: 0.92rem;
}

.journal-tab__footer-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(93, 96, 92, 0.76);
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.journal-tab__footer-label span {
  width: 2.5rem;
  height: 1px;
  background: rgba(176, 179, 174, 0.45);
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
  width: 100%;
  border: none;
  display: grid;
  grid-template-columns: 7rem 1fr;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  text-align: left;
}

.journal-tab__entry img {
  width: 100%;
  height: 6.5rem;
  object-fit: cover;
  border-radius: 18px;
}
</style>