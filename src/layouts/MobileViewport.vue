<template>
  <div class="viewport-shell">
    <div class="viewport-shell__phone">
      <slot />
    </div>
  </div>
</template>

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
  min-height: min(920px, calc(100vh - 48px));
  background: rgba(250, 249, 246, 0.92);
  border-radius: 36px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow: var(--shadow-soft);
  position: relative;
}

@media (max-width: 640px) {
  .viewport-shell {
    padding: 0;
  }

  .viewport-shell__phone {
    width: 100%;
    min-height: 100vh;
    border-radius: 0;
  }
}
</style>
