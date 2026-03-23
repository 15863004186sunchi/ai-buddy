<template>
  <MobileViewport>
    <main class="auth-page">
      <header class="auth-page__header">
        <p class="auth-page__brand">AI Buddy</p>
        <h1 class="page-title">{{ isRegister ? '创建你的专属陪伴' : '欢迎回来' }}</h1>
        <p class="page-copy">
          {{ isRegister ? '只需要几步，就能开启属于你的情绪记录与温柔陪伴。' : '继续这段熟悉的自我照看练习。' }}
        </p>
      </header>

      <GlassCard class="auth-page__panel">
        <SegmentedTabs v-model="mode" :options="tabOptions" />

        <form data-testid="auth-form" class="auth-page__form" @submit.prevent="handleSubmit">
          <AppInput
            v-if="isRegister"
            v-model="registerForm.displayName"
            name="displayName"
            label="昵称"
            placeholder="例如：小满"
            :error="registerErrors.displayName"
          />

          <AppInput
            v-model="activeEmail"
            name="email"
            type="email"
            label="邮箱"
            placeholder="hello@ai-buddy.com"
            autocomplete="email"
            :error="activeErrors.email"
          />

          <AppInput
            v-model="activePassword"
            name="password"
            type="password"
            label="密码"
            placeholder="至少 8 位密码"
            autocomplete="current-password"
            :error="activeErrors.password"
          />

          <AppInput
            v-if="isRegister"
            v-model="registerForm.confirmPassword"
            name="confirmPassword"
            type="password"
            label="确认密码"
            placeholder="再次输入密码"
            autocomplete="new-password"
            :error="registerErrors.confirmPassword"
          />

          <AppButton block data-testid="auth-submit" type="submit">
            {{ isRegister ? '注册并进入' : '登录并继续' }}
          </AppButton>
        </form>

        <ToastBanner :message="toastMessage" />

        <div class="auth-page__divider">
          <span></span>
          <b>其他方式</b>
          <span></span>
        </div>

        <div class="auth-page__socials">
          <button type="button" class="auth-page__social" @click="showMockToast('微信登录将在下一版本接入')">微信</button>
          <button type="button" class="auth-page__social" @click="showMockToast('QQ 登录将在下一版本接入')">QQ</button>
        </div>
      </GlassCard>
    </main>
  </MobileViewport>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import AppButton from '@/components/ui/AppButton.vue';
import AppInput from '@/components/ui/AppInput.vue';
import GlassCard from '@/components/ui/GlassCard.vue';
import SegmentedTabs from '@/components/ui/SegmentedTabs.vue';
import ToastBanner from '@/components/ui/ToastBanner.vue';
import { useSession } from '@/composables/useSession';
import MobileViewport from '@/layouts/MobileViewport.vue';
import { validateLoginForm, validateRegisterForm } from '@/lib/validation';

const router = useRouter();
const session = useSession();
const mode = ref<'login' | 'register'>('login');
const toastMessage = ref('');

const loginForm = reactive({
  email: '',
  password: '',
});

const registerForm = reactive({
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const loginErrors = reactive<{ email?: string; password?: string }>({});
const registerErrors = reactive<{ displayName?: string; email?: string; password?: string; confirmPassword?: string }>({});

const tabOptions = [
  { label: '登录', value: 'login' },
  { label: '注册', value: 'register' },
];

const isRegister = computed(() => mode.value === 'register');
const activeEmail = computed({
  get: () => (isRegister.value ? registerForm.email : loginForm.email),
  set: (value: string) => {
    if (isRegister.value) {
      registerForm.email = value;
      return;
    }

    loginForm.email = value;
  },
});
const activePassword = computed({
  get: () => (isRegister.value ? registerForm.password : loginForm.password),
  set: (value: string) => {
    if (isRegister.value) {
      registerForm.password = value;
      return;
    }

    loginForm.password = value;
  },
});
const activeErrors = computed(() => (isRegister.value ? registerErrors : loginErrors));

function clearErrors() {
  Object.keys(loginErrors).forEach((key) => delete loginErrors[key as keyof typeof loginErrors]);
  Object.keys(registerErrors).forEach((key) => delete registerErrors[key as keyof typeof registerErrors]);
}

function showMockToast(message: string) {
  toastMessage.value = message;
}

async function handleSubmit() {
  clearErrors();

  if (isRegister.value) {
    Object.assign(registerErrors, validateRegisterForm(registerForm));
    if (Object.keys(registerErrors).length > 0) {
      return;
    }

    session.register(registerForm);
    await router.push('/home');
    return;
  }

  Object.assign(loginErrors, validateLoginForm(loginForm));
  if (Object.keys(loginErrors).length > 0) {
    return;
  }

  session.login(loginForm);
  await router.push('/home');
}
</script>

<style scoped>
.auth-page {
  min-height: 100%;
  padding: 1.6rem;
  display: grid;
  gap: 1.4rem;
  align-content: center;
}

.auth-page__header {
  display: grid;
  gap: 0.75rem;
}

.auth-page__brand {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 800;
  color: var(--color-primary);
}

.auth-page__panel {
  display: grid;
  gap: 1rem;
}

.auth-page__form {
  display: grid;
  gap: 1rem;
}

.auth-page__divider {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.8rem;
  align-items: center;
  color: var(--color-text-muted);
  font-size: 0.82rem;
}

.auth-page__divider span {
  height: 1px;
  background: rgba(97, 80, 176, 0.12);
}

.auth-page__socials {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
}

.auth-page__social {
  border: none;
  border-radius: var(--radius-pill);
  padding: 0.9rem 1rem;
  background: rgba(255, 255, 255, 0.8);
  color: var(--color-text);
  font-weight: 700;
  cursor: pointer;
}
</style>