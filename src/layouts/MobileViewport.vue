<template>
  <div class="viewport-shell">
    <div class="viewport-shell__phone">
      <div class="viewport-shell__body">
        <div class="viewport-shell__scroll" :data-testid="scrollTestId">
          <slot />
        </div>
        <div v-if="$slots.bottom" class="viewport-shell__bottom" data-testid="viewport-bottom">
          <slot name="bottom" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  scrollTestId: {
    type: String,
    default: undefined,
  },
});
</script>

<style scoped>
.viewport-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.viewport-shell__phone {
  width: min(100%, 430px);
  height: min(920px, calc(100vh - 48px));
  background: rgba(250, 249, 246, 0.92);
  border-radius: 36px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow: var(--shadow-soft);
  position: relative;
}

.viewport-shell__body {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.viewport-shell__scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.viewport-shell__bottom {
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .viewport-shell {
    padding: 0;
  }

  .viewport-shell__phone {
    width: 100%;
    height: 100vh;
    border-radius: 0;
  }
}
</style>
