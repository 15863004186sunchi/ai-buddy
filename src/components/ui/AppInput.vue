<template>
  <label class="field">
    <span class="field__label">{{ label }}</span>
    <input
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :autocomplete="autocomplete"
      class="field__input"
      :class="{ 'field__input--error': error }"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="error" class="field__error">{{ error }}</span>
  </label>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  error: {
    type: String,
    default: '',
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.field {
  display: grid;
  gap: 0.55rem;
}

.field__label {
  margin-left: 0.35rem;
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--color-text-muted);
}

.field__input {
  width: 100%;
  border: 1px solid transparent;
  border-radius: var(--radius-pill);
  padding: 1rem 1.15rem;
  background: rgba(255, 255, 255, 0.7);
  color: var(--color-text);
  outline: none;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}

.field__input:focus {
  border-color: rgba(97, 80, 176, 0.28);
  box-shadow: 0 0 0 4px rgba(97, 80, 176, 0.1);
}

.field__input--error {
  border-color: rgba(185, 76, 104, 0.5);
  box-shadow: 0 0 0 4px rgba(185, 76, 104, 0.08);
}

.field__error {
  margin-left: 0.35rem;
  font-size: 0.82rem;
  color: var(--color-danger);
}
</style>
