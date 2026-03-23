<template>
  <section class="glass-card glass-panel">
    <slot />
  </section>
</template>

<style scoped>
.glass-card {
  border-radius: var(--radius-xl);
  padding: 1.4rem;
  box-shadow: var(--shadow-card);
}
</style>
